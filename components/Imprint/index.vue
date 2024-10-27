<template>
  <v-container>
    <v-row class="mt-16">
      <Section
        :title="$t('imprint.mainTitle')"
        title-component="h2"
        :title-color="themes.light.text"
      >
        <div class="d-flex flex-column">
          <span
            v-for="(text, index) in contentExtractor($t('imprint.subtitle'))"
            :key="index"
            class="text-subtitle-1 mb-3"
            v-html="text"
          ></span>
        </div>
      </Section>
    </v-row>
    <v-row v-for="key in 8" :key="key">
      <Section :title="$t(`imprint.title${key}`)">
        <div class="d-flex flex-column">
          <span
            v-for="(text, index) in contentExtractor($t(`imprint.text${key}`))"
            :key="index"
            class="text-subtitle-1 mb-3"
            v-html="text"
          ></span>
        </div>
      </Section>
    </v-row>
  </v-container>
</template>

<script>
import Section from '~/components/Global/Section'
import { contentExtractor } from '~/helpers'
export default {
  components: {
    Section,
  },
  computed: {
    themes() {
      return this.$vuetify.theme.themes
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
