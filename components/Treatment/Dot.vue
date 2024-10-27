<template>
  <div
    tabindex="0"
    :style="outerDot"
    class="outer__dot"
    :class="{ hover: part.active }"
    @click="toggleTooltip(part)"
    @blur="hideTooltip(part)"
    @mouseover="mouseover(part)"
    @mouseleave="mouseleave(part)"
  >
    <div :style="innerDot" class="inner__dot">
      <v-fade-transition>
        <Tooltip
          v-if="showingTooltip"
          :name="$t(`treatments.${query}.title`)"
          :query="query"
          @close-tooltip="closeTooltip"
        />
      </v-fade-transition>
    </div>
  </div>
</template>

<script>
import Tooltip from './Tooltip'

export default {
  components: {
    Tooltip,
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    x: {
      type: String,
      default: '0%',
    },
    y: {
      type: String,
      default: '0%',
    },
    color: {
      type: String,
      default() {
        return this.$vuetify.theme.themes.light.background
      },
    },
    query: {
      type: String,
      default: '',
    },
    part: {
      type: Object,
      default() {
        return {}
      },
    },
    index: {
      type: Number,
      default: -1,
    },
    forSubpart: {
      type: Boolean,
      default: false,
    },
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showingTooltip: false,
    }
  },
  computed: {
    outerDot() {
      return {
        left: this.x,
        top: this.y,
        borderColor: this.color,
      }
    },
    innerDot() {
      return {
        background: this.color,
      }
    },
  },
  methods: {
    closeOutpatient() {
      const { figure, part } = this.$route.query
      this.$router.push({ query: { figure, part } })
    },
    toggleTooltip(part) {
      if (!this.forSubpart) {
        this.showingTooltip = !this.showingTooltip
        part.active = this.showingTooltip
      } else {
        this.closeOutpatient()
        this.setSubpart()
      }
    },
    hideTooltip(part) {
      if (!this.forSubpart) {
        this.closeTooltip()
        setTimeout(() => {
          part.active = false
        }, 1) // mobile detail purpose need to put timeout
      }
    },
    mouseover(part) {
      if (!this.forSubpart && !this.isMobile) {
        part.active = true
      }
    },
    mouseleave(part) {
      if (!this.forSubpart && !this.showingTooltip) {
        part.active = false
      }
    },
    closeTooltip() {
      this.showingTooltip = false
    },
    setSubpart() {
      this.$emit('reset-active-parts', this.index)
      this.part.active = true
      this.$emit('close-list')
      this.$emit('open-detail')
    },
  },
}
</script>

<style scoped>
div:focus {
  outline: none;
}

.outer__dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  fill-opacity: 0%;
  border: solid 0px;
  transform: translate(-50%, -50%);
  position: absolute;
  cursor: pointer;
}

.outer__dot.hover {
  width: 22px;
  height: 22px;
  border: solid 1px;
  transition: 200ms;
}

.inner__dot {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
}
</style>
