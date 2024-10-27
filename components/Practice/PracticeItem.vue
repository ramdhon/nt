<template>
  <div v-rellax="{ speed }" class="practice-item__container">
    <div class="practice-item__image">
      <img :src="require(`~/assets/images/interiors/${imagePath}`)" />
    </div>
    <div class="practice-item__body">
      <div class="item__index">{{ index }}</div>
      <div class="item__title">{{ title }}</div>
      <div class="item__subtitle">
        {{ subtitle }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imagePath: {
      type: String,
      default: '',
    },
    index: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    speed: {
      type: Number,
      default: 1,
    },
  },
}
</script>

<style scoped>
.practice-item__container {
}

.practice-item__image {
  position: relative;
  overflow: hidden;
  height: 550px;
}

.practice-item__body {
  margin-top: 10px;
}

.item__index {
  font-weight: 300;
  font-size: 18px;
  line-height: 25px;
  padding: 20px 10px 20px 5px;
  border-bottom: 0.5px solid #494949;

  color: #494949;
}

.item__title {
  font-weight: 300;
  font-size: 48px;
  line-height: 66px;

  color: #494949;
  margin-top: 20px;
}

.item__subtitle {
  font-weight: 300;
  font-size: 24px;
  line-height: 33px;

  color: #252525;
}
</style>
