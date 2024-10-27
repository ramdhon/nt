<template>
  <div class="section">
    <div v-if="title" class="title">
      <CustomSVG
        class="ml-n8 mb-n8 mt-n3"
        :src="require('~/assets/name.svg')"
        :width="'38rem'"
        :height="'5rem'"
        :color="themes.light.primary3"
        cover
      ></CustomSVG>
      <span class="text-body-2 font-weight-light text-uppercase">{{
        $t('profile.subtitle')
      }}</span>
    </div>
    <div class="d-flex align-center">
      <div :style="profileText" :class="{ right, left: !right }">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import CustomSVG from '~/components/Global/CustomSVG'
export default {
  components: {
    CustomSVG,
  },
  props: {
    right: {
      type: Boolean,
      default: false,
    },
    title: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: '52%',
    },
  },
  computed: {
    themes() {
      return this.$vuetify.theme.themes
    },
    profileText() {
      let width = this.width

      const innerWidth = window.innerWidth
      if (innerWidth <= 1584) {
        width = `calc(${this.width} + 7%)`
      }
      return {
        width,
      }
    },
  },
}
</script>

<style scoped>
.title {
  margin-bottom: 5vh;
}

.section {
  padding: 20vh 200px;
  width: 100vw;
}
@media only screen and (max-width: 1584px) {
  .section {
    padding: 20vh 80px;
  }
}
@media only screen and (max-width: 1368px) {
  .section {
    padding: 20vh 40px;
  }
}

.right {
  margin-left: auto;
}

.left {
  margin-right: auto;
}
</style>
