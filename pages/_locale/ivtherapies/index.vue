<template>
  <IVTherapies />
</template>

<script>
import IVTherapies from '@/components/IVTherapies'

export default {
  components: {
    IVTherapies,
  },
  head() {
    return {
      title: 'IV Therapies',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'This is description from IVTherapies Page',
        },
      ],
    }
  },
}
</script>

<style></style>
