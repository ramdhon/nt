<template>
  <v-card>
    <CoverHeader noimg />
    <MobileView class="px-4 py-8">
      <span class="text-h6">
        {{ $t('infodesk.title') }}
      </span>
      <span class="my-3 font-weight-light">
        {{ $t('infodesk.subtitle') }}
      </span>
      <v-expansion-panels>
        <v-expansion-panel
          v-for="index in 3"
          :key="`finding-doctor-item-${index}`"
        >
          <v-expansion-panel-header :style="fontColorStyle">
            {{ $t(`infodesk.step.${index}.title`) }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            {{ $t(`infodesk.step.${index}.subtitle`) }}
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </MobileView>
    <MobileView :style="lightBackground" class="px-4 py-8">
      <span class="text-h6">
        {{ $t('infodesk.costFinancing.title') }}
      </span>
      <MobileView
        v-for="index in 2"
        :key="`cost-finance-item-${index}`"
        class="my-4"
      >
        <span :style="fontColorStyle" class="mb-3">
          {{ $t(`infodesk.costFinancing.section.${index}.title`) }}
        </span>
        <span class="font-weight-light">
          {{ $t(`infodesk.costFinancing.section.${index}.subtitle`) }}
        </span>
      </MobileView>
    </MobileView>
    <MobileView class="px-4 py-8">
      <span class="text-h6">
        {{ $t('infodesk.insurance.title') }}
      </span>
      <span class="my-3 font-weight-light">
        {{ $t('infodesk.insurance.subtitle') }}
      </span>
      <v-expansion-panels>
        <v-expansion-panel v-for="index in 4" :key="`insurance-item-${index}`">
          <v-expansion-panel-header :style="fontColorStyle">
            {{ $t(`infodesk.insurance.details.${index}.title`) }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            {{ $t(`infodesk.insurance.details.${index}.subtitle`) }}
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </MobileView>
    <MobileView :style="lightBackground" class="px-4 py-8">
      <span class="text-h6 mb-3"> FAQ </span>
      <v-expansion-panels>
        <v-expansion-panel v-for="index in 5" :key="`faq-item-${index}`">
          <v-expansion-panel-header :style="fontColorStyle">
            {{ $t(`infodesk.faq.details.${index}.title`) }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            {{ $t(`infodesk.faq.details.${index}.subtitle`) }}
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </MobileView>
  </v-card>
</template>

<script>
import MobileView from '~/components/Mobile/View'
import CoverHeader from '~/components/Mobile/CoverHeader'

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
    lightBackground() {
      return {
        background: this.themes.light.lightBackground,
      }
    },
  },
}
</script>

<style></style>
