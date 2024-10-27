<template>
  <div ref="profpict" class="profpict-container" :style="profpictstyle">
    <v-img
      :src="src"
      :height="height"
      :width="width"
      @load="ready = true"
    ></v-img>
    <div :style="borderStyle" class="border-profile"></div>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: '100px',
    },
    width: {
      type: String,
      default: '100px',
    },
    border: {
      type: String,
      default() {
        return this.$vuetify.theme.themes.light.background
      },
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    horizontal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // inView: false,
      ready: false,
      borderWidth: '0px',
    }
  },
  computed: {
    borderStyle() {
      const style = {
        width: `calc(${this.width} + 2px)`,
        height: `calc(${this.height} + 2px)`,
        borderColor: this.border,
        borderWidth: this.borderWidth,
      }

      return style
    },
    // noborder() {
    //   return this.ready && this.inView
    // },
    profpictstyle() {
      const style = {
        width: this.width,
        height: this.height,
      }

      return style
    },
  },
  mounted() {
    this.initBorderWidth()
    document.addEventListener('scroll', this.isInViewport, {
      passive: true,
    })
  },
  methods: {
    initBorderWidth() {
      if (this.horizontal && this.vertical) {
        this.borderWidth = `calc(${this.height} / 6) calc(${this.width} / 6)`
      } else if (this.horizontal) {
        this.borderWidth = `0px calc(${this.width} / 6)`
      } else if (this.vertical) {
        this.borderWidth = `calc(${this.height} / 6) 0px`
      } else {
        this.borderWidth = '0px'
      }
    },
    setBorderWidth(diffY, totalY) {
      /* 
        targetScrollY <=> borderWidth
        diffScrollY <=> X ???
      */
      if (this.horizontal && this.vertical) {
        this.borderWidth = `calc(${diffY / totalY} * ${this.height} / 6) calc(${
          diffY / totalY
        } * ${this.width} / 6)`
      } else if (this.horizontal) {
        this.borderWidth = `0px calc(${diffY / totalY} * ${this.width} / 6)`
      } else if (this.vertical) {
        this.borderWidth = `calc(${diffY / totalY} * ${this.height} / 6) 0px`
      } else {
        this.borderWidth = '0px'
      }
    },
    isInViewport() {
      const el = this.$refs.profpict
      if (!el) {
        return false
      }

      const rect = el.getBoundingClientRect()
      const innerHeight =
        window.innerHeight || document.documentElement.clientHeight

      const start = (2 * innerHeight) / 3
      const end = innerHeight / 3

      let diffY = start - end // initial value
      const totalY = diffY

      if (rect.top <= start && rect.top >= end) {
        diffY = rect.top - end
      }
      if (rect.top < end) {
        diffY = 0
      }

      this.setBorderWidth(diffY, totalY)
    },
  },
}
</script>

<style scoped>
.profpict-container {
  position: relative;
}

.border-profile {
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  box-sizing: border-box;
  border-style: solid;
}

/* .noborder {
  border-width: 0px !important;
  transition: 1500ms;
  transition-timing-function: ease-in-out;
} */
</style>
