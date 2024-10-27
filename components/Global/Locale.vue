<template>
  <div v-if="!isMobile" :style="customStyle" :class="customClass">
    <nuxt-link
      :style="locale === 'en' ? localeActive : textStyle"
      :to="
        locale === 'de'
          ? $route.fullPath.replace(/^\/[^\/]+/, '')
          : $route.fullPath
      "
      >EN</nuxt-link
    >
    <span :style="dividerStyle" class="mx-2">|</span>
    <nuxt-link
      :style="locale === 'de' ? localeActive : textStyle"
      :to="locale === 'en' ? '/de' + $route.fullPath : $route.fullPath"
      >DE</nuxt-link
    >
  </div>
  <v-menu v-else offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        :color="!mobileDark ? 'primary3' : 'background'"
        text
        v-bind="attrs"
        v-on="on"
      >
        {{ locale }}
      </v-btn>
    </template>
    <v-list>
      <v-list-item>
        <v-list-item-title class="text-uppercase">
          <nuxt-link
            :style="locale === 'en' ? localeActive : textStyle"
            :to="
              locale === 'de'
                ? $route.fullPath.replace(/^\/[^\/]+/, '')
                : $route.fullPath
            "
            >EN</nuxt-link
          >
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title class="text-uppercase">
          <nuxt-link
            :style="locale === 'de' ? localeActive : textStyle"
            :to="locale === 'en' ? '/de' + $route.fullPath : $route.fullPath"
            >DE</nuxt-link
          >
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  props: {
    mobileDark: {
      type: Boolean,
      default: false,
    },
    darkStyle: {
      type: Boolean,
      default: false,
    },
    customClass: {
      type: String,
      default: '',
    },
    customStyle: {
      type: Object,
      default() {
        return {}
      },
    },
    isMobile: {
      type: Boolean,
      default: false,
    },
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
        color: this.themes.light.border,
      }
    },
    localeActive() {
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

      return this.localeActive
    },
  },
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
