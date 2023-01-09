<template>
  <BCard body>
    <h3 class="my-2 text-black">
      Pengeluaran Barang
    </h3>
    <b-row class="justify-content-end">
      <div class="d-flex">
        <b-button
          variant="outline-primary"
          class="d-flex"
        >
          <img
            src="https://storage.googleapis.com/komerce/assets/komerce-icon/Orange/add.svg"
            alt="add"
          >
          <span class="align-self-center">Ajukan Penarikan Barang</span>
        </b-button>
        <b-button
          variant="primary"
          class="mx-2"
        >
          <img
            src="https://storage.googleapis.com/komerce/assets/komerce-icon/Putih/candle-2.svg"
            alt="filter"
          >
        </b-button>
      </div>
    </b-row>
    <b-tabs
      card
    >
      <b-tab
        class="text-black"
        title="Data Barang Dikeluarkan"
        lazy
      >
        <barang-dikeluarkan />
      </b-tab>
      <b-tab
        title="Menunggu Respons"
        lazy
      >
        <menunggu-respon />
      </b-tab>
    </b-tabs>
  </BCard>
</template>

<script>
import {
  BTabs, BTab, BCard,
} from 'bootstrap-vue'
import BarangDikeluarkan from './DataBarangDikeluarkan.vue'
import MenungguRespon from './MenungguRespon.vue'

export default {
  components: {
    BTabs,
    BTab,
    BarangDikeluarkan,
    MenungguRespon,
    BCard,
  },
}
</script>
