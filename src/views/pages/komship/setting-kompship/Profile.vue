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
              placeholder="Username"
            />
          </b-form-group>
        </b-col>

        <b-col cols="8">
          <b-form-group
            label="Nama Lengkap"
            label-cols-md="3"
            class="ml-2"
          >
            <b-form-radio-group
              v-model="selected"
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
              id="textarea-default"
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
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'

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
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      selected: 1,
      options: [
        { text: 'Laki-laki', value: 1 },
        { text: 'Perempuan' },
      ],
    }
  },

}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
</style>
