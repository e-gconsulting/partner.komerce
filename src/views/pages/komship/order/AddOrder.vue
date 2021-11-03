<template>
  <b-card
    class="add-order-main-wrapper"
  >
    <add-order-input
      v-if="screens === 'input'"
      :date-text="dateText"
      :screens="screens"
      :list-product="listProduct"
      :list-selected="listSelected"
      :profile="profile"
      :disable-submit-button-status="disableSubmitButtonStatus"
      @onUpdateDate="updateDateText"
      @onUpdateScreenView="updateScreenView"
      @onUpdateSelectedItems="updateSelectedItems"
      @onUpdateSubmitButtonStatus="handleUpdateSubmitButtonStatus"
    />

    <add-order-detail
      v-if="screens === 'details'"
      :date-text="dateText"
      :screens="screens"
      :list-selected="listSelected"
      :is-onboarding="isOnboarding"
      :profile="profile"
      @onBoardingShow="handlePublishButton"
      @onUpdateDate="updateDateText"
      @onUpdateScreenView="updateScreenView"
    />

    <onboarding
      ref="onboardingElement"
      :current-stage="4"
    />
  </b-card>
</template>

<script>
import {
  BCard,
} from 'bootstrap-vue'
// import useJwt from '@/auth/jwt/useJwt'
// import axios2 from '../setting-kompship/baseUrl'
import AddOrderInput from './AddOrderInput.vue'
import AddOrderDetail from './AddOrderDetail.vue'
import Onboarding from '../onboarding/Onboarding.vue'

export default {
  components: {
    BCard,
    AddOrderInput,
    AddOrderDetail,
    Onboarding,
  },
  data() {
    return {
      // isOnboarding: true,
      isOnboarding: false,
      dateText: '',
      profile: {},
      test2: {},
      listSelected: [],
      screens: 'input',
      loading: false,
      disableSubmitButtonStatus: true,
      listProduct: [
        // {
        //   product_id: 1,
        //   product_name: 'Jilbab',
        //   product_image: 'www.example.com/img/products/product-980312037.jpg',
        //   is_variant: 1,
        //   variant: [
        //     {
        //       variant_id: 1,
        //       variant_name: 'Warna',
        //       variant_option: [
        //         {
        //           option_id: 1,
        //           option_name: 'Biru',
        //           option_parent: null,
        //         },
        //         {
        //           option_id: 2,
        //           option_name: 'Merah',
        //           option_parent: null,
        //         },
        //       ],
        //     },
        //     {
        //       variant_id: 1,
        //       variant_name: 'Ukuran',
        //       variant_option: [
        //         {
        //           option_id: 3,
        //           option_name: 'S',
        //           option_parent: 1,
        //         },
        //         {
        //           option_id: 4,
        //           option_name: 'M',
        //           option_parent: 1,
        //         },
        //         {
        //           option_id: 5,
        //           option_name: 'S',
        //           option_parent: 2,
        //         },
        //         {
        //           option_id: 6,
        //           option_name: 'M',
        //           option_parent: 2,
        //         },
        //       ],
        //     },
        //   ],
        //   product_variant: [
        //     {
        //       option_id: 3,
        //       name: 'Merah',
        //       price: 20,
        //       stock: 100,
        //       option_parent: 1,
        //     },
        //     {
        //       option_id: 4,
        //       name: 'Biru',
        //       price: 20,
        //       stock: 100,
        //       option_parent: 2,
        //     },
        //     {
        //       option_id: 5,
        //       name: 'Merah',
        //       price: 20,
        //       stock: 100,
        //       option_parent: 1,
        //     },
        //     {
        //       option_id: 6,
        //       name: 'Biru',
        //       price: 20,
        //       stock: 100,
        //       option_parent: 2,
        //     },
        //   ],
        //   price: 0,
        //   stock: 0,
        // },
        // {
        //   product_id: 2,
        //   product_name: 'Jilbab Keche',
        //   product_image: 'www.example.com/img/products/product-980312031.jpg',
        //   is_variant: 0,
        //   variant: [],
        //   price: 20000,
        //   stock: 100,
        // },
      ],
    }
  },
  mounted() {
    this.reload()
  },
  methods: {
    async reload() {
      this.loading = true
      await this.getProfile()
      await this.getListProductByPartner()
      this.loading = false
    },
    updateDateText(dateVal) {
      if (dateVal) this.dateText = dateVal
    },
    updateSelectedItems(newListSelected) {
      if (newListSelected) this.listSelected = newListSelected
    },
    updateScreenView(value) {
      if (value) this.screens = value
    },
    handlePublishButton() {
      if (this.isOnboarding) this.$refs.onboardingElement.showModal()
    },
    handleUpdateSubmitButtonStatus(value) {
      this.disableSubmitButtonStatus = value
    },
    getProfile() {
      return this.$http_komship.post('v1/my-profile').then(response => {
        const { data } = response.data
        // console.log('this.profile', data)
        this.profile = data
      }).catch(() => {
        console.log('failed to get the profile data')
      })
    },
    getListProductByPartner() {
      const partnerId = this.profile.partner_id
      return this.$http_komship.get(`v1/partner-product/${partnerId}`).then(response => {
        const { data } = response.data
        // console.log('this.product', data)
        this.listProduct = data
      }).catch(() => {
        console.log('failed to get the product data by partner')
      })
    },
  },
}
</script>

<style lang="scss">
  @import '~@core/scss/vue/libs/vue-select.scss';
  @import 'add-order.scss';
</style>
