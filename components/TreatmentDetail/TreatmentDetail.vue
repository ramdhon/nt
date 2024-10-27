<template>
  <div class="d-flex align-stretch detail-container font-weight-light">
    <div
      class="treat-detail-container"
      :class="{ closed: showingList }"
      :style="lightBackground"
    >
      <div v-if="!showingList" class="d-flex flex-column full-height">
        <div class="treat-detail__button-container">
          <img :src="icons.closeIcon" alt="close" @click="closeDetail" />
        </div>
        <div class="treat-detail__title d-flex flex-column align-start">
          <span v-if="!isOutpatient">
            {{ $t(`treatments.${figurePart}.${subpart.query}.title`) }}
          </span>
          <span v-else>
            {{
              $t(
                `treatments.outpatient_treatment.${outpatientFilters[figureSubpart].query}.title`
              )
            }}
          </span>
          <v-btn
            class="text-body-2 text-none ml-n3"
            text
            small
            :color="themes.light.primary3"
            :ripple="false"
            @click="showingList = !showingList"
          >
            {{ $t('treatments.changeProcedure') }}
          </v-btn>
        </div>

        <div v-if="!isOutpatient" class="treat-detail-nav__container">
          <swiper style="margin: 0" :options="swiperOption">
            <swiper-slide
              v-for="(item, index) in items"
              :key="index"
              style="width: auto"
            >
              <ButtonNav
                :title="item.label"
                :value="item.value"
                :is-active="activeTab === item.value"
              />
            </swiper-slide>
          </swiper>
          <div class="section" :style="borderColor"></div>
        </div>
        <div v-else class="treat-detail-nav__container">
          <swiper style="margin: 0" :options="swiperOption">
            <swiper-slide
              v-for="(item, index) in outpatientItems"
              :key="index"
              style="width: auto"
            >
              <ButtonNav
                :title="item.label"
                :value="item.value"
                :is-active="activeTab === item.value"
              />
            </swiper-slide>
          </swiper>
          <div class="section" :style="borderColor"></div>
        </div>

        <div v-if="!isOutpatient" class="treat-detail__content">
          <div v-if="activeTab === 'additional'">
            <ExpandedCardInfo
              v-for="(content, index) in MasterContent[figurePart][
                subpart.query
              ].additional.content"
              :key="index"
              :index="index"
              :title="
                $t(
                  `treatments.${figurePart}.${subpart.query}.additional.content[${index}].title`
                )
              "
              >{{
                $t(
                  `treatments.${figurePart}.${subpart.query}.additional.content[${index}].subtitle`
                )
              }}</ExpandedCardInfo
            >
          </div>
          <div v-if="activeTab === 'general'">
            <p
              v-for="(text, index) in contentExtractor(
                $t(`treatments.${figurePart}.${subpart.query}.general.content`)
              )"
              :key="index"
              v-html="text"
            ></p>
          </div>
          <div v-if="activeTab === 'engagement'">
            <div
              v-if="
                !contentIsArray(
                  MasterContent[figurePart][subpart.query].engagement.content
                )
              "
            >
              <p
                v-for="(text, index) in contentExtractor(
                  $t(
                    `treatments.${figurePart}.${subpart.query}.engagement.content`
                  )
                )"
                :key="index"
                v-html="text"
              ></p>
            </div>
            <!-- Custom Part -->
            <div
              v-if="MasterContent[figurePart][subpart.query].engagement.list"
            >
              <ul
                v-for="(subItem, id) in MasterContent[figurePart][subpart.query]
                  .engagement.list"
                :key="id"
                class="d-flex flex-column mb-2"
              >
                <li class="mb-2">
                  {{
                    $t(
                      `treatments.${figurePart}.${subpart.query}.engagement.list[${id}].content`
                    )
                  }}
                </li>
              </ul>
            </div>
            <div
              v-if="MasterContent[figurePart][subpart.query].engagement.extend"
            >
              <p
                v-for="(text, index) in contentExtractor(
                  $t(
                    `treatments.${figurePart}.${subpart.query}.engagement.extend`
                  )
                )"
                :key="index"
                v-html="text"
              ></p>
            </div>
            <div
              v-if="
                !contentIsArray(
                  MasterContent[figurePart][subpart.query].engagement.content
                ) && MasterContent[figurePart][subpart.query].engagement.sub
              "
            >
              <div
                v-for="(subItem, id) in MasterContent[figurePart][subpart.query]
                  .engagement.sub"
                :key="id"
                class="d-flex flex-column"
              >
                <span class="text-h4 font-weight-bold mb-4">
                  {{
                    $t(
                      `treatments.${figurePart}.${subpart.query}.engagement.sub[${id}].title`
                    )
                  }}
                </span>
                <p
                  v-for="(text, index) in contentExtractor(
                    $t(
                      `treatments.${figurePart}.${subpart.query}.engagement.sub[${id}].content`
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
                  MasterContent[figurePart][subpart.query].engagement.content
                )
              "
            >
              <div
                v-for="(subItem, id) in MasterContent[figurePart][subpart.query]
                  .engagement.content"
                :key="id"
                class="d-flex flex-column"
              >
                <span class="text-h4 font-weight-bold mb-4">
                  {{
                    $t(
                      `treatments.${figurePart}.${subpart.query}.engagement.content[${id}].title`
                    )
                  }}
                </span>
                <p
                  v-for="(text, index) in contentExtractor(
                    $t(
                      `treatments.${figurePart}.${subpart.query}.engagement.content[${id}].content`
                    )
                  )"
                  :key="index"
                  v-html="text"
                ></p>
              </div>
            </div>
          </div>
          <div v-if="activeTab === 'summary'">
            <div
              v-for="(summary, index) in summaries"
              :key="index"
              class="d-flex flex-column"
            >
              <div class="text-h6 font-weight-bold">
                <span
                  v-if="
                    MasterContent[figurePart][subpart.query].summary[summary] &&
                    MasterContent[figurePart][subpart.query].summary[summary]
                      .title
                  "
                  class="mb-3"
                >
                  {{
                    $t(
                      `treatments.${figurePart}.${subpart.query}.summary.${summary}.title`
                    )
                  }}
                </span>
              </div>
              <div>
                <span
                  v-if="
                    MasterContent[figurePart][subpart.query].summary[summary] &&
                    MasterContent[figurePart][subpart.query].summary[summary]
                      .detail
                  "
                  class="mb-6"
                >
                  {{
                    $t(
                      `treatments.${figurePart}.${subpart.query}.summary.${summary}.detail`
                    )
                  }}
                </span>
              </div>
              <div>
                <span
                  v-if="
                    MasterContent[figurePart][subpart.query].summary[summary] &&
                    MasterContent[figurePart][subpart.query].summary[summary]
                      .subtitle
                  "
                  class="mb-6"
                >
                  {{
                    $t(
                      `treatments.${figurePart}.${subpart.query}.summary.${summary}.subtitle`
                    )
                  }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="treat-detail__content">
          <div v-if="activeTab === 'faq'">
            <ExpandedCardInfo
              v-for="(content, index) in MasterContent.outpatient_treatment[
                outpatientFilters[figureSubpart].query
              ].faq.content"
              :key="index"
              :index="index"
              :title="
                $t(
                  `treatments.outpatient_treatment.${outpatientFilters[figureSubpart].query}.faq.content[${index}].title`
                )
              "
              >{{
                $t(
                  `treatments.outpatient_treatment.${outpatientFilters[figureSubpart].query}.faq.content[${index}].subtitle`
                )
              }}</ExpandedCardInfo
            >
          </div>
          <!-- <div v-if="activeTab === 'general'">
            <p
              v-for="(text, index) in contentExtractor(
                $t(
                  `treatments.outpatient_treatment.${outpatientFilters[figureSubpart].query}.general.content`
                )
              )"
              :key="index"
              v-html="text"
            ></p>
          </div> -->
          <div v-if="activeTab === 'general'">
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
          </div>
          <div v-if="activeTab === 'treatment'">
            <div
              v-if="
                !contentIsArray(
                  MasterContent.outpatient_treatment[
                    outpatientFilters[figureSubpart].query
                  ].treatment.content
                )
              "
            >
              <p
                v-for="(text, index) in contentExtractor(
                  $t(
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
                MasterContent.outpatient_treatment[
                  outpatientFilters[figureSubpart].query
                ].treatment.list
              "
            >
              <ul
                v-for="(subItem, id) in MasterContent.outpatient_treatment[
                  outpatientFilters[figureSubpart].query
                ].treatment.list"
                :key="id"
                class="d-flex flex-column mb-2"
              >
                <li class="mb-2">
                  {{
                    $t(
                      `treatments.outpatient_treatment.${outpatientFilters[figureSubpart].query}.treatment.list[${id}].content`
                    )
                  }}
                </li>
              </ul>
            </div>
            <div
              v-if="
                MasterContent.outpatient_treatment[
                  outpatientFilters[figureSubpart].query
                ].treatment.extend
              "
            >
              <p
                v-for="(text, index) in contentExtractor(
                  $t(
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
                  MasterContent.outpatient_treatment[
                    outpatientFilters[figureSubpart].query
                  ].treatment.content
                ) &&
                MasterContent.outpatient_treatment[
                  outpatientFilters[figureSubpart].query
                ].treatment.sub
              "
            >
              <div
                v-for="(subItem, id) in MasterContent.outpatient_treatment[
                  outpatientFilters[figureSubpart].query
                ].treatment.sub"
                :key="id"
                class="d-flex flex-column"
              >
                <span class="text-h4 font-weight-bold mb-4">
                  {{
                    $t(
                      `treatments.outpatient_treatment.${outpatientFilters[figureSubpart].query}.treatment.sub[${id}].title`
                    )
                  }}
                </span>
                <p
                  v-for="(text, index) in contentExtractor(
                    $t(
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
                  MasterContent.outpatient_treatment[
                    outpatientFilters[figureSubpart].query
                  ].treatment.content
                )
              "
            >
              <div
                v-for="(subItem, id) in MasterContent.outpatient_treatment[
                  outpatientFilters[figureSubpart].query
                ].treatment.content"
                :key="id"
                class="d-flex flex-column"
              >
                <span class="text-h4 font-weight-bold mb-4">
                  {{
                    $t(
                      `treatments.outpatient_treatment.${outpatientFilters[figureSubpart].query}.treatment.content[${id}].title`
                    )
                  }}
                </span>
                <p
                  v-for="(text, index) in contentExtractor(
                    $t(
                      `treatments.outpatient_treatment.${outpatientFilters[figureSubpart].query}.treatment.content[${id}].content`
                    )
                  )"
                  :key="index"
                  v-html="text"
                ></p>
              </div>
            </div>
          </div>
          <div v-if="activeTab === 'summary'">
            <div
              v-for="(summary, index) in summaries"
              :key="index"
              class="d-flex flex-column"
            >
              <div class="text-h6 font-weight-bold">
                <span
                  v-if="
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
          </div>
        </div>
        <div class="section" :style="background"></div>
        <div class="d-flex flex-column">
          <div
            v-if="!showContact"
            class="align-self-center pt-2 pointer"
            @click="showContact = true"
            @mouseover="hover = true"
            @mouseleave="hover = false"
          >
            <CustomSVG
              v-if="!hover"
              size="1.5rem"
              :src="require('bootstrap-icons/icons/chevron-up.svg')"
              :color="themes.light.primary4"
            />
            <CustomSVG
              v-else
              size="1.5rem"
              :src="require('bootstrap-icons/icons/chevron-double-up.svg')"
              :color="themes.light.primary4"
            />
          </div>
          <div
            v-else
            class="align-self-center pt-2 pointer"
            @click="showContact = false"
            @mouseover="hover = true"
            @mouseleave="hover = false"
          >
            <CustomSVG
              v-if="!hover"
              size="1.5rem"
              :src="require('bootstrap-icons/icons/chevron-down.svg')"
              :color="themes.light.primary4"
            />
            <CustomSVG
              v-else
              size="1.5rem"
              :src="require('bootstrap-icons/icons/chevron-double-down.svg')"
              :color="themes.light.primary4"
            />
          </div>
          <span
            v-if="showContact"
            :style="footerTitleStyle"
            class="text-h5 font-weight-bold my-5"
            >{{ $t('treatments.footerTitle') }}</span
          >
          <div v-if="showContact" class="d-flex justify-space-between">
            <div class="contact-button">
              <span
                :style="footerSubStyle"
                class="text-subtitle-1 font-weight-light"
                >{{ $t('treatments.footerSub') }}</span
              >
            </div>
            <div class="contact-button">
              <v-btn
                dark
                tile
                elevation="2"
                x-large
                block
                :color="themes.light.primary4"
                :ripple="false"
                @click="gotoContact"
                >{{ $t('treatments.contact') }}</v-btn
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="d-flex flex-column justify-center align-center side-button"
      :style="darkBackground"
      @click="toogleList"
    >
      <div v-if="!showingList" class="d-flex">
        <span class="text-h6 font-weight-light side-button-text">{{
          $t('treatments.procedures')
        }}</span>
      </div>
      <CustomSVG
        v-if="!showingList"
        class="mt-12"
        size="1.5rem"
        :src="icons.left"
        :color="themes.light.primary4"
      />
      <CustomSVG
        v-else
        size="1.5rem"
        :src="icons.right"
        :color="themes.light.primary4"
      />
    </div>
    <div
      class="d-flex flex-column subpart-list overflow-y-auto"
      :class="{ closed: !showingList }"
      :style="background"
    >
      <div v-if="showingList">
        <div class="treat-detail__button-container">
          <img :src="icons.closeIcon" alt="close" @click="closeDetail" />
        </div>
        <div class="treat-detail__title d-flex flex-column align-start">
          <span>
            {{ $t(`treatments.${figurePart}.title`) }}
            {{ $t('treatments.procedures') }}
          </span>
          <v-btn
            class="text-body-2 text-none ml-n3"
            text
            small
            :color="themes.light.primary3"
            :ripple="false"
            @click="closeDetail"
          >
            {{ $t('treatments.changeArea') }}
          </v-btn>
        </div>
        <div>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// assets
import ChevronRight from 'bootstrap-icons/icons/chevron-right.svg'
import ChevronLeft from 'bootstrap-icons/icons/chevron-left.svg'
import CloseIcon from '../../assets/icons/close-icon.svg'
import BurgerMenuIcon from '../../assets/icons/burger-menu.svg'
import ExpandedCardInfo from '../ExpandedCardInfo'
import TreatmentDetailButtonNav from './TreatmentDetailButtonNav'
import womanSubparts from '~/components/Treatment/assets/womanSubparts.json'
import manSubparts from '~/components/Treatment/assets/manSubparts.json'
import outpatient from '~/components/Treatment/assets/outpatient.json'
import MasterContent from '~/assets/locales/en/treatments.json'

// components
import VerticalNavigation from '~/components/Treatment/VerticalNavigation'
import CustomSVG from '~/components/Global/CustomSVG'
import { finalpath, contentExtractor } from '~/helpers'

export default {
  components: {
    ButtonNav: TreatmentDetailButtonNav,
    ExpandedCardInfo,
    VerticalNavigation,
    CustomSVG,
  },
  props: {
    subpart: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 30,
        grabCursor: true,
      },
      hover: false,
      showContact: false,
      icons: {
        closeIcon: CloseIcon,
        burgerMenu: BurgerMenuIcon,
        right: ChevronRight,
        left: ChevronLeft,
      },
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
      showingList: true,
      MasterContent,
      womanSubparts,
      manSubparts,
      outpatient,
    }
  },
  computed: {
    locale: {
      set(val) {
        this.$store.commit('SET_LOCALE', val)
      },
      get() {
        return this.$store.state.locale
      },
    },
    themes() {
      return this.$vuetify.theme.themes
    },
    outpatientFilters() {
      if (this.figurePart === 'face_and_head') {
        return this.outpatient.filter((part) => part.query !== 'anti_stress')
      } else {
        return this.outpatient.filter((part) => part.query === 'fat_away')
      }
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
      const { figure } = this.$route.query
      return figure === 'female'
    },
    isMale() {
      const { figure } = this.$route.query
      return figure === 'male'
    },
    isOutpatient() {
      const { outpatient } = this.$route.query
      return outpatient === '1'
    },
    activeTab() {
      return this.$store.state.activeTab
    },
    darkBackground() {
      return {
        background: this.themes.light.darkBackground,
      }
    },
    lightBackground() {
      return {
        background: this.themes.light.lightBackground,
      }
    },
    background() {
      return {
        background: this.themes.light.background,
      }
    },
    borderColor() {
      return {
        background: this.themes.light.border,
      }
    },
    outpatientDetail: {
      get() {
        return this.$store.state.outpatientDetail
      },
      set(val) {
        this.$store.commit('SET_OUTPATIENTDETAIL', val)
      },
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
        if (!this.outpatientDetail) {
          setTimeout(() => {
            this.$store.commit('SET_ACTIVE_TAB_TREATMENT_DETAIL', {
              activeTab: 'engagement',
            })
            this.$store.commit('SET_ACTIVE_TAB_TREATMENT_DETAIL', {
              activeTab: 'general',
            })
          }, 500)
        } else {
          setTimeout(() => {
            this.$store.commit('SET_ACTIVE_TAB_TREATMENT_DETAIL', {
              activeTab: 'treatment',
            })
            this.$store.commit('SET_ACTIVE_TAB_TREATMENT_DETAIL', {
              activeTab: 'general',
            })
          }, 500)
        }

        if (!val && !this.showContact) {
          setTimeout(() => {
            this.showContact = true
          }, 3000)
        }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.checkActiveSubpart()
    this.checkOutpatient()
  },
  methods: {
    contentIsArray(content) {
      return Array.isArray(content)
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
    closeDetail() {
      const { figure } = this.$route.query

      this.$router.push({ query: { figure } })
    },
    toogleList() {
      this.showingList = !this.showingList
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
    gotoContact() {
      this.$router.push({
        path: finalpath(this.locale, 'contact'),
        hash: '#contact-form',
      })
    },
    contentExtractor(input) {
      return contentExtractor(input)
    },
  },
}
</script>

<style scoped>
.full-height {
  height: 100%;
}
.detail-container {
  /* box-shadow: 0px 2px 10px rgba(185, 185, 185, 0.25); */
  z-index: 2;
  width: 100%;
  height: calc(100vh - 48px);
}
.side-button {
  z-index: 1;
  width: 7%;
  transition: 200ms;
  cursor: pointer;
}
.side-button:hover {
  width: 8%;
  transition: 200ms;
}
.side-button-text {
  transform: rotate(-90deg);
}

.subpart-list {
  flex-grow: 1;
  width: 0%;
  position: relative;
  padding: 60px;
  transition: flex-grow 500ms;
}
.subpart-list.closed {
  flex-grow: 0;
  padding: 0px;
  width: 0% !important;
  transition: flex-grow 500ms;
}

.treat-detail-container {
  flex-grow: 1;
  position: relative;
  width: 0%;
  padding: 60px;
  padding-bottom: 20px;
  transition: flex-grow 500ms;
}
.treat-detail-container.closed {
  flex-grow: 0;
  padding: 0px;
  width: 0% !important;
  transition: flex-grow 500ms;
}

.treat-detail__title {
  font-weight: 600;
  font-size: 36px;
  line-height: 49px;
  margin-bottom: 30px;
}

.treat-detail-nav__container {
  /* overflow-x: scroll; */
  margin-bottom: 20px;
}

.treat-detail__button-container {
  position: absolute;
  top: 40px;
  right: 40px;
  cursor: pointer;
}

.treat-detail__button-container > button {
  cursor: pointer;
}

.treat-detail__button-container > img:not(:first-child) {
  margin-left: 15px;
}

.treat-detail__content {
  font-size: 18px;
  line-height: 26px;
  text-align: justify;
  overflow: scroll;
  flex-grow: 1;
  padding: 0px 16px 16px 0px;
}

.contact-button {
  width: 40%;
}
.section {
  margin-left: -4%;
  width: 108%;
  height: 1px;
}
.pointer {
  cursor: pointer;
}
</style>
