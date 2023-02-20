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
          class="rounded-16 mt-1"
          @click="modalSubscribe"
        >
          Perpanjang
        </b-button>
      </div>
    </div>
    <row class="d-flex mt-2">
      <div class="d-flex border-2 p-1 rounded-2xl">
        <b-img
          src="https://storage.googleapis.com/komerce/assets/illustration/profile-illus-wa.svg"
          style="width: 100%;"
        />
        <div class="ml-1">
          <div class="d-flex justify-content-between mb-1">
            <div class="text-black font-[600] align-self-center">
              {{ statusWhatsapp }}
            </div>
            <b-button
              variant="outline-primary"
              size="sm"
              class="d-flex"
              @click="shohLogout"
            >
              <b-img
                src="https://storage.googleapis.com/komerce/assets/komerce-icon/Orange/logout.svg"
                style="width: 20px"
              />
              <span class="text-primary ml-1 align-self-center">Logout</span>
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
          <span class="ml-1 text-[16px] pt-[5px]">{{ Notification.count }}</span>
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
          <span class="ml-1 text-[16px] pt-[5px]">{{ Notification.sender }}</span>
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
          <span class="ml-1 text-[16px] pt-[5px]">{{ Notification.failed }}</span>
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
          <h4 class="text-black font-[600]">
            Preview Notifikasi
          </h4>
        </b-col>
      </b-row>

      <b-row class="my-2">
        <b-col lg="6">
          <div class="d-flex justify-content-between border-b-2">
            <h4 class="text-black font-[500] align-self-center">
              Notifikasi COD
            </h4>
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
          <div class="d-flex justify-content-between border-b-2">
            <h4 class="text-black font-[500] align-self-center">
              Notifikasi Pickup
            </h4>
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
          class="text-end"
          lg="6"
        >
          <div id="template-notification">
            <div class="mx-5 pt-2">
              <div class="d-flex">
                <b-img src="https://storage.googleapis.com/komerce/assets/icons/profile-placehold.svg" />
                <div class=" custom-template tri-right left-top" />
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

  </b-card>
</template>
<script>
export default {
  data() {
    return {
      expiredDate: 34,
      statusWhatsapp: 'Terhubung',
      Notification: {
        count: 12,
        sender: 10,
        failed: 14,
      },
      iconToggle: true,
      pickupNotification: false,
      codNotification: false,
      codTooltip: 'Aktifkan Notifikasi',
      notificationTooltip: 'Aktifkan Notifikasi',
    }
  },

  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      //
    },
    showLogout() {
      this.$bvModal.show('modal-logout')
    },
    logout() {
      //
    },
    modalSubscribe() {
      //
    },
    templateCod() {
      if (this.codNotification === true) {
        this.codTooltip = 'Matikan Notifikasi'
      } else {
        this.codTooltip = 'Aktifkan Notifikasi'
      }
      console.log(this.codNotification)
    },
    templatePickup() {
      if (this.pickupNotification === true) {
        this.notificationTooltip = 'Matikan Notifikasi'
      } else {
        this.notificationTooltip = 'Aktifkan Notifikasi'
      }
      console.log(this.pickupNotification)
    },
  },
}
</script>
<style lang="scss" scoped>
.custom-button {
  background-color: transparent !important;
  border: 0px;
  cursor: pointer !important;
  box-shadow: none !important;;
}
#template-notification {
  height: 500px;
  background-image: url(https://storage.googleapis.com/komerce/assets/elements/backgroundwa.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position-x: right;
}
</style>
<style lang="css" scoped>
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
  height: 5rem;
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
</style>
