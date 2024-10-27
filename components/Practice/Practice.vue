<template>
  <div :id="id" class="wrapper" @wheel="handleScroll">
    <!-- <NavigationHeader /> -->
    <div class="practice__container">
      <div class="practice__header">
        <div class="header__title">{{ $t('practice.title') }}</div>
        <div class="header__subtitle">
          {{ $t('practice.subtitle') }}
        </div>
      </div>

      <div class="practice__body">
        <div class="body__left-column">
          <div
            v-for="index in indexList"
            :key="`${index}-practice-content`"
            class="item"
          >
            <Item
              :image-path="`praxis${index}.jpg`"
              :index="`0${index}`"
              :title="$t(`practice.content.title${index}`)"
              :subtitle="$t(`practice.content.subtitle${index}`)"
              :speed="Number(2)"
            />
          </div>
        </div>
        <div class="body__right-column">
          <div
            v-for="index in indexList"
            :key="`${index + 1}-practice-content`"
            class="item"
          >
            <Item
              :image-path="`praxis${index + 1}.jpg`"
              :index="`0${index + 1}`"
              :title="$t(`practice.content.title${index + 1}`)"
              :subtitle="$t(`practice.content.subtitle${index + 1}`)"
              :speed="Number(-2)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PracticeItem from './PracticeItem'
// import NavigationHeader from '~/components/Global/NavigationHeader'

export default {
  components: {
    Item: PracticeItem,
    // NavigationHeader,
  },
  data() {
    return {
      id: 'practices',

      atStart: true,
      atEnd: false,
      timeoutID: null,
      scrollYPosition: 0,
      indexList: [1, 3, 5],
    }
  },
  computed: {
    fromID() {
      return this.$store.state.fromID
    },
    currentID() {
      return this.$store.state.currentID
    },
    endPosition() {
      const sectionContainer = document.getElementById('practices')

      return sectionContainer.clientHeight - window.innerHeight + 72 + 221
    },
    atTop() {
      return this.scrollYPosition <= 0
    },
    atBottom() {
      return this.scrollYPosition >= this.endPosition
    },
    maxDelta() {
      return this.$store.state.maxScrollDeltaSpeedBetweenSection
    },
    sectionID() {
      return this.$store.state.sectionID
    },
  },
  watch: {
    currentID(val) {
      const fromIndex = this.sectionID.indexOf(this.fromID)
      const currentIndex = this.sectionID.indexOf(val)
      const sectionContainer = document.getElementById('practices')

      if (this.fromID !== `#${this.id}`) {
        if (fromIndex < currentIndex) {
          this.scrollYPosition = 0
          sectionContainer.scrollTo(0, this.scrollYPosition)
        }
        if (fromIndex > currentIndex) {
          this.scrollYPosition = this.endPosition
          sectionContainer.scrollTo(0, this.scrollYPosition)
        }
      }
    },
  },
  methods: {
    handleScroll(e) {
      e.preventDefault()
      e.stopPropagation()

      // this.checkEdgeSection(e.deltaX, e.deltaY)

      this.scrollSection(e.deltaX, e.deltaY)

      // this.jumpSection(e.deltaX, e.deltaY)
    },
    checkEdgeSection() {
      if (this.atTop) {
        if (this.timeoutID === null) {
          this.timeoutID = setTimeout(() => {
            this.atStart = true
          }, 1000)
        }
      } else if (this.atBottom) {
        if (this.timeoutID === null) {
          this.timeoutID = setTimeout(() => {
            this.atEnd = true
          }, 1000)
        }
      } else {
        if (this.timeoutID !== null) {
          clearTimeout(this.timeoutID)
          this.timeoutID = null
        }

        this.atStart = false
        this.atEnd = false
      }
    },
    jumpSection(deltaX, deltaY) {
      const prevSection = this.sectionID.find(
        (id, index) => this.sectionID[index + 1] === '#' + this.id
      )
      const nextSection = this.sectionID.find(
        (id, index) => this.sectionID[index - 1] === '#' + this.id
      )

      // executing next / prev section
      if (this.atStart || this.atEnd) {
        const options = {
          duration: 1000,
          offset: 0,
          easing: 'easeInOutQuint',
        }
        let target

        if (deltaY < -this.maxDelta && this.atStart && prevSection) {
          target = prevSection

          this.$vuetify.goTo(target, options)
        }
        if (deltaY > this.maxDelta && this.atEnd && nextSection) {
          target = nextSection

          this.$vuetify.goTo(target, options)
        }

        if (target) {
          this.$store.commit('SET_FROM_ID', `#${this.id}`)
          this.$store.commit('SET_CURRENT_ID', target)
        }
      }
    },

    scrollSection(deltaX, deltaY) {
      const scrollOffset = deltaY / 5
      this.scrollYPosition += scrollOffset

      // offset handler
      if (this.atTop) {
        this.scrollYPosition = 0
      }

      if (this.atBottom) {
        this.scrollYPosition = this.endPosition
      }

      window.scrollTo(0, this.scrollYPosition)
    },
  },
}
</script>

<style scoped>
.practices-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.wrapper {
  padding-top: 50px;
}

.practice__container {
  width: 65%;
  margin: 0 auto;
  min-width: 850px;
  padding-top: 180px;
}

.header__title {
  font-weight: 800;
  font-size: 96px;
  line-height: 131px;
  color: #6c756b;
}

.header__subtitle {
  margin-top: 20px;
  font-size: 24px;
  line-height: 33px;
  color: #494949;
}

.practice__body {
  margin-top: 120px;
  display: grid;
  grid-template-columns: calc(50% - 50px) calc(50% - 50px);
  column-gap: 100px;
  padding-bottom: 400px;
}

.body__left-column > .item:not(:first-child) {
  margin-top: 250px;
}

.body__right-column > .item:not(:first-child) {
  margin-top: 250px;
}
</style>
