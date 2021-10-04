<template>
  <div>
    <b-modal
      id="modal-3"
      title="Tambah Resi"
      :ok-title="okTitleButton"
      :cancel-title="cancelTitleButton"
      body-class="modal-on-detail-data-order"
      centered
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOkModal"
    >
      <div
        v-if="modalState === 'default'"
      >
        <b-form-group
          class="data-order-modal-input-label"
          label="No Resi"
          label-cols-md="5"
          label-for="modal-input-resi"
        >
          <b-form-input
            id="modal-input-resi"
            v-model="inputtedResi"
            class="modal-input-resi"
            type="text"
          />
        </b-form-group>
        <b-form-group
          v-if="warnTextModal !== ''"
          class="data-order-modal-input-label"
          label-cols-md="5"
          label-for="modal-input-resi-warn"
        >
          <div
            id="modal-input-resi-warn"
            class="modal-resi-danger-text"
          >
            {{ warnTextModal }}
          </div>
        </b-form-group>
      </div>
      <div
        v-else
        class="resi-receipt-modal-popup-wrapper"
      >
        <b-form-group
          class="data-order-detail-label grey-text mb-2"
          label="No Resi"
          label-cols-md="4"
          label-for="resi-order-popup"
        >
          <div
            id="resi-order-popup"
            class="data-order-detail-text"
          >
            {{ inputtedResi }}
          </div>
        </b-form-group>

        <b-form-group
          class="data-order-detail-label grey-text mb-2"
          label="Nama Penerima"
          label-cols-md="4"
          label-for="penerima-order-popup"
        >
          <div
            id="penerima-order-popup"
            class="data-order-detail-text"
          >
            {{ detailOrder.customer_name }}
          </div>
        </b-form-group>

        <b-form-group
          class="data-order-detail-label grey-text mb-2"
          label="No Hp"
          label-cols-md="4"
          label-for="phone-order-popup"
        >
          <div
            id="phone-order-popup"
            class="data-order-detail-text"
          >
            01234567890
          </div>
        </b-form-group>

        <b-form-group
          class="data-order-detail-label grey-text mb-2"
          label="Alamat"
          label-cols-md="4"
          label-for="address-order-popup"
        >
          <div
            id="address-order-popup"
            class="data-order-detail-text"
          >
            {{ detailOrder.detail_address }}
          </div>
        </b-form-group>

        <b-form-group
          class="data-order-detail-label grey-text mb-2"
          label="Ekspedisi"
          label-cols-md="4"
          label-for="expedisi-order-popup"
        >
          <div
            id="expedisi-order-popup"
            class="data-order-detail-text"
          >
            JNE
          </div>
        </b-form-group>

        <b-form-group
          class="data-order-detail-label grey-text mb-2"
          label="Tanggal Resi"
          label-cols-md="4"
          label-for="date-order-popup"
        >
          <div
            id="date-order-popup"
            class="data-order-detail-text"
          >
            {{ getDate(detailOrder.order_date) }}
          </div>
        </b-form-group>
      </div>
    </b-modal>

    <b-modal
      id="modal-4"
      hide-footer
      hide-header
      centered
    >
      <div class="modal-add-order-popup-success">
        <div class="image-wrapper">
          <img src="https://s3-ap-southeast-1.amazonaws.com/www.theedgeproperty.com.sg/images/search_mobile.png">
        </div>
        <div class="text-wrapper">No Resi Berhasil di Tambahkan</div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import {
  BFormGroup,
  BFormInput,
  BModal,
} from 'bootstrap-vue'

export default {
  components: {
    BFormGroup,
    BFormInput,
    BModal,
  },
  props: {
    detailOrder: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      inputtedResi: '',
      warnTextModal: '',
      okTitleButton: 'Cek Resi',
      cancelTitleButton: 'Batal',
      modalState: 'default',
    }
  },
  methods: {
    getDate(dateVal) {
      if (dateVal) {
        let today = dateVal.split(' ')
        const month = today[1]
        today = `${today[0]} ${month} ${today[2]}`
        return today
      }
      return dateVal
    },
    showModalInputResi() {
      this.$root.$emit('bv::show::modal', 'modal-3')
    },
    checkFormValidity() {
      return this.inputtedResi === ''
    },
    resetModal() {
      this.inputtedResi = ''
      this.warnTextModal = ''
      this.okTitleButton = 'Cek Resi'
      this.cancelTitleButton = 'Batal'
      this.modalState = 'default'
    },
    handleOkModal(bvModalEvt) {
      if (this.modalState === 'receipt') {
        /* show succes popup */
        this.handleShowSuccesModal()
      } else if (this.modalState !== 'receipt') {
        if (this.checkFormValidity()) {
          bvModalEvt.preventDefault()
          this.warnTextModal = 'No resi tidak valid'
        } else {
          this.handleOkModalShowReceipt(bvModalEvt)
        }
      }
    },
    handleOkModalShowReceipt(bvModalEvt) {
      this.okTitleButton = 'Simpan'
      this.cancelTitleButton = 'Kembali'
      this.modalState = 'receipt'
      bvModalEvt.preventDefault()
    },
    handleShowSuccesModal() {
      this.$root.$emit('bv::show::modal', 'modal-4')
    },
  },
}
</script>
