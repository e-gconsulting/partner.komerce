<template>
  <div>
    Loading ...
  </div>
</template>
<script>
export default {
  async mounted() {
    await this.$http_komship.post('/v1/my-profile').then(res => {
      const { data } = res.data
      if (data.partner_is_mass_order) {
        this.$router.push('/method-order')
      } else {
        this.$router.push('/add-order')
      }
    })
  },
}
</script>
