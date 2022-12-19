<template>
  <b-card body>
    <div v-if="!TambahProduct">
      <b-row class="justify-content-between mt-2 mb-4">
        <b-col cols="2">
          <h4 class="text-black font-bold">
            Ajukan Inbound
          </h4>
        </b-col>
        <b-col cols="2">
          <b-button
            :disabled="submitDisabled()"
            :variant="submitDisabled() ? 'secondary' : 'primary'"
            @click="submitInbound"
          >
            Ajukan Inbound
          </b-button>
        </b-col>
      </b-row>
      <div class="border-2 rounded-2xl">
        <div class="px-2 pt-2">
          <h5 class="text-black font-bold">
            Data Inbound
          </h5>
          <b-row class="my-2">
            <b-col cols="3">
              <div class="text-black font-bold">
                Dikirim dari
              </div>
            </b-col>
            <b-col cols="6">
              <b-form-input
                v-model="addressSender"
                placeholder="Masukan alamat pengirim"
                class="rounded-2xl"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="3">
              <div class="text-black font-bold">
                Kirim ke
              </div>
            </b-col>
            <b-col cols="6">
              <v-select
                v-model="warehouse"
                :options="listGudang"
                label="warehouse_name"
                aria-placeholder="Pilih Mitra Gudang"
                @input="AddProductDisabled(warehouse)"
              />
            </b-col>
          </b-row>
          <b-row class="my-2 justify-content-center">
            <b-col
              cols="6"
              class="d-flex"
            >
              <b-button
                :variant="KirimEkspedisi ? 'outline-primary' : 'outline-dark'"
                class="d-flex mr-1 align-items-center"
                @click="Ekspedisi"
              >
                <b-img src="https://storage.googleapis.com/komerce/assets/dikirimekpedisi.svg" />
                <span class="ml-1">Dikirim Ekspedisi</span>
              </b-button>
              <b-button
                :variant="KirimSendiri ? 'outline-primary' : 'outline-dark'"
                class="d-flex align-items-center"
                @click="Sendiri"
              >
                <b-img src="https://storage.googleapis.com/komerce/assets/ekpedisidikirim-pribadi.svg" />
                <span class="ml-1">Dikirim Sendiri</span>
              </b-button>
            </b-col>
          </b-row>
          <div v-if="KirimEkspedisi">
            <b-row class="my-2">
              <b-col cols="3">
                <div class="text-black font-bold">
                  Ekspedisi
                </div>
              </b-col>
              <b-col cols="6">
                <v-select
                  v-model="ekspedisi"
                  :options="listEkspedisi"
                  label="name"
                  aria-placeholder="Pilih Ekspedisi"
                />
              </b-col>
            </b-row>
            <b-row class="my-2">
              <b-col cols="3">
                <div class="text-black font-bold">
                  Nomor Resi
                </div>
              </b-col>
              <b-col cols="6">
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
              <b-col cols="3">
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
                  />
                  <b-input-group-append
                    role="button"
                    is-text
                  >
                    <img
                      src="@/assets/images/icons/date-picker-icon.svg"
                      @click="$refs.pickupDate.fp.toggle()"
                    >
                  </b-input-group-append>
                </b-input-group>
              </b-col>
            </b-row>
            <b-row class="my-2">
              <b-col cols="3">
                <div class="text-black font-bold">
                  Estimasi Sampai Gudang
                </div>
              </b-col>
              <b-col cols="6">
                <b-input-group class="">
                  <flat-pickr
                    ref="EstimateDate"
                    v-model="EstimateDate"
                    :config="configDate"
                  />
                  <b-input-group-append
                    role="button"
                    is-text
                  >
                    <img
                      src="@/assets/images/icons/date-picker-icon.svg"
                      @click="$refs.EstimateDate.fp.toggle()"
                    >
                  </b-input-group-append>
                </b-input-group>
              </b-col>
            </b-row>
          </div>
          <b-row class="justify-content-between border-t py-2 mt-4">
            <b-col cols="2">
              <h5 class="text-black font-bold">
                Stock Produk
              </h5>
            </b-col>
            <b-col cols="2">
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
            Stok Produk
          </b-col>
        </b-row>
        <div
          v-for="(item, index) in selectedOrder"
          :key="(index+1)"
        >
          <b-row class="my-2">
            <b-col cols="3">
              <b-row class="text-start ml-3">
                <b-img src="item.image_path" />
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
                  class="justify-content-center mb-1"
                >
                  <div class="align-self-center">
                    {{ variant.stock }}
                  </div>
                </b-row>
                <b-collapse :id="`variant-${String(index)}`">
                  <b-row
                    v-for="itemvariant in item.variant.slice(1, item.variant.length)"
                    :key="itemvariant.option_id"
                    class="justify-content-center mb-1"
                  >
                    <div class="align-self-center">
                      {{ itemvariant.stock }}
                    </div>
                  </b-row>
                </b-collapse>
              </div>
              <div v-else>
                <b-row class="justify-content-center mb-1">
                  <div class="align-self-center">
                    {{ item.stock }}
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
      </b-overlay>
    </div>
    <div v-if="TambahProduct">
      <div class="d-flex my-2 align-items-center">
        <b-button
          variant="primary"
          size="sm"
          class="mr-1 rounded-lg p-0"
          @click="addProduct()"
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
        <b-col cols="3">
          <b-input-group class="input-group-merge">
            <b-input-group-prepend is-text>
              <feather-icon icon="SearchIcon" />
            </b-input-group-prepend>
            <b-form-input
              v-model="search"
              placeholder="Seach..."
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
        <div
          v-for="(item, index) in listProdukEdit"
          :key="(index+1, item.id)"
        >
          <b-row class="my-2 my-2">
            <b-col cols="1">
              <b-form-checkbox
                v-model="item.isActive"
                @input="setData(listProdukEdit)"
              />
            </b-col>
            <b-col cols="3">
              <b-row class="text-start">
                <b-img src="item.image_path" />
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
                  class="justify-content-center mb-1"
                >
                  <b-button
                    class="minus-button mr-1"
                    variant="outline-primary"
                    @click="setQuantity('minus', listProdukEdit.map(object => object.id).indexOf(item.id), item.variant.map(object => object.variant_id).indexOf(variant.variant_id), item)"
                  >
                    -
                  </b-button>
                  <b-input
                    v-model="variant.stock"
                    class="align-self-center text-center input-stock"
                    style="widht: 10% !important"
                    @input="inputStock(variant.stock, item)"
                  />
                  <b-button
                    class="plus-button ml-1"
                    variant="outline-primary"
                    @click="setQuantity('plus', listProdukEdit.map(object => object.id).indexOf(item.id), item.variant.map(object => object.variant_id).indexOf(variant.variant_id), item)"
                  >
                    +
                  </b-button>
                </b-row>
                <b-collapse :id="`variant-${String(index)}`">
                  <b-row
                    v-for="itemvariant in item.variant.slice(1, item.variant.length)"
                    :key="itemvariant.option_id"
                    class="justify-content-center mb-1"
                  >
                    <b-button
                      class="minus-button mr-1"
                      variant="outline-primary"
                      @click="setQuantity('minus', listProdukEdit.map(object => object.id).indexOf(item.id), item.variant.map(object => object.option_id).indexOf(itemvariant.option_id), item)"
                    >
                      -
                    </b-button>
                    <b-input
                      v-model="itemvariant.stock"
                      class="align-self-center text-center input-stock"
                      style="widht: 10% !important"
                      @input="inputStock(itemvariant.stock, item)"
                    />
                    <b-button
                      class="plus-button ml-1"
                      variant="outline-primary"
                      @click="setQuantity('plus', listProdukEdit.map(object => object.id).indexOf(item.id), item.variant.map(object => object.option_id).indexOf(itemvariant.option_id), item)"
                    >
                      +
                    </b-button>
                  </b-row>
                </b-collapse>
              </div>
              <div v-else>
                <b-row class="justify-content-center mb-1">
                  <b-button
                    class="minus-button mr-1"
                    variant="outline-primary"
                    @click="setQuantityNoVariant('minus', listProdukEdit.map(object => object.id).indexOf(item.id), item)"
                  >
                    -
                  </b-button>
                  <b-input
                    v-model="item.stock"
                    class="align-self-center text-center input-stock"
                    style="widht: 10% !important"
                    @input="inputStock(item.stock, item)"
                  />
                  <b-button
                    class="plus-button ml-1"
                    variant="outline-primary"
                    @click="setQuantityNoVariant('plus', listProdukEdit.map(object => object.id).indexOf(item.id), item)"
                  >
                    +
                  </b-button>
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

<script src="./ajukaninbound.js" />

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
    width: 15%;
    border-bottom: solid 2px #e2e2e2 !important;
    border: none;
    border-radius: none;
  }
  [dir] .when-closed {
    display: inline-block;
  }
  [dir] .when-opened {
    display: inline-block;
  }
  .collapsed > .when-opened,
      :not(.collapsed) > .when-closed {
          display: none;
      }
</style>
