<template>
  <BCard body>
    <h4 class="font-bold text-black d-inline-flex mb-0">
      Penarikan Barang
    </h4>
    <div class="d-flex justify-content-end">
      <div class="d-flex gap-4">
        <b-button
          variant="outline-primary"
          class="d-flex"
          style="padding: 8px"
        >
          <img
            src="https://storage.googleapis.com/komerce/assets/komerce-icon/Orange/add.svg"
            alt="add"
          >
          <span class="align-self-center">Ajukan Penarikan Barang</span>
        </b-button>
        <b-button
          variant="primary"
          style="padding: 8px"
        >
          <img
            src="https://storage.googleapis.com/komerce/assets/komerce-icon/Putih/candle-2.svg"
            alt="filter"
          >
        </b-button>
      </div>
    </div>
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
