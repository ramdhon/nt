<template>
  <div class="finding-doctor-item__container">
    <div class="finding-doctor-item__left">
      <div class="finding-doctor-item__index">0{{ +index }}.</div>
      <div class="finding-doctor-item__title">
        {{ title }}
      </div>
    </div>

    <div class="finding-doctor-item__right">
      <div class="finding-doctor-item__desc">
        {{ subtitle }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'subtitle', 'index'],
}
</script>

<style scoped>
.finding-doctor-item__container {
  display: flex;
  margin: none !important;
  margin-top: 40px;
}

.finding-doctor-item__left {
  color: #cca43b;
  min-width: 320px;
}

.finding-doctor-item__right {
  margin-left: 50px;
  padding: 40px 50px;
  background: #fbfbfb;
  border-radius: 5px;
}

.finding-doctor-item__index {
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 1px solid #cca43b;

  font-size: 24px;
  line-height: 33px;
}

.finding-doctor-item__title {
  margin-top: 20px;
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
}
</style>
