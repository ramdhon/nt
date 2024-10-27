<template>
  <v-app v-if="ready" id="app" :style="textDefaultStyle" :dark="false">
    <v-fab-transition>
      <v-btn
        v-show="shouldUseFAB && !hidden"
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
    <!-- <Header v-if="src" :src="src" scroll-target="#mobile-screen" /> -->
    <!-- <BottomNav scroll-target="#mobile-screen" /> -->
    <SideNav />
    <v-responsive
      id="mobile-screen"
      ref="mobileScreen"
      class="overflow-y-auto"
      height="100vh"
    >
      <nuxt />
      <div class="bottom-gap"></div>
    </v-responsive>
  </v-app>
</template>

<script>
// import BottomNav from '~/components/Mobile/BottomNav'
import SideNav from '~/components/Mobile/SideNav'
// import Header from '~/components/Mobile/Header'

export default {
  components: {
    // BottomNav,
    SideNav,
    // Header,
  },
  data() {
    return {
      hidden: true,
      document: '',
    }
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
    themes() {
      return this.$vuetify.theme.themes
    },
    textDefaultStyle() {
      return {
        color: this.themes.light.primary4,
      }
    },
    matchedLabel() {
      const routePath = this.$route.path

      /* eslint no-useless-escape: 0 */
      const path = routePath.replace(/^\/de/, '').replace(/^\/mobile/, '')
      const matched = path.match(/[^\/]+/g)

      let label

      if (!matched) {
        label = 'mobileHome'
      } else {
        label = matched[0]
      }

      return label
    },
    src() {
      switch (this.matchedLabel) {
        case 'ivtherapies':
          return require('~/assets/images/treatments/treatment1.jpg')
        case 'profile':
          return require('~/assets/images/treatments/treatment1.jpg')
        case 'contact':
          return require('~/assets/images/interiors/interior2.jpg')
        default:
          return null
      }
    },
    shouldUseFAB() {
      return this.matchedLabel !== 'procedures'
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
  watch: {
    '$route.path': {
      handler() {
        // scroll to the top
        if (this.document) {
          const el = document.getElementById('mobile-screen')
          if (!el) {
            return false
          }

          el.scrollTop = 0
        }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.document = document
    this.userAgent = navigator.userAgent.toLowerCase()
    this.$nextTick(() => {
      if (this.isMobile) {
        this.ready = true

        this.$nextTick(() => {
          this.showingFAB()
          const pageComponent = document.getElementById('mobile-screen')
          pageComponent.addEventListener('scroll', this.showingFAB, {
            passive: true,
          })
        })
      } else {
        let finalpath = this.$route.fullPath.replace(/\/mobile/, '')
        if (finalpath.includes('procedures')) {
          finalpath = finalpath.replace(/procedures/, 'treatment')
        }
        this.$router.push(finalpath)
      }
    })
  },
  methods: {
    showingFAB() {
      const el = document.getElementById('mobile-screen')
      if (!el) {
        return false
      }

      if (el.scrollTop > 60) {
        this.hidden = false
      }
      if (el.scrollTop <= 60) {
        this.hidden = true
      }
    },
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

<style scoped>
.bottom-gap {
  height: 60px;
}
</style>
