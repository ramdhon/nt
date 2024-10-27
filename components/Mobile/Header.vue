<template>
  <v-app-bar
    absolute
    style="z-index: 2"
    color="background"
    dark
    shrink-on-scroll
    :src="src"
    :scroll-target="scrollTarget"
  >
    <template v-slot:img="{ props }">
      <v-img
        v-bind="props"
        gradient="to top right, rgba(210, 175, 105, .5), rgba(108, 117, 107, .8)"
      ></v-img>
    </template>

    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <CustomSVG
      class="ml-3"
      :src="require('~/assets/mini-logo.svg')"
      size="48px"
      :color="themes.light.background"
    ></CustomSVG>

    <!-- <v-app-bar-title>Title</v-app-bar-title> -->

    <v-spacer></v-spacer>

    <!-- <div class="d-flex align-center tools">
      <SocialMedia :icon-color="themes.light.background" small />
      <Locale is-mobile mobile-dark />
    </div> -->
  </v-app-bar>
</template>

<script>
import CustomSVG from '~/components/Global/CustomSVG'
// import SocialMedia from '~/components/Global/SocialMedia'
// import Locale from '~/components/Global/Locale'

export default {
  components: {
    CustomSVG,
    // SocialMedia,
    // Locale,
  },
  props: {
    src: {
      type: String,
      default: '',
    },
    scrollTarget: {
      type: String,
      default: '',
    },
  },
  computed: {
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
}
</script>

<style>
.tools {
  height: 48px;
}
</style>
