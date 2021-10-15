<template>
  <b-card-actions
    title="Dashboard"
    no-actions
    no-body
  />
</template>

<script>
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'
import useJwt from '@/auth/jwt/useJwt'
import httpKomship from '@/libs/http_komship'

export default {
  components: { BCardActions },
  mounted() {
    httpKomship.post('v1/my-profile', {},
      {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(response => {
      const { data } = response
      console.log(data)
    })
  },

}
</script>

<style>

</style>
