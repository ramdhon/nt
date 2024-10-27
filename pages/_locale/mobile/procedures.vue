<template>
  <Procedures />
</template>

<script>
import Procedures from '~/components/Mobile/Procedures'

export default {
  components: {
    Procedures,
  },
  layout: 'mobile',
  head() {
    return {
      title: 'Procedures',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'This is description from Mobile Procedures Page',
        },
      ],
    }
  },
}
</script>

<style></style>
