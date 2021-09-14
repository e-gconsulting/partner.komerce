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
              <b-form-input />
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
              <b-form-checkbox>
                <h5>
                  <strong>Akses Aplikasi</strong>
                </h5>
              </b-form-checkbox>

              <b-col
                cols="12"
                class="mt-1"
              >
                <b-form-group>
                  <b-form-checkbox>
                    Tambah Order
                  </b-form-checkbox>
                </b-form-group>
              </b-col>

              <b-col cols="12">
                <b-form-group>
                  <b-form-checkbox>
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
              <b-form-checkbox>
                <h5>
                  <strong>Akses Website</strong>
                </h5>
              </b-form-checkbox>

              <p class="mt-50 ml-1">
                <strong>Produk</strong>
              </p>

              <b-col cols="12">
                <b-form-group>
                  <b-form-checkbox>
                    Tambah Order
                  </b-form-checkbox>
                </b-form-group>
              </b-col>

              <b-col cols="12">
                <b-form-group>
                  <b-form-checkbox>
                    Data Order
                  </b-form-checkbox>
                </b-form-group>
              </b-col>

              <p class="mt-50 ml-1">
                <strong>Orderan</strong>
              </p>

              <b-col cols="12">
                <b-form-group>
                  <b-form-checkbox>
                    Tambah Order
                  </b-form-checkbox>
                </b-form-group>
              </b-col>

              <b-col cols="12">
                <b-form-group>
                  <b-form-checkbox>
                    Data Order
                  </b-form-checkbox>
                </b-form-group>
              </b-col>

              <p class="mt-50 ml-1">
                <strong>Pickup</strong>
              </p>

              <b-col cols="12">
                <b-form-group>
                  <b-form-checkbox>
                    Ajukan Pickup
                  </b-form-checkbox>
                </b-form-group>
              </b-col>

              <b-col cols="12">
                <b-form-group>
                  <b-form-checkbox>
                    Riwayat Pickup
                  </b-form-checkbox>
                </b-form-group>
              </b-col>

              <p class="mt-50 ml-1">
                <strong>Keuangan</strong>
              </p>

              <b-col cols="12">
                <b-form-group>
                  <b-form-checkbox>
                    Penghasilan
                  </b-form-checkbox>
                </b-form-group>
              </b-col>

              <b-col cols="12">
                <b-form-group>
                  <b-form-checkbox>
                    Saldo
                  </b-form-checkbox>
                </b-form-group>
              </b-col>

              <p class="mt-50 ml-1">
                <strong>Pengaturan</strong>
              </p>

              <b-col cols="12">
                <b-form-group>
                  <b-form-checkbox>
                    Edit Profile
                  </b-form-checkbox>
                </b-form-group>
              </b-col>

              <b-col cols="12">
                <b-form-group>
                  <b-form-checkbox>
                    Akses Akun
                  </b-form-checkbox>
                </b-form-group>
              </b-col>

              <b-col cols="12">
                <b-form-group>
                  <b-form-checkbox>
                    Alamat Pickup
                  </b-form-checkbox>
                </b-form-group>
              </b-col>

              <b-col cols="12">
                <b-form-group>
                  <b-form-checkbox>
                    Rekening Bank
                  </b-form-checkbox>
                </b-form-group>
              </b-col>

              <b-col cols="12">
                <b-form-group>
                  <b-form-checkbox>
                    PIN
                  </b-form-checkbox>
                </b-form-group>
              </b-col>

              <b-col cols="12">
                <b-form-group>
                  <b-form-checkbox>
                    Ekspedisi
                  </b-form-checkbox>
                </b-form-group>
              </b-col>

            </b-form-group>
          </b-col>

        </b-row>
      </b-form>
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
    }
  },

}
</script>

<style>

</style>
