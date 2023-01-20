<template>
  <b-modal
    id="modal-detail"
    size="lg"
    hide-footer
    hide-header
    modal-class="modal-dark"
    centered
  >
    <h4 class="font-bold text-black d-inline-flex mb-0">
      Pengajuan barang rusak
    </h4>
    <div
      class="d-inline-flex ml-1"
      :class="handleStatus('class', res.status)"
    >
      {{ handleStatus('text', res.status) }}
    </div>
    <b-img
      role="button"
      style="cursor:pointer"
      class="float-right"
      src="https://storage.googleapis.com/komerce/assets/icons/close-circle.svg"
      @click="closeModal()"
    />
    <div class="d-flex mt-2 gap-2 mb-2">
      <img
        src="https://storage.googleapis.com/komerce/assets/svg/logo_kompack.svg"
        alt="logo-kompack"
      >
      <div class="text-black text-lg">
        {{ res.warehouse_name }}
      </div>
    </div>
    <BOverlay
      :show="loading"
      spinner-variant="primary"
      variant="light"
      blur="0"
      opacity=".5"
      rounded="sm"
      class="-mx-5"
    >
      <b-table
        id="table"
        empty-text="Tidak ada data yang ditampilkan."
        responsive
        show-empty
        :fields="fields"
        :items="res.products"
        class="mb-0"
      />
    </BOverlay>
    <div
      v-if="res.status === 'Diajukan'"
      class="d-flex"
    >
      <div class="w-50">
        <b-button
          variant="outline-primary"
          @click="handleChat(res.warehouse_phone)"
        >
          Hubungi Mitra
        </b-button>
      </div>
      <div class="w-50 d-flex justify-content-end gap-3">
        <b-button
          variant="outline-primary"
          @click="confirmReject(res.outbound_id)"
        >
          Tolak
        </b-button>
        <b-button
          variant="primary"
          @click="confirm(res.outbound_id)"
        >
          Setujui
        </b-button>
      </div>
    </div>
  </b-modal>
</template>

<script>
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  props: {
    res: {
      type: Object,
      required: true,
    },
  },

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
    }
  },

  methods: {
    changeLoading() {
      if (!this.res) {
        this.loading = true
      } else {
        this.loading = false
      }
    },
    handleStatus(part, status) {
      if (part === 'class') {
        if (status === 'Diajukan') return 'status status-waiting'
        if (status === 'Selesai') return 'status status-done'
        if (status === 'Ditolak') return 'status status-reject'
        if (status === 'Diproses') return 'status status-acc'
      }
      if (status === 'Diajukan') return 'Perlu Persetujuan'
      if (status === 'Diproses') return 'Disetujui'
      return status
    },
    confirmReject(id) {
      this.$bvModal.hide('modal-detail')
      this.$swal({
        title: 'Tolak pengajuan Pengeluaran barang',
        text: 'Anda yakin menolak pengajuan?',
        icon: 'warning',
        width: '50%',
        iconHtml: '<img src="https://storage.googleapis.com/komerce/core/icon-popup-warning.png">',
        showCancelButton: true,
        cancelButtonText: 'Batal',
        confirmButtonText: 'Tolak',
        reverseButtons: true,
        customClass: {
          icon: 'border-0 w-50 my-5',
          confirmButton: 'btn btn-primary px-4',
          cancelButton: 'btn btn-outline-primary mr-1 px-5',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.reject(id)
        } else {
          this.$bvModal.show('modal-detail')
        }
      })
    },
    handleChat(number) {
      window.open(`https://wa.me/62${number.substring(1)}`, '_blank')
    },
    async reject(id) {
      await this.$http_komship.put(`/v1/komship/outbound/${id}/reject`)
        .then(() => {
          this.$emit('callParentMethod')
          this.$bvModal.hide('modal-detail')
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Success',
                icon: 'AlertCircleIcon',
                text: 'Sukses tolak pengajuan',
                variant: 'success',
              },
            },
            2000,
          )
        }).catch(() => {
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Gagal',
                icon: 'AlertCircleIcon',
                text: 'Gagal tolak pengajuan, silahkan coba lagi',
                variant: 'danger',
              },
            },
            2000,
          )
        })
    },
    confirm(id) {
      this.$bvModal.hide('modal-detail')
      this.$swal({
        title: 'Pengajuan Pengeluaran barang',
        text: 'Anda yakin menyutujui pengajuan? stok barang akan berkurang ketika disetujui',
        icon: 'warning',
        width: '50%',
        iconHtml: '<img src="https://storage.googleapis.com/komerce/core/icon-popup-warning.png">',
        showCancelButton: true,
        cancelButtonText: 'Batal',
        confirmButtonText: 'Setujui',
        reverseButtons: true,
        customClass: {
          icon: 'border-0 w-50 my-5',
          confirmButton: 'btn btn-primary px-4',
          cancelButton: 'btn btn-outline-primary mr-1 px-5',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.approve(id)
        } else {
          this.$bvModal.show('modal-detail')
        }
      })
    },
    async approve(id) {
      await this.$http_komship.put(`/v1/komship/outbound/${id}/approve`)
        .then(() => {
          this.$emit('callParentMethod')
          this.$bvModal.hide('modal-detail')
          this.$swal({
            title: 'Pengajuan barang berhasil disetujui',
            text: 'Cek stok terupdate di data produk kamu',
            icon: 'success',
            width: '50%',
            iconHtml: '<img src="https://storage.googleapis.com/komerce/core/icon-popup-success.png">',
            confirmButtonText: 'Oke',
            customClass: {
              icon: 'border-0 w-50 my-5',
              confirmButton: 'btn btn-primary px-4',
              cancelButton: 'btn btn-outline-primary mr-1 px-5',
            },
            buttonsStyling: false,
          }).then(result => {
            if (result.value) {
              this.$router.push({
                path: `/penarikan-barang/${this.$route.params.id}`,
              })
            } else {
              this.$router.push({
                path: `/penarikan-barang/${this.$route.params.id}`,
              })
            }
          })
        }).catch(() => {
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Gagal',
                icon: 'AlertCircleIcon',
                text: 'Gagal tolak pengajuan, silahkan coba lagi',
                variant: 'danger',
              },
            },
            2000,
          )
        })
    },
    closeModal() {
      this.$bvModal.hide('modal-detail')
    },
  },
}
</script>

<style lang="scss" scoped>
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
