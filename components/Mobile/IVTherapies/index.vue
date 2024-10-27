<template>
  <MobileView>
    <!-- <MobileView class="top-section"> </MobileView> -->
    <CoverHeader
      :src="require(`~/assets/B'LANCE-NT.png`)"
      contain
      width="60%"
      height="60%"
      :background-color="themes.light.lightBackground"
    ></CoverHeader>
    <MobileView class="section">
      <p class="text-h6 font-weight-bold">
        {{ $t('ivtherapies.texts[0].title') }}
      </p>
      <p
        v-for="(text, index) in contentExtractor(
          $t('ivtherapies.texts[0].text')
        )"
        :key="index"
        class="font-weight-light my-4"
        v-html="text"
      ></p>
      <div class="d-flex justify-end">
        <a
          class="text-subtitle-1 font-weight-light text-uppercase text-decoration-none"
          :style="{ color: themes.light.primary3 }"
          href="https://b-lance.me"
          target="_blank"
          >{{ $t('ivtherapies.visit') }}</a
        >
      </div>
    </MobileView>
    <v-img
      position="top center"
      :src="require('~/assets/images/treatments/treatment13.jpg')"
      width="100vw"
      height="100vw"
    ></v-img>
    <MobileView class="section">
      <p class="text-h6 font-weight-bold">
        {{ $t('ivtherapies.texts[1].title') }}
      </p>
      <p
        v-for="(text, index) in contentExtractor(
          $t('ivtherapies.texts[1].text')
        )"
        :key="index"
        class="font-weight-light my-4"
        v-html="text"
      ></p>
      <div class="d-flex justify-end">
        <a
          class="text-subtitle-1 font-weight-light text-uppercase text-decoration-none"
          :style="{ color: themes.light.primary3 }"
          href="https://b-lance.me"
          target="_blank"
          >{{ $t('ivtherapies.visit') }}</a
        >
      </div>
    </MobileView>
    <v-img
      contain
      position="top center"
      :src="require('~/assets/images/treatments/treatment12.jpg')"
      width="100vw"
    ></v-img>
    <MobileView class="section">
      <p class="text-h6 font-weight-bold">
        {{ $t('ivtherapies.texts[2].title') }}
      </p>
      <p
        v-for="(text, index) in contentExtractor(
          $t('ivtherapies.texts[2].text')
        )"
        :key="index"
        class="font-weight-light my-4"
        v-html="text"
      ></p>
      <div class="d-flex justify-end">
        <a
          class="text-subtitle-1 font-weight-light text-uppercase text-decoration-none"
          :style="{ color: themes.light.primary3 }"
          href="https://b-lance.me"
          target="_blank"
          >{{ $t('ivtherapies.visit') }}</a
        >
      </div>
    </MobileView>
    <MobileView class="section">
      <MobileView class="align-center">
        <span
          v-for="(text, index) in contentExtractor(
            $t('ivtherapies.footers[0].title')
          )"
          :key="index"
          class="text-h6 font-weight-bold text-center"
          v-html="text"
        ></span>
        <p class="font-weight-light text-center mt-4">
          {{ $t('ivtherapies.footers[0].text') }}
        </p>
        <v-btn
          elevation="2"
          color="primary4"
          tile
          dark
          block
          @click="goto('https://b-lance.me')"
        >
          <span>{{ $t('ivtherapies.footers[0].button') }}</span>
        </v-btn>
      </MobileView>
      <MobileView class="align-center mt-8">
        <p class="text-h6 font-weight-bold text-center">
          {{ $t('ivtherapies.footers[1].title') }}
        </p>
        <p class="font-weight-light text-center">
          {{ $t('ivtherapies.footers[1].text') }}
        </p>
        <v-btn
          elevation="2"
          color="primary4"
          tile
          outlined
          block
          @click="gotoContact"
        >
          <span>{{ $t('ivtherapies.footers[1].button') }}</span>
        </v-btn>
      </MobileView>
    </MobileView>
  </MobileView>
</template>

<script>
import MobileView from '~/components/Mobile/View'
import CoverHeader from '~/components/Mobile/CoverHeader'

import { contentExtractor, finalpath } from '~/helpers'

export default {
  components: {
    MobileView,
    CoverHeader,
  },
  data() {
    return {
      mainLogoWidthSize: '30vh',
    }
  },
  computed: {
    locale() {
      return this.$store.state.locale
    },
    themes() {
      return this.$vuetify.theme.themes
    },
    drawer: {
      set(val) {
        this.$store.commit('SET_SIDENAV', val)
      },
      get() {
        return this.$store.state.sideNav
      },
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
        path: finalpath(this.locale, 'contact', true),
      })
    },
  },
}
</script>

<style scoped>
a {
  text-decoration: none;
}
.top-section {
  padding: 64px 0px;
}
.section {
  padding: 5vh 5vw;
}
</style>
