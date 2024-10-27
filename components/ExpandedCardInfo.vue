<template>
  <div class="card__wrapper">
    <div class="header__index">{{ `${renderIndex}` }}</div>
    <div class="card__container">
      <div class="card__header" @click="toggle">
        <div class="header__title">{{ title }}</div>
        <div class="header__button-action">
          <transition name="fade">
            <img :src="isOpen ? MinusIcon : PlusIcon" alt="Expanse" />
          </transition>
        </div>
      </div>

      <transition name="fade">
        <div v-if="isOpen" class="card__content">
          <slot />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import PlusIcon from '~/assets/icons/add-icon.svg'
import MinusIcon from '~/assets/icons/minus-icon.svg'

export default {
  props: {
    index: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isOpen: false,
      PlusIcon,
      MinusIcon,
    }
  },
  computed: {
    renderIndex() {
      const num = Number(this.index + 1)
      if (num < 10) {
        return `0${num}.`
      }

      return `${num}.`
    },
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen
    },
  },
}
</script>

<style>
.card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 18px;
  line-height: 25px;
  font-weight: 600;
  cursor: pointer;
}

.card__wrapper {
  display: flex;
  width: 100%;
  border-bottom: 0.5px solid #6c756b;
  padding: 15px 0px;
}

.card__container {
  width: calc(100% - 40px);
}

.card__wrapper:first-child {
  border-top: 0.5px solid #6c756b;
}

.header__index {
  font-weight: 600;
  width: 40px;
}

.header__title {
  width: calc(100% - 30px);
}

.header__button-action {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card__content {
  font-size: 14px;
  line-height: 19px;
  margin-top: 20px;
}

.fade-enter-active {
  transition: opacity 0.8s;
}

.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
