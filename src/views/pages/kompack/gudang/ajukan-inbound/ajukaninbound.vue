<template>
  <b-card body>
    <div v-if="!TambahProduct">
      <div class="d-flex justify-content-between">
        <h3 class="text-black font-bold mb-1">
          Ajukan Inbound
        </h3>
        <b-button
          :disabled="submitDisabled()"
          :variant="submitDisabled() ? 'secondary' : 'primary'"
          @click.once="submitInbound"
        >
          Ajukan Inbound
        </b-button>
      </div>
      <div class="border p-2 mt-2">
        <div
          class="text-black font-bold"
          style="font-size: 16px;"
        >
          Data Inbound
        </div>
        <b-row class="my-2 align-items-center">
          <b-col
            md="3"
            xs="12"
          >
            <div class="text-black font-bold">
              Dikirim dari
            </div>
          </b-col>
          <b-col
            xs="12"
            md="6"
          >
            <v-select
              v-model="sendForm"
              :clearable="false"
              placeholder="Masukkan alamat pengirim"
              :loading="loadingDestinations"
              :options="destinations"
              @search="searchDestination"
            />
          </b-col>
        </b-row>
        <b-row class="align-items-center">
          <b-col
            xs="12"
            md="3"
          >
            <div class="text-black font-bold">
              Kirim ke
            </div>
          </b-col>
          <b-col
            xs="12"
            md="6"
          >
            <v-select
              key="warehouse_id"
              v-model="warehouse"
              placeholder="Pilih Mitra Gudang"
              :options="listGudang"
              :clearable="false"
              label="warehouse_name"
              aria-placeholder="Pilih Mitra Gudang"
              @input="AddProductDisabled(warehouse)"
            />
          </b-col>
        </b-row>
        <b-row class="my-2 justify-content-center">
          <b-col
            xs="12"
            md="6"
            class="d-sm-flex"
          >
            <b-button
              :variant="KirimEkspedisi ? 'outline-primary' : 'outline-dark'"
              class="d-flex align-items-center mr-2"
              @click="Ekspedisi"
            >
              <b-img :src="KirimEkspedisi ? `https://storage.googleapis.com/komerce/assets/menggunakan-ekspedisi-orange.svg` : `https://storage.googleapis.com/komerce/assets/dikirimekpedisi.svg`" />
              <span class="ml-1 font-bold">Dikirim Ekspedisi</span>
            </b-button>
            <b-button
              :variant="KirimSendiri ? 'outline-primary' : 'outline-dark'"
              class="d-flex align-items-center"
              @click="Sendiri"
            >
              <b-img :src="KirimSendiri ? `https://storage.googleapis.com/komerce/assets/dikirim-sendiri-orange.svg` : `https://storage.googleapis.com/komerce/assets/ekpedisidikirim-pribadi.svg`" />
              <span class="ml-1 font-bold">Dikirim Sendiri</span>
            </b-button>
          </b-col>
        </b-row>
        <div v-if="KirimEkspedisi">
          <b-row class="my-2 align-items-center">
            <b-col
              xs="12"
              md="3"
            >
              <div class="text-black font-bold">
                Ekspedisi
              </div>
            </b-col>
            <b-col
              xs="12"
              md="6"
            >
              <v-select
                key="id"
                v-model="ekspedisi"
                :options="listEkspedisi"
                :clearable="false"
                label="name"
                placeholder="Pilih Ekspedisi"
              />
            </b-col>
          </b-row>
          <b-row
            v-if="ekspedisi.name === 'Lainnya'"
            class="my-2 align-items-center"
          >
            <b-col
              xs="12"
              md="3"
            >
              <div class="text-black font-bold">
                Nama Ekspedisi
              </div>
            </b-col>
            <b-col
              xs="12"
              md="6"
            >
              <b-form-input
                v-model="ekspedisiLainnya"
                placeholder="Masukkan nama ekspedisi"
                class="rounded-2xl"
                maxlength="20"
              />
            </b-col>
          </b-row>
          <b-row class="my-2 align-items-center">
            <b-col
              xs="12"
              md="3"
            >
              <div class="text-black font-bold">
                Nomor Resi
              </div>
            </b-col>
            <b-col
              xs="12"
              md="6"
            >
              <b-form-input
                v-model="noResi"
                placeholder="Masukan No Resi"
                class="rounded-2xl"
              />
            </b-col>
          </b-row>
        </div>
        <div v-if="KirimSendiri">
          <b-row class="my-2">
            <b-col
              xs="12"
              md="3"
            >
              <div class="text-black font-bold">
                Tanggal Pengiriman
              </div>
            </b-col>
            <b-col cols="6">
              <b-input-group class="">
                <flat-pickr
                  ref="pickupDate"
                  v-model="pickupDate"
                  :config="configDate"
                  class="form-control"
                />
                <b-input-group-append
                  role="button"
                  is-text
                >
                  <img
                    src="https://storage.googleapis.com/komerce/assets/icons/date-picker-icon.svg"
                    @click="$refs.pickupDate.fp.toggle()"
                  >
                </b-input-group-append>
              </b-input-group>
            </b-col>
          </b-row>
          <b-row class="my-2">
            <b-col
              xs="12"
              md="3"
            >
              <div class="text-black font-bold">
                Estimasi Sampai Gudang
              </div>
            </b-col>
            <b-col
              xs="12"
              md="6"
            >
              <b-input-group class="">
                <flat-pickr
                  ref="EstimateDate"
                  v-model="EstimateDate"
                  class="form-control"
                  :config="configDate"
                />
                <b-input-group-append
                  role="button"
                  is-text
                >
                  <img
                    src="https://storage.googleapis.com/komerce/assets/icons/date-picker-icon.svg"
                    @click="$refs.EstimateDate.fp.toggle()"
                  >
                </b-input-group-append>
              </b-input-group>
            </b-col>
          </b-row>
        </div>
        <hr class="-mx-6 mt-2">
        <b-row class="justify-content-between align-items-center">
          <b-col
            xs="2"
            md="4"
          >
            <div
              class="text-black font-bold"
              style="font-size: 16px;"
            >
              Stok Produk
            </div>
          </b-col>
          <b-col
            xs="2"
            md="4"
            class="text-end"
          >
            <b-button
              :disabled="disabledAddProduct"
              :variant="disabledAddProduct ? 'outline-dark': 'outline-primary'"
              :class="disabledAddProduct ? 'text-second': 'text-primary'"
              @click="addProduct()"
            >
              Tambah Produk
            </b-button>
          </b-col>
        </b-row>
      </div>
    </div>
    <div
      v-if="TableProduct"
      class="mt-2"
    >
      <b-overlay
        class="mx-1 text-center text-black"
        spinner-variant="primary"
        variant="light"
        blur="0"
        opacity=".5"
        rounded="sm"
      >
        <div class="table-container">
          <div class="table">
            <b-row class="border-b text-black font-bold border-t py-1">
              <b-col cols="3">
                Nama Produk
              </b-col>
              <b-col cols="3">
                SKU Produk
              </b-col>
              <b-col cols="3">
                Variasi
              </b-col>
              <b-col cols="3">
                Jumlah Inbound
              </b-col>
            </b-row>
            <div
              v-for="(item, index) in selectedOrder"
              :key="(index+1)"
            >
              <b-row class="my-2">
                <b-col cols="3">
                  <b-row class="text-start ml-3 d-flex">
                    <b-img
                      v-if="item.image_path !== null"
                      :src="item.image_path"
                      style="width: 50px"
                    />
                    <b-img
                      v-else
                      src="https://storage.googleapis.com/komerce/assets/icons/product-placehold.svg"
                      style="width: 50px"
                    />
                    <span class="ml-1">{{ item.product_name }}</span>
                  </b-row>
                </b-col>
                <b-col cols="3">
                  SKU: {{ item.sku }}
                </b-col>
                <b-col cols="3">
                  <div v-if="(item.is_variant === 1)">
                    <div
                      v-for="variant in item.variant.slice(0, 1)"
                      :key="variant.option_id"
                      class="h-10"
                    >
                      {{ variant.variant_name }}
                    </div>
                    <b-collapse :id="`variant-${String(index)}`">
                      <div
                        v-for="itemvariant in item.variant.slice(1, item.variant.length)"
                        :key="itemvariant.option_id"
                        class="h-10"
                      >
                        {{ itemvariant.variant_name }}
                      </div>
                    </b-collapse>
                  </div>
                  <div v-else>
                    <div>tidak ada varian</div>
                  </div>
                </b-col>
                <b-col cols="3">
                  <div v-if="(item.is_variant === 1)">
                    <b-row
                      v-for="variant in item.variant.slice(0, 1)"
                      :key="variant.option_id"
                      class="justify-content-center h-12"
                    >
                      <div class="align-self-center">
                        {{ variant.stockEdit }}
                      </div>
                    </b-row>
                    <b-collapse :id="`variant-${String(index)}`">
                      <b-row
                        v-for="itemvariant in item.variant.slice(1, item.variant.length)"
                        :key="itemvariant.option_id"
                        class="justify-content-center h-10"
                      >
                        <div class="align-self-center">
                          {{ itemvariant.stockEdit }}
                        </div>
                      </b-row>
                    </b-collapse>
                  </div>
                  <div v-else>
                    <b-row class="justify-content-center mb-1">
                      <div class="align-self-center h-10">
                        {{ item.stockEdit }}
                      </div>
                    </b-row>
                  </div>
                </b-col>
              </b-row>
              <b-row class="justify-content-end border-b pb-1 mr-3 my-1">
                <div v-if="(item.variant.length > 0)">
                  <b-button
                    v-b-toggle="`variant-${String(index)}`"
                    class="btn-collapse"
                    size="sm"
                  >
                    <span class="when-opened">
                      Tutup
                    </span>
                    <span class="when-closed">
                      Tampilkan variasi lainnya
                    </span>
                    <feather-icon
                      icon="ChevronDownIcon"
                      class="when-closed"
                    />
                    <feather-icon
                      icon="ChevronUpIcon"
                      class="when-opened"
                    />
                  </b-button>
                </div>
              </b-row>
            </div>
          </div>
        </div>
      </b-overlay>
    </div>
    <div v-if="TambahProduct">
      <div class="d-flex align-items-center my-2">
        <b-button
          variant="primary"
          size="sm"
          class="mr-1 rounded-lg p-0"
          @click="back"
        >
          <feather-icon
            size="2x"
            icon="ChevronLeftIcon"
          />
        </b-button>
        <h4 class="text-black font-bold">
          Tambah Stok Produk
        </h4>
      </div>
      <b-row class="justify-content-end my-2 mr-2">
        <b-col
          col="12"
          sm="6"
        >
          <b-input-group class="input-group-merge">
            <b-input-group-prepend is-text>
              <feather-icon icon="SearchIcon" />
            </b-input-group-prepend>
            <b-form-input
              v-model="search"
              placeholder="cari nama produk..."
              @input="searchProduct(listProdukDB, search)"
            />
          </b-input-group>
        </b-col>
      </b-row>
      <b-overlay
        class="mx-1 text-center text-black"
        spinner-variant="primary"
        variant="light"
        blur="0"
        opacity=".5"
        rounded="sm"
      >
        <div class="table-container">
          <div class="table">
            <b-row class="border-b border-t py-1">
              <b-col cols="1" />
              <b-col
                cols="3"
                class="text-start"
              >
                Nama Produk
              </b-col>
              <b-col cols="2">
                SKU Produk
              </b-col>
              <b-col cols="3">
                Variasi
              </b-col>
              <b-col cols="3">
                Stok Produk
              </b-col>
            </b-row>
            <div v-if="listProdukEdit.length > 0">
              <div
                v-for="(item, index) in listProdukEdit"
                :key="(index+1)"
              >
                <b-row class="my-2 my-2">
                  <b-col cols="1">
                    <b-form-checkbox
                      v-model="item.isActive"
                      @input="setData(listProdukEdit)"
                    />
                  </b-col>
                  <b-col cols="3">
                    <b-row class="text-start d-flex">
                      <b-img
                        v-if="item.image_path !== null"
                        :src="item.image_path"
                        style="width: 50px"
                      />
                      <b-img
                        v-else
                        src="https://storage.googleapis.com/komerce/assets/icons/product-placehold.svg"
                        style="width: 50px"
                      />
                      <span class="ml-1">{{ item.product_name }}</span>
                    </b-row>
                  </b-col>
                  <b-col cols="2">
                    SKU: {{ item.sku }}
                  </b-col>
                  <b-col cols="3">
                    <div v-if="(item.is_variant === 1)">
                      <div
                        v-for="variant in item.variant.slice(0, 1)"
                        :key="variant.option_id"
                        class="h-14"
                      >
                        {{ variant.variant_name }}
                      </div>
                      <b-collapse :id="`variant-${String(index)}`">
                        <div
                          v-for="itemvariant in item.variant.slice(1, item.variant.length)"
                          :key="itemvariant.option_id"
                          class="h-14"
                        >
                          {{ itemvariant.variant_name }}
                        </div>
                      </b-collapse>
                    </div>
                    <div v-else>
                      <div>tidak ada varian</div>
                    </div>
                  </b-col>
                  <b-col cols="3">
                    <div v-if="(item.is_variant === 1)">
                      <b-row
                        v-for="(variant, indexx) in item.variant.slice(0, 1)"
                        :key="(indexx+1, variant.id)"
                        class="justify-content-center h-14"
                      >
                        <b-col
                          xl="2"
                          lg="3"
                          md="3"
                          col="3"
                        >
                          <b-button
                            class="minus-button"
                            variant="outline-primary"
                            @click="setQuantity('minus', listProdukEdit.map(object => object.id).indexOf(item.id), item.variant.map(object => object.variant_id).indexOf(variant.variant_id), item)"
                          >
                            -
                          </b-button>
                        </b-col>
                        <b-col
                          xl="4"
                          lg="6"
                          md="6"
                          col="6"
                        >
                          <b-input
                            v-model="variant.stockEdit"
                            type="number"
                            class="align-self-center text-center input-stock"
                            @keyup="inputStock(variant.stockEdit, listProdukEdit.map(object => object.id).indexOf(item.id), item.variant.map(object => object.variant_id).indexOf(variant.variant_id), item)"
                          />
                        </b-col>
                        <b-col
                          xl="2"
                          lg="3"
                          md="3"
                          col="3"
                        >
                          <b-button
                            class="plus-button  "
                            variant="outline-primary"
                            @click="setQuantity('plus', listProdukEdit.map(object => object.id).indexOf(item.id), item.variant.map(object => object.variant_id).indexOf(variant.variant_id), item)"
                          >
                            +
                          </b-button>
                        </b-col>
                      </b-row>
                      <b-collapse :id="`variant-${String(index)}`">
                        <b-row
                          v-for="itemvariant in item.variant.slice(1, item.variant.length)"
                          :key="itemvariant.option_id"
                          class="justify-content-center h-14"
                        >
                          <b-col
                            xl="2"
                            lg="3"
                            md="3"
                            col="3"
                          >
                            <b-button
                              class="minus-button"
                              variant="outline-primary"
                              @click="setQuantity('minus', listProdukEdit.map(object => object.id).indexOf(item.id), item.variant.map(object => object.option_id).indexOf(itemvariant.option_id), item)"
                            >
                              -
                            </b-button>
                          </b-col>
                          <b-col
                            xl="4"
                            lg="6"
                            md="6"
                            col="6"
                          >
                            <b-input
                              v-model="itemvariant.stockEdit"
                              type="number"
                              class="align-self-center text-center input-stock"
                              @keyup="inputStock(itemvariant.stockEdit, listProdukEdit.map(object => object.id).indexOf(item.id), item.variant.map(object => object.option_id).indexOf(itemvariant.option_id), item)"
                            />
                          </b-col>
                          <b-col
                            xl="2"
                            lg="3"
                            md="3"
                            col="3"
                          >
                            <b-button
                              class="plus-button"
                              variant="outline-primary"
                              @click="setQuantity('plus', listProdukEdit.map(object => object.id).indexOf(item.id), item.variant.map(object => object.option_id).indexOf(itemvariant.option_id), item)"
                            >
                              +
                            </b-button>
                          </b-col>
                        </b-row>
                      </b-collapse>
                    </div>
                    <div v-else>
                      <b-row class="justify-content-center">
                        <b-col
                          xl="2"
                          lg="3"
                          md="3"
                          col="3"
                        >
                          <b-button
                            class="minus-button"
                            variant="outline-primary"
                            @click="setQuantityNoVariant('minus', listProdukEdit.map(object => object.id).indexOf(item.id), item)"
                          >
                            -
                          </b-button>
                        </b-col>
                        <b-col
                          xl="4"
                          lg="6"
                          md="6"
                          col="6"
                        >
                          <b-input
                            v-model="item.stockEdit"
                            type="number"
                            class="align-self-center text-center input-stock"
                            @keyup="inputStockNoVariant(item.stockEdit, listProdukEdit.map(object => object.id).indexOf(item.id), item)"
                          />
                        </b-col>
                        <b-col
                          xl="2"
                          lg="3"
                          md="3"
                          col="3"
                        >
                          <b-button
                            class="plus-button  "
                            variant="outline-primary"
                            @click="setQuantityNoVariant('plus', listProdukEdit.map(object => object.id).indexOf(item.id), item)"
                          >
                            +
                          </b-button>
                        </b-col>
                      </b-row>
                    </div>
                  </b-col>
                </b-row>
                <b-row class="justify-content-end border-b pb-1 mr-3 my-1">
                  <div v-if="(item.variant.length > 0)">
                    <b-button
                      v-b-toggle="`variant-${String(index)}`"
                      class="btn-collapse"
                      size="sm"
                    >
                      <span class="when-opened">
                        Tutup
                      </span>
                      <span class="when-closed">
                        Tampilkan variasi lainnya
                      </span>
                      <feather-icon
                        icon="ChevronDownIcon"
                        class="when-closed"
                      />
                      <feather-icon
                        icon="ChevronUpIcon"
                        class="when-opened"
                      />
                    </b-button>
                  </div>
                </b-row>
              </div>
            </div>
            <div v-else>
              <b-row>
                <b-col>
                  Tidak Ada Data Ditampilkan
                </b-col>
              </b-row>
            </div>
          </div>
        </div>
      </b-overlay>
      <b-row class="justify-content-end mr-4 mt-2">
        <b-button
          variant="primary"
          @click="addStockNow()"
        >
          Tambah Sekarang
        </b-button>
      </b-row>
    </div>
    <!-- Modal -->
    <b-modal
      id="success-inbound"
      hide-footer
      hide-header
      centered
      no-close-on-backdrop
      no-close-on-esc
      content-class="p-2 rounded-lg"
    >
      <div class="text-end -mt-8 -mr-12">
        <b-button
          class="bg-transparent"
          @click="$router.push({ name: 'riwayat-pengajuan' })"
        >
          <b-img src="https://storage.googleapis.com/komerce/assets/icons/close-circle.svg" />
        </b-button>
      </div>
      <div class="d-grid justify-content-center text-center">
        <div class="d-flex justify-content-center">
          <b-img src="https://storage.googleapis.com/komerce/core/icon-popup-success.png" />
        </div>
        <h4 class="text-black my-2">
          Pengajuanmu berhasil dikirim.
        </h4>
        <strong class="text-black">Pengajuan inbound akan segera dikonfrmasi selambat-lambatnya 2x24 jam.</strong>
      </div>
    </b-modal>
  </b-card>
</template>

<script>
import {
  BCol,
  BRow,
  BListGroup,
  BListGroupItem,
  BFormSelect,
  BCard,
  BOverlay,
  BModal,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import { Indonesian } from 'flatpickr/dist/l10n/id'
import 'flatpickr/dist/themes/light.css'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BCol,
    BRow,
    BCard,
    vSelect,
    flatPickr,
    BModal,
  },
  data() {
    return {
      addressSender: '',
      listGudang: [],
      listEkspedisi: [],
      listProdukEdit: [],
      listProdukDB: [],
      KirimEkspedisi: false,
      KirimSendiri: false,
      warehouse: '',
      shippingType: null,
      ekspedisi: '',
      TambahProduct: false,
      TableProduct: false,
      pickupDate: '',
      EstimateDate: '',
      configDate: {
        wrap: true,
        altFormat: 'j F Y',
        altInput: true,
        minDate: 'today',
        altInputClass: 'bg-white form-control',
        locale: Indonesian,
      },
      selectAllOrder: false,
      selectedOrder: [],
      selectedDummyOrder: [],
      noResi: '',
      DisabledSubmit: true,
      disabledAddProduct: true,
      search: '',
      warehouse_Id: '',
      StatusSelectOrder: false,

      sendForm: '',
      destinations: [],
      loadingDestinations: false,
      ekspedisiLainnya: '',
    }
  },
  mounted() {
    this.listWarehouse()
    this.listKurir()
  },
  methods: {
    async searchDestination(query) {
      if (query.length >= 2) {
        this.loadingDestinations = true
        await this.$http_komship.get('/v2/destination', {
          params: {
            search: query,
          },
        })
          .then(res => {
            const { data } = res.data.data
            this.destinations = data.map(item => ({
              label: item.label,
              value: item.label,
            }))
            this.loadingDestinations = false
          })
          .catch(err => {
            this.loadingDestinations = false
            console.log(err)
          })
      }
    },
    async listWarehouse() {
      await this.$http_komship.get('/v1/komship/inbound/warehouses')
        .then(response => {
          this.listGudang = response.data.data
        })
    },
    listKurir() {
      this.$http_komship.get('/v1/komship/inbound/rajaongkir-shippings')
        .then(response => {
          this.listEkspedisi.push(...response.data.data)
          this.listEkspedisi.push(...[{
            courier_code: '',
            name: 'Lainnya',
            id: 1,
          }])
        })
    },
    listProduct() {
      this.$http_komship.get(`/v1/komship/inbound/${this.warehouse.warehouse_id}/products`)
        .then(response => {
          this.listProdukDB = response.data.data.map(item => ({
            ...item,
            isActive: false,
            stockEdit: 0,
            variant: item.variant.map(variant => ({
              ...variant,
              stockEdit: 0,
            })),
          }))
          this.listProdukEdit = this.listProdukDB
        })
    },
    searchProduct(array, search) {
      const regex = new RegExp(search, 'i')
      this.listProdukEdit = array.filter(item => regex.test(item.product_name))
    },
    Ekspedisi() {
      this.KirimEkspedisi = true
      this.KirimSendiri = false
      if (this.KirimSendiri) {
        this.shippingType = 1
      } if (this.KirimEkspedisi) {
        this.shippingType = 2
      }
    },
    Sendiri() {
      this.KirimSendiri = true
      this.KirimEkspedisi = false
      if (this.KirimSendiri) {
        this.shippingType = 1
      } if (this.KirimEkspedisi) {
        this.shippingType = 2
      }
    },
    back() {
      this.TambahProduct = !this.TambahProduct
      if (this.selectedOrder.length > 0 && this.StatusSelectOrder === true) {
        this.TableProduct = !this.TambahProduct
      } else {
        this.TableProduct = false
      }
    },
    addProduct() {
      this.TambahProduct = !this.TambahProduct
      this.TableProduct = !this.TambahProduct
    },
    inputStock(stock, product, index, item) {
      if (stock < 0) {
        this.listProdukEdit[product].variant[index].stockEdit = 0
        // eslint-disable-next-line no-param-reassign
        item.isActive = false
      } else {
        // eslint-disable-next-line no-param-reassign
        item.isActive = true
      }
    },
    inputStockNoVariant(stock, product, item) {
      if (stock < 0) {
        this.listProdukEdit[product].stockEdit = 0
        // eslint-disable-next-line no-param-reassign
        item.isActive = false
      } else {
        // eslint-disable-next-line no-param-reassign
        item.isActive = true
      }
    },
    setQuantity(status, product, index, item) {
      if (status === 'plus') {
        // eslint-disable-next-line no-plusplus
        this.listProdukEdit[product].variant[index].stockEdit++
        if (this.listProdukEdit[product].variant[index].stockEdit > 0) {
          // eslint-disable-next-line no-param-reassign
          item.isActive = true
        }
      } else if (status === 'minus') {
        this.listProdukEdit[product].variant[index].stockEdit -= 1
        if (this.listProdukEdit[product].variant[index].stockEdit <= 0) {
          this.listProdukEdit[product].variant[index].stockEdit = 0
          // eslint-disable-next-line no-param-reassign
          item.isActive = false
        }
      }
    },
    setQuantityNoVariant(status, product, item) {
      if (status === 'plus') {
        // eslint-disable-next-line no-plusplus
        this.listProdukEdit[product].stockEdit++
        if (this.listProdukEdit[product].stockEdit > 0) {
          // eslint-disable-next-line no-param-reassign
          item.isActive = true
        }
      } else if (status === 'minus') {
        this.listProdukEdit[product].stockEdit -= 1
        if (this.listProdukEdit[product].stockEdit <= 0) {
          this.listProdukEdit[product].stockEdit = 0
          // eslint-disable-next-line no-param-reassign
          item.isActive = false
        }
      }
    },
    async submitInbound() {
      this.DisabledSubmit = true
      const product = await this.selectedOrder.map(object => ({
        product_id: object.id,
        is_variant: object.is_variant,
        total_inbound: object.stockEdit,
        variant: object.variant.map(variant => ({
          option_id: variant.option_id,
          total_inbound: variant.stockEdit,
        })),
      }))

      let ekspedisi = ''
      if (this.ekspedisi.name === 'Lainnya') {
        ekspedisi = `lainnya-${this.ekspedisiLainnya}`
      } else {
        ekspedisi = this.ekspedisi.courier_code
      }

      const formdata = {
        send_from: null,
        send_to: this.warehouse.warehouse_id,
        address_sender: this.sendForm.value,
        shipping_type: this.shippingType,
        shipping_date: this.pickupDate,
        estimate_date: this.EstimateDate,
        shipping: ekspedisi,
        no_resi: this.noResi,
        product,
      }

      await this.$http_komship
        .post('/v1/komship/inbound/store', formdata)
        .then(response => {
          if (response.status === 200) {
            this.$bvModal.show('success-inbound')
          }
        })
        .catch(err => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Failure',
              icon: 'AlertCircleIcon',
              text: err,
              variant: 'danger',
            },
          }, 2000)
        })
    },
    submitDisabled() {
      let result = true
      if (this.DisabledSubmit === false && (this.sendForm.value !== '' && this.warehouse !== '' && ((this.ekspedisi !== '' && this.noResi !== '') || (this.pickupDate !== '' && this.estimateDate !== '')))) {
        result = false
      } else {
        result = true
      }
      return result
    },
    AddProductDisabled(e) {
      this.listProduct()
      if (e !== '') {
        this.disabledAddProduct = false
      }
    },
    addStockNow() {
      this.TambahProduct = !this.TambahProduct
      this.selectedOrder = this.selectedDummyOrder
      if (this.selectedOrder.length > 0) {
        this.TableProduct = !this.TambahProduct
        this.StatusSelectOrder = true
        this.DisabledSubmit = false
      } else {
        this.DisabledSubmit = true
      }
    },
    setData(data) {
      this.selectedDummyOrder = data.filter(item => item.isActive === true)
    },
  },
}

</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
</style>
<style lang="scss" scoped>

.minus-button, .plus-button {
    justify-content: center;
    font-size: 20px;
    width: 32px;
    height: 32px;
    padding: 0;
    border: 2px solid #F95031;
    border-radius: 100%;
    line-height: unset;
  }
  .btn-collapse {
    background-color: transparent !important;
    color: #000000 !important;
    border: none;
    font-size: 14px;
  }
  .bg-transparent{
    background-color: transparent !important;
    border: none !important;
  }
  .input-stock {
    border-bottom: solid 2px #e2e2e2 !important;
    border: none;
    border-radius: 0px;
    padding: 0px;
  }
  [dir] .when-closed {
    display: inline-block;
  }
  [dir] .when-opened {
    display: inline-block;
  }

  @media screen and (max-width: 767px) {
  .table-container {
  overflow-x: scroll;
  }
  .table {
    width: 700px;
    table-layout: fixed;
  }
}
  .collapsed > .when-opened,
      :not(.collapsed) > .when-closed {
          display: none;
      }
</style>
