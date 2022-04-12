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
        { text: 'L', value: 1 },
        { text: 'P', value: 0 },
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
    this.getDataDetailMitra()
  },
  methods: {
    showModalBatal() {
      this.$bvModal.show('modal-tambahmitra-warning')
    },
    getDataDetailMitra() {
      this.$http_kompack.get(`/kompack/warehouse/${this.$route.params.id}`)
        .then(({ data }) => {
          console.log(data.data)
          /*
          {
            "id": "16",
            "user_id": 2593,
            "email": "ragil@email.com",
            "username": "ragils",
            "owner": "ragil setiawans",
            "phone_number": "081229460004",
            "gender": "L",
            "nik": "330313120897",
            "warehouse_id": 2,
            "warehouse_name": "ragil setiawans",
            "avability": 0,
            "pic_name": "Ragil",
            "pic_phone": "081229460004",
            "description": "Warehouse Estrige",
            "destination_id": 5,
            "detail_address": "jalan mangga no 5",
            "building_area": 200,
            "building_type": 1,
            "ownership": 4,
            "image_ktp_url": "public/kompack_image_ktp/CEfRNTovd5pz0dyFMD8QLytgdTSgEuZkjaT5IC8F.jpg",
            "image_logo_url": "https://kompackdev.komerce.id/warehouse_logo/1649651136.mburi.jpg",
            "image_warehouse": []
            "warehouse_verification": 0,
            "service_status": "nonaktif",
            "partner_verification": 0,
          }
          */
          this.dataAkun = {
            email: data.data.email,
            username: data.data.username,
          }
          this.dataFulfillment = {
            warehouse_name: data.data.warehouse_name,
            avability: data.data.avability,
            pic_name: data.data.pic_name,
            pic_phone: data.data.pic_phone,
            description: data.data.description,
            image_warehouse: data.data.image_warehouse,
            image_logo: data.data.image_logo_url,
            warehouse_verification: data.data.warehouse_verification,
            is_verification: data.data.service_status,
          }
          this.dataOwner = {
            owner: data.data.owner,
            gender: data.data.gender === 'L' ? 1 : 0,
            phone_number: data.data.phone_number,
            nik: data.data.nik,
            partner_verification: data.data.partner_verification,
            image_ktp_url: data.data.image_ktp_url,
          }
          this.dataProperti = {
            destination_id: data.data.destination_id,
            detail_addres: data.data.detail_address,
            building_area: data.data.building_area,
            building_type: data.data.building_type,
            ownership: data.data.ownership,
          }
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
