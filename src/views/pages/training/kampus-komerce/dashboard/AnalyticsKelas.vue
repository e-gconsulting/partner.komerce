<template>
  <b-col cols="12">
    <b-card>
      <b-row>
        <b-col>
          <b-row>
            <b-card-header
              header-bg-variant="light-secondary"
              class="mr-1"
            >
              <b-form-row>
                <b-col cols="auto">
                  <b-avatar
                    size="lg"
                    rounded="sm"
                    variant="light-info"
                  >
                    <feather-icon
                      icon="UsersIcon"
                      size="20"
                    />
                  </b-avatar>
                </b-col>
                <b-col class="d-flex align-items-center pr-5">
                  <div>
                    <b-card-title class="mb-1">
                      <h5 class="text-dark">
                        Daftar Kelas
                      </h5>
                    </b-card-title>
                    <b-card-sub-title class="h4">
                      <span class="text-info">
                        {{ studentJoined }}
                      </span>
                    </b-card-sub-title>
                  </div>
                </b-col>
              </b-form-row>
            </b-card-header>

            <b-card-header header-bg-variant="light-secondary">
              <b-form-row>
                <b-col cols="auto">
                  <b-avatar
                    size="lg"
                    rounded="sm"
                    variant="light-warning"
                  >
                    <feather-icon
                      icon="UserCheckIcon"
                      size="20"
                    />
                  </b-avatar>
                </b-col>
                <b-col class="d-flex align-items-center">
                  <div>
                    <b-card-title class="mb-1">
                      <h5 class="text-dark">
                        Jumlah Student Lulus
                      </h5>
                    </b-card-title>
                    <b-card-sub-title class="h4">
                      <span class="text-warning">
                        {{ studentFinished }}
                      </span>
                    </b-card-sub-title>
                  </div>
                </b-col>
              </b-form-row>
            </b-card-header>
          </b-row>
        </b-col>

        <b-col
          cols="auto"
        >
          <b-form-select
            v-model="range"
            :options="rangeOptions"
            class="mb-50 mb-md-0"
          />
        </b-col>
        <b-col
          cols="12"
          md="auto"
        >
          <b-card
            class="mb-0"
            no-body
          >
            <flat-pickr
              v-if="isCustom"
              v-model="customDate"
              class="form-control"
              placeholder="Pilih tanggal"
              :config="{ mode: 'range', altInput: true, altFormat: 'j/n/Y', dateFormat: 'Y-m-d',}"
            />
          </b-card>
        </b-col>
      </b-row>

      <!-- Analytics -->
      <vue-apex-charts
        type="area"
        height="350"
        :options="chartOptions"
        :series="series"
      />
    </b-card>

    <b-card>
      <b-row
        class="d-flex align-items-center"
      >
        <h3 class="mt-50 mr-50 ml-1">
          {{ certificateDownload }}
        </h3>
        <span>
          Student telah mendownload sertifikat
        </span>
      </b-row>
      <b-row class="mt-1">
        <b-col>
          <b-avatar-group size="32px">
            <b-avatar
              class="pull-up"
            />
            <b-avatar
              class="pull-up"
              variant="primary"
            />
            <b-avatar
              class="pull-up"
            />
            <b-avatar
              class="pull-up"
              variant="danger"
            />
            <b-avatar
              class="pull-up"
            />
          </b-avatar-group>
        </b-col>
        <b-col cols="auto">
          <b-button
            variant="outline-primary"
            class="rounded"
          >
            Lihat Detail
          </b-button>
        </b-col>
      </b-row>
    </b-card>
  </b-col>
</template>

<script>
import {
  BRow,
  BCol,
  BFormRow,
  BCardHeader,
  BCardSubTitle,
  BCardTitle,
  BAvatar,
  BCard,
  BFormSelect,
  BAvatarGroup,
  BButton,
} from 'bootstrap-vue'
import flatPickr from 'vue-flatpickr-component'
import { kFormatter } from '@core/utils/filter'
import VueApexCharts from 'vue-apexcharts'

export default {
  components: {
    BRow,
    BCol,
    BFormRow,
    BCardHeader,
    BCardSubTitle,
    BCardTitle,
    BAvatar,
    BCard,
    BFormSelect,
    flatPickr,
    VueApexCharts,
    BAvatarGroup,
    BButton,
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    startDate: {
      type: String,
    },
    // eslint-disable-next-line vue/require-default-prop
    endDate: {
      type: String,
    },
  },
  data() {
    return {
      range: 3,
      rangeOptions: [
        { text: 'Hari ini', value: 0 },
        { text: 'Kemarin', value: 1 },
        { text: 'Minggu ini', value: 2 },
        { text: 'Bulan ini', value: 3 },
        { text: 'Tahun ini', value: 4 },
        { text: 'Kustom', value: 5 },
      ],

      // Analytics
      series: [{
        name: 'series1',
        data: [31, 40, 28, 51, 42, 109, 100],
      }, {
        name: 'series2',
        data: [11, 32, 45, 32, 34, 52, 41],
      }],
      chartOptions: {
        chart: {
          height: 350,
          type: 'area',
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        grid: {
          xaxis: {
            lines: {
              show: false,
            },
          },
        },
        xaxis: {
          type: 'datetime',
          categories: ['2018-09-19T00:00:00.000Z', '2018-09-19T01:30:00.000Z', '2018-09-19T02:30:00.000Z', '2018-09-19T03:30:00.000Z', '2018-09-19T04:30:00.000Z', '2018-09-19T05:30:00.000Z', '2018-09-19T06:30:00.000Z'],
        },
        yaxis: {
          min: 0,
        },
        fill: {
          opacity: 0.1,
          type: 'solid',
        },
        tooltip: {
          shared: false,
          custom({
            series, seriesIndex, dataPointIndex, w,
          }) {
            const seriesName = w.globals.seriesNames[seriesIndex]
            const currentValue = series[seriesIndex][dataPointIndex]
            const hasPrevious = dataPointIndex > 0 && series[seriesIndex][dataPointIndex - 1] != null
            const previousValue = hasPrevious ? series[seriesIndex][dataPointIndex - 1] : 0
            const progress = Math.round((currentValue * 100) / previousValue) - 100
            const isIncreased = progress >= 0

            return `<div class="px-1 py-75">
              <div class="row">
                <div class="col">
                  <div class="mb-25"><small class="text-muted">${seriesName}</small></div>
                  <div class="font-weight-bolder text-dark mb-0 h4">${currentValue || '-'}</div>
                </div>
                ${hasPrevious && progress !== 0 ? `<div class="col-auto d-flex align-items-end">
                  <span class="badge badge-light-secondary"><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12px"
                    height="12px"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="${isIncreased ? 'text-success' : 'text-danger'} align-middle feather ${isIncreased ? 'feather-arrow-down' : 'feather-arrow-up'}"
                  ><polyline points="12 5 12 19" /><polyline
                    points="${isIncreased ? '5 12 12 5 19 12' : '19 12 12 19 5 12'}" /></svg><span
                    class="font-weight-bolder align-middle"> ${progress}%</span></span>
                </div>` : ''}
              </div>
            </div>`
          },
        },
        colors: ['#479696', '#F0C631'],
      },
      studentFinished: 0,
      studentJoined: 0,
      certificateDownload: 0,
    }
  },
  computed: {
    isCustom() {
      return this.range === 5
    },
    startDateFilter() {
      if (this.isCustom) {
        return Array.isArray(this.customDate)
          ? this.customDate[0]
          : this.customDate.split(' to ')[0]
      }

      let date = new Date()
      const previousDays = 1

      if (this.range === 0) {
        date.setDate(date.getDate() - previousDays)
      } else if (this.range === 1) {
        date.setDate(date.getDate() - 1 - previousDays)
      } else if (this.range === 2) {
        const day = date.getDay()
        const diff = date.getDate() - day + (day === 0 ? -6 : 1)
        date = new Date(date.setDate(diff))
      } else if (this.range === 3) {
        date = new Date(date.getFullYear(), date.getMonth(), 1)
      } else if (this.range === 4) {
        date = new Date(date.getFullYear(), 0, 1)
      }

      return this.getIsoDate(date)
    },
    endDateFilter() {
      if (this.isCustom) {
        if (Array.isArray(this.customDate)) {
          return this.customDate.length > 1 ? this.customDate[1] : this.customDate[0]
        }

        const dates = this.customDate.split(' to ')
        return dates.length > 1 ? dates[1] : dates[0]
      }

      let date = new Date()
      const nextDays = 1

      if (this.range === 0) {
        date.setDate(date.getDate() + nextDays)
      } else if (this.range === 1) {
        date.setDate(date.getDate() - 1 + nextDays)
      } else if (this.range === 2) {
        const day = date.getDay()
        const diff = date.getDate() - day + (day === 0 ? -6 : 1) + 6
        date = new Date(date.setDate(diff))
      } else if (this.range === 3) {
        date = new Date(date.getFullYear(), date.getMonth() + 1, 0)
      } else if (this.range === 4) {
        date = new Date(date.getFullYear() + 1, 0, 0)
      }

      return this.getIsoDate(date)
    },
    dates: {
      get() {
        if (!this.customDate) {
          return []
        }

        return this.customDate.split(' to ')
      },
      set(value) {
        this.date = value[0] === value[1] ? value[0] : value
      },
    },
  },
  mounted() {
    this.loadStudent()
    this.$http.post('/dashboard/talentSummaryGraph').then(response => {
      const { data } = response.data
      // this.series = [
      //   {
      //     name: 'Registered',
      //     data: this.getValues(data.registered),
      //   },
      //   {
      //     name: 'Training',
      //     data: this.getValues(data.training),
      //   },
      // ]
      console.log(data)
    })
    this.$http.get('/lms/dashboard').then(response => {
      const { data } = response.data
      // this.series = [
      //   {
      //     name: 'Gabung Kelas',
      //     data: this.getValues(data.cart[0].lines),
      //   },
      //   {
      //     name: 'Lulus',
      //     data: this.getValues(data.cart[0].lines),
      //   },
      // ]
      console.log(data.cart)
    })
  },
  methods: {
    loadStudent() {
      return this.$http.get('/lms/dashboard').then(response => {
        const { data } = response.data
        this.studentFinished = data.cart[0].student_finished
        this.studentJoined = data.cart[0].student_joined
        this.certificateDownload = data.certificate_downloaded
        return data
      })
    },
    kFormatter,
    getIsoDate(date) {
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = (date.getDate()).toString().padStart(2, '0')

      return `${date.getFullYear()}-${month}-${day}`
    },
    getValues(data) {
      const results = data.map(item => ({ x: item.cart_date, y: item.cart_joined }))

      if (results.map(item => item.x).indexOf(this.startDate) === -1) {
        results.unshift({ x: this.startDate, y: null })
      }

      if (results.map(item => item.x).indexOf(this.endDate) === -1) {
        results.push({ x: this.endDate, y: null })
      }

      return results
    },
  },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-flatpicker.scss';
@import '~@core/scss/vue/libs/vue-flatpicker.scss';
</style>
