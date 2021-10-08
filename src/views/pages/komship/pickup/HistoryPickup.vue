<template>
  <b-card
    class="history-pickup-main-wrapper"
  >
    <div
      v-if="this.currentView === 'all'"
      class="history-pickup-title mb-4"
    >
      Riwayat Pickup
    </div>
    <div
      v-else
      class="history-pickup-title top-right"
    >
      Riwayat Pengajuan Pickup
    </div>

    <history-pickup-table
      v-if="this.currentView === 'all'"
      ref="allPickupTable1"
      :items="dummyItems"
      :fields="fields"
      table-ref-name="allPickupTable1"
      @onDetailsClicked="handleDetailsButtonClicked"
    />

    <history-pickup-details
      v-else
      :items="detailsItem"
      @onBackButtonClicked="() => handleDetailsButtonClicked('all', {})"
    />

  </b-card>
</template>

<script>
import {
  BCard,
} from 'bootstrap-vue'
import HistoryPickupTable from './HistoryPickupTable.vue'
import HistoryPickupDetails from './HistoryPickupDetails.vue'

export default {
  components: {
    BCard,
    HistoryPickupTable,
    HistoryPickupDetails,
  },
  data() {
    return {
      currentView: 'all',
      detailsItem: {},
      fields: [
        { key: 'order_date', label: 'Waktu Pengajuan' },
        { key: 'pickup_date', label: 'Waktu Penjemputan' },
        { key: 'ekspedisi', label: 'Ekspedisi' },
        { key: 'vehicle', label: 'Kendaraan' },
        { key: 'product_amount', label: 'Produk' },
        { key: 'order_amount', label: 'Orderan' },
        { key: 'button', label: 'Rincian' },
      ],
      dummyItems: [
        {
          order_id: 1,
          customer_name: 'Putri Marani',
          status: 'Diterima',
          order_date: '22 Agustus 2021 16:30',
          pickup_date: '24 Agustus 2021 14:59',
          ekspedisi: 'JNE',
          vehicle: 'Motor',
          product_amount: 4,
          order_amount: 1,
          order_no: 'RT1219868',
          district: 'Purbalingga',
          detail_address: 'Jl. Raya Tamansari, Kompleks Karangwuni, Desa, Dusun I, Tamansari, Karangmoncol, Kabupaten Purbalingga, Jawa Tengah 53355',
          shipping_cost: 20000,
          grand_total: 980000,
          payment_methode: 'COD',
          is_komship: 1,
          bank: null,
          airway_bill: 120109299303930,
          product: [
            {
              product_id: 1,
              product_name: 'Jilbab Pasmia 1-SKU 332',
              product_image: 'images/product/product-980312037.jpg',
              product_variant: 'M - Merah',
              weight: 1000,
              price: 380000,
              qty: 1,
            },
            {
              product_id: 2,
              product_name: 'Jilbab Pasmia 1-SKU 331',
              product_image: 'images/product/product-980312037.jpg',
              product_variant: 'M - Merah',
              weight: 1000,
              price: 200000,
              qty: 1,
            },
            {
              product_id: 3,
              product_name: 'Jilbab Pasmia 1-SKU 330',
              product_image: 'images/product/product-980312037.jpg',
              product_variant: 'M - Merah',
              price: 200000,
              qty: 1,
            },
            {
              product_id: 4,
              product_name: 'Jilbab Pasmia 1-SKU 339',
              product_image: 'images/product/product-980312037.jpg',
              product_variant: 'M - Merah',
              weight: 1000,
              price: 200000,
              qty: 1,
            },
          ],
        },
        {
          order_id: 2,
          customer_name: 'Putri Marani',
          status: 'Diterima',
          order_date: '22 Agustus 2021 16:30',
          pickup_date: '24 Agustus 2021 14:59',
          ekspedisi: 'JnT',
          vehicle: 'Truk',
          product_amount: 7,
          order_amount: 1,
          order_no: 'RT1219868',
          district: 'Purbalingga',
          detail_address: 'Jl. Raya Tamansari, Kompleks Karangwuni, Desa, Dusun I, Tamansari, Karangmoncol, Kabupaten Purbalingga, Jawa Tengah 53355',
          shipping_cost: 20000,
          is_komship: 0,
          grand_total: 980000,
          payment_methode: 'Non COD',
          airway_bill: null,
          bank: {
            bank_name: 'BCA',
            account_no: 33129898,
            account_name: 'Hj. Mabur',
          },
          product: [
            {
              product_id: 1,
              product_name: 'Jilbab Pasmia 1-SKU 332',
              product_image: 'images/product/product-980312037.jpg',
              product_variant: '-',
              weight: 1000,
              price: 100000,
              qty: 5,
            },
            {
              product_id: 2,
              product_name: 'Jilbab Pasmia 1-SKU 331',
              product_image: 'images/product/product-980312037.jpg',
              product_variant: '-',
              weight: 1000,
              price: 100000,
              qty: 1,
            },
            {
              product_id: 3,
              product_name: 'Jilbab Pasmia 1-SKU 330',
              product_image: 'images/product/product-980312037.jpg',
              product_variant: '-',
              weight: 1000,
              price: 140000,
              qty: 1,
            },
          ],
        },
      ],
    }
  },
  methods: {
    handleDetailsButtonClicked(view, itemDetails) {
      if (view) this.currentView = view
      if (itemDetails) this.detailsItem = itemDetails
    },
  },
}
</script>

<style lang="scss">
  @import 'history-pickup.scss';
</style>
