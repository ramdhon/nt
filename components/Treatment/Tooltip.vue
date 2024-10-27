<template>
  <div class="tooltip" :class="{ mobilewidth: isMobile }">
    <!-- <div class="tooltip__content">{{ name }}</div> -->
    <div class="tooltip__detail" @click="openDetail(query)">
      <span class="font-weight-bold">{{ name }}</span>
      <span v-if="!isMobile" class="treatment__detail">{{
        $t('treatments.detail')
      }}</span>
    </div>
    <div class="tooltip__arrow"></div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
    },
    query: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      userAgent: '',
    }
  },
  computed: {
    isMobile() {
      return this.userAgent.includes('mobile')
    },
  },
  mounted() {
    this.userAgent = navigator.userAgent.toLowerCase()
  },
  methods: {
    openDetail(query) {
      if (this.isMobile) {
        return
      }
      const { figure } = this.$route.query
      this.$emit('close-tooltip')
      this.$router.push({ query: { figure, part: query } })
    },
  },
}
</script>

<style scoped>
.mobilewidth {
  width: auto !important;
}
.tooltip {
  width: 300px;
  position: absolute;
  top: 0%;
  left: 0%;
  transform: translate(-20%, -120%);
  background: white;
  -webkit-box-shadow: 0px 0px 20px -5px rgba(196, 196, 196, 1);
  -moz-box-shadow: 0px 0px 20px -5px rgba(196, 196, 196, 1);
  box-shadow: 0px 0px 20px -5px rgba(196, 196, 196, 1);
  border-radius: 6px;
  transition: 5s ease;
  background: #fff;
}

/* .tooltip__content {
  padding: 15px 20px;
  background: #f4f4f4;
  border-radius: 6px 6px 0px 0px;
} */

.tooltip__detail {
  background: #f4f4f4;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-radius: 6px;
}

.treatment__detail {
  cursor: pointer;
  color: #d2af69;
}

.tooltip__arrow {
  width: 50px;
  height: 25px;
  position: absolute;
  top: 100%;
  left: 20%;
  transform: translateX(-20%);
  overflow: hidden;
}

.tooltip__arrow::after {
  content: '';
  background: #f4f4f4;
  position: absolute;
  width: 20px;
  height: 20px;
  transform: translateX(-10%) translateY(-50%) rotate(45deg);
  top: 0;
  left: 10%;
  -webkit-box-shadow: 0px 0px 20px -5px rgba(196, 196, 196, 1);
  -moz-box-shadow: 0px 0px 20px -5px rgba(196, 196, 196, 1);
  box-shadow: 0px 0px 20px -5px rgba(196, 196, 196, 1);
}
</style>
