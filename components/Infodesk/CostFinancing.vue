<template>
  <div class="cost-financing__container">
    <div class="cost-financing__title">
      {{ $t('infodesk.costFinancing.title') }}
    </div>

    <div class="cost-financing__list">
      <CostFinancingItem
        v-for="index in 2"
        :key="`cost-finance-item-${index}`"
        :title="$t(`infodesk.costFinancing.section.${index}.title`)"
        :subtitle="$t(`infodesk.costFinancing.section.${index}.subtitle`)"
      />
    </div>
  </div>
</template>

<script>
// component
import CostFinancingItem from './CostFinancingItem'

export default {
  components: {
    CostFinancingItem,
  },
}
</script>

<style scoped>
.cost-financing__container {
  padding: 90px 100px;
  background: #6c756b;
  color: #fff;
}

.cost-financing__title {
  font-weight: bold;
  font-size: 48px;
  line-height: 65px;
}
</style>
