<template>
  <Imprint />
</template>

<script>
import Imprint from '~/components/Mobile/Imprint'

export default {
  components: {
    Imprint,
  },
  layout: 'mobile',
  head() {
    return {
      title: 'Imprint',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'This is description from Mobile Imprint Page',
        },
      ],
    }
  },
}
</script>

<style></style>
