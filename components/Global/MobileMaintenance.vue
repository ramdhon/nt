<template>
  <div
    class="fullscreen py-6 px-8 d-flex flex-column justify-space-between align-center"
  >
    <div :style="[figure1]">
      <v-img
        contain
        :src="require('~/assets/fig_2.png')"
        :height="figureSize"
        :width="figureSize"
      ></v-img>
    </div>
    <v-img
      contain
      :src="require('~/assets/main-logo.png')"
      max-width="50vw"
      width="50vw"
      max-height="10vh"
    ></v-img>
    <div style="height: 5vh" />
    <div class="text-h5 font-weight-light">
      <p>
        We are currently working on to improve your mobile experience. You will
        then find the new version of our mobile website.
      </p>
      <p>
        Until then we look forward to seeing you in our desktop version or our
        clinic.
      </p>
    </div>
    <div style="height: 20vh; width: 100%"></div>
    <div class="font-weight-light" style="width: 100%">
      <span class="text-h6 font-weight-bold">Contact:</span><br />
      <span>
        Uhlandstraße 33, 10719 Berlin<br />
        Phone: +49 30 213008000<br />
        info@nidal-toman.de </span
      ><br />
      <div class="mt-3">
        <a
          class="text-h6 font-weight-bold"
          :style="linkStyle"
          href="https://www.google.com/maps/place/Plastische+Chirurgie/@52.5003229,13.3247357,21z/data=!4m12!1m6!3m5!1s0x47a850fa4954eca3:0x1406c2788da9ed70!2sPlastische+Chirurgie!8m2!3d52.5003285!4d13.3246307!3m4!1s0x47a850fa4954eca3:0x1406c2788da9ed70!8m2!3d52.5003285!4d13.3246307"
          target="_blank"
          >Open in maps ></a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      figureSize: '45vh',
    }
  },
  computed: {
    themes() {
      return this.$vuetify.theme.themes
    },
    linkStyle() {
      return {
        color: this.themes.light.primary3,
      }
    },
    figure1() {
      return {
        position: 'absolute',
        marginRight: '0px',
        right: '-13vh',
        bottom: '2vh',
      }
    },
  },
}
</script>

<style scoped>
a {
  text-decoration: none;
}
.fullscreen {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
