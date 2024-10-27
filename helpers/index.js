export function finalpath(locale, path, mobile = false) {
  const def = 'en'
  const defaultLocale = locale === def
  let finalPath = ''
  if (!path) {
    if (defaultLocale) {
      finalPath = '/'
    } else {
      finalPath = `/${locale}/`
    }
  } else {
    const filteredpath = path.replace(/\//g, '')
    const result = path === '/' ? filteredpath : `${filteredpath}/`
    if (defaultLocale) {
      finalPath = `/${result}`
    } else {
      finalPath = `/${locale}/${result}`
    }
  }

  if (mobile) {
    finalPath = insertMobilePath(finalPath, defaultLocale)
  }
  return finalPath
}

function insertMobilePath(path, locale) {
  const splitted = path.split('/')
  let insertIndex = -1
  if (locale) {
    insertIndex = 1
  } else {
    insertIndex = 2
  }
  splitted.splice(insertIndex, 0, 'mobile')
  const finalPath = splitted.join('/')

  return finalPath
}

export function contentExtractor(input) {
  return input.split('\n').map((text) => {
    /* eslint no-useless-escape: 0 */
    const matched = `${text} `.match(
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/g
    )
    let transformed = text
    if (matched) {
      matched.forEach((link) => {
        let validLink = link.split(' ')[0]
        if (validLink[validLink.length - 1] === '.') {
          validLink = validLink.slice(0, -1)
        }

        transformed = transformed.replace(
          validLink,
          `<a href="${validLink}" target="_blank">${validLink}</a>`
        )
      })
    }

    return transformed
  })
}
