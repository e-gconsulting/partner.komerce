<template>
  <b-modal
    id="ModalOnBoarding"
    ref="ModalOnBoarding"
    no-close-on-esc
    no-close-on-backdrop
    hide-header-close
    hide-footer
    hide-header
    size="lg"
    centered
  >
    <div
      v-if="stepOnboarding === 0"
    >
      <b-row class="text-center justify-content-center mt-1 mb-2">
        <h1
          style="font-size: 32px;"
          class="text-black mb-2"
        >
          <strong>
            Halo, Partner!
            <br>
            Selamat datang di Komship!
          </strong>
        </h1>
        <span class="text-black">
          Untuk membantumu lebih mengenal Komship dan segera merasakan <br> kemudahannya, yuk baca artikel singkat ini untuk mengenal fitur pokok Komship
        </span>
      </b-row>
      <b-row class="justify-content-center">
        <b-img src="@/assets/images/NewOnboarding/vector-dashboard.svg" />
      </b-row>
      <b-row class="justify-content-end mt-1 mb-2">
        <b-button
          variant="primary"
          class="d-flex align-items-center justify-content-center btn-icon mr-5"
          @click="handleNextStepOnboarding"
        >
          Mulai Membaca <b-img
            src="@/assets/images/NewOnboarding/arrow-right.svg"
            class="ml-50"
          />
        </b-button>
      </b-row>
    </div>
    <div v-if="stepOnboarding >= 1">
      <b-overlay
        variant="light"
        :show="loadContentOnboarding"
        spinner-variant="primary"
        blur="0"
        opacity=".5"
        rounded="sm">
        <b-row
          class="mb-5"
        >
          <div class="header">

            <!--Content before waves-->
            <div class="inner-header flex">
              <b-row
                v-for="(item, index) in stepItem"
                :key="index+1"
                class="justify-content-center align-items-center"
              >
                <div style="position: relative;">
                  <span
                    v-if="stepOnboarding === item.value"
                    class="text-white"
                    style="position: absolute;
                  top: 50%;
                  left: 50%;
                  z-index: 9;
                  transform: translate(-50%, -50%);"
                  >{{ item.value }}</span>
                  <b-img
                    v-if="stepOnboarding > item.value"
                    src="@/assets/images/NewOnboarding/tick-circle.svg"
                    style="position: absolute;
                  top: 50%;
                  left: 50%;
                  z-index: 9;
                  transform: translate(-50%, -50%);"
                  />
                  <div>
                    <b-img
                      v-if="stepOnboarding >= item.value"
                      src="@/assets/images/NewOnboarding/wrapper__stepper.svg"
                    />
                    <b-img
                      v-if="stepOnboarding < item.value"
                      src="@/assets/images/NewOnboarding/wrapper__stepper__inactive.svg"
                    />
                  </div>
                </div>
                <span
                  v-if="index !== stepItem.length - 1"
                  :style="stepOnboarding <= item.value ? 'width: 130px; height: 2px; background: #E2E2E2;' : 'width: 130px; height: 2px; background: #F95031;'"
                />
              </b-row>
            </div>
            <b-img
              v-if="stepOnboarding + 1 === 2"
              src="@/assets/images/svg/imgstep2.svg"
              class="wrapper__image__stepper"
            />
            <b-img
              v-if="stepOnboarding + 1 === 3"
              src="@/assets/images/svg/imgstep3.svg"
              class="wrapper__image__stepper"
            />
            <b-img
              v-if="stepOnboarding + 1 === 4"
              src="@/assets/images/svg/imgstep4.svg"
              class="wrapper__image__stepper"
            />
            <b-img
              v-if="stepOnboarding + 1 === 5"
              src="@/assets/images/svg/imgstep5.svg"
              class="wrapper__image__stepper"
            />
            <b-img
              v-if="stepOnboarding + 1 === 6"
              src="@/assets/images/svg/imgstep6.svg"
              class="wrapper__image__stepper__last"
            />

            <!--Waves Container-->
            <div>
              <svg
                class="waves"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 24 150 28"
                preserveAspectRatio="none"
                shape-rendering="auto"
              >
                <defs>
                  <path
                    id="gentle-wave"
                    d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                  />
                </defs>
                <g class="parallax">
                  <use
                    xlink:href="#gentle-wave"
                    x="48"
                    y="0"
                    fill="rgba(255,255,255,0.7"
                  />
                  <use
                    xlink:href="#gentle-wave"
                    x="48"
                    y="3"
                    fill="rgba(255,255,255,0.5)"
                  />
                  <use
                    xlink:href="#gentle-wave"
                    x="48"
                    y="5"
                    fill="rgba(255,255,255,0.3)"
                  />
                  <use
                    xlink:href="#gentle-wave"
                    x="48"
                    y="7"
                    fill="#fff"
                  />
                </g>
              </svg>
            </div>
            <!--Waves end-->

          </div>
        </b-row>
        <b-row class="mx-3 mb-1">
          <h1 class="text-black mb-1 mt-3">
            <strong>
              {{ getTitle() }}
            </strong>
          </h1>
          <span
            v-if="stepOnboarding === 1"
            class="text-black"
            style="font-size: 15px;"
          >
            kamu bisa langsung lengkapi data-data di menu pengaturan seperti <strong><i>data profile</i></strong>, <strong><i>alamat pickup</i></strong>, <strong><i>aktifkan ekspedisi</i></strong>, <strong><i>rekening bank</i></strong>, dll data tersebut <strong><i>wajib diisi</i></strong> serta merta agar proses seperti menambahkan order atau <strong><i>menarik penghasilan</i></strong> lancar kedepannya.
          </span>
          <b-col
            v-if="stepOnboarding === 2"
            cols="12"
            class="pl-0"
          >
            <span
              class="text-black"
              style="font-size: 15px;"
            >
              Mengapa perlu menambahkan Produk?
            </span>
            <ul
              class="text-black ml-1 my-50"
              style="font-size: 15px; list-style: initial;"
            >
              <li>
                Agar kamu dapat menganalisa mana <strong>produk dan varian yang paling laku</strong> yang udah kamu jual selama ini.
              </li>
              <li>
                Agar kamu <strong>tidak perlu input ulang</strong> produkmu saat menambahkan order.
              </li>
              <li>
                Agar detail produk muncul di <strong>label pengiriman</strong>.
              </li>
            </ul>
            <span
              class="text-black"
              style="font-size: 15px;"
            >
              Karena keuntungan kedepannya yang <strong>sangat banyak</strong>, jadi bersemangatlah input produk yuk kak!
            </span>
          </b-col>
          <b-col
            v-if="stepOnboarding === 3"
            cols="12"
            class="pl-0"
          >
            <p
              class="text-black"
              style="font-size: 15px;"
            >
              Saatnya mulai masuk-masukin <strong>data order</strong> nih ke Komship. Data yang dimasukin standar aja seperti nama customer, alamat, belinya apa, dikirim dari mana, jumlahnya berapa, COD atau bukan, dll.
            </p>
            <p
              class="text-black"
              style="font-size: 15px;"
            >
              Untuk <strong>orderan jenis COD</strong> kamu bisa mempercepat proses input dengan mengaktifkan fitur pendukung <strong>"input cepat"</strong> agar dapat cukup masukin <strong>nilai COD/nilai transaksi</strong> aja.
            </p>
          </b-col>
          <b-col
            v-if="stepOnboarding === 4"
            cols="12"
            class="pl-0"
          >
            <p
              class="text-black mb-50"
              style="font-size: 15px;"
            >
              Setelah berhasil input semua <strong>orderan yang mau dikirim</strong>, saatnya <strong>ajukan pickup</strong>. Kakak tinggal pickup orderan dari <strong>gudang-gudang yang kakak pilih</strong>. Setelah ajukan pickup berhasil, nomor <strong>resi akan keluar otomatis</strong> dan untuk pengajuan pertama kali biasanya akan ada kurir ekspedisi akan mengontak nomor HP yang kakak cantumkan pada pengaturan <strong>penanggung jawab gudang</strong>.
            </p>
            <p
              class="text-black"
              style="font-size: 15px;"
            >
              Label pengiriman untuk dicetak ada pada menu <strong>riwayat pickup</strong>.
            </p>
          </b-col>
          <b-col
            v-if="stepOnboarding === 5"
            cols="12"
            class="pl-0"
          >
            <h5 class="text-black">
              <strong>
                Hore... Kamu telah melewati sesi onboarding. Selamat!
              </strong>
            </h5>
            <p
              class="text-black mb-50"
              style="font-size: 15px;"
            >
              Pantaulah <strong>status pengiriman</strong> dari mulai order <i>dibuat, dipacking, dikirim dan diterima</i> pada menu <strong>Data Order</strong>. Kamu juga bisa lacak status pengiriman di menu detail order.
            </p>
            <p
              class="text-black"
              style="font-size: 15px;"
            >
              Jika mengalami kesulitan, jangan ragu untuk bertanya ke Customer Support kami melalui live chat ya...
            </p>
          </b-col>
        </b-row>
        <b-row class="justify-content-end align-items-center pr-3 pb-1">
          <div>
            <b-img
              src="@/assets/images/NewOnboarding/arrow-circle-left.svg"
              class="cursor-pointer"
              @click="handlePrevStepOnboarding"
            />
          </div>
          <div>
            <b-img
              v-if="stepOnboarding !== 5"
              src="@/assets/images/NewOnboarding/arrow-circle-right.svg"
              class="cursor-pointer"
              @click="handleNextStepOnboarding"
            />
            <b-button
              v-if="stepOnboarding === 5"
              variant="primary"
              class="d-flex align-items-center justify-content-center btn-icon ml-1"
              @click="updateProfileOnBoarding"
            >
              <b-spinner
                v-if="loadingOnboarding"
                small
                class="mr-50"
              />
              Mulai Sekarang <b-img
                src="@/assets/images/NewOnboarding/arrow-right.svg"
                class="ml-50"
              />
            </b-button>
          </div>
        </b-row>
      </b-overlay>
    </div>
  </b-modal>
</template>

<script>
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import Welcome from './componentStepModal/Welcome.vue'
import Stepper from './componentStepModal/Stepper.vue'

export default {
  name: 'ModalOnBoarding',
  components: {
    // Welcome,
    // Stepper,
  },
  data() {
    return {
      stepped: 1,
      dataSteps: 1,
      disabledOnboardingMulai: false,

      stepOnboarding: 0,
      stepItem: [
        {
          value: 1,
        },
        {
          value: 2,
        },
        {
          value: 3,
        },
        {
          value: 4,
        },
        {
          value: 5,
        },
      ],
      loadContentOnboarding: false,
      loadingOnboarding: false,
    }
  },
  methods: {
    handleStepOnboard(params) {
      switch (params) {
        case 'endsteponboarding':
          this.updateProfileOnBoarding()
          break
        default:
          this.stepped = params
          break
      }
    },
    updateProfileOnBoarding() {
      this.disabledOnboardingMulai = false
      this.loadingOnboarding = true
      this.$http_komship
        .put('/v1/partner/onboarding/update', {})
        .then(resp => {
          if (resp.data.code === 200 && resp.data.status === 'success') {
            this.$http_komship.post('/v1/gamifaction/start')
              .then(() => {
                this.loadingOnboarding = false
                window.location.reload()
              }).catch(() => {
                this.loadingOnboarding = false
                window.location.reload()
              })
          }
        })
        .catch(err => {
          this.disabledOnboardingMulai = false
          this.loadingOnboarding = false
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Failure',
              icon: 'AlertCircleIcon',
              text: err,
              variant: 'danger',
            },
          }, 2000)
        })
    },
    handleNextStepOnboarding() {
      this.loadContentOnboarding = true
      setTimeout(() => {
        this.stepOnboarding += 1
        this.loadContentOnboarding = false
      }, 500)
    },
    handlePrevStepOnboarding() {
      this.loadContentOnboarding = true
      setTimeout(() => {
        this.stepOnboarding -= 1
        this.loadContentOnboarding = false
      }, 500)
    },
    getTitle() {
      let title = ''
      if (this.stepOnboarding === 1) {
        title = 'Pengaturan'
      }
      if (this.stepOnboarding === 2) {
        title = 'Tambah Produk'
      }
      if (this.stepOnboarding === 3) {
        title = 'Tambah Order'
      }
      if (this.stepOnboarding === 4) {
        title = 'Ajukan Pickup'
      }
      if (this.stepOnboarding === 5) {
        title = 'Ayo Mulai Pakai Komship'
      }
      return title
    },
  },
}
</script>

<style scoped>
[dir] .wrapper__image__stepper {
    position: absolute;
    top: 100%;
    left: 50%;
    z-index: 9;
    transform: translate(-50%, -50%);
}

[dir] .wrapper__image__stepper__last {
    position: absolute;
    top: 100%;
    left: 80%;
    z-index: 9;
    transform: translate(-50%, -50%);
}

.header {
  position:relative;
  text-align:center;
  background: linear-gradient(60deg, rgb(255, 239, 239) 0%, rgb(255, 219, 219) 100%);
  color:white;
  width: 100%;
}
.logo {
  width:50px;
  fill:white;
  padding-right:15px;
  display:inline-block;
  vertical-align: middle;
}

.inner-header {
  height:20vh;
  width:100%;
  margin: 0;
  padding: 0;
}

.flex { /*Flexbox for containers*/
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.waves {
  position:relative;
  width: 100%;
  height:15vh;
  margin-bottom:-7px; /*Fix for safari gap*/
  min-height:100px;
  max-height:150px;
}

.content {
  position:relative;
  height:20vh;
  text-align:center;
  background-color: white;
}

/* Animation */

.parallax > use {
  animation: move-forever 25s cubic-bezier(.55,.5,.45,.5)     infinite;
}
.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}
.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}
.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}
.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}
@keyframes move-forever {
  0% {
   transform: translate3d(-90px,0,0);
  }
  100% {
    transform: translate3d(85px,0,0);
  }
}
/*Shrinking for mobile*/
@media (max-width: 768px) {
  .waves {
    height:40px;
    min-height:40px;
  }
  .content {
    height:30vh;
  }
  h1 {
    font-size:24px;
  }
}

</style>
