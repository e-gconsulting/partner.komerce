import vSelect from 'vue-select'
import dateFormat from 'dateformat'
import {
  BCardTitle,
  BFormDatepicker,
  BFormInput,
  BFormGroup,
  BFormTextarea,
  BInputGroup,
  BInputGroupPrepend,
  BCollapse,
  BSpinner,
  BButton,
  BIconCircle,
  BIconCheckCircleFill,
  BIconChevronUp,
  BIconChevronDown,
  BTable,
  BCard,
  BRow,
  BCol,
  BAvatar,
} from 'bootstrap-vue'

import {
  formatFullDate,
} from 'node-format-date'
import { formatDate } from '@/@core/utils/filter'

function numberWithCommas(x) {
  if (x) return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, '.')
  return x
}

// function genBasePrice(pointedVariant) {
//   if (pointedVariant && pointedVariant.length && pointedVariant.length > 0) {
//     let newPrice = 0
//     for (let j = 0; j < pointedVariant.length; j += 1) {
//       if (pointedVariant[j]) {
//         newPrice += pointedVariant[j].price
//       }
//     }
//     return newPrice
//   }
//   return 0
// }

function countTotalPrice(listData) {
  // Refactor
  if (listData.length > 0) {
    let totalPrice = 0
    // eslint-disable-next-line no-plusplus
    for (let x = 0; x < listData.length; x++) {
      const basePrice = listData[x].variant[0] !== undefined ? listData[x].itemSelected.price : listData[x].price
      const subtotalPrice = basePrice * listData[x].stockToDisplay
      totalPrice += subtotalPrice
    }
    return totalPrice
  }

  //   if (listData && listData.length && listData.length > 0) {
  //     let totalPrice = 0
  //     for (let i = 0; i < listData.length; i += 1) {
  //       const basePrice = listData[i].is_variant ? genBasePrice(listData[i].selectedVariationData) : listData[i].price
  //       const subtotalPrice = basePrice * listData[i].input
  //       totalPrice += subtotalPrice
  //     }
  //     return totalPrice
  //   }
  return 0
}

function getVariantPerItem(listData) {
  if (listData && listData.itemSelected !== {}) {
    const variantData = {}
    // for (let i = 0; i < listData.selectedVariationData.length; i += 1) {
    //   variantData.id = i === 0 || i === (listData.selectedVariationData.length - 1) ? listData.selectedVariationData[i].options_id : (`${listData.selectedVariationData[i].options_id}, `)
    //   variantData.name = i === 0 || i === (listData.selectedVariationData.length - 1) ? listData.selectedVariationData[i].name : (`${listData.selectedVariationData[i].name} - `)
    //   variantData.price = genBasePrice(listData.selectedVariationData)
    // }
    variantData.id = listData.itemSelected.option_id
    variantData.name = listData.itemSelected.variation
    variantData.price = listData.itemSelected.price
    return variantData
  }
  return {}
}

export default {
  components: {
    BCardTitle,
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
    BIconChevronUp,
    BIconChevronDown,
    BTable,
    BCard,
    BCol,
    BRow,
    BAvatar,
    BSpinner,
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
  },
  data() {
    return {
      customerDate: '',
      customerName: '',
      dateValue: '',
      dateLabel: '',
      address_id: null,
      isLoadingCount: false,
      customerId: '',
      detailCustomerList: [],
      customerTariffCode: '',
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
      date: null,
      fields: [
        { key: 'no', label: 'No' },
        { key: 'product_name', label: 'Nama Produk' },
        { key: 'price', label: 'Harga Satuan' },
        { key: 'input', label: 'Jumlah' },
        { key: 'subtotal', label: 'Subtotal' },
      ],
      selectedItems: this.listSelected,
      cartOrder: [],
      customersList: [],
      profile: [],
      itemsCheckoutOrder: [],
      fieldsOrder: [
        {
          key: 'no',
          label: 'No',
        },
        {
          key: 'product_name',
          label: 'Nama Produk',
        },
        {
          key: 'price',
          label: 'Harga Satuan',
          tdClass: 'text-center',
          thClass: 'text-center',
        },
        {
          key: 'jumlah',
          label: 'Jumlah',
          tdClass: 'text-center',
          thClass: 'text-center',
        },
        {
          key: 'subtotal',
          label: 'Subtotal',
          tdClass: 'text-center',
          thClass: 'text-center',
        },
      ],
    }
  },
  mounted() {
    const currentDate = new Date()
    this.customerDate = dateFormat(currentDate, 'yyyy-mm-dd')
    this.date = formatFullDate(currentDate)
    this.onUpdateOverAllPrice()
    this.getProfile()
    this.itemsCheckoutOrder = this.$route.params.itemsOrder
    this.address_id = this.$route.params.address_id
    this.dateValue = this.$route.params.dateValue
    this.dateLabel = this.$route.params.dateLabel
    this.getCustomer()
  },
  methods: {
    getCustomer() {
      return this.$http_komship.get('v1/customer').then(response => {
        const { data } = response.data
        this.customersList = data
      }).catch(() => {
        console.log('failed to get the profile data')
      })
    },
    getProfile() {
      return this.$http_komship.post('v1/my-profile').then(response => {
        const { data } = response.data
        this.profile = data
      }).catch(() => {
        console.log('failed to get the profile data')
      })
    },
    onChangeDate(ctx) {
      if (ctx && ctx.activeYMD) {
        this.customerDate = this.changeDate(ctx.activeYMD)
        this.$emit('onUpdateDate', ctx.activeYMD)
      }
    },
    changeDate(dateString, type) {
      if (dateString && dateString !== '') {
        let today = new Date(dateString)
        const dd = today.getDate()
        const monthArr = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
        const mm = today.getMonth()
        const yyyy = today.getFullYear()
        today = `${dd} ${monthArr[mm]} ${yyyy}`
        if (type && type === 2) {
          today = `${yyyy}-${mm + 1}-${dd}`
        }
        return today
      }
      return dateString
    },
    onNumberWithCommas(x) {
      return numberWithCommas(x)
    },
    onUpdateAllPrice() {
      // eslint-disable-next-line radix
      this.sumAllProductWithShipPrice = parseInt(this.sumAllProduct) + parseInt(this.sendCostNumber) - parseInt(this.customerDiscountNumber)
    },
    onUpdateNettoPrice() {
      this.totalCostNumberNetto = this.sumAllProductWithShipPrice - this.serviceFeeCutCost - this.sendCostNumberCut
    },
    onUpdateOverAllPrice() {
      this.sumAllProduct = countTotalPrice(this.itemsCheckoutOrder)
      this.onUpdateAllPrice()
      this.onUpdateNettoPrice()
    },
    handleSaveOrder() {
      this.submitOrder()
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
      this.onCountButtonClicked()
    },
    onAddShipping(itemSelected) {
      this.customerShippingMethod = itemSelected
    },
    onAddExpeditionOption(itemSelected) {
      this.customerExpeditionOption = itemSelected
    },
    onAddPaymentMethod(itemSelected) {
      this.customerPaymentMethod = itemSelected
      this.onCountButtonClicked()
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
          if (dataArr[j].shipping_type) {
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
    genCart(dataArr) {
      const newCart = []
      let cartItem = {}
      if (dataArr && dataArr.length && dataArr.length > 0) {
        for (let j = 0; j < dataArr.length; j += 1) {
          if (dataArr[j]) {
            const isVariant = dataArr[j].variant[0] !== undefined
            const variantData = isVariant ? getVariantPerItem(dataArr[j]) : {}
            cartItem = {
              product_id: dataArr[j].product_id,
              product_name: dataArr[j].product_name,
              variant_id: isVariant ? variantData.id : 0,
              variant_name: isVariant ? variantData.name : 0,
              product_price: isVariant ? variantData.price : dataArr[j].price,
              product_weight: dataArr[j].weight,
              qty: dataArr[j].stockToDisplay,
              subtotal: dataArr[j].stockToDisplay * (isVariant ? variantData.price : dataArr[j].price),
            }
            newCart.push({ ...cartItem })
          }
        }
      }
      return newCart
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
    alertFailBalance(textWarn) {
      this.$swal({
        title: `<span class="font-weight-bold h4">${textWarn}</span>`,
        imageUrl: require('@/assets/images/icons/fail.svg'), // eslint-disable-line
        showCancelButton: true,
        focusConfirm: true,
        confirmButtonText: 'Oke',
        cancelButtonText: 'Cek Saldo',
        customClass: {
          confirmButton: 'btn border btn-outline rounded-lg',
          cancelButton: 'btn bg-orange2  btn-primary  rounded-lg',
        },
        buttonsStyling: false,
      }).then(result => {
        if (!result.isConfirmed) {
          this.$router.push({ name: 'saldo' })
        }
      })
    },
    alertSuccess(textWarn) {
      this.$swal({
        title: `<span class="font-weight-bold h4">${textWarn}</span>`,
        imageUrl: require('@/assets/images/icons/success.svg'), // eslint-disable-line
        showCloseButton: false,
        focusConfirm: true,
        confirmButtonText: 'Oke',
        customClass: {
          confirmButton: 'btn bg-orange2 btn-primary rounded-lg',
        },
        buttonsStyling: false,
      }).then(() => this.$router.push({ name: 'data-order' }))
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
    findCity(label, listArr) {
      for (let j = 0; j < listArr.length; j += 1) {
        if (listArr[j] && listArr[j].label === label) {
          return listArr[j]
        }
      }
      return {}
    },
    findCustomer(names, listArr) {
      for (let j = 0; j < listArr.length; j += 1) {
        if (listArr[j] && listArr[j].name === names) {
          return listArr[j]
        }
      }
      return {}
    },
    handleChangeCustomer(_text) {
      const split = _text.split(',')
      const text = split[0]
      if (text && this.detailCustomerList.length && this.detailCustomerList.length > 0) {
        const chosenCustomerData = this.findCustomer(text, this.detailCustomerList)
        if (chosenCustomerData && chosenCustomerData.customer_id) {
          this.customerName = chosenCustomerData.name
          this.customerTariffCode = chosenCustomerData.tariff_code
          this.customerId = chosenCustomerData.customer_id
          this.customerPhone = chosenCustomerData.phone[0] === '0' ? chosenCustomerData.phone.substring(1) : chosenCustomerData.phone
          this.customerAddress = chosenCustomerData.address
        } else {
          this.customerId = 0
        }
      }
    },
    async onCountButtonClicked() {
      this.onUpdateOverAllPrice()
      const validForm = this.formCheck()
      if (validForm) await this.calculate()
    },
    async handleSearchCity(text) {
      await this.searchCustomerCity(text)
    },
    async handleSearchCustomer(text) {
      await this.searchCustomerDetail(text)
    },
    async submitOrder() {
      const cityChosen = this.findCity(this.customerCity, this.destinationCity)
      const formData = {
        date: this.changeDate(this.dateValue, 2),
        tariff_code: this.customerTariffCode !== '' ? this.customerTariffCode : cityChosen.value,
        subdistrict_name: cityChosen.subdistrict_name,
        district_name: cityChosen.district_name,
        city_name: cityChosen.city_name,
        is_komship: this.profile.is_komship,
        customer_id: this.customerId,
        customer_name: this.customerName,
        customer_phone: this.customerPhoneCode !== '' ? `0${this.customerPhone}` : null,
        detail_address: this.customerAddress,
        shipping: this.customerShippingMethod,
        shipping_type: this.customerExpeditionOption,
        payment_method: this.customerPaymentMethod,
        bank: null,
        partner_address_id: this.address_id,
        bank_account_name: null,
        bank_account_no: null,
        subtotal: this.sumAllProduct,
        grandtotal: this.sumAllProductWithShipPrice,
        shipping_cost: this.totalCostNumber.shipping_cost,
        service_fee: this.totalCostNumber.service_fee,
        discount: this.totalCostNumber.discount,
        shipping_cashback: this.totalCostNumber.cashback,
        net_profit: this.totalCostNumberNetto,
      }
      await this.storeSelectedItemsToCart(formData)
    },
    async storeSelectedItemsToCart(formData) {
      const allItemsToPost = this.genCart(this.itemsCheckoutOrder)
      await this.onPostCart(allItemsToPost)
      Object.assign(formData, { cart: this.cartOrder })
      this.storeOrder(formData)
    },
    async storeOrder(formData) {
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
    searchCustomerDetail(customerName) {
      return this.$http_komship.get(`v1/customer?search=${customerName}`).then(response => {
        const { data } = response.data
        this.detailCustomerList = data
      }).catch(() => {
        console.log('fail to search customer')
      })
    },
    calculate() {
      this.isCalculating = true
      return this.$http_komship.get('v1/calculate', {
        params: {
          partner_address_id: this.address_id,
          discount: this.customerDiscountNumber,
          shipping: this.customerShippingMethod,
          tariff_code: this.findCity(this.customerCity, this.destinationCity).value,
          payment_method: this.customerPaymentMethod,
          cart: this.sumAllProduct,
        },
      }).then(response => {
        const { data } = response.data
        this.totalCostNumber = this.findCorrectData(data)
        this.isCalculating = false
        this.calculateOnView()
      }).catch(() => {
        this.isCalculating = false
        this.alertFail('Unable to calculate the table data. Please check on Ekspedisi, Opsi Pengiriman, and Metode Pembayaran and try again later or contact support.')
      })
    },
    onPostOrder(formData) {
      this.isSubmitting = true
      if (formData.bank === null) {
        // eslint-disable-next-line no-param-reassign
        formData.bank = 0
      }
      if (formData.bank_account_name === null) {
        // eslint-disable-next-line no-param-reassign
        formData.bank_account_name = 0
      }
      if (formData.bank_account_no === null) {
        // eslint-disable-next-line no-param-reassign
        formData.bank_account_no = 0
      }
      return this.$http_komship.post(`v1/order/${this.profile.partner_id}/store`, formData).then(response => {
        const { data } = response.data
        if (data) {
          this.isSubmitting = false
          if (this.profile.is_onboarding !== true) {
            this.$emit('onBoardingShow')
          } else {
            this.handleShowPopUp()
          }
        }
        this.alertSuccess('Berhasil Tambah Order')
      }).catch(error => {
        this.isSubmitting = false
        if (error.response.data.code === 406) {
          return this.alertFailBalance('Mohon maaf, saldo anda tidak mencukupi untuk membuat order. Silahkan cek kembali saldo anda')
        }
        return this.alertFail('Unable to Update Your Cart. Please and try again later or contact support.')
      })
    },
    onPostCart(cartItem) {
      return this.$http_komship.post('v1/cart/bulk-store', cartItem).then(response => {
        const { data } = response.data
        this.cartOrder = data.cart_id
      }).catch(err => {
        this.alertFail('Unable to Update Your Cart. Please and try again later or contact support.')
      })
    },
    formatPrice(value) {
      const val = value
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
  },
}
