<template>
  <v-app v-if="ready" id="app" :style="textDefaultStyle" :dark="false">
    <v-main v-if="!isMobile">
      <TopNav
        :nav-style="[topNavStyle, tabsStyle]"
        :background="themes.light.background"
        backopacity="B3"
        :show-logo="true"
      />
      <div :style="spacerStyle" />
      <nuxt />
    </v-main>
    <v-main v-else> <MobileMaintenance /> </v-main>
  </v-app>
</template>

<script>
import Vue from 'vue'
import VueRellax from 'vue-rellax'
import TopNav from '@/components/Global/TopNav'
import MobileMaintenance from '@/components/Global/MobileMaintenance'

Vue.use(VueRellax)

export default {
  components: {
    TopNav,
    MobileMaintenance,
  },
  computed: {
    ready: {
      set(val) {
        this.$store.commit('SET_READY', val)
      },
      get() {
        return this.$store.state.ready
      },
    },
    userAgent: {
      set(val) {
        this.$store.commit('SET_USERAGENT', val)
      },
      get() {
        return this.$store.state.userAgent
      },
    },
    isMobile() {
      return this.userAgent.includes('mobile')
    },
    topNavStyle() {
      return {
        position: 'fixed',
        right: '0px',
        top: '0px',
      }
    },
    themes() {
      return this.$vuetify.theme.themes
    },
    textDefaultStyle() {
      return {
        color: this.themes.light.primary,
      }
    },
    tabsStyle() {
      return {
        borderBottomStyle: 'solid',
        borderColor: this.themes.light.primary,
        borderWidth: '1px',
        width: '60%',
      }
    },
    spacerStyle() {
      return {
        background: this.themes.light.background,
        height: '48px',
        width: '100%',
      }
    },
  },
  mounted() {
    this.userAgent = navigator.userAgent.toLowerCase()
    this.$nextTick(() => {
      this.ready = true
    })
  },
  head() {
    return {
      title: 'Home',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'This is description from Home Page',
        },
      ],
    }
  },
}
</script>

<style>
/* ::-webkit-scrollbar {
  display: none;
} */
</style>
