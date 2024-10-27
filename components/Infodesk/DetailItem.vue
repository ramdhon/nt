<template>
  <div :class="{ 'detail-item__container': true, dark: dark }">
    <div class="detail-item__title" @click="onShowDetail()">
      {{ title }}
    </div>
    <transition name="slide-fade">
      <div v-if="isShow" class="detail-item__subtitle">
        {{ subtitle }}
      </div>
    </transition>
    <div class="detail-item__index">0{{ index }}</div>
  </div>
</template>

<script>
export default {
  props: ['dark', 'title', 'subtitle', 'index'],
  data() {
    return {
      isShow: false,
    }
  },
  methods: {
    onShowDetail() {
      this.isShow = !this.isShow
    },
    enter() {},
    leave(el, done) {},
  },
}
</script>

<style>
.detail-item__container {
  padding: 9px 0px;
  border-bottom: 1px solid #6c756b;
}

.dark {
  border-bottom: 1px solid #fff;
}

.detail-item__title {
  font-weight: 600;
  font-size: 24px;
  line-height: 33px;
  cursor: pointer;
}

.detail-item__subtitle {
  margin-top: 9px;
  font-size: 18px;
  line-height: 25px;
  text-align: justify;
}

.detail-item__index {
  display: flex;
  justify-content: flex-end;

  font-weight: 300;
  font-size: 12px;
  line-height: 16px;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}
</style>
