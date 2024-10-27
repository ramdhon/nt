<template>
  <Privacy />
</template>

<script>
import Privacy from '@/components/Privacy'

export default {
  components: {
    Privacy,
  },
  head() {
    return {
      title: 'Privacy',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'This is description from Privacy Page',
        },
      ],
    }
  },
}
</script>

<style></style>
