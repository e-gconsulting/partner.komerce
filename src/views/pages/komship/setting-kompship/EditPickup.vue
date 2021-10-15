<template>
  <b-card>

    <h4>
      <strong>Pengaturan Alamat Penjemputan</strong>
    </h4>

    <b-row class="mt-3">
      <b-col
        cols="10"
        class="border pb-1"
      >

        <b-row class="d-flex mt-50 mb-1">
          <b-col md="6">
            <h5>
              <strong>Alamat 1</strong>
            </h5>
          </b-col>
        </b-row>

        <b-form @submit.prevent>
          <b-row>

            <b-col cols="10">
              <b-form-group
                label="Nama Alamat"
                label-cols-md="3"
              >
                <b-form-input />
              </b-form-group>
            </b-col>

            <b-col cols="10">
              <b-form-group
                label="Kode Post/Kecamatan"
                label-cols-md="3"
              >
                <v-select />
              </b-form-group>
            </b-col>

            <b-col cols="10">
              <b-form-group
                label="Alamat Detail"
                label-cols-md="3"
              >
                <b-form-textarea
                  placeholder="Alamat Detail"
                  rows="3"
                />
              </b-form-group>
            </b-col>

            <b-col cols="10">
              <b-form-group
                label="Nama PIC"
                label-cols-md="3"
              >
                <b-form-input />
              </b-form-group>
            </b-col>

            <b-col cols="10">
              <b-form-group
                label="No. HP"
                label-cols-md="3"
              >
                <b-form-input />
              </b-form-group>
            </b-col>

            <b-col
              md="10"
            >
              <b-form-group
                label-cols-md="3"
              >
                <b-form-checkbox
                  id="checkbox-2"
                  name="checkbox-2"
                  value="Remember_me"
                >
                  Jadikan sebagai alamat utama
                </b-form-checkbox>
              </b-form-group>
            </b-col>

            <!-- submit and reset -->
            <b-col
              md="12"
              class="d-flex justify-content-end mt-2"
            >
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                type="submit"
                variant="outline-primary"
                class="mr-1"
              >
                Hapus
              </b-button>
              <b-button
                v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                type="reset"
                variant="primary"
                class="mr-1"
              >
                Simpan
              </b-button>
            </b-col>

          </b-row>
        </b-form>
      </b-col>
    </b-row>

  </b-card>
</template>

<script>
import vSelect from 'vue-select'
import {
  BCard,
  BRow,
  BCol,
  BForm,
  BFormGroup,
  BFormInput,
  BFormTextarea,
  BButton,
  BFormCheckbox,
} from 'bootstrap-vue'

export default {

  components: {
    BCard,
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormInput,
    BFormTextarea,
    vSelect,
    BButton,
    BFormCheckbox,
  },

}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
</style>
