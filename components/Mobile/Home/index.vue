<template>
  <MobileView>
    <v-fab-transition>
      <v-btn
        v-show="false"
        elevation="2"
        color="primary3"
        dark
        fab
        fixed
        top
        left
        small
        @click="drawer = !drawer"
        ><v-icon small>fas fa-bars</v-icon></v-btn
      >
    </v-fab-transition>
    <div ref="headerMobile" class="d-flex justify-space-between header">
      <div class="d-flex align-center">
        <v-btn small icon color="primary3" @click="drawer = !drawer"
          ><v-icon small>fas fa-bars</v-icon></v-btn
        >
        <!-- <SocialMedia small /> -->
      </div>
      <!-- <Locale is-mobile /> -->
    </div>
    <div
      ref="section1"
      class="d-flex flex-column justify-space-between align-center section mt-n12"
      :class="{ section1: stick[0] }"
    >
      <MobileView class="align-center">
        <CustomSVG
          :src="require('~/assets/main-logo.svg')"
          :width="mainLogoWidth"
          :height="mainLogoHeight"
          :color="themes.light.primary3"
          cover
        ></CustomSVG>
        <!-- <span
          :style="{ color: themes.light.lightPrimary3 }"
          class="font-weight-medium text-center text-uppercase"
        >
          {{ $t('welcome.title') }}
        </span> -->
      </MobileView>
      <v-img
        contain
        position="center"
        :src="require('~/assets/fig_2.png')"
        width="24vh"
        height="51vh"
      ></v-img>
    </div>
    <div
      ref="section2"
      :style="lightBackground"
      class="d-flex flex-column justify-center align-center section philosophy"
      :class="{ section2: stick[1] }"
    >
      <span class="text-h6">
        {{ $t('welcome.philosophy') }}
      </span>
    </div>
    <div
      ref="section3"
      class="d-flex flex-column justify-center align-center section infusion"
      :class="{ section3: stick[2] }"
    >
      <span class="text-h6 mb-4 text-uppercase font-weight-light">
        {{ $t('welcome.infusion') }}
      </span>
      <v-img
        :style="figure2LogoStyle"
        contain
        :src="require(`~/assets/B'lance.png`)"
        width="85vw"
      ></v-img>
      <v-img contain :src="require('~/assets/fig_1.png')" width="25vh"></v-img>
      <nuxt-link
        :style="[{ color: themes.light.primary3 }, figure2MoreInfoStyle]"
        :to="finalpath('ivtherapies')"
      >
        <div class="d-flex align-center">
          <span>
            {{ $t('welcome.discover') }}
          </span>
          <CustomSVG
            class="ml-2"
            size="1.5rem"
            :src="require('bootstrap-icons/icons/arrow-right.svg')"
            :color="themes.light.primary3"
          />
        </div>
      </nuxt-link>
    </div>
    <div
      ref="section4"
      :style="lightBackground"
      class="d-flex flex-column justify-center align-center section infusion procedure"
      :class="{ section4: stick[3] }"
    >
      <swiper style="margin: 0" :options="swiperOption">
        <swiper-slide :key="0">
          <MobileView class="justify-center align-center full">
            <v-img
              contain
              :src="require('~/assets/fig_3.png')"
              width="80vw"
            ></v-img>
          </MobileView>
        </swiper-slide>
        <swiper-slide :key="1">
          <MobileView class="justify-center align-center full">
            <v-img
              contain
              :src="require('~/assets/fig_4.png')"
              width="80vw"
            ></v-img>
          </MobileView>
        </swiper-slide>
        <div slot="pagination" class="swiper-pagination"></div>
      </swiper>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
      <span
        class="text-h6 mb-4 text-uppercase text-center font-weight-light procedure-title"
      >
        {{ $t('welcome.procedure') }}
      </span>
      <MobileView class="discover-procedure">
        <v-btn
          elevation="2"
          color="primary3"
          tile
          dark
          block
          @click="$router.push({ path: finalpath('procedures') })"
        >
          <span>{{ $t('welcome.discover3') }}</span>
        </v-btn>
      </MobileView>
    </div>
  </MobileView>
</template>

<script>
import MobileView from '~/components/Mobile/View'
import CustomSVG from '~/components/Global/CustomSVG'
// import SocialMedia from '~/components/Global/SocialMedia'
// import Locale from '~/components/Global/Locale'

import { finalpath } from '~/helpers'

export default {
  components: {
    MobileView,
    CustomSVG,
    // SocialMedia,
    // Locale,
  },
  data() {
    return {
      mainLogoWidthSize: 30,
      locales: ['en', 'de'],
      hidden: true,
      stick: [false, false, false, false],
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 0,
        centeredSlides: true,
        grabCursor: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true,
        },
      },
    }
  },
  computed: {
    locale: {
      get() {
        return this.$store.state.locale
      },
      set(val) {
        this.$store.commit('SET_LOCALE', val)
      },
    },
    drawer: {
      set(val) {
        this.$store.commit('SET_SIDENAV', val)
      },
      get() {
        return this.$store.state.sideNav
      },
    },
    themes() {
      return this.$vuetify.theme.themes
    },
    mainLogoWidth() {
      return `${this.mainLogoWidthSize}vh`
    },
    mainLogoHeight() {
      return `${0.4 * this.mainLogoWidthSize}vh`
    },
    lightBackground() {
      return {
        background: this.themes.light.lightBackground,
      }
    },
    figure2LogoStyle() {
      return {
        position: 'absolute',
        transform: 'translateX(-50%)',
        top: '17%',
        left: '50%',
        opacity: '70%',
      }
    },
    figure2MoreInfoStyle() {
      return {
        position: 'absolute',
        bottom: '15%',
        right: '4%',
      }
    },
  },
  mounted() {
    const pageComponent = document.getElementById('mobile-screen')
    pageComponent.addEventListener('scroll', this.scrollInit, {
      passive: true,
    })
  },
  methods: {
    finalpath(path) {
      return finalpath(this.locale, path, true)
    },
    scrollInit() {
      // this.makeItStick() // disabled for temporary
      this.showingFAB()
    },
    makeItStick() {
      const s1 = this.$refs.section1
      const s2 = this.$refs.section2
      const s3 = this.$refs.section3
      const s4 = this.$refs.section4

      if (!s1 || !s2 || !s3 || !s4) {
        return false
      }
      const rect1 = s1.getBoundingClientRect()
      const rect2 = s2.getBoundingClientRect()
      const rect3 = s3.getBoundingClientRect()
      const rect4 = s4.getBoundingClientRect()

      console.log({ rect1, rect2, rect3, rect4 })
      if (rect1.top <= 0) {
        this.stick[0] = true
      }
      if (rect2.top <= 0) {
        this.stick[1] = true
      }
      if (rect3.top <= 0) {
        this.stick[2] = true
      }
      if (rect4.top <= 0) {
        this.stick[3] = true
      }

      if (rect1.top > 0) {
        this.stick[0] = false
      }
      if (rect2.top > 0) {
        this.stick[1] = false
      }
      if (rect3.top > 0) {
        this.stick[2] = false
      }
      if (rect4.top > 0) {
        this.stick[3] = false
      }
    },
    showingFAB() {
      const el = this.$refs.headerMobile
      if (!el) {
        return false
      }

      const rect = el.getBoundingClientRect()

      if (rect.top < -60) {
        this.hidden = false
      }
      if (rect.top >= -60) {
        this.hidden = true
      }
    },
  },
}
</script>

<style scoped>
a {
  text-decoration: none;
}
.header {
  padding: 10px;
}
.section {
  padding: 10vh 10vw;
  min-height: 100vh;
}
.section.philosophy {
  min-height: 50vh;
}
.section.infusion {
  position: relative;
}
.full {
  height: 100vh;
  width: 100vw;
}
.section.procedure {
  padding: 0px;
}

.section1 {
  z-index: 0;
  position: fixed;
}
.section2 {
  z-index: 1;
  position: fixed;
}
.section3 {
  z-index: 2;
  position: fixed;
}
.section4 {
  z-index: 3;
  position: fixed;
}

.discover-procedure {
  z-index: 1;
  position: absolute;
  padding: 5vh 5vw;
  width: 100vw;
  bottom: 0px;
}
.procedure-title {
  transform: translate(-50%, -50%);
  position: absolute;
  left: 50vw;
  top: 60px;
  width: 100vw;
}

.swiper-slide {
  width: auto;
  height: auto;
}
.swiper-button-prev {
  color: #d2af69;
}
.swiper-button-next {
  color: #d2af69;
}
.swiper-pagination >>> .swiper-pagination-bullet-active {
  background-color: #d2af69;
}
</style>
