<template>
  <b-card-actions
    ref="formCard"
    title="Detail Customer"
    no-actions
    no-body
  >
    <b-row class="d-flex align-items-center justify-content-between mt-2">
      <b-col>
        <h5 class="ml-2">
          <strong>Informasi Customer</strong>
        </h5>
      </b-col>
      <b-col class="d-flex justify-content-end">
        <b-button
          class="mr-2"
          variant="success"
          size="sm"
        >
          <b-img
            src="@core/assets/image/icon-wa.png"
            class="mr-50"
          />
          <span class="align-middle">Hubungi Customer</span>
        </b-button>
      </b-col>
    </b-row>

    <b-row class="mt-2 border ml-2 mr-2 pt-1 pb-1">
      <b-col
        md="7"
        class="d-flex align-items-center"
      >
        <b-avatar
          class="ml-2 mr-50"
        />
        <div>
          <h5><strong>Candra Dajal</strong></h5>
          <span>(+66)666-666</span>
        </div>
      </b-col>
      <b-col md="5">
        <span>Jl. Raya Tamansari, Kompleks Karangwuni, Desa, Dusun I, Tamansari, Karangmoncol, Kabupaten Purbalingga, Jawa Tengah 53355</span>
      </b-col>
    </b-row>

    <b-col
      cols="12"
      class="mt-3"
    >
      <h5 class="ml-50">
        <strong>Laporan</strong>
      </h5>
    </b-col>

    <b-row class="border ml-2 mr-2 pt-1 pb-1">
      <b-col
        md="7"
      >
        <b-row>
          <b-col md="auto">
            <div class="mt-1">
              <strong>Terakhir Order</strong>
            </div>
            <div class="mt-1">
              <strong>Total Order</strong>
            </div>
            <div class="mt-1">
              <strong>Total Pcs</strong>
            </div>
          </b-col>
          <b-col>
            <div class="mt-1">
              9 Jam yang lalu
            </div>
            <div class="mt-1">
              9
            </div>
            <div class="mt-1">
              9
            </div>
          </b-col>
        </b-row>
      </b-col>
      <b-col md="5">
        <b-row>
          <b-col md="auto">
            <div class="mt-1">
              <strong>Produk Favorit</strong>
            </div>
            <div class="mt-1">
              <strong>Uang Dihabiskan</strong>
            </div>
            <div class="mt-1">
              <strong>Rata - rata Belanja</strong>
            </div>
          </b-col>
          <b-col>
            <div class="mt-1">
              RTX 3090TI
            </div>
            <div class="mt-1">
              Rp. 150.000.000
            </div>
            <div class="mt-1">
              Rp. 50.000.000
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <b-col
      cols="12"
      class="mt-3"
    >
      <h5 class="ml-50">
        <strong>Riwayat Order</strong>
      </h5>
    </b-col>

    <b-row>
      <b-table
        :fields="fields"
        :items="items"
      >

        <template #cell(rincian)>
          <b-button
            size="sm"
            variant="flat-info"
            tag="router-link"
            :to="{ name: $route.meta.routeDetailOrder }"
          >
            Lihat Detail
          </b-button>
        </template>

      </b-table>
    </b-row>

  </b-card-actions>
</template>

<script>
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'
import {
  BRow,
  BButton,
  BCol,
  BImg,
  BAvatar,
  BTable,
} from 'bootstrap-vue'

export default {
  components: {
    BCardActions,
    BRow,
    BButton,
    BCol,
    BImg,
    BAvatar,
    BTable,
  },
  data() {
    return {
      fields: [
        {
          key: 'date_order', label: 'Tanggal Order',
        },
        {
          key: 'pelanggan', label: 'Pelanggan',
        },
        {
          key: 'produk', label: 'Produk',
        },
        {
          key: 'total_pembayaran', label: 'Total Pembayaran',
        },
        {
          key: 'status', label: 'Status',
        },
        {
          key: 'rincian', label: 'Rincian',
        },
      ],

      items: [
        {
          date_order: '01 Januari 2000',
          pelanggan: 'Candra',
          produk: 'Bantal',
          total_pembayaran: 'Rp. 1000',
          status: 'Dikirim',
        },
        {
          date_order: '01 Januari 2000',
          pelanggan: 'Candra',
          produk: 'Kasur',
          total_pembayaran: 'Rp. 2000',
          status: 'Diterima',
        },
        {
          date_order: '01 Januari 2000',
          pelanggan: 'Candra',
          produk: 'Poster',
          total_pembayaran: 'Rp. 3000',
          status: 'Diterima',
        },
        {
          date_order: '01 Januari 2000',
          pelanggan: 'Candra',
          produk: 'Pacul',
          total_pembayaran: 'Rp. 4000',
          status: 'Dikirim',
        },
        {
          date_order: '01 Januari 2000',
          pelanggan: 'Candra',
          produk: 'Pintu',
          total_pembayaran: 'Rp. 5000',
          status: 'Dikirim',
        },
        {
          date_order: '01 Januari 2000',
          pelanggan: 'Candra',
          produk: 'Kulkas',
          total_pembayaran: 'Rp. 6000',
          status: 'Dikirim',
        },
      ],
    }
  },
}
</script>

<style>

</style>
