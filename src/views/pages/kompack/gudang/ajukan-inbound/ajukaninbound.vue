<template>
  <div class="card p-3">
    <div class="d-flex flex-row justify-content-between align-items-center">
      <div><h3>Ajukan Inbound</h3></div>
      <div class="d-flex flex-row">
        <b-button
          class="ml-1"
          variant="secondary"
          @click="submitBerlangganan()"
        >
          Ajukan Inbound
        </b-button>
      </div>
    </div>
    <div class="card-custom d-flex flex-col mt-2 px-3 py-2">
      <div class="d-flex flex-row justify-content-between">
        <div class="d-flex flex-row align-items-center">
          <div class="ml-0 mt-0 d-flex flex-col text-dark">
            <h5>Data Inbound</h5>
          </div>
        </div>
        <div />
      </div>
      <form>
        <div class="form-group row">
          <label
            for="dikirim"
            class="col-sm-2 col-form-label"
          >Dikirim dari</label>
          <div class="col-sm-10">
            <input
              id="inputgudang"
              type="input"
              class="form-control"
              placeholder="Masukan Alamat Pengirim"
            >
          </div>
        </div>
        <div class="form-group row">
          <label
            for="kirimke"
            class="col-sm-2 col-form-label"
          > Kirim Ke</label>
          <div class="col-sm-10">
            <select
              id="jenisgudang"
              class="form-control"
            >
              <option>Pilih Mitra Gudang</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-12">
            <b-button
              class="ml-100"
              variant="btn btn-outline-primary"
              @click="kirimekpedisi()"
            >
              <img
                src="https://storage.googleapis.com/komerce/assets/dikirimekpedisi.svg"
              >
              Dikirim Ekpedisi
            </b-button>
            &nbsp;
            <b-button
              class="ml-100"
              variant="btn btn-outline-primary"
              @click="kirimpribadi()"
            >
            <img
                src="https://storage.googleapis.com/komerce/assets/ekpedisidikirim-pribadi.svg"
              >
              Dikirim Sendiri
            </b-button>
          </div>
        </div>
      </form>
    </div>
    <div class="mt-3">
      <div class="d-flex justify-content-end">
        <div class="mb-2">
          <b-input-group class="input-group-merge">
            <b-input-group-prepend is-text>
              <feather-icon icon="SearchIcon" />
            </b-input-group-prepend>
            <b-form-input
              v-model="searchProduct"
              placeholder="Cari nama produk"
              @input="getsearchProduct()"
            />
          </b-input-group>
        </div>
      </div>
      <div class="d-flex flex-column w-100">
        <table class="table  table-hover">
          <thead>
            <tr>
              <th>
                <label class="form-checkbox">
                  <b-form-checkbox
                    v-model="selectAll"
                    @click="selectItemEvent()"
                  >
                    <i class="form-icon" />
                  </b-form-checkbox></label>
              </th>
              <th>Nama Produk</th>
              <th>Volume</th>
              <th>Harga Barang</th>
              <th>Bahan Packing</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="i in productList"
              :key="i.id"
            >
              <td>
                <label class="form-checkbox">
                  <b-form-checkbox
                    :id="i.sku"
                    v-model="i.selected"
                    @change="selectItemOneEvent(i,$event)"
                  >
                    <i class="form-icon" />
                  </b-form-checkbox></label>
              </td>
              <td> <div class="d-flex flex-row align-items-center">
                <div>
                  <img
                    :src="i.image_path"
                    width="50px"
                    height="50px"
                    alt=""
                  >
                </div>
                <div class="d-flex flex-column ml-1">
                  <div><h5>{{ i.product_name }}</h5></div>
                  <div class="">
                    {{ i.sku }}
                  </div>
                </div>
              </div></td>
              <td><div class="d-flex flex-column">
                <div>P: {{ i.product_lenght }} cm</div>
                <div>L: {{ i.product_width }} cm</div>
                <div>T: {{ i.product_height }} cm</div>
              </div>
              </td>
              <td>{{ i.range_price }}</td>
              <td>
                <b-form-select
                  v-model="i.packing_material"
                  @change="selectBahanEvent(i,$event)"
                >
                  <template #first>
                    <b-form-select-option
                      :value="null"
                      disabled
                    >
                      Pilih bahan packing
                    </b-form-select-option>
                    <b-form-select-option
                      v-for="option in optionBahanList"
                      :key="option.id"
                      :value="option.id"
                    >
                      {{ option.name }}
                    </b-form-select-option>
                  </template>
                </b-form-select>
              </td>
            </tr>
          </tbody>

        </table>
        <b-overlay
          variant="light"
          :show="loading"
          spinner-variant="primary"
          blur="0"
          opacity=".5"
          rounded="sm"
        >
          <div>Loading</div>
        </b-overlay>
      </div>
    </div>
    <!-- modal -->
    <b-modal
      id="modal-canceled-submission"
      hide-footer
      hide-header
      modal-class="modal-dark"
      centered
    >

      <b-col
        md="12"
        class="d-flex justify-content-center pt-3"
      >
        <b-img
          width="100"
          src="@/assets/images/icons/warning.svg"
        />
      </b-col>

      <b-col class="text-center mt-2">
        <h4 class="text-black">
          <strong>
            Batalkan Pengajuan
          </strong>
        </h4>
        <p class="text-black">
          Kamu yakin mau batalin pengajuan berlangganan ?
        </p>
      </b-col>
      <div class="d-flex justify-content-center">
        <b-button
          variant="outline-primary"
          class="font-bold mr-1"
          @click="$bvModal.hide('modal-canceled-submission')"
        >Tidak</b-button>
        <b-button
          variant="primary"
          class="font-bold"
          style="width: 100px;"
          @click="$router.go(-1)"
        >Ya</b-button>
      </div>

    </b-modal>
    <b-modal
      id="modal-success-submission"
      hide-footer
      hide-header
      modal-class="modal-dark"
      centered
    >

      <b-col
        md="12"
        class="d-flex justify-content-center pt-3"
      >
        <b-img
          width="100"
          src="@core/assets/image/icon-popup-success.png"
        />
      </b-col>

      <b-col class="text-center mt-2 mb-3">
        <h4>
          <medium>
            Pengajuanmu berhasil dikirim.
          </medium>
        </h4>
        <h6 class="text-black">
          <strong>
            Pengajuan berlangganan akan segera dikonfrmasi selambat-lambatnya 2x24 jam.
          </strong>
        </h6>
      </b-col>
    </b-modal>
  </div>
</template>

<script lang="ts">
import {
  BButton,
  BSpinner,
  BFormSelect,
  BInputGroup,
  BInputGroupPrepend,
  BFormCheckbox,
  BFormInput,
  BModal,
} from 'bootstrap-vue'
import ToastificationContentVue from '@/@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BButton,
    BInputGroup,
    BInputGroupPrepend,
    BFormInput,
    BFormSelect,
    BFormCheckbox,
    BModal,
  },
  data() {
    return {
      loading: false,
      selected: [],
      selectAll: false,
      productList: [],
      user: this.$store.state.auth,
      searchProduct: '',
      selectedBahan: null,
      warehouseDetail: {},
      optionBahanList: [],
      formdata: {
        partner_id: null,
        warehouse_id: null,
        submission_type: 1,
        product: [],
      },
    }
  },
  mounted() {
    this.getDetailWarehouse()
    this.getBahanList()
  },
  methods: {
    async getDetailWarehouse() {
      this.loading = true
      await this.$http_komship(
        `/v1/komship/warehouse/information/${this.$route.params.id}`,
      )
        .then(async response => {
          this.warehouseDetail = response.data.data
          await this.getProductList()
        })
        .catch(err => {
          this.loading = false
        })
    },
    async getBahanList() {
      await this.$http_komship(
        '/v1/select-option/packing',
      )
        .then(async response => {
          this.optionBahanList = response.data.data
        })
        .catch(err => {
          this.loading = false
        })
    },
    async getProductList() {
      await this.$http_komship(
        `/v1/komship/submission/product?name=${this.searchProduct}`,
      )
        .then(async response => {
          const { data } = response.data
          const newData = await data.map(val => ({
            ...val, selected: false, packing_material: null,
          }))
          this.productList = newData

          this.loading = false
        })
        .catch(err => {
          this.loading = false
        })
    },
    selectItemOneEvent(product, e) {
      // eslint-disable-next-line no-param-reassign
      const objIndex = this.productList.findIndex((obj => obj.id === product.id))

      // eslint-disable-next-line no-param-reassign
      this.productList[objIndex].selected = e
    },
    async getsearchProduct() {
      this.getProductList()
    },
    async selectItemEvent() {
      this.selected = []
      if (!this.selectAll) {
        // eslint-disable-next-line guard-for-in, no-restricted-syntax
        for (const i in this.items) {
          this.selected.push(this.items[i].id)
        }
      }
    },

    selectBahanEvent(product, e) {
      const objIndex = this.productList.findIndex((obj => obj.id === product.id))

      // eslint-disable-next-line no-param-reassign
      this.productList[objIndex].packing_material = e
    },

    async submitBerlangganan() {
      const product = await this.productList.filter(x => x.selected === true).map(val => ({
        product_id: val.id,
        packing_material: val.packing_material,
      }))
      await this.$http_komship.post(
        '/v1/komship/submission', {
          partner_id: this.user.userData.partner_detail.id,
          warehouse_id: this.warehouseDetail.id,
          submission_type: 1,
          product,
        },
      )
        .then(async response => {
          if (response.data.code === 1009) {
            this.$toast({
              component: ToastificationContentVue,
              props: {
                title: 'Galat',
                text: 'Menunggu Persetujuan Pengajuan Sebelumnya',
                icon: 'AlertCircleIcon',
                variant: 'danger',
              },
            }, 2000)
          }
          if (response.data.code === 1001) {
            this.$toast({
              component: ToastificationContentVue,
              props: {
                title: 'Galat',
                text: 'Silahkan Pilih Produk',
                icon: 'AlertCircleIcon',
                variant: 'danger',
              },
            }, 2000)
          }
          if (response.data.code === 200) {
            this.$bvModal.show('modal-success-submission')
          }
        })
        .catch(err => {
          this.loading = false
          this.$toast({
            component: ToastificationContentVue,
            props: {
              title: 'Galat',
              text: err,
              icon: 'AlertCircleIcon',
              variant: 'danger',
            },
          }, 2000)
        })
    },
  },
}
</script>

  <style lang="scss">
  .card-custom {
    border-radius: 12px;
    border: 1px solid #e2e2e2;
  }
  .badge-custom {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 4px 8px;
    gap: 5px;
    background: #dff3ff;
    border-radius: 4px;
  }
  .input-group {
    height: 40px;
    min-width: 300px;
  }
  </style>
