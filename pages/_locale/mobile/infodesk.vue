<template>
  <Infodesk />
</template>

<script>
import Infodesk from '~/components/Mobile/Infodesk'

export default {
  components: {
    Infodesk,
  },
  layout: 'mobile',
  head() {
    return {
      title: 'Infodesk',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'This is description from Mobile Infodesk Page',
        },
      ],
    }
  },
}
</script>

<style></style>
