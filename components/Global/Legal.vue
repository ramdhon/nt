<template>
  <div v-if="!inMobile" :class="customClass">
    <nuxt-link
      :style="path === 'imprint' ? linkActive : textStyle"
      :to="finalpath('imprint')"
      >{{ $t('nav.imprint') }}</nuxt-link
    >
    <span :style="dividerStyle" class="mx-1">|</span>
    <nuxt-link
      :style="path === 'privacy' ? linkActive : textStyle"
      :to="finalpath('privacy')"
      >{{ $t('nav.privacy') }}</nuxt-link
    >
    <span :style="dividerStyle" class="mx-1">|</span>
    <nuxt-link
      :style="path === 'infodesk' ? linkActive : textStyle"
      :to="finalpath('infodesk')"
      >{{ $t('nav.infodesk') }}</nuxt-link
    >
  </div>
  <div v-else>
    <div>
      <nuxt-link
        :style="path === 'imprint' ? linkActive : textStyle"
        :to="finalpath('imprint')"
        >{{ $t('nav.imprint') }}</nuxt-link
      >
      <span :style="dividerStyle" class="mx-1">|</span>
      <nuxt-link
        :style="path === 'infodesk' ? linkActive : textStyle"
        :to="finalpath('infodesk')"
        >{{ $t('nav.infodesk') }}</nuxt-link
      >
    </div>
    <nuxt-link
      :style="path === 'privacy' ? linkActive : textStyle"
      :to="finalpath('privacy')"
      >{{ $t('nav.privacy') }}</nuxt-link
    >
  </div>
</template>

<script>
import { finalpath } from '~/helpers'

export default {
  props: {
    darkStyle: {
      type: Boolean,
      default: false,
    },
    customClass: {
      type: String,
      default: '',
    },
    inMobile: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    path() {
      return this.$store.state.path
    },
    locale() {
      return this.$store.state.locale
    },
    themes() {
      return this.$vuetify.theme.themes
    },
    textStyle() {
      if (this.darkStyle) {
        return {
          color: this.themes.light.background,
        }
      }

      return {
        color: this.themes.light.text,
      }
    },
    linkActive() {
      if (this.darkStyle) {
        return {
          color: this.themes.light.background,
          textDecoration: 'underline',
        }
      }

      return {
        color: this.themes.light.primary3,
      }
    },
    dividerStyle() {
      if (this.darkStyle) {
        return this.textStyle
      }

      return this.linkActive
    },
  },
  methods: {
    finalpath(path) {
      return finalpath(this.locale, path, this.inMobile)
    },
  },
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
