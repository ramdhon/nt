<template>
  <div class="finance-item__container">
    <div class="finance-item__title">
      {{ title }}
    </div>

    <div class="finance-item__subtitle">
      {{ subtitle }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'subtitle'],
}
</script>

<style scoped>
.finance-item__container {
  margin-top: 60px;
}

.finance-item__title {
  font-size: 36px;
  line-height: 49px;
}

.finance-item__subtitle {
  margin-top: 15px;
}
</style>
