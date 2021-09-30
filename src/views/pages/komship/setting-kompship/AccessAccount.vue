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
        <b-table
          :fields="fields"
          :items="items"
        >

          <template #cell(name)="data">
            <h5>
              <strong>{{ data.value }}</strong>
            </h5>
            <p>
              maung@gmail.com
            </p>
          </template>

          <template #cell(action)>
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
                @click="tes()"
              >
                Hapus
              </b-button>
            </b-col>
          </template>

        </b-table>
      </b-col>
    </b-row>

    <b-row class="mt-2">
      <b-button
        v-b-modal.modal-primary
        variant="outline-primary"
        class="ml-1"
      >
        Tambah Orang
      </b-button>
    </b-row>

    <b-modal
      id="modal-primary"
      scrollable
      title="Tambah Orang"
      ok-only
      ok-title="Simpan"
      cancel-variant="outline-primary"
    >
      <b-form @submit.prevent>
        <b-row>

          <b-col cols="10">
            <b-form-group
              label="Nama"
            >
              <b-form-input
                v-model="name"
              />
            </b-form-group>
          </b-col>

          <b-col cols="10">
            <b-form-group
              label="Email"
            >
              <b-form-input />
            </b-form-group>
          </b-col>

          <b-col cols="10">
            <b-form-group
              label="Password"
            >
              <b-form-input />
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
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

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
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {

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
          key: 'name', label: 'Nama',
        },
        {
          key: 'access', label: 'akses',
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
    }
  },
  methods: {
    addAccount() {
      this.items.push({ name: this.name, access: 'Tambah Produk' })
    },
    tes() {
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
  },

}
</script>

<style>

</style>
