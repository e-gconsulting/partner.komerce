import {
  BCard,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BForm,
  BButton,
  BFormRadioGroup,
  BFormTextarea,
  BFormFile,
  BAvatar,
  BSpinner,
  BOverlay,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'
import { required, email } from '@validations'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { heightTransition } from '@core/mixins/ui/transition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import useJwt from '@/auth/jwt/useJwt'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BButton,
    BFormRadioGroup,
    BFormTextarea,
    vSelect,
    BFormFile,
    BAvatar,
    ValidationObserver,
    ValidationProvider,
    BSpinner,
    BOverlay,
  },
  directives: {
    Ripple,
  },
  mixins: [heightTransition],
  data() {
    return {
      loading: false,
      loadingSubmit: false,

      id: null,

      fullname: '',
      username: '',
      jenisKelamin: null,
      noHP: '',
      emailUser: '',
      address: '',

      imageFile: null,
      imageInitialFile: null,

      nameBusiness: '',
      phoneBusiness: '',
      location: '',
      sektorBusiness: '',
      typeBusiness: '',

      options: [
        {
          text: 'Laki-laki', value: 1,
        },
        {
          text: 'Perempuan', value: 2,
        },
      ],

      partnerCategoryItems: [],
      businessTypeItems: [],

      provinceItems: [],

      fieldLogoBusiness: [],

      cityCode: '',

      // Validation
      required,
      email,
    }
  },
  mounted() {
    this.loadProfile()
    this.loadPartnerCategory()
    this.loadBusinessType()
    this.loadAllProvince()
  },
  methods: {
    removeLogoBusiness() {
      this.imageFile = null
      this.imageInitialFile = null
      this.fieldLogoBusiness.splice(0, 1)
    },
    tesChange() {
      this.fieldLogoBusiness.splice(0, 1)
      this.fieldLogoBusiness.push({ logo: '' })
    },
    async updateProfile() {
      await this.loadAllProvince()
      // console.log('imageFile', this.imageFile)
      // console.log('imageInitialFile', this.imageInitialFile)
      this.loadingSubmit = true
      this.$refs.formRules.validate().then(success => {
        if (success) {
          if (this.imageInitialFile !== '' && this.imageInitialFile !== null) {
            console.log('tes2')
            if (this.imageInitialFile.includes('http')) {
              this.imageInitialFile = ''
              console.log('tes1')
            }
          }
          const formData = new FormData()
          formData.append('id', this.id)
          formData.append('username', this.username)
          formData.append('full_name', this.fullname)
          formData.append('no_hp', this.noHP)
          formData.append('no_hp_business', this.phoneBusiness)
          formData.append('address', this.address)
          formData.append('gender', this.jenisKelamin)
          if (this.imageInitialFile !== null && this.imageFile === null) {
            formData.append('business_logo', this.imageInitialFile)
            console.log('atas')
          } else if (this.imageFile !== null) {
            formData.append('business_logo', this.imageFile)
            console.log('bawah')
          } else {
            formData.append('business_logo', '')
          }
          formData.append('brand_name', this.nameBusiness)
          formData.append('partner_category_name', this.sektorBusiness)
          formData.append('business_type_id', this.typeBusiness)
          formData.append('business_location', String(this.address))
          formData.append('email', this.emailUser)
          if (this.cityCode !== null && this.cityCode.length < 6) {
            formData.append('city_code', this.cityCode)
            console.log('cityCode', this.cityCode.length)
          }
          this.$http.post('/user/partner/update-profile-komship', formData).then(() => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Success',
                icon: 'CheckIcon',
                text: 'Success update profile',
                variant: 'success',
              },
            })
            this.loadingSubmit = false
            this.loadProfile()
          }).catch(err => {
            console.log(err)
            this.loadingSubmit = false
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Gagal',
                icon: 'AlertCircleIcon',
                text: 'Gagal update profile, silahkan coba lagi',
                variant: 'danger',
              },
            })
          })
        } else {
          this.loadingSubmit = false
        }
      })
    },
    loadProfile() {
      this.fieldLogoBusiness.push({ logo: '' })
      this.loading = true
      this.$http_komship.post('/v1/my-profile', {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(response => {
        const { data } = response.data
        console.log(data)
        this.id = data.user_id
        this.fullname = data.user_fullname
        this.username = data.user_name
        if (data.user_gender === 'Laki-laki') {
          this.jenisKelamin = 1
        }
        if (data.user_gender === 'Perempuan') {
          this.jenisKelamin = 2
        }
        this.noHP = data.user_phone
        this.phoneBusiness = data.partner_no_hp_business
        this.emailUser = data.user_email
        this.address = data.user_address
        console.log('image', data.partner_business_logo)
        if (data.partner_business_logo) this.imageInitialFile = data.partner_business_logo
        this.nameBusiness = data.partner_business_name
        if (data.user_address_default !== null) {
          this.location = data.user_address_default.detail_address
        }
        if (data.address_partner_business) {
          this.cityCode = data.address_partner_business
          this.loadAllProvince()
        }
        this.sektorBusiness = data.partner_category_name
        this.typeBusiness = data.partner_business_type_id
        this.loading = false
      }).catch(err => {
        console.log('error get profile', err)
        this.loading = false
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Gagal',
            icon: 'AlertCircleIcon',
            text: 'Gagal load profile, silahkan coba lagi',
            variant: 'danger',
          },
        })
      })
    },
    loadPartnerCategory() {
      this.$http.post('/partnerCategory').then(response => {
        const { data } = response.data
        this.partnerCategoryItems = data
        return this.partnerCategoryItems
      })
    },
    loadBusinessType() {
      this.$http.get('/businessType').then(response => {
        const { data } = response.data.data
        this.businessTypeItems = data
        return this.businessTypeItems
      })
    },
    onSearchProvince(search, loading) {
      if (search.length) {
        this.searchProvince(loading, search, this)
      }
    },
    searchProvince: _.debounce((loading, search, that) => {
      loading(true)
      that.loadProvince(search).finally(() => loading(false))
    }, 500),
    loadProvince(search) {
      return this.$http.get(`/v1/partner/province-city?search=${search}`)
        .then(response => {
          const { data } = response.data
          console.log('response province', data)
          this.provinceItems = data
          if (data.length === 1) {
            this.cityCode = data[0].city_code
          }
        })
    },
    loadAllProvince() {
      this.$http.get('/v1/partner/province-city')
        .then(response => {
          const { data } = response.data
          console.log('response province', data)
          data.forEach(this.filterProvince)
          console.log(this.cityCode)
          this.provinceItems = data
        })
    },
    filterProvince(data) {
      if (data.values === this.cityCode) {
        this.cityCode = data.city_code
      }
    },
    reset() {
      this.fullname = ''
      this.username = ''
      this.jenisKelamin = null
      this.noHP = ''
      this.emailUser = ''
      this.address = ''
      this.imageFile = null
      this.imageInitialFile = null
      this.nameBusiness = ''
      this.location = ''
      this.sektorBusiness = ''
      this.typeBusiness = ''
    },
    fileUrl: file => (file ? URL.createObjectURL(file) : null),
  },

}
