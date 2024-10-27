<template>
  <div v-if="noimg" class="noimg">
    <v-row class="fill-height ma-0 pa-3" align="start" justify="start">
      <div style="height: 48px" class="d-flex align-center">
        <v-btn small icon :color="color" @click="drawer = !drawer"
          ><v-icon small>fas fa-bars</v-icon></v-btn
        >
        <CustomSVG
          class="ml-3"
          :src="require('~/assets/mini-logo.svg')"
          size="48px"
          :color="color"
        ></CustomSVG>
      </div>
    </v-row>
  </div>
  <div v-else-if="src" :style="backgroundStyle" class="img__container">
    <v-img
      :src="src"
      :contain="contain"
      class="img__pos"
      :width="width"
      :height="height"
    >
    </v-img>
    <v-row
      class="fill-height ma-0 pa-3 img__pos fill__width"
      align="start"
      justify="start"
    >
      <div style="height: 48px" class="d-flex align-center">
        <v-btn small icon :color="color" @click="drawer = !drawer"
          ><v-icon small>fas fa-bars</v-icon></v-btn
        >
        <CustomSVG
          class="ml-3"
          :src="require('~/assets/mini-logo.svg')"
          size="48px"
          :color="color"
        ></CustomSVG>
      </div>
    </v-row>
  </div>
  <div v-else>No src set.</div>
</template>

<script>
import CustomSVG from '~/components/Global/CustomSVG'

export default {
  components: {
    CustomSVG,
  },
  props: {
    src: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default() {
        return this.$vuetify.theme.themes.light.primary3
      },
    },
    contain: {
      type: Boolean,
      default: false,
    },
    noimg: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '100%',
    },
    backgroundColor: {
      type: String,
      default() {
        return this.$vuetify.theme.themes.light.background
      },
    },
  },
  computed: {
    drawer: {
      set(val) {
        this.$store.commit('SET_SIDENAV', val)
      },
      get() {
        return this.$store.state.sideNav
      },
    },
    backgroundStyle() {
      return {
        background: this.backgroundColor,
      }
    },
  },
}
</script>

<style scoped>
.noimg {
  height: 48px;
}
.img__container {
  position: relative;
  width: 100vw;
  height: 100vw;
}
.img__pos {
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50vw;
  top: 50vw;
}
.fill__width {
  width: 100vw;
}
</style>
