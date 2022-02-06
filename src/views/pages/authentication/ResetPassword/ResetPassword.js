/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BCard, BForm, BFormGroup, BInputGroup, BInputGroupAppend, BFormInput, BButton,
} from 'bootstrap-vue'
import {
  resetpasswordrequired,
  resetpasswordrules,
  resetconfirmpasswordrequired,
  resetpasswordconfirm,
} from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
// import store from '@/store/index'
import { $themeConfig } from '@themeConfig'

export default {
  components: {
    BCard,
    BButton,
    BForm,
    BFormGroup,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      // error: '',
      passwordData: '',
      confirmedPassword: '',
      resetpasswordrequired,
      resetpasswordrules,
      resetconfirmpasswordrequired,
      resetpasswordconfirm,
      status: '',
      loading: false,
      // validation rules
      passwordFieldType: 'password',
    }
  },
  setup() {
    // App Name
    const { appName, appLogoImage } = $themeConfig.app

    return {
      // App Name
      appName,
      appLogoImage,
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  methods: {
    showmodal() {
      this.$refs['ubah-password'].toggle('#togggle-btn')
    },
    async submit() {
      // const datavalidate = await this.$refs.simpleRules.validate()
      // console.log(datavalidate)
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
        // eslint-disable-next-line
          alert('form submitted!')
        }
      })
    },
  },
}
