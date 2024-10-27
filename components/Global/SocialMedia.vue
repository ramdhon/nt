<template>
  <div class="social-media-row">
    <v-btn
      :small="small"
      :large="large"
      icon
      :ripple="false"
      :color="iconColor"
      @click="
        openLink('https://instagram.com/drnidaltoman?igshid=1aonsrn6m2b9c')
      "
      ><v-icon :small="small" :large="large">fab fa-instagram</v-icon></v-btn
    >
    <v-btn
      :small="small"
      :large="large"
      icon
      :ripple="false"
      :color="iconColor"
      @click="openLink('https://twitter.com')"
      ><v-icon :small="small" :large="large">fab fa-twitter</v-icon></v-btn
    >
    <v-btn
      :small="small"
      :large="large"
      icon
      :ripple="false"
      :color="iconColor"
      @click="openLink('https://facebook.com/Drnidaltoman/')"
      ><v-icon :small="small" :large="large">fab fa-facebook</v-icon></v-btn
    >
  </div>
</template>

<script>
export default {
  props: {
    iconColor: {
      type: String,
      default() {
        return this.$vuetify.theme.themes.light.primary3
      },
    },
    small: {
      type: Boolean,
      default: false,
    },
    large: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    themes() {
      return this.$vuetify.theme.themes
    },
  },
  methods: {
    openLink(link) {
      window.open(link, '_blank')
    },
  },
}
</script>

<style scoped>
.social-media-row {
  display: flex;
  align-items: center;
}
</style>
