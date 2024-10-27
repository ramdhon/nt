<template>
  <div class="insurance__container">
    <div class="insurance__title">{{ $t('infodesk.insurance.title') }}</div>
    <div class="insurance__subtitle">
      {{ $t('infodesk.insurance.subtitle') }}
    </div>

    <div class="insurance__list">
      <DetailItem
        v-for="index in 4"
        :key="`insurance-item-${index}`"
        :title="$t(`infodesk.insurance.details.${index}.title`)"
        :subtitle="$t(`infodesk.insurance.details.${index}.subtitle`)"
        :index="index"
      />
    </div>
  </div>
</template>

<script>
import DetailItem from './DetailItem'

export default {
  components: {
    DetailItem,
  },
}
</script>

<style scoped>
.insurance__container {
  color: #6c756b;
  padding: 90px 100px;
}
.insurance__title {
  font-weight: bold;
  font-size: 48px;
  line-height: 65px;
}

.insurance__subtitle {
  margin-top: 40px;
  font-size: 18px;
  line-height: 25px;
}

.insurance__list {
  margin-top: 40px;
}
</style>
