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

      <b-row class="mt-3">
        <b-col>
          <h3 class="mb-50 mb-md-0">
            Rangking Kota Customer
          </h3>
        </b-col>
        <b-col cols="auto">
          <b-form-select
            v-model="rangkingCity"
            :options="rangkingCityOptions"
            class="mb-50 mb-md-0"
            @change="changeData"
          />
        </b-col>
      </b-row>

      <b-row class="d-flex align-items-center">
        <b-col
          md="4"
        >
          <b-list-group
            v-for="(items, index) in city"
            :key="index+1"
            class="ml-2"
          >
            <b-list-group-item class="border-0 p-1">
              {{ items.city_name }}
            </b-list-group-item>
          </b-list-group>
        </b-col>

        <b-col
          md="8"
          class="mt-50"
        >
          <div id="chart">
            <vue-apex-charts
              type="bar"
              height="150"
              :options="chartOptions"
              :series="series"
            />
          </div>
        </b-col>
      </b-row>

    </b-card>
  </b-overlay>
</template>

<script>
import {
  BCol,
  BRow,
  BListGroup,
  BListGroupItem,
  BFormSelect,
  BCard,
  BOverlay,
} from 'bootstrap-vue'
import useJwt from '@/auth/jwt/useJwt'
import VueApexCharts from 'vue-apexcharts'

export default {
  components: {
    BCol,
    BRow,
    BListGroup,
    BListGroupItem,
    VueApexCharts,
    BFormSelect,
    BCard,
    BOverlay,
  },
  data() {
    return {
      loading: false,

      rangkingCity: 0,
      rangkingCityOptions: [
        { text: 'Bulan ini', value: 0 },
        { text: 'Life Time', value: 1 },
      ],
      selected: 1,

      city: [],

      series: [{
        data: [],
      }],
      chartOptions: {
        colors: '#34A770',
        chart: {
          type: 'bar',
          height: 150,
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: 'top',
            },
          },
        },
        dataLabels: {
          enabled: true,
          offsetX: -6,
          style: {
            fontSize: '12px',
            colors: ['#fff'],
          },
        },
        stroke: {
          show: true,
          width: 1,
          colors: ['#fff'],
        },
        tooltip: {
          shared: true,
          intersect: false,
        },
        xaxis: {
          categories: [],
        },
      },
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    changeData() {
      this.loading = true
      const params = {
        is_liftime: this.rangkingCity,
      }
      this.$httpKomship.get('/v1/customers/ranking-customers', {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }, params).then(response => {
        this.chartOptions.xaxis.categories.splice(0, this.chartOptions.xaxis.categories.length)
        const { data } = response.data
        this.city = data.city
        this.loading = false
        data.city.forEach(this.myArray)
        this.series = [
          {
            data: this.getPercentage(data.city),
          },
        ]
        return this.city
      })
    },
    getData() {
      this.loading = true
      this.$httpKomship.get('/v1/customers/ranking-customers', {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(response => {
        const { data } = response.data
        this.city = data.city
        this.loading = false
        data.city.forEach(this.myArray)
        this.series = [
          {
            data: this.getPercentage(data.city),
          },
        ]
        return this.city
      })
    },
    getPercentage(value) {
      const result = value.map(item => (item.percentage))
      return result
    },
    myArray(data) {
      this.chartOptions.xaxis.categories.push(data.total_city)
    },
  },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-flatpicker.scss';
@import '~@core/scss/vue/libs/vue-flatpicker.scss';
</style>
