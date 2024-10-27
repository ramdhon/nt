<template>
  <div>
    <Album :mobile="mobile" :class="{ 'mt-16': !mobile }" :list="interiors" />
    <Album :mobile="mobile" class="mt-16" :list="treatments" />
  </div>
</template>

<script>
import Album from '~/components/Global/Album'
export default {
  components: {
    Album,
  },
  props: {
    mobile: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    themes() {
      return this.$vuetify.theme.themes
    },
    interiors() {
      const list = [1, 2, 13, 3, 5, 4, 12, 6, 11, 9, 8, 10, 14]
      const interior = list.map((item) =>
        require(`~/assets/images/interiors_min/interior${item}.jpg`)
      )
      return interior
    },
    treatments() {
      const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
      const treatment = list.map((item) =>
        require(`~/assets/images/treatments_min/treatment${item}.jpg`)
      )
      return treatment
    },
    titleStyle() {
      return {
        borderBottom: `1px solid ${this.themes.light.primary}`,
      }
    },
  },
}
</script>

<style scoped>
.gallery-title {
  padding: 0px 48px;
}
</style>
