<template>
  <b-card>

    <h4>
      <strong>Pengaturan Alamat Penjemputan</strong>
    </h4>

    <b-row
      v-for="(data, index) in dataAddress"
      :key="index + 1"
      class="mt-3"
    >
      <b-col
        cols="10"
        class="border"
      >

        <b-row class="d-flex mt-50 mb-1">
          <b-col md="6">
            <h5>
              <strong>Alamat {{ index+1 }}</strong>
            </h5>
          </b-col>
          <b-col
            md="6"
            class="d-flex justify-content-end align-items-center"
          >
            <span
              v-if="data.is_default === 1"
              class="text-danger mr-50"
            >
              <strong>Alamat Utama</strong>
            </span>
            <b-button
              variant="flat-dark"
              class="btn-icon"
              tag="router-link"
              :to="{ name: $route.meta.routeEdit, params: { id: data.address_id } }"
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
                <b-form-input
                  v-model="data.address_name"
                />
              </b-form-group>
            </b-col>

            <b-col cols="10">
              <b-form-group
                label="Kode Post/Kecamatan"
                label-cols-md="3"
              >
                <v-select
                  v-model="codeOrigin"
                  :options="itemsOrigin"
                  label="label"
                />
              </b-form-group>
            </b-col>

            <b-col cols="10">
              <b-form-group
                label="Alamat Detail"
                label-cols-md="3"
              >
                <b-form-textarea
                  v-model="data.address_detail"
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
                <b-form-input
                  v-model="data.pic"
                />
              </b-form-group>
            </b-col>

            <b-col cols="10">
              <b-form-group
                label="No. HP"
                label-cols-md="3"
              >
                <b-form-input
                  v-model="data.phone"
                />
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
            block
            variant="outline-primary"
            tag="router-link"
            :to="{ name: $route.meta.routeAdd }"
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
import useJwt from '@/auth/jwt/useJwt'
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
import axios2 from './baseUrl2'

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
  data() {
    return {
      dataAddress: [],

      itemsOrigin: [],
      codeOrigin: [],
    }
  },
  mounted() {
    this.getAddress()
  },
  methods: {
    getAddress() {
      axios2.get('/v1/address', {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(response => {
        const { data } = response.data
        data.forEach(this.myLoop)
        this.dataAddress = data
      })
    },
    myLoop(data) {
      this.codeOrigin.push(data.origin_code)
      this.loadOrigin(this.codeOrigin)
    },
    loadOrigin(value) {
      console.log(value)

      axios2.get(`/v1/origin?search=${value}`,
        {
          headers: { Authorization: `Bearer ${useJwt.getToken()}` },
        }).then(response => {
        const { data } = response.data
        console.log(data)
      })
    },
  },

}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
</style>
