<template>
  <b-card body>
    <div class="d-flex items-center mb-3">
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
        Pengajuan penarikan barang
      </h4>
    </div>
    <b-form-select
      v-model="warehouse"
      class="mb-2"
      :options="whOptions"
    />
    <div class="mb-1 text-black text-lg">
      Data Barang
    </div>
    <BOverlay
      :show="loading"
      spinner-variant="primary"
      variant="light"
      blur="0"
      opacity=".5"
      rounded="sm"
    >
      <b-table
        id="table"
        ref="selectableTable"
        :items="barang"
        :fields="fields"
        empty-text="Tidak ada data yang ditampilkan."
        responsive
        show-empty
        class="mb-0 border-b"
      >
        <!-- <template #head(checkbox)>
          <BCheckbox
            v-model="isSelected"
            @change="toggleAllRows()"
          />
        </template> -->
        <template #cell(checkbox)="data">
          <BCheckbox
            v-model="selected"
            :value="data.item"
          />
        </template>
        <template #cell(product_name)="data">
          <div
            style="max-width: 70px;"
          >
            {{ data.item.product_name }}
          </div>
        </template>
        <template #cell(variant)="data">
          <div
            v-if="data.item.is_variant"
            class="space-y-5"
          >
            <div
              v-for="item in data.item.variant"
              :key="item.variant_id"
            >
              {{ item.variant_name }}
            </div>
          </div>
          <div
            v-else
          >
            -
          </div>
        </template>
        <template #cell(stock)="data">
          <div
            v-if="data.item.is_variant"
            class="space-y-5"
          >
            <div
              v-for="item in data.item.variant"
              :key="item.variant_id"
            >
              {{ item.variant_stock }}
            </div>
          </div>
          <div
            v-else
          >
            {{ data.item.stock }}
          </div>
        </template>
        <template #cell(fulfillment_cost)="data">
          <div
            v-if="data.item.is_variant"
            class="space-y-5"
          >
            <div
              v-for="item in data.item.variant"
              :key="item.variant_id"
            >
              {{ data.item.fulfillment_cost | rupiah }}
            </div>
          </div>
          <div
            v-else
          >
            {{ data.item.fulfillment_cost | rupiah }}
          </div>
        </template>
        <template #cell(total)="data">
          <div
            v-if="data.item.is_variant"
            class="space-y-3"
          >
            <div
              v-for="item in data.item.variant"
              :key="item.variant_id"
            >
              <div class="">
                <b-button
                  variant="outline-primary"
                  class="p-0"
                  style="border-radius:50%;width:25px;height:25px"
                  size="sm"
                  :disabled="item.total <= 0"
                  @click="item.total -= 1"
                >
                  <span class="font-bold text-lg">-</span>
                </b-button>
                <input
                  v-model="item.total"
                  type="number"
                  class="total"
                  @keyup="event => item.total >= item.variant_stock ? item.total = item.variant_stock : item.total"
                >
                <b-button
                  variant="outline-primary"
                  class="p-0"
                  style="border-radius:50%;width:25px;height:25px"
                  size="sm"
                  :disabled="item.total >= item.variant_stock"
                  @click="item.total ++"
                >
                  <span class="font-bold text-lg">+</span>
                </b-button>
              </div>
            </div>
          </div>
          <div
            v-else
          >
            <div class="">
              <b-button
                variant="outline-primary"
                class="p-0"
                style="border-radius:50%;width:25px;height:25px"
                size="sm"
                :disabled="data.item.total <= 0"
                @click="data.item.total -= 1"
              >
                <span class="font-bold text-lg">-</span>
              </b-button>
              <input
                v-model="data.item.total"
                type="number"
                class="total"
                @keyup="event => data.item.total > data.item.stock ? data.item.total = data.item.stock : data.item.total"
              >
              <b-button
                variant="outline-primary"
                class="p-0"
                style="border-radius:50%;width:25px;height:25px"
                size="sm"
                :disabled="data.item.total >= data.item.stock"
                @click="data.item.total ++"
              >
                <span class="font-bold text-lg">+</span>
              </b-button>
            </div>
          </div>
        </template>
      </b-table>
    </BOverlay>
    <div class="w-50 float-right mt-2">
      <div class="d-flex justify-between">
        <div class="text-xl font-bold text-black">
          Total Pembayaran
        </div>
        <div class="text-xl font-bold text-primary ">
          {{ countTotalPay() | rupiah }}
        </div>
      </div>
      <b-button
        variant="primary"
        class="mt-5 float-right"
        @click="confirmAjukan"
      >
        Ajukan Penarikan Barang
      </b-button>
    </div>
  </b-card>
</template>
<script>
import filters from '@/libs/filters'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  filters: { rupiah: filters.rupiah },
  data() {
    return {
      payload: {
        partner_id: 123,
        warehouse_id: 97,
        fulfillment_fee: 29000,
        products: [
          {
            product_id: 1,
            is_variant: 1,
            total: 10,
            variants: [
              {
                warehouse_variant_id: 10,
                variant_name: 'Mata, Kaki',
                option_id: 10,
                total: 5,
              },
            ],
          },
        ],
      },

      dummy: [
        {
          product_id: 1006,
          is_variant: 0,
          total: 69,
          variants: [],
        },
        {
          product_id: 29,
          is_variant: 1,
          total: 0,
          variants: [
            {
              warehouse_variant_id: 221,
              variant_name: 'Kuning',
              option_id: 393,
              total: 0,
            },
            {
              warehouse_variant_id: 222,
              variant_name: 'Hijau',
              option_id: 394,
              total: 0,
            },
            {
              warehouse_variant_id: 223,
              variant_name: 'Biru',
              option_id: 395,
              total: 1,
            },
          ],
        },
      ],

      sel: [
        {
          product_id: 1006,
          is_variant: 0,
          total: 69,
          variant: [],
        },
        {
          product_id: 29,
          is_variant: 1,
          variant: [
            {
              variant_id: 221,
              option_id: 393,
              variant_name: 'Kuning',
              total: 0,
            },
            {
              variant_id: 222,
              option_id: 394,
              variant_name: 'Hijau',
              total: 0,
            },
            {
              variant_id: 223,
              option_id: 395,
              variant_name: 'Biru',
              total: 1,
            },
          ],
        },
      ],

      totalPay: 0,

      body: {
        partner_id: 123,
        warehouse_id: 97,
        fulfillment_fee: 29000,
        products: [
          {
            product_id: 1,
            is_variant: 1,
            total: 10,
            variants: [
              {
                warehouse_variant_id: 10,
                variant_name: 'Mata, Kaki',
                option_id: 10,
                total: 5,
              },
            ],
          },
        ],
      },

      susah: [
        {
          id: 1,
          product_name: 'Organ Candra',
          is_variant: 1,
          stock: 0,
          fulfillment_cost: 3000,
          variant: [
            {
              variant_id: 1,
              option_id: 1293,
              variant_name: 'Mata, Kaki',
              variant_stock: 232,
            },
            {
              variant_id: 2,
              option_id: 1294,
              variant_name: 'Mata, Mulut',
              variant_stock: 233,
            },
          ],
        },
        {
          id: 2,
          product_name: 'Organ Candra',
          is_variant: 1,
          stock: 0,
          fulfillment_cost: 3000,
          variant: [
            {
              variant_id: 3,
              option_id: 1295,
              variant_name: 'Mata, Badan',
              variant_stock: 232,
            },
            {
              variant_id: 6,
              option_id: 1296,
              variant_name: 'Mata, Kepala',
              variant_stock: 233,
            },
          ],
        },
        {
          id: 3,
          product_name: 'Organ Candra',
          is_variant: 0,
          stock: 10,
          fulfillment_cost: 3000,
          variant: [],
        },
      ],

      loading: false,
      isSelected: false,
      selected: [],
      warehouse: this.$route.params.id,
      whOptions: [
        {
          value: '',
          text: 'Semua Gudang',
        },
      ],
      barang: [],
      fields: [
        {
          key: 'checkbox',
          label: '',
          thClass: 'text-black py-1',
          thStyle: {
            fontSize: '14px',
            color: 'black',
            textTransform: 'capitalize',
          },
          tdClass: 'text-black',
        },
        {
          key: 'product_name',
          label: 'Nama Produk',
          thClass: 'text-black py-1',
          thStyle: {
            fontSize: '14px',
            color: 'black',
            textTransform: 'capitalize',
          },
          tdClass: 'text-black',
        },
        {
          key: 'variant',
          label: 'Variasi',
          thClass: 'text-black py-1',
          thStyle: {
            fontSize: '14px',
            color: 'black',
            textTransform: 'capitalize',
          },
          tdClass: 'text-black',
        },
        {
          key: 'stock',
          label: 'Stok',
          thClass: 'text-black py-1',
          thStyle: {
            fontSize: '14px',
            color: 'black',
            textTransform: 'capitalize',
          },
          tdClass: 'text-black',
        },
        {
          key: 'fulfillment_cost',
          label: 'Biaya Fulfillment',
          thClass: 'text-black py-1',
          thStyle: {
            fontSize: '14px',
            color: 'black',
            textTransform: 'capitalize',
          },
          tdClass: 'text-black',
        },
        {
          key: 'total',
          label: 'Jumlah Pengajuan',
          thClass: 'text-black py-1',
          thStyle: {
            fontSize: '14px',
            color: 'black',
            textTransform: 'capitalize',
          },
          tdClass: 'text-black',
        },
      ],
    }
  },
  watch: {
    warehouse: {
      handler() {
        this.fetchData()
      },
    },
  },
  created() {
    this.fetchData()
    this.fetchDataWarehouse()
  },
  methods: {
    async fetchData() {
      this.selected = []
      this.loading = true
      await this.$http_komship.get(`/v1/komship/outbound/product/${this.warehouse}`)
        .then(res => {
          const { data } = res.data
          const updated = data.map(item => {
            if (item.is_variant === 0) {
              return { ...item, total: 0 }
            }
            const modifiedVariants = item.variant.map(variant => ({ ...variant, total: 0 }))
            return { ...item, variant: modifiedVariants }
          })
          this.barang = updated
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
    async fetchDataWarehouse() {
      this.loading = true
      await this.$http_komship.get('/v1/komship/outbound/warehouses')
        .then(res => {
          const { data } = res.data
          this.whOptions = data.map(obj => ({
            value: obj.warehouse_id,
            text: obj.outbound_queue === 1 ? `${obj.warehouse_name} (Masih ada antrian)` : obj.warehouse_name,
            // eslint-disable-next-line no-unneeded-ternary
            disabled: obj.outbound_queue === 1 ? true : false,
          }))
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
    //  onRowSelected(items) {
    //    this.selected = items
    //  },
    toggleAllRows() {
      if (this.isSelected) {
        this.$refs.selectableTable.selectAllRows()
      }
      if (!this.isSelected) {
        this.$refs.selectableTable.clearSelected()
      }
    },
    //  select(value) {
    //    this.selected = value
    //    this.isSelected = false
    //  },
    confirmAjukan() {
      this.$swal({
        title: 'Pengajuan Penarikan barang',
        text: 'Anda yakin menyutujui pengajuan? saldo kamu akan berkurang untuk biaya penarikan barang',
        icon: 'warning',
        width: '50%',
        reverseButtons: true,
        iconHtml: '<img src="https://storage.googleapis.com/komerce/core/icon-popup-warning.png">',
        showCancelButton: true,
        cancelButtonText: 'Batal',
        confirmButtonText: 'Setujui',
        customClass: {
          icon: 'border-0 w-50 my-5',
          confirmButton: 'btn btn-primary px-4',
          cancelButton: 'btn btn-outline-primary mr-1 px-5',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.hitApi()
        }
      })
    },
    async hitApi() {
      const transformedData = this.selected.map(item => {
        if (item.is_variant) {
          const total = item.variant.reduce((acc, cur) => acc + cur.total, 0)
          return {
            product_id: item.id,
            is_variant: item.is_variant,
            total,
            variants: item.variant.map(variant => ({
              warehouse_variant_id: variant.variant_id,
              variant_name: variant.variant_name,
              option_id: variant.option_id,
              total: variant.total,
            })),
          }
        }
        return {
          product_id: item.id,
          is_variant: item.is_variant,
          total: item.total,
          variants: item.variant,
        }
      })
      const filteredVar = transformedData.map(product => ({
        ...product,
        variants: product.variants.filter(variant => variant.total > 0),
      }))
      const payload = {
        fulfillment_fee: this.totalPay,
        partner_id: JSON.parse(localStorage.getItem('userData')).partner_detail.id,
        // eslint-disable-next-line radix
        warehouse_id: parseInt(this.warehouse),
        products: filteredVar,
      }

      await this.$http_komship.post('/v1/komship/outbound/store', payload)
        .then(res => {
          const { data } = res
          if (data.code === 200) {
            this.$swal({
              title: 'Pengajuan berhasil dikirim',
              text: 'Menunggu persetujuan mitra gudang. untuk koordinasi lebih lanjut kamu bisa menghubungi mitra gudang',
              icon: 'success',
              width: '50%',
              reverseButtons: true,
              allowOutsideClick: false,
              iconHtml: '<img src="https://storage.googleapis.com/komerce/core/icon-popup-success.png">',
              showCancelButton: true,
              cancelButtonText: 'Kembali',
              confirmButtonText: 'Hubungi mitra',
              customClass: {
                icon: 'border-0 w-50 my-5',
                confirmButton: 'btn btn-primary px-4',
                cancelButton: 'btn btn-outline-primary mr-1 px-5',
              },
              buttonsStyling: false,
            }).then(result => {
              if (result.value) {
                console.log('yuhuusss')
              } else {
                this.$router.push({
                  path: `/penarikan-barang/${this.$route.params.id}`,
                })
              }
            })
          } else if (data.code === 400) {
            this.$swal({
              title: 'Pengajuan gagal dikirim',
              text: 'Kamu tidak dapat melakukan pengajuan karena masih memiliki antrian pengajuan',
              icon: 'success',
              width: '50%',
              allowOutsideClick: false,
              iconHtml: '<img src="https://storage.googleapis.com/komerce/core/icon-popup-warning.png">',
              confirmButtonText: 'Oke',
              customClass: {
                icon: 'border-0 w-50 my-5',
                confirmButton: 'btn btn-primary px-4',
              },
              buttonsStyling: false,
            }).then(result => {
              if (result.value) {
                this.$router.push({
                  path: `/penarikan-barang/${this.$route.params.id}`,
                })
              }
            })
          } else {
            this.$swal({
              title: 'Pengajuan gagal dikirim',
              text: 'Saldo kamu tidak mencukupi untuk pengajuan penarikan barang, isi saldo kamu yuk...',
              icon: 'success',
              width: '50%',
              reverseButtons: true,
              allowOutsideClick: false,
              iconHtml: '<img src="https://storage.googleapis.com/komerce/assets/icons/fail.svg">',
              showCancelButton: true,
              cancelButtonText: 'Kembali',
              confirmButtonText: 'Top Up',
              customClass: {
                icon: 'border-0 w-50 my-5',
                confirmButton: 'btn btn-primary px-4',
                cancelButton: 'btn btn-outline-primary mr-1 px-5',
              },
              buttonsStyling: false,
            }).then(result => {
              if (result.value) {
                this.$router.push({
                  name: 'saldo',
                })
              } else {
                this.$router.push({
                  path: `/penarikan-barang/${this.$route.params.id}`,
                })
              }
            })
          }
        })
        .catch(() => {})
    },
    countTotalPay() {
      const result = this.selected.reduce((acc, item) => {
        if (item.is_variant === 1) {
          // eslint-disable-next-line no-shadow
          return acc + item.variant.reduce((acc, variant) => acc + variant.total * item.fulfillment_cost, 0)
        }
        return acc + item.total * item.fulfillment_cost
      }, 0)
      this.totalPay = result
      return result
    },
  },
}
</script>

<style scoped>
.total {
  width: 15%;
  border-bottom: solid 2px #e2e2e2 !important;
  border: none;
  border-radius: 0;
  outline: none;
  margin: 0px 5px;
  padding: 2px 0px;
  text-align: center;
}
</style>
