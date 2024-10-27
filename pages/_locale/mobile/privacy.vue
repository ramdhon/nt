<template>
  <Privacy />
</template>

<script>
import Privacy from '~/components/Mobile/Privacy'

export default {
  components: {
    Privacy,
  },
  layout: 'mobile',
  head() {
    return {
      title: 'Privacy',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'This is description from Mobile Privacy Page',
        },
      ],
    }
  },
}
</script>

<style></style>
