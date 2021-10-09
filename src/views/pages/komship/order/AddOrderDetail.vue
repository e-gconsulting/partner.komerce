<template>
  <div class="add-order-main-wrapper">
    <b-button
      class="next-button no-mg"
      @click="onUpdateScreenViewParent"
    >
      <b-icon-chevron-left
        aria-hidden="true"
      />
    </b-button>
    <b-card-title class="mt-4 mb-4">Tambah Order</b-card-title>
    <div class="add-order-dsc-title top-right">Pengiriman Kompship</div>
    <section class="add-order-form mb-4">
      <b-form-group
        class="add-order-label mb-2"
        label="Tanggal"
        label-cols-md="3"
        label-for="input-date2"
      >
        <div class="add-order-date-label">{{ dateLabel }}</div>
        <b-form-datepicker
          id="input-date2"
          ref="dp2"
          v-model="dateValue"
          class="add-order-date-button"
          button-only
          @context="onChangeDate"
        />
      </b-form-group>
      <b-form-group
        class="add-order-label mb-2"
        label="Nama Pelanggan"
        label-cols-md="3"
      >
        <b-form-input
          v-model="customerName"
          class="add-order-product-input-v-select"
          placeholder="Masukkan Nama"
        />
      </b-form-group>
      <b-form-group
        class="add-order-label mb-2"
        label="No Telepon"
        label-cols-md="3"
      >
        <b-form-input
          v-model="customerPhone"
          class="add-order-product-input-v-select"
          placeholder="Masukkan Nama"
        />
      </b-form-group>
      <b-form-group
        class="add-order-label mb-2"
        label="Masukan Kota/ Kabupaten"
        label-cols-md="3"
      >
        <b-form-input
          v-model="customerCity"
          class="add-order-product-input-v-select max-wd-411"
          placeholder="Masukan Kota/Kabupaten"
        />
      </b-form-group>
      <b-form-group
        class="add-order-label mb-2"
        label="Alamat Detail"
        label-cols-md="3"
      >
        <b-form-textarea
          v-model="customerAddress"
          class="add-order-product-input-v-select"
          placeholder="Masukan alamat lengkap"
          rows="4"
        />
      </b-form-group>
      <b-form-group
        class="add-order-label mb-2"
        label="Ekspedisi"
        label-cols-md="3"
      >
        <v-select
          class="add-order-product-input-v-select"
          label="product_name"
          label-cols-md="2"
        />
      </b-form-group>
      <b-form-group
        class="add-order-label mb-2"
        label="Metode Pembayaran"
        label-cols-md="3"
      >
        <v-select
          class="add-order-product-input-v-select"
          label="product_name"
          label-cols-md="2"
        />
      </b-form-group>
      <b-form-group
        class="add-order-label mb-2"
        label="Gunakan Potongan Harga"
        label-cols-md="3"
      >
        <div class="discount-button-wrapper">
          <b-icon-check-circle-fill
            v-if="isUseDiscount"
            aria-hidden="true"
            class="discount-checked-button"
            @click="useDiscount(isUseDiscount)"
          />
          <b-icon-circle
            v-else
            aria-hidden="true"
            class="discount-unchecked-button"
            @click="useDiscount(isUseDiscount)"
          />
        </div>
      </b-form-group>
      <b-form-group
        v-if="isUseDiscount"
        class="add-order-label"
        label="Nominal Potongan Harga"
        label-cols-md="3"
      >
        <b-form-input
          v-model="customerDiscountNumber"
          class="add-order-product-input-v-select"
          placeholder="0"
          @input="onInputDiscount"
        />
      </b-form-group>
    </section>

    <add-order-table
      ref="tableDetailOrderOne"
      :items="selectedItems"
      :fields="fields"
      table-ref-name="tableDetailOrder"
      :is-editable="false"
    />

    <section class="view-order-price">
      <b-form-group
        class="mb-2"
        label="Total Harga Produk"
        label-cols-md="5"
      >
        <div>{{ `Rp ${onNumberWithCommas(totalCostNumberFirst)}` }}</div>
      </b-form-group>
      <b-form-group
        class="mb-2"
        label="Ongkos Kirim"
        label-cols-md="5"
      >
        <div>{{ `Rp ${onNumberWithCommas(sendCostNumber)}` }}</div>
      </b-form-group>
      <b-form-group
        v-if="isUseDiscount"
        class="mb-2"
        label="Potongan Harga"
        label-cols-md="5"
      >
        <div>{{ `- Rp ${onNumberWithCommas(customerDiscountNumber)}` }}</div>
      </b-form-group>
      <b-form-group
        v-else
        class="mb-2 hide"
        label="Potongan Harga"
        label-cols-md="5"
      >
        <div>{{ `- Rp ${onNumberWithCommas(customerDiscountNumber)}` }}</div>
      </b-form-group>
      <b-form-group
        class="summary-little-container mb-2"
        label="Total Pembayaran (COD)"
        label-cols-md="5"
      >
        <div class="orange-bold">{{ `Rp ${onNumberWithCommas(totalCostNumberSecond)}` }}</div>
      </b-form-group>
      <div
        v-if="visibleCollapse"
        class="collapse-trigger-button"
        @click="showDetailPriceNetto"
      >
        Tutup
        <b-icon-chevron-up
          aria-hidden="true"
        />
      </div>
      <div
        v-else
        class="collapse-trigger-button"
        @click="showDetailPriceNetto"
      >
        Buka
        <b-icon-chevron-down
          aria-hidden="true"
        />
      </div>
      <b-collapse
        id="collapse-1"
        v-model="visibleCollapse"
        class="mt-2"
      >
        <b-form-group
          v-if="isUseDiscount"
          class="mb-2"
          label="Biaya COD (2,8% sudah termasuk PPN)"
          label-cols-md="5"
        >
          <div>{{ `- Rp ${onNumberWithCommas(codCutCost)}` }}</div>
        </b-form-group>
        <b-form-group
          class="mb-2"
          label="Ongkos Kirim (dipotong cashback 25%)"
          label-cols-md="5"
        >
          <div>{{ `- Rp ${onNumberWithCommas(sendCostNumberCut)}` }}</div>
        </b-form-group>
        <b-form-group
          class="orange-bold mb-2"
          label="Penghasilan bersih yang kamu dapatkan"
          label-cols-md="5"
        >
          <div>{{ `Rp ${onNumberWithCommas(totalCostNumberNetto)}` }}</div>
        </b-form-group>
      </b-collapse>
    </section>

    <section class="view-order-summary view-order-summary-details-mobile">
      <div class="add-order-summary-text detail-add-order-summary-text">
        <span>Total Pembayaran : <span class="orange-bold">{{ `Rp ${onNumberWithCommas(totalCostNumberSecond)}` }}</span></span>
      </div>
      <div class="add-order-summary-button-wrapper">
        <b-button
          class="next-button no-mg-mobile"
          @click="onCountButtonClicked"
        >
          Hitung
        </b-button>
        <b-button
          v-if="isCountButtonClicked"
          class="next-button"
          @click="handleShowPopUp"
        >
          Submit
        </b-button>
        <b-button
          v-else
          class="next-button"
          disabled
        >
          Submit
        </b-button>
      </div>
    </section>
    <b-modal
      id="modal-2"
      ref="modalAddOrderPopUp"
      hide-footer
      hide-header
      @hide="handleRedirectToDataOrder"
    >
      <div class="modal-add-order-popup-success">
        <div class="image-wrapper">
          <img src="https://s3-ap-southeast-1.amazonaws.com/www.theedgeproperty.com.sg/images/search_mobile.png">
        </div>
        <div class="text-wrapper">Berhasil Tambah Order</div>
        <b-button
          class="next-button no-mg"
          @click="handleRedirectToDataOrder"
        >
          Oke
        </b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import {
  BCardTitle,
  BFormDatepicker,
  BFormInput,
  BFormGroup,
  BFormTextarea,
  BCollapse,
  BButton,
  BIconCircle,
  BIconCheckCircleFill,
  BIconChevronLeft,
  BIconChevronUp,
  BIconChevronDown,
} from 'bootstrap-vue'
import AddOrderTable from './AddOrderTable.vue'

function changeDate(dateString) {
  if (dateString && dateString !== '') {
    let today = new Date(dateString)
    const dd = today.getDate()
    const monthArr = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
    const mm = today.getMonth()
    const yyyy = today.getFullYear()
    today = `${dd} ${monthArr[mm]} ${yyyy}`
    return today
  }
  return dateString
}

function numberWithCommas(x) {
  if (x) return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, '.')
  return x
}

function countTotalPrice(listData) {
  if (listData && listData.length && listData.length > 0) {
    let totalPrice = 0
    for (let i = 0; i < listData.length; i += 1) {
      const basePrice = listData[i].priceNumber
      const subtotalPrice = basePrice * listData[i].total.input
      totalPrice += subtotalPrice
    }
    return totalPrice
  }
  return 0
}

export default {
  components: {
    BCardTitle,
    BFormDatepicker,
    BFormInput,
    BFormGroup,
    BFormTextarea,
    BCollapse,
    BButton,
    vSelect,
    BIconCircle,
    BIconCheckCircleFill,
    BIconChevronLeft,
    BIconChevronUp,
    BIconChevronDown,
    AddOrderTable,
  },
  props: {
    screens: {
      type: String,
      default: '',
    },
    dateText: {
      type: String,
      default: '',
    },
    listSelected: {
      type: Array,
      default: () => [],
    },
    totalCost: {
      type: Number,
      default: 180000,
    },
    sendCost: {
      type: Number,
      default: 30000,
    },
  },
  data() {
    return {
      dateValue: this.dateText,
      dateLabel: '',
      customerName: '',
      customerPhone: '',
      customerCity: '',
      customerAddress: '',
      isUseDiscount: false,
      customerDiscountNumber: 0,
      codCutCost: 0,
      sendCostNumber: this.sendCost,
      sendCostNumberCut: (this.sendCost * 0.25),
      totalCostNumberFirst: countTotalPrice(this.listSelected),
      totalCostNumberSecond: 0,
      totalCostNumberNetto: 0,
      totalCostNumber: this.totalCost,
      visibleCollapse: true,
      isCountButtonClicked: false,
      fields: [
        { key: 'no', label: 'No' },
        { key: 'name', label: 'Nama Produk' },
        { key: 'price', label: 'Harga Satuan' },
        { key: 'total', label: 'Jumlah' },
        { key: 'subtotal', label: 'Subtotal' },
      ],
      selectedItems: this.listSelected,
    }
  },
  mounted() {
    this.onUpdateOverAllPrice()
  },
  methods: {
    onChangeDate(ctx) {
      if (ctx && ctx.activeYMD) {
        this.dateLabel = changeDate(ctx.activeYMD)
        this.$emit('onUpdateDate', ctx.activeYMD)
      }
    },
    onNumberWithCommas(x) {
      return numberWithCommas(x)
    },
    onUpdateAllPrice() {
      this.totalCostNumberSecond = this.totalCostNumberFirst + this.sendCostNumber - this.customerDiscountNumber
    },
    onUpdateNettoPrice() {
      this.totalCostNumberNetto = this.totalCostNumberSecond - this.codCutCost - this.sendCostNumberCut
    },
    onUpdateOverAllPrice() {
      this.totalCostNumberFirst = countTotalPrice(this.listSelected)
      this.onUpdateAllPrice()
      this.onUpdateNettoPrice()
    },
    handleShowPopUp() {
      this.$root.$emit('bv::show::modal', 'modal-2')
    },
    onUpdateScreenViewParent() {
      const newInputScreen = this.screens === 'input' ? 'details' : 'input'
      this.$emit('onUpdateScreenView', newInputScreen)
    },
    useDiscount() {
      this.isUseDiscount = !this.isUseDiscount
      this.codCutCost = this.isUseDiscount ? (this.totalCostNumberFirst * 0.028) : 0
      this.onUpdateOverAllPrice()
    },
    onInputDiscount() {
      this.onUpdateOverAllPrice()
    },
    showDetailPriceNetto() {
      this.visibleCollapse = !this.visibleCollapse
    },
    onCountButtonClicked() {
      this.isCountButtonClicked = !this.isCountButtonClicked
    },
    handleRedirectToDataOrder() {
      this.$router.push('data-order')
    },
  },
}
</script>
