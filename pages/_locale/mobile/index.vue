<template>
  <Home />
</template>

<script>
import Home from '~/components/Mobile/Home/Alt'

export default {
  components: {
    Home,
  },
  layout: 'mobile',
  head() {
    return {
      title: 'Home',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'This is description from Mobile Home Page',
        },
      ],
    }
  },
}
</script>

<style></style>
