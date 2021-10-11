<template>
  <b-card>
    <h3>
      <strong>Edit Profile</strong>
    </h3>

    <validation-observer ref="formRules">
      <b-form
        class="mt-4"
        @submit.prevent
      >

        <h4 class="ml-2">
          <strong>Profile Penangguna Jawab</strong>
        </h4>
        <b-row class="mt-1">

          <b-col cols="8">
            <b-form-group
              label="Nama Lengkap"
              label-cols-md="3"
              class="ml-2"
            >
              <validation-provider
                #default="{errors}"
                name="Nama Lengkap"
                rules="required"
              >
                <b-form-input
                  v-model="fullname"
                  placeholder="Nama Lengkap"
                  :state="errors.length > 0 ? false:null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col cols="8">
            <b-form-group
              label="Username"
              label-cols-md="3"
              class="ml-2"
            >
              <b-form-input
                v-model="username"
                placeholder="Username"
              />
            </b-form-group>
          </b-col>

          <b-col cols="8">
            <b-form-group
              label="Jenis Kelamin"
              label-cols-md="3"
              class="ml-2"
            >
              <b-form-radio-group
                v-model="jenisKelamin"
                :options="options"
                class="demo-inline-spacing mb-1"
                value-field="value"
                text-field="text"
                disabled-field="disabled"
              />
            </b-form-group>
          </b-col>

          <b-col cols="8">
            <b-form-group
              label="No. HP"
              label-cols-md="3"
              class="ml-2"
            >
              <b-form-input
                v-model="noHP"
                placeholder="Nomer HP"
              />
            </b-form-group>
          </b-col>

          <b-col cols="8">
            <b-form-group
              label="Email"
              label-cols-md="3"
              class="ml-2"
            >
              <b-form-input
                v-model="email"
                placeholder="Email"
              />
            </b-form-group>
          </b-col>

          <b-col cols="8">
            <b-form-group
              label="Alamat"
              label-cols-md="3"
              class="ml-2"
            >
              <b-form-textarea
                v-model="address"
                placeholder="Alamat"
                rows="3"
              />
            </b-form-group>
          </b-col>

          <b-col
            cols="12"
            class="mt-2"
          >
            <h4 class="ml-2">
              <strong>Profile Pebisnis</strong>
            </h4>
          </b-col>

          <b-col cols="8">
            <b-form-group
              label="Upload Logo"
              label-cols-md="3"
              class="ml-2"
            >
              <label for="uploadLogo">
                <b-avatar
                  variant="light-primary"
                  size="50px"
                />
              </label>
              <label
                v-if="logoFile === null"
                for="uploadLogo"
              >
                <feather-icon
                  icon="PlusCircleIcon"
                  size="50"
                />
              </label>
              <b-form-file
                id="uploadLogo"
                v-model="logoFile"
                class="d-none"
              />
            </b-form-group>
          </b-col>

          <b-col cols="8">
            <b-form-group
              label="Nama Bisnis"
              label-cols-md="3"
              class="ml-2"
            >
              <b-form-input
                v-model="nameBusiness"
                placeholder="Nama Bisnis"
              />
            </b-form-group>
          </b-col>

          <b-col cols="8">
            <b-form-group
              label="Lokasi"
              label-cols-md="3"
              class="ml-2"
            >
              <b-form-input
                v-model="location"
              />
            </b-form-group>
          </b-col>

          <b-col cols="8">
            <b-form-group
              label="Sektor Bisnis"
              label-cols-md="3"
              class="ml-2"
            >
              <v-select
                v-model="sektorBusiness"
                label="partner_category_name"
                :options="partnerCategoryItems"
                :reduce="option => option.partner_category_name"
              />
            </b-form-group>
          </b-col>

          <b-col cols="8">
            <b-form-group
              label="Tipe Bisnis"
              label-cols-md="3"
              class="ml-2"
            >
              <v-select
                v-model="typeBusiness"
                label="name"
                :options="businessTypeItems"
                :reduce="option => option.id"
              />
            </b-form-group>
          </b-col>

          <!-- submit and reset -->
          <b-col
            class="d-flex justify-content-end mt-3"
            md="12"
          >
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="submit"
              variant="primary"
              class="mr-1"
              @click.prevent="updateProfile"
            >
              Submit
            </b-button>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              type="reset"
              variant="outline-secondary"
              class="mr-5"
            >
              Reset
            </b-button>
          </b-col>
        </b-row>

      </b-form>
    </validation-observer>

  </b-card>
</template>

<script>
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
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'
import useJwt from '@/auth/jwt/useJwt'
import { required } from '@validations'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import axios2 from './baseUrl2'

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
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      id: null,

      fullname: '',
      username: '',
      jenisKelamin: null,
      noHP: '',
      email: '',
      address: '',
      logoFile: null,
      nameBusiness: '',
      location: '',
      sektorBusiness: '',
      typeBusiness: '',

      options: [
        {
          text: 'Laki-laki', value: '1',
        },
        {
          text: 'Perempuan', value: '0',
        },
      ],

      partnerCategoryItems: [],
      businessTypeItems: [],

      // Validation
      required,
    }
  },
  mounted() {
    axios2.post('/v1/my-profile',
      {

      },
      {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(response => {
      const { data } = response
      console.log(data)
    })
    this.loadProfile()
    this.loadPartnerCategory()
    this.loadBusinessType()
  },
  methods: {
    updateProfile() {
      const formData = new FormData()
      formData.append('_method', 'post')
      formData.append('id', this.id)
      formData.append('username', this.username)
      formData.append('full_name', this.fullname)
      formData.append('no_hp', this.noHP)
      formData.append('address', this.address)
      formData.append('gender', this.jenisKelamin)
      formData.append('business_logo', this.logoFile)
      formData.append('brand_name', this.nameBusiness)
      formData.append('partner_category_name', this.sektorBusiness)
      formData.append('business_type_id', this.typeBusiness)
      formData.append('business_location', this.location)
      formData.append('email', this.email)

      this.$http.post('/user/partner/update-profile-komship', formData).then(response => {
        const { data } = response
        console.log(data)
      })
    },
    loadProfile() {
      axios2.post('/v1/my-profile',
        {

        },
        {
          headers: { Authorization: `Bearer ${useJwt.getToken()}` },
        }).then(response => {
        const { data } = response.data
        this.id = data.user_id
        this.fullname = data.user_fullname
        this.username = data.user_name
        this.jenisKelamin = data.user_gender
        this.noHP = data.user_phone
        this.email = data.user_email
        this.address = data.user_address
        this.logoFile = data.user_img
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
  },

}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
</style>
