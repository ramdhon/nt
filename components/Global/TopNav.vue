<template>
  <div v-if="showing">
    <div v-if="showLogo" :style="backgroundSupportStyle">
      <div>
        <nuxt-link :to="finalpath('/')">
          <CustomSVG
            class="ml-3"
            :src="require('~/assets/mini-logo.svg')"
            size="80px"
            :color="themes.light.primary3"
          ></CustomSVG>
        </nuxt-link>
      </div>
      <SocialMedia :small="true" />
      <v-spacer />
    </div>
    <v-tabs v-model="tab" v-bind="bindObj" class="wrapper__tab">
      <v-tabs-slider v-if="customSlider" :color="sliderColor"></v-tabs-slider>
      <v-tab
        v-for="label in showLabels"
        :key="label"
        :ripple="false"
        :class="justifyContentTab"
        @click="goto(label)"
        >{{ $t(`nav.${label}`) }}</v-tab
      >
    </v-tabs>
    <div v-if="!backgroundIsTransparent" class="locale__nav">
      <Locale />
    </div>
  </div>
</template>

<script>
import CustomSVG from '~/components/Global/CustomSVG'
import SocialMedia from '~/components/Global/SocialMedia'
import Locale from '~/components/Global/Locale'
import { finalpath } from '~/helpers'

export default {
  components: {
    SocialMedia,
    Locale,
    CustomSVG,
  },
  props: {
    navStyle: {
      type: Array,
      default: () => [],
    },
    color: {
      type: String,
      default() {
        return this.$vuetify.theme.themes.light.primary
      },
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    customSlider: {
      type: Boolean,
      default: false,
    },
    sliderColor: {
      type: String,
      default() {
        return this.$vuetify.theme.themes.light.primary
      },
    },
    tabJustify: {
      type: String,
      default: 'center',
    },
    background: {
      type: String,
      default: 'transparent',
    },
    right: {
      type: Boolean,
      default: false,
    },
    backopacity: {
      type: String,
      default: 'FF',
    },
    showLogo: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showing: true,
      showLabels: [],
    }
  },
  computed: {
    locale: {
      set(val) {
        this.$store.commit('SET_LOCALE', val)
      },
      get() {
        return this.$store.state.locale
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
    labels() {
      return this.$store.state.labels
    },
    themes() {
      return this.$vuetify.theme.themes
    },
    justifyContentTab() {
      switch (this.tabJustify) {
        case 'left':
          return 'tab-left'
        case 'right':
          return 'tab-right'
        default:
          return undefined
      }
    },
    backgroundIsTransparent() {
      return this.background === 'transparent'
    },
    backgroundSupportStyle() {
      return {
        background: this.finalColor(this.backopacity, this.background),
        height: '60px',
        width: '100%',
        position: 'fixed',
        padding: '0px 24px',
        top: '0px',
        zIndex: 5,
        display: 'flex',
        alignItems: 'center',
      }
    },
    zIndex5Style() {
      return {
        zIndex: 5,
      }
    },
    localeStyle() {
      return {
        zIndex: 5,
        position: 'fixed',
        top: '0px',
        right: '24px',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
      }
    },
    bindObj() {
      const { color, vertical, right } = this

      return {
        style: [this.zIndex5Style, ...this.navStyle],
        backgroundColor: 'transparent',
        color,
        vertical,
        right,
      }
    },
  },
  watch: {
    '$route.path': {
      handler(val, old) {
        this.checkActiveTab(val, old)
      },
      deep: true,
      immediate: true,
    },
    locale(val, old) {
      this.updateComponent(val, old)
    },
  },
  mounted() {
    if (this.showLogo) {
      const filteredLabels = this.labels.filter((label) => label !== 'welcome')

      this.showLabels = [...filteredLabels]
    } else {
      this.showLabels = [...this.labels]
    }

    // to handle active tab in direct load to path
    this.$nextTick(() => {
      const path = this.$route.path
      this.updateComponent(path, true)
    })
  },
  methods: {
    updateComponent(val, old) {
      this.showing = false
      this.$nextTick(() => {
        this.showing = true
        this.$nextTick(() => {
          this.checkActiveTab(val, old)
        })
      })
    },
    checkActiveTab(val, old) {
      /* eslint no-useless-escape: 0 */
      const path = val.replace(/^\/de/, '')
      const matched = path.match(/[^\/]+/g)

      let label

      if (!matched) {
        label = 'welcome'
        if (this.$route.query && this.$route.query.id) {
          label = this.$route.query.id
        }
      } else {
        label = matched[0]
      }

      const indexFound = this.showLabels.indexOf(label)

      if (old) {
        const els = document.getElementsByClassName('v-tabs-slider-wrapper')
        const el = els.length && els[0]
        if (el) {
          if (indexFound < 0) {
            el.style.display = 'none'
          } else {
            el.style.display = 'block'
          }
        }
      }

      this.tab = indexFound
      this.path = label
    },
    finalpath(path) {
      return finalpath(this.locale, path)
    },
    goto(label) {
      this.path = label
      if (label === 'welcome') {
        if (this.$route.path !== '/' || !this.$route.query.pos) {
          this.$router.push({ path: finalpath(this.locale, '/') })
        }
        return
      }
      if (label === 'procedures') {
        if (this.$route.path !== '/') {
          this.$router.push({
            path: finalpath(this.locale, '/'),
            query: { id: 'procedures' },
          })
        }
        return
      }
      this.$router.push({ path: finalpath(this.locale, label) })
    },
    finalColor(opacity, color) {
      const splittedColor = color.split('#')
      splittedColor[2] = opacity
      const finalColor = splittedColor.join('')

      return `#${finalColor}`
    },
  },
}
</script>

<style scoped>
.tab-left {
  justify-content: flex-start !important;
}
.tab-right {
  justify-content: flex-end !important;
}
.wrapper__tab {
  padding: 12px 24px 0px 24px;
}
.locale__nav {
  z-index: 5;
  position: fixed;
  top: 12px;
  padding: 0px 24px;
  right: 24px;
  height: 48px;
  display: flex;
  align-items: center;
}
</style>
