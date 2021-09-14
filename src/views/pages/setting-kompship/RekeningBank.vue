<template>
  <b-card>
    <b-col cols="12">
      <h4>
        <strong>Pengaturan Rekening Bank</strong>
      </h4>
    </b-col>

    <b-col
      md="10"
      class="border ml-1 mt-2"
    >

      <b-row class="d-flex align-items-center mb-1">
        <b-col>
          <h5>
            <strong>Rekening 1</strong>
          </h5>
        </b-col>
        <b-col class="d-flex justify-content-end">
          <b-button
            class="btn-icon"
            variant="flat-dark"
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
              label="Nama Bank"
              label-cols-md="3"
            >
              <v-select />
            </b-form-group>
          </b-col>

          <b-col cols="10">
            <b-form-group
              label="No Rekening"
              label-cols-md="3"
            >
              <b-form-input />
            </b-form-group>
          </b-col>

          <b-col cols="10">
            <b-form-group
              label="Nama"
              label-cols-md="3"
            >
              <b-form-input />
            </b-form-group>
          </b-col>

        </b-row>
      </b-form>
    </b-col>

    <b-col
      md="10"
      class="ml-1 mt-1"
    >
      <div class="demo-inline-spacing">
        <b-button
          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
          block
          variant="outline-primary"
        >
          <feather-icon
            icon="PlusIcon"
            class="mr-50"
          />
          <span class="align-middle">Tambahkan Rekening</span>
        </b-button>
      </div>
    </b-col>

  </b-card>
</template>

<script>
import {
  BRow,
  BCol,
  BCard,
  BForm,
  BFormGroup,
  BFormInput,
  BButton,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'

export default {
  components: {
    BRow,
    BCard,
    BCol,
    vSelect,
    BForm,
    BFormGroup,
    BFormInput,
    FeatherIcon,
    BButton,
  },

}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
</style>
