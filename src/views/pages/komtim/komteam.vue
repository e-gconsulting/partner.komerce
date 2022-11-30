<template>
  <div class="resend-verification">
    <b-card class="resend-verification text-center w-2/6">
      <img
        class="w-80 my-2"
        src="@/assets/images/logo/kompack-logo.svg"
        alt="kompack"
      >
      <h2 class="text-24-bold mb-1">
        Verifikasi Akun Kompack
      </h2>
      <div class="notes mb-1">Halo {{ fullname }}, Kamu udah daftar layanan Kompack nih.
        Tapi sayang, kamu belum bisa nikmatin layanan kompack karena akun kamu belum diverifikasi.</div>
      <div class="notes-bold mb-2">
        Verifikasi email kamu yuk buat nikmatin layanan-nya.
      </div>
      <b-button
        v-if="isverif === false"
        class="btn-verif"
        @click="sendVerif()"
      >
        Kirim Ulang Verifikasi
      </b-button>
      <b-button
        v-else
        variant="outline-primary"
      >
        tunggu {{ countTimerEmail }}
      </b-button>
    </b-card>
  </div>
</template>
<script>
import {
  BCard, BSpinner, BButton,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BButton,
  },
  data() {
    return {
      countTimerEmail: 60,
      isverif: false,
      fullname: this.$store.state.auth.userData.full_name,
      email: this.$store.state.auth.userData.email,
      userId: this.$store.state.auth.userData.id,
    }
  },
  mounted() {
  },
  methods: {
    sendVerif() {
      this.countDownTimer()
      this.isverif = true
      this.$http_komship.post('/kompack/v1/register/existing', {
        email: this.email,
      })
    },
    countDownTimer() {
      if (this.countTimerEmail > 0) {
        setTimeout(() => {
          this.countTimerEmail -= 1
          this.countDownTimer()
        }, 1000)
      } else {
        this.isverif = false
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.resend-verification {
    text-align: -webkit-center;
}
.card-body {
    text-align: -webkit-center;
}
.notes {
    font-weight: 500;
    font-size: 16px;
    color: #222222;
    &-bold{
        font-weight: 600;
        color: #222222;
    }
}
.btn-verif{
    background-color: #4285F4 !important;
}

</style>
