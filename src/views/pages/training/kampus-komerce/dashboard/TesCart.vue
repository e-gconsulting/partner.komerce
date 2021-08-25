<template>
  <b-card no-body>
    <b-card-header>
      <b-form-row>
        <b-col cols="auto">
          <b-avatar
            size="lg"
            rounded="sm"
            variant="primary"
          >
            <feather-icon
              icon="UsersIcon"
              size="20"
            />
          </b-avatar>
        </b-col>
        <b-col class="d-flex align-items-center">
          <div>
            <b-card-title class="mb-1">
              <h5 class="text-muted">
                Talent
              </h5>
            </b-card-title>
            <b-card-sub-title class="h4">
              <feather-icon
                v-if="total === -1"
                icon="MoreHorizontalIcon"
              />
              <span
                v-else
                class="text-dark"
              >{{ numberFormat(total) }}</span>
            </b-card-sub-title>
          </div>
        </b-col>
        <b-col cols="auto">
          <b-avatar
            size="lg"
            rounded="sm"
            variant="primary"
          >
            <feather-icon
              icon="UsersIcon"
              size="20"
            />
          </b-avatar>
        </b-col>
        <b-col class="d-flex align-items-center">
          <div>
            <b-card-title class="mb-1">
              <h5 class="text-muted">
                Talent
              </h5>
            </b-card-title>
            <b-card-sub-title class="h4">
              <feather-icon
                v-if="total === -1"
                icon="MoreHorizontalIcon"
              />
              <span
                v-else
                class="text-dark"
              >{{ numberFormat(total) }}</span>
            </b-card-sub-title>
          </div>
        </b-col>
      </b-form-row>
    </b-card-header>

    <b-card-body>
      <b-form-row class="mb-2">
        <b-col
          v-for="(item, index) in items"
          :key="`talent-item-${index}`"
          cols="6"
          md="auto"
          class="mb-50"
        >
          <div class="pl-1 pr-1 pr-md-3 pt-1 pt-md-75 pb-75 rounded-lg border">
            <b-form-row>
              <b-col
                cols="12"
                md="auto"
                class="d-flex align-items-center"
              >
                <b-avatar
                  rounded="sm"
                  :variant="item.variant"
                >
                  <feather-icon
                    :icon="item.icon"
                    size="18"
                  />
                </b-avatar>
              </b-col>
              <b-col
                cols="12"
                md="auto"
                class="d-flex align-items-center"
              >
                <div>
                  <b-card-title class="mb-1 mt-50 mt-md-0">
                    <h6 class="text-secondary">
                      <small>{{ item.label }}</small>
                    </h6>
                  </b-card-title>
                  <b-card-sub-title class="h4">
                    <feather-icon
                      v-if="item.total === -1"
                      icon="MoreHorizontalIcon"
                    />
                    <span
                      v-else
                      class="text-dark"
                    >{{ numberFormat(item.total) }}</span>
                  </b-card-sub-title>
                </div>
              </b-col>
            </b-form-row>
          </div>
        </b-col>
      </b-form-row>
      <vue-apex-charts
        type="area"
        height="400"
        :options="options"
        :series="series"
      />
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardBody, BCardTitle, BCardSubTitle, BFormRow, BCol, BAvatar,
} from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'

export default {
  components: {
    BCard,
    VueApexCharts,
    BCardHeader,
    BCardBody,
    BCardTitle,
    BCardSubTitle,
    BFormRow,
    BCol,
    BAvatar,
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
      total: -1,
      registeredTotal: -1,
      trainingTotal: -1,
      graduatedTotal: -1,
      hiredTotal: -1,
      nonJobTotal: -1,

      series: [
        {
          data: [],
        },
      ],
      options: {
        chart: {
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          curve: 'smooth',
        },
        legend: {
          show: true,
          position: 'top',
          horizontalAlign: 'left',
          fontSize: '14px',
          fontFamily: 'Montserrat',
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
          labels: {
            datetimeFormatter: {
              year: 'yyyy',
              month: 'MMM \'yy',
              day: 'dd MMM',
              hour: 'HH:mm',
            },
          },
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
        colors: ['#ea5455', '#00cfe8', '#82868b', '#28c76f', '#ff9f43'],
      },
    }
  },
  computed: {
    total1() {
      const total = this.registeredTotal + this.trainingTotal + this.graduatedTotal + this.hiredTotal + this.nonJobTotal
      return total < 0 ? -1 : total
    },
    items() {
      return [
        {
          label: 'Registered',
          total: this.registeredTotal,
          icon: 'FileTextIcon',
          variant: 'light-primary',
        },
        {
          label: 'Training',
          total: this.trainingTotal,
          icon: 'ThumbsUpIcon',
          variant: 'light-warning',
        },
        {
          label: 'Graduated',
          total: this.graduatedTotal,
          icon: 'BookmarkIcon',
          variant: 'light-info',
        },
        {
          label: 'Hired',
          total: this.hiredTotal,
          icon: 'FlagIcon',
          variant: 'light-success',
        },
        {
          label: 'Non-Job',
          total: this.nonJobTotal,
          icon: 'UsersIcon',
          variant: 'light-secondary',
        },
      ]
    },
  },
  mounted() {
    this.loadSummary()
  },
  methods: {
    loadChart() {
      return this.$http.post('/dashboard/talentSummaryGraph',
        {
          start_date: this.startDate,
          end_date: this.endDate,
        },
        {
          params: {
            sort: 'name',
            direction: 'asc',
          },
        })
        .then(async response => {
          const { data } = response.data

          this.series = [
            {
              name: 'Registered',
              data: this.getValues(data.registered),
            },
            {
              name: 'Training',
              data: this.getValues(data.training),
            },
            {
              name: 'Graduated',
              data: this.getValues(data.graduated),
            },
            {
              name: 'Hired',
              data: this.getValues(data.hired),
            },
            {
              name: 'Non-Job',
              data: this.getValues(data.nonJob),
            },
          ]
        })
    },
    loadSummary() {
      return this.$http.get('/dashboard/talentSummary', {
        params: {
          sort: 'name',
          direction: 'asc',
        },
      })
        .then(async response => {
          const { data } = response.data

          this.total = data.talents
          this.registeredTotal = data.registered
          this.trainingTotal = data.training
          this.graduatedTotal = data.graduated
          this.hiredTotal = data.hired
          this.nonJobTotal = data.nonJob
        })
    },
    getValues(data) {
      const results = data.map(item => ({ x: item.date, y: item.total }))

      if (results.map(item => item.x).indexOf(this.startDate) === -1) {
        results.unshift({ x: this.startDate, y: null })
      }

      if (results.map(item => item.x).indexOf(this.endDate) === -1) {
        results.push({ x: this.endDate, y: null })
      }

      return results
    },
    numberFormat(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    getIsoDate(date) {
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = (date.getDate()).toString().padStart(2, '0')

      return `${date.getFullYear()}-${month}-${day}`
    },
  },
}
</script>
