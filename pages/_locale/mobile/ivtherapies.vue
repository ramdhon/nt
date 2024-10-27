<template>
  <IVTherapies />
</template>

<script>
import IVTherapies from '~/components/Mobile/IVTherapies'

export default {
  components: {
    IVTherapies,
  },
  layout: 'mobile',
  head() {
    return {
      title: 'IV Therapies',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'This is description from Mobile IV Therapies Page',
        },
      ],
    }
  },
}
</script>

<style scoped>
.full {
  width: 100vw;
  height: 100vh;
}
</style>
