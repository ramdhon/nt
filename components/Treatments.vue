<template>
  <div id="treatments" class="treatments-container">
    <div style="position: relative" class="treatments-main pa-6">
      <v-tabs
        v-model="tab"
        style="position: absolute; top: 100px; right: 10px"
        background-color="transparent"
        :color="$vuetify.theme.themes.light.primary"
        vertical
      >
        <v-tab v-for="label in labels" :key="label">{{
          $t(`nav.${label}`)
        }}</v-tab>
      </v-tabs>
      <v-row class="treatments-main-logo"></v-row>
      <v-row class="full-height">
        <v-tabs
          v-model="tab"
          background-color="transparent"
          :color="$vuetify.theme.themes.light.primary"
          right
        >
          <v-tab v-for="label in labels" :key="label">{{
            $t(`nav.${label}`)
          }}</v-tab>
        </v-tabs>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    tab: {
      set(val) {
        this.$store.commit('SET_TAB', val)
      },
      get() {
        return this.$store.state.tab
      },
    },
    labels() {
      return this.$store.state.labels
    },
    locale: {
      set(val) {
        this.$store.commit('SET_LOCALE', val)
      },
      get() {
        return this.$store.state.locale
      },
    },
  },
}
</script>

<style>
.treatments-container {
  background: gray;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
}
.treatments-main {
  width: 100%;
  height: 200%;
}
.treatments-main-logo {
  height: 0%;
}
.full-height {
  height: 100%;
}
.full-width {
  width: 100%;
}
</style>
