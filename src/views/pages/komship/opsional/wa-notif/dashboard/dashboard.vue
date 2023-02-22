<template>
  <b-card>
    <div class="d-flex justify-content-between border-b-2 pb-2">
      <div class="d-flex align-items-center my-2">
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
        <h2 class="text-black font-[600]">
          Notifikasi WhatsApp Premium
        </h2>
      </div>
      <div>
        <div class="text-[12px] text-black">
          Berakhir {{ expiredDate }} hari lagi
        </div>
        <b-button
          variant="primary"
          class="rounded-16 mt-[5px]"
          @click="modalRenew"
        >
          Perpanjang
        </b-button>
      </div>
    </div>
    <row class="d-sm-flex d-block mt-2">
      <div
        class="d-flex border-2 p-1 rounded-2xl card1-mobile"
      >
        <b-img
          class="d-none d-lg-block"
          src="https://storage.googleapis.com/komerce/assets/illustration/profile-illus-wa.svg"
          style="width: 100%;"
        />
        <div class="ml-1">
          <div class="d-block d-sm-flex justify-content-between mb-1">
            <div class="text-black font-[600] align-self-center">
              {{ statusWhatsapp }}
            </div>
            <b-button
              variant="outline-primary"
              size="sm"
              class="d-flex"
              @click="$bvModal.show('modal-logout')"
            >
              <b-img
                src="https://storage.googleapis.com/komerce/assets/komerce-icon/Orange/logout.svg"
                style="width: 20px"
              />
              <span class="text-primary ml-1 align-self-center logout-mobile">Logout</span>
            </b-button>
          </div>
          <div class="text-black">
            WhatsApp-mu terhubung dan tidak harus online, tapi jika tidak ada
            aktifitas dalam 14 hari, maka WhatsApp akan otomatis terputus
          </div>
        </div>
      </div>
      <div class="border-2 p-1 w-[40%] h-[200px] mx-2 rounded-2xl">
        <h4 class="text-black font-[600]">
          Total Notifikasi
        </h4>
        <div class="d-flex mt-2">
          <b-img
            src="https://storage.googleapis.com/komerce/assets/icons/notif-blue.svg"
          />
          <span class="ml-1 text-[16px] pt-[5px]">{{ Notification.total_notification }}</span>
        </div>
      </div>
      <div class="border-2 p-1 w-[40%] h-[200px] mr-2 rounded-2xl">
        <h4 class="text-black font-[600]">
          Notifikasi Terkirim
        </h4>
        <div class="d-flex mt-2">
          <b-img
            src="https://storage.googleapis.com/komerce/assets/icons/send-green.svg"
          />
          <span class="ml-1 text-[16px] pt-[5px]">{{ Notification.total_notification_success }}</span>
        </div>
      </div>
      <div class="border-2 p-1 w-[40%] h-[200px] rounded-2xl">
        <h4 class="text-black font-[600]">
          Notifikasi Gagal
        </h4>
        <div class="d-flex mt-2">
          <b-img
            src="https://storage.googleapis.com/komerce/assets/icons/cross-red.svg"
          />
          <span class="ml-1 text-[16px] pt-[5px]">{{ Notification.total_notification_failed }}</span>
        </div>
      </div>
    </row>

    <div class="my-2 border-2 p-2 rounded-2xl">
      <div class="border-b-2 pb-2">
        <h4 class="text-black font-[600]">
          Template Notifikasi
        </h4>
        <div class="text-black">
          <div class="d-flex w-50">
            <span class="mr-1">Fitur Notifikasi WhatsApp dapat diaktifkan dengan cara klik toggle </span>(<b-check
              aria-label="icon"
              size="sm"
              class="ml-[5px] w-1"
              disabled
              checked="true"
              switch
            />)<span class="ml-1">di bawah.</span>
          </div>
          <span> Sesuaikan dan buat template notifikasimu sendiri untuk menunjukkan identitas bisnismu.</span>
        </div>
      </div>

      <b-row class="mt-2 border-b-2 pb-2">
        <b-col
          lg="6"
          class="border-r-2"
        >
          <h4 class="text-black font-[600]">
            Template Notifikasi
          </h4>
        </b-col>
        <b-col lg="6">
          <h4 class="text-black font-[600] d-none d-lg-block">
            Preview Notifikasi
          </h4>
        </b-col>
      </b-row>

      <b-row>
        <b-col lg="6">
          <div class="d-flex justify-content-between border-b-2 mt-1">
            <div
              type="button"
              class="w-[80%] align-self-center"
              @click="hoverTemplate('cod')"
            >
              <h4
                class="text-black font-[500]"
              >
                Notifikasi COD
              </h4>
            </div>
            <div class="d-flex">
              <b-form-checkbox
                v-model="codNotification"
                v-b-popover.hover.topleft="`${codTooltip}`"
                switch
                class="align-self-center"
                @change="templateCod"
              />
              <b-button class="custom-button">
                <b-img src="https://storage.googleapis.com/komerce/assets/komerce-icon/Hitam/edit.svg" />
              </b-button>
            </div>
          </div>
          <div class="d-flex justify-content-between border-b-2 mt-1">
            <div
              type="button"
              class="w-[80%] align-self-center"
              @click="hoverTemplate('pickup')"
            >
              <h4
                class="text-black font-[500]"
              >
                Notifikasi Pickup
              </h4>
            </div>
            <div class="d-flex">
              <b-form-checkbox
                v-model="pickupNotification"
                v-b-popover.hover.topleft="`${notificationTooltip}`"
                switch
                class="align-self-center"
                @change="templatePickup"
              />
              <b-button class="custom-button">
                <b-img src="https://storage.googleapis.com/komerce/assets/komerce-icon/Hitam/edit.svg" />
              </b-button>
            </div>
          </div>
        </b-col>
        <b-col
          lg="6"
          class="mt-2 pb-2"
        >
          <h4 class="text-black font-[600] d-block d-lg-none">
            Preview Notifikasi
          </h4>
        </b-col>
        <b-col
          class="text-end"
          lg="6"
        >
          <div id="template-notification">
            <div class="mx-5 mx-md-2 mx-xs-0 pt-2">
              <div class="d-flex">
                <b-img
                  class="align-self-start mt-2"
                  src="https://storage.googleapis.com/komerce/assets/icons/profile-placehold.svg"
                />
                <div class=" custom-template tri-right left-top">
                  <div class="text-left px-2 py-1">
                    <div v-if="isTemplate">
                      <!-- {{ messageTemplateCod }} -->
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos excepturi tempora magnam quam quo eveniet esse saepe, quaerat illo reprehenderit dignissimos quisquam eos ullam veniam praesentium accusantium unde iste assumenda, nisi rerum molestiae officiis! Commodi velit ex odio quis quam?
                    </div>
                    <div v-else>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis tempore, molestiae incidunt libero reiciendis tempora ea cumque eos dolor eum.
                      <!-- {{ messageTemplatePickup }} -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>

    <!-- Modal Logout -->
    <b-modal
      id="modal-logout"
      hide-header-close
      hide-header
      hide-footer
      size="lg"
      modal-class="modal-primary"
      centered
      title="Primary Modal"
    >
      <b-col
        md="12"
        class="d-flex justify-content-center pt-3 mb-2"
      >
        <b-img
          width="100"
          src="@core/assets/image/icon-popup-warning.png"
        />
      </b-col>

      <b-col class="text-center mb-3">
        <h3 class="text-black font-bold">
          Kamu yakin untuk memutuskan WhatsApp ini ?
        </h3>
      </b-col>
      <b-col class="text-center">
        <h4 class="text-black text-[16px]">
          Notifikasi WhatsApp untuk sementara akan disesuaikan secara otomatis ke nomor WhatsApp Komship
        </h4>
      </b-col>
      <b-col
        md="12"
        class="text-center pb-2 mt-3"
      >
        <b-button
          variant="outline-primary"
          class="mr-3"
          @click="$bvModal.hide('modal-logout')"
        >
          Batal
        </b-button>
        <b-button
          variant="primary"
          @click="logout()"
        >
          Logout
        </b-button>
      </b-col>
    </b-modal>

    <!-- Modal Renew Subcription -->
    <b-modal
      id="modal-renew-subcription"
      hide-header
      hide-footer
      no-close-on-backdrop
      modal-class="modal-primary"
      centered
      title="Primary Modal"
    >
      <div class="p-2 text-black">
        <h3 class="text-center font-[600] mb-2">
          Pusat Berlangganan
        </h3>
        <div>
          <div class="text-[16px] mb-1 font-[600]">
            Fitur
          </div>
          <v-select
            v-model="fitur"
            class="mb-1"
            :options="listFitur"
            label="name"
          />
        </div>
        <div>
          <div class="text-[16px] mb-1 font-[600]">
            Pilih Berlangganan
          </div>
          <v-select
            v-model="subscription"
            class="mb-1"
            :options="listSubscription"
            label="name"
          />
        </div>
        <div>
          Saldo Kompay kamu <span class="text-primary">Rp{{ saldo_kompay }}</span>
        </div>
        <div
          class="justify-content-between d-flex mt-2"
        >
          <div>
            <b-button
              variant="outline-primary"
              class="mr-1 w-[14rem] custom-btn"
              @click="$bvModal.hide('modal-renew-subcription')"
            >
              Batal
            </b-button>
          </div>
          <div>
            <b-button
              :variant="disabledSubcription ? 'secondary' : 'primary'"
              class="ml-1 w-[14rem] custom-btn"
              :disabled="disabledSubcription"
              @click="subscribe"
            >
              Bayar
            </b-button>
          </div>
        </div>
      </div>
    </b-modal>

  </b-card>
</template>
<script>
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import vSelect from 'vue-select'
import { mapState } from 'vuex'

export default {
  components: {
    vSelect,
  },

  data() {
    return {
      expiredDate: 0,
      statusWhatsapp: 'Terhubung',
      Notification: {},
      iconToggle: true,
      pickupNotification: false,
      codNotification: false,
      codTooltip: 'Aktifkan Notifikasi',
      notificationTooltip: 'Aktifkan Notifikasi',
      messageTemplateCod: '',
      messageTemplatePickup: 'lorem ipsum dolor sit amet, consectetur',
      listFitur: [
        { value: 1, name: 'Notifikasi WhatsApp Premium' },
      ],
      listSubscription: [
        { value: 1, name: '1 Bulan - Rp39.000' },
        { value: 2, name: '3 Bula - 117.000' },
        { value: 3, name: '6 Bulan - 234.000' },
        { value: 4, name: '1 Tahun - 468.000' },
      ],
      subscription: { value: 1, name: '1 Bulan - Rp39.000' },
      fitur: { value: 1, name: 'Notifikasi WhatsApp Premium' },
      saldo_kompay: 0,
      disabledSubcription: true,
      isTemplate: true,
    }
  },

  computed: {
    ...mapState('dashboard', ['profile']),
  },

  mounted() {
    this.fetchData()
    if (this.profile.partner_is_notification_whatsapp !== 2) {
      this.$router.push({ name: 'opsional-feature' })
    }
  },

  methods: {
    fetchData() {
      this.$http_komship.get('/v1/setting/notification-whatsapp-dashboard')
        .then(response => {
          const { data } = response.data
          this.Notification = data
          this.expiredDate = data.whatsapp_expired_at
          this.codNotification = data.notification_cod.status
          this.pickupNotification = data.notification_pickup.status
          this.messageTemplateCod = data.notification_cod.message
          this.messageTemplatePickup = data.notification_pickup.message
        }).catch(err => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Failure',
              icon: 'AlertCircleIcon',
              text: err.response.data.message,
              variant: 'danger',
            },
          })
        })
    },
    logout() {
      this.$http_komship.post('/v1/setting/whatsapp-logout')
        .then(response => {
          if (response.data.code === 200) {
            this.$router.push({ name: 'koneksi-wa' })
          }
          console.log(response)
        }).catch(err => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Failure',
              icon: 'AlertCircleIcon',
              text: err.response.data.message,
              variant: 'danger',
            },
          })
        })
    },
    modalRenew() {
      this.$bvModal.show('modal-renew-subcription')
      this.$http_komship.get('/v1/setting/notification-whatsapp-premium-fee')
        .then(response => {
          const { data } = response.data
          this.saldo_kompay = data.kompay_balance
          console.log(response)
        }).catch(err => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Failure',
              icon: 'AlertCircleIcon',
              text: err.response.data.message,
              variant: 'danger',
            },
          })
        })
    },
    subscribe() {
      this.$http_komship.post('/v1/setting/renew-whatsapp-subscription')
        .then(response => {
          console.log(response)
        })
    },
    templateCod() {
      let status = ''
      if (this.codNotification === true) {
        this.codTooltip = 'Matikan Notifikasi'
        this.isTemplate = true
        status = 1
      } else {
        this.codTooltip = 'Aktifkan Notifikasi'
        status = 0
      }

      const formData = new FormData()
      formData.append('type_notification', 'is_received')
      formData.append('status', status)

      this.$http_komship.post('/v1/setting/on-or-off-template-whatsapp', formData)
        .then(response => {
          console.log(response)
        }).catch(err => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Failure',
              icon: 'AlertCircleIcon',
              text: err.response.data.message,
              variant: 'danger',
            },
          })
        })
    },
    templatePickup() {
      let status = ''
      if (this.pickupNotification === true) {
        this.notificationTooltip = 'Matikan Notifikasi'
        this.isTemplate = false
        status = 1
      } else {
        this.notificationTooltip = 'Aktifkan Notifikasi'
        status = 0
      }

      const formData = new FormData()
      formData.append('type_notification', 'is_sending')
      formData.append('status', status)

      this.$http_komship.post('/v1/setting/on-or-off-template-whatsapp', formData)
        .then(response => {
          console.log(response)
        }).catch(err => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Failure',
              icon: 'AlertCircleIcon',
              text: err.response.data.message,
              variant: 'danger',
            },
          })
        })
    },
    hoverTemplate(template) {
      if (template === 'cod') {
        this.isTemplate = true
      } else {
        this.isTemplate = false
      }
    },
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
</style>

<style lang="scss" scoped>
.custom-button {
  background-color: transparent !important;
  border: 0px;
  cursor: pointer !important;
  box-shadow: none !important;;
}
.custom-btn {
  border-radius: 8px;
  font-size: 16px !important;
}
#template-notification {
  height: 500px;
  background-image: url(https://storage.googleapis.com/komerce/assets/elements/backgroundwa.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position-x: right;
}
.custom-template {
  border-radius: 12px;
  border-top-left-radius: 0px;
  align-self: center;
  margin-left: 2rem;
  background-color: white;
  position: relative;
  margin-top: 20px;
  display: inline-block;
  position: relative;
  width: 80%;
  min-height: 5rem;
}
.left-top::after {
  content: ' ';
  position: absolute;
  width: 0;
  height: 0;
  left: -20px !important;
  right: auto;
  top: 0px;
  bottom: auto;
  border: 22px solid;
  border-color: white transparent transparent transparent;
}

@media screen and (max-width: 1200px) {
  .custom-template {
    margin-left: 1rem;
    margin-top: 10px;
    width: 90%;
  }
  .left-top::after {
    left: -10px !important;
  }
}
@media screen and (max-width: 720px) {
  .card1-mobile {
    padding: 0px !important;
    // width: 40rem !important;
  }
  .logout-mobile {
    margin-left: 0px !important;
  }
}
</style>
