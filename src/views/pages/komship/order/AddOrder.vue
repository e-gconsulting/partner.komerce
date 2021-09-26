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
      @onUpdateDate="updateDateText"
      @onUpdateScreenView="updateScreenView"
    />
  </b-card>
</template>

<script>
import {
  BCard,
} from 'bootstrap-vue'
import AddOrderInput from './AddOrderInput.vue'
import AddOrderDetail from './AddOrderDetail.vue'

export default {
  components: {
    BCard,
    AddOrderInput,
    AddOrderDetail,
  },
  data() {
    return {
      dateText: '',
      listSelected: [],
      screens: 'input',
      listProduct: [
        {
          product_id: 1,
          product_name: 'Jilbab Merah Maroon',
          product_image: '',
          is_variant: true,
          price: 23000,
          stock: 10,
          variant: [
            {
              variant_id: 1,
              variant_name: 'Warna',
              variant_option: [
                {
                  option_id: 1,
                  option_name: 'Merah',
                },
                {
                  option_id: 2,
                  option_name: 'Hijau',
                },
                {
                  option_id: 3,
                  option_name: 'Biru',
                },
                {
                  option_id: 4,
                  option_name: 'Coklat',
                },
              ],
            },
            {
              variant_id: 2,
              variant_name: 'Ukuran',
              variant_option: [
                {
                  option_id: 5,
                  option_name: 'S',
                },
                {
                  option_id: 6,
                  option_name: 'M',
                },
                {
                  option_id: 7,
                  option_name: 'L',
                },
                {
                  option_id: 8,
                  option_name: 'XL',
                },
              ],
            },
          ],

          product_variant: [
            {
              option_id: 3,
              name: 'Merah',
              price: 20,
              stock: 10,
              option_parent: 1,
            },
            {
              option_id: 4,
              name: 'Hijau',
              price: 40,
              stock: 10,
              option_parent: 2,
            },
            {
              option_id: 5,
              name: 'Biru',
              price: 60,
              stock: 10,
              option_parent: 3,
            },
            {
              option_id: 6,
              name: 'Coklat',
              price: 100,
              stock: 10,
              option_parent: 4,
            },
          ],
        },
        {
          product_id: 2,
          product_name: 'Jilbab Hijau Toska',
          product_image: '',
          is_variant: false,
          price: 23000,
          stock: 10,
          variant: [],
          product_variant: [],
        },
      ],
    }
  },
  async mounted() {
    this.getProfile()
    // this.loadWorkingSpaces()
    // this.loadDivisions()
    // this.loadBanks()
    // if (this.editMode) await this.loadForm()
  },
  methods: {
    updateDateText(dateVal) {
      if (dateVal) this.dateText = dateVal
    },
    updateSelectedItems(newListSelected) {
      if (newListSelected) this.listSelected = newListSelected
    },
    updateScreenView(value) {
      if (value) this.screens = value
    },
    getProfile() {
      return this.$http
        .get('/v1/my-profile', {
          // params: {
          //   sort: 'name',
          //   direction: 'asc',
          // },
        })
        .then(async response => {
          const { data } = response.data
          console.log('berhasil data', data)
          // this.provinceItems = data
        })
    },
  },
}
</script>

<style lang="scss">
  @import '~@core/scss/vue/libs/vue-select.scss';
  @import 'add-order.scss';
</style>
