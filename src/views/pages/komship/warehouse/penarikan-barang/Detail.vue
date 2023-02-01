<template>
  <b-card body>
    <div class="d-flex items-center">
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
        Penarikan Barang
      </h4>
      <div
        class="d-inline flex ml-1"
        :class="handleStatus('class', detail.status)"
      >
        {{ handleStatus('text', detail.status) }}
      </div>
    </div>
    <div class="d-flex mt-2 gap-2 mb-2 mx-1">
      <img
        src="https://storage.googleapis.com/komerce/assets/svg/logo_kompack.svg"
        alt="logo-kompack"
      >
      <div class="text-black text-lg">
        {{ detail.warehouse_name }}
      </div>
    </div>
    <div
      v-if="detail.status === 'Diproses'"
      class="alert mb-2"
    >
      Segera lakukan konfirmasi penerimaan barang. status akan otomatis terupdate dalam waktu 30 hari setelah mitra gudang menyetujui pengajuanmu
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
        empty-text="Tidak ada data yang ditampilkan."
        responsive
        show-empty
        :fields="fields"
        :items="barang"
        class="mb-0"
      >
        <template #cell(variant)="data">
          <div v-if="data.item.variant === ''">
            -
          </div>
          <div v-else>
            {{ data.item.variant }}
          </div>
        </template>
      </b-table>
    </BOverlay>
    <b-button
      v-if="detail.status === 'Diproses'"
      variant="primary"
      class="float-right"
      @click="confirmDiterima()"
    >
      Barang Diterima
    </b-button>
  </b-card>
</template>

<script>
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  data() {
    return {
      loading: false,
      fields: [
        {
          key: 'nama_product',
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
          key: 'stok',
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
      detail: {},
      barang: [],
      limit: 50,
      offset: 0,
      lastData: false,
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    window.onscroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.getElementById('table').offsetHeight && !this.loading) {
        this.fetchNextData()
      }
    }
  },
  methods: {
    async fetchData() {
      this.loading = true
      await this.$http_komship.get(`/v1/komship/outbound/${this.$route.params.id}/detail`, {
        params: {
          limit: this.limit,
          offset: this.offset,
        },
      })
        .then(res => {
          const { data } = res.data
          this.detail = data
          this.barang = data.products
          this.loading = false
          this.offset = data.products.length
          if (data.products.length < this.limit) {
            this.lastData = true
          } else {
            this.lastData = false
          }
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
    async fetchNextData() {
      if (!this.lastData) {
        this.loading = true
        await this.$http_komship.get(`/v1/komship/outbound/${this.$route.params.id}/detail`, {
          params: {
            limit: this.limit,
            offset: this.offset,
          },
        })
          .then(res => {
            const { products } = res.data.data
            this.barang.push(...products)
            this.loading = false
            this.offset += products.length
            if (products.length < this.limit) {
              this.lastData = true
            }
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
      }
    },
    received() {
      this.$http_komship.put(`/v1/komship/outbound/${this.$route.params.id}/approve`)
        .then(() => {
          this.$router.go(-1)
          this.$router.replace({ query: { tab: 'data-barang-dikeluarkan' } })
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Success',
              icon: 'CheckIcon',
              text: 'Sukses konfirmasi terima barang',
              variant: 'success',
            },
          }, 2000)
        })
        .catch(() => {
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Gagal',
                icon: 'AlertCircleIcon',
                text: 'Gagal konfirmasi terima barang, silahkan coba lagi',
                variant: 'danger',
              },
            },
            2000,
          )
        })
    },
    confirmDiterima() {
      this.$swal({
        title: 'Konfirmasi Penerimaan Barang',
        text: 'Pastikan barang telah anda terima sebelum melakukan konfirmasi penerimaan',
        icon: 'warning',
        iconHtml: '<img src="https://storage.googleapis.com/komerce/core/icon-popup-warning.png">',
        showCancelButton: true,
        cancelButtonText: 'Batal',
        confirmButtonText: 'Konfirmasi',
        reverseButtons: true,
        customClass: {
          icon: 'border-0 w-50 my-5',
          confirmButton: 'btn btn-primary px-4',
          cancelButton: 'btn btn-outline-primary mr-1 px-5',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.received()
        }
      })
    },
    handleStatus(part, status) {
      if (part === 'class') {
        if (status === 'Diajukan') return 'status status-waiting'
        if (status === 'Selesai') return 'status status-done'
        if (status === 'Ditolak') return 'status status-reject'
        if (status === 'Diproses') return 'status status-acc'
      }
      if (status === 'Diajukan') return 'Menunggu respon mitra'
      if (status === 'Diproses') return 'Disetujui'
      return status
    },
  },
}

</script>

<style lang="scss" scoped>
.alert {
   background-color: #FFF2E2;
   color: #F95031;
   border-radius: 8px;
   padding: 10px;
}
.status {
  padding: 2px 8px;
  border-radius: 100px;
  text-align: center;
  &-acc {
    color: #34A770;
    background: #DCF3EB;
  }
  &-waiting {
    color: #FBA63C;
    background: #FFF2E2;
  }
  &-done {
    color: #4285F4;
    background: #DFF3FF;
  }
  &-reject {
    color: #E31A1A;
    background: #FFEDED;  }
}
</style>
