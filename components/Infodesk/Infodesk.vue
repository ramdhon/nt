<template>
  <div class="info-desk__wrapper">
    <TipsFindingDoctor />
    <CostFinancing />
    <FollowupInsurance />
    <FAQ />
  </div>
</template>

<script>
import CostFinancing from './CostFinancing'
import TipsFindingDoctor from './TipsFindingDoctor'
import FollowupInsurance from './FollowupInsurance'
import FAQ from './FAQ'

export default {
  components: {
    CostFinancing,
    TipsFindingDoctor,
    FollowupInsurance,
    FAQ,
  },
}
</script>

<style scoped></style>
