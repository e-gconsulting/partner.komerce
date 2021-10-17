<template>
  <div
    id="addOrderDetailsMainWrapper"
    class="add-order-main-wrapper"
  >
    <b-button
      class="next-button no-mg"
      @click="onUpdateScreenViewParent"
    >
      <b-icon-chevron-left
        aria-hidden="true"
      />
    </b-button>
    <b-card-title class="mt-4 mb-4">Tambah Order</b-card-title>
    <div class="add-order-dsc-title top-right">{{ profile && profile.is_komship === 1 ? 'Pengiriman Kompship' : 'Pengiriman Non Kompship' }}</div>
    <section class="add-order-form mb-4">
      <b-form-group
        class="add-order-label mb-2"
        label="Tanggal"
        label-cols-md="3"
        label-for="input-date2"
      >
        <div class="add-order-date-label">{{ customerDate }}</div>
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
          ref="addCustomerName"
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
        <b-input-group
          class="input-phone-add-order-details-wrapper"
        >
          <b-input-group-prepend>
            <v-select
              v-model="customerPhoneCode"
              :clearable="false"
              class="input-phone-code-add-order-details"
              label=""
              label-cols-md="2"
              :options="customerPhoneCodeList"
              @input="onChangePhoneCode"
            />
            <span class="straight-line" />
          </b-input-group-prepend>

          <b-form-input
            ref="addCustomerPhone"
            v-model.number="customerPhone"
            type="number"
            class="add-order-product-input-v-select input-phone-add-order-details"
            @input="onChangePhoneNumber"
          />
        </b-input-group>
      </b-form-group>
      <b-form-group
        class="add-order-label mb-2"
        label="Masukan Kota/ Kabupaten"
        label-cols-md="3"
      >
        <b-form-input
          ref="addCustomerCity"
          v-model="customerCity"
          class="add-order-product-input-v-select max-wd-411"
          placeholder="Masukan Kota/Kabupaten"
          list="city-list-id"
          @input="handleSearchCity"
        />
        <datalist id="city-list-id">
          <option
            v-for="(destination, destinationIndex) in destinationCity"
            :key="'optionCity'+destinationIndex"
          >
            {{ destination.label }}
          </option>
        </datalist>
      </b-form-group>
      <b-form-group
        class="add-order-label mb-2"
        label="Alamat Detail"
        label-cols-md="3"
      >
        <b-form-textarea
          ref="addCustomerAddress"
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
          ref="addShippingRef"
          class="add-order-product-input-v-select v-select-expedition-order-detail mr-1"
          label=""
          label-cols-md="2"
          :options="profile.shipping"
          @input="onAddShipping"
        />

        <v-select
          ref="expOptionRef"
          class="add-order-product-input-v-select v-select-expedition-order-detail"
          label=""
          label-cols-md="2"
          placeholder="Opsi Pengiriman"
          :options="expeditionOption"
          @input="onAddExpeditionOption"
        />
      </b-form-group>
      <b-form-group
        class="add-order-label mb-2 add-order-label-payment"
        label="Metode Pembayaran"
        label-cols-md="3"
      >
        <v-select
          ref="paymentMethodRef"
          class="add-order-product-input-v-select add-order-product-input-v-select-payment"
          label=""
          label-cols-md="2"
          :options="profile.payment_method"
          @input="onAddPaymentMethod"
        />
        <div class="anchor-exp-select-wrapper">
          <b-form-input
            ref="selectExpRef"
            class="anchor-exp-select"
          />
        </div>
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
          v-model.number="customerDiscountNumber"
          type="number"
          class="add-order-product-input-v-select"
          placeholder="0"
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
        <div>{{ `Rp ${onNumberWithCommas(sumAllProduct)}` }}</div>
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
        :label="`Total Pembayaran${customerPaymentMethod !== '' ? ` (${customerPaymentMethod})` : ''}`"
        label-cols-md="6"
      >
        <div class="orange-bold">{{ `Rp ${onNumberWithCommas(sumAllProductWithShipPrice)}` }}</div>
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
          :label="`Biaya ${customerPaymentMethod !== '' ? `${customerPaymentMethod}` : ''} (${serviceFeeLabel}% sudah termasuk PPN)`"
          label-cols-md="6"
        >
          <div>{{ `- Rp ${onNumberWithCommas(serviceFeeCutCost)}` }}</div>
        </b-form-group>
        <b-form-group
          class="mb-2"
          :label="`Ongkos Kirim (dipotong cashback ${cashbackLabel}%)`"
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
        <span>Total Pembayaran : <span class="orange-bold">{{ `Rp ${onNumberWithCommas(sumAllProductWithShipPrice)}` }}</span></span>
      </div>
      <div class="add-order-summary-button-wrapper">
        <b-button
          v-if="!isCalculating"
          class="next-button no-mg-mobile"
          @click="onCountButtonClicked"
        >
          Hitung
        </b-button>
        <b-button
          v-if="isCalculating"
          class="next-button no-mg-mobile"
          disabled
          @click="onCountButtonClicked"
        >
          Please wait...
        </b-button>
        <b-button
          v-if="isValidOrder"
          class="next-button"
          @click="handleSaveOrder"
        >
          Submit
        </b-button>
        <b-button
          v-else-if="!isValidOrder"
          class="next-button"
          disabled
        >
          Submit
        </b-button>
        <b-button
          v-else-if="isSubmitting"
          class="next-button"
          disabled
        >
          Please wait...
        </b-button>
      </div>
    </section>
    <b-modal
      id="modal-2"
      ref="modalAddOrderPopUp"
      hide-footer
      hide-header
      centered
      @hide="handleRedirectToDataOrder"
    >
      <div class="modal-add-order-popup-success">
        <div class="image-wrapper">
          <img src="@/assets/images/icons/success.svg">
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
  BInputGroup,
  BInputGroupPrepend,
  BCollapse,
  BButton,
  BIconCircle,
  BIconCheckCircleFill,
  BIconChevronLeft,
  BIconChevronUp,
  BIconChevronDown,
} from 'bootstrap-vue'
import AddOrderTable from './AddOrderTable.vue'

function changeDate(dateString, format = 1) {
  if (dateString && dateString !== '') {
    let today = new Date(dateString)
    const dd = today.getDate()
    const monthArr = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
    const mm = today.getMonth()
    const yyyy = today.getFullYear()
    if (format === 1) {
      today = `${dd} ${monthArr[mm]} ${yyyy}`
    } else if (format === 2) {
      today = `${dd}-${monthArr[mm]}-${yyyy}`
    }
    return today
  }
  return dateString
}

function numberWithCommas(x) {
  if (x) return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, '.')
  return x
}

function genBasePrice(pointedVariant) {
  if (pointedVariant && pointedVariant.length && pointedVariant.length > 0) {
    let newPrice = 0
    for (let j = 0; j < pointedVariant.length; j += 1) {
      if (pointedVariant[j]) {
        newPrice += pointedVariant[j].price
      }
    }
    return newPrice
  }
  return 0
}

function countTotalPrice(listData) {
  if (listData && listData.length && listData.length > 0) {
    let totalPrice = 0
    for (let i = 0; i < listData.length; i += 1) {
      const basePrice = listData[i].is_variant ? genBasePrice(listData[i].selectedVariationData) : listData[i].price
      const subtotalPrice = basePrice * listData[i].input
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
    BInputGroup,
    BInputGroupPrepend,
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
    isOnboarding: {
      type: Boolean,
      default: false,
    },
    profile: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      dateValue: this.dateText,
      customerDate: '',
      customerName: '',
      customerPhone: '',
      customerPhoneCode: '+62',
      customerPhoneCodeList: ['+62'],
      customerAddress: '',
      customerCity: '',
      destinationCity: [],
      customerPaymentMethod: '',
      customerShippingMethod: '',
      customerExpeditionOption: '',
      expeditionOption: ['OKE', 'REG', 'YES'],
      isUseDiscount: false,
      customerDiscountNumber: 0,
      serviceFeeCutCost: 0,
      serviceFeeLabel: 0,
      sendCostNumber: 0,
      sendCostNumberCut: 0,
      cashbackLabel: 0,
      sumAllProduct: countTotalPrice(this.listSelected),
      sumAllProductWithShipPrice: 0,
      totalCostNumberNetto: 0,
      totalCostNumber: [],
      visibleCollapse: true,
      isValidOrder: false,
      isCalculating: false,
      isSubmitting: false,
      fields: [
        { key: 'no', label: 'No' },
        { key: 'product_name', label: 'Nama Produk' },
        { key: 'price', label: 'Harga Satuan' },
        { key: 'input', label: 'Jumlah' },
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
        this.customerDate = changeDate(ctx.activeYMD)
        this.$emit('onUpdateDate', ctx.activeYMD)
      }
    },
    onNumberWithCommas(x) {
      return numberWithCommas(x)
    },
    onUpdateAllPrice() {
      this.sumAllProductWithShipPrice = this.sumAllProduct + this.sendCostNumber - this.customerDiscountNumber
    },
    onUpdateNettoPrice() {
      this.totalCostNumberNetto = this.sumAllProductWithShipPrice - this.serviceFeeCutCost - this.sendCostNumberCut
    },
    onUpdateOverAllPrice() {
      this.sumAllProduct = countTotalPrice(this.listSelected)
      this.onUpdateAllPrice()
      this.onUpdateNettoPrice()
    },
    handleSaveOrder() {
      if (this.isOnboarding) {
        this.$emit('onBoardingShow')
      } else {
        this.submitOrder()
      }
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
      this.customerDiscountNumber = this.isUseDiscount ? this.customerDiscountNumber : 0
    },
    onAddShipping(itemSelected) {
      this.customerShippingMethod = itemSelected
    },
    onAddExpeditionOption(itemSelected) {
      this.customerExpeditionOption = itemSelected
    },
    onAddPaymentMethod(itemSelected) {
      this.customerPaymentMethod = itemSelected
    },
    onChangePhoneCode(itemSelected) {
      this.customerPhoneCode = itemSelected
    },
    onChangePhoneNumber(phoneNumber) {
      if (phoneNumber) this.customerPhone = phoneNumber
    },
    showDetailPriceNetto() {
      this.visibleCollapse = !this.visibleCollapse
    },
    handleRedirectToDataOrder() {
      this.$router.push('data-order')
    },
    findCorrectData(dataArr) {
      let selectedCost = {}
      if (dataArr && dataArr.length && dataArr.length > 0) {
        for (let j = 0; j < dataArr.length; j += 1) {
          if (dataArr[j] && dataArr[j].shipping_type && dataArr[j].shipping_type === this.customerExpeditionOption) {
            selectedCost = dataArr[j]
          }
        }
      }
      return selectedCost
    },
    calculateOnView() {
      this.sendCostNumber = this.totalCostNumber && typeof this.totalCostNumber.shipping_cost !== 'undefined' ? this.totalCostNumber.shipping_cost : 0
      this.serviceFeeCutCost = this.totalCostNumber && typeof this.totalCostNumber.service_fee !== 'undefined' ? this.totalCostNumber.service_fee : 0
      this.sendCostNumberCut = this.totalCostNumber && typeof this.totalCostNumber.cashback !== 'undefined' ? this.totalCostNumber.cashback : 0
      this.serviceFeeLabel = this.totalCostNumber && typeof this.totalCostNumber.service_fee_percentage !== 'undefined' ? this.totalCostNumber.service_fee_percentage.toString().replace('.', ',') : 0
      this.cashbackLabel = this.totalCostNumber && typeof this.totalCostNumber.cashback_percentage !== 'undefined' ? this.totalCostNumber.cashback_percentage.toString().replace('.', ',') : 0
      this.onUpdateOverAllPrice()
      this.isCalculating = false
      this.isValidOrder = true
    },
    alertFail(textWarn) {
      this.$swal({
        title: `<span class="font-weight-bold h4">${textWarn}</span>`,
        imageUrl: require('@/assets/images/icons/fail.svg'), // eslint-disable-line
        showCloseButton: false,
        focusConfirm: true,
        confirmButtonText: 'Oke',
        customClass: {
          confirmButton: 'btn bg-orange2 btn-primary rounded-lg',
        },
        buttonsStyling: false,
      })
    },
    formCheck() {
      let countValidation = 0
      if (this.customerName === '') {
        this.$refs.addCustomerName.focus()
        countValidation += 1
      } else if (this.customerPhone === '') {
        this.$refs.addCustomerPhone.focus()
        countValidation += 1
      } else if (this.customerCity === '') {
        this.$refs.addCustomerCity.focus()
        countValidation += 1
      } else if (this.customerAddress === '') {
        this.$refs.addCustomerAddress.focus()
        countValidation += 1
      } else if (typeof this.customerShippingMethod === 'undefined' || this.customerShippingMethod === '') {
        if (!this.$refs.addShippingRef.open) this.$refs.addShippingRef.select()
        this.$refs.selectExpRef.focus()
        countValidation += 1
      } else if (typeof this.customerExpeditionOption === 'undefined' || this.customerExpeditionOption === '') {
        if (!this.$refs.expOptionRef.open) this.$refs.expOptionRef.select()
        this.$refs.selectExpRef.focus()
        countValidation += 1
      } else if (typeof this.customerPaymentMethod === 'undefined' || this.customerPaymentMethod === '') {
        if (!this.$refs.paymentMethodRef.open) this.$refs.paymentMethodRef.select()
        this.$refs.selectExpRef.focus()
        countValidation += 1
      }
      if (countValidation > 0) {
        this.alertFail('Tidak Boleh Ada Field Yang Kosong!')
        return false
      }
      return true
    },
    async onCountButtonClicked() {
      this.onUpdateOverAllPrice()
      const validForm = this.formCheck()
      if (validForm) await this.calculate()
    },
    async handleSearchCity(text) {
      await this.searchCustomerCity(text)
    },
    async submitOrder() {
      console.log('customerDate', changeDate(this.customerDate, 2))
      console.log('destinationCityALL', this.destinationCity)
      console.log('tariff_code', this.destinationCity.value)
      console.log('subdistrict_name', this.destinationCity.subdistrict_name)
      console.log('district_name', this.destinationCity.district_name)
      console.log('city_name', this.destinationCity.city_name)

      console.log('profileAll', this.profile)
      console.log('customer_id', 0)
      console.log('profileAll', this.profile.is_komship)
      console.log('bank', null)
      console.log('bank_account_name', null)
      console.log('bank_account_no', null)

      console.log('customerName', this.customerName)
      console.log('customerPhoneCode', this.customerPhoneCode)
      console.log('customerPhone', this.customerPhone)
      console.log('customerAddress', this.customerAddress)
      console.log('customerShippingMethod', this.customerShippingMethod)
      console.log('customerExpeditionOption', this.customerExpeditionOption)
      console.log('customerPaymentMethod', this.customerPaymentMethod)
      console.log('subtotal', this.sumAllProduct)
      console.log('grandtotal', this.sumAllProductWithShipPrice)
      console.log('shipping_cost', this.totalCostNumber.shipping_cost)
      console.log('service_fee', this.totalCostNumber.service_fee)
      console.log('discount', this.totalCostNumber.discount)
      console.log('shipping_cashback', this.totalCostNumber.cashback)
      console.log('net_profit', this.totalCostNumberNetto)

      console.log('cart', this.selectedItems)

      const formData = {
        date: '2021-09-30',
        tariff_code: 'BDO10000',
        subdistrict_name: 'TUNJUNGMULI',
        district_name: 'KARANGMONCOL',
        city_name: 'PURBALINGGA',
        is_komship: 1,
        customer_id: 0,
        customer_name: 'Pak Muh',
        customer_phone: '09182938398',
        detail_address: 'rt.10. Pulogadung, jakarta',
        shipping: 'JNE',
        shipping_type: 'YES',
        payment_method: 'COD',
        bank: null,
        bank_account_name: null,
        bank_account_no: null,
        subtotal: 40000,
        grandtotal: 82000,
        shipping_cost: 42000,
        service_fee: 3500,
        discount: 0,
        shipping_cashback: 3750,
        net_profit: 113750,
        cart: this.selectedItems,
      }
      await this.onPostOrder(formData)
    },
    searchCustomerCity(cityName) {
      return this.$http_komship.get(`v1/destination?search=${cityName}`).then(response => {
        const { data } = response.data.data
        this.destinationCity = data
      }).catch(() => {
        console.log('fail to search destination')
      })
    },
    calculate() {
      this.isCalculating = true
      return this.$http_komship.get('v1/calculate', {
        params: {
          discount: this.customerDiscountNumber,
          shipping: this.customerShippingMethod,
          // tariff_code: this.destinationCity.value,
          tariff_code: 'CGK10510',
          payment_method: this.customerPaymentMethod,
          cart: this.sumAllProduct,
        },
      }).then(response => {
        const { data } = response.data
        console.log('dataCost', data)
        this.totalCostNumber = this.findCorrectData(data)
        this.calculateOnView()
      }).catch(() => {
        this.isCalculating = false
        this.alertFail('Unable to calculate the table data. Please check on Ekspedisi, Opsi Pengiriman, and Metode Pembayaran and try again later or contact support.')
      })
    },
    onPostOrder(formData) {
      this.isSubmitting = true
      return this.$http_komship.post(`v1/order/${this.profile.partner_id}/store`, {
        data: { ...formData },
      }).then(response => {
        const { data } = response.data
        console.log('detail post order', data)
        this.isSubmitting = false
        this.handleShowPopUp()
      }).catch(() => {
        this.isSubmitting = false
        this.alertFail('Unable to Send Your Order. Please and try again later or contact support.')
      })
    },
  },
}
</script>
