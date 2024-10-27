<template>
  <div class="fullscreen">
    <div v-if="!src" class="no-image">No image source</div>
    <div
      v-else
      :style="backgroundStyle"
      class="cover"
      :class="{ coverOut: borderZero }"
    >
      <v-img
        v-if="!video"
        :contain="contain"
        class="center-image"
        :position="position"
        :src="src"
        :width="coverWidth"
        :height="coverHeight"
        @load="showCover"
      ></v-img>
      <video v-else id="myVideo" autoplay muted loop @loadeddata="showVideo">
        <source :src="src" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
      <slot />
    </div>
    <div
      v-if="src"
      class="border-cover"
      :class="{ borderZero, borderNone }"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    position: {
      type: String,
      default: 'center',
    },
    src: {
      type: String,
      default: '',
    },
    video: {
      type: Boolean,
      default: false,
    },
    contain: {
      type: Boolean,
      default: false,
    },
    coverWidth: {
      type: String,
      default: '100%',
    },
    coverHeight: {
      type: String,
      default: '100%',
    },
    customBackground: {
      type: String,
      default() {
        return this.$vuetify.theme.themes.light.background
      },
    },
  },
  data() {
    return {
      borderZero: false,
      borderNone: false,
    }
  },
  computed: {
    backgroundStyle() {
      return {
        background: this.customBackground,
      }
    },
  },
  methods: {
    showVideo(e) {
      const video = document.getElementById('myVideo')
      if (video.readyState === 4) {
        this.showCover()
      }
    },
    showCover() {
      setTimeout(() => {
        this.borderZero = true
        setTimeout(() => {
          this.borderNone = true
        }, 1500)
      }, 500)
    },
  },
}
</script>

<style scoped>
#myVideo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.fullscreen {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.no-image {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.center-image {
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
}
.cover {
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50vh;
  left: 50vw;
  width: 130vw;
  height: 130vh;
}
.coverOut {
  width: 100vw;
  height: 100vh;
  transition: 1500ms;
  transition-timing-function: ease-in-out;
}

.border-cover {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0px;
  left: 0px;
  box-sizing: border-box;
  border-style: solid;
  border-width: 50vh 50vw;
  border-color: white;
}
.borderZero {
  border-style: solid;
  border-width: 0px;
  border-color: white;
  transition: 1500ms;
  transition-timing-function: ease-in-out;
}
.borderNone {
  display: none;
}
</style>
