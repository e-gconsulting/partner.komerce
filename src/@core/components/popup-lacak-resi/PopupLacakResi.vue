<template>
  <div>
    <div
      class="d-flex justify-between"
    >
      <div class="d-flex">
        <h4 class="text-black mt-50">
          <strong>
            Riwayat Perjalanan
          </strong>
        </h4>
        <img
          :src="orderDatas.shipment_image_path"
          style="height: 45px"
        >
      </div>
      <img
        v-if="handleCloseModalResi === true"
        src="@/assets/images/icons/close-circle.svg"
        style="cursor:pointer"
        @click="$bvModal.hide('bv-modal-cek-resi')"
      >
    </div>
    <b-row class="my-8 overflow-auto h-50">
      <div
        v-if="itemAwbs.length > 0"
      >
        <div
          class="px-1"
          style="max-height: 80vh;width: 100%;"
          v-html="listAwbs"
        />
      </div>
      <b-col v-else>
        <div
          v-if="loading===false"
          class="d-block mt-5 mb-5 align-content-center text-center"
        >
          Data riwayat perjalan tidak ditemukan. <b>Bisa jadi</b> sudah request pickup/dijemput kurir saat pickup namun <b>belum discan</b> QR code untuk memulai perjalanan di kantor cabang. Harap menunggu
        </div>
        <div
          v-if="loading===true"
          class="d-block mt-5 mb-5 align-content-center text-center"
        >
          <div
            class="spinner-border text-primary"
            role="status"
          >
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import {
  VBModal,
} from 'bootstrap-vue'
import moment from 'moment'

export default {
  directives: { VBModal },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    orderDatas: null,
    // eslint-disable-next-line vue/require-default-prop
    itemAwbs: null,
    listAwbs: {
      type: String,
      default: () => '',
    },
    loading: Boolean,
    handleCloseModalResi: Boolean,
  },
  methods: {

  },
}
</script>

<style>

</style>
