<template>
  <div class="finding-doctor__container">
    <div class="finding-doctor__title">{{ $t('infodesk.title') }}</div>
    <div class="finding-doctor__subtitle">
      {{ $t('infodesk.subtitle') }}
    </div>
    <div class="finding-doctor__list">
      <FindingDoctorItem
        v-for="index in 3"
        :key="`finding-doctor-item-${index}`"
        :title="$t(`infodesk.step.${index}.title`)"
        :subtitle="$t(`infodesk.step.${index}.subtitle`)"
        :index="index"
      />
    </div>
  </div>
</template>

<script>
// component
import FindingDoctorItem from './TipsFindingDoctorsItem'

export default {
  components: {
    FindingDoctorItem,
  },
}
</script>

<style scoped>
.finding-doctor__container {
  color: #6c756b;
  padding: 90px 100px;
}

.finding-doctor__title {
  font-weight: bold;
  font-size: 48px;
  line-height: 65px;
}

.finding-doctor__subtitle {
  font-size: 24px;
  line-height: 33px;

  margin-top: 18px;
}

.finding-doctor__list {
  width: 100%;
}
</style>
