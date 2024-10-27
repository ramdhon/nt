<template>
  <div
    :class="btnClass"
    :style="isActive ? active : normal"
    @click="setActiveTab({ activeTab: value })"
  >
    {{ title }}
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    title: {
      type: String,
      require: true,
      default: '',
    },
    value: {
      type: String,
      default: 'general',
    },
    isActive: {
      type: Boolean,
    },
  },
  computed: {
    themes() {
      return this.$vuetify.theme.themes
    },
    btnClass() {
      return {
        'treatment-details__nav': true,
        isActive: !!this.isActive,
      }
    },
    active() {
      return {
        borderColor: this.themes.light.primary3,
        color: this.themes.light.primary3,
      }
    },
    normal() {
      return {
        borderColor: this.themes.light.border,
        color: this.themes.light.border,
      }
    },
  },
  methods: {
    ...mapMutations({
      setActiveTab: 'SET_ACTIVE_TAB_TREATMENT_DETAIL',
    }),
  },
}
</script>

<style>
.treatment-details__nav {
  padding: 10px 0px;
  cursor: pointer;
  white-space: nowrap;
  font-size: 24px;
  line-height: 33px;
}

.treatment-details__nav:not(:first-child) {
  margin-left: 40px;
}

.treatment-details__nav:hover::-webkit-scrollbar {
  display: none;
}

/* ::-webkit-scrollbar {
  display: none;
} */

.isActive {
  font-weight: 700 !important;
  border-bottom: solid 2px;
  transition: font-weight 500ms;
}
</style>
