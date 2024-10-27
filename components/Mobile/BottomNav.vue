<template>
  <v-bottom-navigation
    :scroll-target="scrollTarget"
    hide-on-scroll
    absolute
    :value="value"
    color="primary3"
    shift
    grow
  >
    <v-btn
      v-for="(item, index) in mobileLabels"
      :key="index"
      @click="goto(item.label)"
    >
      <span>{{ $t(`nav.${item.label}`) }}</span>

      <v-icon>{{ item.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import { finalpath } from '~/helpers'

export default {
  props: {
    scrollTarget: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      value: 0,
    }
  },
  computed: {
    locale() {
      return this.$store.state.locale
    },
    mobileLabels() {
      return this.$store.state.mobileLabels
    },
    path: {
      set(val) {
        this.$store.commit('SET_PATH', val)
      },
      get() {
        return this.$store.state.path
      },
    },
  },
  watch: {
    '$route.path': {
      handler(val, old) {
        this.checkActiveTab()
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.checkActiveTab()
  },
  methods: {
    finalpath(path) {
      return finalpath(this.locale, path, true)
    },
    goto(label) {
      this.path = label
      const labelSet = label === 'mobileHome' ? '/' : label
      this.$router.push({ path: finalpath(this.locale, labelSet, true) })
    },
    checkActiveTab() {
      const routePath = this.$route.path

      /* eslint no-useless-escape: 0 */
      const path = routePath.replace(/^\/de/, '').replace(/^\/mobile/, '')
      const matched = path.match(/[^\/]+/g)

      let label

      if (!matched) {
        label = 'mobileHome'
      } else {
        label = matched[0]
      }

      const indexFound = this.mobileLabels.findIndex(
        (item) => item.label === label
      )

      this.value = indexFound
      this.path = label
    },
  },
}
</script>

<style></style>
