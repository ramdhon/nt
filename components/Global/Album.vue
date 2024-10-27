<template>
  <swiper class="swiper" :options="swiperOption">
    <swiper-slide v-for="(item, i) in list" :key="i" :class="{ mobile }">
      <!-- SLIDE -->
      <ImageBlock :mobile="mobile" :src="item" height="55vh" />
    </swiper-slide>
    <div v-if="!mobile" slot="button-prev" class="swiper-button-prev"></div>
    <div v-if="!mobile" slot="button-next" class="swiper-button-next"></div>
    <div v-if="mobile" slot="pagination" class="swiper-pagination"></div>
  </swiper>
</template>

<script>
import ImageBlock from '~/components/Global/ImageBlock'
export default {
  components: {
    ImageBlock,
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      },
    },
    mobile: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: !this.mobile ? 36 : 0,
        loop: true,
        loopFillGroupWithBlank: true,
        grabCursor: true,
        autoplay: {
          delay: 20000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true,
        },
      },
    }
  },
}
</script>

<style scoped>
.swiper-slide {
  width: auto;
  height: auto;
  /* background: #ccc; */
}
.swiper-slide.mobile {
  width: 100vw !important;
  height: 100vw !important;
  /* background: #ccc; */
}
.swiper-button-prev {
  color: black;
}
.swiper-button-next {
  color: black;
}
.swiper-pagination >>> .swiper-pagination-bullet-active {
  background-color: #d2af69;
}
</style>
