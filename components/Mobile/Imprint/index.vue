<template>
  <v-card>
    <CoverHeader noimg />
    <v-card-text>
      <MobileView>
        <span class="text-h6 mb-3">{{ $t('imprint.mainTitle') }}</span>
        <span
          v-for="(text, index) in contentExtractor($t('imprint.subtitle'))"
          :key="index"
          v-html="text"
        ></span>
      </MobileView>
      <MobileView v-for="key in 8" :key="key" class="my-4">
        <span :style="fontColorStyle" class="text-h6 mb-3">{{
          $t(`imprint.title${key}`)
        }}</span>
        <span
          v-for="(text, index) in contentExtractor($t(`imprint.text${key}`))"
          :key="index"
          v-html="text"
        ></span>
      </MobileView>
    </v-card-text>
  </v-card>
</template>

<script>
import MobileView from '~/components/Mobile/View'
import CoverHeader from '~/components/Mobile/CoverHeader'
import { contentExtractor } from '~/helpers'

export default {
  components: {
    MobileView,
    CoverHeader,
  },
  computed: {
    themes() {
      return this.$vuetify.theme.themes
    },
    fontColorStyle() {
      return {
        color: this.themes.light.primary3,
      }
    },
  },
  methods: {
    contentExtractor(input) {
      return contentExtractor(input)
    },
  },
}
</script>

<style></style>
