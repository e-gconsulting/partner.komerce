<template>
  <b-card>

    <h4>
      <strong>Pengaturan Alamat Penjemputan</strong>
    </h4>

    <b-row class="mt-3">
      <b-col
        cols="10"
        class="border"
      >

        <b-row class="d-flex mt-50 mb-1">
          <b-col md="6">
            <h5>
              <strong>Alamat 1</strong>
            </h5>
          </b-col>
          <b-col
            md="6"
            class="d-flex justify-content-end align-items-center"
          >
            <span class="text-danger mr-50">
              <strong>Alamat Utama</strong>
            </span>
            <b-button
              variant="flat-dark"
              class="btn-icon"
              tag="router-link"
              :to="{ name: $route.meta.routeEdit }"
            >
              <feather-icon
                icon="EditIcon"
              />
            </b-button>
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

          </b-row>
        </b-form>
      </b-col>
    </b-row>

    <b-row class="mt-1">
      <b-col md="10">
        <div class="demo-inline-spacing">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            block
            variant="outline-primary"
          >
            <feather-icon
              icon="PlusIcon"
              class="mr-50"
            />
            <span class="align-middle">Tambahkan Alamat</span>
          </b-button>
        </div>
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
  },

}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
</style>
