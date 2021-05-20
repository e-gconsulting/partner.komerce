<template>
  <section id="dashboard-analytics">
    <b-form-row class="match-height align-items-center mb-1">
      <b-col>
        <h3 class="mb-50 mb-md-0">
          Dashboard
        </h3>
      </b-col>
      <b-col cols="auto">
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
    </b-form-row>

    <b-row class="match-height">
      <b-col cols="12">
        <analytics-talent
          ref="analyticsTalent"
          :start-date="startDate"
          :end-date="endDate"
        />
      </b-col>
    </b-row>

    <b-row class="match-height">
      <b-col
        lg="3"
        md="12"
      >
        <analytics-office />
      </b-col>
      <b-col
        lg="9"
        sm="12"
      >
        <analytics-partner
          ref="analyticsPartner"
          :start-date="startDate"
          :end-date="endDate"
        />
      </b-col>
    </b-row>
  </section>
</template>

<script>
import {
  BFormRow, BRow, BCol, BFormSelect, BCard,
} from 'bootstrap-vue'

import { kFormatter } from '@core/utils/filter'
import flatPickr from 'vue-flatpickr-component'
import AnalyticsTalent from './AnalyticsTalent.vue'
import AnalyticsPartner from './AnalyticsPartner.vue'
import AnalyticsOffice from './AnalyticsOffice.vue'

export default {
  components: {
    BFormRow,
    BRow,
    BCol,
    AnalyticsPartner,
    AnalyticsTalent,
    BFormSelect,
    flatPickr,
    AnalyticsOffice,
    BCard,
  },
  data() {
    return {
      customDate: null,
      range: 2,
      rangeOptions: [
        { text: 'Hari ini', value: 0 },
        { text: 'Kemarin', value: 1 },
        { text: 'Minggu ini', value: 2 },
        { text: 'Bulan ini', value: 3 },
        { text: 'Tahun ini', value: 4 },
        { text: 'Kustom', value: 5 },
      ],
    }
  },
  computed: {
    isCustom() {
      return this.range === 5
    },
    startDate() {
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
    endDate() {
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
  watch: {
    startDate: {
      immediate: true,
      handler() {
        if (!this.isCustom) {
          this.customDate = [this.startDate, this.endDate]
        }
      },
    },
    endDate() {
      this.$nextTick(() => {
        this.$refs.analyticsTalent.loadChart()
        this.$refs.analyticsPartner.loadChart()
      })
    },
  },
  mounted() {
    this.$refs.analyticsTalent.loadChart()
    this.$refs.analyticsPartner.loadChart()
  },
  methods: {
    kFormatter,
    getIsoDate(date) {
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = (date.getDate()).toString().padStart(2, '0')

      return `${date.getFullYear()}-${month}-${day}`
    },
  },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-flatpicker.scss';
@import '~@core/scss/vue/libs/vue-flatpicker.scss';
@import '~@core/scss/vue/libs/chart-apex.scss';
</style>
