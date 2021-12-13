import axioskomsipdev from '@/libs/axioskomsipdev'

import {
  BRow,
  BCol,
  BForm,
  BFormInput,
  // BFormGroup,
  // BFormCheckbox,
  // BListGroup,
  // BListGroupItem,
  BFormTimepicker,
  BInputGroup,
  BButton,
  BFormSelect,
  BCard,
  BSpinner,
  BCardBody,
} from 'bootstrap-vue'
import Dropdown from 'vue-simple-search-dropdown'

export default {
  components: {
    BRow,
    BCol,
    BForm,
    BFormInput,
    // BFormGroup,
    Dropdown,
    BInputGroup,
    BFormSelect,
    BFormTimepicker,
    // BFormCheckbox,
    // BListGroup,
    // BListGroupItem,
    BButton,
    BCard,
    BSpinner,
    BCardBody,
  },
  data() {
    return {
      loadDataAwal: true,
      name: '',
      shipping_name: '',
      cashback_from: null,
      service_fee_from: null,
      service_fee_to: null,
      cashback_to: null,
      max_pickup_time: '',
      vehicles: '',
      origin: '',
      destination: '',
      delivery: null,
      retur: null,
      type: '',
      selectedKota: null,
      optionsKota: [
        { value: null, text: 'Pilih layanan kota' },
        { value: 'jawa_bali', text: 'Jawa & Bali' },
        { value: 'kalimantan_sumatera', text: 'Kalimantan & Sumatera' },
        { value: 'jakarta_batam', text: 'Jakarta & Batam' },
      ],
      selected: null,
      options: [
        { value: null, text: 'Pilih jenis service' },
        { text: 'Oke', value: 'oke' },
        { text: 'Reg', value: 'reg' },
        { text: 'Yes', value: 'yes' },
      ],
      selectedCriteria: null,
      optionsCriteria: [
        { value: null, text: 'Pilih jenis pengiriman' },
        { text: 'exclude', value: 'Exclude' },
        { text: 'include', value: 'Include' },
      ],
      listCheckBox: [
        { text: 'Hiring', value: 'hiring' },
        { text: 'COD', value: 'cod' },
        { text: 'Hiring dan COD', value: 'hiringncod' },
        { text: 'Lainnya', value: 'lainny' },
      ],
    }
  },
  computed: {
    //
  },
  watch: {
    vehicles: {
      handler(val, val2) {
        const el = document.getElementById(`choice${val}`)
        const el2 = document.getElementById(`choice${val2}`)
        if (val2) {
          el.classList.add('activeChoice')
          el2.classList.remove('activeChoice')
        } else {
          el.classList.add('activeChoice')
        }
      },
    },
  },
  mounted() {
    //

  },
  created() {
    this.getKota()
    setTimeout(() => {
      this.loadDataAwal = false
    }, 1000)
  },
  methods: {
    getKota() {
      const endpoint = '/v1/destination'
      const fetchData = axioskomsipdev.get(endpoint)
      fetchData.then(async data => {
        const array = data.data.data.data
        const newdata = await array.map(val => ({
          id: val.value,
          name: val.label,
        }))
        console.log('Kota', newdata)
        this.optionsKota = newdata
      })
    },
    submitData() {
      console.log(this.name)
      const endpoint = '/v1/admin/shippment/create'
      let getData = null
      getData = axioskomsipdev.post(endpoint, {
        shipping_name: this.shipping_name,
        cashback_from: this.cashback_from,
        service_fee_from: this.service_fee_from,
        service_fee_to: this.service_fee_to,
        cashback_to: this.cashback_to,
        max_pickup_time: this.max_pickup_time,
        vehicles: this.vehicles,
        origin: this.origin,
        destination: this.destination,
        delivery: this.delivery,
        retur: this.retur,
        type: this.type,
      })
      getData.then(({ data }) => {
        /*
          "data": {
            "profit": {
              "total_shipping_profit": 42000,
              "profit_cod": 3500
            },
            "income": [
              {
                "partner_name": "Tatausahaku",
                "district": "Idano Gawo",
                "shipping_cost": 42000,
                "grand_total": 82000,
                "shipping_profit": 42000,
                "net_profit": 113750
              }
            ]
          }
        */
        const parseData = JSON.parse(JSON.stringify(data.data))
        this.items = parseData
        this.totalRows = parseData.length
      })
        .catch(e => {
          console.log('error', e)
        })
        .finally(() => {
          this.loadDataAwal = false
        })
    },
    checkAksesLayanan() {
      //
    },
    hideModalAksesLayanan() {
      this.$nextTick(() => {
        this.$bvModal.hide('modal-edit-akseslayanan')
      })
    },
    simpanDataAksesLayanan() {
      // calling api and finish hide modal
      // refresh or watch selected list akses layanan
      this.$nextTick(() => {
        this.$bvModal.hide('modal-edit-akseslayanan')
      })
    },
    simpanFormEdit() {
      // calling api for simpan data
    },
    handleChoiceTypeVehicle(val) {
      this.vehicles = val
    },
    saveKriteria() {
      //
    },
  },
}
