/* eslint-disable func-names */
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
import PincodeInput from 'vue-pincode-input'
import { NoSpace } from '@/libs/helpers'
import { mapState } from 'vuex'
import LottieAnimation from 'lottie-vuejs/src/LottieAnimation.vue'

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
    PincodeInput,
    LottieAnimation,
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

      cityCode: null,
      cityCodeValue: null,

      // Validation
      required,
      email,

      messageErrorLengthNameBusiness: false,
      messageErrorPhone: false,

      // Modal Edit
      editMode: '',
      modalTitle: '',
      modalSubtitle: '',
      modalFormLabel: '',
      modalEditFormInputType: '',
      formInputEditItem: '',
      formInputEditItemPaste: '',
      formInputEditItemPasteMode: false,
      usernameCheckPasswword: this.$store.state.auth.userData.username,

      itemEyeIcon: 'EyeOffIcon',
      labelSubmit: '',

      actionSubmit: '',

      // Validation Edit
      messageErrorPassword: false,
      successConfirmPassword: false,

      errorOtp: false,

      // Modal Success Verification
      otpConfirmation: '',
      successVerificationTitle: '',
      descriptionSuccessVerification: '',

      userData: this.$store.state?.auth?.userData,

      errorNoHp: false,

      loadingEdit: false,
      rulesFormInput: required,
      messageErrorEmail: null,
      nameLabelEdit: '',

      emailSamePrevious: false,
      countOtp: 60,
      resendOtp: false,
      loadingOtp: false,
      messageErrorUsernameIsSame: false,

      fieldNewNumber: '',

      nameValidator: '',

      usernameExist: false,
      NoSpace,

      boxIsClicked: '',
      loadingSendVerificationEmail: false,
      loadingSendVerificationNo: false,
      titleVerification: '',
      verificationMode: '',
      verificationDescriptionMode: '',
      otpItem: '',
      autofocusInputOtp: false,
      otpSubmit: 0,
      errorNumber: false,
      newNumberItem: '',
      sameOldNumber: false,

      loadingNew: false,
      otpIsWrong: false,
      activityOtp: '',

      activityEdit: '',
      titlePopup: '',
      confirmChangeTitlePopup: '',
      newEmailItem: '',
      errorEmail: '',
      emailIsUsed: false,
      numberIsUsed: false,
      loadingNewResend: false,
    }
  },
  computed: {
    ...mapState('dashboard', ['profile']),
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
      this.loadingSubmit = true
      this.$refs.formRules.validate().then(success => {
        if (success) {
          if (this.imageInitialFile !== '' && this.imageInitialFile !== null) {
            if (this.imageInitialFile.includes('http')) {
              this.imageInitialFile = ''
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
          } else if (this.imageFile !== null) {
            formData.append('business_logo', this.imageFile)
          } else {
            formData.append('business_logo', '')
          }
          formData.append('brand_name', this.nameBusiness)
          formData.append('partner_category_name', this.sektorBusiness)
          formData.append('business_type_id', this.typeBusiness)
          formData.append('business_location', String(this.address))
          formData.append('email', this.emailUser)
          if (this.cityCodeValue !== null) {
            formData.append('city_code', this.cityCodeValue)
          }
          this.$http.post('/user/partner/update-profile-komship', formData).then(async () => {
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
            await this.$store.dispatch('dashboard/getProfile')
            this.loadProfile()
          }).catch(err => {
            this.loadingSubmit = false
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Gagal',
                icon: 'AlertCircleIcon',
                text: 'Gagal update profile, silahkan coba lagi',
                variant: 'danger',
              },
            }, 2000)
          })
        } else {
          this.loadingSubmit = false
        }
      })
    },
    loadProfile() {
      this.fieldLogoBusiness.push({ logo: '' })
      this.id = this.profile.user_id
      this.fullname = this.profile.user_fullname
      this.username = this.profile.user_name
      if (this.profile.user_gender === 'Laki-laki') {
        this.jenisKelamin = 1
      }
      if (this.profile.user_gender === 'Perempuan') {
        this.jenisKelamin = 2
      }
      this.noHP = this.profile.user_phone
      this.phoneBusiness = this.profile.partner_no_hp_business
      this.emailUser = this.profile.user_email
      this.address = this.profile.user_address
      if (this.profilepartner_business_logo) this.imageInitialFile = this.profile.partner_business_logo
      this.nameBusiness = this.profile.partner_business_name
      if (this.profile.user_address_default !== null) {
        this.location = this.profile.user_address_default.detail_address
      }
      if (this.profile.address_partner_business) {
        this.cityCode = this.profile.address_partner_business
        this.loadAllProvince()
      }
      if (this.profile.partner_business_name === 'null') this.sektorBusiness = ''
      this.typeBusiness = this.profile.partner_business_type_id
    },
    loadPartnerCategory() {
      this.$http.post('/partnerCategory').then(response => {
        const { data } = response.data
        this.partnerCategoryItems = data
        return this.partnerCategoryItems
      }).catch(() => {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Gagal',
            icon: 'AlertCircleIcon',
            text: 'Gagal load data, silahkan coba lagi',
            variant: 'danger',
          },
        }, 2000)
      })
    },
    loadBusinessType() {
      this.$http.get('/businessType').then(response => {
        const { data } = response.data.data
        this.businessTypeItems = data
        return this.businessTypeItems
      }).catch(() => {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Gagal',
            icon: 'AlertCircleIcon',
            text: 'Gagal load data, silahkan coba lagi',
            variant: 'danger',
          },
        }, 2000)
      })
    },
    onSearchProvince(search, loading) {
      if (search.length) {
        this.searchProvince(loading, search, this)
      }
    },
    searchProvince: _.debounce((loading, search, that) => {
      loading(true)
      that.loadProvince(search).then(() => loading(false))
    }, 500),
    loadProvince(search) {
      return this.$http.get(`/v1/partner/province-city?search=${search}`)
        .then(response => {
          const { data } = response.data
          this.provinceItems = data
          if (data.length === 1) {
            this.cityCode = data[0].city_code
          }
        }).catch(() => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Gagal',
              icon: 'AlertCircleIcon',
              text: 'Gagal load data, silahkan coba lagi',
              variant: 'danger',
            },
          }, 2000)
        })
    },
    loadAllProvince() {
      this.$http.get('/v1/partner/province-city')
        .then(response => {
          const { data } = response.data
          data.forEach(this.filterProvince)
          this.provinceItems = data
        }).catch(() => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Gagal',
              icon: 'AlertCircleIcon',
              text: 'Gagal load data, silahkan coba lagi',
              variant: 'danger',
            },
          }, 2000)
        })
    },
    filterProvince(data) {
      if (data.values === this.cityCode) {
        this.cityCode = data.city_code
      }
    },
    reset() {
      window.history.go(-1)
    },
    fileUrl: file => (file ? URL.createObjectURL(file) : null),
    formatBusinessName(e) {
      return String(e).substring(0, 30)
    },
    formatPhoneProfile(e) {
      if (e.keyCode === 13) {
        e.preventDefault()
      }
      if (this.phoneBusiness.length < 9) {
        this.messageErrorPhone = true
      } else {
        this.messageErrorPhone = false
      }
    },
    validateInputBusinessName(e) {
      if (e.keyCode === 47 || e.keyCode === 61 || e.keyCode === 58 || e.keyCode === 59 || e.keyCode === 13) {
        e.preventDefault()
        this.messageErrorLengthNameBusiness = true
      } else {
        this.messageErrorLengthNameBusiness = false
      }
    },
    validateInputPhoneProfile(e) {
      if (e.keyCode === 46 || e.keyCode === 45 || e.keyCode === 43 || e.keyCode === 101 || e.keyCode === 44 || e.keyCode === 13) {
        e.preventDefault()
      }
      if (this.phoneBusiness.length < 9) {
        this.messageErrorPhone = true
      } else {
        this.messageErrorPhone = false
      }
    },
    handleArrowInput(e) {
      if (e.which === 38 || e.which === 40) {
        e.preventDefault()
      }
    },
    async openModalEdit(data) {
      this.editMode = data
      if (data === 'username') {
        this.modalTitle = await 'Edit Username'
        this.modalSubtitle = await 'Kamu hanya dapat mengganti username satu kali'
        this.modalFormLabel = await 'Username'
        this.modalEditFormInputType = await 'text'
        this.labelSubmit = await 'Simpan'
        this.nameValidator = 'username'
      } else if (data === 'noHP') {
        this.modalTitle = await 'Password Akun Komerce'
        this.modalSubtitle = await 'Masukkan Password Akun Komerce-mu untuk mengganti nomor HP'
        this.modalFormLabel = await 'Masukkan Pasword'
        this.modalEditFormInputType = await 'password'
        this.labelSubmit = 'Konfirmasi'
        this.nameValidator = 'password'
      } else if (data === 'email') {
        this.modalTitle = await 'Password Akun Komerce'
        this.modalSubtitle = await 'Masukkan Password Akun Komerce-mu untuk mengganti email'
        this.modalFormLabel = await 'Masukkan Pasword'
        this.modalEditFormInputType = await 'password'
        this.labelSubmit = await 'Konfirmasi'
        this.nameValidator = 'password'
      }
      this.$refs['modal-edit'].show()
    },
    closeModalEdit() {
      this.formInputEditItem = ''
      this.successConfirmPassword = false
      this.messageErrorUsernameIsSame = false
      this.errorNoHp = false
      this.$refs['modal-edit'].hide()
    },
    closeSuccessEditUsername() {
      this.$refs['modal-success-edit-username'].hide()
    },
    submitEdit() {
      this.messageErrorUsernameIsSame = false
      this.loadingEdit = true
      if (this.editMode === 'username') {
        this.nameValidator = 'username'
        if (this.userData.username !== this.formInputEditItem) {
          const formData = new FormData()
          formData.append('username', this.formInputEditItem)
          const params = {
            username: this.formInputEditItem,
          }
          this.$http.put('/user/partner/update-profile/username', {
            username: this.formInputEditItem,
          })
            .then(response => {
              this.loadingEdit = false
              if (response.data.code === 1009) {
                this.usernameExist = true
              } else {
                this.$refs['modal-success-edit-username'].show()
                this.$refs['modal-edit'].hide()
              }
            })
            .catch(err => {
              this.loadingEdit = false
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Gagal',
                  icon: 'AlertCircleIcon',
                  text: err,
                  variant: 'danger',
                },
              }, 2000)
            })
        } else {
          this.loadingEdit = false
          this.messageErrorUsernameIsSame = true
        }
      } else if (this.editMode === 'noHP') {
        this.nameValidator = 'No HP'
        const formData = new FormData()
        formData.append('username', this.usernameCheckPasswword)
        formData.append('password', this.formInputEditItem)
        this.$http.post('/check-password', formData)
          .then(response => {
            this.modalTitle = 'Edit No HP'
            this.modalSubtitle = 'Pastikan nomor benar-benar milik Kamu'
            this.modalFormLabel = 'No HP'
            this.modalEditFormInputType = 'number'
            this.successConfirmPassword = true
            this.messageErrorPassword = false
            this.$refs.formRulesEdit.reset()
            this.loadingEdit = false
          }).catch(err => {
            if (err.response.data.data.check_password === false) {
              this.successConfirmPassword = false
              this.messageErrorPassword = true
            } else {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Gagal',
                  icon: 'AlertCircleIcon',
                  text: err,
                  variant: 'danger',
                },
              }, 2000)
            }
            this.loadingEdit = false
          })
      } else if (this.editMode === 'email') {
        this.nameValidator = 'email'
        const formData = new FormData()
        formData.append('username', this.usernameCheckPasswword)
        formData.append('password', this.formInputEditItem)
        this.$http.post('/check-password', formData)
          .then(response => {
            this.modalTitle = 'Ganti Email'
            this.modalSubtitle = 'Pastikan email yang baru milik Kamu'
            this.modalFormLabel = 'Email'
            this.modalEditFormInputType = 'email'
            this.formInputEditItem = ''
            this.successConfirmPassword = true
            this.messageErrorPassword = false
            this.loadingEdit = false
            this.$refs.formRulesEdit.reset()
          }).catch(err => {
            if (err.response.data.data.check_password === false) {
              this.successConfirmPassword = false
              this.messageErrorPassword = true
              this.loadingEdit = false
            } else {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Gagal',
                  icon: 'AlertCircleIcon',
                  text: err,
                  variant: 'danger',
                },
              }, 2000)
              this.loadingEdit = false
            }
          })
      }
    },
    submitVerification() {
      this.loadingEdit = true
      if (this.editMode === 'noHP') {
        const formData = new FormData()
        formData.append('phone_number', this.formInputEditItem)
        formData.append('session', 'profile')
        this.fieldNewNumber = this.formInputEditItem
        this.$http_komship.post('/v2/partner/sms/otp', formData)
          .then(response => {
            this.$refs['modal-edit'].hide()
            this.$refs['modal-verification-edit'].show()
            this.loadingEdit = false
            this.countDownTimer()
          }).catch(err => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Gagal',
                icon: 'AlertCircleIcon',
                text: err,
                variant: 'danger',
              },
            }, 2000)
            this.loadingEdit = false
          })
      }
      if (this.editMode === 'email') {
        const formData = new FormData()
        formData.append('id_user', this.id)
        formData.append('email', this.formInputEditItem)
        this.$http.post('/user/partner/update-profile/email', formData)
          .then(response => {
            if (response.data.message === 'Successfuly your email is the same as the previous email') {
              this.emailSamePrevious = true
            }
            if (response.data.code === 1009) {
              this.messageErrorEmail = '*Email telah digunakan orang lain'
            }
            if (response.data.message === 'Successfuly Edit Email') {
              this.$refs.formRulesEdit.reset()
              this.successVerificationTitle = 'Cek Email Kamu'
              this.descriptionSuccessVerification = `Klik link konfirmasi yang telah kami kirimkan ke email ${this.formInputEditItem} untuk mengonfirmasi alamat email yang baru dan membantu mengamankan akun Anda. Link konfirmasi akan hangus dalam 10 menit setelah email dikirimkan`
              this.$refs['modal-edit'].hide()
              this.$refs['modal-success-verification'].show()
            }
            this.loadingEdit = false
          })
          .catch(err => {
            this.loadingEdit = false
          })
      }
    },
    sendVerification() {
      this.loadingEdit = true
      const formData = new FormData()
      formData.append('otp', this.otpConfirmation)
      formData.append('session', 'profile')
      this.$http_komship.post('/v2/partner/sms/otp/verification', formData)
        .then(response => {
          this.submitEditNomer()
        }).catch(err => {
          if (err.response.data.code === 400) {
            this.errorOtp = true
          } else {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Gagal',
                icon: 'AlertCircleIcon',
                text: err,
                variant: 'danger',
              },
            }, 2000)
          }
          this.loadingEdit = false
        })
    },
    submitEditNomer() {
      this.loadingEdit = true
      const formData = new FormData()
      formData.append('no_handphone', this.fieldNewNumber)
      this.$http.post('user/partner/update-profile/no-handphone', formData)
        .then(response => {
          this.successVerificationTitle = 'Terimakasih'
          this.descriptionSuccessVerification = `Kami telah mengkonfirmasi ${this.fieldNewNumber} sebagai
          nomor HP untuk Akun Komerce Kamu`
          this.errorOtp = false
          this.successConfirmPassword = false
          this.formInputEditItem = ''
          this.$refs['modal-verification-edit'].hide()
          this.$refs['modal-success-verification'].show()
          this.loadingEdit = false
        }).catch(err => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Gagal',
              icon: 'AlertCircleIcon',
              text: err,
              variant: 'danger',
            },
          }, 2000)
          this.loadingEdit = false
        })
    },
    handleBackEdit() {
      this.modalTitle = 'Edit No HP'
      this.modalSubtitle = 'Pastikan nomor benar-benar milik Kamu'
      this.modalFormLabel = 'No HP'
      this.modalEditFormInputType = 'number'
      this.successConfirmPassword = true
      this.messageErrorPassword = false
      this.$refs['modal-verification-edit'].hide()
      this.$refs['modal-edit'].show()
    },
    changeEyeIcon() {
      if (this.itemEyeIcon === 'EyeOffIcon') {
        this.itemEyeIcon = 'EyeIcon'
        this.modalEditFormInputType = 'text'
      } else {
        this.itemEyeIcon = 'EyeOffIcon'
        this.modalEditFormInputType = 'password'
      }
    },
    async closeSuccessVerification() {
      this.messageErrorEmail = null
      this.successConfirmPassword = false
      this.formInputEditItem = ''
      this.$refs['modal-success-verification'].hide()
      await this.$store.dispatch('dashboard/getProfile')
      this.loadProfile()
    },
    formatPhone: _.debounce(function () {
      if (this.formInputEditItem.length < 8) {
        this.errorNoHp = true
      } else {
        this.errorNoHp = false
      }
      if (this.formInputEditItemPasteMode === true) {
        this.formInputEditItem = this.formInputEditItemPaste
      }
      this.formInputEditItemPasteMode = false
    }, 1000),
    validateInputPhone(e) {
      if (e.keyCode === 46 || e.keyCode === 45 || e.keyCode === 43) {
        e.preventDefault()
      }
    },
    formatterPhone(e) {
      this.formInputEditItemPasteMode = true
      this.formInputEditItem = ''
      this.formInputEditItemPaste = ''
      this.formInputEditItemPaste = e.clipboardData.getData('text').replace(/\D/g, '')
      if (this.formInputEditItemPaste.charAt(0) === '0') {
        this.formInputEditItemPaste = this.formInputEditItemPaste.substr(1, this.formInputEditItemPaste.length)
      } else {
        this.formInputEditItemPaste = this.formInputEditItemPaste.substr(0, this.formInputEditItemPaste.length)
      }
      if (this.formInputEditItemPaste.charAt(0) === '6') {
        this.formInputEditItemPaste = this.formInputEditItemPaste.substr(2, this.formInputEditItemPaste.length)
      } else {
        this.formInputEditItemPaste = this.formInputEditItemPaste.substr(0, this.formInputEditItemPaste.length)
      }
      if (this.formInputEditItem.includes('+62') && this.formInputEditItem.charAt(0) !== '0') {
        this.formInputEditItemPaste = this.formInputEditItemPaste.substr(3, this.formInputEditItemPaste.length)
      }
      this.formInputEditItemPaste = `0${this.formInputEditItemPaste}`
    },
    valueFormatPhone(e) {
      if (e.target.value.length < 8) {
        this.errorNoHp = true
      } else {
        this.errorNoHp = false
      }
    },
    resetMessageErrorEmail() {
      this.messageErrorPassword = false
      this.messageErrorEmail = null
      this.emailSamePrevious = false
    },
    countDownTimer() {
      if (this.countOtp > 0) {
        setTimeout(() => {
          this.countOtp -= 1
          this.countDownTimer()
        }, 1000)
      }
      if (this.countOtp === 0) {
        this.resendOtp = true
      }
      if (this.otpSubmit < 1) this.otpSubmit += 2
    },
    handleResendOtp() {
      this.loadingOtp = true
      const formData = new FormData()
      formData.append('phone_number', this.fieldNewNumber)
      formData.append('session', 'profile')
      this.$http_komship.post('/v2/partner/sms/otp', formData)
        .then(response => {
          this.$refs['modal-edit'].hide()
          this.$refs['modal-verification-edit'].show()
          this.loadingEdit = false
          this.countOtp = 60
          this.resendOtp = false
          this.countDownTimer()
          this.loadingOtp = false
        }).catch(err => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Gagal',
              icon: 'AlertCircleIcon',
              text: err,
              variant: 'danger',
            },
          }, 2000)
          this.loadingOtp = true
        })
    },
    formatEditPhone(e) {
      return String(e).substring(0, 14)
    },
    hideCloseModalEdit() {
      this.formInputEditItem = ''
      this.messageErrorUsernameIsSame = false
      this.errorNoHp = false
      this.successConfirmPassword = false
      this.usernameExist = false
      this.itemEyeIcon = 'EyeOffIcon'
      this.messageErrorEmail = null
    },
    handleValueCityCode() {
      this.cityCodeValue = this.cityCode.city_code
    },
    handleEnter(e) {
      if (e.keyCode === 13) {
        e.preventDefault()
      }
    },
    handleMessageErrorUsernameIsSame() {
      this.messageErrorPassword = false
      this.messageErrorUsernameIsSame = false
      this.usernameExist = false
    },
    popupEdit(data) {
      this.activityEdit = data
      if (this.activityEdit === 'email') {
        this.titlePopup = 'Edit Email'
      }
      if (this.activityEdit === 'nomer') {
        this.titlePopup = 'Edit Nomer HP'
      }
      this.$refs['popup-edit-nomer'].show()
    },
    editNomerHp(data) {
      this.countOtp = 0
      this.loadingNew = false
      this.boxIsClicked = ''
      this.loadingSendVerificationEmail = false
      this.loadingSendVerificationNo = false
      this.otpItem = ''
      this.loadingNew = true
      if (this.activityEdit === 'email') this.activityOtp = 'UPDATE_EMAIL'
      if (this.activityEdit === 'nomer') this.activityOtp = 'UPDATE_PHONE_NUMBER'
      if (data) this.boxIsClicked = data
      if (this.boxIsClicked === 'email') {
        this.titleVerification = 'Verifikasi Email'
        this.verificationDescriptionMode = `Kode verifikasi telah dikirim melalui e-mail ke ${this.censorEmail(this.profile.user_email)}`
        this.loadingSendVerificationEmail = true
        this.$http_komship.post('/v1/user/check-activity', {
          email: this.emailUser,
          activity: this.activityOtp,
        })
        this.$http_komship.post('/v1/user/send/otp/email', {
          activity: this.activityOtp,
          email: this.profile.user_email,
        }).then(response => {
          this.otpSubmit = response.data.data.check_request_otp
          this.countOtp = response.data.data.expired_at
          if (this.countOtp === 1 || this.countOtp === -1) this.countOtp = 0
          if (this.countOtp > 0) this.countDownTimer()
          this.autofocusInputOtp = true
          this.$refs['popup-edit-nomer'].hide()
          this.$refs['popup-new-verification'].show()
          this.loadingNew = false
          this.loadingNewResend = false
        }).catch(err => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Failure',
              icon: 'AlertCircleIcon',
              text: err,
              variant: 'danger',
            },
          }, 2000)
          this.loadingNew = false
          this.boxIsClicked = ''
          this.loadingSendVerificationEmail = false
          this.loadingNewResend = false
        })
      }
      if (this.boxIsClicked === 'no') {
        this.titleVerification = 'Verifikasi OTP'
        this.verificationDescriptionMode = `Kode verifikasi telah dikirim melalui SMS ke ${this.censorPhone(this.profile.user_phone)}`
        this.loadingSendVerificationNo = true
        this.$http_komship.post('/v1/user/check-activity', {
          email: this.emailUser,
          activity: this.activityOtp,
        })
        this.$http_komship.post('/v2/partner/sms/otp', {
          phone_number: this.noHP,
          session: 'otp number',
        }).then(response => {
          this.otpSubmit = response.data.data.check_request_otp
          this.countOtp = response.data.data.expired_at
          if (this.countOtp === 1 || this.countOtp === -1) this.countOtp = 0
          if (this.countOtp > 0) this.countDownTimer()
          this.autofocusInputOtp = true
          this.$refs['popup-edit-nomer'].hide()
          this.$refs['popup-new-verification'].show()
          this.loadingNew = false
          this.loadingNewResend = false
        }).catch(err => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Failure',
              icon: 'AlertCircleIcon',
              text: err,
              variant: 'danger',
            },
          }, 2000)
          this.loadingNew = false
          this.boxIsClicked = ''
          this.loadingSendVerificationNo = false
          this.loadingNewResend = false
        })
      }
    },
    handleClosePopupEditNomer() {
      this.boxIsClicked = ''
      this.countOtp = 0
      this.loadingNew = false
      this.loadingSendVerificationEmail = false
      this.loadingSendVerificationNo = false
      this.otpItem = ''
      this.$refs['popup-edit-nomer'].hide()
    },
    handleCloseNewVerification() {
      this.countOtp = 0
      this.boxIsClicked = ''
      this.loadingSendVerificationEmail = false
      this.loadingSendVerificationNo = false
      this.$refs['popup-new-verification'].hide()
      this.$refs['popup-new-phone'].hide()
      this.otpItem = ''
      this.newEmailItem = ''
      this.newNumberItem = ''
      this.emailIsUsed = false
      this.numberIsUsed = false
    },
    newCheckOtp: _.debounce(function () {
      this.otpIsWrong = false
      if (this.otpItem.length === 6) {
        this.autofocusInputOtp = false
        if (this.boxIsClicked === 'email') {
          this.$http_komship.post('/v1/user/send/otp/email/check', {
            otp: Number(this.otpItem),
            activity: this.activityOtp,
          }).then(response => {
            this.$refs['popup-new-verification'].hide()
            this.newEmailItem = ''
            this.newNumberItem = ''
            this.$refs['popup-new-phone'].show()
            this.countOtp = 0
          }).catch(err => {
            this.otpIsWrong = true
          })
        }
        if (this.boxIsClicked === 'no') {
          this.$http_komship.post('/v2/partner/sms/otp/verification', {
            otp: Number(this.otpItem),
            session: 'otp number',
          }).then(response => {
            this.$refs['popup-new-verification'].hide()
            this.newEmailItem = ''
            this.newNumberItem = ''
            this.$refs['popup-new-phone'].show()
            this.countOtp = 0
          }).catch(() => {
            this.otpIsWrong = true
          })
        }
      }
    }, 1000),
    sendOtpAgain() {
      this.loadingNewResend = true
      this.editNomerHp(this.boxIsClicked)
    },
    checkFormatNumberOnBlur() {
      if (this.newNumberItem.length < 9) {
        this.errorNumber = true
      } else {
        this.errorNumber = false
      }
      if (this.profile.user_phone === this.newNumberItem) {
        this.sameOldNumber = true
      } else {
        this.sameOldNumber = false
      }
    },
    checkFormatEmailOnBlur() {
      if (String(this.newEmailItem)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )) {
        this.errorEmail = false
      } else {
        this.errorEmail = true
      }
    },
    checkFormatNumber() {
      this.numberIsUsed = false
      if (this.errorNumber) {
        if (this.newNumberItem.length < 8) {
          this.errorNumber = true
        } else {
          this.errorNumber = false
        }
      }
      if (this.sameOldNumber) {
        if (this.profile.user_phone === this.newNumberItem) {
          this.sameOldNumber = true
        } else {
          this.sameOldNumber = false
        }
      }
    },
    validateInputNumber(event) {
      if (event.keyCode === 69) {
        event.preventDefault()
      }
      this.$forceUpdate()
    },
    checkFormatEmail() {
      this.emailIsUsed = false
      if (!this.newEmailItem.match(/^[a-zA-Z0-9]+(?:[._-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/)) {
        this.errorEmail = true
      } else {
        this.errorEmail = false
      }
    },
    nextStepVerificationChangeNo() {
      this.loadingNew = true
      const params = {}
      let url
      let urlCheck = ''
      if (this.activityEdit === 'email') urlCheck = `/activity/user/check/email?email=${this.newEmailItem}`
      if (this.activityEdit === 'nomer') urlCheck = `/activity/user/check/phone-number?phone_number=${this.newNumberItem}`
      this.$http.get(urlCheck).then(() => {
        if (this.activityEdit === 'email') {
          url = '/v1/user/send/otp/email'
          Object.assign(params, { email: this.newEmailItem })
          Object.assign(params, { session: 'update email' })
          Object.assign(params, { activity: 'UPDATE_EMAIL' })
        }
        if (this.activityEdit === 'nomer') {
          url = '/v2/partner/sms/otp'
          Object.assign(params, { phone_number: this.newNumberItem })
          Object.assign(params, { session: 'update nomer' })
        }
        this.$http_komship.post(url, params).then(res => {
          this.otpSubmit = res.data.data.check_request_otp
          this.countOtp = res.data.data.expired_at
          if (this.countOtp === 1 || this.countOtp === -1) this.countOtp = 0
          if (this.countOtp > 0) this.countDownTimer()
          this.autofocusInputOtp = true
          this.$refs['popup-new-phone'].hide()
          this.$refs['popup-new-otp-verification'].show()
          this.loadingNew = false
          this.otpItem = ''
        }).catch(error => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Failure',
              icon: 'AlertCircleIcon',
              text: error,
              variant: 'danger',
            },
          }, 2000)
          this.loadingNew = false
        })
      }).catch(err => {
        if (err.response.data.code === 1001) {
          this.loadingNew = false
          this.emailIsUsed = true
          this.numberIsUsed = true
        }
      })
    },
    newCheckConfirmOtp: _.debounce(function () {
      this.otpIsWrong = false
      if (this.otpItem.length === 6) {
        this.autofocusInputOtp = false
        const paramData = {
          otp: this.otpItem,
        }
        let urls
        if (this.activityEdit === 'email') {
          Object.assign(paramData, { session: 'update email' })
          Object.assign(paramData, { activity: 'UPDATE_EMAIL' })
          urls = '/v1/user/send/otp/email/check'
        }
        if (this.activityEdit === 'nomer') {
          Object.assign(paramData, { session: 'update nomer' })
          urls = '/v2/partner/sms/otp/verification'
        }
        this.$http_komship.post(urls, paramData).then(response => {
          const params = {}
          let url
          if (this.activityEdit === 'email') {
            url = '/v1/user/update/email'
            Object.assign(params, { email: this.newEmailItem })
          }
          if (this.activityEdit === 'nomer') {
            url = '/v1/user/update/phonenumber'
            Object.assign(params, { phone_number: this.newNumberItem })
          }
          this.$http_komship.post(url, params).then(async res => {
            this.$refs['popup-new-otp-verification'].hide()
            this.$refs['popup-success-nomor'].show()
            localStorage.clear()
          })
        }).catch(() => {
          this.otpIsWrong = true
        })
      }
    }, 1000),
    sendOtpConfirmationAgain() {
      this.nextStepVerificationChangeNo()
    },
    handleCloseNewOtpVerification() {
      this.countOtp = 0
      this.loadingNew = false
      this.boxIsClicked = ''
      this.loadingSendVerificationEmail = false
      this.loadingSendVerificationNo = false
      this.otpItem = ''
      this.emailIsUsed = false
      this.$refs['popup-new-otp-verification'].hide()
    },
    closeSuccessPopup() {
      if (this.activityEdit === 'nomer') {
        window.location.reload()
      }
      if (this.activityEdit === 'email') {
        window.location.reload()
      }
    },
    censorWord(str) {
      return str[0] + '*'.repeat(str.length - 2) + str.slice(-1)
    },
    censorEmail(emails) {
      const arr = emails.split('@')
      return `${this.censorWord(arr[0])}@${this.censorWord(arr[1])}`
    },
    censorPhone(phone) {
      return '*'.repeat(phone.length) + phone.slice(-3)
    },
    changeMethodOtp() {
      this.$refs['popup-new-verification'].hide()
      this.$refs['popup-edit-nomer'].show()
      this.countOtp = 0
      this.loadingNew = false
      this.boxIsClicked = ''
      this.loadingSendVerificationEmail = false
      this.loadingSendVerificationNo = false
      this.otpItem = ''
    },
    validateInputPhoneNumber(e) {
      if (this.newNumberItem.length === 0) {
        if (e.keyCode !== 48) {
          e.preventDefault()
        }
      }
      if (this.newNumberItem.length === 1) {
        if (e.keyCode !== 56) {
          e.preventDefault()
        }
      }
      if (e.keyCode === 46 || e.keyCode === 45 || e.keyCode === 43) {
        e.preventDefault()
      }
    },
  },

}
