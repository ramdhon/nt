<template>
  <div :style="containerStyle">
    <svg v-if="src" class="no-repeat" :style="[svgStyle, ...customStyle]"></svg>
    <div v-else>Source undefined.</div>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      required: true,
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: '1rem',
    },
    height: {
      type: String,
      default: '1rem',
    },
    color: {
      type: String,
      default: 'black',
    },
    customStyle: {
      type: Array,
      default() {
        return []
      },
    },
    position: {
      type: String,
      default: 'center',
    },
    cover: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    svgStyle() {
      return {
        ...this.containerStyle,
        maskImage: `url(${this.src})`,
        backgroundColor: this.color,
        maskSize: this.cover
          ? 'cover'
          : this.size || `${this.width} ${this.height}`,
        margin: '0px',
        maskPosition: this.position,
      }
    },
    containerStyle() {
      return {
        width: this.size || this.width,
        height: this.size || this.height,
      }
    },
  },
}
</script>

<style scoped>
.no-repeat {
  mask-repeat: no-repeat;
}
</style>
