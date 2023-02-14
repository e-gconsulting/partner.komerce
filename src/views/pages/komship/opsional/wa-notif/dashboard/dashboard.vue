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
        >
          Perpanjang
        </b-button>
      </div>
    </div>
    <row class="d-flex mt-2">
      <div class="d-flex border-2 p-1 rounded-2xl">
        <b-img
          src="https://storage.googleapis.com/komerce/assets/avatars/image-null.png"
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
        <div class="d-flex">
          <b-img
            src="https://storage.googleapis.com/komerce/assets/komerce-icon/Orange/notification-1.svg"
          />
          <span class="ml-1">{{ Notification.count }}</span>
        </div>
      </div>
      <div class="border-2 p-1 w-[40%] h-[200px] mr-2 rounded-2xl">
        <h4 class="text-black font-[600]">
          Notifikasi Terkirim
        </h4>
        <div class="d-flex">
          <b-img
            src="https://storage.googleapis.com/komerce/assets/komerce-icon/Orange/notification-1.svg"
          />
          <span class="ml-1">{{ Notification.sender }}</span>
        </div>
      </div>
      <div class="border-2 p-1 w-[40%] h-[200px] rounded-2xl">
        <h4 class="text-black font-[600]">
          Notifikasi Gagal
        </h4>
        <div class="d-flex">
          <b-img
            src="https://storage.googleapis.com/komerce/assets/komerce-icon/Orange/notification-1.svg"
          />
          <span class="ml-1">{{ Notification.failed }}</span>
        </div>
      </div>
    </row>

    <div class="my-2 border-2 p-2 rounded-2xl">
      <div class="border-b-2 pb-2">
        <h4 class="text-black font-[600]">
          Template Notifikasi
        </h4>
        <div class="text-black ">
          Fitur Notifikasi WhatsApp dapat diaktifkan dengan cara klik toggle ( <span><b-img
            style="widht: 10px;"
            src="https://storage.googleapis.com/komerce/assets/komerce-icon/Orange/toggle-on-circle.svg"
          /></span> ) di bawah.
          Sesuaikan dan buat template notifikasimu sendiri untuk menunjukkan identitas bisnismu.
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
              <b-button style="background-color: unset !important; border: 0px !important;">
                <b-img src="https://storage.googleapis.com/komerce/assets/komerce-icon/Hitam/toggle-off-circle.svg" />
              </b-button>
              <b-button style="background-color: unset !important; border: 0px !important;">
                <b-img src="https://storage.googleapis.com/komerce/assets/komerce-icon/Hitam/edit.svg" />
              </b-button>
            </div>
          </div>
          <div class="d-flex justify-content-between border-b-2">
            <h4 class="text-black font-[500] align-self-center">
              Notifikasi Pickup
            </h4>
            <div class="d-flex">
              <b-button style="background-color: unset !important; border: 0px !important;">
                <b-img src="https://storage.googleapis.com/komerce/assets/komerce-icon/Hitam/toggle-off-circle.svg" />
              </b-button>
              <b-button style="background-color: unset !important; border: 0px !important;">
                <b-img src="https://storage.googleapis.com/komerce/assets/komerce-icon/Hitam/edit.svg" />
              </b-button>
            </div>
          </div>
        </b-col>
        <b-col lg="6">
          <div
            class="bg-blue-500"
            style="height: 500px;"
          />
        </b-col>
      </b-row>
    </div>
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
    }
  },
}
</script>
