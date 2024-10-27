<template>
  <div class="vertical-navigation__container">
    <div
      v-for="(subpart, index) in subparts"
      :key="index"
      class="item__container font-weight-light"
      :class="{ active: subpart.active }"
      :style="subpart.active ? activeColor : normalColor"
      @click="setActive(index)"
    >
      <div class="item__title">
        {{
          !outpatient
            ? $t(`treatments.${figurePart}.${subpart.query}.title`)
            : $t(`treatments.outpatient_treatment.${subpart.query}.title`)
        }}
      </div>
      <span
        v-if="subpart.active"
        class="treatment__detail ml-4"
        @click="$emit('close-list')"
        >{{ $t('treatments.detail') }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    subparts: {
      type: Array,
      default() {
        return []
      },
    },
    outpatient: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    themes() {
      return this.$vuetify.theme.themes
    },
    outpatientDetail: {
      get() {
        return this.$store.state.outpatientDetail
      },
      set(val) {
        this.$store.commit('SET_OUTPATIENTDETAIL', val)
      },
    },
    figurePart: {
      get() {
        return this.$store.state.figurePart
      },
      set(val) {
        this.$store.commit('SET_FIGURE_PART', val)
      },
    },
    figureSubpart: {
      get() {
        return this.$store.state.figureSubpart
      },
      set(val) {
        this.$store.commit('SET_FIGURE_SUBPART', val)
      },
    },
    activeColor() {
      return {
        borderColor: this.themes.light.primary3,
        color: this.themes.light.primary3,
      }
    },
    normalColor() {
      return {
        borderColor: this.themes.light.border,
        color: this.themes.light.border,
      }
    },
  },
  methods: {
    openOutpatient() {
      const { figure, part } = this.$route.query
      this.$router.push({ query: { figure, part, outpatient: '1' } })
    },
    closeOutpatient() {
      const { figure, part } = this.$route.query
      this.$router.push({ query: { figure, part } })
    },
    setActive(index) {
      this.subparts.forEach((subpart) => {
        subpart.active = false
      })
      this.subparts[index].active = true
      this.figureSubpart = index
      if (this.outpatient) {
        this.openOutpatient()
      } else {
        this.closeOutpatient()
      }
    },
  },
}
</script>

<style scoped>
.vertical-navigation__container {
  margin-left: 0px;
}

.item__container {
  display: flex;
  align-items: center;
  padding: 8px 15px;
  border-left: 1px solid;
  cursor: pointer;
}

.item__title {
  margin-right: 10px;
}

.active .item__title {
  font-weight: 700;
}

.active {
  border-left: 3px solid;
  transition: 50ms;
}

.treatment__detail {
  cursor: pointer;
  color: #c4c4c4;
}
.treatment__detail:hover {
  color: #d2af69;
}
</style>
