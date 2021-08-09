<template>
  <b-overlay
    variant="light"
    :show="loading"
    spinner-variant="primary"
    blur="0"
    opacity=".5"
    rounded="sm"
    class="p-2"
  >

    <b-card-actions
      no-actions
    >
      <b-row>
        <b-col md="6">
          <h3 class="mb-3">
            Detail
          </h3>
          <b-form @submit.prevent>
            <b-row>
              <h4 class="mb-2 ml-1">
                Profil
              </h4>
              <b-col
                class="pb-2"
                md="12"
              >
                <b-form-row>
                  <b-col cols="4">
                    <div class="text-center mr-md-1">
                      <b-avatar
                        size="86px"
                        class="mr-3"
                      />
                    </div>
                  </b-col>
                  <b-col cols="8">
                    <b-form-group
                      label="Foto profil"
                      label-cols-md="12"
                    >
                      <b-form-file />
                    </b-form-group>
                  </b-col>
                </b-form-row>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Nama lengkap"
                  label-cols-md="4"
                >
                  <b-form-input />
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Jenis kelamin"
                  label-cols-md="4"
                >
                  <b-form-radio-group
                    :options="genderOptions"
                    class="mt-50"
                  />
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Tanggal lahir"
                  label-cols-md="4"
                >
                  <!-- <flat-pickr
                    class="form-control"
                    :config="{ altInput: true, altFormat: 'j F Y', dateFormat: 'Y-m-d',}"
                  /> -->
                  <b-form-input />
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Status Pernikahan"
                  label-cols-md="4"
                >
                  <b-form-radio-group
                    :options="marriedOptions"
                    class="mt-50"
                  />
                </b-form-group>
              </b-col>

              <h4 class="mt-2 ml-1 mb-1">
                Alamat
              </h4>
              <b-col md="12">
                <b-form-group
                  label="Provinsi"
                  label-cols-md="4"
                >
                  <v-select
                    label="name"
                    placeholder="Ketik untuk mencari..."
                  />
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Kota"
                  label-cols-md="4"
                >
                  <v-select
                    label="name"
                    placeholder="Ketik untuk mencari..."
                  />
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Kecamatan"
                  label-cols-md="4"
                >
                  <v-select
                    label="name"
                    placeholder="Ketik untuk mencari..."
                  />
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Provinsi"
                  label-cols-md="4"
                >
                  <b-form-input />
                </b-form-group>
              </b-col>

              <h4 class="mt-2 ml-1 mb-1">
                Pendidikan dan Pengalaman Kerja
              </h4>
              <b-col md="12">
                <b-form-group
                  label="Pendidikan Terakhir"
                  label-cols-md="4"
                >
                  <v-select
                    label="name"
                    placeholder="Ketik untuk mencari..."
                  />
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Pengalaman Kerja"
                  label-cols-md="4"
                >
                  <b-form-radio-group
                    :options="kerjaOptions"
                    class="mt-50"
                  />
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Lama Bekerja"
                  label-cols-md="4"
                >
                  <v-select
                    label="name"
                    placeholder="Ketik untuk mencari..."
                  />
                </b-form-group>
              </b-col>

              <h4 class="mt-2 ml-1 mb-1">
                Kontak
              </h4>
              <b-col md="12">
                <b-form-group
                  label="No HP"
                  label-cols-md="4"
                >
                  <b-form-input />
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Email"
                  label-cols-md="4"
                >
                  <b-form-input />
                </b-form-group>
              </b-col>

              <h4 class="mt-2 ml-1 mb-1">
                Nilai dan Sertifikat
              </h4>
              <b-col md="12">
                <b-form-group
                  label="Nilai"
                  label-cols-md="4"
                >
                  <b-form-input />
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Sertifikat"
                  label-cols-md="4"
                >
                  <b-form-input />
                </b-form-group>
              </b-col>

              <!-- submit -->
              <b-col md="12">
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  type="submit"
                  variant="primary"
                  class="mr-1 mt-3"
                >
                  Submit
                </b-button>
              </b-col>
            </b-row>
          </b-form>
        </b-col>
      </b-row>
    </b-card-actions>
  </b-overlay>
</template>

<script>
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  // BFormCheckbox,
  BForm,
  BButton,
  BFormRadioGroup,
  BFormRow,
  BAvatar,
  BFormFile,
  BOverlay,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'
// import flatPickr from 'vue-flatpickr-component'
import vSelect from 'vue-select'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    // BFormCheckbox,
    BForm,
    BButton,
    BCardActions,
    BFormRadioGroup,
    BFormRow,
    BAvatar,
    BFormFile,
    vSelect,
    BOverlay,
    // flatPickr,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      genderOptions: [
        { text: 'Laki-laki', value: 1 },
        { text: 'Perempuan', value: 2 },
      ],

      marriedOptions: [
        { text: 'Menikah', value: 1 },
        { text: 'Belum Menikah', value: 2 },
      ],

      kerjaOptions: [
        { text: 'Iya', value: 1 },
        { text: 'Tidak Ada', value: 2 },
      ],
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
