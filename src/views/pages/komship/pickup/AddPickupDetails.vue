<template>
  <div class="add-pickup-details-main-wrapper">
    <b-button
      class="org-button no-mg mb-4"
      @click="onUpdateScreenViewParent"
    >
      <b-icon-chevron-left
        aria-hidden="true"
      />
    </b-button>

    <div class="add-pickup-details-title">
      Detail Orderan Pickup
    </div>

    <b-button
      class="org-button floating-print-button mt-2"
      @click="onShowModalPrint"
    >
      + Print Semua Label
    </b-button>

    <div class="add-pickup-input-notice-notif mt-2">
      <b-badge variant="light-warning">*Pastikan produk yang kamu masukan sudah tepat sebelum di ajukan</b-badge>
    </div>

    <data-order-table
      ref="pickupDetailsAdd"
      :items="listSelected"
      :fields="fields"
      table-ref-name="pickupDetailsAdd"
      :is-use-detail-address="true"
    />

    <add-pickup-popup-print
      ref="addPickupPopUpPrint"
      :selected-option="printOption"
      @onSubmitOption="onSubmitPrint"
    />
  </div>
</template>

<script>
import {
  BButton,
  BIconChevronLeft,
  BBadge,
} from 'bootstrap-vue'
import DataOrderTable from '../order/DataOrderTable.vue'
import AddPickupPopupPrint from './AddPickupPopupPrint.vue'

export default {
  components: {
    BButton,
    BIconChevronLeft,
    BBadge,
    DataOrderTable,
    AddPickupPopupPrint,
  },
  props: {
    listSelected: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      printOption: 0,
      fields: [
        { key: 'order_date', label: 'Tanggal Order' },
        { key: 'customer_name', label: 'Pelanggan' },
        { key: 'product', label: 'Produk' },
        { key: 'district', label: 'Alamat' },
        { key: 'airway_bill', label: 'No Resi' },
      ],
    }
  },
  mounted() {
    console.log('listSelected', this.listSelected)
  },
  methods: {
    onUpdateScreenViewParent() {
      this.$emit('onBackButtonClicked')
    },
    onShowModalPrint() {
      console.log('onShowModalPrint')
      this.$refs.addPickupPopUpPrint.showModal()
    },
    onSubmitPrint(values) {
      console.log('onSubmitPrint')
      if (values) this.printOption = values
      console.log('onSubmitPrint2222', this.printOption)
    },
  },
}
</script>

<style lang="scss">
  @import '../order/data-order.scss';
  @import './add-pickup-detail.scss';
</style>
