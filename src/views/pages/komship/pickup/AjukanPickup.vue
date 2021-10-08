<template>
  <b-card
    class="add-pickup-main-wrapper"
  >
    <add-pickup-input
      :class="currentView === 'input' ? '' : 'hide'"
      :data-order="dummyItems"
      @onSubmitInputForm="handleInputSubmitForm"
    />

    <add-pickup-details
      :class="currentView === 'details' ? '' : 'hide'"
      :list-selected="listSelected"
      @onBackButtonClicked="() => handleChangeCurrenView('input')"
    />

  </b-card>
</template>

<script>
import {
  BCard,
} from 'bootstrap-vue'
import AddPickupInput from './AddPickupInput.vue'
import AddPickupDetails from './AddPickupDetails.vue'

export default {
  components: {
    BCard,
    AddPickupInput,
    AddPickupDetails,
  },
  data() {
    return {
      currentView: 'input',
      listSelected: [],
      dummyItems: [
        {
          order_id: 1,
          customer_name: 'Putri Marani',
          status: 'Diterima',
          order_date: '22 Agustus 2021 16:30',
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
          order_date: '22 Agustus 2021. 16:30',
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
    handleInputSubmitForm(arrValue) {
      if (arrValue) {
        this.listSelected = arrValue
        this.handleChangeCurrenView('details')
      }
    },
    handleChangeCurrenView(values) {
      if (values) this.currentView = values
    },
  },
}
</script>

<style lang="scss">
  @import '~@core/scss/vue/libs/vue-select.scss';
  @import 'add-pickup.scss';
</style>
