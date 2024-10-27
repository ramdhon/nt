import express from 'express'
import nodemailer from 'nodemailer'
import cors from 'cors'
import { google } from 'googleapis'
import mailgun from 'mailgun-js'
import { lookup } from 'geoip-lite'

const app = express()
const OAuth2 = google.auth.OAuth2
const oauth2Client = new OAuth2(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_SECRET,
  process.env.OAUTH_REDIRECT_URL
)

oauth2Client.setCredentials({
  refresh_token: process.env.OAUTH_REFRESH_TOKEN,
})

const sender = process.env.MAIL_SENDER
// const pass = process.env.MAIL_PASS
const sendMail = async (msg, info) => {
  // const transporter = nodemailer.createTransport({
  //   sendmail: true,
  //   newline: 'unix',
  //   path: '/usr/sbin/sendmail'
  // })
  // const transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: sender,
  //     pass,
  //   }
  // })
  try {
    const accessToken = await oauth2Client.getAccessToken()

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: sender,
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        accessToken,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })

    return new Promise((resolve, reject) => {
      transporter.sendMail(
        {
          from: sender,
          to: process.env.MAIL_TO || 'info@nidal-toman.de',
          cc: process.env.MAIL_CC,
          bcc: process.env.MAIL_BCC,
          subject: info
            ? `${info.name} - ${info.email}`
            : process.env.MAIL_SUBJECT || 'New Contact Form Submission',
          html: msg,
        },
        (err, info) => {
          if (err) {
            return reject(err)
          }
          resolve(info)
        }
      )
    })
  } catch (err) {
    console.log(err)
    throw err
  }
}

const sendMailgun = (msg, info) => {
  return new Promise((resolve, reject) => {
    const DOMAIN = process.env.MAILGUN_DOMAIN
    const mg = mailgun({ apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN })
    const data = {
      from: sender,
      to: process.env.MAIL_TO || 'info@nidal-toman.de',
      subject: info
        ? `${info.name} - ${info.email}`
        : process.env.MAIL_SUBJECT || 'New Contact Form Submission',
      html: msg,
    }
    if (process.env.MAIL_CC) {
      data.cc = process.env.MAIL_CC
    }
    if (process.env.MAIL_BCC) {
      data.bcc = process.env.MAIL_BCC
    }
    mg.messages().send(data, function (error, body) {
      if (error) {
        reject(error)
      }
      resolve(body)
    })
  })
}

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.get('/', (req, res) => {
  // Validate, sanitize and send
  if (req.query.auth === 'Bearer nidal-toman') {
    console.log(
      process.env.OAUTH_CLIENT_ID,
      process.env.OAUTH_SECRET,
      process.env.OAUTH_REDIRECT_URL,
      process.env.OAUTH_REFRESH_TOKEN,
      process.env.MAIL_SENDER,
      process.env.MAIL_TO,
      process.env.MAIL_CC,
      process.env.MAIL_BCC,
      process.env.MAIL_SUBJECT,
    )
  }
  res.send('Mail is ready!')
})

app.post('/', async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  const location = lookup(ip)
  const { name, email, no, detail, check } = req.body
  const msg = `
    <p>Name: ${name}</p>
    <p>Email: ${email}</p>
    <p>No: ${no}</p>
    <p>IP Address: ${ip}</p>
    <p>Location: ${JSON.stringify(location) || 'NA'}</p>
    <p>Agreed to policy: ${check}</p>
    <span>Detail:</span><br/>
    <p>${detail}</p>
    <br/>
    <em>Note, this is system generated email. Please do not reply to this email. Follow up inquiries from email address that visitor provided in. Thank you.</em>
  `

  try {
    const info = await sendMailgun(msg, { name, email })
    console.log(info)
    res.send('Mail sent!')
  } catch (err) {
    console.log(err)
    res.status(500).send('Mail failed!')
  }
})

export default {
  path: '/api/mail',
  handler: app,
}
