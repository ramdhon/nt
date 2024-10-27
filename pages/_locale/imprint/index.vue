<template>
  <Imprint />
</template>

<script>
import Imprint from '@/components/Imprint'

export default {
  components: {
    Imprint,
  },
  head() {
    return {
      title: 'Imprint',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'This is description from Imprint Page',
        },
      ],
    }
  },
}
</script>

<style></style>
