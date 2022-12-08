<template>
  <b-card body>
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
        Pengajuan Tambah Produk
      </h4>
    </div>
    <div class="d-flex flex-column border mt-2 mb-2 p-2 text-black space-y-5">
      <div class="d-flex gap-5">
        <div class="font-bold text-lg">
          Mitra Gudang
        </div>
        <BBadge
          :variant="handleStatusBadge('badge', detail.submission_status)"
        >
          {{ handleStatusBadge('text', detail.submission_status) }}
        </BBadge>
      </div>
      <div class="w-100 d-flex">
        <div class="d-flex flex-row items-center">
          <div class="mr-1">
            <b-avatar
              :src="detail.warehouse_logo_url"
            />
          </div>
          <div class="d-flex flex-column items-start">
            <div class="font-bold">
              {{ detail.warehouse_name }}
            </div>
            <div class="">
              {{ formatDate(detail.warehouse_join_date) }}
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="detail.warehouse_verification === 'Terverifikasi'"
        class="w-100 d-flex"
      >
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
      <div class="w-100 d-flex">
        <div class="w-25 px-0">
          Owner
        </div>
        <div class="w-75 px-0">
          {{ detail.owner }}
          <img
            v-if="(detail.owner_verification === 1)"
            class="d-inline-flex w-5"
            src="https://storage.googleapis.com/komerce/assets/verified-shield.svg"
            alt=""
          >
        </div>
      </div>
      <div class="w-100 d-flex">
        <div class="w-25 px-0">
          Status
        </div>
        <div class="w-75 px-0 d-flex">
          <div :class="handleAvailability(detail.warehouse_availability)">
            {{ detail.warehouse_availability }}
          </div>
        </div>
      </div>
      <div class="w-100 d-flex">
        <div class="w-25 px-0">
          Alamat Gudang
        </div>
        <div class="w-75 px-0">
          {{ detail.detail_address }}
        </div>
      </div>
      <div class="w-100 d-flex flex-row-reverse mt-4">
        <div class="w-50 d-flex gap-7">
          <BButton
            v-if="detail.submission_status !== 'Sedang Diajukan'"
            class="w-100"
            variant="outline-primary"
            @click="handleChat(detail.warehouse_phone)"
          >
            Chat
          </BButton>
          <BButton
            v-else
            class="w-100"
            disabled
          >
            Chat
          </BButton>
          <BButton
            class="w-100"
            variant="outline-primary"
            @click="handleInfoGudang(detail.mitra_id)"
          >
            Lihat Info Gudang
          </BButton>
        </div>
      </div>
    </div>
    <div class="font-bold text-black text-lg">
      Daftar Produk
    </div>
    <b-overlay
      class="mx-1 text-start text-black"
      spinner-variant="primary"
      variant="light"
      blur="0"
      opacity=".5"
      rounded="sm"
    >
      <b-row class="border-b py-2">
        <b-col cols="4">
          Nama
        </b-col>
        <b-col cols="2">
          Volume
        </b-col>
        <b-col cols="2">
          Harga Barang
        </b-col>
        <b-col cols="2">
          Jenis Bahan Packing
        </b-col>
        <b-col cols="2">
          Biaya Fulfillment
        </b-col>
      </b-row>
      <div v-if="detail.product_submission.length > 0">
        <div
          v-for="(item, index) in detail.product_submission"
          :key="index+1"
        >
          <b-row class="text-black border-b py-2">
            <b-col cols="4">
              <div class="d-flex gap-3">
                <div class="">
                  <b-img
                    v-if="(item.images_path === null)"
                    src="https://storage.googleapis.com/komerce/assets/icons/product-placehold.svg"
                    alt=""
                  />
                  <b-img
                    v-else
                    class="image-product"
                    :src="item.images_path"
                    alt=""
                  />
                </div>
                <div class="text-start d-flex flex-column gap-y-1">
                  <div
                    v-if="(item.is_reject === 1)"
                    class="w-100 d-flex"
                  >
                    <div class="reject">
                      Ditolak
                    </div>
                  </div>
                  <strong>{{ item.product_name }}</strong>
                  <div class="text-primary">
                    SKU: {{ item.sku }}
                  </div>
                </div>
              </div>
            </b-col>
            <b-col cols="2">
              <div class="">
                P : {{ item.product_length }} cm
              </div>
              <div class="">
                L : {{ item.product_width }} cm
              </div>
              <div class="">
                T : {{ item.product_height }} cm
              </div>
            </b-col>
            <b-col cols="2">
              <div class="">
                Rp. {{ formatRupiah(item.product_price) }}
              </div>
            </b-col>
            <b-col cols="2">
              <div class="">
                {{ item.packing_material }}
              </div>
            </b-col>
            <b-col cols="2">
              <div v-if="(item.fulfillment_cost !== null)">
                Rp. {{ formatRupiah(item.fulfillment_cost) }}
              </div>
              <div v-else>
                -
              </div>
            </b-col>
          </b-row>
          <!-- <b-row class="justify-content-center text-blue mr-3 my-1">
            <div v-if="item.variant.length > 2">
              <b-button
                v-b-toggle="`variant-${String(index)}`"
                class="text-bold btn-collapse"
                size="sm"
              >
                <span class="when-opened mr-2">
                  Tutup
                </span>
                <span class="when-closed mr-2">
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
          </b-row> -->
        </div>
      </div>
      <div v-else>
        <b-col
          cols="12"
          class="text-center"
        >
          <h5 class="py-3">
            Tidak ada data untuk ditampilkan.
          </h5>
        </b-col>
      </div>
    </b-overlay>
  </b-card>
</template>

<script>
import moment from 'moment'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  name: 'DetailRiwayatAddProduct',
  data() {
    return {
      detail: {},

      isEdit: false,

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

  created() {
    this.fetchDetailAddProduct()
  },

  methods: {
    handleChat(number) {
      window.open(`https://wa.me/62${number.substring(1)}`, '_blank')
    },

    handleInfoGudang(id) {
      this.$router.push({
        path: `/search-gudang/detail/${id}`,
      })
    },

    handleStatusBadge(part, status) {
      if (part === 'badge') {
        if (status === 'Sedang Diajukan') {
          return 'light-warning'
        }
        if (status === 'Disetujui') {
          return 'light-success'
        }
        return 'light-danger'
      }
      return status
    },

    handleAvailability(status) {
      if (status === 'Tersedia') {
        return 'status-tersedia'
      }
      return 'status-penuh'
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

    fetchDetailAddProduct() {
      this.$http_komship.get(`/v1/komship/submission/history/${this.$route.params.id}/detail`)
        .then(response => {
          this.detail = response.data.data
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
        title: 'Batalkan AddProduct',
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
          this.batalkanAddProduct(data)
        }
      })
    },

    formatRupiah(value) {
      return new Intl.NumberFormat('id-ID').format(value)
    },

    batalkanAddProduct(data) {
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

 .status-tersedia {
  background-color: #DFF3FF;
  padding: 5px 10px;
  border-radius: 4px;
  color: #08A0F7;
 }
 .status-penuh {
  background-color: #FFEDED;
  padding: 5px 10px;
  border-radius: 4px;
  color: #E31A1A;
 }

 .verified-badge {
  background-color: #DFF3FF;
  display: flex;
  align-items: center;
  color: #08A0F7;
  padding: 5px 10px;
  border-radius: 4px;
 }

 .reject {
   background-color: #FCBEBE;
   color: #E31A1A;
  padding: 5px 10px;
  border-radius: 4px;
 }
 </style>
