<template>
  <MobileView>
    <v-fab-transition>
      <v-btn
        elevation="2"
        color="primary3"
        dark
        fab
        fixed
        top
        left
        small
        @click="drawer = !drawer"
        ><v-icon small>fas fa-bars</v-icon></v-btn
      >
    </v-fab-transition>
    <v-fab-transition>
      <v-btn
        v-show="figure"
        elevation="2"
        color="primary3"
        dark
        fab
        fixed
        top
        right
        small
        @click="closeFigure"
      >
        <v-icon v-if="!visibleTreatmentDetail" small>fas fa-times</v-icon>
        <v-icon v-else small>fas fa-chevron-right</v-icon>
      </v-btn>
    </v-fab-transition>
    <MobileView v-if="!figure" class="justify-center align-center relative">
      <swiper ref="procedureCarousel" style="margin: 0" :options="swiperOption">
        <swiper-slide :key="0">
          <MobileView class="justify-center align-center full">
            <v-img
              contain
              :src="require('~/assets/fig_3.png')"
              width="80vw"
            ></v-img>
          </MobileView>
        </swiper-slide>
        <swiper-slide :key="1">
          <MobileView class="justify-center align-center full">
            <v-img
              contain
              :src="require('~/assets/fig_4.png')"
              width="80vw"
            ></v-img>
          </MobileView>
        </swiper-slide>
        <div slot="pagination" class="swiper-pagination"></div>
      </swiper>
      <span class="text-h6 text-center font-weight-bold virtual-select">
        {{ $t('treatments.virtual') }}
      </span>
      <span class="text-center font-weight-light virtual-select-desc">
        {{ $t('treatments.virtualDescMobile') }}
      </span>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
      <MobileView class="bottom-button">
        <v-btn
          style="padding: 0"
          elevation="2"
          color="primary3"
          tile
          block
          dark
          @click="gotoConsultation"
        >
          <span>{{ $t('welcome.discover2') }}</span>
        </v-btn>
      </MobileView>
    </MobileView>
    <MobileView v-else>
      <MobileView class="full relative">
        <span class="text-center font-weight-light virtual-select-tap">
          {{ $t('treatments.virtualTap') }}
        </span>
        <div
          v-if="isFemale"
          id="female"
          ref="female"
          class="figure__woman"
          :class="detailClass"
        >
          <v-img
            style="overflow: visible"
            contain
            position="bottom center"
            :src="require('~/assets/fig_3.png')"
            width="100%"
            height="100%"
          >
            <div v-if="!visibleTreatmentDetail">
              <Dot
                v-for="(part, index) in womanParts"
                :key="index"
                :index="index"
                v-bind="{ ...part, part }"
                is-mobile
              />
            </div>
            <div v-else>
              <Dot
                v-for="(part, index) in womanSubparts[figurePart]"
                :key="index"
                :index="index"
                v-bind="{ ...part, part }"
                for-subpart
                @reset-active-parts="resetActiveParts"
                @open-detail="openDetail"
              />
            </div>
          </v-img>
        </div>
        <div
          v-if="isMale"
          id="male"
          ref="male"
          class="figure__man"
          :class="detailClass"
        >
          <v-img
            style="overflow: visible"
            contain
            position="bottom center"
            :src="require('~/assets/fig_4.png')"
            width="100%"
            height="100%"
          >
            <div v-if="!visibleTreatmentDetail">
              <Dot
                v-for="(part, index) in manParts"
                :key="index"
                v-bind="{ ...part, part }"
                is-mobile
              />
            </div>
            <div v-else>
              <Dot
                v-for="(part, index) in manSubparts[figurePart]"
                :key="index"
                :index="index"
                v-bind="{ ...part, part }"
                for-subpart
                @reset-active-parts="resetActiveParts"
                @open-detail="openDetail"
              />
            </div>
          </v-img>
        </div>
      </MobileView>
      <MobileView class="bottom-button">
        <v-btn
          v-show="!detailButtonDisabled"
          style="padding: 0"
          elevation="2"
          color="primary3"
          tile
          block
          dark
          @click="gotoDetails"
        >
          <span>{{ $t('treatments.detail') }}</span>
        </v-btn>
        <v-btn
          v-show="visibleTreatmentDetail"
          style="padding: 0"
          elevation="2"
          color="primary3"
          tile
          block
          dark
          @click="subpartDialog = true"
        >
          <span>{{ $t('treatments.allDetail') }}</span>
        </v-btn>
      </MobileView>
    </MobileView>

    <v-dialog
      v-model="subpartDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card class="overflow-y-auto">
        <v-toolbar dark color="primary3">
          <v-btn icon dark @click="subpartDialog = false">
            <v-icon>fas fa-times</v-icon>
          </v-btn>
          <v-toolbar-title>
            <span v-if="showingList">
              {{ $t(`treatments.${figurePart}.title`) }}
              {{ $t('treatments.procedures') }}
            </span>
            <span v-else>
              {{
                !outpatientDetail
                  ? $t(`treatments.${figurePart}.${subpart.query}.title`)
                  : $t(
                      `treatments.outpatient_treatment.${outpatientFilters[figureSubpart].query}.title`
                    )
              }}
            </span>
          </v-toolbar-title>
          <v-spacer />
          <v-btn v-if="!showingList" icon dark @click="showingList = true">
            <v-icon>fas fa-chevron-right</v-icon>
          </v-btn>
          <template v-if="!showingList" v-slot:extension>
            <v-tabs
              v-model="detailTab"
              background-color="primary3"
              center-active
              dark
            >
              <v-tab v-for="(item, index) in tabs" :key="index">{{
                item.label
              }}</v-tab>
            </v-tabs>
          </template>
        </v-toolbar>
        <MobileView v-if="showingList" class="detail-section">
          <span class="text-h5">{{ $t('treatments.surgeries') }}</span>
          <VerticalNavigation
            class="mt-3 mb-6"
            tab-justify="left"
            :subparts="subparts"
            @close-list="toogleList"
          />
          <span class="text-h5">{{ $t('treatments.nonsurgeries') }}</span>
          <VerticalNavigation
            class="mt-3"
            tab-justify="left"
            :subparts="outpatientFilters"
            outpatient
            @close-list="toogleList"
          />
        </MobileView>
        <v-tabs-items v-else v-model="detailTab">
          <v-tab-item>
            <v-card flat class="overflow-y-auto">
              <v-card-text class="font-weight-light">
                <!-- <p
                  v-for="(text, index) in contentExtractor(
                    !outpatientDetail
                      ? $t(
                          `treatments.${figurePart}.${subpart.query}.general.content`
                        )
                      : $t(
                          `treatments.outpatient_treatment.${outpatientFilters[figureSubpart].query}.general.content`
                        )
                  )"
                  :key="index"
                  class="font-weight-light"
                  v-html="text"
                ></p> -->
                <div
                  v-if="
                    !contentIsArray(
                      MasterContent.outpatient_treatment[
                        outpatientFilters[figureSubpart].query
                      ].general.content
                    )
                  "
                >
                  <p
                    v-for="(text, index) in contentExtractor(
                      $t(
                        `treatments.outpatient_treatment.${outpatientFilters[figureSubpart].query}.general.content`
                      )
                    )"
                    :key="index"
                    v-html="text"
                  ></p>
                </div>
                <!-- Custom Part -->
                <div
                  v-if="
                    MasterContent.outpatient_treatment[
                      outpatientFilters[figureSubpart].query
                    ].general.list
                  "
                >
                  <ul
                    v-for="(subItem, id) in MasterContent.outpatient_treatment[
                      outpatientFilters[figureSubpart].query
                    ].general.list"
                    :key="id"
                    class="d-flex flex-column mb-2"
                  >
                    <li class="mb-2">
                      {{
                        $t(
                          `treatments.outpatient_treatment.${outpatientFilters[figureSubpart].query}.general.list[${id}].content`
                        )
                      }}
                    </li>
                  </ul>
                </div>
                <div
                  v-if="
                    MasterContent.outpatient_treatment[
                      outpatientFilters[figureSubpart].query
                    ].general.extend
                  "
                >
                  <p
                    v-for="(text, index) in contentExtractor(
                      $t(
                        `treatments.outpatient_treatment.${outpatientFilters[figureSubpart].query}.general.extend`
                      )
                    )"
                    :key="index"
                    v-html="text"
                  ></p>
                </div>
                <div
                  v-if="
                    !contentIsArray(
                      MasterContent.outpatient_treatment[
                        outpatientFilters[figureSubpart].query
                      ].general.content
                    ) &&
                    MasterContent.outpatient_treatment[
                      outpatientFilters[figureSubpart].query
                    ].general.sub
                  "
                >
                  <div
                    v-for="(subItem, id) in MasterContent.outpatient_treatment[
                      outpatientFilters[figureSubpart].query
                    ].general.sub"
                    :key="id"
                    class="d-flex flex-column"
                  >
                    <span class="text-h4 font-weight-bold mb-4">
                      {{
                        $t(
                          `treatments.outpatient_treatment.${outpatientFilters[figureSubpart].query}.general.sub[${id}].title`
                        )
                      }}
                    </span>
                    <p
                      v-for="(text, index) in contentExtractor(
                        $t(
                          `treatments.outpatient_treatment.${outpatientFilters[figureSubpart].query}.general.sub[${id}].content`
                        )
                      )"
                      :key="index"
                      v-html="text"
                    ></p>
                  </div>
                </div>
                <div
                  v-if="
                    contentIsArray(
                      MasterContent.outpatient_treatment[
                        outpatientFilters[figureSubpart].query
                      ].general.content
                    )
                  "
                >
                  <div
                    v-for="(subItem, id) in MasterContent.outpatient_treatment[
                      outpatientFilters[figureSubpart].query
                    ].general.content"
                    :key="id"
                    class="d-flex flex-column"
                  >
                    <span class="text-h4 font-weight-bold mb-4">
                      {{
                        $t(
                          `treatments.outpatient_treatment.${outpatientFilters[figureSubpart].query}.general.content[${id}].title`
                        )
                      }}
                    </span>
                    <p
                      v-for="(text, index) in contentExtractor(
                        $t(
                          `treatments.outpatient_treatment.${outpatientFilters[figureSubpart].query}.general.content[${id}].content`
                        )
                      )"
                      :key="index"
                      v-html="text"
                    ></p>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat class="overflow-y-auto">
              <v-card-text class="font-weight-light">
                <div
                  v-if="
                    !contentIsArray(
                      !outpatientDetail
                        ? MasterContent[figurePart][subpart.query].engagement
                            .content
                        : MasterContent.outpatient_treatment[
                            outpatientFilters[figureSubpart].query
                          ].treatment.content
                    )
                  "
                >
                  <p
                    v-for="(text, index) in contentExtractor(
                      !outpatientDetail
                        ? $t(
                            `treatments.${figurePart}.${subpart.query}.engagement.content`
                          )
                        : $t(
                            `treatments.outpatient_treatment.${outpatientFilters[figureSubpart].query}.treatment.content`
                          )
                    )"
                    :key="index"
                    v-html="text"
                  ></p>
                </div>
                <!-- Custom Part -->
                <div
                  v-if="
                    !outpatientDetail
                      ? MasterContent[figurePart][subpart.query].engagement.list
                      : MasterContent.outpatient_treatment[
                          outpatientFilters[figureSubpart].query
                        ].treatment.list
                  "
                >
                  <ul
                    v-for="(subItem, id) in !outpatientDetail
                      ? MasterContent[figurePart][subpart.query].engagement.list
                      : MasterContent.outpatient_treatment[
                          outpatientFilters[figureSubpart].query
                        ].treatment.list"
                    :key="id"
                    class="d-flex flex-column mb-2"
                  >
                    <li class="mb-2">
                      {{
                        !outpatientDetail
                          ? $t(
                              `treatments.${figurePart}.${subpart.query}.engagement.list[${id}].content`
                            )
                          : $t(
                              `treatments.outpatient_treatment.${outpatientFilters[figureSubpart].query}.treatment.list[${id}].content`
                            )
                      }}
                    </li>
                  </ul>
                </div>
                <div
                  v-if="
                    !outpatientDetail
                      ? MasterContent[figurePart][subpart.query].engagement
                          .extend
                      : MasterContent.outpatient_treatment[
                          outpatientFilters[figureSubpart].query
                        ].treatment.extend
                  "
                >
                  <p
                    v-for="(text, index) in contentExtractor(
                      !outpatientDetail
                        ? $t(
                            `treatments.${figurePart}.${subpart.query}.engagement.extend`
                          )
                        : $t(
                            `treatments.outpatient_treatment.${outpatientFilters[figureSubpart].query}.treatment.extend`
                          )
                    )"
                    :key="index"
                    v-html="text"
                  ></p>
                </div>
                <div
                  v-if="
                    !contentIsArray(
                      !outpatientDetail
                        ? MasterContent[figurePart][subpart.query].engagement
                            .content
                        : MasterContent.outpatient_treatment[
                            outpatientFilters[figureSubpart].query
                          ].treatment.content
                    ) && !outpatientDetail
                      ? MasterContent[figurePart][subpart.query].engagement.sub
                      : MasterContent.outpatient_treatment[
                          outpatientFilters[figureSubpart].query
                        ].treatment.sub
                  "
                >
                  <div
                    v-for="(subItem, id) in !outpatientDetail
                      ? MasterContent[figurePart][subpart.query].engagement.sub
                      : MasterContent.outpatient_treatment[
                          outpatientFilters[figureSubpart].query
                        ].treatment.sub"
                    :key="id"
                    class="d-flex flex-column"
                  >
                    <span class="text-h6 font-weight-bold mb-4">
                      {{
                        !outpatientDetail
                          ? $t(
                              `treatments.${figurePart}.${subpart.query}.engagement.sub[${id}].title`
                            )
                          : $t(
                              `treatments.outpatient_treatment.${outpatientFilters[figureSubpart].query}.treatment.sub[${id}].title`
                            )
                      }}
                    </span>
                    <p
                      v-for="(text, index) in contentExtractor(
                        !outpatientDetail
                          ? $t(
                              `treatments.${figurePart}.${subpart.query}.engagement.sub[${id}].content`
                            )
                          : $t(
                              `treatments.outpatient_treatment.${outpatientFilters[figureSubpart].query}.treatment.sub[${id}].content`
                            )
                      )"
                      :key="index"
                      v-html="text"
                    ></p>
                  </div>
                </div>
                <div
                  v-if="
                    contentIsArray(
                      !outpatientDetail
                        ? MasterContent[figurePart][subpart.query].engagement
                            .content
                        : MasterContent.outpatient_treatment[
                            outpatientFilters[figureSubpart].query
                          ].treatment.content
                    )
                  "
                >
                  <div
                    v-for="(subItem, id) in !outpatientDetail
                      ? MasterContent[figurePart][subpart.query].engagement
                          .content
                      : MasterContent.outpatient_treatment[
                          outpatientFilters[figureSubpart].query
                        ].treatment.content"
                    :key="id"
                    class="d-flex flex-column"
                  >
                    <span class="text-h6 font-weight-bold mb-4">
                      {{
                        !outpatientDetail
                          ? $t(
                              `treatments.${figurePart}.${subpart.query}.engagement.content[${id}].title`
                            )
                          : $t(
                              `treatments.outpatient_treatment.${outpatientFilters[figureSubpart].query}.treatment.content[${id}].title`
                            )
                      }}
                    </span>
                    <p
                      v-for="(text, index) in contentExtractor(
                        !outpatientDetail
                          ? $t(
                              `treatments.${figurePart}.${subpart.query}.engagement.content[${id}].content`
                            )
                          : $t(
                              `treatments.outpatient_treatment.${outpatientFilters[figureSubpart].query}.treatment.content[${id}].content`
                            )
                      )"
                      :key="index"
                      v-html="text"
                    ></p>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <v-expansion-panels>
                  <v-expansion-panel
                    v-for="(content, index) in !outpatientDetail
                      ? MasterContent[figurePart][subpart.query].additional
                          .content
                      : MasterContent.outpatient_treatment[
                          outpatientFilters[figureSubpart].query
                        ].faq.content"
                    :key="index"
                  >
                    <v-expansion-panel-header class="font-weight-bold">
                      {{ index + 1 }}.
                      {{
                        !outpatientDetail
                          ? $t(
                              `treatments.${figurePart}.${subpart.query}.additional.content[${index}].title`
                            )
                          : $t(
                              `treatments.outpatient_treatment.${outpatientFilters[figureSubpart].query}.faq.content[${index}].title`
                            )
                      }}
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="font-weight-light">
                      {{
                        !outpatientDetail
                          ? $t(
                              `treatments.${figurePart}.${subpart.query}.additional.content[${index}].subtitle`
                            )
                          : $t(
                              `treatments.outpatient_treatment.${outpatientFilters[figureSubpart].query}.faq.content[${index}].subtitle`
                            )
                      }}
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat class="overflow-y-auto">
              <v-card-text class="font-weight-light">
                <div
                  v-for="(summary, index) in summaries"
                  :key="index"
                  class="d-flex flex-column"
                >
                  <div class="text-h6 font-weight-bold">
                    <span
                      v-if="
                        !outpatientDetail &&
                        MasterContent[figurePart][subpart.query].summary[
                          summary
                        ] &&
                        MasterContent[figurePart][subpart.query].summary[
                          summary
                        ].title
                      "
                      class="mb-3"
                    >
                      {{
                        $t(
                          `treatments.${figurePart}.${subpart.query}.summary.${summary}.title`
                        )
                      }}
                    </span>
                    <span
                      v-else-if="
                        outpatientDetail &&
                        MasterContent.outpatient_treatment[
                          outpatientFilters[figureSubpart].query
                        ].summary[summary] &&
                        MasterContent.outpatient_treatment[
                          outpatientFilters[figureSubpart].query
                        ].summary[summary].title
                      "
                      class="mb-3"
                    >
                      {{
                        $t(
                          `treatments.outpatient_treatment.${outpatientFilters[figureSubpart].query}.summary.${summary}.title`
                        )
                      }}
                    </span>
                  </div>
                  <div>
                    <span
                      v-if="
                        !outpatientDetail &&
                        MasterContent[figurePart][subpart.query].summary[
                          summary
                        ] &&
                        MasterContent[figurePart][subpart.query].summary[
                          summary
                        ].detail
                      "
                      class="mb-6"
                    >
                      {{
                        $t(
                          `treatments.${figurePart}.${subpart.query}.summary.${summary}.detail`
                        )
                      }}
                    </span>
                    <span
                      v-else-if="
                        outpatientDetail &&
                        MasterContent.outpatient_treatment[
                          outpatientFilters[figureSubpart].query
                        ].summary[summary] &&
                        MasterContent.outpatient_treatment[
                          outpatientFilters[figureSubpart].query
                        ].summary[summary].detail
                      "
                      class="mb-6"
                    >
                      {{
                        $t(
                          `treatments.outpatient_treatment.${outpatientFilters[figureSubpart].query}.summary.${summary}.detail`
                        )
                      }}
                    </span>
                  </div>
                  <div>
                    <span
                      v-if="
                        !outpatientDetail &&
                        MasterContent[figurePart][subpart.query].summary[
                          summary
                        ] &&
                        MasterContent[figurePart][subpart.query].summary[
                          summary
                        ].subtitle
                      "
                      class="mb-6"
                    >
                      {{
                        $t(
                          `treatments.${figurePart}.${subpart.query}.summary.${summary}.subtitle`
                        )
                      }}
                    </span>
                    <span
                      v-else-if="
                        outpatientDetail &&
                        MasterContent.outpatient_treatment[
                          outpatientFilters[figureSubpart].query
                        ].summary[summary] &&
                        MasterContent.outpatient_treatment[
                          outpatientFilters[figureSubpart].query
                        ].summary[summary].subtitle
                      "
                      class="mb-6"
                    >
                      {{
                        $t(
                          `treatments.outpatient_treatment.${outpatientFilters[figureSubpart].query}.summary.${summary}.subtitle`
                        )
                      }}
                    </span>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-dialog>
    <v-dialog v-model="bookDialog" transition="dialog-bottom-transition">
      <v-card>
        <v-card-title :style="footerTitleStyle" class="text-h6 grey lighten-2">
          {{ $t('treatments.footerTitle') }}
        </v-card-title>
        <v-card-text>
          <MobileView>
            <span
              :style="footerSubStyle"
              class="text-subtitle-1 font-weight-light my-4"
              >{{ $t('treatments.footerSub') }}</span
            >
            <v-btn
              dark
              tile
              elevation="2"
              block
              color="primary4"
              @click="gotoContact"
              >{{ $t('treatments.contact') }}</v-btn
            >
          </MobileView>
        </v-card-text>
      </v-card>
    </v-dialog>
  </MobileView>
</template>

<script>
import MobileView from '~/components/Mobile/View'
import Dot from '~/components/Treatment/Dot'
import VerticalNavigation from '~/components/Treatment/VerticalNavigation'

import womanParts from '~/components/Treatment/assets/womanParts.json'
import manParts from '~/components/Treatment/assets/manParts.json'
import womanSubparts from '~/components/Treatment/assets/womanSubparts.json'
import manSubparts from '~/components/Treatment/assets/manSubparts.json'
import outpatient from '~/components/Treatment/assets/outpatient.json'
import MasterContent from '~/assets/locales/en/treatments.json'

import { finalpath, contentExtractor } from '~/helpers'

export default {
  components: {
    MobileView,
    Dot,
    VerticalNavigation,
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 0,
        centeredSlides: true,
        grabCursor: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true,
        },
      },

      ready: false,
      figure: '',
      subpartDialog: false,
      bookDialog: false,
      showingList: true,
      womanParts,
      manParts,
      womanSubparts,
      manSubparts,
      outpatient,
      MasterContent,

      detailTab: '',
      items: [
        { label: this.$t('treatments.general'), value: 'general' },
        { label: this.$t('treatments.engagement'), value: 'engagement' },
        { label: this.$t('treatments.additional'), value: 'additional' },
        { label: this.$t('treatments.summary'), value: 'summary' },
      ],
      outpatientItems: [
        { label: this.$t('treatments.general'), value: 'general' },
        { label: this.$t('treatments.treatment'), value: 'treatment' },
        { label: this.$t('treatments.faq'), value: 'faq' },
        { label: this.$t('treatments.summary'), value: 'summary' },
      ],
      summaries: [
        'duration',
        'areasOfApplication',
        'durationInClinic',
        'anasthesia',
        'postTreatment',
        'sociable',
      ],
    }
  },
  computed: {
    themes() {
      return this.$vuetify.theme.themes
    },
    drawer: {
      set(val) {
        this.$store.commit('SET_SIDENAV', val)
      },
      get() {
        return this.$store.state.sideNav
      },
    },
    locale() {
      return this.$store.state.locale
    },
    subpart() {
      if (this.isFemale) {
        return this.womanSubparts[this.figurePart][this.figureSubpart]
      }
      return this.manSubparts[this.figurePart][this.figureSubpart]
    },
    outpatientDetail: {
      get() {
        return this.$store.state.outpatientDetail
      },
      set(val) {
        this.$store.commit('SET_OUTPATIENTDETAIL', val)
      },
    },
    outpatientFilters() {
      if (this.figurePart === 'face_and_head') {
        return this.outpatient.filter((part) => part.query !== 'anti_stress')
      } else {
        return this.outpatient.filter((part) => part.query === 'fat_away')
      }
    },
    tabs() {
      if (this.outpatientDetail) {
        return this.outpatientItems
      }
      return this.items
    },
    visibleTreatmentDetail: {
      get() {
        return this.$store.state.visibleTreatmentDetail
      },
      set(val) {
        this.$store.commit('SET_VISIBLE_TREATMENT_DETAIL', val)
      },
    },
    subparts() {
      if (this.isFemale) {
        return this.womanSubparts[this.figurePart]
      }
      if (this.isMale) {
        return this.manSubparts[this.figurePart]
      }

      return []
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
    isFemale() {
      return this.figure === 'female'
    },
    isMale() {
      return this.figure === 'male'
    },
    isOutpatient() {
      const { outpatient } = this.$route.query
      return outpatient === '1'
    },
    detailClass() {
      return {
        zoom__in: this.visibleTreatmentDetail,
        face__head: this.figurePart === 'face_and_head',
        chest__area: this.figurePart === 'chest_area',
        body: this.figurePart === 'body',
        arms: this.figurePart === 'arms',
        leg: this.figurePart === 'legs',
      }
    },
    detailButtonDisabled() {
      if (this.isFemale) {
        return this.womanParts.every((item) => !item.active)
      }

      if (this.isMale) {
        return this.manParts.every((item) => !item.active)
      }

      return true
    },
    footerTitleStyle() {
      return {
        color: this.themes.light.footerTitle,
      }
    },
    footerSubStyle() {
      return {
        color: this.themes.light.footerSub,
      }
    },
  },
  watch: {
    showingList: {
      handler(val) {
        this.detailTab = ''
        if (!val) {
          setTimeout(() => {
            this.bookDialog = true
          }, 3000)
        }
      },
      deep: true,
      immediate: true,
    },
    subpartDialog: {
      handler(val) {
        this.showingList = true
      },
      deep: true,
      immediate: true,
    },
    '$route.query.part': {
      handler(val) {
        if (val) {
          setTimeout(() => {
            this.visibleTreatmentDetail = true
          }, 100)
          this.figurePart = val

          this.checkActiveSubpart()
          this.checkOutpatient()
          return
        }

        this.visibleTreatmentDetail = false
        this.figurePart = ''
        this.womanParts.forEach((part) => {
          part.active = false
        })
        this.manParts.forEach((part) => {
          part.active = false
        })
      },
      deep: true,
      immediate: true,
    },
    '$route.query.outpatient': {
      handler(val) {
        if (val === '1') {
          this.outpatientDetail = true
          if (this.isFemale) {
            this.womanSubparts[this.figurePart].forEach((subpart) => {
              subpart.active = false
            })
          }

          if (this.isMale) {
            this.manSubparts[this.figurePart].forEach((subpart) => {
              subpart.active = false
            })
          }
        } else {
          this.outpatientDetail = false
          this.outpatient.forEach((subpart) => {
            subpart.active = false
          })
        }
      },
      deep: true,
      immediate: true,
    },
  },
  beforeMount() {
    this.prechecking()
  },
  mounted() {
    if (this.$route.query.part) {
      this.checkActiveSubpart()
      this.checkOutpatient()
    }
  },
  methods: {
    prechecking() {
      const { figure } = this.$route.query
      if (!figure || (figure !== 'male' && figure !== 'female')) {
        this.closeFigure()

        return
      }

      this.figure = figure
      this.ready = true
    },
    checkActiveSubpart() {
      if (this.isFemale) {
        this.womanSubparts[this.figurePart].forEach((subpart) => {
          subpart.active = false
        })
        this.figureSubpart = 0
        this.womanSubparts[this.figurePart][0].active = true
      }
      if (this.isMale) {
        this.manSubparts[this.figurePart].forEach((subpart) => {
          subpart.active = false
        })
        this.figureSubpart = 0
        this.manSubparts[this.figurePart][0].active = true
      }
      this.$store.commit('SET_ACTIVE_TAB_TREATMENT_DETAIL', {
        activeTab: 'general',
      })
    },
    checkOutpatient() {
      if (this.isOutpatient) {
        this.outpatientDetail = true
        if (this.isFemale) {
          this.womanSubparts[this.figurePart].forEach((subpart) => {
            subpart.active = false
          })
        }

        if (this.isMale) {
          this.manSubparts[this.figurePart].forEach((subpart) => {
            subpart.active = false
          })
        }

        this.outpatient.forEach((subpart) => {
          subpart.active = false
        })
        this.figureSubpart = 0
        this.outpatientFilters[0].active = true
      } else {
        this.outpatientDetail = false
        this.outpatient.forEach((subpart) => {
          subpart.active = false
        })
      }
    },
    openDetail() {
      this.subpartDialog = true
    },
    toogleList() {
      this.showingList = !this.showingList
    },
    finalpath(path) {
      return finalpath(this.locale, path, true)
    },
    gotoConsultation() {
      const activeIndex = this.$refs.procedureCarousel.$swiper.activeIndex

      if (activeIndex === 0) {
        this.$router.push({
          path: this.finalpath('procedures'),
          query: { figure: 'female' },
        })
        this.figure = 'female'
      } else if (activeIndex === 1) {
        this.$router.push({
          path: this.finalpath('procedures'),
          query: { figure: 'male' },
        })
        this.figure = 'male'
      }

      this.ready = true
    },
    closeFigure() {
      if (!this.visibleTreatmentDetail) {
        this.$router.push({
          path: this.finalpath('procedures'),
        })
        this.figure = ''
      } else {
        const { figure } = this.$route.query

        this.$router.push({ query: { figure } })
      }
    },
    gotoDetails() {
      const { figure } = this.$route.query
      let query = ''

      if (this.isFemale) {
        const active = this.womanParts.find((part) => part.active)
        query = active.query
      } else if (this.isMale) {
        const active = this.manParts.find((part) => part.active)
        query = active.query
      }

      if (!query) {
        return
      }

      this.$router.push({ query: { figure, part: query } })
    },
    gotoContact() {
      this.$router.push({
        path: this.finalpath('contact'),
      })
    },
    resetActiveParts(val) {
      if (this.isFemale) {
        this.womanSubparts[this.figurePart].forEach((subpart) => {
          subpart.active = false
        })
      }
      if (this.isMale) {
        this.manSubparts[this.figurePart].forEach((subpart) => {
          subpart.active = false
        })
      }
      this.figureSubpart = val
    },
    contentIsArray(content) {
      return Array.isArray(content)
    },
    contentExtractor(input) {
      return contentExtractor(input)
    },
  },
}
</script>

<style scoped>
.full {
  height: 93vh;
  width: 100vw;
  overflow: hidden;
}
.relative {
  position: relative;
}
.bottom-button {
  height: 7vh;
  width: 100vw;
}
.detail-section {
  padding: 5vw;
}
.virtual-select {
  transform: translate(-50%, -50%);
  position: absolute;
  width: 100vw;
  top: 48px;
  left: 50vw;
}
.virtual-select-desc {
  transform: translate(-50%, -50%);
  position: absolute;
  width: 100vw;
  top: 68px;
  left: 50vw;
}
.virtual-select-tap {
  transform: translate(-50%, -50%);
  position: absolute;
  width: 60vw;
  top: 68px;
  left: 50vw;
}

.figure__woman {
  position: absolute;
  bottom: 0px;
  transform: translate(-50%, 0);
  left: 50%;
  width: 80vw;
  height: 144vw;
  transition: 1000ms;
}

.figure__woman.zoom__in {
  position: absolute;
  width: 240vw;
  height: 432vw;
  transition: 1000ms;
}
.figure__woman.zoom__in.face__head {
  top: -10vh;
}
.figure__woman.zoom__in.chest__area {
  top: -20vh;
}
.figure__woman.zoom__in.body {
  top: -50vh;
}
.figure__woman.zoom__in.arms {
  left: 10%;
  top: -50vh;
}
.figure__woman.zoom__in.leg {
  top: -80vh;
}

.figure__man {
  position: absolute;
  bottom: 10vh;
  transform: translate(-50%, 0);
  left: 50%;
  width: 80vw;
  height: 144vw;
  transition: 1000ms;
}

.figure__man.zoom__in {
  position: absolute;
  width: 240vw;
  height: 432vw;
  transition: 1000ms;
}
.figure__man.zoom__in.face__head {
  left: 10%;
  top: -20vh;
}
.figure__man.zoom__in.chest__area {
  left: 10%;
  top: -35vh;
}
.figure__man.zoom__in.body {
  left: -10%;
  top: -50vh;
}
.figure__man.zoom__in.arms {
  top: -40vh;
}
.figure__man.zoom__in.leg {
  left: 10%;
  top: -70vh;
}

.swiper-slide {
  width: auto;
  height: auto;
}
.swiper-button-prev {
  color: #d2af69;
}
.swiper-button-next {
  color: #d2af69;
}
.swiper-pagination >>> .swiper-pagination-bullet-active {
  background-color: #d2af69;
}
</style>
