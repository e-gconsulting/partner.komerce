<template>
  <BModal
    id="ModalComponent"
    size="lg"
    hide-footer
  >
    <div class="text-center">
      <strong class="text-black text-lg">
        Monitoring semua Orderan yang terkendala disini
      </strong>
      <div class="mt-2 mb-2">
        <img
          src="@/assets/images/svg/icononboardingkendala.svg"
          alt="icon"
          class="m-auto"
        >
      </div>
      <div class="w-5/6 m-auto">
        <p class="text-black">
          Perhatikan status tiket;
          <strong
            class="font-bold"
            style="color: #f95031"
          >Perlu tindak lanjut</strong>
          kamu harus segera membalas biar Orderanmu nggak gantung dan berujung
          retur
        </p>
        <p class="text-black">
          Kesuksesan pengiriman itu karena konfirmasi dari kamu jelas, dan
          Ekspedisi gercep nginfoin ke kurir
        </p>
        <p class="text-black font-black">
          Segera cek Tiket Orderan kamu yang terkendala, mungkin Ekspedisi butuh
          bantuan kamu buat konfirmasi pengiriman
        </p>
      </div>
      <BButton
        variant="primary"
        style="border-radius: 12px"
        class="font-semibold mb-1"
        @click="updatePopupKendala"
      >
        Mulai Monitor
      </BButton>
    </div>
  </BModal>
</template>

<script>
import { BButton, BModal } from 'bootstrap-vue'

export default {
  components: {
    BButton,
    BModal,
  },
  methods: {
    async updatePopupKendala() {
      await this.$http_komship
        .get('/v1/popup/update-popup-kendala')
        .then(() => {
          this.$bvModal.hide('ModalComponent')
        })
    },
  },
}
</script>

<style>
</style>
