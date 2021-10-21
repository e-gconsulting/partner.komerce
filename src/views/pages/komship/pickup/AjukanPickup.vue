<template>
  <b-card
    class="add-pickup-main-wrapper"
  >
    <add-pickup-input
      :class="currentView === 'input' ? '' : 'hide'"
      :profile="profile"
      :data-order="listOrder"
      @onSubmitInputForm="handleInputSubmitForm"
    />

    <add-pickup-details
      :class="currentView === 'details' ? '' : 'hide'"
      :list-selected="listSelected"
      :is-onboarding="isOnboarding"
      @onBoardingShow="handlePublishButton"
      @onBackButtonClicked="() => handleChangeCurrenView('input')"
    />

    <onboarding
      ref="onboardingElement"
      :current-stage="6"
    />

  </b-card>
</template>

<script>
import {
  BCard,
} from 'bootstrap-vue'
import AddPickupInput from './AddPickupInput.vue'
import AddPickupDetails from './AddPickupDetails.vue'
import Onboarding from '../onboarding/Onboarding.vue'

export default {
  components: {
    BCard,
    AddPickupInput,
    AddPickupDetails,
    Onboarding,
  },
  data() {
    return {
      // isOnboarding: true,
      isOnboarding: false,
      currentView: 'input',
      profile: {},
      listOrder: [],
      listSelected: [],
      // dummyItems: [
      //   {
      //     order_id: 1,
      //     customer_name: 'Putri Marani',
      //     status: 'Diterima',
      //     order_date: '22 Agustus 2021 16:30',
      //     order_no: 'RT1219868',
      //     district: 'Purbalingga',
      //     detail_address: 'Jl. Raya Tamansari, Kompleks Karangwuni, Desa, Dusun I, Tamansari, Karangmoncol, Kabupaten Purbalingga, Jawa Tengah 53355',
      //     shipping_cost: 20000,
      //     grand_total: 980000,
      //     payment_method: 'COD',
      //     is_komship: 1,
      //     bank: null,
      //     airway_bill: 120109299303930,
      //     product: [
      //       {
      //         product_id: 1,
      //         product_name: 'Jilbab Pasmia 1-SKU 332',
      //         product_image: 'images/product/product-980312037.jpg',
      //         variant_name: 'M - Merah',
      //         weight: 1000,
      //         price: 380000,
      //         qty: 1,
      //       },
      //       {
      //         product_id: 2,
      //         product_name: 'Jilbab Pasmia 1-SKU 331',
      //         product_image: 'images/product/product-980312037.jpg',
      //         variant_name: 'M - Merah',
      //         weight: 1000,
      //         price: 200000,
      //         qty: 1,
      //       },
      //       {
      //         product_id: 3,
      //         product_name: 'Jilbab Pasmia 1-SKU 330',
      //         product_image: 'images/product/product-980312037.jpg',
      //         variant_name: 'M - Merah',
      //         price: 200000,
      //         qty: 1,
      //       },
      //       {
      //         product_id: 4,
      //         product_name: 'Jilbab Pasmia 1-SKU 339',
      //         product_image: 'images/product/product-980312037.jpg',
      //         variant_name: 'M - Merah',
      //         weight: 1000,
      //         price: 200000,
      //         qty: 1,
      //       },
      //     ],
      //   },
      //   {
      //     order_id: 2,
      //     customer_name: 'Putri Marani',
      //     status: 'Diterima',
      //     order_date: '22 Agustus 2021. 16:30',
      //     order_no: 'RT1219868',
      //     district: 'Purbalingga',
      //     detail_address: 'Jl. Raya Tamansari, Kompleks Karangwuni, Desa, Dusun I, Tamansari, Karangmoncol, Kabupaten Purbalingga, Jawa Tengah 53355',
      //     shipping_cost: 20000,
      //     is_komship: 0,
      //     grand_total: 980000,
      //     payment_method: 'BANK TRANSFER',
      //     airway_bill: null,
      //     bank: {
      //       bank_name: 'BCA',
      //       account_no: 33129898,
      //       account_name: 'Hj. Mabur',
      //     },
      //     product: [
      //       {
      //         product_id: 1,
      //         product_name: 'Jilbab Pasmia 1-SKU 332',
      //         product_image: 'images/product/product-980312037.jpg',
      //         variant_name: '-',
      //         weight: 1000,
      //         price: 100000,
      //         qty: 5,
      //       },
      //       {
      //         product_id: 2,
      //         product_name: 'Jilbab Pasmia 1-SKU 331',
      //         product_image: 'images/product/product-980312037.jpg',
      //         variant_name: '-',
      //         weight: 1000,
      //         price: 100000,
      //         qty: 1,
      //       },
      //       {
      //         product_id: 3,
      //         product_name: 'Jilbab Pasmia 1-SKU 330',
      //         product_image: 'images/product/product-980312037.jpg',
      //         variant_name: '-',
      //         weight: 1000,
      //         price: 140000,
      //         qty: 1,
      //       },
      //     ],
      //   },
      // ],
    }
  },
  mounted() {
    this.reload()
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
    handlePublishButton() {
      if (this.isOnboarding) this.$refs.onboardingElement.showModal()
    },
    async reload() {
      this.loading = true
      await this.getProfile()
      await this.getListOrderByPartner()
      this.loading = false
    },
    getProfile() {
      return this.$http_komship.post('v1/my-profile').then(response => {
        const { data } = response.data
        console.log('this.profile', data)
        this.profile = data
      }).catch(() => {
        console.log('fail to get profile')
      })
    },
    getListOrderByPartner() {
      const partnerId = this.profile.partner_id
      return this.$http_komship.get(`v1/order/${partnerId}`, {
        params: {
          is_komship: this.profile.is_komship,
          order_status: 0,
        },
      }).then(response => {
        const { data } = response.data.data
        console.log('this list order', data)
        this.listOrder = data
      }).catch(() => {
        console.log('fail to get product')
      })
    },
  },
}
</script>

<style lang="scss">
  @import '~@core/scss/vue/libs/vue-select.scss';
  @import 'add-pickup.scss';
</style>
