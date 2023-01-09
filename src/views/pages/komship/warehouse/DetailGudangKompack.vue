<template>
  <BCard body>
    <div class="d-flex justify-between">
      <div class="">
        <b-button
          variant="primary"
          size="sm"
          class="mr-1 rounded-lg p-0"
          @click="$router.go(-1)"
        >
          <feather-icon
            size="2x"
            icon="ChevronLeftIcon"
          />
        </b-button>
        <h4 class="font-bold text-black d-inline-flex mb-0">
          Detail Gudangku
        </h4>
      </div>
      <div class="">
        <BButton
          variant="outline-primary"
          @click="$router.push('/ajukan-inbound')"
        >
          Ajukan Inbound
        </BButton>
      </div>
    </div>
    <div class="border p-2 mt-2">
      <div class="d-flex justify-between">
        <div class="d-flex flex-row items-center">
          <div class="mr-1">
            <b-avatar
              :src="detail.image_logo_url"
            />
          </div>
          <div class="d-flex flex-column items-start text-black">
            <div class="font-bold">
              {{ detail.name }}
            </div>
            <div class="">
              {{ detail.address }}
            </div>
          </div>
          <div class="ml-2 verified-badge gap-2">
            <img
              class=""
              src="https://storage.googleapis.com/komerce/assets/verified-shield.svg"
              alt=""
            >
            <div class="">
              Terverifikasi
            </div>
          </div>
        </div>
        <!-- belum jadi -->
        <button
          class="d-flex space-x-2 items-center outline-none"
          @click="handleIsDefault()"
        >
          <!-- belum jadi -->
          <img
            class="w-5"
            :src="handleUtama(detail.is_default)"
          >
          <span class="text-black">Jadikan sebagai gudang utama</span>
        </button>
      </div>
      <div class="mt-2 d-flex text-black space-x-10">
        <div class="">
          Owner
        </div>
        <div class="d-flex space-x-2">
          <span>{{ detail.owner }}</span>
          <img
            class="w-5"
            src="https://storage.googleapis.com/komerce/assets/verified-shield.svg"
          >
        </div>
      </div>
      <div class="d-flex justify-between">
        <div class="mt-1 d-flex text-black space-x-10">
          <div class="">
            Status
          </div>
          <div class="">
            {{ detail.status }}
          </div>
        </div>
        <div class="space-x-3">
          <BButton
            variant="outline-primary"
            @click="handleListInbound(detail.id)"
          >
            List Inbound
          </BButton>
          <BButton
            variant="outline-primary"
            @click="handleInfoGudang($route.params.id)"
          >
            Lihat Info Gudang
          </BButton>
          <BButton
            variant="primary"
            @click="handleChat(detail.phone_number)"
          >
            <template>
              <div class="d-flex space-x-3">
                <img
                  class="w-4"
                  src="https://storage.googleapis.com/komerce/assets/svg/chat.svg"
                >
                <span>Chat</span>
              </div>
            </template>
          </BButton>
          <BButton
            class="new-button"
            variant="outline-primary"
            @click="$router.push({ name: 'pengeluaran-barang' })"
          >
            <img
              class="w-8"
              src="https://storage.googleapis.com/komerce/assets/komerce-icon/Orange/directbox-send.svg"
            >
          </BButton>
        </div>
      </div>
    </div>
    <div class="border mt-2">
      <div class="p-2 d-flex justify-between items-center">
        <div class="text-black font-bold">
          Stok Produk
        </div>
        <b-button
          variant="outline-primary"
          @click="handleTambahProduk($route.params.id, detail.id)"
        >
          Tambah Produk
        </b-button>
      </div>
      <BOverlay
        :show="loading"
        spinner-variant="primary"
        variant="light"
        blur="0"
        opacity=".5"
        rounded="sm"
      >
        <BTable
          ref="selectableTable"
          :items="products"
          :fields="fields"
          empty-text="Tidak ada data yang ditampilkan."
          responsive
          select-mode="multi"
          selectable
          hover
          show-empty
          @row-selected="onRowSelected"
        >
          <template #cell(nama_produk)="data">
            <div class="d-flex items-center gap-2 text-black">
              <b-img
                :src="data.item.image_path ? data.item.image_path : 'https://storage.googleapis.com/komerce/assets/icons/product-placehold.svg'"
                fluid
                class="image-product"
              />
              <div class="">
                {{ data.item.product_name }}
              </div>
            </div>
          </template>
          <template #cell(sku)="data">
            <div class="d-flex items-center text-gray-500">
              {{ data.item.sku }}
            </div>
          </template>
          <template #cell(variasi)="data">
            <div v-if="data.item.is_variant !== 0">
              <div
                class="mb-50"
              >
                <span>{{ data.item.variant[0].variant_name }}</span>
              </div>
              <BCollapse :id="`collapse-${String(data.index)}`">
                <div
                  v-for="(item, idx) in data.item.variant.slice(1)"
                  :key="idx"
                  class="mb-50"
                >
                  {{ item.variant_name }}
                </div>
              </BCollapse>
            </div>
            <div
              v-else
              class="mt-1"
            >
              Tidak ada variasi
            </div>
            <div
              v-if="data.item.variant.length > 1"
              v-b-toggle="`collapse-${String(data.index)}`"
              variant="flat-dark"
              size="sm"
              class="mt-1 flex items-center justify-end"
            >
              <span
                class="when-opened"
              >
                Tutup
              </span>
              <span
                class="when-closed"
              >
                Tampilkan Variasi
              </span>
              <feather-icon
                icon="ChevronDownIcon"
                class="when-closed"
              />
              <feather-icon
                icon="ChevronUpIcon"
                class="when-opened"
              />
            </div>
          </template>
          <template #cell(stok)="data">
            <div v-if="data.item.is_variant !== 0">
              <div
                class="mb-50"
              >
                <span>{{ data.item.variant[0].stock }}</span>
              </div>
              <BCollapse :id="`collapse-${String(data.index)}`">
                <div
                  v-for="(item, idx) in data.item.variant.slice(1)"
                  :key="idx"
                  class="mb-50"
                >
                  {{ item.stock }}
                </div>
              </BCollapse>
            </div>
            <div
              v-else
              class="mt-1"
            >
              {{ data.item.stock }}
            </div>
          </template>
          <template #cell(biaya)="data">
            <div class="">
              {{ formatRupiah(data.item.fulfillment_cost) }}
            </div>
          </template>
        </BTable>
      </BOverlay>
    </div>
  </BCard>
</template>

<script>
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  data() {
    return {
      loading: false,

      utama: null,

      detail: {},

      fields: [
        {
          key: 'nama_produk',
          label: 'Nama Produk',
          thClass: 'text-black text-capitalize py-1',
          class: 'bg-white',
          thStyle: {
            textTransform: 'capitalize',
            fontSize: '13px',
            color: 'black',
          },
          tdClass: 'text-black',
        },
        {
          key: 'sku',
          label: 'SKU Produk',
          thClass: 'text-black text-capitalize py-1',
          class: 'bg-white',
          thStyle: {
            textTransform: 'capitalize',
            fontSize: '13px',
            color: 'black',
          },
          tdClass: 'text-black',
        },
        {
          key: 'variasi',
          label: 'Variasi',
          thClass: 'text-black text-capitalize py-1',
          class: 'bg-white',
          thStyle: {
            textTransform: 'capitalize',
            fontSize: '13px',
            color: 'black',
          },
          tdClass: 'text-black align-top',
        },
        {
          key: 'stok',
          label: 'Stok Produk',
          thClass: 'text-black text-capitalize py-1 text-center',
          class: 'bg-white text-center',
          thStyle: {
            textTransform: 'capitalize',
            fontSize: '13px',
            color: 'black',
          },
          tdClass: 'text-black align-top',
        },
        {
          key: 'biaya',
          label: 'Biaya Fulfillment',
          thClass: 'text-black text-capitalize py-1 text-center',
          class: 'bg-white text-center',
          thStyle: {
            textTransform: 'capitalize',
            fontSize: '13px',
            color: 'black',
          },
          tdClass: 'text-black text-center',
        },
      ],

      products: [],
    }
  },

  created() {
    this.fetchDetailGudangKompack()
  },

  methods: {
    handleTambahProduk(id, whId) {
      this.$router.push({
        path: `/tambah-produk-gudang-kompack/${id}`,
      })
      localStorage.setItem('warehouse_id', whId)
    },
    handleListInbound(id) {
      this.$router.push({
        path: '/riwayat-pengajuan',
      })
      localStorage.setItem('warehouse_id', JSON.stringify(id))
    },
    handleChat(number) {
      window.open(`https://wa.me/62${number.substring(1)}`, '_blank')
    },
    handleInfoGudang(id) {
      this.$router.push({
        path: `/search-gudang/detail/${id}`,
      })
    },
    handleUtama(value) {
      if (value === 1) return 'https://storage.googleapis.com/komerce/assets/svg/gudang-utama-orange.svg'
      return 'https://storage.googleapis.com/komerce/assets/svg/gudang-utama.svg'
    },
    handleIsDefault() {
      if (this.detail.is_default === 0) {
        this.utama = 1
      } else {
        this.utama = 0
      }
      // belum jadi
      this.$http_komship.put(`/v1/komship/warehouse/detail/${this.$route.params.id}/set-default`, {
        is_default: this.utama,
      })
        .then(
          this.fetchDetailGudangKompack(),
        ).catch(() => {
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Gagal',
                icon: 'AlertCircleIcon',
                text: 'Gagal jadikan gudang utama, silahkan coba lagi',
                variant: 'danger',
              },
            },
            2000,
          )
        })
    },
    async fetchDetailGudangKompack() {
      this.loading = true
      await this.$http_komship.get(`/v1/komship/warehouse/detail/${this.$route.params.id}/partner-warehouse`)
        .then(response => {
          this.detail = response.data.data
          this.products = response.data.data.product
          this.loading = false
        }).catch(() => {
          this.loading = false
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Gagal',
                icon: 'AlertCircleIcon',
                text: 'Gagal load data, silahkan coba lagi',
                variant: 'danger',
              },
            },
            2000,
          )
        })
    },
    formatRupiah(value) {
      return `Rp ${new Intl.NumberFormat('id-ID', {
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      }).format(value)}`
    },
  },
}
</script>

<style scoped>
.collapsed > .when-opened,
    :not(.collapsed) > .when-closed {
        display: none;
    }
.image-product{
  object-fit: cover;
  object-position: center center;
  width: 50px!important;
  height: 50px!important;
}
.verified-badge {
  background-color: #DFF3FF;
  display: flex;
  align-items: center;
  color: #08A0F7;
  padding: 5px 10px;
  border-radius: 4px;
 }
 .new-button {
  padding: 3px;
 }
</style>
