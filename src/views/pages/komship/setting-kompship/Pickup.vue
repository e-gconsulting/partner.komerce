<template>
  <b-overlay
    variant="light"
    :show="loading"
    spinner-variant="primary"
    blur="0"
    opacity=".5"
    rounded="sm"
  >
    <b-card>

      <h4>
        <strong>Pengaturan Alamat Penjemputan</strong>
      </h4>

      <!-- List & Edit -->
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
                @click="editAddress(data)"
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
                  <div v-if="editMode === true && editIdAddress === data.address_id">
                    <b-form-input
                      v-model="addressName"
                    />
                  </div>
                  <div v-else>
                    <b-form-input
                      v-model="data.address_name"
                      disabled
                    />
                  </div>
                </b-form-group>
              </b-col>

              <b-col cols="10">
                <b-form-group
                  label="Kode Post/Kecamatan"
                  label-cols-md="3"
                >
                  <div v-if="editMode === true && editIdAddress === data.address_id">
                    <v-select
                      v-model="tesLabel[index]"
                      :options="itemsOriginEdit"
                      label="label"
                      @search="onSearchOrigin"
                    />
                  </div>
                  <div v-else>
                    <v-select
                      v-model="tesLabel[index]"
                      label="label"
                      disabled
                    />
                  </div>
                </b-form-group>
              </b-col>

              <b-col cols="10">
                <b-form-group
                  label="Alamat Detail"
                  label-cols-md="3"
                >
                  <div v-if="editMode === true && editIdAddress === data.address_id">
                    <b-form-textarea
                      v-model="addressDetail"
                      placeholder="Alamat Detail"
                      rows="3"
                    />
                  </div>
                  <div v-else>
                    <b-form-textarea
                      v-model="data.address_detail"
                      placeholder="Alamat Detail"
                      disabled
                      rows="3"
                    />
                  </div>
                </b-form-group>
              </b-col>

              <b-col cols="10">
                <b-form-group
                  label="Nama PIC"
                  label-cols-md="3"
                >
                  <div v-if="editMode === true && editIdAddress === data.address_id">
                    <b-form-input
                      v-model="picName"
                    />
                  </div>
                  <div v-else>
                    <b-form-input
                      v-model="data.pic"
                      disabled
                    />
                  </div>
                </b-form-group>
              </b-col>

              <b-col cols="10">
                <b-form-group
                  label="No. HP"
                  label-cols-md="3"
                >
                  <div v-if="editMode === true && editIdAddress === data.address_id">
                    <b-form-input
                      v-model="phoneUser"
                    />
                  </div>
                  <div v-else>
                    <b-form-input
                      v-model="data.phone"
                      disabled
                    />
                  </div>
                </b-form-group>
              </b-col>

              <transition name="fade">
                <b-col
                  v-if="editMode === true && editIdAddress === data.address_id"
                  md="12"
                  class="d-flex justify-content-end mt-1 pb-1"
                >
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    type="submit"
                    variant="outline-primary"
                    class="mr-1"
                    @click.prevent="confirmDelete(data)"
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
              </transition>

            </b-row>
          </b-form>
        </b-col>
      </b-row>

      <!-- Add Address -->
      <transition name="fade">
        <b-row
          v-if="formAddAddress === true"
          class="mt-3"
        >
          <b-col
            cols="10"
            class="border"
          >

            <b-row class="d-flex mt-50 mb-1">
              <b-col md="6">
                <h5>
                  <strong>Tambah Alamat</strong>
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
                    <b-form-input
                      v-model="addressName"
                    />
                  </b-form-group>
                </b-col>

                <b-col cols="10">
                  <b-form-group
                    label="Kode Post/Kecamatan"
                    label-cols-md="3"
                  >
                    <v-select
                      v-model="tesLabelAdd"
                      :options="itemsOriginEdit"
                      label="label"
                      @search="onSearchOrigin"
                    />
                  </b-form-group>
                </b-col>

                <b-col cols="10">
                  <b-form-group
                    label="Alamat Detail"
                    label-cols-md="3"
                  >
                    <b-form-textarea
                      v-model="addressDetail"
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
                      v-model="picName"
                    />
                  </b-form-group>
                </b-col>

                <b-col cols="10">
                  <b-form-group
                    label="No. HP"
                    label-cols-md="3"
                  >
                    <b-form-input
                      v-model="phoneUser"
                    />
                  </b-form-group>
                </b-col>

                <transition name="fade">
                  <b-col
                    md="12"
                    class="d-flex justify-content-end mt-1 pb-1"
                  >
                    <b-button
                      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                      type="submit"
                      variant="outline-primary"
                      class="mr-1"
                      @click="removeFormAddress"
                    >
                      Hapus
                    </b-button>
                    <b-button
                      v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                      type="reset"
                      variant="primary"
                      class="mr-1"
                      @click="submitAddress"
                    >
                      Simpan
                    </b-button>
                  </b-col>
                </transition>

              </b-row>
            </b-form>
          </b-col>
        </b-row>
      </transition>

      <b-row class="mt-1">
        <b-col md="10">
          <div class="demo-inline-spacing">
            <b-button
              block
              variant="outline-primary"
              @click="addAddress"
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
  </b-overlay>
</template>

<script>
import vSelect from 'vue-select'
import useJwt from '@/auth/jwt/useJwt'
import Ripple from 'vue-ripple-directive'
import {
  BCard,
  BRow,
  BCol,
  BForm,
  BFormGroup,
  BFormInput,
  BFormTextarea,
  BButton,
  BOverlay,
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
    BOverlay,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      loading: false,

      dataAddress: [],

      itemsOrigin: [],
      codeOrigin: [],

      fieldOrigin: '',

      formAddAddress: false,

      // Edit Mode
      editMode: false,
      editIdAddress: null,

      addressName: '',
      codeOriginEdit: [],
      itemsOriginEdit: [],
      addressDetail: '',
      picName: '',
      phoneUser: '',

      tesOrigin: [],
      tesLabel: [],
    }
  },
  mounted() {
    this.getAddress()
  },
  methods: {
    getAddress() {
      this.loading = true
      axios2.get('/v1/address', {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(response => {
        const { data } = response.data
        data.forEach(this.myLoop)
        this.dataAddress = data
        this.loading = false
      })
    },
    myLoop(data) {
      console.log(data)
      axios2.get(`/v1/origin?search=${data.origin_code}`, {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(response => {
        this.itemsOrigin = response.data.data
        console.log(this.itemsOrigin)
        this.itemsOrigin.forEach(this.loopOrigin)
      })
    },
    loopOrigin(data) {
      this.tesLabel.push(data.label)
      return this.tesLabel
    },
    submitAddress() {
      const formData = new FormData()
      formData.append('_method', 'post')
      formData.append('address_name', this.addressName)
      formData.append('origin_code', this.tesLabel)
      formData.append('address_detail', this.addressDetail)
      formData.append('pic', this.picName)
      formData.append('phone', this.phoneUser)
    },
    addAddress() {
      this.formAddAddress = true
    },
    removeFormAddress() {
      this.formAddAddress = false
    },
    editAddress(data) {
      console.log(data)
      this.editMode = true
      this.editIdAddress = data.address_id
      this.addressName = data.address_name
      this.addressDetail = data.address_detail
      this.picName = data.pic
      this.phoneUser = data.phone
    },
    confirmDelete(data) {
      this.$swal({
        title: 'Anda yakin?',
        text: 'Ingin hapus satu Alamat ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, Hapus!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.delete(data)
        }
      })
    },
    delete(data) {
      axios2.delete(`/v1/bank-account/delete/${data.bank_account_id}`, {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      })
        .then(response => {
          console.log(response)
        })
    },
    onSearchOrigin(search, loading) {
      if (search.length) {
        this.searchOrigin(loading, search, this)
      }
    },
    searchOrigin: _.debounce((loading, search, that) => {
      loading(true)
      that.loadOrigin(search).finally(() => loading(false))
    }, 500),
    loadOrigin(search) {
      return axios2.get(`/v1/origin?search=${search}`, {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(response => {
        console.log(response.data.data)
        this.itemsOriginEdit = response.data.data
      })
    },
  },

}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
</style>
