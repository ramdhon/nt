<template>
  <div
    :id="id"
    class="welcome-container"
    :style="welcomeContainerStyle"
    @wheel="getEvent"
  >
    <div :style="welcomeMainStyle" class="welcome-main pa-6">
      <v-row class="welcome-main-logo">
        <v-col cols="2"></v-col>
        <v-col cols="2">
          <div v-if="showPos" :style="mainLogoStyle">
            {{ welcomeMainLeftPos }} | {{ innerWidth }} | {{ userAgent }}
          </div>
        </v-col>
        <v-col :style="localeStyle" cols="2">
          <v-row justify="end">
            <Locale :custom-style="localeStyleTop" custom-class="mr-9 mt-3" />
          </v-row>
        </v-col>
        <v-col cols="6"></v-col>
      </v-row>
      <v-row class="full-height" align-content="end">
        <TopNav
          :nav-style="[topNavStyle]"
          :slider-color="themes.light.primary3"
          :custom-slider="true"
        />
        <div :style="[welcomeBannerStyle, welcomeBannerOpacityStyle]">
          <div class="d-flex flex-column align-center">
            <!-- <span :style="[titleStyle]" class="text-h4 font-weight-light">
              {{ $t('welcome.title1') }}
            </span> -->
            <CustomSVG
              :src="require('~/assets/main-logo.svg')"
              :width="mainLogoWidth"
              :height="mainLogoHeight"
              :color="themes.light.primary3"
              :cover="true"
            ></CustomSVG>
            <!-- <span :style="nameStyle" class="text-h3 mt-3">
              {{ $t('welcome.title2') }}
            </span> -->
            <span
              :style="{ color: themes.light.lightPrimary3 }"
              class="text-h5 font-weight-medium text-center text-uppercase"
            >
              {{ $t('welcome.title') }}
            </span>
            <!-- <span class="text-h6 font-weight-thin">
              {{ $t('welcome.philosophy') }}
            </span> -->
          </div>
        </div>
        <div :style="[welcomeBannerStyle, philosophyOpacityStyle]">
          <div class="d-flex flex-column align-center">
            <span
              :style="{ color: themes.light.lightPrimary3 }"
              class="text-h4"
            >
              {{ $t('welcome.philosophyHead') }} {{ $t('welcome.philosophy') }}
            </span>
          </div>
        </div>
        <div :style="figure1">
          <v-img
            contain
            position="bottom right"
            :src="require('~/assets/fig_2.png')"
            width="40vh"
            height="85vh"
          ></v-img>
        </div>
        <div :style="figure2" class="d-flex flex-column align-center">
          <span
            :style="[
              titleStyle,
              { color: themes.light.lightPrimary3, fontSize: '36px' },
            ]"
            class="mb-16 font-weight-light"
          >
            {{ $t('welcome.infusion') }}
          </span>
          <v-img
            :style="figure2LogoStyle"
            contain
            :src="require(`~/assets/B'lance.png`)"
            width="90vh"
          ></v-img>
          <v-img
            contain
            :src="require('~/assets/fig_1.png')"
            height="60vh"
          ></v-img>
          <nuxt-link
            :style="[discoverTextStyle, figure2MoreInfoStyle]"
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
        <div :style="figureWoman" class="d-flex flex-column align-center">
          <span
            :style="[maleFemaleStyle, womanLabel]"
            class="text-h4 font-weight-light"
          >
            {{ $t('welcome.woman') }}
          </span>
          <nuxt-link
            class="font-weight-light"
            :style="[moreInfoStyle, moreInfoWoman, discover2Style]"
            :to="finalpath('treatment') + '?figure=female'"
          >
            <div class="d-flex align-center justify-end">
              <span style="width: 130px">
                {{ $t('welcome.discover2') }}
              </span>
              <CustomSVG
                class="ml-2"
                size="1.5rem"
                :src="require('bootstrap-icons/icons/arrow-right.svg')"
                :color="themes.light.primary"
              />
            </div>
          </nuxt-link>
          <v-img
            contain
            :src="require('~/assets/fig_3.png')"
            height="80vh"
          ></v-img>
        </div>
        <div :style="figureMan" class="d-flex flex-column align-center">
          <span
            :style="[maleFemaleStyle, manLabel]"
            class="text-h4 font-weight-light"
          >
            {{ $t('welcome.man') }}
          </span>
          <nuxt-link
            class="font-weight-light"
            :style="[moreInfoStyle, moreInfoMan, discover2Style]"
            :to="finalpath('treatment') + '?figure=male'"
          >
            <div class="d-flex align-center justify-start">
              <span style="width: 130px">
                {{ $t('welcome.discover2') }}
              </span>
              <CustomSVG
                class="ml-2"
                size="1.5rem"
                :src="require('bootstrap-icons/icons/arrow-right.svg')"
                :color="themes.light.primary"
              />
            </div>
          </nuxt-link>
          <v-img
            contain
            :src="require('~/assets/fig_4.png')"
            height="80vh"
          ></v-img>
        </div>
        <div :style="[moreInfoStyle, localeStyleTop, secondLocaleStyle]">
          <Locale />
        </div>
        <div class="d-flex align-center" :style="[moreInfoStyle, legalStyle]">
          <SocialMedia :small="true" />
          <div class="mx-1" />
          <Legal />
        </div>
      </v-row>
    </div>
  </div>
</template>

<script>
import CustomSVG from '~/components/Global/CustomSVG'
import TopNav from '~/components/Global/TopNav'
import Locale from '~/components/Global/Locale'
import Legal from '~/components/Global/Legal'
import { finalpath } from '~/helpers'
import SocialMedia from '~/components/Global/SocialMedia'

export default {
  components: {
    TopNav,
    Locale,
    Legal,
    SocialMedia,
    CustomSVG,
  },
  data() {
    return {
      // please aware this default position in default condition of animation function
      id: 'welcome',
      timeoutID: null,
      welcomeMainLeftPos: 0,
      welcomeBannerLeftPos: 0,
      bannerOpacity: 1,
      philosophyOpacity: 0,
      figure1RightPos: 0,
      figure2LeftPos: 0,
      mainLogoWidthSize: 75,
      figureWomanRightPos: 0,
      figureManRightPos: 0,
      moreInfoOpacity: 0,
      figure2MoreInfoRightPos: 0,
      atStart: true,
      atEnd: false,
      innerWidth: 0,
      showPos: false,
      speedRatio: 1 / 20,
    }
  },
  computed: {
    userAgent: {
      set(val) {
        this.$store.commit('SET_USERAGENT', val)
      },
      get() {
        return this.$store.state.userAgent
      },
    },
    tab: {
      set(val) {
        this.$store.commit('SET_TAB', val)
      },
      get() {
        return this.$store.state.tab
      },
    },
    path: {
      set(val) {
        this.$store.commit('SET_PATH', val)
      },
      get() {
        return this.$store.state.path
      },
    },
    locale: {
      set(val) {
        this.$store.commit('SET_LOCALE', val)
      },
      get() {
        return this.$store.state.locale
      },
    },
    labels() {
      return this.$store.state.labels
    },
    sectionID() {
      return this.$store.state.sectionID
    },
    maxDelta() {
      return this.$store.state.maxScrollDeltaSpeedBetweenSection
    },
    atLeft() {
      return this.welcomeMainLeftPos === 0
    },
    atRight() {
      return this.welcomeMainLeftPos === -window.innerWidth
    },
    fromID() {
      return this.$store.state.fromID
    },
    currentID() {
      return this.$store.state.currentID
    },

    // custom-styling
    themes() {
      return this.$vuetify.theme.themes
    },
    welcomeContainerStyle() {
      return {
        background: `linear-gradient(180.17deg, rgba(254, 249, 255, 0.46) 0.14%, rgba(229, 229, 229, 0) 64.64%)`,
      }
    },
    titleStyle() {
      return {
        textTransform: 'uppercase',
      }
    },
    nameStyle() {
      return {
        fontFamily: 'Adamina!important',
        color: this.themes.light.primary3,
      }
    },
    maleFemaleStyle() {
      return {
        // color: this.themes.light.primary3,
        visibility: 'hidden',
      }
    },
    discoverTextStyle() {
      return {
        color: this.themes.light.primary3,
      }
    },
    tabsStyle() {
      return {
        borderLeftStyle: 'solid',
        borderColor: this.themes.light.primary3,
        borderWidth: '1px',
      }
    },
    welcomeMainStyle() {
      return {
        position: 'absolute',
        left: `${this.welcomeMainLeftPos}px`,
      }
    },
    localeStyle() {
      return {
        opacity: this.bannerOpacity,
        zIndex: this.bannerOpacity === 0 ? -1 : 6,
      }
    },
    localeStyleTop() {
      return {
        position: 'absolute',
        top: '0px',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
      }
    },
    welcomeBannerStyle() {
      return {
        width: '30%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
        left: `calc(25% + ${this.welcomeBannerLeftPos}px)`,
        top: '50%',
      }
    },
    welcomeBannerOpacityStyle() {
      return {
        opacity: this.bannerOpacity,
      }
    },
    philosophyOpacityStyle() {
      return {
        opacity: this.philosophyOpacity,
      }
    },
    leftMainLogoPos() {
      return `calc(50vw - ${this.mainLogoWidthSize / 2}vh + ${
        this.welcomeBannerLeftPos
      }px)`
    },
    mainLogoStyle() {
      return {
        position: 'absolute',
        left: this.leftMainLogoPos,
        top: '24px',
      }
    },
    discover2Style() {
      return {
        width: '30%',
      }
    },
    figure1() {
      return {
        position: 'absolute',
        bottom: '0px',
        right: `${100 - this.figure1RightPos}vw`,
      }
    },
    figure2() {
      return {
        width: '100vh',
        position: 'absolute',
        bottom: '5vh',
        left: `${this.figure2LeftPos + 250}vw`,
      }
    },
    figure2MoreInfoStyle() {
      return {
        position: 'absolute',
        bottom: '2%',
        right: `${this.figure2MoreInfoRightPos + 42}%`,
      }
    },
    figure2LogoStyle() {
      return {
        position: 'absolute',
        bottom: '7%',
        // right: `calc(50vh - 45vh)`,
        right: `${this.figure2MoreInfoRightPos + 42}%`,
        opacity: '70%',
      }
    },
    figureWoman() {
      return {
        width: '50vw',
        position: 'absolute',
        bottom: '0vh',
        right: `${this.figureWomanRightPos}px`,
      }
    },
    figureMan() {
      return {
        width: '50vw',
        position: 'absolute',
        bottom: '18vh',
        right: `${this.figureManRightPos}px`,
      }
    },
    moreInfoStyle() {
      return {
        opacity: this.moreInfoOpacity,
      }
    },
    womanLabel() {
      return {
        position: 'absolute',
        top: '5%',
        left: '46%',
      }
    },
    moreInfoWoman() {
      return {
        position: 'absolute',
        top: '20%',
        right: '15%',
        zIndex: 1,
      }
    },
    manLabel() {
      return {
        position: 'absolute',
        top: '12%',
        right: '48%',
      }
    },
    moreInfoMan() {
      return {
        position: 'absolute',
        top: '35%',
        left: '15%',
        zIndex: 1,
      }
    },
    topNavStyle() {
      return {
        position: 'absolute',
        top: '0px',
        left: `${this.welcomeBannerLeftPos}px`,
      }
    },
    legalStyle() {
      return {
        position: 'absolute',
        bottom: '24px',
        right: '36px',
        zIndex: 2,
      }
    },
    secondLocaleStyle() {
      return {
        position: 'absolute',
        top: '12px',
        right: '36px',
        zIndex: 5,
      }
    },
    mainLogoWidth() {
      return `${this.mainLogoWidthSize}vh`
    },
    mainLogoHeight() {
      return `${0.45 * this.mainLogoWidthSize}vh`
    },
  },
  watch: {
    welcomeMainLeftPos(val) {
      if (val <= -window.innerWidth) {
        const proceduresIndex = this.labels.indexOf('procedures')
        this.tab = proceduresIndex
        this.path = 'procedures'
      }
      if (val >= 0) {
        const welcomeIndex = this.labels.indexOf('welcome')
        this.tab = welcomeIndex
        this.path = 'welcome'
      }
    },
    path(val, old) {
      if (old === undefined) {
        return
      }
      const innerWidth = window.innerWidth
      let deltaY = 0
      const delta = innerWidth / this.speedRatio
      if (val === 'welcome') {
        deltaY = -delta
      }
      if (val === 'procedures') {
        deltaY = delta
      }
      this.animateAll(0, deltaY)
    },
  },
  mounted() {
    if (this.$route.query.pos === 'true') {
      this.showPos = true
    }
    const innerWidth = window.innerWidth
    this.innerWidth = innerWidth
    let deltaY = 0

    if (this.$route.query && this.$route.query.id === 'procedures') {
      deltaY = innerWidth / this.speedRatio
    }

    this.animateAll(0, deltaY)
  },
  methods: {
    getEvent(e) {
      e.preventDefault()
      e.stopPropagation()

      this.checkEdgeSection()

      this.animateAll(e.deltaX, e.deltaY)

      // this.jumpSection(e.deltaX, e.deltaY)
    },
    finalpath(path) {
      return finalpath(this.locale, path)
    },
    animateAll(deltaX, deltaY) {
      this.animateMainContainer(deltaX, deltaY)
      this.animateWelcomeBanner(deltaX, deltaY)
      this.animatePhilosophyOpacity(deltaX, deltaY)
      this.animateFigureOne(deltaX, deltaY)
      this.animateFigureTwo(deltaX, deltaY)
      this.animateFigureWoman(deltaX, deltaY)
      this.animateFigureMan(deltaX, deltaY)
    },
    checkEdgeSection() {
      if (this.atLeft) {
        if (this.timeoutID === null) {
          this.timeoutID = setTimeout(() => {
            this.atStart = true
          }, 1000)
        }
      } else if (this.atRight) {
        if (this.timeoutID === null) {
          this.timeoutID = setTimeout(() => {
            this.atEnd = true
          }, 1000)
        }
      } else {
        if (this.timeoutID !== null) {
          clearTimeout(this.timeoutID)
          this.timeoutID = null
        }

        this.atStart = false
        this.atEnd = false
      }
    },
    jumpSection(deltaX, deltaY) {
      const prevSection = this.sectionID.find(
        (id, index) => this.sectionID[index + 1] === '#' + this.id
      )
      const nextSection = this.sectionID.find(
        (id, index) => this.sectionID[index - 1] === '#' + this.id
      )

      // executing next / prev section
      if (this.atStart || this.atEnd) {
        const options = {
          duration: 1000,
          offset: 0,
          easing: 'easeInOutQuint',
        }
        let target

        if (deltaY < -this.maxDelta && this.atStart && prevSection) {
          target = prevSection

          this.$vuetify.goTo(target, options)
        }
        if (deltaY > this.maxDelta && this.atEnd && nextSection) {
          target = nextSection

          this.$vuetify.goTo(target, options)
        }

        if (target) {
          this.$store.commit('SET_FROM_ID', `#${this.id}`)
          this.$store.commit('SET_CURRENT_ID', target)
        }
      }
    },

    animateMainContainer(deltaX, deltaY) {
      let leftPos = this.welcomeMainLeftPos
      if (leftPos <= 0 && leftPos >= -window.innerWidth) {
        this.welcomeMainLeftPos -= deltaY * this.speedRatio

        // to avoid offset set by wheel event
        leftPos = this.welcomeMainLeftPos
        if (leftPos >= 0) {
          this.welcomeMainLeftPos = 0
        }
        if (leftPos <= -window.innerWidth) {
          this.welcomeMainLeftPos = -window.innerWidth
        }
      }
    },
    animateWelcomeBanner(deltaX, deltaY) {
      const leftPosMain = this.welcomeMainLeftPos
      if (leftPosMain <= 0 && leftPosMain >= -window.innerWidth) {
        this.welcomeBannerLeftPos += deltaY * this.speedRatio
      }

      // to avoid offset set by wheel event
      if (leftPosMain >= 0) {
        this.welcomeBannerLeftPos = 0
      }
      if (leftPosMain <= -window.innerWidth) {
        this.welcomeBannerLeftPos = window.innerWidth
      }

      // animating opacity
      if (
        leftPosMain <= -window.innerWidth / 12 &&
        leftPosMain > -window.innerWidth / 6
      ) {
        this.bannerOpacity -=
          (deltaY * this.speedRatio) / (window.innerWidth / 12)
      }
      if (leftPosMain >= -window.innerWidth / 12) {
        this.bannerOpacity = 1
      }
      if (leftPosMain <= -window.innerWidth / 6) {
        this.bannerOpacity = 0
      }
    },
    animatePhilosophyOpacity(deltaX, deltaY) {
      const leftPosMain = this.welcomeMainLeftPos

      // animating opacity
      if (
        leftPosMain <= -window.innerWidth / 6 &&
        leftPosMain >= -window.innerWidth / 4
      ) {
        this.philosophyOpacity +=
          (deltaY * this.speedRatio) / (window.innerWidth / 12)
      }

      if (
        leftPosMain < -window.innerWidth / 4 &&
        leftPosMain > -window.innerWidth / 3
      ) {
        this.philosophyOpacity = 1
      }

      if (
        leftPosMain <= -window.innerWidth / 3 &&
        leftPosMain >= (-window.innerWidth * 5) / 12
      ) {
        this.philosophyOpacity -=
          (deltaY * this.speedRatio) / (window.innerWidth / 12)
      }

      if (leftPosMain >= -window.innerWidth / 6) {
        this.philosophyOpacity = 0
      }
      if (leftPosMain <= (-window.innerWidth * 5) / 12) {
        this.philosophyOpacity = 0
      }
    },
    animateFigureOne(deltaX, deltaY) {
      const leftPosMain = this.welcomeMainLeftPos
      if (leftPosMain <= 0 && leftPosMain > -window.innerWidth) {
        this.figure1RightPos -=
          (deltaY * this.speedRatio * 250) / window.innerWidth
      }

      // to avoid offset set by wheel event
      if (leftPosMain >= 0) {
        this.figure1RightPos = 0
      }
      if (leftPosMain <= -window.innerWidth) {
        this.figure1RightPos = -250
      }
    },
    animateFigureTwo(deltaX, deltaY) {
      const leftPosMain = this.welcomeMainLeftPos
      if (leftPosMain <= 0 && leftPosMain > -window.innerWidth) {
        this.figure2LeftPos -=
          (deltaY * this.speedRatio * 350) / window.innerWidth
      }

      // to animate "Discover More"
      if (leftPosMain <= 0 && leftPosMain >= (-window.innerWidth / 3) * 2) {
        this.figure2MoreInfoRightPos -=
          (deltaY * this.speedRatio * 50) / ((2 * window.innerWidth) / 3)
      }

      // to avoid offset set by wheel event
      if (leftPosMain >= 0) {
        this.figure2LeftPos = 0
        this.figure2MoreInfoRightPos = 0
      }
      if (leftPosMain <= -window.innerWidth) {
        this.figure2LeftPos = -350
      }
      if (leftPosMain <= (-2 * window.innerWidth) / 3) {
        this.figure2MoreInfoRightPos = -50
      }
    },

    animateFigureWoman(deltaX, deltaY) {
      const leftPosMain = this.welcomeMainLeftPos
      if (
        leftPosMain <= -window.innerWidth / 2 &&
        leftPosMain >= -window.innerWidth
      ) {
        this.figureWomanRightPos += deltaY * this.speedRatio
      }

      // to avoid offset set by wheel event
      if (leftPosMain >= -window.innerWidth / 2) {
        this.figureWomanRightPos = 0
      }
      if (leftPosMain <= -window.innerWidth) {
        this.figureWomanRightPos = window.innerWidth / 2
      }

      // animating opacity
      if (
        leftPosMain <= (-window.innerWidth / 12) * 11 &&
        leftPosMain >= -window.innerWidth
      ) {
        this.moreInfoOpacity +=
          (deltaY * this.speedRatio) / (window.innerWidth / 12)
      }
      if (leftPosMain >= (-window.innerWidth / 12) * 11) {
        this.moreInfoOpacity = 0
      }
      if (leftPosMain <= -window.innerWidth) {
        this.moreInfoOpacity = 1
      }
    },
    animateFigureMan(deltaX, deltaY) {
      const leftPosMain = this.welcomeMainLeftPos
      if (leftPosMain >= 0) {
        this.figureManRightPos = 0
      }
    },
  },
}
</script>

<style scoped>
a {
  text-decoration: none;
}
.welcome-container {
  width: 100%;
  height: 100vh;
  position: relative;
}
.welcome-main {
  width: 200%;
  height: 100%;
}
.welcome-main-logo {
  height: 0%;
}
.full-height {
  height: 100%;
}
.full-width {
  width: 100%;
}
</style>
