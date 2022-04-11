import {
  BRow,
  BCol,
  BTable,
  BCard,
  BForm,
  BModal,
  BButton,
  BFormFile,
  BFormInput,
  BInputGroup,
  BFormGroup,
  BFormSelect,
  BFormTextarea,
  BFormRadioGroup,
  BInputGroupPrepend,
  BInputGroupAppend,
} from 'bootstrap-vue'
import { required, email } from '@validations'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import ToastificationContentVue from '@/@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BRow,
    BCol,
    BTable,
    BCard,
    BForm,
    BModal,
    BButton,
    BFormFile,
    BFormInput,
    BInputGroup,
    BFormGroup,
    BFormSelect,
    BFormRadioGroup,
    BFormTextarea,
    BInputGroupPrepend,
    BInputGroupAppend,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      email,
      required,
      btnSubmitDisabled: false,
      optionsKetersediaan: [
        { text: 'Tersedia', value: 1 },
        { text: 'Penuh', value: 0 },
      ],
      optionsGender: [
        { text: 'Laki - Laki', value: 1 },
        { text: 'Perempuan', value: 0 },
      ],
      optionBuildingType: [
        {
          value: null,
          text: 'Pilih jenis bangunan',
        },
      ],
      optionsOwnership: [
        {
          value: null,
          text: 'Pilih jenis kepemilikan',
        },
      ],
      dataAkun: {
        email: '',
        username: '',
      },
      dataFulfillment: {
        warehouse_name: '',
        avability: null,
        pic_name: '',
        pic_phone: '',
        description: '',
        image_warehouse: null,
        image_logo: null,
      },
      dataOwner: {
        owner: '',
        gender: null,
        phone_number: '',
        nik: '',
        image_ktp_url: null,
      },
      dataProperti: {
        destination_id: '',
        detail_addres: '',
        building_area: '',
        building_type: null,
        ownership: null,
      },
      imageFieldFormType: {
        fulfillmentLogo: 'fulfillmentLogo',
        fulfillmentWarehouse: 'fulfillmentWarehouse',
        ownerKTP: 'ownerKTP',
      },
      prevImg: {
        logo: null,
        warehouse: null,
        ktp: null,
      },
    }
  },
  mounted() {
    this.fetchDataSelectOption()
  },
  methods: {
    showModalBatal() {
      this.$bvModal.show('modal-tambahmitra-warning')
    },
    fetchDataSelectOption() {
      this.$http_kompack('/kompack/select-option')
        .then(({ data }) => {
          const buildingType = [
            {
              value: null,
              text: 'Pilih jenis bangunan',
            },
          ]
          const ownerShip = [
            {
              value: null,
              text: 'Pilih jenis kepemilikan',
            },
          ]

          data.data.ownership.forEach(x => {
            ownerShip.push({
              value: x.id,
              text: x.name,
            })
          })
          data.data.building.forEach(x => {
            buildingType.push({
              value: x.id,
              text: x.name,
            })
          })
          this.optionBuildingType = buildingType
          this.optionsOwnership = ownerShip
        })
        .catch(() => {
          this.$toast({
            component: ToastificationContentVue,
            props: {
              title: 'Failed',
              text: 'Galat tambah data mitra gudang',
              icon: 'AlertCircleIcon',
              variant: 'danger',
            },
          })
        })
    },
    savedatalist() {
      // console.clear()
      console.log('dataAkun ', this.dataAkun)
      console.log('dataFulfillment ', this.dataFulfillment)
      console.log('dataOwner ', this.dataOwner)
      console.log('dataProperti ', this.dataProperti)
      this.btnSubmitDisabled = true
      this.$refs.tambahlistdata.validate().then(success => {
        if (success) {
          // body data
          const formData = new FormData()
          formData.append('email', this.dataAkun.email)
          formData.append('username', this.dataAkun.username)
          formData.append('owner', this.dataOwner.owner)
          formData.append('gender', this.dataOwner.gender)
          formData.append('phone_number', this.dataOwner.phone_number)
          formData.append('nik', this.dataOwner.nik)
          formData.append('image_ktp_url', this.dataOwner.image_ktp_url) // string ($binary)
          formData.append('image_logo', this.dataFulfillment.image_logo) // string ($binary)
          formData.append('warehouse_name', this.dataFulfillment.warehouse_name)
          formData.append('avability', this.dataFulfillment.avability)
          formData.append('pic_name', this.dataFulfillment.pic_name)
          formData.append('pic_phone', this.dataFulfillment.pic_phone)
          formData.append('description', this.dataFulfillment.description)
          formData.append('image_warehouse', this.dataFulfillment.image_warehouse) // array<string ($binary)>
          formData.append('destination_id', Number.isNaN(parseInt(this.dataProperti.building_area, 10)) ? this.dataProperti.destination_id : parseInt(this.dataProperti.building_area, 10))
          formData.append('detail_addres', this.dataProperti.detail_addres)
          formData.append('building_area', Number.isNaN(parseInt(this.dataProperti.building_area, 10)) ? 0 : parseInt(this.dataProperti.building_area, 10))
          formData.append('building_type', this.dataProperti.building_type)
          formData.append('ownership', this.dataProperti.ownership)

          // calling API untuk tambah mitra gudang
          this.$http_kompack.post('/kompack/warehouse/store', formData, {
            headers: {
              'content-type': 'multipart/form-data',
            },
          })
            .then(({ data }) => {
              // jika sudah berhasil callapi
              console.log('data mitra gudang', data)
              // masuk data tidak error maka munculkan popup success
              this.$bvModal.show('modal-tambahmitra-success')
            })
            .catch(() => {
              this.$toast({
                component: ToastificationContentVue,
                props: {
                  title: 'Failed',
                  text: 'Galat tambah data mitra gudang',
                  icon: 'AlertCircleIcon',
                  variant: 'danger',
                },
              })
              this.btnSubmitDisabled = false
            })
        } else {
          // jika ada error ketika validasi
          console.log(success)
        }
      })
    },
    previewLogo(evChange, type) {
      const [dataimg] = evChange.target.files
      let url = null
      const multiFile = []
      switch (type) {
        case this.imageFieldFormType.fulfillmentLogo:
          this.dataFulfillment.image_logo = dataimg
          url = URL.createObjectURL(dataimg)
          this.prevImg.logo = url
          break
        case this.imageFieldFormType.fulfillmentWarehouse:
          evChange.target.files.forEach(fl => {
            multiFile.push(fl)
          })
          this.dataFulfillment.image_warehouse = multiFile
          url = []
          evChange.target.files.forEach(x => {
            url.push(URL.createObjectURL(x))
          })
          this.prevImg.warehouse = url
          break
        case this.imageFieldFormType.ownerKTP:
          this.dataOwner.image_ktp_url = dataimg
          url = URL.createObjectURL(dataimg)
          this.prevImg.ktp = url
          break
        default:
          break
      }
    },
  },
}
