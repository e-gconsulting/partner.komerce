<template>
  <b-card-actions
    ref="formCard"
    title="Tambah Produk"
    no-actions
  >
    <b-form
      class="mt-3"
      @submit.prevent
    >
      <b-row>
        <b-col cols="12">
          <b-form-group
            label="Nama Produk"
            label-cols-md="2"
          >
            <b-form-input
              placeholder="Masukan nama produk kamu"
            />
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <b-form-group
            label="SKU Produk"
            label-cols-md="2"
          >
            <b-form-input
              placeholder="Masukan SKU produk kamu"
            />
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <b-form-group
            label="Masukan Deskripsi"
            label-cols-md="2"
          >
            <b-form-textarea
              id="textarea-default"
              placeholder="Masukan deskripsi produk kamu"
              rows="3"
            />
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <b-form-group
            label="Variasi"
            label-cols-md="2"
          >
            <b-button
              v-ripple.400="'rgba(113, 102, 240, 0.15)'"
              variant="outline-info"
            >
              <feather-icon
                icon="PlusIcon"
                class="mr-50"
              />
              <span class="align-middle">Tambahkan Variasi</span>
            </b-button>

            <b-form-group
              label="Variasi 1"
              label-cols-md="2"
              class="mt-1"
            >
              <b-col cols="8">
                <b-form-group
                  label="Nama"
                  label-cols-md="3"
                >
                  <b-form-input
                    placeholder="Masukan nama variasi"
                  />
                </b-form-group>
              </b-col>

              <b-col cols="8">
                <b-form-group
                  label="Pilihan"
                  label-cols-md="3"
                >
                  <b-form-input
                    placeholder="Masukan pilihan variasi"
                  />
                </b-form-group>
              </b-col>

              <b-col cols="8">
                <b-form-group
                  label=""
                  label-cols-md="3"
                >
                  <b-button
                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                    variant="outline-info"
                  >
                    <feather-icon
                      icon="PlusIcon"
                      class="mr-50"
                    />
                    <span class="align-middle">Tambahkan Pilihan</span>
                  </b-button>
                </b-form-group>
              </b-col>

            </b-form-group>

            <b-form-group
              label="Variasi 2"
              label-cols-md="2"
              class="mt-1"
            >
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="outline-info"
                @click="tesAdd"
              >
                <feather-icon
                  icon="PlusIcon"
                  class="mr-50"
                />
                <span class="align-middle">Tambahkan Variasi</span>
              </b-button>
            </b-form-group>

            <b-form-group
              label="Info Variasi"
              label-cols-md="2"
              class="mt-2"
            >
              <b-row class="d-flex align-items-center">
                <b-col md="4">
                  <b-form-input
                    placeholder="Rp | Harga"
                  />
                </b-col>

                <b-col md="2">
                  <b-form-input
                    placeholder="Stok"
                  />
                </b-col>

                <b-col md="6">
                  <b-button
                    variant="primary"
                  >
                    Terapkan Kesemua
                  </b-button>
                </b-col>

              </b-row>
            </b-form-group>

            <b-form-group
              label="Daftar Variasi"
              label-cols-md="2"
              class="mt-2"
            >
              <b-table
                :items="items"
                :fields="fields"
                class="border"
              >

                <template #cell(name)="data">
                  {{ data.value }}
                </template>

                <template #cell(action)>
                  <b-button
                    variant="flat-secondary"
                    class="btn-icon"
                  >
                    <feather-icon
                      icon="EditIcon"
                    />
                  </b-button>
                </template>

              </b-table>
            </b-form-group>

          </b-form-group>
        </b-col>

        <b-col cols="12">
          <b-form-group
            label="Pengiriman"
            label-cols-md="2"
          />
        </b-col>

        <b-col md="4">
          <b-form-group
            label="Berat"
            label-cols-md="3"
            class="ml-5"
          >
            <b-col class="d-flex align-items-center">
              <b-input-group class="input-group-merge">
                <b-form-input
                  id="hi-first-name"
                  placeholder="1000"
                />
                <b-input-group-append is-text>
                  cm
                </b-input-group-append>
              </b-input-group>
            </b-col>
          </b-form-group>
        </b-col>

        <b-col md="12">
          <b-form-group
            label="Ukuran"
            label-cols-md="1"
            content-cols-md="5"
            class="ml-5"
          >
            <b-row
              class="d-flex align-items-center"
            >
              <b-col class="d-flex align-items-center">
                <b-input-group class="input-group-merge">
                  <b-form-input
                    id="hi-first-name"
                    placeholder="P"
                  />
                  <b-input-group-append is-text>
                    cm
                  </b-input-group-append>
                </b-input-group>
              </b-col>
              <b-col class="d-flex align-items-center">
                <b-input-group class="input-group-merge">
                  <b-form-input
                    id="hi-first-name"
                    placeholder="L"
                  />
                  <b-input-group-append is-text>
                    cm
                  </b-input-group-append>
                </b-input-group>
              </b-col>
              <b-col class="d-flex align-items-center">
                <b-input-group class="input-group-merge">
                  <b-form-input
                    id="hi-first-name"
                    placeholder="T"
                  />
                  <b-input-group-append is-text>
                    cm
                  </b-input-group-append>
                </b-input-group>
              </b-col>
            </b-row>
          </b-form-group>
        </b-col>

        <b-col
          cols="10"
          class="mt-2"
        >
          <b-form-group
            label="Pembayaran"
            label-cols-sm="2"
          >
            <div
              class="demo-inline-spacing"
            >
              <b-form-checkbox
                v-model="selected"
                value="A"
                class="custom-control-primary"
              >
                Bayar Ditempat (COD)
              </b-form-checkbox>
              <b-form-checkbox
                v-model="selected"
                value="A"
                class="custom-control-primary"
              >
                Transfer Bank
              </b-form-checkbox>
            </div>
          </b-form-group>
        </b-col>

        <!-- submit and reset -->
        <b-col
          cols="12"
          class="d-flex justify-content-end pb-2 pr-2"
        >
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            type="submit"
            variant="outline-primary"
            class="mr-1"
          >
            Simpan Draft
          </b-button>
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            type="reset"
            variant="primary"
          >
            Publish
          </b-button>
        </b-col>
      </b-row>

    </b-form>
  </b-card-actions>
</template>

<script>
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BForm,
  BButton,
  BFormTextarea,
  BTable,
  BFormCheckbox,
  BInputGroupAppend,
  BInputGroup,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import BCardActions from '@/@core/components/b-card-actions/BCardActions.vue'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BButton,
    BCardActions,
    BFormTextarea,
    BTable,
    BFormCheckbox,
    BInputGroupAppend,
    BInputGroup,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      selected: ['A'],
      fields: [
        { key: 'name', label: 'Nama' },
        { key: 'ukuran', label: 'Ukuran' },
        { key: 'price', label: 'Harga' },
        { key: 'stok', label: 'Stok' },
        { key: 'action', label: 'Aksi' },
      ],

      items: [
        {
          name: 'Hijau',
          ukuran: 'L',
          price: 'Rp. 9000',
          stok: 9,
        },
        {
          name: 'Hijau',
          ukuran: 'XL',
          price: 'Rp. 1000',
          stok: 9,
        },
        {
          name: 'Kuning',
          ukuran: 'XL',
          price: 'Rp. 9000',
          stok: 9,
        },
      ],
    }
  },
  methods: {
    tesAdd() {
      console.log('tes')
    },
  },
}
</script>

<style scoped>

</style>
