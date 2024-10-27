<template>
  <div class="scroll">
    <span
      class="pointer text-h5 font-weight-light"
      :style="scrollTextStyle"
      @click="$vuetify.goTo(target, scrollOptions)"
      @mouseover="hover = true"
      @mouseleave="hover = false"
      >{{ $t('nav.scroll') }}</span
    >
    <CustomSVG
      v-if="!hover"
      size="1.5rem"
      :src="require('bootstrap-icons/icons/chevron-down.svg')"
      :color="color"
    />
    <CustomSVG
      v-else
      size="1.5rem"
      :src="require('bootstrap-icons/icons/chevron-double-down.svg')"
      :color="color"
    />
  </div>
</template>

<script>
import CustomSVG from '~/components/Global/CustomSVG'

export default {
  components: {
    CustomSVG,
  },
  props: {
    target: {
      type: String,
      default: '#',
    },
    color: {
      type: String,
      default() {
        return this.$vuetify.theme.themes.light.lightBackground
      },
    },
  },
  data() {
    return {
      hover: false,
    }
  },
  computed: {
    themes() {
      return this.$vuetify.theme.themes
    },
    scrollTextStyle() {
      return {
        color: this.color,
      }
    },
    scrollOptions() {
      return {
        duration: 1000,
        offset: 0,
        easing: 'easeInOutQuint',
      }
    },
  },
}
</script>

<style scoped>
.scroll {
  position: absolute;
  top: 0px;
  left: 0px;
  padding: 36px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}
.scroll .pointer {
  cursor: pointer;
}
</style>
