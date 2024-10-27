<template>
  <Contact />
</template>

<script>
import Contact from '~/components/Mobile/Contact'

export default {
  components: {
    Contact,
  },
  layout: 'mobile',
  head() {
    return {
      title: 'Contact',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'This is description from Mobile Contact Page',
        },
      ],
    }
  },
}
</script>

<style></style>
