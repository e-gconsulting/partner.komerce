import {
  BRow,
  BCol,
  BCard,
  BForm,
  BModal,
  BTable,
  BButton,
  BFormFile,
  BFormInput,
  BInputGroup,
  BFormGroup,
  BFormSelect,
  BFormTextarea,
  BFormRadioGroup,
  BInputGroupAppend,
  BInputGroupPrepend,
} from 'bootstrap-vue'
import { required, email, integer } from '@validations'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import ToastificationContentVue from '@/@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BForm,
    BModal,
    BTable,
    BButton,
    BFormFile,
    BFormInput,
    BFormGroup,
    BFormSelect,
    BInputGroup,
    BFormTextarea,
    BFormRadioGroup,
    BInputGroupAppend,
    BInputGroupPrepend,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      email,
      required,
      integer,
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
        {
          text: 'Type 1',
          value: 1,
        },
        {
          text: 'Type 2',
          value: 2,
        },
      ],
      optionsOwnership: [
        {
          value: null,
          text: 'Pilih jenis kepemilikan',
        },
        {
          text: 'Ownership 1',
          value: 1,
        },
        {
          text: 'Ownership 2',
          value: 2,
        },
      ],
      disabledField: {
        email: true,
        username: true,
        warehouse_name: true,
        avability: true,
        pic_name: true,
        pic_phone: true,
        description: true,
        image_warehouse: true,
        image_logo: true,
        owner: true,
        gender: true,
        phone_number: true,
        nik: true,
        image_ktp_url: true,
        destination_id: true,
        detail_addres: true,
        building_area: true,
        building_type: true,
        ownership: true,
      },
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
        // type of 0: non-aktif, 1: Belum Diverifikasi, 2: Sudah Diverifikasi
        is_verification: 2,
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
        building_area: 0,
        building_type: null,
        ownership: null,
      },
    }
  },
  computed: {
    statuscomputed() {
      switch (this.dataFulfillment.is_verification) {
        case 1:
          return `<span class="d-flex align-items-center mb-2 font-bold text-warning">
            <span class="w-4 h-4 rounded-full bg-warning mr-0.5"></span>Belum Terverifikasi</span>`
        case 2:
          return `<span class="d-flex align-items-center mb-2 font-bold text-green-500">
            <span class="w-4 h-4 rounded-full bg-green-500 mr-0.5"></span>Aktif</span>`
        default:
          return `<span class="d-flex align-items-center mb-2 font-bold text-red-500">
            <span class="w-4 h-4 rounded-full bg-red-500 mr-0.5"></span>Non-Aktif</span>`
      }
    },
  },
  mounted() {
    // call api get detail data
    // this.getDataDetailMitra()
  },
  methods: {
    showModalBatal() {
      this.$bvModal.show('modal-tambahmitra-warning')
    },
    getDataDetailMitra() {
      this.$http_kompack.get(`/v1/warehouse/${this.$route.params.id}`)
        .then(({ data }) => {
          /*
            "partner_warehouse": {
              "id": 1,
              "owner": "Budi Darmasto",
              "no_hp": "812210123456",
              "username": "budidarmasto",
              "gender": "L",
              "email": "budi@gmail.com",
              "nik": "3303131808980001",
              "is_verification": 1,
              "account_status": 1,
              "image_idcard_url": "string"
            },
            "warehouse": {
              "id": 1,
              "name": "Gudang Budi Darmasto",
              "photo_logo_url": "string",
              "description": "Gudang dengan kemersihan terjaga dan oacking rapi",
              "pic_name": "Anak Budi",
              "pic_phone": "812210123456",
              "origin_code": "CGK10000",
              "destination_id": 1,
              "detail_addres": "Jl. Hr. Bonyamin No. 03",
              "avability": 1,
              "building_area": 200,
              "ownership": 1,
              "building_type": 2,
              "is_verification": 1
            },
            "image_warehouse": [
              {
                "id": 1,
                "image_url": "assets/image/front_image.jpg"
              }
            ]
          */
          console.log(data)
          // simpan data di dlm
          // this.dataAkun =
          // this.dataFulfillment =
          // this.dataOwner =
          // this.dataProperti =
        })
        .catch(() => {
          this.$toast({
            component: ToastificationContentVue,
            props: {
              title: 'Failed',
              text: 'Galat detail data mitra gudang',
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
          this.$http_kompack.get('/v1/getdatamitra')
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
          this.btnSubmitDisabled = false
          console.log(success)
        }
      })
    },
    editdataFulfillment() {
      this.disabledField = {
        ...this.disabledField,
        warehouse_name: false,
        avability: false,
        pic_name: false,
        pic_phone: false,
        description: false,
        image_warehouse: false,
        image_logo: false,
      }
    },
    previewLogo(files) {
      console.log(files)
    },
  },
}
