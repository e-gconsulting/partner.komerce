<!-- eslint-disable vue/no-v-html -->
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
    <b-row class="my-8 overflow-auto">
      <div
        v-if="itemAwb.length > 0"
      >
        <div
          class="px-1"
          :style="handleCloseModalResi === true ? 'max-height: 80vh;width: 100%;' : 'max-height: 35vh;width: 100%;'"
          v-html="listAwb"
        />
      </div>
      <b-col v-if="itemAwb.length === 0">
        <div
          v-if="isLoading===false"
          class="d-block mt-5 mb-5 align-content-center text-center"
        >
          Data riwayat perjalan tidak ditemukan. <b>Bisa jadi</b> sudah request pickup/dijemput kurir saat pickup namun <b>belum discan</b> QR code untuk memulai perjalanan di kantor cabang. Harap menunggu
        </div>
        <div
          v-if="isLoading===true"
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
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  directives: { VBModal },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    orderDatas: null,
    loading: Boolean,
    handleCloseModalResi: Boolean,
    // eslint-disable-next-line vue/require-default-prop
    promiseModal: null,
    // eslint-disable-next-line vue/require-default-prop
    orderId: null,
  },
  data() {
    return {
      isLoading: false,

      listAwb: '',
      itemAwb: [],
      profile: this.$store.state?.auth?.userData,
    }
  },
  watch: {
    async orderId(newVal, oldVal) {
      if (newVal) {
        try {
          const order = await this.$http_komship.get(`v1/order/${this.profile.partner_detail.id}/detail/${this.orderId}`)
          const { data } = await order.data
          this.transactionValue = data.old_grandtotal
          this.orderDatas = await data
          await this.lacakresi()
          await this.$emit('updateValueTransaction', data.old_grandtotal)
        } catch (err) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Failure',
              icon: 'AlertCircleIcon',
              text: err,
              variant: 'danger',
            },
          }, 2000)
        }
      }
    },
  },
  methods: {
    lacakresi() {
      this.isLoading = true

      if (this.handleCloseModalResi === true) {
        this.promiseModal.then(() => {
          this.getHistoryPackage()
        })
      } else {
        this.getHistoryPackage()
      }
    },
    async getHistoryPackage() {
      const body = {
        data: this.orderDatas.airway_bill,
      }
      await this.$http_komship.post('v2/bulk-check-awb', body).then(res => {
        const { data } = res.data
        this.itemAwb = data.history
        this.isLoading = false
        this.getElementAwb()
      }).catch(err => {
        this.isLoading = false
      })
    },
    getElementAwb() {
      const formatDate = date => {
        const monthName = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
        const day = moment(date).format('DD')
        const month = moment(date).format('M')
        const year = moment(date).format('YYYY')
        const time = moment(date).format('HH.mm')
        return `${day} ${monthName[month - 1]} ${year} - ${time}`
      }
      this.listAwb = ''
      this.itemAwb.forEach(items => {
        this.listAwb += '<div class="icon-awb d-inline-block">'
        if (items.status === 'Pickup') {
          this.listAwb += `<img src="${require('@/assets/images/icons/resi-pickup.svg')}">`
        } else if (items.status === 'Process') {
          this.listAwb += `<img src="${require('@/assets/images/icons/resi-kirim.svg')}">`
        } else if (items.status === 'Problem') {
          this.listAwb += `<img src="${require('@/assets/images/icons/resi-problem.svg')}">`
        } else if (items.status === 'Delivered') {
          this.listAwb += `<img src="${require('@/assets/images/icons/resi-terima.svg')}">`
        } else if (items.status === 'Retur') {
          this.listAwb += `<img src="${require('@/assets/images/icons/resi-retur.svg')}">`
        }
        this.listAwb += '</div>'
        this.listAwb += '<div style="font-size: 16px;display: inline-block;">'
        this.listAwb += `<span>${formatDate(items.date)}</span><br>`
        this.listAwb += `<span class="font-bold">${items.desc}</span>`
        this.listAwb += '</div><br>'
        if (items.send_wa === 1) {
          if (items.type === 'sending') {
            this.listAwb += '<div class="d-flex relative p-1" style="margin-left:50px;border:1px solid #E2E2E2;border-radius:4px;margin-bottom:-50px;max-width:400px">'
            this.listAwb += `<img src="${require('@/assets/images/icons/whatsapp-notif.svg')}">`
            this.listAwb += '<span class="my-auto" style="margin-left:6px">Pemberitahuan pemberangkatan telah terkirim ke WA Pelanggan</span>'
            this.listAwb += '</div>'
          }
          if (items.type === 'arrived') {
            this.listAwb += '<div class="d-flex relative p-1" style="margin-left:50px;border:1px solid #E2E2E2;border-radius:4px;margin-bottom:-50px;max-width:400px">'
            this.listAwb += `<img src="${require('@/assets/images/icons/whatsapp-notif.svg')}">`
            this.listAwb += '<span class="my-auto" style="margin-left:6px">Info paket COD hampir sampai telah terkirim ke WA Pelanggan</span>'
            this.listAwb += '</div>'
          }
        }
      })
    },
  },
}
</script>

<style>

</style>
