<template>
  <b-card body>
    <div class="d-flex align-items-center">
      <br>
      <h4 class="mb-1 font-bold text-black">
        Riwayat Pengajuan
      </h4>
    </div>
    <b-tabs fill>
      <b-tab
        title="Riwayat Inbound"
        lazy
      >
        <RiwayatInbound />
      </b-tab>
      <b-tab
        title="Riwayat Tambah Produk"
        lazy
      >
        <RiwayatTambahProduct />
      </b-tab>
      <b-tab
        title="Riwayat Berlangganan"
        lazy
      >
        <RiwayatBerlangganan />
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import {
  BTabs, BTab, BCard,
} from 'bootstrap-vue'
import RiwayatInbound from './RiwayatInbound.vue'
import RiwayatTambahProduct from './RiwayatTambahProduct.vue'
import RiwayatBerlangganan from './RiwayatBerlangganan.vue'

export default {
  name: 'DataInbound',

  components: {
    BTabs,
    BTab,
    BCard,
    RiwayatInbound,
    RiwayatTambahProduct,
    RiwayatBerlangganan,
  },
  data() {
    return {
    }
  },
}
</script>

<style></style>
