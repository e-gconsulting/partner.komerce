<template>
  <b-row>
    <h2 class="ml-1 mb-1">
      Kampus Komerce
    </h2>
    <b-col cols="12">
      <b-row>
        <b-col
          v-for="item in itemRadial"
          :key="item.class"
          cols="4"
        >
          <b-card>
            <b-row>
              <b-col
                md="6"
              >
                <h4>{{ item.class_skill }}</h4>
                <b-col
                  cols="12"
                  class="mt-1 p-0"
                >
                  <b-form-group
                    label="Student"
                    label-cols-md="6"
                    class="mb-0"
                  >
                    <h5 class="text-danger mt-50">
                      {{ item.total_student_joined }}
                    </h5>
                  </b-form-group>
                </b-col>
                <b-col
                  cols="12"
                  class="p-0"
                >
                  <b-form-group
                    label="Lulus"
                    label-cols-md="6"
                  >
                    <h5 class="text-danger mt-50">
                      {{ item.total_class_finished }}
                    </h5>
                  </b-form-group>
                </b-col>
              </b-col>

              <b-col md="6">
                <div id="chart">
                  <vue-apex-charts
                    type="radialBar"
                    height="190"
                    :options="chartOptions"
                    :series="[Math.round(item.total_progress)]"
                  />
                </div>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </b-col>

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
      </b-card>
    </b-col>

    <!-- Analytics Kelas -->
    <analytics-kelas
      ref="analyticsTalent"
      :start-date="startDate"
      :end-date="endDate"
    />

    <b-col cols="12">
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
            <b-avatar-group
              v-for="(item, index) in listStudentFinish"
              :key="index + 1"
              size="32px"
            >
              <b-avatar
                class="pull-up"
                :src="item.student_image"
              />
            </b-avatar-group>
          </b-col>
          <b-col cols="auto">
            <b-button
              variant="outline-primary"
              class="rounded"
              tag="router-link"
              :to="{ name: $route.meta.studentLulus, query: { tab: 'student-lulus' } }"
            >
              Lihat Detail
            </b-button>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import {
  BButton,
  BRow,
  BCol,
  BCard,
  BFormGroup,
  BFormSelect,
  BCardHeader,
  BFormRow,
  BAvatar,
  BCardTitle,
  BCardSubTitle,
  BAvatarGroup,
} from 'bootstrap-vue'
import flatPickr from 'vue-flatpickr-component'
import { kFormatter } from '@core/utils/filter'
import VueApexCharts from 'vue-apexcharts'
import AnalyticsKelas from './AnalyticsKelas.vue'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    AnalyticsKelas,
    BFormGroup,
    VueApexCharts,
    flatPickr,
    BFormSelect,
    BCardHeader,
    BFormRow,
    BAvatar,
    BCardTitle,
    BCardSubTitle,
    BButton,
    BAvatarGroup,
  },
  data() {
    return {
      series: [],
      colors: ['#ff0000'],
      chartOptions: {
        chart: {
          height: 185,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 0,
              size: '60%',
              background: '#FFF',
            },
            track: {
              dropShadow: {
                enabled: true,
                top: 2,
                left: 0,
                blur: 4,
                opacity: 0.15,
              },
            },
            dataLabels: {
              name: {
                offsetY: -10,
                color: '#979797',
                fontSize: '10px',
              },
              value: {
                fontSize: '28px',
                show: true,
                color: '#000',
              },
            },
          },
        },
        fill: {
          type: 'gradient',
          colors: '#F17D3C',
          gradient: {
            color: '#fff',
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.5,
            gradientToColors: ['#CC3300'],
            stops: [0, 50],
          },
        },
        stroke: {
          lineCap: 'round',
        },
        labels: ['Progress Student'],
      },

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

      itemRadial: '',
      studentFinished: 0,
      studentJoined: 0,
      certificateDownload: 0,
      listStudentFinish: [],
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
      })
    },
  },
  mounted() {
    this.loadClass()
    this.$refs.analyticsTalent.loadChart()
    this.loadStudent()
    this.loadListStudentFinish()
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
    loadClass() {
      return this.$http.get('/lms/dashboard').then(response => {
        const { data } = response.data
        this.itemRadial = data.class
      })
    },
    loadListStudentFinish() {
      this.$http.get('/lms/report/student').then(response => {
        const { data } = response.data
        data.finished.forEach(this.myListArray)
      })
    },
    myListArray(data) {
      this.listStudentFinish = data.student
      console.log(this.listStudentFinish)
      // data.student.forEach(this.myListStudentFinish)
    },
    // myListStudentFinish(data) {
    //   console.log(data)
    // },
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
