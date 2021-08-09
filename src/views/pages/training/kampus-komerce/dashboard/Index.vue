<template>
  <b-row>
    <h2 class="ml-1 mb-1">
      Kampus Komerce
    </h2>
    <b-col cols="12">
      <b-row>
        <b-col
          cols="4"
        >
          <b-card>
            <advertiser-radial />
          </b-card>
        </b-col>

        <b-col cols="4">
          <b-card>
            <customer-service-radial />
          </b-card>
        </b-col>

        <b-col cols="4">
          <b-card>
            <adm-radial />
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
  BRow,
  BCol,
  BCard,
} from 'bootstrap-vue'
import AdvertiserRadial from './AdvertiserRadial.vue'
import CustomerServiceRadial from './CustomerServiceRadial.vue'
import AdmRadial from './AdmRadial.vue'
import AnalyticsKelas from './AnalyticsKelas.vue'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    AdvertiserRadial,
    CustomerServiceRadial,
    AdmRadial,
    AnalyticsKelas,
  },

}
</script>
