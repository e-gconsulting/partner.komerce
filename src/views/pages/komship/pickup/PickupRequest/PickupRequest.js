import LottieAnimation from 'lottie-vuejs/src/LottieAnimation.vue'
import flatPickr from 'vue-flatpickr-component'
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
      address: [],
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
    }
  },
  created() {
    this.getCurrentDate()
    this.getPickupAddress()
    this.getPickupOrder()
    this.getVehicleList()
    this.generateToken()
  },
  methods: {
    formatNumber: value => (`${value}`).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
    formatPickupTime(value) {
      return `${(`0${value}`).slice(-2)} : 00`
    },
    getCurrentDate() {
      const today = new Date()
      const hours = today.getHours()
      if (hours >= 21) {
        this.pickupDate = today.setDate(today.getDate() + 1)
        this.configDate.minDate = this.pickupDate
      } else {
        this.pickupDate = today
      }
      this.pickupTime = this.formatPickupTime(hours)
      this.setPickupTime()
    },
    setPickupTime(action) {
      const today = new Date()
      const minHours = today.getHours() < 9 ? 9 : today.getHours() + 2
      const pickupTime = toInteger(this.pickupTime.slice(0, 2))
      const pickupDate = new Date(this.pickupDate)
      if (action === 'plus') {
        if (pickupTime >= 21) {
          this.pickupTime = this.formatPickupTime(21)
        } else {
          this.pickupTime = this.formatPickupTime(pickupTime + 1)
        }
      } else if (pickupTime <= minHours && pickupDate.toISOString().split('T')[0] === today.toISOString().split('T')[0]) {
        this.pickupTime = this.formatPickupTime(minHours)
      } else if (pickupTime <= 9) {
        this.pickupTime = this.formatPickupTime(9)
      } else if (action === 'minus') {
        this.pickupTime = this.formatPickupTime(pickupTime - 1)
      }
    },
    async getVehicleList() {
      await this.$http_komship.post('v1/my-profile')
        .then(res => {
          const { data } = res.data
          this.profile = data
          this.vehicleList = data.vehicle
        })
      if (localStorage.getItem('pickupVehicle')) {
        try {
          this.vehicle = localStorage.getItem('pickupVehicle')
        } catch (e) {
          localStorage.removeItem('pickupVehicle')
        }
      }
    },
    setPickupVehicle(value) {
      this.vehicle = value
      localStorage.setItem('pickupVehicle', this.vehicle)
    },
    getPickupAddress() {
      if (localStorage.getItem('pickupAddress')) {
        try {
          this.address = JSON.parse(
            localStorage.getItem('pickupAddress'),
          )
        } catch (e) {
          this.getAddressList()
          localStorage.removeItem('pickupAddress')
        }
      } else {
        this.getAddressList()
      }
    },
    getPickupOrder() {
      if (localStorage.getItem('pickupOrder')) {
        try {
          this.order = JSON.parse(
            localStorage.getItem('pickupOrder'),
          )
          this.selectedOrder = this.order
          const product = []
          this.order.forEach(element => {
            element.product.forEach(items => {
              product.push(items)
            })
          })
          this.itemProductPreview = product.slice(0, 2)
        } catch (e) {
          localStorage.removeItem('pickupOrder')
          localStorage.removeItem('pickupOrderList')
        }
      }
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
              localStorage.setItem('pickupAddress', JSON.stringify(this.address))
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
    },
    onSelectAddress(data) {
      this.$bvModal.hide('modalSelectAddress')
      this.address = data
      this.itemProductPreview = []
      this.order = []
      this.itemOrderList = []
      localStorage.setItem('pickupAddress', JSON.stringify(this.address))
      localStorage.removeItem('pickupOrder')
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
      } else {
        this.selectedOrder = this.order
      }
      this.$bvModal.show('modalSelectOrder')
    },
    getNextOrderList(e) {
      if (e.target.scrollTop + e.target.clientHeight
        >= e.target.scrollHeight && !this.isLastOrder) {
        this.loading = true
        this.$http_komship.get(`v2/order/${this.profile.partner_id}`, {
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
      localStorage.setItem('pickupOrder', JSON.stringify(this.order))
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
      localStorage.removeItem('pickupAddress')
      this.address = []
      this.getAddressList()
      this.pickupDate = ''
      this.pickupTime = ''
      this.getCurrentDate()
      this.setPickupVehicle('')
      this.itemProductPreview = []
      this.order = []
      this.itemOrderList = []
      localStorage.removeItem('pickupOrder')
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
      for (let i = this.submitProgress; i < this.order.length; i += 1) {
        try {
          // eslint-disable-next-line no-await-in-loop
          const submit = await this.$http_komship.post(`/v3/pickup/${this.profile.partner_id}/store`, ({
            partner_name: this.profile.user_fullname,
            pickup_date: this.pickupDate.toISOString().split('T')[0],
            pickup_time: this.pickupTime.replace(/\s/g, ''),
            pic: this.address.pic,
            pic_phone: this.address.phone,
            vehicle: this.vehicle,
            address_id: this.address.address_id,
            address_detail: this.order[i].detail_address,
            order: this.order[i].order_id,
            token: this.token,
          }))
          if (submit.data.code === 200) {
            this.submitProgress += 1
            this.submitPercentage = Math.floor(((i + 1) * 100) / this.order.length)
            if (i === this.order.length - 1) {
              this.resetField()
              this.$bvModal.hide('modalSubmitPickup')
              this.submitPercentage = 0
              this.$swal({
                html: `<span class="text-[16px] w-[564px]">
                Pastikan <b>paket anda siap</b> untuk dipickup. Jam penjemputan yang kamu pilih <b>hanyalah estimasi</b>, kurir akan datang dan menghubungi di kisaran jam tersebut</span>`,
                imageUrl: iconSuccess,
                confirmButtonText: 'Oke',
                confirmButtonClass: 'btn btn-primary',
              })
            }
          } else {
            this.submitStatus = false
            break
          }
        } catch (error) {
          this.submitStatus = false
          break
        }
      }
    },
  },
}
