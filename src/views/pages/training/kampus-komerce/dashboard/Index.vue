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
                    :series="series"
                  />
                </div>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </b-col>

    <!-- Analytics Kelas -->
    <analytics-kelas />
  </b-row>
</template>

<script>
import {
  // BButton,
  BRow,
  BCol,
  BCard,
  BFormGroup,
} from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
// import AdvertiserRadial from './AdvertiserRadial.vue'
// import CustomerServiceRadial from './CustomerServiceRadial.vue'
// import AdmRadial from './AdmRadial.vue'
import AnalyticsKelas from './AnalyticsKelas.vue'

export default {
  components: {
    // BButton,
    BRow,
    BCol,
    BCard,
    // AdvertiserRadial,
    // CustomerServiceRadial,
    // AdmRadial,
    AnalyticsKelas,
    BFormGroup,
    VueApexCharts,
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
                color: '#ff0000',
                fontSize: '28px',
                show: true,
              },
            },
          },
        },
        fill: {
          type: 'colors',
          colors: ['#ff0000'],
        },
        stroke: {
          lineCap: 'round',
        },
        labels: ['Progress Student'],
      },

      itemRadial: '',
    }
  },
  mounted() {
    this.$http.get('/lms/dashboard').then(response => {
      const { data } = response.data
      console.log(data.class)
    })
    this.loadClass()
  },
  methods: {
    test(item) {
      console.log(item)
    },
    loadClass() {
      return this.$http.get('/lms/dashboard').then(response => {
        const { data } = response.data
        data.class.forEach(this.dataProgress)
        this.itemRadial = data.class
      })
    },
    dataProgress(data) {
      this.series.push(data.total_progress)
    },
  },

}
</script>
