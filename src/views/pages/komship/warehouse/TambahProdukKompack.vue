<template>
  <BCard body>
    <div class="d-flex justify-between">
      <h4 class="font-bold text-black d-inline-flex mb-0">
        Ajukan Tambah Produk
      </h4>
      <div class="space-x-4">
        <BButton
          variant="outline-primary"
          @click="confirmBatalkan()"
        >
          Batalkan
        </BButton>
        <BButton
          :variant="handleVariantButton()"
          :disabled="handleDisableTambah()"
          @click.once="onFinish"
        >
          Tambah Sekarang
        </BButton>
      </div>
    </div>
    <div class="border mt-2 p-2">
      <div class="d-flex justify-between">
        <div class="d-flex flex-row items-center">
          <div class="mr-1">
            <b-avatar
              :src="detail.image_logo_url"
            />
          </div>
          <div class="d-flex flex-column items-start text-black">
            <div class="font-bold">
              {{ detail.warehouse_name }}
            </div>
            <div class="">
              {{ formatDate(detail.join_date) }}
            </div>
          </div>
        </div>
        <div class="verified-badge gap-2">
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
      <div class="mt-2 text-black space-y-4">
        <div class="d-flex">
          <div class="w-50 d-flex">
            <div class="w-50 font-bold">
              Kota
            </div>
            <div class="w-50">
              {{ detail.city_name }}
            </div>
          </div>
          <div class="w-50 d-flex">
            <div class="w-50 font-bold">
              Status
            </div>
            <div class="w-50">
              <div class="d-flex">
                <div :class="handleAvailability(detail.availability)">
                  {{ detail.availability }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex">
          <div class="w-50 d-flex">
            <div class="w-50 font-bold">
              Owner
            </div>
            <div class="w-50">
              {{ detail.owner }}
            </div>
          </div>
          <div class="w-50 d-flex">
            <div class="w-50 font-bold">
              Alamat gudang
            </div>
            <div class="w-50">
              {{ detail.detail_address }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-end">
      <b-input-group class="mt-2 w-25 input-group-merge">
        <b-input-group-prepend is-text>
          <feather-icon icon="SearchIcon" />
        </b-input-group-prepend>
        <b-form-input
          v-model="searchProduct"
          placeholder="Cari nama produk"
          debounce="500"
        />
      </b-input-group>
    </div>
    <div class="mt-1">
      <BOverlay
        :show="loading"
        spinner-variant="primary"
        variant="light"
        blur="0"
        opacity=".5"
        rounded="sm"
      >
        <BTable
          id="table"
          ref="selectableTable"
          :items="products"
          :fields="fields"
          empty-text="Tidak ada data yang ditampilkan."
          responsive
          show-empty
        >
          <template #cell(checkbox)="data">
            <BCheckbox
              v-model="selected"
              :value="data.item"
            />
          </template>
          <template #cell(nama_produk)="data">
            <div class="d-flex items-center gap-2 text-black">
              <b-img
                :src="data.item.image_path ? data.item.image_path : 'https://storage.googleapis.com/komerce/assets/icons/product-placehold.svg'"
                fluid
                class="image-product"
              />
              <div class="">
                <div class="">
                  {{ data.item.product_name }}
                </div>
                <div class="">
                  SKU : {{ data.item.sku }}
                </div>
              </div>
            </div>
          </template>
          <template #cell(volume)="data">
            <div class="d-flex flex-column">
              <div class="">
                P : {{ data.item.product_lenght }} cm
              </div>
              <div class="">
                L : {{ data.item.product_width }} cm
              </div>
              <div class="">
                T : {{ data.item.product_height }} cm
              </div>
            </div>
          </template>
          <template #cell(harga_barang)="data">
            <div class="">
              {{ data.item.range_price }}
            </div>
          </template>
          <template #cell(bahan_packing)="data">
            <BFormSelect
              v-model="data.item.pm"
              :disabled="disabledPackingOptions(data.item.id)"
              :options="packingOptions"
            />
          </template>
        </BTable>
      </BOverlay>
    </div>
    <b-modal
      id="modal-failed-submission"
      hide-footer
      hide-header
      modal-class="modal-dark"
      centered
      no-close-on-backdrop
      no-close-on-esc
    >
      <b-img
        role="button"
        style="cursor:pointer"
        class="float-right"
        src="https://storage.googleapis.com/komerce/assets/icons/close-circle.svg"
        @click="closeModal()"
      />
      <b-col
        md="12"
        class="d-flex justify-content-center pt-3"
      >
        <b-img
          width="100"
          src="https://storage.googleapis.com/komerce/assets/elements/transfer-fail.png"
        />
      </b-col>

      <b-col class="text-center mt-2 mb-3">
        <h4>
          <medium>
            Pengajuanmu gagal dikirim.
          </medium>
        </h4>
        <h6 class="text-black">
          <strong>
            Maaf, kamu tidak bisa melakukan pengajuan tambah produk dikarenakan kamu masih memiliki antrian pengajuan yang belum disetujui
          </strong>
        </h6>
      </b-col>
    </b-modal>
    <b-modal
      id="modal-success-submission"
      hide-footer
      hide-header
      modal-class="modal-dark"
      centered
      no-close-on-backdrop
      no-close-on-esc
    >
      <b-img
        role="button"
        style="cursor:pointer"
        class="float-right"
        src="https://storage.googleapis.com/komerce/assets/icons/close-circle.svg"
        @click="closeModal()"
      />
      <b-col
        md="12"
        class="d-flex justify-content-center pt-3"
      >
        <b-img
          width="100"
          src="https://storage.googleapis.com/komerce/core/icon-popup-success.png"
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
            Pengajuan tambah produk akan segera dikonfrmasi selambat-lambatnya 2x24 jam.
          </strong>
        </h6>
      </b-col>
    </b-modal>
  </BCard>
</template>

<script>
import moment from 'moment'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { BFormSelect } from 'bootstrap-vue'

export default {
  components: { BFormSelect },
  data() {
    return {
      loading: false,
      detail: {},
      products: [],
      selected: [],
      partnerId: JSON.parse(localStorage.getItem('userData')),
      searchProduct: '',
      packingOptions: [
        { value: null, text: 'Pilih bahan packing' },
      ],
      fields: [
        {
          key: 'checkbox',
          label: '',
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
          key: 'volume',
          label: 'Volume',
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
          key: 'harga_barang',
          label: 'Harga Barang',
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
          key: 'bahan_packing',
          label: 'Bahan Packing',
          thClass: 'text-black text-capitalize py-1 text-center',
          class: 'bg-white text-center',
          thStyle: {
            textTransform: 'capitalize',
            fontSize: '13px',
            color: 'black',
          },
          tdClass: 'text-black align-top',
        },
      ],
      wh: JSON.parse(localStorage.getItem('warehouse_id')),

      limits: 50,
      offset: 0,
      lastData: false,
    }
  },

  watch: {
    searchProduct: {
      handler() {
        this.fetchProduct()
      },
    },
  },
  created() {
    this.fetchDetailGudangKompack()
    this.fetchProduct()
    this.fetchPackingOptions()
  },

  mounted() {
    window.onscroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.getElementById('table').offsetHeight && !this.loading) {
        this.fetchNextProduct()
      }
    }
  },

  methods: {
    handlePackingText(pm) {
      const selectedOption = this.packingOptions.filter(option => pm.includes(option.value))
      if (selectedOption.length === 1) return selectedOption[0].text
      if (selectedOption.length > 1) return `${selectedOption.length} terpilih`
      return 'Pilih bahan packing'
    },
    async fetchDetailGudangKompack() {
      this.loading = true
      await this.$http_komship.get(`/v1/komship/warehouse/information/${this.$route.params.id}`)
        .then(response => {
          this.detail = response.data.data
          this.loading = false
        }).catch(() => {
          this.loading = false
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Gagal',
              icon: 'AlertCircleIcon',
              text: 'Gagal load data, silahkan coba lagi',
              variant: 'danger',
            },
          }, 2000)
        })
    },
    async fetchProduct() {
      if (this.searchProduct === '') {
        this.offset = 0
      }
      this.loading = true
      await this.$http_komship.get('/v1/komship/submission/product', {
        params: {
          warehouse_id: this.wh,
          name: this.searchProduct,
          limits: this.searchProduct === '' ? this.limits : null,
          offset: this.searchProduct === '' ? this.offset : null,
        },
      })
        .then(response => {
          const { data } = response.data
          const updated = data.map(item => {
            const newItem = { ...item }
            newItem.pm = null
            return newItem
          })
          if (updated.length < this.limits) {
            this.lastData = true
          } else {
            this.lastData = false
          }
          this.offset = updated.length
          this.loading = false
          this.selected.forEach(obj => {
            updated[updated.findIndex(item => item.id === obj.id)] = obj
          })
          this.products = updated
        }).catch(err => {
          console.log(err)
          this.loading = false
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Gagal',
              icon: 'AlertCircleIcon',
              text: 'Gagal load data, silahkan coba lagi',
              variant: 'danger',
            },
          }, 2000)
        })
    },
    async fetchNextProduct() {
      if (!this.lastData) {
        this.loading = true
        await this.$http_komship.get('/v1/komship/submission/product', {
          params: {
            warehouse_id: this.wh,
            name: this.searchProduct,
            limits: this.limits,
            offset: this.offset,
          },
        })
          .then(response => {
            const { data } = response.data
            const updated = data.map(item => {
              const newItem = { ...item }
              newItem.pm = []
              return newItem
            })
            this.products.push(...updated)
            this.offset += data.length
            if (data.length < this.limits) {
              this.lastData = true
            }
            this.loading = false
          }).catch(() => {
            this.loading = false
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Gagal',
                icon: 'AlertCircleIcon',
                text: 'Gagal load data, silahkan coba lagi',
                variant: 'danger',
              },
            }, 2000)
          })
      }
    },
    async fetchPackingOptions() {
      await this.$http_komship.get('/v1/select-option/packing')
        .then(response => {
          const packing = response.data.data.map(data => ({
            value: data.id,
            text: data.name,
          }))
          this.packingOptions = packing
        }).catch(() => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Gagal',
              icon: 'AlertCircleIcon',
              text: 'Gagal load data, silahkan coba lagi',
              variant: 'danger',
            },
          }, 2000)
        })
    },
    async onFinish() {
      const dataProduct = this.selected.map(product => ({
        product_id: product.id,
        packing_material: product.pm,
      }))

      const payload = {
        partner_id: this.partnerId.partner_detail.id,
        warehouse_id: this.wh,
        submission_type: 2,
        product: dataProduct,
      }

      await this.$http_komship.post('/v1/komship/submission', payload)
        .then(response => {
          if (response.data.code === 200) {
            this.$bvModal.show('modal-success-submission')
            this.fetchProduct()
          } else {
            this.$bvModal.show('modal-failed-submission')
            this.fetchProduct()
          }
        })
        .catch()
    },
    handleDisableTambah() {
      for (let i = 0; i < this.selected.length; i += 1) {
        if (this.selected[i].pm === null) return true
      }
      if (this.selected.length === 0) return true
      if (this.products.length === 0) return true
      return false
    },
    handleVariantButton() {
      for (let i = 0; i < this.selected.length; i += 1) {
        if (this.selected[i].pm.length === 0) return 'secondary'
      }
      if (this.selected.length === 0) return 'secondary'
      if (this.products.length === 0) return 'secondary'
      return 'primary'
    },
    disabledPackingOptions(data) {
      for (let i = 0; i < this.selected.length; i += 1) {
        if (this.selected[i].id === data) return false
      }
      return true
    },
    formatDate(value) {
      return moment(value).format('DD MMMM YYYY')
    },
    handleAvailability(status) {
      if (status === 'Tersedia') {
        return 'status-tersedia'
      }
      return 'status-penuh'
    },
    confirmBatalkan() {
      this.$swal({
        text: 'Kamu yakin ingin membatalkan tambah produk?',
        icon: 'warning',
        iconHtml: '<img src="https://storage.googleapis.com/komerce/core/icon-popup-warning.png">',
        showCancelButton: true,
        cancelButtonText: 'Tidak',
        confirmButtonText: 'Ya',
        customClass: {
          icon: 'border-0 w-50 my-5',
          confirmButton: 'btn btn-outline-primary mr-1 px-5',
          cancelButton: 'btn btn-primary px-4',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.$router.go(-1)
        }
      })
    },
    closeModal() {
      this.$router.push({
        path: `/search-gudang/detail/${this.$route.params.id}`,
      })
    },
  },
}
</script>
<style scoped>
.verified-badge {
  background-color: #DFF3FF;
  display: flex;
  align-items: center;
  color: #08A0F7;
  padding: 5px 10px;
  border-radius: 4px;
 }
 .status-tersedia {
  background-color: #DCF3EB;
  padding: 5px 10px;
  border-radius: 4px;
  color: #34A770;
 }
 .image-product{
  object-fit: cover;
  object-position: center center;
  width: 50px!important;
  height: 50px!important;
}
 .status-penuh {
  background-color: #FFEDED;
  padding: 5px 10px;
  border-radius: 4px;
  color: #E31A1A;
 }
</style>
