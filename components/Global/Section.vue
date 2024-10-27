<template>
  <div class="d-flex flex-column mb-6">
    <span
      :class="[`text-${titleComponent}`, 'mb-4', ...titleClass]"
      :style="titleStyle"
      >{{ title }}</span
    >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    titleComponent: {
      type: String,
      default: 'h4',
    },
    titleColor: {
      type: String,
      default() {
        return this.$vuetify.theme.themes.light.primary3
      },
    },
    titleClass: {
      type: Array,
      default() {
        return []
      },
    },
  },
  computed: {
    titleStyle() {
      return {
        color: this.titleColor,
      }
    },
  },
}
</script>

<style></style>
