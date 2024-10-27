<template>
  <div>
    <Welcome />
    <!-- <Treatments />
    <TreatmentDetail />
    <Practice />
    <Profile />
    <Infodesk /> -->
  </div>
</template>

<script>
import Welcome from '~/components/Welcome'
// import Treatments from '~/components/Treatments'
// import TreatmentDetail from '~/components/TreatmentDetail/TreatmentDetail'
// import Practice from '~/components/Practice/Practice'
// import Profile from '~/components/Profile/Profile'
// import Infodesk from '~/components/Infodesk/Infodesk.vue'

export default {
  components: {
    Welcome,
    // Treatments,
    // TreatmentDetail,
    // Practice,
    // Profile,
    // Infodesk,
  },
  head() {
    return {
      title: 'Home',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'This is description from Home Page',
        },
      ],
    }
  },
}
</script>

<style></style>
