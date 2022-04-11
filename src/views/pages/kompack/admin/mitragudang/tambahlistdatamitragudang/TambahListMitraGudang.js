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
      this.btnSubmitDisabled = true
      this.$refs.tambahlistdata.validate().then(success => {
        if (success) {
          // calling API untuk tambah mitra gudang
          this.$http_kompack.get('/v1/warehouse/store')
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
            })
        } else {
          // jika ada error ketika validasi
          // console.log(success)
        }
      })
    },
    previewLogo(files) {
      // console.log(files)
    },
  },
}
