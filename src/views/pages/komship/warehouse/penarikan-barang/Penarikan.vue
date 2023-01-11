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
    <b-tabs>
      <b-tab
        title="Barang Dikeluarkan"
        lazy
      >
        <BarangDikeluarkan />
      </b-tab>
      <b-tab
        lazy
      >
        <template slot="title">
          <div class="d-flex gap-2">
            Menunggu Respon
            <b-badge
              pill
              variant="primary"
            >
              {{ waitingRes }}
            </b-badge>
          </div>
        </template>
        <MenungguRespon />
      </b-tab>
    </b-tabs>
  </BCard>
</template>

<script>
import {
  BTabs, BTab, BCard,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
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
  data() {
    return {
      waitingRes: 5,
    }
  },
}
</script>
