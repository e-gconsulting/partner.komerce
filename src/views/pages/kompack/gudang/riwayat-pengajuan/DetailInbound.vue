<template>
  <b-card body>
    <div class="">
      <b-button
        v-if="isEdit === false"
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
      <b-button
        v-else
        variant="primary"
        size="sm"
        class="mr-1 rounded-lg p-0"
        @click="cancelEdit()"
      >
        <feather-icon
          size="2x"
          icon="ChevronLeftIcon"
        />
      </b-button>
      <h4 class="font-bold text-black d-inline-flex mb-0">
        Detail Inbound
      </h4>
    </div>
    <div
      v-if="detail.status !== `Dibatalkan`"
      class="d-flex flex-row-reverse"
    >
      <div v-if="isEdit === true">
        <b-button
          variant="outline-primary"
          class="px-3"
          @click="console('simpan')"
        >Simpan</b-button>
      </div>
      <div
        v-else
        class="space-x-3"
      >
        <b-button
          variant="outline-primary"
          class="px-3"
          @click="confirmBatalkan(detail.id)"
        >Batalkan</b-button>
        <b-button
          variant="outline-primary"
          class="px-5"
          @click="isEdit = true"
        >Edit</b-button>
      </div>
    </div>
    <div class="d-flex flex-column border mt-2 mb-2 p-2 text-black space-y-5">
      <div class="w-100 d-flex">
        <div class="w-25 px-0">
          Status Inbound
        </div>
        <div
          class="w-75 px-0"
          :class="statusColor(detail.status)"
        >
          {{ detail.status }}
        </div>
      </div>
      <div class="w-100 d-flex">
        <div class="w-25 px-0">
          Dikirim dari
        </div>
        <div class="w-75 px-0">
          {{ detail.send_from }}
        </div>
      </div>
      <div class="w-100 d-flex">
        <div class="w-25 px-0">
          Dikirim ke
        </div>
        <div class="w-75 px-0">
          {{ detail.send_to }}
        </div>
      </div>
      <div class="w-100 d-flex">
        <div class="w-25 px-0">
          Jasa Pengiriman
        </div>
        <div class="w-75 px-0 text-primary">
          <div class="d-flex items-center gap-3">
            <img
              :src="shippingMethods('img', detail.shipping)"
              alt=""
            >
            <div class="">
              {{ shippingMethods('text', detail.shipping) }}
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="detail.shipping === null"
        class="w-100 d-flex"
      >
        <div class="w-25 px-0">
          Tanggal Pengiriman
        </div>
        <div class="w-75 px-0">
          {{ formatDate(detail.shipping_date) }}
        </div>
      </div>
      <div
        v-if="detail.shipping === null"
        class="w-100 d-flex"
      >
        <div class="w-25 px-0">
          Estimasi Sampai Gudang
        </div>
        <div class="w-75 px-0">
          {{ formatDate(detail.estimate_date) }}
        </div>
      </div>
      <div
        v-if="detail.shipping"
        class="w-100 d-flex"
      >
        <div class="w-25 px-0">
          Ekspedisi
        </div>
        <div class="w-75 px-0">
          {{ detail.shipping }}
        </div>
      </div>
      <div
        v-if="detail.no_resi"
        class="w-100 d-flex"
      >
        <div class="w-25 px-0">
          Nomor Resi
        </div>
        <div class="w-75 px-0">
          {{ detail.no_resi }}
        </div>
      </div>
    </div>
    <div class="d-flex">
      <div
        class="border"
        :style="!Array.isArray(history) && isEdit === false ? `width: 55%;` : `width: 100%;`"
      >
        <div class="d-flex align-items-center justify-between m-2">
          <h5 class="text-black font-bold">
            Data Product</h5>
          <b-button
            v-if="isEdit === true"
            variant="outline-primary"
            class="px-3"
            @click="console('tambah')"
          >Tambah Produk</b-button>
        </div>
        <BTable
          small
          class="text-center"
          :fields="fields"
          :items="products"
          responsive="sm"
        >
          <template #cell(nama_produk)="data">
            <div class="my-2 d-flex gap-2 items-center text-black">
              <b-img
                :src="data.item.image_path"
                fluid
                class="image-product"
              />
              <div class="">
                {{ data.item.product_name }}
              </div>
            </div>
          </template>
          <template #cell(variasi)="data">
            <div class="space-y-3 text-black">
              <div
                v-if="data.item.is_variant === 0"
                class=""
              >
                {{ '-' }}
              </div>
              <div
                v-for="i in data.item.variant"
                :key="i.variant_id"
                class=""
              >
                {{ i.variant_name ? i.variant_name : 'null' }}
              </div>
            </div>
          </template>
          <template #cell(jumlah)="data">
            <div class="space-y-3">

              <div
                v-for="i in data.item.variant"
                :key="i.variant_id"
                class="d-flex justify-center"
              >
                <b-button
                  v-if="isEdit==true"
                  variant="outline-primary"
                  class="p-0"
                  style="border-radius:50%;width:25px;height:25px"
                  size="sm"
                  :disabled="i.total_inbound <= 1"
                  @click="setQuantity('minus', detailInbound.products.map(object => object.id).indexOf(data.item.id), data.item.variant.map(object => object.variant_id).indexOf(i.variant_id))"
                >
                  <span class="font-bold text-lg">-</span>
                </b-button>
                <span
                  class="text-lg"
                  style="margin: 0 10px"
                >{{ i.total_inbound }}</span>
                <b-button
                  v-if="isEdit==true"
                  variant="outline-primary"
                  class="p-0"
                  style="border-radius:50%;width:25px;height:25px"
                  size="sm"
                  @click="setQuantity('plus', detailInbound.products.map(object => object.id).indexOf(data.item.id), data.item.variant.map(object => object.variant_id).indexOf(i.variant_id))"
                >
                  <span class="font-bold text-lg">+</span>
                </b-button>
              </div>
            </div>
            <div
              v-if="data.item.total_inbound !== 0"
              class=""
            >
              <b-button
                v-if="isEdit==true"
                variant="outline-primary"
                class="p-0"
                style="border-radius:50%;width:25px;height:25px"
                size="sm"
                :disabled="data.item.total_inbound <= 1"
                @click="data.item.total_inbound -= 1"
              >
                <span class="font-bold text-lg">-</span>
              </b-button>
              <span
                class="text-lg"
                style="margin: 0 10px"
              >{{ data.item.total_inbound }}</span>
              <!-- <span>{{ data.item.id }}</span> -->
              <b-button
                v-if="isEdit==true"
                variant="outline-primary"
                class="p-0"
                style="border-radius:50%;width:25px;height:25px"
                size="sm"
                @click="data.item.total_inbound +=1"
              >
                <span class="font-bold text-lg">+</span>
              </b-button>
            </div>
          </template>

          <!-- <template #cell(jumlah)="data">
            <div class="text-black">
              <div
                v-if="data.item.total_inbound === 0"
                class="space-y-3"
              >
                <div
                  v-for="i in data.item.variant"
                  :key="i.variant_id"
                  class=""
                >
                  {{ i.total_inbound }}
                </div>
              </div>
              <div
                v-if="data.item.total_inbound !== 0"
                class=""
              >
                <div
                  class=""
                >
                  {{ data.item.total_inbound }}
                </div>
              </div>
            </div>
          </template> -->
        </BTable>
        <!-- <span>{{ detailInbound.products[0].variant[0].total_inbound + 1 }}</span> -->
        <!-- <span>{{ detailInbound.products[0] }}</span> -->
      </div>
      <div
        v-if="!Array.isArray(history) && isEdit === false"
        class="border ml-2"
        style="width: 45%;"
      >
        <h5 class="text-black font-bold m-2">
          Riwayat Perjalanan :</h5>
        <div class="d-flex flex-column p-1 border-t text-black">
          <div
            v-if="history.status.code === 200"
            class="space-y-7"
          >
            <div
              v-for="item in history.manifest"
              :key="item.id"
              class="d-flex"
            >
              <div class="d-flex flex-column w-25 justify-content-center">
                <span>{{ formatDateManifest(item.manifest_date) }}</span>
                <span>{{ formatTimeManifest(item.manifest_time) }} WIB</span>
              </div>
              <div class="w-25 d-flex align-items-center justify-content-center">
                <div class="relative">
                  <img
                    :src="ellipseColor(item.manifest_code)"
                    alt=""
                  >
                  <div
                    v-if="item.manifest_code !== `1`"
                    class="dash border"
                  />
                </div>
              </div>
              <div class="w-75 d-flex flex-column justify-content-center">
                <span>{{ item.city_name }}</span>
                <span>{{ item.manifest_description }}</span>
              </div>
            </div>
          </div>
          <div
            v-else
            class="d-flex justify-content-center flex-column space-y-3"
          >
            <img src="https://storage.googleapis.com/komerce/assets/tidak-dapat-tracking.svg">
            <div class="text-black font-black text-xl text-center mt-3">
              Ekspedisi yang kamu gunakan belum
              dapat ditracking melalui Kompack
            </div>
            <div class="text-center mx-3">
              kamu dapat melakukan pengecekan riwayat perjalanan melalui website ekspedisi
              yang kamu gunakan.</div>
          </div>
        </div>
      </div>
    </div>
  </b-card>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
// import secureLocalStorage from '@/libs/secureLocalstorage'

export default {
  name: 'RiwayatInbound',
  data() {
    return {

      isEdit: false,

      detail: JSON.parse(localStorage.getItem('dataTes')),

      fields: [
        {
          key: 'nama_produk',
          label: 'Nama Produk',
        },
        {
          key: 'variasi',
          label: 'Variasi',
        },
        {
          key: 'jumlah',
          label: 'Jumlah',
        },
      ],

      products: null,
      history: null,
    }
  },

  computed: {
    ...mapState('riwayatPengajuan', ['detailInbound']),
  },

  created() {
    this.fetchDetailInbound()
    // console.log(`detail ${this.$route.params.id}`, this.detail)
    // console.log(`products ${this.$route.params.id}`, this.detailInbound.products)
    // console.log(`history ${this.$route.params.id}`, this.detailInbound.history_shipping)

    // console.log('tes')
  },

  methods: {

    cancelEdit() {
      this.isEdit = false
      this.fetchDetailInbound()
    },

    console(value) {
      console.log(value)
    },

    setQuantity(status, product, index) {
      if (status === 'plus') {
        this.detailInbound.products[product].variant[index].total_inbound += 1
      } else if (status === 'minus') {
        this.detailInbound.products[product].variant[index].total_inbound -= 1
      }
    },

    fetchDetailInbound() {
      this.$store
        .dispatch('riwayatPengajuan/getDetailInbound', {
          inbound_id: this.$route.params.id,
        })
        .then(() => {
          this.products = this.detailInbound.products
          this.history = this.detailInbound.history_shipping
        })
        .catch(() => {
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

    shippingMethods(part, shipping) {
      if (part === 'img') {
        if (shipping != null) {
          return 'https://storage.googleapis.com/komerce/assets/menggunakan-ekspedisi-orange.svg'
        }
        return 'https://storage.googleapis.com/komerce/assets/dikirim-sendiri-orange.svg'
      }
      if (shipping != null) {
        return 'Menggunakan Ekspedisi'
      }
      return 'Dikirim Sendiri'
    },

    statusColor(status) {
      if (status === 'Proses') {
        return 'text-warning'
      } if (status === 'Selesai') {
        return 'text-success'
      }
      return 'text-danger'
    },
    formatDate(value) {
      return moment(value).format('DD MMMM YYYY')
    },

    formatDateManifest(value) {
      return moment(value).format('DD MMM')
    },
    formatTimeManifest(value) {
      return value.replace(/:[^:]*$/, '')
    },
    ellipseColor(value) {
      if (value === '5') {
        return 'https://storage.googleapis.com/komerce/assets/tracking-ellipse-orange.svg'
      }
      return 'https://storage.googleapis.com/komerce/assets/tracking-elipse.svg'
    },

    confirmBatalkan(data) {
      this.$swal({
        text: 'Anda yakin melakukan pembatalan inbound?',
        title: 'Batalkan Inbound',
        icon: 'warning',
        iconHtml: '<img src="https://storage.googleapis.com/komerce/core/icon-popup-warning.png">',
        showCancelButton: true,
        cancelButtonText: 'Tidak',
        confirmButtonText: 'Ya',
        customClass: {
          icon: 'border-0 w-50 my-5',
          confirmButton: 'btn btn-primary mr-1 px-5',
          cancelButton: 'btn btn-outline-primary px-4',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.batalkanInbound(data)
        }
      })
    },

    batalkanInbound(data) {
      this.$http_komship.put(`/v1/komship/inbound/cancel/${data}`)
        .then(() => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Success',
              icon: 'CheckIcon',
              text: 'Success batalkan inbound',
              variant: 'success',
            },
          }, 2000)
          this.$router.go(-1)
        }).catch(() => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Gagal',
              icon: 'AlertCircleIcon',
              text: 'Gagal batalkan inbound, silahkan coba lagi!',
              variant: 'danger',
            },
          }, 2000)
          this.$router.refresh()
        })
    },
  },
}
</script>

<style scoped>
.image-product {
  object-fit: cover;
  object-position: center center;
  width: 50px!important;
  height: 50px!important;
}

.dash{
  position: absolute;
  height: 45px;
  margin: 4px 0px;
  margin-left: 5px;
}
</style>
