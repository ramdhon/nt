<template>
  <div class="title">
    <div class="pb-4" :style="titleStyle">
      <span class="text-h3"><slot /></span>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    themes() {
      return this.$vuetify.theme.themes
    },
    titleStyle() {
      return {
        borderBottom: `1px solid ${this.themes.light.titleColor}`,
        color: this.themes.light.titleColor,
      }
    },
  },
}
</script>

<style scoped>
.title {
  padding: 0px;
}
</style>
