<template>
  <MobileView>
    <!-- <MobileView class="top-section"></MobileView> -->
    <CoverHeader
      :src="require('~/assets/images/interiors/interior2.jpg')"
      :color="themes.light.background"
    ></CoverHeader>
    <MobileView class="section">
      <p class="text-h6">{{ $t('contact.title') }}</p>
      <p class="font-weight-light">{{ $t('contact.text') }}</p>
    </MobileView>
    <MobileView class="section">
      <v-list flat three-line>
        <template v-for="(contact, id) in contacts">
          <v-list-item :key="id">
            <v-list-item-content>
              <v-list-item-title v-html="contact.key"></v-list-item-title>
              <v-list-item-subtitle
                v-html="contact.value"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </MobileView>
    <MobileView class="section">
      <v-btn
        dark
        tile
        block
        elevation="2"
        color="primary4"
        @click="dialog = true"
        >{{ $t('contact.detail.map') }}</v-btn
      >
    </MobileView>
    <v-img
      :src="require('~/assets/images/interiors/interior1.jpg')"
      width="100vw"
      height="100vw"
    ></v-img>
    <MobileView class="section">
      <p class="text-h6">{{ $t('contact.form') }}</p>
      <v-form ref="form" v-model="isValid" lazy-validation>
        <v-text-field
          v-model="form.name"
          :rules="formRules.required"
          :label="$t('contact.formDetail.name') + '*'"
          color="primary4"
          required
        ></v-text-field>

        <v-text-field
          v-model="form.email"
          :rules="formRules.required"
          :label="$t('contact.formDetail.email') + '*'"
          color="primary4"
          required
        ></v-text-field>

        <v-text-field
          v-model="form.no"
          :rules="formRules.required"
          :label="$t('contact.formDetail.no') + '*'"
          color="primary4"
          required
        ></v-text-field>

        <v-textarea
          v-model="form.detail"
          :rules="formRules.required"
          :label="$t('contact.formDetail.detail') + '*'"
          color="primary4"
          required
        ></v-textarea>

        <v-checkbox
          v-model="form.check"
          :rules="formRules.check"
          :label="$t('contact.formDetail.check') + '*'"
          color="primary4"
          required
        ></v-checkbox>

        <v-btn
          class="mt-4"
          dark
          tile
          block
          :loading="sendingEmail"
          elevation="2"
          color="primary4"
          @click="sendEmail"
          >{{ $t('contact.formDetail.send') }}</v-btn
        >
      </v-form>
    </MobileView>
    <MobileView class="section gallery-title">
      <p class="text-h6">{{ $t('contact.gallery') }}</p>
    </MobileView>
    <Gallery mobile />
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary3">
          <v-btn icon dark @click="dialog = false">
            <v-icon>fas fa-times</v-icon>
          </v-btn>
          <v-toolbar-title>{{ $t('profile.details') }}</v-toolbar-title>
        </v-toolbar>
        <Map mobile />
      </v-card>
    </v-dialog>
    <transition name="fade">
      <v-alert v-model="alert.show" class="alert" :type="alert.type">{{
        alert.text
      }}</v-alert>
    </transition>
  </MobileView>
</template>

<script>
import MobileView from '~/components/Mobile/View'
import Map from '~/components/Contact/Map'
import Gallery from '~/components/Global/Gallery'

export default {
  components: {
    MobileView,
    Map,
    Gallery,
  },
  data() {
    return {
      alert: {
        show: false,
        type: 'success',
        text: '',
      },
      contacts: [
        {
          key: this.$t('contact.detail.tel'),
          value: `<span class="font-weight-light"
                >(+49) 030 21 300 8000</span
              >`,
        },
        {
          key: this.$t('contact.detail.addr'),
          value: `<span class="font-weight-light"
                    >Uhlandstrasse 33,<br />DE-10719 Berlin, Germany.</span
                  >`,
        },
      ],
      dialog: false,
      isValid: true,
      sendingEmail: false,
      form: {
        name: '',
        email: '',
        no: '',
        detail: '',
        check: false,
      },
      formRules: {
        required: [(v) => !!v || `*${this.$t('contact.formDetail.required')}`],
        check: [(v) => !!v || `*${this.$t('contact.formDetail.valid')}`],
      },
    }
  },
  computed: {
    themes() {
      return this.$vuetify.theme.themes
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
    sendEmail() {
      if (
        !this.form.name ||
        !this.form.email ||
        !this.form.no ||
        !this.form.detail ||
        !this.form.check
      ) {
        this.$refs.form.validate()
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
          this.$refs.form.reset()
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
  width: 100vw;
  z-index: 10;
}
.top-section {
  padding: 64px 0px;
}
.section {
  padding: 5vh 5vw;
}
.section.gallery-title {
  padding-bottom: 5vw;
}
.link {
  cursor: pointer;
}
</style>
