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
      @onUpdateDate="updateDateText"
      @onUpdateScreenView="updateScreenView"
      @onUpdateSelectedItems="updateSelectedItems"
    />

    <add-order-detail
      v-if="screens === 'details'"
      :date-text="dateText"
      :screens="screens"
      :list-selected="listSelected"
      :is-onboarding="isOnboarding"
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
      isOnboarding: true,
      dateText: '',
      profile: {},
      test2: {},
      listSelected: [],
      screens: 'input',
      listProduct: [
        {
          product_id: 1,
          product_name: 'Jilbab',
          product_image: 'www.example.com/img/products/product-980312037.jpg',
          is_variant: 1,
          variant: [
            {
              variant_id: 1,
              variant_name: 'Warna',
              variant_option: [
                {
                  option_id: 1,
                  option_name: 'Biru',
                  option_parent: null,
                },
                {
                  option_id: 2,
                  option_name: 'Merah',
                  option_parent: null,
                },
              ],
            },
            {
              variant_id: 1,
              variant_name: 'Ukuran',
              variant_option: [
                {
                  option_id: 3,
                  option_name: 'S',
                  option_parent: 1,
                },
                {
                  option_id: 4,
                  option_name: 'M',
                  option_parent: 1,
                },
                {
                  option_id: 5,
                  option_name: 'S',
                  option_parent: 2,
                },
                {
                  option_id: 6,
                  option_name: 'M',
                  option_parent: 2,
                },
              ],
            },
          ],
          product_variant: [
            {
              option_id: 3,
              name: 'Merah',
              price: 20,
              stock: 100,
              option_parent: 1,
            },
            {
              option_id: 4,
              name: 'Biru',
              price: 20,
              stock: 100,
              option_parent: 2,
            },
            {
              option_id: 5,
              name: 'Merah',
              price: 20,
              stock: 100,
              option_parent: 1,
            },
            {
              option_id: 6,
              name: 'Biru',
              price: 20,
              stock: 100,
              option_parent: 2,
            },
          ],
          price: 0,
          stock: 0,
        },
        {
          product_id: 2,
          product_name: 'Jilbab Keche',
          product_image: 'www.example.com/img/products/product-980312031.jpg',
          is_variant: 0,
          variant: [],
          price: 20000,
          stock: 100,
        },
      ],
    }
  },
  mounted() {
    // const tokens1 = useJwt.getToken()
    // console.log('tokeneoekke', tokens1)
    // axios2.post('https://komshipdev.komerce.id/api/v1/my-profile',
    //   {
    //     headers: { Authorization: `Bearer ${useJwt.getToken()}` },
    //   }).then(response => {
    //   const { data } = response
    //   console.log('berhasil data', data)
    //   this.profile = data
    // }).catch(() => {
    //   console.log('gagal')
    // })

    this.profile = this.getProfile()
    // this.reload()
  },
  methods: {
    // async reload() {
    // this.test2 = await this.getOrder()
    // await this.getProfile()
    // this.loading = true
    // this.currentPage = 1
    //
    // if (!this.partnerProfileIncomplete) {
    //   this.wishlistItems = await this.loadWishlistItems()
    // }
    //
    // this.items = await this.loadItems()
    // this.loading = false
    // },
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
    getProfile() {
      // { Authorization: `Bearer ${useJwt.getToken()}` }
      return this.$http.get('/v1/my-profile')
        .then(async response => {
          const { data } = response
          console.log('berhasil data', data)
          this.profile = data
        }).catch(() => {
          console.log('gagal')
        })
    },
    // getOrder() {
    //   console.log('this.profile', this.profile)
    //   const partnerId = this.$store.state.auth.userData.id
    //   axios2.get(`https://komshipdev.komerce.id/api/v1/order/${partnerId}`, {},
    //     { Authorization: `Bearer ${useJwt.getToken()}` })
    //     .then(response => response.json())
    //     .then(async response => {
    //       const { data } = response.data
    //       console.log('berhasil data2', data)
    //       // this.provinceItems = data
    //     }).catch(() => {
    //       console.log('gagal2')
    //     })
    // },
  },
}
</script>

<style lang="scss">
  @import '~@core/scss/vue/libs/vue-select.scss';
  @import 'add-order.scss';
</style>
