/* eslint-disable no-await-in-loop */
import LottieAnimation from 'lottie-vuejs/src/LottieAnimation.vue'
import flatPickr from 'vue-flatpickr-component'
import moment from 'moment'
import 'flatpickr/dist/themes/light.css'
import { Indonesian } from 'flatpickr/dist/l10n/id'
import { toInteger } from 'lodash'
import imageNull from '@/assets/images/avatars/image-null.png'
import iconWarning from '@/assets/images/icons/warning.svg'
import iconSuccess from '@/assets/images/icons/success.svg'

export default {
  components: { flatPickr, LottieAnimation },
  data() {
    return {
      profile: [],
      address: null,
      pickupDate: '',
      pickupTime: '',
      vehicle: '',
      order: [],
      token: '',
      addressList: [],
      vehicleList: [],
      totalProduct: 0,
      fieldProductPreview: [
        {
          key: 'product_name', label: 'Produk', thClass: 'pl-0', tdClass: 'pl-0',
        },
        {
          key: 'qty', label: 'Total', thClass: 'text-right', tdClass: 'text-right',
        },
      ],
      itemProductPreview: [],
      fieldOrderList: [
        { key: 'action', label: '' },
        {
          key: 'order_date', label: 'Tanggal Order', thClass: 'align-middle', tdClass: 'align-top min-w-[140px]',
        },
        {
          key: 'customer_name', label: 'Pelanggan', thClass: 'align-middle', tdClass: 'align-top',
        },
        {
          key: 'product', label: 'Produk', thClass: 'align-middle', tdClass: 'align-top p-0',
        },
        {
          key: 'grand_total', label: 'Total Pembayaran', thClass: 'align-middle', tdClass: 'align-top',
        },
        {
          key: 'detail_address', label: 'Alamat', thClass: 'align-middle', tdClass: 'align-top break-words',
        },
      ],
      itemOrderList: [],
      loading: false,
      limit: 50,
      offset: 0,
      selectedOrder: [],
      isLastOrder: false,
      selectAllOrder: false,
      configDate: {
        wrap: true,
        altFormat: 'j F Y',
        altInput: true,
        minDate: 'today',
        altInputClass: 'bg-white form-control',
        locale: Indonesian,
      },
      submitProgress: 0,
      submitStatus: true,
      submitPercentage: 0,
      fieldOrderError: [
        {
          key: 'order_date', label: 'Tanggal Order', thClass: 'align-middle', tdClass: 'align-top min-w-[140px]',
        },
        {
          key: 'customer_name', label: 'Pelanggan', thClass: 'align-middle', tdClass: 'align-top',
        },
        {
          key: 'product', label: 'Produk', thClass: 'align-middle', tdClass: 'align-top p-0',
        },
        {
          key: 'grand_total', label: 'Total Pembayaran', thClass: 'align-middle', tdClass: 'align-top',
        },
        {
          key: 'detail_address', label: 'Alamat', thClass: 'align-middle', tdClass: 'align-top break-words',
        },
      ],
      itemOrderError: [],
      totalOrderTimeout: 0,
    }
  },
  async created() {
    await this.getParamsData()
    await this.getAddressList()
    await this.getVehicleList()
    await this.generateToken()
  },
  methods: {
    formatNumber: value => (`${value}`).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
    formatPickupTime(value) {
      return `${(`0${value}`).slice(-2)} : 00`
    },
    getCurrentDate() {
      const hours = moment().format('HH')
      const minDate = moment().add(1, 'days').format('YYYY-MM-DD')
      if (hours >= 21) {
        this.configDate.minDate = minDate
        this.pickupDate = minDate
      } else {
        this.pickupDate = moment().format('YYYY-MM-DD')
      }
      this.pickupTime = this.formatPickupTime(hours)
      this.setPickupTime()
    },
    setPickupTime(action) {
      const today = moment()
      const minHours = today.format('HH') < 9 ? 9 : today.add(2, 'hours').format('HH')
      const pickupTime = toInteger(this.pickupTime.slice(0, 2))
      if (action === 'plus') {
        if (pickupTime >= 21) {
          this.pickupTime = this.formatPickupTime(21)
        } else {
          this.pickupTime = this.formatPickupTime(pickupTime + 1)
        }
      } else if (pickupTime <= minHours && this.pickupDate === today.format('YYYY-MM-DD')) {
        this.pickupTime = this.formatPickupTime(minHours)
      } else if (pickupTime <= 9) {
        this.pickupTime = this.formatPickupTime(9)
      } else if (action === 'minus') {
        this.pickupTime = this.formatPickupTime(pickupTime - 1)
      }
    },
    getParamsData() {
      if (this.$route.params.order) {
        this.address = this.$route.params.address
        this.pickupDate = this.$route.params.pickup_date
        this.pickupTime = this.$route.params.pickup_time
        this.vehicle = this.$route.params.vehicle
        this.order = this.$route.params.order
        const product = []
        this.order.forEach(element => {
          element.product.forEach(items => {
            product.push(items)
          })
        })
        this.totalProduct = product.length
        this.itemProductPreview = product.slice(0, 2)
      } else {
        this.getCurrentDate()
      }
    },
    async getVehicleList() {
      await this.$http_komship.post('v1/my-profile')
        .then(res => {
          const { data } = res.data
          this.profile = data
          this.vehicleList = data.vehicle
        })
    },
    async getAddressList() {
      this.loading = true
      await this.$http_komship.get('/v1/address')
        .then(res => {
          const { data } = res.data
          this.addressList = data
          if (this.addressList.length < 1) {
            this.$swal({
              html: '<span class="text-[18px]">Tambahkan Alamat Pick Up untuk melanjutkan kegiatan tambah order.</span>',
              imageUrl: iconWarning,
              confirmButtonText: 'Tambahkan Alamat Pickup',
              confirmButtonClass: 'btn btn-primary',
              allowOutsideClick: false,
            }).then(result => {
              if (result.isConfirmed) {
                this.$router.push('/gudangku')
              }
            })
          }
          if (this.address.length < 1) {
            const defaultAddress = data.find(items => items.is_default === 1)
            if (defaultAddress && this.address.length < 1) {
              this.address = defaultAddress
            }
          }
          this.loading = false
        })
        .catch(() => { this.loading = false })
    },
    async showAddressList() {
      if (this.addressList.length < 1) {
        await this.getAddressList()
      }
      this.$bvModal.show('modalSelectAddress')
      this.changeAttr()
    },
    onSelectAddress(data) {
      this.$bvModal.hide('modalSelectAddress')
      this.address = data
      this.totalProduct = 0
      this.itemProductPreview = []
      this.order = []
      this.itemOrderList = []
    },
    async getOrderList() {
      if (this.itemOrderList.length < 1) {
        this.loading = true
        await this.$http_komship.get(`v2/order/${this.profile.partner_id}`, {
          params: {
            order_status: 'Diajukan',
            partner_address_id: this.address.address_id,
            limit: this.limit,
            offset: this.offset,
          },
        })
          .then(async res => {
            const { data } = res.data
            this.itemOrderList = data
            this.offset = data.length
            this.loading = false
            if (data.length < this.limit) {
              this.isLastOrder = true
            } else {
              this.isLastOrder = false
            }
          })
          .catch(() => { this.loading = false })
      }
      this.selectedOrder = this.order
      this.$bvModal.show('modalSelectOrder')
      this.changeAttr()
    },
    async getNextOrderList(e) {
      e.preventDefault()
      if (e.target.scrollTop + e.target.clientHeight
        >= e.target.scrollHeight - 500) {
        if (this.isLastOrder || this.loading) return
        this.loading = true
        await this.$http_komship.get(`v2/order/${this.profile.partner_id}`, {
          params: {
            order_status: 'Diajukan',
            partner_address_id: this.address.address_id,
            limit: this.limit,
            offset: this.offset,
          },
        })
          .then(result => {
            const { data } = result.data
            this.itemOrderList.push(...data)
            this.offset += data.length
            this.loading = false
            if (data.length < this.limit) {
              this.isLastOrder = true
            }
          })
          .catch(err => {
            this.loading = false
            console.log(err.response)
          })
      }
    },
    submitSelectedOrder() {
      const product = []
      this.order = this.selectedOrder
      this.order.forEach(element => {
        element.product.forEach(items => {
          product.push(items)
        })
      })
      this.totalProduct = product.length
      this.itemProductPreview = product.slice(0, 2)
      this.$bvModal.hide('modalSelectOrder')
    },
    checklistSelectedOrder() {
      if (this.selectAllOrder) {
        this.selectedOrder = this.itemOrderList
      } else {
        this.selectedOrder = []
      }
    },
    removeSelectedOrder() {
      this.selectAllOrder = false
      this.selectedOrder = []
    },
    getShippingLabel(value) {
      if (value === 'REG19'
      || value === 'SIUNT'
      || value === 'STD'
      || value === 'IDlite'
      || value === 'CTC19') {
        return 'Reguler'
      } if (value === 'GOKIL') {
        return 'Cargo'
      }
      return value
    },
    setImageDefault(e) {
      e.target.src = imageNull
    },
    resetField() {
      this.address = null
      this.getAddressList()
      this.pickupDate = ''
      this.pickupTime = ''
      this.getCurrentDate()
      this.vehicle = ''
      this.itemProductPreview = []
      this.order = []
      this.itemOrderList = []
    },
    generateToken() {
      let result = ''
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      const charactersLength = characters.length
      for (let i = 0; i < 15; i += 1) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
      }
      this.token = result
    },
    onSubmitPickup() {
      this.$swal({
        html: `<span class="text-[18px] w-[564px]">
        Apakah kamu yakin untuk melakukan Pengajuan Pickup?
        Kurir akan menuju ke lokasi penjemputan kamu</span>`,
        imageUrl: iconWarning,
        showCancelButton: true,
        confirmButtonText: 'Ajukan Pickup',
        confirmButtonClass: 'btn btn-primary',
        cancelButtonText: 'Batal',
        cancelButtonClass: 'btn btn-outline-primary bg-white text-primary',
      }).then(result => {
        if (result.isConfirmed) {
          this.submitPickup()
        }
      })
    },
    async submitPickup() {
      this.submitStatus = true
      this.$bvModal.show('modalSubmitPickup')
      let startIndex = 0
      if (this.submitProgress > 0) {
        startIndex = this.submitProgress - this.totalOrderTimeout
      }
      for (let index = startIndex; index < this.order.length; index += 1) {
        try {
          const submit = await this.$http_komship.post(`/v3/pickup/${this.profile.partner_id}/store`, {
            partner_name: this.profile.user_fullname,
            pickup_date: this.pickupDate,
            pickup_time: this.pickupTime.replace(/\s/g, ''),
            pic: this.address.pic,
            pic_phone: this.address.phone,
            vehicle: this.vehicle,
            address_id: this.address.address_id,
            address_detail: this.address.address_detail,
            order: this.order[index].order_id,
            token: this.token,
          })
          const { code } = submit.data
          if (code === 200) {
            if (this.itemOrderError.length > 0) {
              this.itemOrderError = this.itemOrderError.filter(items => items.order_id !== this.order[index].order_id)
            }
            this.submitPercentage = Math.floor(((index + 1) * 100) / this.order.length)
            this.submitProgress += 1
            this.totalOrderTimeout = 0
            if (index === this.order.length - 1 && this.itemOrderError.length < 1) {
              this.$bvModal.hide('modalSubmitPickup')
              this.submitPercentage = 0
              this.$swal({
                html: `<span class="text-[16px] w-[564px]">
                  Pastikan <b>paket anda siap</b> untuk dipickup. Jam penjemputan yang kamu pilih <b>hanyalah estimasi</b>, kurir akan datang dan menghubungi di kisaran jam tersebut</span>`,
                imageUrl: iconSuccess,
                confirmButtonText: 'Oke',
                confirmButtonClass: 'btn btn-primary',
              }).then(result => {
                if (result.isConfirmed) {
                  this.$router.push('/history-pickup')
                }
              })
            } else if (index === this.order.length - 1 && this.itemOrderError.length > 0) {
              this.$bvModal.hide('modalSubmitPickup')
              this.$bvModal.show('modalOrderError')
              const product = []
              this.order = this.itemOrderError
              this.order.forEach(element => {
                element.product.forEach(items => {
                  product.push(items)
                })
              })
              this.totalProduct = product.length
              this.itemProductPreview = product.slice(0, 2)
            }
          } else if (code === 500 || code === 1002) {
            this.itemOrderError.push(this.order[index])
            if (index === this.order.length - 1) {
              this.$bvModal.hide('modalSubmitPickup')
              this.$bvModal.show('modalOrderError')
              const product = []
              this.order = this.itemOrderError
              this.order.forEach(element => {
                element.product.forEach(items => {
                  product.push(items)
                })
              })
              this.totalProduct = product.length
              this.itemProductPreview = product.slice(0, 2)
            }
          } else {
            this.itemOrderError.push(this.order[index])
            this.totalOrderTimeout += 1
            if (this.totalOrderTimeout >= 3) {
              this.submitStatus = false
              break
            }
          }
        } catch (error) {
          console.log(error)
          this.itemOrderError.push(this.order[index])
          this.totalOrderTimeout += 1
          if (this.totalOrderTimeout >= 3) {
            this.submitStatus = false
            break
          }
        }
      }
    },
    async changeAttr() {
      const element = document.getElementsByTagName('body')[0].className

      await (element === 'modal-open')
      document.querySelectorAll('div.modal-content')[0].removeAttribute('tabindex')
    },
  },
}