<template>
  <div :id="id" style="margin-top: -48px" class="contact-wrapper">
    <CoverPicture :src="require('~/assets/images/interiors/interior2.jpg')">
      <CoverScroll target="#top-contact" />
    </CoverPicture>

    <div id="top-contact">
      <div class="section">
        <Title>{{ $t('contact.title') }}</Title>
        <v-row class="mt-6" justify="space-between">
          <v-col :cols="8">
            <p class="text-h6 font-weight-light">{{ $t('contact.text') }}</p>
          </v-col>
          <v-col :cols="3">
            <div class="d-flex justify-space-between">
              <span class="text-h6 font-weight-light"
                >{{ $t('contact.detail.tel') }}:</span
              >
              <span class="text-h6 font-weight-light"
                >(+49) 030 21 300 8000</span
              >
            </div>
            <div class="d-flex justify-space-between">
              <v-row>
                <v-col>
                  <span class="text-h6 font-weight-light"
                    >{{ $t('contact.detail.addr') }}:</span
                  >
                  <br />
                  <div class="mt-8">
                    <span
                      class="font-weight-light link"
                      :style="primary3TextColor"
                      @click="$vuetify.goTo('#map', scrollOptions)"
                      >{{ $t('contact.detail.map') }} ></span
                    >
                  </div>
                </v-col>
                <v-col style="text-align: right" :cols="7">
                  <span class="text-h6 font-weight-light"
                    >Uhlandstrasse 33,<br />DE-10719 Berlin, Germany.</span
                  >
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </div>
      <div
        id="contact-form"
        class="contact-section d-flex align-stretch"
        :style="lightBackground"
      >
        <div class="form-cover">
          <v-img
            :src="require('~/assets/images/interiors/interior1.jpg')"
            width="100%"
            height="100%"
          ></v-img>
        </div>
        <div class="form">
          <Title>{{ $t('contact.form') }}</Title>
          <v-row class="contact-address-container">
            <v-col>
              <form class="d-flex flex-column">
                <input
                  v-model="form.name"
                  class="contact-input-text"
                  :style="isNotValidStyle"
                  :placeholder="$t('contact.formDetail.name') + '*'"
                />
                <input
                  v-model="form.email"
                  class="contact-input-text"
                  :style="isNotValidStyle"
                  :placeholder="$t('contact.formDetail.email') + '*'"
                />
                <input
                  v-model="form.no"
                  class="contact-input-text"
                  :style="isNotValidStyle"
                  :placeholder="$t('contact.formDetail.no') + '*'"
                />
                <textarea
                  v-model="form.detail"
                  class="contact-input-text text-area-style"
                  :style="isNotValidStyle"
                  :placeholder="$t('contact.formDetail.detail')"
                />
                <span class="text-caption font-weight-light my-3 ml-2">
                  {{ $t('contact.formDetail.statement') }}
                </span>
                <span
                  v-if="isNotValid"
                  class="text-subtitle-2 ml-2"
                  :style="validatorStyle"
                >
                  *{{ $t('contact.formDetail.valid') }}
                </span>
                <v-checkbox
                  v-model="form.check"
                  class="ml-2"
                  :label="$t('contact.formDetail.check') + '*'"
                ></v-checkbox>
                <div class="d-flex flex-column align-self-center submit-button">
                  <v-btn
                    dark
                    tile
                    :loading="sendingEmail"
                    elevation="2"
                    x-large
                    :color="themes.light.primary4"
                    :ripple="false"
                    @click="sendEmail"
                    >{{ $t('contact.formDetail.send') }}</v-btn
                  >
                </div>
              </form>
            </v-col>
          </v-row>
        </div>
      </div>
      <div class="section gallery-top">
        <Title>{{ $t('contact.gallery') }}</Title>
      </div>
      <Gallery />
      <div class="section gallery-bottom"></div>
      <Map id="map" />
    </div>
    <transition name="fade">
      <v-alert v-model="alert.show" class="alert" :type="alert.type">{{
        alert.text
      }}</v-alert>
    </transition>
  </div>
</template>

<script>
import Map from './Map'
import CoverPicture from '~/components/Global/CoverPicture'
import CoverScroll from '~/components/Global/CoverScroll'
import Gallery from '~/components/Global/Gallery'
import Title from '~/components/Contact/Title'
import MessageIcon from '~/assets/icons/message.svg'
import { finalpath } from '~/helpers'

export default {
  components: {
    Map,
    CoverPicture,
    CoverScroll,
    Gallery,
    Title,
  },
  data() {
    return {
      MessageIcon,
      id: 'contact',
      isNotValid: false,
      sendingEmail: false,
      alert: {
        show: false,
        type: 'success',
        text: '',
      },
      form: {
        name: '',
        email: '',
        no: '',
        detail: '',
        check: false,
      },
    }
  },
  computed: {
    locale() {
      return this.$store.state.locale
    },
    themes() {
      return this.$vuetify.theme.themes
    },
    titleStyle() {
      return {
        color: this.themes.light.primary4,
      }
    },
    primary3TextColor() {
      return {
        color: this.themes.light.primary3,
      }
    },
    lightBackground() {
      return {
        background: this.themes.light.lightBackground,
      }
    },
    scrollOptions() {
      return {
        duration: 1000,
        offset: 48,
        easing: 'easeInOutQuint',
      }
    },
    submitButton() {
      return {
        width: '30%',
      }
    },
    validatorStyle() {
      return {
        color: this.themes.light.primary2,
      }
    },
    isNotValidStyle() {
      return {
        borderColor: this.isNotValid ? this.themes.light.primary2 : undefined,
      }
    },
  },
  mounted() {
    this.checkMailEndPoint()
  },
  methods: {
    checkMailEndPoint() {
      const tmpOrigin = 'https://nidal-toman.herokuapp.com'
      const url = new URL('/api/mail', tmpOrigin)

      this.$axios.$get(url, this.form).then(() => {
        console.log('Mail ready!')
      })
    },
    alertShow(text, type = 'success') {
      this.alert = {
        show: true,
        type,
        text,
      }
      setTimeout(() => {
        this.alert = {
          show: false,
          type: 'success',
          text: '',
        }
      }, 3000)
    },
    gotoProfile() {
      this.$router.push({ path: finalpath(this.locale, 'profile') })
    },
    sendEmail() {
      if (
        !this.form.name ||
        !this.form.email ||
        !this.form.no ||
        !this.form.detail ||
        !this.form.check
      ) {
        this.isNotValid = true
        return
      }

      this.sendingEmail = true
      // const origin = window.location.origin
      const tmpOrigin = 'https://nidal-toman.herokuapp.com'
      const url = new URL('/api/mail', tmpOrigin)

      this.$axios
        .$post(url, this.form)
        .then(() => {
          this.alertShow('Mail sent!')
          console.log('Mail sent!')
        })
        .catch((err) => {
          this.alertShow(err, 'error')
          console.log(err)
        })
        .finally(() => {
          this.form.name = ''
          this.form.email = ''
          this.form.no = ''
          this.form.detail = ''
          this.form.check = false
          this.isNotValid = false
          this.sendingEmail = false
        })
    },
  },
}
</script>

<style scoped>
.alert {
  position: fixed;
  top: 0px;
  z-index: 10;
}

.link {
  cursor: pointer;
}

.section {
  padding: 84px 60px 160px 60px;
}
.contact-section {
  padding: 200px 60px;
}
.section.gallery-top {
  padding-bottom: 36px;
}
.section.gallery-bottom {
  padding-top: 160px;
}

.form-cover {
  width: 50vw;
}

.form {
  flex-grow: 1;
  padding: 0 24px;
}

.submit-button {
  width: 30%;
}

.contact-address-container {
  padding: 36px 0px;
}

.contact-input-text {
  border-bottom: 0.5px solid #6c756b;
  box-sizing: border-box;
  height: 42px;
  font-size: 14px;
  line-height: 19px;
  color: #6c756b;
  padding: 0px 20px;
  outline: none;
}

.text-area-style {
  padding: 15px 20px;
  height: 100px;
}

.contact-input-text:hover {
  border-color: #d2af69;
}
</style>
