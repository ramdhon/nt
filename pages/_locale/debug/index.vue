<template>
  <div v-if="!debug" />
  <div v-else>
    <Gallery />
  </div>
</template>

<script>
import Gallery from '~/components/Global/Gallery'
export default {
  layout: 'debug',
  components: {
    Gallery,
  },
  data() {
    return {
      debug: false,
    }
  },
  computed: {
    themes() {
      return this.$vuetify.theme.themes
    },
  },
  mounted() {
    const isDebug = this.$route.query.debug === '1'

    if (isDebug) {
      this.debug = true
    }
  },
}
</script>

<style scoped></style>
