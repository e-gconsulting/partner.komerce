<template>
  <b-card body-class="p-0">
    <div class="flex">
      <div class="w-[64%] border-r p-6">
        <div class="flex items-center h-full">
          <b-button
            variant="primary"
            size="sm"
            class="mr-1 rounded-lg p-0"
            @click="$router.go(-1)"
          >
            <feather-icon
              size="2x"
              icon="ChevronLeftIcon"
            />
          </b-button>
          <h4 class="font-bold text-black d-inline-flex mb-0">
            Notifikasi WhatsApp Premium
          </h4>
        </div>
      </div>
      <div class="w-[36%]">
        <div class="bg-[#FFF2E2] flex gap-4 h-full items-center p-[12px] rounded-r-md">
          <img
            class="w-8"
            src="https://storage.googleapis.com/komerce/assets/icons/danger-yellow.svg"
            alt="warning"
          >
          <div class="text-black">
            Panduan menghubungkan WhatsApp untuk notifikasi Komship
          </div>
        </div>
      </div>
    </div>
    <div class="flex">
      <div class="w-[64%] border-r p-6 flex flex-col items-center text-black space-y-8">
        <img
          class="max-w-[250px]"
          src="https://storage.googleapis.com/komerce/assets/illustration/banner-login-wa.svg"
          alt="wa-illustration"
        >
        <div class="text-center text-[20px] font-bold">
          Terima kasih sudah mengaktifkan fitur
          Notifikasi WhatsApp Premium
        </div>
        <div class="text-center">
          Fitur notifikasi WhatsApp otomatis aktif dengan template notif dari komship. Yuk hubungkan WhatsApp kamu untuk melanjutkan penyeesuaian dan buat template notifikasimu sendiri untuk menunjukkan identitas bisnismu
        </div>
      </div>
      <div class="w-[36%] p-6 flex flex-col items-center text-black space-y-8">
        <div>Scan QR di bawah ini menggunakan aplikasi WhatsApp kamu</div>
        <div class="">
          <b-overlay
            variant="light"
            :show="loadingQr"
            spinner-variant="primary"
            blur="0"
            opacity=".5"
            rounded="sm"
            class="w-[200px] h-[200px]"
          >
            <img
              class="max-w-[200px]"
              :src="qrCode"
            >
          </b-overlay>
        </div>
        <ol>
          <li class="flex space-x-6">
            <div>1.</div>
            <div>Buka WhatsApp pada telepon Anda</div>
          </li>
          <li class="flex space-x-5">
            <div>2.</div>
            <div>Klik Menu atau Setelan dan pilih Perangkat Tertaut/Linked Deviice/WhatsApp Web</div>
          </li>
          <li class="flex space-x-5">
            <div>3.</div>
            <div>Klik Tautkan Perangkat</div>
          </li>
          <li class="flex space-x-5">
            <div>4.</div>
            <div>Arahkan telepon kamu ke layar ini untuk memindai kode tersebut</div>
          </li>
        </ol>
      </div>
    </div>
  </b-card>
</template>

<script>
export default {
  name: 'Koneksi',
  data() {
    return {
      loadingQr: false,
      qrCode: '',
      connected: false,
    }
  },
  mounted() {
    // call getQRCode() immediately when the component is mounted
    this.getQRCode()

    // execute getQRCode() every 13 seconds using setInterval()
    this.interval = setInterval(() => {
      this.getQRCode()
    }, 13000)
  },
  beforeDestroy() {
    // clear the interval when the component is destroyed
    clearInterval(this.interval)
  },
  methods: {
    getQRCode() {
      this.loadingQr = true
      if (this.connected === false) {
        this.$http_komship.get('/v1/setting/notification-whatsapp/get-qrcode')
          .then(res => {
            this.loadingQr = false
            const { data, code } = res.data
            if (code === 201) {
              this.connected = true
            }
            this.qrCode = data
          }).catch(() => {
            console.log('error')
          })
      }
      // di sini mas mbeng
      this.$router.push('/opsional-feature/')
    },
  },
}
</script>
