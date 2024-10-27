<template>
  <Contact />
</template>

<script>
import Contact from '@/components/Contact/Contact'

export default {
  components: {
    Contact,
  },
  head() {
    return {
      title: 'Contact',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'This is description from Contact Page',
        },
      ],
    }
  },
}
</script>

<style></style>
