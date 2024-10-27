<template>
  <div
    v-if="ready"
    id="error-container"
    class="d-flex flex-column justify-center align-center"
  >
    <span class="text-h3" :style="titleStyle">404</span>
    <span class="text-h6" :style="subtitleStyle"
      >The page is not found. Redirecting to home{{ dot }}</span
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      dot: '',
      ready: false,
    }
  },
  computed: {
    titleStyle() {
      return {
        color: this.$vuetify.theme.themes.light.primary3,
      }
    },
    subtitleStyle() {
      return {
        color: this.$vuetify.theme.themes.light.text,
      }
    },
  },
  mounted() {
    const contactPageDetected = /kontakt/.test(this.$route.fullPath)
    if (contactPageDetected) {
      return
    }
    this.ready = true

    const timer = setInterval(() => {
      this.dot += '.'
    }, 1000)
    setTimeout(() => {
      clearInterval(timer)

      const deutchPageDetected = /^\/de/.test(this.$route.fullPath)
      if (deutchPageDetected) {
        this.$router.push('/de/')
      } else {
        this.$router.push('/')
      }
    }, 3000)
  },
}
</script>

<style>
#error-container {
  width: 100%;
  height: 100vh;
}
</style>
