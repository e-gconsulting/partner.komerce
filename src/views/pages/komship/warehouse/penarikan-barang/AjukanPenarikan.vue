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
    <v-select
      v-model="warehouse"
      placeholder="Pilih Gudang"
      class="w-100 mb-2"
      :options="gudangList"
      :reduce="gudang => gudang.value"
      :selectable="gudang => !gudang.disabled"
      @input="fetchData()"
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
        <template #head(checkbox)="data">
          <BCheckbox
            v-model="selectAll"
            :value="data"
            @change="checkedAll()"
          />
        </template>
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
                  :variant="item.total <= 0 ? 'outline-secondary' : 'outline-primary'"
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
                  onkeydown="return event.keyCode !== 69 && event.keyCode !== 189"
                  type="number"
                  class="total"
                  min="0"
                  @keyup="event => item.total >= item.variant_stock ? item.total = item.variant_stock : item.total"
                >
                <b-button
                  :variant="item.total >= item.variant_stock ? 'outline-secondary' : 'outline-primary'"
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
                :variant="data.item.total <= 0 ? 'outline-secondary' : 'outline-primary'"
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
                onkeydown="return event.keyCode !== 69 && event.keyCode !== 189"
                type="number"
                class="total"
                min="0"
                @keyup="event => data.item.total > data.item.stock ? data.item.total = data.item.stock : data.item.total"
              >
              <b-button
                :variant="data.item.total >= data.item.stock ? 'outline-secondary' : 'outline-primary'"
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
        :variant="handleVariantDisable()"
        :disabled="handleDisable()"
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
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

export default {
  components: {
    vSelect,
  },
  filters: { rupiah: filters.rupiah },
  data() {
    return {
      gudangList: [],

      selectAll: false,

      totalPay: 0,

      loading: false,
      isSelected: false,
      selected: [],
      warehouse: '',
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
  created() {
    // this.fetchData()
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
      await this.$http_komship.get('/v1/komship/outbound/warehouses')
        .then(res => {
          const { data } = res.data
          this.gudangList = data.map(obj => ({
            label: obj.outbound_queue === 1 ? `${obj.warehouse_name} (Masih ada antrian)` : obj.warehouse_name,
            value: obj.warehouse_id,
            disabled: obj.outbound_queue === 1,
          }))
        }).catch(() => {
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
    checkedAll() {
      if (this.selectAll) {
        this.selected = this.barang
      } else {
        this.selected = []
      }
    },
    handleCheckbox() {
      if (this.selected.length === this.barang.length) {
        this.selectAll = true
      } else {
        this.selectAll = false
      }
    },
    toggleAllRows() {
      if (this.isSelected) {
        this.$refs.selectableTable.selectAllRows()
      }
      if (!this.isSelected) {
        this.$refs.selectableTable.clearSelected()
      }
    },
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
        allowOutsideClick: false,
        allowEscapeKey: false,
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

      const FinalFilteredVar = filteredVar.filter(product => product.total > 0)

      const payload = {
        fulfillment_fee: this.totalPay,
        partner_id: JSON.parse(localStorage.getItem('userData')).partner_detail.id,
        // eslint-disable-next-line radix
        warehouse_id: parseInt(this.warehouse),
        products: FinalFilteredVar,
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
              allowEscapeKey: false,
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
                this.$router.push({
                  path: '/penarikan-barang',
                })
                window.open(`https://wa.me/62${data.data.pic_phone.substring(1)}`, '_blank')
              } else {
                this.$router.push({
                  path: '/penarikan-barang',
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
              allowEscapeKey: false,
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
                  path: '/penarikan-barang',
                })
              }
            })
          } else if (data.code === 1006) {
            this.$swal({
              title: 'Pengajuan gagal dikirim',
              text: 'Saldo kamu tidak mencukupi untuk pengajuan penarikan barang, isi saldo kamu yuk...',
              icon: 'success',
              width: '50%',
              reverseButtons: true,
              allowOutsideClick: false,
              allowEscapeKey: false,
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
                  path: '/penarikan-barang',
                })
              }
            })
          }
        })
        .catch(() => {})
    },
    countTotalPay() {
      // console.log(this.selected.map(product => product.variant.filter(variant => variant.total !== 0).length > 0).includes(false) === true)
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
    handleVariantDisable() {
      const nonVariantFiltered = this.selected.filter(product => (product.is_variant === 0 && product.total > 0))
      const variantFiltered = this.selected.filter(product => (product.is_variant === 1)).map(product => (product.variant.filter(item => item.total > 0)))

      if (this.selected.length === 0) return 'secondary'
      if ((nonVariantFiltered?.length + variantFiltered?.length) === this.selected.length && variantFiltered.every(data => data.length > 0)) return 'primary'
      if ((variantFiltered?.length) === this.selected.length && variantFiltered.every(data => data.length > 0)) return 'primary'
      if (nonVariantFiltered?.length > 0 && (nonVariantFiltered?.length) === this.selected.length) return 'primary'

      return 'secondary'
    },
    handleDisable() {
      const nonVariantFiltered = this.selected.filter(product => (product.is_variant === 0 && product.total > 0))
      const variantFiltered = this.selected.filter(product => (product.is_variant === 1)).map(product => (product.variant.filter(item => item.total > 0)))

      if (this.selected.length === 0) return true
      if ((nonVariantFiltered?.length + variantFiltered?.length) === this.selected.length && variantFiltered.every(data => data.length > 0)) return false
      if ((variantFiltered?.length) === this.selected.length && variantFiltered.every(data => data.length > 0)) return false
      if (nonVariantFiltered?.length > 0 && (nonVariantFiltered?.length) === this.selected.length) return false

      return true
    },
  },
}
</script>
<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
  .vs__dropdown-menu {
  max-height: 130px;
}
</style>
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
