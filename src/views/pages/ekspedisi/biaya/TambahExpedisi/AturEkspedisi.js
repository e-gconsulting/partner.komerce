/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
import vSelect from 'vue-select'
import axioskomsipdev from '@/libs/axioskomsipdev'

import {
  BRow,
  BCol,
  BForm,
  BFormInput,
  BFormValidFeedback,
  BFormInvalidFeedback,
  // BListGroup,
  // BListGroupItem,
  BInputGroup,
  BButton,
  BFormSelect,
  BCard,
  BSpinner,
  BCardBody,
} from 'bootstrap-vue'

const initCriteria = {
  origin: [],
  destination: [],
  delivery: 0,
  retur: 0,
  type: null,
}

export default {
  components: {
    BRow,
    BCol,
    BForm,
    BFormInput,
    // BFormGroup,
    BInputGroup,
    BFormSelect,
    BFormValidFeedback,
    BFormInvalidFeedback,
    // BListGroupItem,
    BButton,
    BCard,
    BSpinner,
    BCardBody,
    vSelect,
  },
  data() {
    return {
      loadDataAwal: true,
      shipping_name: '',
      service_name: null,
      cashback_from: null,
      service_fee_from: null,
      service_fee_to: null,
      cashback_to: null,
      max_pickup_time: '',
      vehicles: '',
      criteriasData: [{ ...initCriteria }],
      optionsKota: [
        { value: null, text: 'Pilih layanan kota' },
        { value: 'jawa_bali', text: 'Jawa & Bali' },
        { value: 'kalimantan_sumatera', text: 'Kalimantan & Sumatera' },
        { value: 'jakarta_batam', text: 'Jakarta & Batam' },
      ],
      optionsCriteria: [
        { value: null, text: 'Pilih jenis pengiriman' },
        { text: 'Exclude', value: 'exclude' },
        { text: 'Include', value: 'include' },
      ],
      selected: null,
      optionsServiceName: [
        { value: null, text: 'Pilih jenis service' },
        { text: 'Oke', value: 'oke' },
        { text: 'Reg', value: 'reg' },
        { text: 'Yes', value: 'yes' },
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
    changeCriteriasData() {
      const dt = [...this.criteriasData].map(x => {
        const returnData = { ...x }
        returnData.origin = [x.type]
        return returnData
      })
      return dt
    },
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
    // criteriasData: {
    //   handler(val) {
    //     console.log(val)
    //   },
    //   deep: true,
    // },
  },
  mounted() {
    //
  },
  created() {
    setTimeout(() => {
      this.loadDataAwal = false
    }, 1000)
  },
  methods: {
    changeCashbackTo(val) {
      if (val > 100 || val.length > 3) {
        return this.cashback_to = 100
      }
    },
    changeSff(val) {
      if (val > 100 || val.length > 3) {
        return this.service_fee_from = 100
      }
    },
    changeSft(val) {
      if (val > 100 || val.length > 3) {
        return this.service_fee_to = 100
      }
    },
    changeCashbackFrom(val) {
      if (val > 100 || val.length > 3) {
        return this.cashback_from = 100
      }
    },
    onlyNumber($event) {
      const keyCode = ($event.keyCode ? $event.keyCode : $event.which)
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
        $event.preventDefault()
      }

      // console.log($event.keyCode); //keyCodes value
    },
    tambahKriteria(criteriasDataParams) {
      criteriasDataParams.push({ ...initCriteria })
    },
    hapusKriteria(index) {
      if (index === 0) return
      this.criteriasData.splice(index, 1)
    },
    submitData() {
      this.loadDataAwal = true
      const endpoint = '/v1/admin/shipment/store'
      let getData = null
      // console.log('datasubmit :', {
      //   shipping_name: this.shipping_name,
      //   service_name: this.service_name,
      //   cashback_from: this.cashback_from,
      //   service_fee_from: this.service_fee_from,
      //   service_fee_to: this.service_fee_to,
      //   cashback_to: this.cashback_to,
      //   max_pickup_time: this.max_pickup_time,
      //   vehicles: [this.vehicles],
      //   criterias: this.changeCriteriasData,
      // })
      getData = axioskomsipdev.post(endpoint, {
        shipping_name: this.shipping_name,
        service_name: this.service_name,
        cashback_from: this.cashback_from,
        service_fee_from: this.service_fee_from,
        service_fee_to: this.service_fee_to,
        cashback_to: this.cashback_to,
        max_pickup_time: this.max_pickup_time,
        vehicles: [this.vehicles],
        criterias: this.changeCriteriasData,
      })
      getData.then(data => {
        console.log(data)
        // {
        // status: "success",
        // code: 200,
        // message: "Success Create data Shipment"}
        // const parseData = JSON.parse(JSON.stringify(data.data))
        // this.items = parseData
        // this.totalRows = parseData.length
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
  },
}
