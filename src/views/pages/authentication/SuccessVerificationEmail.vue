<template>
  <b-row
    class="h-screen justify-content-center align-items-center text-black"
    style="background: white !important"
  >
    <b-col cols="4 text-center">
      <h4 class="mb-2 text-black">
        <strong>
          Terimakasih
        </strong>
      </h4>
      <div class="mb-2">
        <span>
          Kami telah mengkonfirmasi {{ email }} sebagai alamat email untuk Akun Komerce kamu
        </span>
      </div>
      <b-button
        variant="primary"
        @click="backLogin"
      >
        Masuk
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
import {
  BButton,
  BRow,
  BCol,
} from 'bootstrap-vue'

export default {
  components: {
    BButton,
    BRow,
    BCol,
  },
  data() {
    return {
      email: '',
    }
  },
  mounted() {
    this.email = this.$router.history.current.query.email
  },
  methods: {
    backLogin() {
      window.location.replace('/login')
    },
  },
}
</script>

<style>

</style>
