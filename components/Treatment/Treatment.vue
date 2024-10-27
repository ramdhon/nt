<template>
  <div v-if="!ready" class="__blank" />
  <div v-else class="treatment__container">
    <div class="treatment__main-nav">
      <MainNavigation v-if="isFemale" :parts="womanParts" />
      <MainNavigation v-if="isMale" :parts="manParts" />
    </div>
    <div
      class="treatment__back-button__pos treatment__back-button__border"
      :style="backButtonStyle"
    ></div>
    <div
      class="treatment__back-button__pos treatment__back-button"
      @click="goBack"
    >
      <div class="px-8 py-4">
        <CustomSVG
          size="3rem"
          :src="require('~/assets/icons/arrow-left.svg')"
        />
      </div>
    </div>
    <div class="treatment__legal d-flex align-center">
      <SocialMedia :small="true" />
      <div class="mx-1" />
      <Legal />
    </div>
    <div
      v-if="!visibleTreatmentDetail"
      class="treatment__info d-flex flex-column align-start"
    >
      <span class="text-h3 font-weight-bold">{{
        $t('treatments.virtual')
      }}</span>
      <v-btn
        class="text-body-2 text-none ml-n3"
        text
        small
        :color="themes.light.primary3"
        :ripple="false"
        @click="changeGender"
      >
        {{ $t('treatments.changeGender') }}
      </v-btn>
      <span class="mt-8 text-h6 font-weight-light">{{
        $t('treatments.virtualDesc')
      }}</span>
    </div>

    <div class="treatment__main">
      <div class="treatment__image">
        <div
          v-if="isFemale"
          id="female"
          ref="female"
          class="figure__woman"
          :class="detailClass"
          @click="showCursorPos"
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
          @click="showCursorPos"
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
              />
            </div>
          </v-img>
        </div>
      </div>
      <div v-if="visibleTreatmentDetail" class="right__detail">
        <TreatmentDetail
          v-if="isFemale"
          :subpart="womanSubparts[figurePart][figureSubpart]"
        />
        <TreatmentDetail
          v-if="isMale"
          :subpart="manSubparts[figurePart][figureSubpart]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TreatmentDetail from '../TreatmentDetail/TreatmentDetail'
import MainNavigation from './MainNavigation'
import Dot from './Dot'
import womanParts from './assets/womanParts.json'
import manParts from './assets/manParts.json'
import womanSubparts from './assets/womanSubparts.json'
import manSubparts from './assets/manSubparts.json'
import outpatient from './assets/outpatient.json'
import CustomSVG from '~/components/Global/CustomSVG'
import SocialMedia from '~/components/Global/SocialMedia'
import Legal from '~/components/Global/Legal'
import { finalpath } from '~/helpers'

export default {
  components: {
    TreatmentDetail,
    MainNavigation,
    Dot,
    CustomSVG,
    SocialMedia,
    Legal,
  },
  data() {
    return {
      figure: '',
      ready: false,
      womanParts,
      manParts,
      womanSubparts,
      manSubparts,
      outpatient,
    }
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
    visibleTreatmentDetail: {
      get() {
        return this.$store.state.visibleTreatmentDetail
      },
      set(val) {
        this.$store.commit('SET_VISIBLE_TREATMENT_DETAIL', val)
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
    locale() {
      return this.$store.state.locale
    },
    isFemale() {
      return this.figure === 'female'
    },
    isMale() {
      return this.figure === 'male'
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
    backButtonStyle() {
      return {
        borderColor: this.themes.light.darkBackground,
      }
    },
  },
  watch: {
    '$route.query.part': {
      handler(val) {
        if (val) {
          this.visibleTreatmentDetail = true
          this.figurePart = val

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
  methods: {
    prechecking() {
      const { figure } = this.$route.query
      if (!figure || (figure !== 'male' && figure !== 'female')) {
        this.gotoProcedure()

        return
      }

      this.figure = figure
      this.ready = true
    },
    gotoProcedure() {
      this.$router.push({
        path: finalpath(this.locale, '/'),
        query: { id: 'procedures' },
      })
    },
    changeGender() {
      let figure
      const destination = {
        path: finalpath(this.locale, 'treatment'),
      }
      if (this.isMale) {
        figure = 'female'
        destination.query = { figure }
      }
      if (this.isFemale) {
        figure = 'male'
        destination.query = { figure }
      }
      this.$router.push(destination)
      this.figure = figure
    },
    closeDetail() {
      const { figure } = this.$route.query
      this.$router.push({ query: { figure } })
    },
    goBack() {
      if (this.visibleTreatmentDetail) {
        this.closeDetail()
      } else {
        this.gotoProcedure()
      }
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
    // debug method using debug query equals 1
    showCursorPos(e) {
      const isDebug = this.$route.query.debug === '1'

      if (!isDebug) {
        return
      }

      if (this.isFemale) {
        const x = this.visibleTreatmentDetail
          ? e.pageX - this.$refs.female.offsetLeft
          : e.pageX -
            this.$refs.female.offsetLeft +
            this.$refs.female.clientWidth / 2
        const y = e.pageY - this.$refs.female.offsetTop - 48
        const finalX = x / this.$refs.female.clientWidth
        const finalY = y / this.$refs.female.clientHeight

        console.log({ finalX, finalY })
        alert(`x: ${Math.round(finalX * 100)}% y: ${Math.round(finalY * 100)}%`)
      }
      if (this.isMale) {
        const x = this.visibleTreatmentDetail
          ? e.pageX - this.$refs.male.offsetLeft
          : e.pageX -
            this.$refs.male.offsetLeft +
            this.$refs.male.clientWidth / 2
        const y = e.pageY - this.$refs.male.offsetTop - 48
        const finalX = x / this.$refs.male.clientWidth
        const finalY = y / this.$refs.male.clientHeight

        console.log({ finalX, finalY })
        alert(`x: ${Math.round(finalX * 100)}% y: ${Math.round(finalY * 100)}%`)
      }
    },
  },
}
</script>

<style scoped>
.__blank {
  width: 100%;
  height: calc(100vh - 60px);
}

.treatment__container {
  width: 100%;
  height: calc(100vh - 60px);
  position: relative;
  overflow: hidden;
}

.treatment__main {
  width: 100%;
  display: flex;
}

.treatment__back-button__pos {
  position: absolute;
  top: 0px;
  left: 0px;
}
.treatment__back-button__border {
  border-width: 1px;
  border-style: solid;
  width: 112px;
  height: 80px;
}
.treatment__back-button {
  cursor: pointer;
  z-index: 1;
  transition: left 200ms;
}
.treatment__back-button:hover {
  left: -10px;
  transition: left 200ms;
}

.treatment__image {
  width: 50%;
}

.right__detail {
  width: 50%;
}

.treatment__info {
  position: absolute;
  top: 15vh;
  left: 5vw;
  width: 30vw;
}

.treatment__legal {
  position: absolute;
  bottom: 24px;
  right: 36px;
}

.treatment__main-nav {
  position: absolute;
  right: 80px;
  top: 50vh;
  transform: translate(0, -50%);
}

.figure__woman {
  position: absolute;
  bottom: 0px;
  transform: translate(-50%, 0);
  left: 50%;
  width: 50vh;
  height: 90vh;
  transition: 1000ms;
}

.figure__woman.zoom__in {
  position: absolute;
  transform: translate(0, 0);
  width: 150vh;
  height: 270vh;
  transition: 1000ms;
}
.figure__woman.zoom__in.face__head {
  left: -30vh;
  top: -30vh;
}
.figure__woman.zoom__in.chest__area {
  left: -30vh;
  top: -50vh;
}
.figure__woman.zoom__in.body {
  left: -30vh;
  top: -70vh;
}
.figure__woman.zoom__in.arms {
  left: -40vh;
  top: -70vh;
}
.figure__woman.zoom__in.leg {
  left: -30vh;
  top: -100vh;
}

.figure__man {
  position: absolute;
  bottom: 10vh;
  transform: translate(-50%, 0);
  left: 50%;
  width: 50vh;
  height: 90vh;
  transition: 1000ms;
}

.figure__man.zoom__in {
  position: absolute;
  transform: translate(0, 0);
  width: 150vh;
  height: 270vh;
  transition: 1000ms;
}
.figure__man.zoom__in.face__head {
  left: -45vh;
  top: -40vh;
}
.figure__man.zoom__in.chest__area {
  left: -55vh;
  top: -55vh;
}
.figure__man.zoom__in.body {
  left: -65vh;
  top: -70vh;
}
.figure__man.zoom__in.arms {
  left: -40vh;
  top: -40vh;
}
.figure__man.zoom__in.leg {
  left: -70vh;
  top: -120vh;
}
</style>
