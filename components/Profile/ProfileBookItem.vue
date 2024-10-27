<template>
  <div class="book-item__container">
    <div class="book__title font-weight-medium">{{ title }}</div>
    <div class="book__detail font-weight-light">
      {{ author }}
    </div>
    <div class="book__detail font-weight-light">
      {{ detail }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    author: {
      type: String,
      default: '',
    },
    detail: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped>
.book__title {
  /* font-weight: 800; */
  font-size: 24px;
  line-height: 33px;

  color: #494949;
}

.book__detail {
  /* font-weight: 300; */
  font-size: 18px;
  line-height: 25px;
  text-align: justify;

  color: #494949;
}
</style>
