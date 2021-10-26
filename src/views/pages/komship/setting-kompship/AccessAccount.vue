<template>
  <b-card>
    <b-row class="d-flex align-items-center">
      <b-col>
        <h4>
          <strong>Akses Akun</strong>
        </h4>
      </b-col>
      <b-col class="d-flex justify-content-end">
        <small>
          <strong class="text-danger">Download Aplikasi Orderku</strong>
        </small>
      </b-col>
    </b-row>

    <b-row class="mt-1">
      <b-col>
        <b-overlay
          variant="light"
          :show="loading"
          spinner-variant="primary"
          blur="0"
          opacity=".5"
          rounded="sm"
        >
          <b-table
            ref="table"
            striped
            hover
            responsive
            class="position-relative border"
            empty-text="Tidak ada data untuk ditampilkan."
            :show-empty="!loading"
            :fields="fields"
            :items="tableProvider"
            :busy.sync="loading"
          >

            <template #cell(full_name)="data">
              <h5>
                <strong>{{ data.item.full_name }}</strong>
              </h5>
              <p>
                {{ data.item.email }}
              </p>
            </template>

            <template #cell(access_menu)="data">
              <div
                v-for="(item, index) in data.item.access_menu"
                :key="index+1"
              >
                {{ item.menu_name }}
              </div>
            </template>

            <template #cell(action)="data">
              <!-- submit and reset -->
              <b-col
                md="12"
                class="d-flex justify-content-end mt-2"
              >
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  v-b-modal.modal-primary
                  type="submit"
                  variant="primary"
                  class="mr-1"
                >
                  Edit
                </b-button>
                <b-button
                  v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                  type="reset"
                  variant="outline-primary"
                  class="mr-1"
                  @click="confirmDelete(data)"
                >
                  Hapus
                </b-button>
              </b-col>
            </template>

          </b-table>
        </b-overlay>
      </b-col>
    </b-row>

    <b-row class="mt-2">
      <b-button
        variant="outline-primary"
        class="ml-1"
        @click="showModalAddAccount"
      >
        Tambah Orang
      </b-button>
    </b-row>

    <b-modal
      ref="modal-add-account"
      scrollable
      title="Tambah Orang"
      ok-only
      ok-title="Simpan"
      cancel-variant="outline-primary"
    >
      <validation-observer ref="formRules">
        <b-form>
          <b-row>

            <b-col cols="10">
              <b-form-group
                label="Nama"
              >
                <validation-provider
                  #default="{errors}"
                  name="Nama"
                  rules="required"
                >
                  <b-form-input
                    v-model="username"
                    :state="errors.length > 0 ? false:null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col cols="10">
              <b-form-group
                label="Email"
              >
                <validation-provider
                  #default="{errors}"
                  name="Email"
                  rules="required|email"
                >
                  <b-form-input
                    v-model="emailUser"
                    :state="errors.length > 0 ? false:null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col cols="10">
              <b-form-group
                label="Password"
              >
                <validation-provider
                  #default="{errors}"
                  name="Password"
                  rules="required"
                >
                  <b-form-input
                    v-model="password"
                    :state="errors.length > 0 ? false:null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <hr>
            </b-col>

            <b-col cols="12">
              <b-form-group>
                <b-form-checkbox
                  v-model="allAccessApps"
                  @change="cekAllApps"
                >
                  <h5>
                    <strong>Akses Aplikasi</strong>
                  </h5>
                </b-form-checkbox>

                <b-col
                  cols="12"
                  class="mt-1"
                >
                  <b-form-group>
                    <b-form-checkbox
                      v-model="addOrderApps"
                    >
                      Tambah Order
                    </b-form-checkbox>
                  </b-form-group>
                </b-col>

                <b-col cols="12">
                  <b-form-group>
                    <b-form-checkbox
                      v-model="dataOrderApps"
                    >
                      Data Order
                    </b-form-checkbox>
                  </b-form-group>
                </b-col>

              </b-form-group>
            </b-col>

            <b-col cols="12">
              <hr>
            </b-col>

            <b-col cols="12">
              <b-form-group>
                <b-form-checkbox
                  v-model="allAccessWeb"
                  @change="cekAllWeb"
                >
                  <h5>
                    <strong>Akses Website</strong>
                  </h5>
                </b-form-checkbox>

                <p class="mt-50 ml-1">
                  <strong>Produk</strong>
                </p>

                <b-col cols="12">
                  <b-form-group>
                    <b-form-checkbox
                      v-model="addProdukWeb"
                    >
                      Tambah Produk
                    </b-form-checkbox>
                  </b-form-group>
                </b-col>

                <b-col cols="12">
                  <b-form-group>
                    <b-form-checkbox
                      v-model="dataProdukWeb"
                    >
                      Data Produk
                    </b-form-checkbox>
                  </b-form-group>
                </b-col>

                <p class="mt-50 ml-1">
                  <strong>Orderan</strong>
                </p>

                <b-col cols="12">
                  <b-form-group>
                    <b-form-checkbox
                      v-model="addOrderWeb"
                    >
                      Tambah Order
                    </b-form-checkbox>
                  </b-form-group>
                </b-col>

                <b-col cols="12">
                  <b-form-group>
                    <b-form-checkbox
                      v-model="dataOrderWeb"
                    >
                      Data Order
                    </b-form-checkbox>
                  </b-form-group>
                </b-col>

                <p class="mt-50 ml-1">
                  <strong>Pickup</strong>
                </p>

                <b-col cols="12">
                  <b-form-group>
                    <b-form-checkbox
                      v-model="ajukanPickup"
                    >
                      Ajukan Pickup
                    </b-form-checkbox>
                  </b-form-group>
                </b-col>

                <b-col cols="12">
                  <b-form-group>
                    <b-form-checkbox
                      v-model="historyPickup"
                    >
                      Riwayat Pickup
                    </b-form-checkbox>
                  </b-form-group>
                </b-col>

                <p class="mt-50 ml-1">
                  <strong>Keuangan</strong>
                </p>

                <b-col cols="12">
                  <b-form-group>
                    <b-form-checkbox
                      v-model="penghasilan"
                    >
                      Penghasilan
                    </b-form-checkbox>
                  </b-form-group>
                </b-col>

                <b-col cols="12">
                  <b-form-group>
                    <b-form-checkbox
                      v-model="saldo"
                    >
                      Saldo
                    </b-form-checkbox>
                  </b-form-group>
                </b-col>

                <p class="mt-50 ml-1">
                  <strong>Pengaturan</strong>
                </p>

                <b-col cols="12">
                  <b-form-group>
                    <b-form-checkbox
                      v-model="settingProfile"
                    >
                      Edit Profile
                    </b-form-checkbox>
                  </b-form-group>
                </b-col>

                <b-col cols="12">
                  <b-form-group>
                    <b-form-checkbox
                      v-model="accessAccount"
                    >
                      Akses Akun
                    </b-form-checkbox>
                  </b-form-group>
                </b-col>

                <b-col cols="12">
                  <b-form-group>
                    <b-form-checkbox
                      v-model="addressPickup"
                    >
                      Alamat Pickup
                    </b-form-checkbox>
                  </b-form-group>
                </b-col>

                <b-col cols="12">
                  <b-form-group>
                    <b-form-checkbox
                      v-model="settingRekening"
                    >
                      Rekening Bank
                    </b-form-checkbox>
                  </b-form-group>
                </b-col>

                <b-col cols="12">
                  <b-form-group>
                    <b-form-checkbox
                      v-model="settingPin"
                    >
                      PIN
                    </b-form-checkbox>
                  </b-form-group>
                </b-col>

                <b-col cols="12">
                  <b-form-group>
                    <b-form-checkbox
                      v-model="settingEkspedisi"
                    >
                      Ekspedisi
                    </b-form-checkbox>
                  </b-form-group>
                </b-col>

              </b-form-group>
            </b-col>

          </b-row>
        </b-form>
      </validation-observer>
      <template #modal-footer>
        <b-row class="align-items-center w-100">
          <b-col
            cols="12"
            class="d-flex justify-content-end"
          >
            <b-button
              variant="primary"
              @click.prevent="addAccount"
            >
              <b-spinner
                v-if="loadingSubmit"
                variant="light"
                small
              />
              Simpan
            </b-button>
          </b-col>
        </b-row>
      </template>
    </b-modal>

  </b-card>
</template>

<script>
import {
  BCol,
  BRow,
  BCard,
  BTable,
  BButton,
  BModal,
  VBModal,
  BForm,
  BFormGroup,
  BFormInput,
  BFormCheckbox,
  BOverlay,
  BSpinner,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import useJwt from '@/auth/jwt/useJwt'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required, email } from '@validations'

export default {
  components: {
    BCol,
    BRow,
    BCard,
    BTable,
    BButton,
    BModal,
    BForm,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BOverlay,
    BSpinner,
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      loading: false,
      loadingSubmit: false,

      allAccessApps: false,
      allAccessWeb: false,

      addOrderApps: false,
      dataOrderApps: false,

      addProdukWeb: false,
      dataProdukWeb: false,
      addOrderWeb: false,
      dataOrderWeb: false,
      ajukanPickup: false,
      historyPickup: false,
      penghasilan: false,
      saldo: false,
      settingProfile: false,
      accessAccount: false,
      addressPickup: false,
      settingRekening: false,
      settingPin: false,
      settingEkspedisi: false,

      fields: [
        {
          key: 'full_name', label: 'Nama',
        },
        {
          key: 'access_menu', label: 'Akses',
        },
        {
          key: 'action', label: '',
        },
      ],

      items: [
        {
          name: 'maung',
          access: 'Akses aplikasi, Orderku, Penghasi...',
        },
      ],

      name: '',
      username: 'maungkomshipusername',
      password: '',
      fullname: '',
      emailUser: '',
      noPartner: '',
      menu: [
        {
          menu_position_id: 126,
          menu_access_id: 1,
        },
        {
          menu_position_id: 126,
          menu_access_id: 2,
        },
        {
          menu_position_id: 127,
          menu_access_id: 1,
        },
      ],

      // Validation
      required,
      email,
    }
  },
  mounted() {
    this.$httpKomship.post('/v1/my-profile', {},
      {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(response => {
      console.log(response.data.data)
    })
    this.$http.get('/user/partner/get-komship-member/618', {
      headers: { Authorization: `Bearer ${useJwt.getToken()}` },
    }).then(response => {
      const { data } = response.data
      console.log(data)
    })
  },
  methods: {
    refreshTable() {
      this.$refs.table.refresh()
    },
    tableProvider() {
      return this.$http.get('/user/partner/get-komship-member/618', {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(response => {
        const { data } = response.data
        return data
      })
    },
    addAccount() {
      this.$refs.formRules.validate().then(success => {
        if (success) {
          this.loadingSubmit = true
          this.$http.post('/user/partner/create-account', {
            username: this.username,
            password: this.password,
            full_name: 'Candra Maung',
            email: this.emailUser,
            menu: this.menu,
            partner_id: '618',
          }, {
            headers: { Authorization: `Bearer ${useJwt.getToken()}` },
          }).then(response => {
            const { data } = response.data
            console.log(data)
            this.$refs['modal-add-account'].hide()
            this.refreshTable()
          })
        } else {
          this.loadingSubmit = false
        }
      })
    },
    confirmDelete(data) {
      console.log(data)
      this.$swal({
        text: 'Kamu yakin ingin hapus akun ?',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Batal',
        confirmButtonText: 'Hapus',
        customClass: {
          confirmButton: 'btn btn-outline-primary',
          cancelButton: 'btn btn-primary ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.delete(data)
        }
      })
    },
    delete(data) {
      this.$http.delete(`/user/partner/delete-komship-member/${data.item.user_id}`, {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(response => {
        const { result } = response.data
        console.log(result)
        this.refreshTable()
      })
    },
    cekAllApps() {
      if (this.allAccessApps === true) {
        this.addOrderApps = true
        this.dataOrderApps = true
      } else {
        this.addOrderApps = false
        this.dataOrderApps = false
      }
    },
    cekAllWeb() {
      if (this.allAccessWeb === true) {
        this.addProdukWeb = true
        this.dataProdukWeb = true
        this.addOrderWeb = true
        this.dataOrderWeb = true
        this.ajukanPickup = true
        this.historyPickup = true
        this.penghasilan = true
        this.saldo = true
        this.settingProfile = true
        this.accessAccount = true
        this.addressPickup = true
        this.settingRekening = true
        this.settingPin = true
        this.settingEkspedisi = true
      } else {
        this.addProdukWeb = false
        this.dataProdukWeb = false
        this.addOrderWeb = false
        this.dataOrderWeb = false
        this.ajukanPickup = false
        this.historyPickup = false
        this.penghasilan = false
        this.saldo = false
        this.settingProfile = false
        this.accessAccount = false
        this.addressPickup = false
        this.settingRekening = false
        this.settingPin = false
        this.settingEkspedisi = false
      }
    },
    showModalAddAccount() {
      this.$refs['modal-add-account'].show()
    },
  },

}
</script>

<style>

</style>
