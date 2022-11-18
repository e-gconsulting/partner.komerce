<template>
  <div>
    Loading ...
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('dashboard', ['profile']),
  },
  async mounted() {
    if (this.profile.partner_is_mass_order) {
      this.$router.push('/method-order')
    } else {
      this.$router.push('/add-order')
    }
  },
}
</script>
