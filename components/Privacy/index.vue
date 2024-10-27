<template>
  <v-container>
    <v-row class="mt-16">
      <Section
        :title="$t('privacy.title1.title')"
        title-component="h2"
        :title-color="themes.light.text"
      >
        <Section :title="$t('privacy.title1.sub[0].title')">
          <div class="d-flex flex-column">
            <span
              v-for="(text, i) in contentExtractor(
                $t('privacy.title1.sub[0].text')
              )"
              :key="i"
              class="text-subtitle-1 mb-3"
              v-html="text"
            ></span>
          </div>
        </Section>
        <Section :title="$t('privacy.title1.sub[1].title')">
          <Section
            v-for="(q, i) in 4"
            :key="i"
            title-component="h6"
            :title="$t(`privacy.title1.sub[1].q[${i}].title`)"
            :title-class="['font-weight-bold']"
            :title-color="themes.light.text"
          >
            <div class="d-flex flex-column">
              <span
                v-for="(text, j) in contentExtractor(
                  $t(`privacy.title1.sub[1].q[${i}].text`)
                )"
                :key="j"
                class="text-subtitle-1 mb-3"
                v-html="text"
              ></span>
            </div>
          </Section>
        </Section>
        <Section :title="$t('privacy.title1.sub[2].title')">
          <div class="d-flex flex-column">
            <span
              v-for="(text, i) in contentExtractor(
                $t('privacy.title1.sub[2].text')
              )"
              :key="i"
              class="text-subtitle-1 mb-3"
              v-html="text"
            ></span>
          </div>
        </Section>
      </Section>
    </v-row>
    <v-row>
      <Section
        :title="$t('privacy.title2.title')"
        title-component="h2"
        :title-color="themes.light.text"
      >
        <Section
          v-for="(sub, i) in 3"
          :key="i"
          :title="$t(`privacy.title2.sub[${i}].title`)"
        >
          <div class="d-flex flex-column">
            <span
              v-for="(text, j) in contentExtractor(
                $t(`privacy.title2.sub[${i}].text`)
              )"
              :key="j"
              class="text-subtitle-1 mb-3"
              v-html="text"
            ></span>
          </div>
        </Section>
        <Section :title="$t('privacy.title2.sub[3].title')">
          <div class="d-flex flex-column">
            <span
              v-for="(text, j) in contentExtractor(
                $t('privacy.title2.sub[3].text')
              )"
              :key="j"
              class="text-subtitle-1 mb-3 font-weight-bold"
              v-html="text"
            ></span>
          </div>
        </Section>
        <Section
          v-for="(sub, i) in 4"
          :key="i"
          :title="$t(`privacy.title2.sub[${i + 4}].title`)"
        >
          <div class="d-flex flex-column">
            <span
              v-for="(text, j) in contentExtractor(
                $t(`privacy.title2.sub[${i + 4}].text`)
              )"
              :key="j"
              class="text-subtitle-1 mb-3"
              v-html="text"
            ></span>
          </div>
        </Section>
        <Section :title="$t('privacy.title2.sub[8].title')">
          <div class="d-flex flex-column">
            <span
              v-for="(text, j) in contentExtractor(
                $t('privacy.title2.sub[8].text1')
              )"
              :key="j"
              class="text-subtitle-1 mb-3"
              v-html="text"
            ></span>
          </div>
          <ul>
            <li
              v-for="(text, j) in contentExtractor(
                $t('privacy.title2.sub[8].list')
              )"
              :key="j"
              class="text-subtitle-1 mb-3"
              v-html="text"
            ></li>
          </ul>
          <div class="d-flex flex-column">
            <span
              v-for="(text, j) in contentExtractor(
                $t('privacy.title2.sub[8].text2')
              )"
              :key="j"
              class="text-subtitle-1 mb-3"
              v-html="text"
            ></span>
          </div>
        </Section>
      </Section>
    </v-row>
    <v-row>
      <Section
        :title="$t('privacy.title3.title')"
        title-component="h2"
        :title-color="themes.light.text"
      >
        <Section :title="$t('privacy.title3.sub[0].title')">
          <div class="d-flex flex-column">
            <span
              v-for="(text, i) in contentExtractor(
                $t('privacy.title3.sub[0].text')
              )"
              :key="i"
              class="text-subtitle-1 mb-3"
              v-html="text"
            ></span>
          </div>
        </Section>
        <Section :title="$t('privacy.title3.sub[1].title')">
          <div class="d-flex flex-column">
            <span
              v-for="(text, i) in contentExtractor(
                $t(`privacy.title3.sub[1].text1`)
              )"
              :key="i"
              class="text-subtitle-1 mb-3"
              v-html="text"
            ></span>
          </div>
          <ul>
            <li
              v-for="(text, i) in contentExtractor(
                $t('privacy.title3.sub[1].list')
              )"
              :key="i"
              class="text-subtitle-1 mb-3"
              v-html="text"
            ></li>
          </ul>
          <div class="d-flex flex-column">
            <span
              v-for="(text, i) in contentExtractor(
                $t('privacy.title3.sub[1].text2')
              )"
              :key="i"
              class="text-subtitle-1 mb-3"
              v-html="text"
            ></span>
          </div>
        </Section>
        <Section :title="$t('privacy.title3.sub[2].title')">
          <div class="d-flex flex-column">
            <span
              v-for="(text, i) in contentExtractor(
                $t('privacy.title3.sub[2].text')
              )"
              :key="i"
              class="text-subtitle-1 mb-3"
              v-html="text"
            ></span>
          </div>
        </Section>
      </Section>
    </v-row>
    <v-row>
      <Section
        :title="$t('privacy.title4.title')"
        title-component="h2"
        :title-color="themes.light.text"
      >
        <Section :title="$t('privacy.title4.sub[0].title')">
          <div class="d-flex flex-column">
            <span
              v-for="(text, i) in contentExtractor(
                $t('privacy.title4.sub[0].text')
              )"
              :key="i"
              class="text-subtitle-1 mb-3"
              v-html="text"
            ></span>
          </div>
          <Section
            v-for="(q, i) in 5"
            :key="i"
            title-component="h6"
            :title="$t(`privacy.title4.sub[0].q[${i}].title`)"
            :title-class="['font-weight-bold']"
            :title-color="themes.light.text"
          >
            <div class="d-flex flex-column">
              <span
                v-for="(text, j) in contentExtractor(
                  $t('privacy.title4.sub[0].text')
                )"
                :key="j"
                class="text-subtitle-1 mb-3"
                v-html="text"
              ></span>
            </div>
          </Section>
        </Section>
        <Section :title="$t('privacy.title4.sub[1].title')">
          <div class="d-flex flex-column">
            <span
              v-for="(text, i) in contentExtractor(
                $t('privacy.title4.sub[1].text')
              )"
              :key="i"
              class="text-subtitle-1 mb-3"
              v-html="text"
            ></span>
          </div>
        </Section>
      </Section>
    </v-row>
    <v-row>
      <Section
        :title="$t('privacy.title5.title')"
        title-component="h2"
        :title-color="themes.light.text"
      >
        <Section :title="$t('privacy.title5.sub[0].title')">
          <div class="d-flex flex-column">
            <span
              v-for="(text, i) in contentExtractor(
                $t('privacy.title5.sub[0].text')
              )"
              :key="i"
              class="text-subtitle-1 mb-3"
              v-html="text"
            ></span>
          </div>
        </Section>
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
