<template>
  <b-overlay
    variant="light"
    :show="loading"
    spinner-variant="primary"
    blur="0"
    opacity=".5"
    rounded="sm"
  >
    <b-row>
      <b-col cols="12">
        <b-card-actions
          no-actions
          no-body
        >
          <h3 class="mb-1 ml-3 mt-2">
            Detail
          </h3>
          <b-row>
            <b-avatar
              size="70px"
              class="mt-1 ml-4"
            />
            <b-col
              md="2"
              class="mt-2"
            >
              <h4>{{ fullname }}</h4>
              <span>Advertiser</span>
            </b-col>
          </b-row>
          <b-row>
            <p class="mt-2 ml-5">
              Tanggal Gabung Kelas: 01 Januari 2021
            </p>
          </b-row>
          <b-table
            ref="table"
            striped
            hover
            responsive
            class="position-relative"
            empty-text="Tidak ada data untuk ditampilkan."
            :empty-filtered-text="`Tidak ada hasil untuk kata kunci '${filter}'.`"

            :fields="fields"
            :items="items"
          >

            <template #cell(modul)="data">
              <h4>{{ data.value.value }}</h4>
              <p>Belajar Facebook Ads Pemula</p>
            </template>

            <template #cell(status)="data">
              <span>{{ data.value.value }}</span>
            </template>

            <template #cell(nilai)="data">
              <span>{{ data.value.value }}</span>
            </template>

          </b-table>
        </b-card-actions>
      </b-col>
    </b-row>
  </b-overlay>
</template>

<script>
import BCardActions from '@/@core/components/b-card-actions/BCardActions.vue'
import {
  BRow,
  BOverlay,
  BCol,
  BAvatar,
  BTable,
} from 'bootstrap-vue'

export default {
  components: {
    BCardActions,
    BRow,
    BOverlay,
    BCol,
    BAvatar,
    BTable,
  },
  data() {
    return {
      studentId: this.$route.params.student_id,
      fields: [
        { key: 'modul', label: 'Modul' },
        { key: 'status', label: 'Status' },
        { key: 'nilai', label: 'Nilai' },
      ],

      items: [
        {
          modul: { value: 'Modul 1' },
          status: { value: 'Selesei' },
          nilai: { value: '100' },
        },
      ],

      fullname: '',
      username: '',
    }
  },
  mounted() {
    this.loadStudent()
    this.$http.get('/lms/report/student').then(response => {
      const { data } = response.data
      console.log(data[0].join)
    })
  },
  methods: {
    loadStudent() {
      return this.$http.get(`/lms/user/${this.studentId}`).then(response => {
        const { data } = response.data
        this.fullname = data.user_fullname
      })
    },
  },

}
</script>

<style>

</style>
