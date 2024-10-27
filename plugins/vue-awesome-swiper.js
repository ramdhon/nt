// import Vue from 'vue'
// import VueAwesomeSwiper from 'vue-awesome-swiper'

// // import style (>= Swiper 6.x)
// // import 'swiper/swiper-bundle.css'

// // import style (<= Swiper 5.x)
// // import 'swiper/css/swiper.css'

// Vue.use(VueAwesomeSwiper /* { default options with global component } */)

import Vue from 'vue'
import {
  Swiper as SwiperClass,
  Pagination,
  Navigation,
  Mousewheel,
  Autoplay,
} from 'swiper/swiper.esm'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'

// import style
import 'swiper/swiper-bundle.min.css'

SwiperClass.use([Pagination, Mousewheel, Navigation, Autoplay])
Vue.use(getAwesomeSwiper(SwiperClass))
