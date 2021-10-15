<template>
  <b-card-actions title="Dashboard" no-actions no-body />
</template>

<script>
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'

export default {
  components: { BCardActions },
  mounted() {
    this.$http_komship.post('v1/my-profile').then(response => {
      const { data } = response
      console.log(data)
    })
  },
}
</script>

<style>
</style>
