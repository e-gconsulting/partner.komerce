import {
  BCol,
  BRow,
  BListGroup,
  BListGroupItem,
  BFormSelect,
  BCard,
  BOverlay,
  BModal,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import { Indonesian } from 'flatpickr/dist/l10n/id'
import 'flatpickr/dist/themes/light.css'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BCol,
    BRow,
    BCard,
    vSelect,
    flatPickr,
    BModal,
  },
  data() {
    return {
      addressSender: '',
      listGudang: [],
      listEkspedisi: [],
      listProdukEdit: [],
      listProdukDB: [],
      KirimEkspedisi: false,
      KirimSendiri: false,
      warehouse: '',
      shippingType: null,
      ekspedisi: '',
      TambahProduct: false,
      TableProduct: false,
      pickupDate: '',
      EstimateDate: '',
      configDate: {
        wrap: true,
        altFormat: 'j F Y',
        altInput: true,
        minDate: 'today',
        altInputClass: 'bg-white form-control',
        locale: Indonesian,
      },
      selectAllOrder: false,
      selectedOrder: [],
      selectedDummyOrder: [],
      noResi: '',
      DisabledSubmit: true,
      disabledAddProduct: true,
      search: '',
      warehouse_Id: '',
      StatusSelectOrder: false,
    }
  },
  mounted() {
    this.listWarehouse()
    this.listKurir()
  },
  methods: {
    async listWarehouse() {
      await this.$http_komship.get('/v1/komship/inbound/warehouses')
        .then(response => {
          this.listGudang = response.data.data
        })
    },
    listKurir() {
      this.$http_komship.get('/v1/komship/inbound/rajaongkir-shippings')
        .then(response => {
          this.listEkspedisi = response.data.data
        })
    },
    listProduct() {
      this.$http_komship.get(`/v1/komship/inbound/${this.warehouse.warehouse_id}/products`)
        .then(response => {
          this.listProdukDB = response.data.data.map(item => ({
            ...item,
            isActive: false,
            stockEdit: 0,
            variant: item.variant.map(variant => ({
              ...variant,
              stockEdit: 0,
            })),
          }))
          this.listProdukEdit = this.listProdukDB
        })
    },
    searchProduct(array, search) {
      const regex = new RegExp(search, 'i')
      this.listProdukEdit = array.filter(item => regex.test(item.product_name))
    },
    Ekspedisi() {
      this.KirimEkspedisi = true
      this.KirimSendiri = false
      if (this.KirimSendiri) {
        this.shippingType = 1
      } if (this.KirimEkspedisi) {
        this.shippingType = 2
      }
    },
    Sendiri() {
      this.KirimSendiri = true
      this.KirimEkspedisi = false
      if (this.KirimSendiri) {
        this.shippingType = 1
      } if (this.KirimEkspedisi) {
        this.shippingType = 2
      }
    },
    back() {
      this.TambahProduct = !this.TambahProduct
      if (this.selectedOrder.length > 0 && this.StatusSelectOrder === true) {
        this.TableProduct = !this.TambahProduct
      } else {
        this.TableProduct = false
      }
    },
    addProduct() {
      this.TambahProduct = !this.TambahProduct
      this.TableProduct = !this.TambahProduct
    },
    inputStock(stock, product, index, item) {
      if (stock < 0) {
        this.listProdukEdit[product].variant[index].stockEdit = 0
        // eslint-disable-next-line no-param-reassign
        item.isActive = false
      } else {
        // eslint-disable-next-line no-param-reassign
        item.isActive = true
      }
    },
    inputStockNoVariant(stock, product, item) {
      if (stock < 0) {
        this.listProdukEdit[product].stockEdit = 0
        // eslint-disable-next-line no-param-reassign
        item.isActive = false
      } else {
        // eslint-disable-next-line no-param-reassign
        item.isActive = true
      }
    },
    setQuantity(status, product, index, item) {
      if (status === 'plus') {
        // eslint-disable-next-line no-plusplus
        this.listProdukEdit[product].variant[index].stockEdit++
        if (this.listProdukEdit[product].variant[index].stockEdit > 0) {
          // eslint-disable-next-line no-param-reassign
          item.isActive = true
        }
      } else if (status === 'minus') {
        this.listProdukEdit[product].variant[index].stockEdit -= 1
        if (this.listProdukEdit[product].variant[index].stockEdit <= 0) {
          this.listProdukEdit[product].variant[index].stockEdit = 0
          // eslint-disable-next-line no-param-reassign
          item.isActive = false
        }
      }
    },
    setQuantityNoVariant(status, product, item) {
      if (status === 'plus') {
        // eslint-disable-next-line no-plusplus
        this.listProdukEdit[product].stockEdit++
        if (this.listProdukEdit[product].stockEdit > 0) {
          // eslint-disable-next-line no-param-reassign
          item.isActive = true
        }
      } else if (status === 'minus') {
        this.listProdukEdit[product].stockEdit -= 1
        if (this.listProdukEdit[product].stockEdit <= 0) {
          this.listProdukEdit[product].stockEdit = 0
          // eslint-disable-next-line no-param-reassign
          item.isActive = false
        }
      }
    },
    async submitInbound() {
      this.DisabledSubmit = true
      const product = await this.selectedOrder.map(object => ({
        product_id: object.id,
        is_variant: object.is_variant,
        total_inbound: object.stockEdit,
        variant: object.variant.map(variant => ({
          option_id: variant.option_id,
          total_inbound: variant.stockEdit,
        })),
      }))

      const formdata = {
        send_from: null,
        send_to: this.warehouse.warehouse_id,
        address_sender: this.addressSender,
        shipping_type: this.shippingType,
        shipping_date: this.pickupDate,
        estimate_date: this.EstimateDate,
        shipping: this.ekspedisi.courier_code,
        no_resi: this.noResi,
        product,

      }
      await this.$http_komship
        .post('/v1/komship/inbound/store', formdata)
        .then(response => {
          if (response.status === 200) {
            this.$bvModal.show('success-inbound')
          }
        })
        .catch(err => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Failure',
              icon: 'AlertCircleIcon',
              text: err,
              variant: 'danger',
            },
          }, 2000)
        })
    },
    submitDisabled() {
      let result = true
      if (this.DisabledSubmit === false && (this.addressSender !== '' && this.warehouse !== '' && ((this.ekspedisi !== '' && this.noResi !== '') || (this.pickupDate !== '' && this.estimateDate !== '')))) {
        result = false
      } else {
        result = true
      }
      return result
    },
    AddProductDisabled(e) {
      this.listProduct()
      if (e !== '') {
        this.disabledAddProduct = false
      }
    },
    addStockNow() {
      this.TambahProduct = !this.TambahProduct
      this.selectedOrder = this.selectedDummyOrder
      if (this.selectedOrder.length > 0) {
        this.TableProduct = !this.TambahProduct
        this.StatusSelectOrder = true
        this.DisabledSubmit = false
      } else {
        this.DisabledSubmit = true
      }
    },
    setData(data) {
      this.selectedDummyOrder = data.filter(item => item.isActive === true)
    },
  },
}
