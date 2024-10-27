<template>
  <div :id="id" class="wrapper">
    <CoverPicture
      :custom-background="themes.light.lightBackground"
      contain
      cover-width="80%"
      cover-height="60%"
      :src="require(`~/assets/B'LANCE-NT.png`)"
    >
      <!-- <v-row :style="logoContainer" justify="center" align="center">
        <v-img
          :style="logoStyle"
          contain
          :src="require(`~/assets/B'lance.png`)"
          height="80vh"
        >
        </v-img>
      </v-row> -->
      <CoverScroll target="#top-ivtherapies" :color="themes.light.primary4" />
    </CoverPicture>
    <div id="top-ivtherapies">
      <div class="section">
        <Section width="100%">
          <p class="text-h4 font-weight-bold my-12">
            {{ $t('ivtherapies.texts[0].title') }}
          </p>
          <p
            v-for="(text, index) in contentExtractor(
              $t('ivtherapies.texts[0].text')
            )"
            :key="index"
            class="text-h6 font-weight-light my-12"
            v-html="text"
          ></p>
          <div class="d-flex justify-end">
            <a
              class="text-subtitle-1 font-weight-light text-uppercase text-decoration-none"
              :style="linkStyle"
              href="https://b-lance.me"
              target="_blank"
              >{{ $t('ivtherapies.visit') }}</a
            >
          </div>
        </Section>
      </div>
      <div :style="parallaxStyle" class="parallax-section"></div>
      <div class="section" :style="lightBackground">
        <Section width="100%">
          <p class="text-h4 font-weight-bold my-12">
            {{ $t('ivtherapies.texts[1].title') }}
          </p>
          <p
            v-for="(text, index) in contentExtractor(
              $t('ivtherapies.texts[1].text')
            )"
            :key="index"
            class="text-h6 font-weight-light my-12"
            v-html="text"
          ></p>
          <div class="d-flex justify-end">
            <a
              class="text-subtitle-1 font-weight-light text-uppercase text-decoration-none"
              :style="linkStyle"
              href="https://b-lance.me"
              target="_blank"
              >{{ $t('ivtherapies.visit') }}</a
            >
          </div>
        </Section>
      </div>
      <div class="section">
        <Section right>
          <p class="text-h4 font-weight-bold my-12">
            {{ $t('ivtherapies.texts[2].title') }}
          </p>
          <p
            v-for="(text, index) in contentExtractor(
              $t('ivtherapies.texts[2].text')
            )"
            :key="index"
            class="text-h6 font-weight-light my-12"
            v-html="text"
          ></p>
          <div class="d-flex justify-end">
            <a
              class="text-subtitle-1 font-weight-light text-uppercase text-decoration-none"
              :style="linkStyle"
              href="https://b-lance.me"
              target="_blank"
              >{{ $t('ivtherapies.visit') }}</a
            >
          </div>
        </Section>
        <div class="image-left">
          <ProfilePicture
            :src="require('~/assets/images/treatments/treatment12.jpg')"
            height="81vh"
            width="54vh"
            horizontal
          ></ProfilePicture>
        </div>
      </div>

      <div class="full-width end-page" :style="lightBackground">
        <div class="d-flex justify-center">
          <div class="d-flex flex-column align-center footer-comp mr-12">
            <span
              v-for="(text, index) in contentExtractor(
                $t('ivtherapies.footers[0].title')
              )"
              :key="index"
              class="text-h6 font-weight-bold text-center"
              v-html="text"
            ></span>
          </div>
          <div class="d-flex flex-column align-center footer-comp">
            <p class="text-h6 font-weight-bold text-center">
              {{ $t('ivtherapies.footers[1].title') }}
            </p>
          </div>
        </div>
        <div class="d-flex justify-center">
          <div class="d-flex flex-column align-center footer-comp mr-12">
            <p class="text-h6 font-weight-light text-center">
              {{ $t('ivtherapies.footers[0].text') }}
            </p>
          </div>
          <div class="d-flex flex-column align-center footer-comp">
            <p class="text-h6 font-weight-light text-center">
              {{ $t('ivtherapies.footers[1].text') }}
            </p>
          </div>
        </div>
        <div class="d-flex justify-center">
          <div class="d-flex flex-column align-center footer-comp mr-12">
            <div class="d-flex flex-column align-center button">
              <v-btn
                elevation="2"
                color="primary4"
                tile
                large
                dark
                block
                :ripple="false"
                @click="goto('https://b-lance.me')"
              >
                <span>{{ $t('ivtherapies.footers[0].button') }}</span>
              </v-btn>
            </div>
          </div>
          <div class="d-flex flex-column align-center footer-comp">
            <div class="d-flex flex-column align-center button">
              <v-btn
                elevation="2"
                color="primary4"
                tile
                outlined
                large
                block
                :ripple="false"
                @click="gotoContact"
              >
                <span>{{ $t('ivtherapies.footers[1].button') }}</span>
              </v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CoverScroll from '~/components/Global/CoverScroll'
import Section from '~/components/Profile/PSection'
import ProfilePicture from '~/components/Profile/ProfilePicture'

import { contentExtractor, finalpath } from '~/helpers'

export default {
  components: {
    CoverScroll,
    Section,
    ProfilePicture,
  },
  data() {
    return {
      id: 'ivtherapies',
    }
  },
  computed: {
    locale() {
      return this.$store.state.locale
    },
    themes() {
      return this.$vuetify.theme.themes
    },
    logoContainer() {
      return {
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        top: '50%',
        left: '50%',
        width: '100vw',
        height: '100vh',
      }
    },
    logoStyle() {
      return {
        opacity: '40%',
      }
    },
    lightBackground() {
      return {
        background: this.themes.light.lightBackground,
      }
    },
    linkStyle() {
      return {
        color: this.themes.light.primary3,
      }
    },
    parallaxStyle() {
      return {
        backgroundImage: `url(${require('~/assets/images/treatments/treatment13.jpg')})`,
      }
    },
  },
  methods: {
    contentExtractor(input) {
      return contentExtractor(input)
    },
    goto(link) {
      window.open(link, '_blank')
    },
    gotoContact() {
      this.$router.push({
        path: finalpath(this.locale, 'contact'),
        hash: '#contact-form',
      })
    },
  },
}
</script>

<style scoped>
.wrapper {
  margin-top: -48px;
}

.section {
  position: relative;
}

.parallax-section {
  width: 100vw;
  height: 60vh;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-position: top;
}

.image-left {
  position: absolute;
  bottom: -3vw;
  left: 200px;
  z-index: 1;
}
@media only screen and (max-width: 1440px) {
  .image-left {
    left: 80px;
  }
}

.end-page {
  padding: 160px;
}

.full-width {
  width: 100vw;
}

.footer-comp {
  width: 25%;
}

.button {
  width: 85%;
}
</style>
