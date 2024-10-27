<template>
  <Practice />
</template>

<script>
import Practice from '@/components/Practice/Practice'

export default {
  components: {
    Practice,
  },
  head() {
    return {
      title: 'Practice',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'This is description from Practice Page',
        },
      ],
    }
  },
}
</script>

<style></style>
