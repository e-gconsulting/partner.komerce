<template>
  <b-card>
    <h3>
      <strong>Edit Profile</strong>
    </h3>

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
            <b-form-input
              v-model="fullname"
              placeholder="Nama Lengkap"
            />
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
                :src="logoFile"
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
            <v-select />
          </b-form-group>
        </b-col>

        <b-col cols="8">
          <b-form-group
            label="Sektor Bisnis"
            label-cols-md="3"
            class="ml-2"
          >
            <v-select />
          </b-form-group>
        </b-col>

        <b-col cols="8">
          <b-form-group
            label="Tipe Bisnis"
            label-cols-md="3"
            class="ml-2"
          >
            <v-select />
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
  },
  directives: {
    Ripple,
  },
  data() {
    return {
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
          text: 'Laki-laki', value: 'Laki-laki',
        },
        {
          text: 'Perempuan', value: 'Perempuan',
        },
      ],
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
  },
  methods: {
    loadProfile() {
      axios2.post('/v1/my-profile',
        {

        },
        {
          headers: { Authorization: `Bearer ${useJwt.getToken()}` },
        }).then(response => {
        const { data } = response.data
        this.fullname = data.user_fullname
        this.username = data.user_name
        this.jenisKelamin = data.user_gender
        this.noHP = data.user_phone
        this.email = data.user_email
        this.address = data.user_address
        this.logoFile = data.user_img
        // this.nameBusiness =
        // this.location =
        // this.sektorBusiness =
        // this.typeBusiness =
      })
    },
  },

}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
</style>
