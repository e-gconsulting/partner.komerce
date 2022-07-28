<template>
  <b-row
    class="h-screen justify-content-center align-items-center text-black"
    style="background: white !important"
  >
    <b-col cols="4 text-center">
      <h4 class="mb-2 text-black">
        <strong>
          Perubahan Email Dibatalkan
        </strong>
      </h4>
      <div class="mb-2">
        <span>
          Kamu telah membatalkan perubahan email. Ganti password untuk mengamankan akun
        </span>
      </div>
      <b-button
        class="mr-50"
        variant="outline-primary"
        tag="router-link"
        to="/dashboard-komship"
      >
        Lain Kali
      </b-button>
      <b-button
        variant="primary"
        @click="handleForgotPassword"
      >
        Ganti Password
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
  methods: {
    handleForgotPassword() {
      localStorage.clear()
      window.location.replace('/forgot-password')
    },
  },
}
</script>

<style>

</style>
