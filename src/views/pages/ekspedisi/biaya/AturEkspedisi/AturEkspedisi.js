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
      detailEkspedisi: {},
      criteriasData: [{ ...initCriteria }],
      optionsKota: [],
      optionsKotaData: [],
      optionsCriteria: [
        { value: null, text: 'Pilih jenis pengiriman' },
        { text: 'Exclude', value: 'exclude' },
        { text: 'Include', value: 'include' },
      ],
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
      const dataBaru = [...this.criteriasData].map(x => {
        const dt = { ...x }
        dt.origin = [x.type]
        this.detailEkspedisi.criterias.forEach(y => {
          if (y.criteria_id === x.criteria_id) {
            dt.destination = x.destination
          }
        })
        return dt
      })
      return dataBaru
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
        } else if (el) {
          el.classList.add('activeChoice')
        }
      },
    },
    criteriasData: {
      handler(val) {
        // const dataBaru = [...val].map(x => {
        //   const dt = { ...x }
        //   this.detailEkspedisi.criterias.forEach(y => {
        //     if (y.criteria_id === x.criteria_id) {
        //       dt.destination = [...y.destination, ...x.destination]
        //     }
        //   })
        //   return dt
        // })
        // console.log(dataBaru)
        console.log(val)
        // this.criteriasData = dataBaru
        // })
      },
      deep: true,
    },
  },
  mounted() {
    // this.$route.params.id,
    this.getIsland()
  },
  created() {
    //
  },
  updated() {
    const el = document.getElementById(`choice${this.vehicles}`)
    el.classList.add('activeChoice')
  },
  methods: {
    tambahKriteria(criteriasDataParams) {
      criteriasDataParams.push({ ...initCriteria })
    },
    hapusKriteria(index) {
      if (index === 0) return
      this.criteriasData.splice(index, 1)
    },
    submitData() {
      this.loadDataAwal = true
      const endpoint = `/v1/admin/shipment/update/${this.$route.params.id}`
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
      getData = axioskomsipdev.put(endpoint, {
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
        this.$router.push('/biaya-ekspedisi')
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
    handleChoiceTypeVehicle(val) {
      this.vehicles = val
    },
    getIsland() {
      const endpoint = '/v1/island'
      axioskomsipdev.get(endpoint)
        .then(({ data }) => {
          const parseData = JSON.parse(JSON.stringify(data.data))
          this.optionsKota = parseData
          this.optionsKotaData = parseData
          this.$nextTick(() => {
            this.getDetailEkspedisi(this.$route.params.id)
          })
        })
        .catch(e => {
          console.log('error', e)
          this.loadDataAwal = false
        })
    },
    getDetailEkspedisi(id) {
      const endpoint = `/v1/admin/shipment/detail/${id}`
      axioskomsipdev.get(endpoint)
        .then(({ data }) => {
          const parseData = JSON.parse(JSON.stringify(data.data))
          this.detailEkspedisi = parseData
          this.shipping_name = parseData.shipping_name
          this.service_name = parseData.service_name.toLowerCase()
          this.cashback_from = parseData.cashback_from
          this.service_fee_from = parseData.service_fee_from
          this.service_fee_to = parseData.service_fee_to
          this.cashback_to = parseData.cashback_to
          this.max_pickup_time = parseData.max_pickup_time
          this.vehicles = parseData.vehicles.join().toLowerCase()
          this.criteriasData = [...parseData.criterias].map(x => {
            const dt = {}
            dt.criteria_id = x.criteria_id
            dt.destination = []
            dt.retur = parseInt(x['retur '], 10)
            dt.origin = x.origin_value
            dt.type = x.type
            dt.delivery = x.delivery
            return dt
          })
        })
        .catch(e => {
          console.log('error', e)
        })
        .finally(() => {
          this.loadDataAwal = false
        })
    },
  },
}
