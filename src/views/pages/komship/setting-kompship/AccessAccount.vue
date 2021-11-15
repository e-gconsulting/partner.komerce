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
                  @click="editAccess(data)"
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

            <b-col
              v-if="!editMode"
              cols="10"
            >
              <b-form-group
                label="Nama"
              >
                <validation-provider
                  #default="{errors}"
                  name="Nama"
                  rules="required"
                >
                  <b-form-input
                    v-model="fullname"
                    :state="errors.length > 0 ? false:null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col
              v-if="!editMode"
              cols="10"
            >
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
              @click="addAccount"
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
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
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

      // Store
      valueAddOrderApps: {
        menuPositionId: 0,
        create: 0,
        edit: 0,
        delete: 0,
      },
      valueDataOrderApps: {
        menuPositionId: 0,
        access: 0,
      },

      valueAddProdukWeb: {
        menuPositionId: 0,
        create: 0,
        edit: 0,
        delete: 0,
      },
      valueDataProdukWeb: {
        menuPositionId: 0,
        access: 0,
      },
      valueAddOrderWeb: {
        menuPositionId: 0,
        create: 0,
        edit: 0,
        delete: 0,
      },
      valueDataOrderWeb: {
        menuPositionId: 0,
        access: 0,
      },
      valueAjukanPickup: {
        menuPositionId: 0,
        access: 0,
      },
      valueHistoryPickup: {
        menuPositionId: 0,
        access: 0,
      },
      valuePenghasilan: {
        menuPositionId: 0,
        access: 0,
      },
      valueSaldo: {
        menuPositionId: 0,
        access: 0,
      },
      valueSettingProfile: {
        menuPositionId: 0,
        access: 0,
      },
      valueAccessAccount: {
        menuPositionId: 0,
        access: 0,
      },
      valueAddressPickup: {
        menuPositionId: 0,
        access: 0,
      },
      valueSettingRekening: {
        menuPositionId: 0,
        access: 0,
      },
      valueSettingPin: {
        menuPositionId: 0,
        access: 0,
      },
      valueSettingEkspedisi: {
        menuPositionId: 0,
        access: 0,
      },

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
      menu: [],

      partnerId: null,

      editMode: false,

      // Validation
      required,
      email,
    }
  },
  mounted() {
    this.loadPartner()
    this.loadMenuAccess()
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
      }).catch(() => {
        this.loadingSubmit = false
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Gagal',
            icon: 'AlertCircleIcon',
            text: 'Gagal me-load data, silahkan coba lagi',
            variant: 'Danger',
          },
        })
      })
    },
    addAccount() {
      this.$refs.formRules.validate().then(success => {
        if (success) {
          // Apps
          if (this.allAccessApps === true && this.addOrderApps === true && this.dataOrderApps === true) {
            this.valueAddOrderApps.create = 2
            this.valueAddOrderApps.edit = 3
            this.valueAddOrderApps.delete = 4
            this.valueDataOrderApps.access = 1
            this.menu.push(
              {
                menu_position_id: this.valueAddOrderApps.menuPositionId,
                menu_access_id: this.valueAddOrderApps.create,
              },
              {
                menu_position_id: this.valueAddOrderApps.menuPositionId,
                menu_access_id: this.valueAddOrderApps.edit,
              },
              {
                menu_position_id: this.valueAddOrderApps.menuPositionId,
                menu_access_id: this.valueAddOrderApps.delete,
              },
              {
                menu_position_id: this.valueAddOrderApps.menuPositionId,
                menu_access_id: this.valueDataOrderApps.access,
              },
            )
          }
          if (this.allAccessApps === true && this.addOrderApps === true) {
            this.valueAddOrderApps.create = 2
            this.valueAddOrderApps.edit = 3
            this.valueAddOrderApps.delete = 4
            this.menu.push(
              {
                menu_position_id: this.valueAddOrderApps.menuPositionId,
                menu_access_id: this.valueAddOrderApps.create,
              },
              {
                menu_position_id: this.valueAddOrderApps.menuPositionId,
                menu_access_id: this.valueAddOrderApps.edit,
              },
              {
                menu_position_id: this.valueAddOrderApps.menuPositionId,
                menu_access_id: this.valueAddOrderApps.delete,
              },
            )
          }
          if (this.allAccessApps === true && this.dataOrderApps === true) {
            this.valueDataOrderApps.access = 1
            this.menu.push(
              {
                menu_position_id: this.valueAddOrderApps.menuPositionId,
                menu_access_id: this.valueDataOrderApps.access,
              },
            )
          }
          if (this.addOrderApps === true) {
            this.valueAddOrderApps.create = 2
            this.valueAddOrderApps.edit = 3
            this.valueAddOrderApps.delete = 4
            this.menu.push(
              {
                menu_position_id: this.valueAddOrderApps.menuPositionId,
                menu_access_id: this.valueAddOrderApps.create,
              },
              {
                menu_position_id: this.valueAddOrderApps.menuPositionId,
                menu_access_id: this.valueAddOrderApps.edit,
              },
              {
                menu_position_id: this.valueAddOrderApps.menuPositionId,
                menu_access_id: this.valueAddOrderApps.delete,
              },
            )
          }
          if (this.dataOrderApps === true) {
            this.valueDataOrderApps.access = 1
            this.menu.push(
              {
                menu_position_id: this.valueAddOrderApps.menuPositionId,
                menu_access_id: this.valueDataOrderApps.access,
              },
            )
          }
          if (this.addOrderApps === true && this.dataOrderApps === true) {
            this.valueAddOrderApps.create = 2
            this.valueAddOrderApps.edit = 3
            this.valueAddOrderApps.delete = 4
            this.valueDataOrderApps.access = 1
            this.menu.push(
              {
                menu_position_id: this.valueAddOrderApps.menuPositionId,
                menu_access_id: this.valueAddOrderApps.create,
              },
              {
                menu_position_id: this.valueAddOrderApps.menuPositionId,
                menu_access_id: this.valueAddOrderApps.edit,
              },
              {
                menu_position_id: this.valueAddOrderApps.menuPositionId,
                menu_access_id: this.valueAddOrderApps.delete,
              },
              {
                menu_position_id: this.valueAddOrderApps.menuPositionId,
                menu_access_id: this.valueDataOrderApps.access,
              },
            )
          }

          // Web
          if (this.allAccessWeb === true && this.addProdukWeb === true
              && this.dataProdukWeb === true && this.addOrderWeb === true
              && this.dataOrderWeb === true && this.ajukanPickup === true
              && this.historyPickup === true && this.penghasilan === true
              && this.saldo === true && this.settingProfile === true
              && this.accessAccount === true && this.addressPickup === true
              && this.settingRekening === true && this.settingPin === true && this.settinEkspedisi === true) {
            this.valueAddProdukWeb.create = 2
            this.valueAddProdukWeb.edit = 3
            this.valueAddProdukWeb.delete = 4
            this.valueDataProdukWeb.access = 1
            this.valueAddOrderWeb.create = 2
            this.valueAddOrderWeb.edit = 3
            this.valueAddOrderWeb.delete = 4
            this.valueDataOrderWeb.access = 1
            this.valueAjukanPickup.access = 5
            this.valueHistoryPickup.access = 6
            this.valuePenghasilan.access = 7
            this.valueSaldo.access = 8
            this.valueSettingProfile.access = 9
            this.valueAccessAccount.access = 10
            this.valueAddressPickup.access = 11
            this.valueSettingRekening.access = 12
            this.valueSettingPin.access = 13
            this.valueSettingEkspedisi.access = 14
            this.menu.push(
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueAddProdukWeb.create,
              },
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueAddProdukWeb.edit,
              },
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueAddProdukWeb.delete,
              },
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueDataProdukWeb.access,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueAddOrderWeb.create,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueAddOrderWeb.edit,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueAddOrderWeb.delete,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueDataOrderWeb.access,
              },
              {
                menu_position_id: this.valueAjukanPickup.menuPositionId,
                menu_access_id: this.valueAjukanPickup.access,
              },
              {
                menu_position_id: this.valueHistoryPickup.menuPositionId,
                menu_access_id: this.valueHistoryPickup.access,
              },
              {
                menu_position_id: this.valuePenghasilan.menuPositionId,
                menu_access_id: this.valuePenghasilan.access,
              },
              {
                menu_position_id: this.valueSaldo.menuPositionId,
                menu_access_id: this.valueSaldo.access,
              },
              {
                menu_position_id: this.valueSettingProfile.menuPositionId,
                menu_access_id: this.valueSettingProfile.access,
              },
              {
                menu_position_id: this.valueAccessAccount.menuPositionId,
                menu_access_id: this.valueAccessAccount.access,
              },
              {
                menu_position_id: this.valueAddressPickup.menuPositionId,
                menu_access_id: this.valueAddressPickup.access,
              },
              {
                menu_position_id: this.valueSettingRekening.menuPositionId,
                menu_access_id: this.valueSettingRekening.access,
              },
              {
                menu_position_id: this.valueSettingPin.menuPositionId,
                menu_access_id: this.valueSettingPin.access,
              },
              {
                menu_position_id: this.valueSettingEkspedisi.menuPositionId,
                menu_access_id: this.valueSettingEkspedisi.access,
              },
            )
          }
          if (this.allAccessWeb === true && this.addProdukWeb === true
              && this.dataProdukWeb === true && this.addOrderWeb === true
              && this.dataOrderWeb === true && this.ajukanPickup === true
              && this.historyPickup === true && this.penghasilan === true
              && this.saldo === true && this.settingProfile === true
              && this.accessAccount === true && this.addressPickup === true
              && this.settingRekening === true && this.settingPin === true) {
            this.valueAddProdukWeb.create = 2
            this.valueAddProdukWeb.edit = 3
            this.valueAddProdukWeb.delete = 4
            this.valueDataProdukWeb.access = 1
            this.valueAddOrderWeb.create = 2
            this.valueAddOrderWeb.edit = 3
            this.valueAddOrderWeb.delete = 4
            this.valueDataOrderWeb.access = 1
            this.valueAjukanPickup.access = 5
            this.valueHistoryPickup.access = 6
            this.valuePenghasilan.access = 7
            this.valueSaldo.access = 8
            this.valueSettingProfile.access = 9
            this.valueAccessAccount.access = 10
            this.valueAddressPickup.access = 11
            this.valueSettingRekening.access = 12
            this.valueSettingPin.access = 13
            this.menu.push(
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueAddProdukWeb.create,
              },
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueAddProdukWeb.edit,
              },
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueAddProdukWeb.delete,
              },
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueDataProdukWeb.access,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueAddOrderWeb.create,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueAddOrderWeb.edit,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueAddOrderWeb.delete,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueDataOrderWeb.access,
              },
              {
                menu_position_id: this.valueAjukanPickup.menuPositionId,
                menu_access_id: this.valueAjukanPickup.access,
              },
              {
                menu_position_id: this.valueHistoryPickup.menuPositionId,
                menu_access_id: this.valueHistoryPickup.access,
              },
              {
                menu_position_id: this.valuePenghasilan.menuPositionId,
                menu_access_id: this.valuePenghasilan.access,
              },
              {
                menu_position_id: this.valueSaldo.menuPositionId,
                menu_access_id: this.valueSaldo.access,
              },
              {
                menu_position_id: this.valueSettingProfile.menuPositionId,
                menu_access_id: this.valueSettingProfile.access,
              },
              {
                menu_position_id: this.valueAccessAccount.menuPositionId,
                menu_access_id: this.valueAccessAccount.access,
              },
              {
                menu_position_id: this.valueAddressPickup.menuPositionId,
                menu_access_id: this.valueAddressPickup.access,
              },
              {
                menu_position_id: this.valueSettingRekening.menuPositionId,
                menu_access_id: this.valueSettingRekening.access,
              },
              {
                menu_position_id: this.valueSettingPin.menuPositionId,
                menu_access_id: this.valueSettingPin.access,
              },
            )
          }
          if (this.allAccessWeb === true && this.addProdukWeb === true
              && this.dataProdukWeb === true && this.addOrderWeb === true
              && this.dataOrderWeb === true && this.ajukanPickup === true
              && this.historyPickup === true && this.penghasilan === true
              && this.saldo === true && this.settingProfile === true
              && this.accessAccount === true && this.addressPickup === true
              && this.settingRekening === true) {
            this.valueAddProdukWeb.create = 2
            this.valueAddProdukWeb.edit = 3
            this.valueAddProdukWeb.delete = 4
            this.valueDataProdukWeb.access = 1
            this.valueAddOrderWeb.create = 2
            this.valueAddOrderWeb.edit = 3
            this.valueAddOrderWeb.delete = 4
            this.valueDataOrderWeb.access = 1
            this.valueAjukanPickup.access = 5
            this.valueHistoryPickup.access = 6
            this.valuePenghasilan.access = 7
            this.valueSaldo.access = 8
            this.valueSettingProfile.access = 9
            this.valueAccessAccount.access = 10
            this.valueAddressPickup.access = 11
            this.valueSettingRekening.access = 12
            this.menu.push(
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueAddProdukWeb.create,
              },
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueAddProdukWeb.edit,
              },
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueAddProdukWeb.delete,
              },
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueDataProdukWeb.access,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueAddOrderWeb.create,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueAddOrderWeb.edit,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueAddOrderWeb.delete,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueDataOrderWeb.access,
              },
              {
                menu_position_id: this.valueAjukanPickup.menuPositionId,
                menu_access_id: this.valueAjukanPickup.access,
              },
              {
                menu_position_id: this.valueHistoryPickup.menuPositionId,
                menu_access_id: this.valueHistoryPickup.access,
              },
              {
                menu_position_id: this.valuePenghasilan.menuPositionId,
                menu_access_id: this.valuePenghasilan.access,
              },
              {
                menu_position_id: this.valueSaldo.menuPositionId,
                menu_access_id: this.valueSaldo.access,
              },
              {
                menu_position_id: this.valueSettingProfile.menuPositionId,
                menu_access_id: this.valueSettingProfile.access,
              },
              {
                menu_position_id: this.valueAccessAccount.menuPositionId,
                menu_access_id: this.valueAccessAccount.access,
              },
              {
                menu_position_id: this.valueAddressPickup.menuPositionId,
                menu_access_id: this.valueAddressPickup.access,
              },
              {
                menu_position_id: this.valueSettingRekening.menuPositionId,
                menu_access_id: this.valueSettingRekening.access,
              },
            )
          }
          if (this.allAccessWeb === true && this.addProdukWeb === true
              && this.dataProdukWeb === true && this.addOrderWeb === true
              && this.dataOrderWeb === true && this.ajukanPickup === true
              && this.historyPickup === true && this.penghasilan === true
              && this.saldo === true && this.settingProfile === true
              && this.accessAccount === true && this.addressPickup === true) {
            this.valueAddProdukWeb.create = 2
            this.valueAddProdukWeb.edit = 3
            this.valueAddProdukWeb.delete = 4
            this.valueDataProdukWeb.access = 1
            this.valueAddOrderWeb.create = 2
            this.valueAddOrderWeb.edit = 3
            this.valueAddOrderWeb.delete = 4
            this.valueDataOrderWeb.access = 1
            this.valueAjukanPickup.access = 5
            this.valueHistoryPickup.access = 6
            this.valuePenghasilan.access = 7
            this.valueSaldo.access = 8
            this.valueSettingProfile.access = 9
            this.valueAccessAccount.access = 10
            this.valueAddressPickup.access = 11
            this.menu.push(
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueAddProdukWeb.create,
              },
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueAddProdukWeb.edit,
              },
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueAddProdukWeb.delete,
              },
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueDataProdukWeb.access,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueAddOrderWeb.create,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueAddOrderWeb.edit,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueAddOrderWeb.delete,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueDataOrderWeb.access,
              },
              {
                menu_position_id: this.valueAjukanPickup.menuPositionId,
                menu_access_id: this.valueAjukanPickup.access,
              },
              {
                menu_position_id: this.valueHistoryPickup.menuPositionId,
                menu_access_id: this.valueHistoryPickup.access,
              },
              {
                menu_position_id: this.valuePenghasilan.menuPositionId,
                menu_access_id: this.valuePenghasilan.access,
              },
              {
                menu_position_id: this.valueSaldo.menuPositionId,
                menu_access_id: this.valueSaldo.access,
              },
              {
                menu_position_id: this.valueSettingProfile.menuPositionId,
                menu_access_id: this.valueSettingProfile.access,
              },
              {
                menu_position_id: this.valueAccessAccount.menuPositionId,
                menu_access_id: this.valueAccessAccount.access,
              },
              {
                menu_position_id: this.valueAddressPickup.menuPositionId,
                menu_access_id: this.valueAddressPickup.access,
              },
            )
          }
          if (this.allAccessWeb === true && this.addProdukWeb === true
              && this.dataProdukWeb === true && this.addOrderWeb === true
              && this.dataOrderWeb === true && this.ajukanPickup === true
              && this.historyPickup === true && this.penghasilan === true
              && this.saldo === true && this.settingProfile === true
              && this.accessAccount === true) {
            this.valueAddProdukWeb.create = 2
            this.valueAddProdukWeb.edit = 3
            this.valueAddProdukWeb.delete = 4
            this.valueDataProdukWeb.access = 1
            this.valueAddOrderWeb.create = 2
            this.valueAddOrderWeb.edit = 3
            this.valueAddOrderWeb.delete = 4
            this.valueDataOrderWeb.access = 1
            this.valueAjukanPickup.access = 5
            this.valueHistoryPickup.access = 6
            this.valuePenghasilan.access = 7
            this.valueSaldo.access = 8
            this.valueSettingProfile.access = 9
            this.valueAccessAccount.access = 10
            this.menu.push(
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueAddProdukWeb.create,
              },
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueAddProdukWeb.edit,
              },
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueAddProdukWeb.delete,
              },
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueDataProdukWeb.access,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueAddOrderWeb.create,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueAddOrderWeb.edit,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueAddOrderWeb.delete,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueDataOrderWeb.access,
              },
              {
                menu_position_id: this.valueAjukanPickup.menuPositionId,
                menu_access_id: this.valueAjukanPickup.access,
              },
              {
                menu_position_id: this.valueHistoryPickup.menuPositionId,
                menu_access_id: this.valueHistoryPickup.access,
              },
              {
                menu_position_id: this.valuePenghasilan.menuPositionId,
                menu_access_id: this.valuePenghasilan.access,
              },
              {
                menu_position_id: this.valueSaldo.menuPositionId,
                menu_access_id: this.valueSaldo.access,
              },
              {
                menu_position_id: this.valueSettingProfile.menuPositionId,
                menu_access_id: this.valueSettingProfile.access,
              },
              {
                menu_position_id: this.valueAccessAccount.menuPositionId,
                menu_access_id: this.valueAccessAccount.access,
              },
            )
          }
          if (this.allAccessWeb === true && this.addProdukWeb === true
              && this.dataProdukWeb === true && this.addOrderWeb === true
              && this.dataOrderWeb === true && this.ajukanPickup === true
              && this.historyPickup === true && this.penghasilan === true
              && this.saldo === true && this.settingProfile === true) {
            this.valueAddProdukWeb.create = 2
            this.valueAddProdukWeb.edit = 3
            this.valueAddProdukWeb.delete = 4
            this.valueDataProdukWeb.access = 1
            this.valueAddOrderWeb.create = 2
            this.valueAddOrderWeb.edit = 3
            this.valueAddOrderWeb.delete = 4
            this.valueDataOrderWeb.access = 1
            this.valueAjukanPickup.access = 5
            this.valueHistoryPickup.access = 6
            this.valuePenghasilan.access = 7
            this.valueSaldo.access = 8
            this.valueSettingProfile.access = 9
            this.menu.push(
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueAddProdukWeb.create,
              },
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueAddProdukWeb.edit,
              },
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueAddProdukWeb.delete,
              },
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueDataProdukWeb.access,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueAddOrderWeb.create,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueAddOrderWeb.edit,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueAddOrderWeb.delete,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueDataOrderWeb.access,
              },
              {
                menu_position_id: this.valueAjukanPickup.menuPositionId,
                menu_access_id: this.valueAjukanPickup.access,
              },
              {
                menu_position_id: this.valueHistoryPickup.menuPositionId,
                menu_access_id: this.valueHistoryPickup.access,
              },
              {
                menu_position_id: this.valuePenghasilan.menuPositionId,
                menu_access_id: this.valuePenghasilan.access,
              },
              {
                menu_position_id: this.valueSaldo.menuPositionId,
                menu_access_id: this.valueSaldo.access,
              },
              {
                menu_position_id: this.valueSettingProfile.menuPositionId,
                menu_access_id: this.valueSettingProfile.access,
              },
            )
          }
          if (this.allAccessWeb === true && this.addProdukWeb === true
              && this.dataProdukWeb === true && this.addOrderWeb === true
              && this.dataOrderWeb === true && this.ajukanPickup === true
              && this.historyPickup === true && this.penghasilan === true
              && this.saldo === true) {
            this.valueAddProdukWeb.create = 2
            this.valueAddProdukWeb.edit = 3
            this.valueAddProdukWeb.delete = 4
            this.valueDataProdukWeb.access = 1
            this.valueAddOrderWeb.create = 2
            this.valueAddOrderWeb.edit = 3
            this.valueAddOrderWeb.delete = 4
            this.valueDataOrderWeb.access = 1
            this.valueAjukanPickup.access = 5
            this.valueHistoryPickup.access = 6
            this.valuePenghasilan.access = 7
            this.valueSaldo.access = 8
            this.menu.push(
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueAddProdukWeb.create,
              },
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueAddProdukWeb.edit,
              },
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueAddProdukWeb.delete,
              },
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueDataProdukWeb.access,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueAddOrderWeb.create,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueAddOrderWeb.edit,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueAddOrderWeb.delete,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueDataOrderWeb.access,
              },
              {
                menu_position_id: this.valueAjukanPickup.menuPositionId,
                menu_access_id: this.valueAjukanPickup.access,
              },
              {
                menu_position_id: this.valueHistoryPickup.menuPositionId,
                menu_access_id: this.valueHistoryPickup.access,
              },
              {
                menu_position_id: this.valuePenghasilan.menuPositionId,
                menu_access_id: this.valuePenghasilan.access,
              },
              {
                menu_position_id: this.valueSaldo.menuPositionId,
                menu_access_id: this.valueSaldo.access,
              },
            )
          }
          if (this.allAccessWeb === true && this.addProdukWeb === true
              && this.dataProdukWeb === true && this.addOrderWeb === true
              && this.dataOrderWeb === true && this.ajukanPickup === true
              && this.historyPickup === true && this.penghasilan === true) {
            this.valueAddProdukWeb.create = 2
            this.valueAddProdukWeb.edit = 3
            this.valueAddProdukWeb.delete = 4
            this.valueDataProdukWeb.access = 1
            this.valueAddOrderWeb.create = 2
            this.valueAddOrderWeb.edit = 3
            this.valueAddOrderWeb.delete = 4
            this.valueDataOrderWeb.access = 1
            this.valueAjukanPickup.access = 5
            this.valueHistoryPickup.access = 6
            this.valuePenghasilan.access = 7
            this.menu.push(
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueAddProdukWeb.create,
              },
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueAddProdukWeb.edit,
              },
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueAddProdukWeb.delete,
              },
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueDataProdukWeb.access,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueAddOrderWeb.create,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueAddOrderWeb.edit,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueAddOrderWeb.delete,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueDataOrderWeb.access,
              },
              {
                menu_position_id: this.valueAjukanPickup.menuPositionId,
                menu_access_id: this.valueAjukanPickup.access,
              },
              {
                menu_position_id: this.valueHistoryPickup.menuPositionId,
                menu_access_id: this.valueHistoryPickup.access,
              },
              {
                menu_position_id: this.valuePenghasilan.menuPositionId,
                menu_access_id: this.valuePenghasilan.access,
              },
            )
          }
          if (this.allAccessWeb === true && this.addProdukWeb === true
              && this.dataProdukWeb === true && this.addOrderWeb === true
              && this.dataOrderWeb === true && this.ajukanPickup === true
              && this.historyPickup === true) {
            this.valueAddProdukWeb.create = 2
            this.valueAddProdukWeb.edit = 3
            this.valueAddProdukWeb.delete = 4
            this.valueDataProdukWeb.access = 1
            this.valueAddOrderWeb.create = 2
            this.valueAddOrderWeb.edit = 3
            this.valueAddOrderWeb.delete = 4
            this.valueDataOrderWeb.access = 1
            this.valueAjukanPickup.access = 5
            this.valueHistoryPickup.access = 6
            this.menu.push(
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueAddProdukWeb.create,
              },
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueAddProdukWeb.edit,
              },
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueAddProdukWeb.delete,
              },
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueDataProdukWeb.access,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueAddOrderWeb.create,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueAddOrderWeb.edit,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueAddOrderWeb.delete,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueDataOrderWeb.access,
              },
              {
                menu_position_id: this.valueAjukanPickup.menuPositionId,
                menu_access_id: this.valueAjukanPickup.access,
              },
              {
                menu_position_id: this.valueHistoryPickup.menuPositionId,
                menu_access_id: this.valueHistoryPickup.access,
              },
            )
          }
          if (this.allAccessWeb === true && this.addProdukWeb === true
              && this.dataProdukWeb === true && this.addOrderWeb === true
              && this.dataOrderWeb === true && this.ajukanPickup === true) {
            this.valueAddProdukWeb.create = 2
            this.valueAddProdukWeb.edit = 3
            this.valueAddProdukWeb.delete = 4
            this.valueDataProdukWeb.access = 1
            this.valueAddOrderWeb.create = 2
            this.valueAddOrderWeb.edit = 3
            this.valueAddOrderWeb.delete = 4
            this.valueDataOrderWeb.access = 1
            this.valueAjukanPickup.access = 5
            this.menu.push(
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueAddProdukWeb.create,
              },
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueAddProdukWeb.edit,
              },
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueAddProdukWeb.delete,
              },
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueDataProdukWeb.access,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueAddOrderWeb.create,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueAddOrderWeb.edit,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueAddOrderWeb.delete,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueDataOrderWeb.access,
              },
              {
                menu_position_id: this.valueAjukanPickup.menuPositionId,
                menu_access_id: this.valueAjukanPickup.access,
              },
            )
          }
          if (this.allAccessWeb === true && this.addProdukWeb === true
              && this.dataProdukWeb === true && this.addOrderWeb === true
              && this.dataOrderWeb === true) {
            this.valueAddProdukWeb.create = 2
            this.valueAddProdukWeb.edit = 3
            this.valueAddProdukWeb.delete = 4
            this.valueDataProdukWeb.access = 1
            this.valueAddOrderWeb.create = 2
            this.valueAddOrderWeb.edit = 3
            this.valueAddOrderWeb.delete = 4
            this.valueDataOrderWeb.access = 1
            this.menu.push(
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueAddProdukWeb.create,
              },
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueAddProdukWeb.edit,
              },
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueAddProdukWeb.delete,
              },
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueDataProdukWeb.access,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueAddOrderWeb.create,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueAddOrderWeb.edit,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueAddOrderWeb.delete,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueDataOrderWeb.access,
              },
            )
          }
          if (this.allAccessWeb === true && this.addProdukWeb === true
              && this.dataProdukWeb === true && this.addOrderWeb === true) {
            this.valueAddProdukWeb.create = 2
            this.valueAddProdukWeb.edit = 3
            this.valueAddProdukWeb.delete = 4
            this.valueDataProdukWeb.access = 1
            this.valueAddOrderWeb.create = 2
            this.valueAddOrderWeb.edit = 3
            this.valueAddOrderWeb.delete = 4
            this.menu.push(
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueAddProdukWeb.create,
              },
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueAddProdukWeb.edit,
              },
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueAddProdukWeb.delete,
              },
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueDataProdukWeb.access,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueAddOrderWeb.create,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueAddOrderWeb.edit,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueAddOrderWeb.delete,
              },
            )
          }
          if (this.allAccessWeb === true && this.addProdukWeb === true
              && this.dataProdukWeb === true) {
            this.valueAddProdukWeb.create = 2
            this.valueAddProdukWeb.edit = 3
            this.valueAddProdukWeb.delete = 4
            this.valueDataProdukWeb.access = 1
            this.menu.push(
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueAddProdukWeb.create,
              },
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueAddProdukWeb.edit,
              },
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueAddProdukWeb.delete,
              },
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueDataProdukWeb.access,
              },
            )
          }
          if (this.allAccessWeb === true && this.addProdukWeb === true) {
            this.valueAddProdukWeb.create = 2
            this.valueAddProdukWeb.edit = 3
            this.valueAddProdukWeb.delete = 4
            this.menu.push(
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueAddProdukWeb.create,
              },
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueAddProdukWeb.edit,
              },
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueAddProdukWeb.delete,
              },
            )
          }

          if (this.addProdukWeb === true) {
            this.valueAddProdukWeb.create = 2
            this.valueAddProdukWeb.edit = 3
            this.valueAddProdukWeb.delete = 4
            this.menu.push(
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueAddProdukWeb.create,
              },
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueAddProdukWeb.edit,
              },
              {
                menu_position_id: this.valueAddProdukWeb.menuPositionId,
                menu_access_id: this.valueAddProdukWeb.delete,
              },
            )
          }

          if (this.dataProdukWeb === true) {
            this.valueDataProdukWeb.access = 1
            this.menu.push(
              {
                menu_position_id: this.valueDataProdukWeb.menuPositionId,
                menu_access_id: this.valueDataProdukWeb.access,
              },
            )
          }

          if (this.addOrderWeb === true) {
            this.valueAddOrderWeb.create = 2
            this.valueAddOrderWeb.edit = 3
            this.valueAddOrderWeb.delete = 4
            this.menu.push(
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueAddOrderWeb.create,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueAddOrderWeb.edit,
              },
              {
                menu_position_id: this.valueAddOrderWeb.menuPositionId,
                menu_access_id: this.valueAddOrderWeb.delete,
              },
            )
          }

          if (this.dataOrderWeb === true) {
            this.valueDataOrderWeb.access = 1
            this.menu.push(
              {
                menu_position_id: this.valueDataOrderWeb.menuPositionId,
                menu_access_id: this.valueDataOrderWeb.access,
              },
            )
          }

          if (this.ajukanPickup === true) {
            this.valueAjukanPickup.access = 5
            this.menu.push(
              {
                menu_position_id: this.valueAjukanPickup.menuPositionId,
                menu_access_id: this.valueAjukanPickup.access,
              },
            )
          }

          if (this.historyPickup === true) {
            this.valueHistoryPickup.access = 6
            this.menu.push(
              {
                menu_position_id: this.valueHistoryPickup.menuPositionId,
                menu_access_id: this.valueHistoryPickup.access,
              },
            )
          }

          if (this.penghasilan === true) {
            this.valuePenghasilan.access = 7
            this.menu.push(
              {
                menu_position_id: this.valuePenghasilan.menuPositionId,
                menu_access_id: this.valuePenghasilan.access,
              },
            )
          }

          if (this.saldo === true) {
            this.valueSaldo.access = 8
            this.menu.push(
              {
                menu_position_id: this.valueSaldo.menuPositionId,
                menu_access_id: this.valueSaldo.access,
              },
            )
          }

          if (this.settingProfile === true) {
            this.valueSettingProfile.access = 9
            this.menu.push(
              {
                menu_position_id: this.valueSettingProfile.menuPositionId,
                menu_access_id: this.valueSettingProfile.access,
              },
            )
          }

          if (this.accessAccount === true) {
            this.valueAccessAccount.access = 10
            this.menu.push(
              {
                menu_position_id: this.valueAccessAccount.menuPositionId,
                menu_access_id: this.valueAccessAccount.access,
              },
            )
          }

          if (this.addressPickup === true) {
            this.valueAddressPickup.access = 11
            this.menu.push(
              {
                menu_position_id: this.valueAddressPickup.menuPositionId,
                menu_access_id: this.valueAddressPickup.access,
              },
            )
          }

          if (this.settingRekening === true) {
            this.valueSettingRekening.access = 12
            this.menu.push(
              {
                menu_position_id: this.valueSettingRekening.menuPositionId,
                menu_access_id: this.valueSettingRekening.access,
              },
            )
          }

          if (this.settingPin === true) {
            this.valueSettingPin.access = 13
            this.menu.push(
              {
                menu_position_id: this.valueSettingPin.menuPositionId,
                menu_access_id: this.valueSettingPin.access,
              },
            )
          }

          if (this.settingEkspedisi === true) {
            this.valueSettingEkspedisi.access = 14
            this.menu.push(
              {
                menu_position_id: this.valueSettingEkspedisi.menuPositionId,
                menu_access_id: this.valueSettingEkspedisi.access,
              },
            )
          }

          console.log(this.menu)

          this.loadingSubmit = true
          this.$http.post('/user/partner/create-account', {
            username: this.fullname,
            password: this.password,
            full_name: this.fullname,
            email: this.emailUser,
            menu: this.menu,
            partner_id: this.partnerId,
          }, {
            headers: { Authorization: `Bearer ${useJwt.getToken()}` },
          }).then(response => {
            const { data } = response
            if (data.code === 400) {
              this.loadingSubmit = false
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Failed',
                  icon: 'AlertCircleIcon',
                  text: 'Username or Email has already taken!',
                  variant: 'Danger',
                },
              })
            } else {
              this.loadingSubmit = false
              this.$refs['modal-add-account'].hide()
              this.refreshTable()
            }
            console.log(data)
          }).catch(error => {
            this.loadingSubmit = false
            console.log(error)
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Gagal',
                icon: 'AlertCircleIcon',
                text: 'Gagal menambahkan akses orang, silahkan coba lagi',
                variant: 'Danger',
              },
            })
          })
        } else {
          this.loadingSubmit = false
        }
      })
    },
    editAccess(data) {
      this.editMode = true
      console.log(data)
      this.$refs['modal-add-account'].show()
    },
    submitEditAccess() {

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
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Success',
            icon: 'CheckIcon',
            text: 'Success delete access',
            variant: 'success',
          },
        })
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
      this.cekAllApps = false
      this.addOrderApps = false
      this.dataOrderApps = false
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
      this.fullname = ''
      this.emailUser = ''
      this.password = ''
      this.$refs['modal-add-account'].show()
    },
    loadPartner() {
      return this.$httpKomship.post('v1/my-profile', {},
        {
          headers: { Authorization: `Bearer ${useJwt.getToken()}` },
        }).then(response => {
        this.partnerId = response.data.data.partner_id
      })
    },
    loadMenuAccess() {
      this.$http.get('/user/partner/get-menu-member', {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(response => {
        const { data } = response.data
        // Apps
        this.valueAddOrderApps.menuPositionId = data[2].menu_position[0].id
        this.valueDataOrderApps.menuPositionId = data[2].menu_position[0].id

        // Web
        this.valueAddProdukWeb.menuPositionId = data[0].menu_position[0].id
        this.valueDataProdukWeb.menuPositionId = data[0].menu_position[0].id
        this.valueAddOrderWeb.menuPositionId = data[1].menu_position[0].id
        this.valueDataOrderWeb.menuPositionId = data[1].menu_position[0].id
        this.valueAjukanPickup.menuPositionId = data[3].menu_position[0].id
        this.valueHistoryPickup.menuPositionId = data[3].menu_position[0].id
        this.valuePenghasilan.menuPositionId = data[4].menu_position[0].id
        this.valueSaldo.menuPositionId = data[4].menu_position[0].id
        this.valueSettingProfile.menuPositionId = data[5].menu_position[0].id
        this.valueAccessAccount.menuPositionId = data[5].menu_position[0].id
        this.valueAddressPickup.menuPositionId = data[5].menu_position[0].id
        this.valueSettingRekening.menuPositionId = data[5].menu_position[0].id
        this.valueSettingPin.menuPositionId = data[5].menu_position[0].id
        this.valueSettingEkspedisi.menuPositionId = data[5].menu_position[0].id
      })
    },
  },

}
</script>

<style>

</style>
