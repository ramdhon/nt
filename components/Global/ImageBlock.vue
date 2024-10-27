<template>
  <div class="container" :style="!mobile ? containerStyle : mobileStyle">
    <img class="image" :class="{ mobile }" :src="src" alt="no-image" />
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
    mobile: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    containerStyle() {
      return {
        height: this.height,
        backgroundImage: `url(${this.src})`,
        backgroundSize: 'contain',
      }
    },
    mobileStyle() {
      return {
        height: '100vw',
        width: '100vw',
        backgroundImage: `url(${this.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    },
  },
}
</script>

<style scoped>
.container {
  padding: 0px;
  display: inline-block;
}
.image {
  height: 100%;
  object-fit: contain;
  visibility: hidden;
}
.image.mobile {
  height: 100vw;
  width: 100vw;
  object-fit: cover;
}
</style>
