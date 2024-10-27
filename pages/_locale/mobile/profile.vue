<template>
  <Profile />
</template>

<script>
import Profile from '~/components/Mobile/Profile'

export default {
  components: {
    Profile,
  },
  layout: 'mobile',
  head() {
    return {
      title: 'Profile',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'This is description from Mobile Profile Page',
        },
      ],
    }
  },
}
</script>

<style></style>
