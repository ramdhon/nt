<template>
  <Infodesk />
</template>

<script>
import Infodesk from '@/components/Infodesk/Infodesk'

export default {
  components: {
    Infodesk,
  },
  head() {
    return {
      title: 'Infodesk',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'This is description from Infodesk Page',
        },
      ],
    }
  },
}
</script>

<style></style>
