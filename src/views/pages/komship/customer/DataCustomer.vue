<template>
  <b-overlay
    variant="light"
    :show="loading"
    spinner-variant="primary"
    blur="0"
    opacity=".5"
    rounded="sm"
  >
    <b-card>
      <div v-if="data_province !== null">
        <province-bar :data="data_province" />
      </div>
      <div v-if="data_city !== null">
        <city-bar :data="data_city" />
      </div>
      <div v-if="data_province === null">
        <province-bar />
      </div>
    </b-card>
  </b-overlay>
</template>

<script>
import {
  BCard,
  BOverlay,
} from 'bootstrap-vue'
import useJwt from '@/auth/jwt/useJwt'
import ProvinceBar from './ProvinceData.vue'
import CityBar from './CityData.vue'

export default {
  components: {
    BCard,
    BOverlay,
    ProvinceBar,
    CityBar,
  },
  data() {
    return {
      loading: false,
      rangkingCity: 1,
      data_city: null,
      data_province: null,
      series: [{
        data: [],
      }],
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      this.$http_komship.get('/v1/customers/ranking-customers', {
        params: {
          is_lifetime: this.rangkingCity,
        },
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(response => {
        this.loading = false
        this.data_city = response.data.data
        this.data_province = response.data.data
      }).catch(() => {
        this.loading = false
        this.series = [
          {
            data: [],
          },
        ]
      })
    },
  },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-flatpicker.scss';
@import '~@core/scss/vue/libs/vue-flatpicker.scss';
</style>
