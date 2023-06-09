<template>
  <BCard body>
    <div class="d-flex items-center">
      <b-button
        variant="primary"
        size="sm"
        class="mr-1 rounded-lg p-0"
        @click="$router.go(-1)"
      >
        <feather-icon
          size="2x"
          icon="ChevronLeftIcon"
        />
      </b-button>
      <h4 class="font-bold text-black d-inline-flex mb-0">
        Penarikan Barang
      </h4>
    </div>
    <div class="d-flex justify-content-end">
      <div class="d-flex gap-4">
        <b-button
          variant="outline-primary"
          class="d-flex"
          style="padding: 8px"
          @click="$router.push({ name: 'ajukan-penarikan-barang' })"
        >
          <img
            src="https://storage.googleapis.com/komerce/assets/komerce-icon/Orange/add.svg"
            alt="add"
          >
          <span class="align-self-center">Ajukan Penarikan Barang</span>
        </b-button>
        <b-dropdown
          ref="myDropdown"
          variant="primary"
          right
          size="sm"
          no-caret
        >
          <template
            #button-content
          >
            <img
              src="https://storage.googleapis.com/komerce/assets/komerce-icon/Putih/candle-2.svg"
              alt="filter"
              style="transform: rotate(90deg);"
            >
          </template>
          <b-dropdown-form
            style="width: 368px;"
          >
            <h4 class="text-black font-bold">
              Filter
            </h4>
            <b-form>
              <div class="d-flex flex-column">
                <b-form-group
                  id="input-group-3"
                  class="mt-0.5 font-bold"
                  label="Gudang"
                  label-for="filterGudang"
                >
                  <v-select
                    id="filterGudang"
                    v-model="gudang"
                    placeholder="Pilih Gudang"
                    class="w-100 font-medium"
                    :options="gudangList"
                    :reduce="gudang => gudang.value"
                    :selectable="gudang => !gudang.disabled"
                  />
                </b-form-group>
                <b-form-group
                  v-if="toggleFilter === 'dataBarang'"
                  id="input-group-3"
                  class="font-bold"
                  label="Status"
                  label-for="filterStatus"
                >
                  <v-select
                    id="filterStatus"
                    v-model="status"
                    placeholder="Pilih Status"
                    class="w-100 font-medium"
                    :options="statusList"
                    :reduce="status => status.value"
                  />
                </b-form-group>
                <b-form-group
                  id="input-group-3"
                  class="font-bold"
                  label="Tanggal"
                  label-for="filterTanggal"
                >
                  <DateRangePicker
                    id="filterTanggal"
                    ref="picker"
                    v-model="dateRange"
                    class="w-100 font-medium"
                    :locale-data="locale"
                    :ranges="ranges"
                    :opens="'left'"
                  >
                    <template
                      v-slot:input="picker"
                      style="min-width: 350px"
                    >
                      <div class="d-flex justify-content-between align-items-center w-100">
                        <div class="mr-1">
                          <span
                            style="color: #828282 !important"
                          > {{ formatDate(picker.startDate) }} - {{ formatDate(picker.endDate) }}</span>
                        </div>
                        <div class="padding-arrow border-l">
                          <b-img
                            class="pl-[7px]"
                            src="https://storage.googleapis.com/komerce/assets/komerce-icon/Orange/calendar.svg"
                          />
                        </div>
                      </div>
                    </template>
                  </DateRangePicker>
                </b-form-group>
                <div class="d-flex flex-row justify-content-start">
                  <b-button
                    v-if="toggleFilter === 'dataBarang'"
                    type="reset"
                    variant="outline-primary"
                    @click="onResetBarang()"
                  >
                    Reset
                  </b-button>
                  <b-button
                    v-if="toggleFilter === 'menungguRespon'"
                    type="reset"
                    variant="outline-primary"
                    @click="onResetRespon()"
                  >
                    Reset
                  </b-button>
                  <b-button
                    v-if="toggleFilter === 'dataBarang'"
                    class="ml-1"
                    variant="primary"
                    @click="onSubmitFilterBarang()"
                  >
                    Terapkan
                  </b-button>
                  <b-button
                    v-if="toggleFilter === 'menungguRespon'"
                    class="ml-1"
                    variant="primary"
                    @click="onSubmitFilterRespon()"
                  >
                    Terapkan
                  </b-button>
                </div>
              </div>
            </b-form>
          </b-dropdown-form>
        </b-dropdown>
      </div>
    </div>
    <b-tabs>
      <b-tab
        title="Barang Dikeluarkan"
        lazy
        :active="$route.query.tab === 'data-barang-dikeluarkan'"
      >
        <BarangDikeluarkan
          ref="barangDikeluarkan"
          :gudang="gudang"
          :status="status"
          :date-range="dateRange"
          @statusFilter="handleShowStatus"
          @resetFilter="clearFilter"
          @waitingResponse="fetchWaitingLength"
        />
      </b-tab>
      <b-tab
        lazy
        :active="$route.query.tab === 'menunggu-response'"
      >
        <template slot="title">
          <div class="d-flex gap-2">
            Menunggu Respon
            <b-badge
              v-if="waitingRes > 0"
              pill
              variant="primary"
            >
              {{ waitingRes }}
            </b-badge>
          </div>
        </template>
        <MenungguRespon
          ref="menungguRespon"
          :gudang="gudang"
          :date-range="dateRange"
          @removeStatusFilter="handleRemoveStatus"
          @resetFilter="clearFilter"
          @waitingResponse="waitingResponse"
        />
      </b-tab>
    </b-tabs>
  </BCard>
</template>

<script>
import moment from 'moment'
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import {
  BTabs, BTab, BCard,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import {
  today, last7, last30, firstDateOfMonth, lastDateOfMonth, kompackDate, last90,
} from '@/store/helpers'
import vSelect from 'vue-select'
import BarangDikeluarkan from './DataBarangDikeluarkan.vue'
import MenungguRespon from './MenungguRespon.vue'

export default {
  components: {
    DateRangePicker,
    BTabs,
    BTab,
    BarangDikeluarkan,
    MenungguRespon,
    BCard,
    vSelect,
  },
  data() {
    return {
      waitingRes: null,

      gudang: null,

      gudangList: [
        {
          label: 'Semua Gudang',
          value: '',
        },
      ],
      status: '',
      statusList: [
        {
          label: 'Semua',
          value: '',
        },
        {
          label: 'Menunggu respon mitra',
          value: 'Diajukan',
        },
        {
          label: 'Ditolak',
          value: 'Ditolak',
        },
        {
          label: 'Selesai',
          value: 'Selesai',
        },
      ],
      toggleFilter: 'dataBarang',

      kompackDate,
      today,
      last7,
      last30,
      last90,
      firstDateOfMonth,
      lastDateOfMonth,
      dateRange: {
        startDate: kompackDate,
        endDate: today,
      },
      locale: {
        format: 'dd/mm/yyyy',
        daysOfWeek: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
        monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
      },
      ranges: {
        // 'Hari ini': [today, today],
        // 'Bulan ini': [firstDateOfMonth, lastDateOfMonth],
        'Semua ': [kompackDate, today],
        '7 hari terakhir': [last7, today],
        '1 bulan terakhir': [last30, today],
        '3 bulan terakhir': [last90, today],
        'Custom tanggal': [today, today],
      },
    }
  },

  created() {
    this.fetchWaitingLength()
    this.fetchGudangList()
  },

  methods: {
    async fetchGudangList() {
      await this.$http_komship.get('/v1/komship/outbound/warehouses')
        .then(res => {
          const { data } = res.data
          const resGudang = data.map(item => ({
            label: item.warehouse_name,
            value: item.warehouse_id,
          }))
          this.gudangList.push(...resGudang)
        }).catch(() => {
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Gagal',
                icon: 'AlertCircleIcon',
                text: 'Gagal load data, silahkan coba lagi',
                variant: 'danger',
              },
            },
            2000,
          )
        })
    },
    async fetchWaitingLength() {
      await this.$http_komship.get('/v1/komship/outbound/waiting-response')
        .then(res => {
          const { data } = res.data
          this.waitingRes = data.length
        }).catch(() => {
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Gagal',
                icon: 'AlertCircleIcon',
                text: 'Gagal load data, silahkan coba lagi',
                variant: 'danger',
              },
            },
            2000,
          )
        })
    },
    formatDateFilter(value) {
      return moment(value).format('YYYY-MM-DD')
    },
    formatDate(value) {
      return moment(value).format('D MMM YYYY')
    },
    onSubmitFilterBarang() {
      this.$refs.barangDikeluarkan.fetchData()
      this.$refs.myDropdown.hide()
    },
    onSubmitFilterRespon() {
      this.$refs.menungguRespon.fetchData()
      this.$refs.myDropdown.hide()
    },
    onResetBarang() {
      this.gudang = ''
      this.status = ''
      this.dateRange = {
        startDate: kompackDate,
        endDate: today,
      }
      this.$refs.barangDikeluarkan.fetchDataNoParams()
      this.$refs.myDropdown.hide()
    },
    onResetRespon() {
      this.gudang = ''
      this.dateRange = {
        startDate: kompackDate,
        endDate: today,
      }
      this.$refs.menungguRespon.fetchDataNoParams()
      this.$refs.myDropdown.hide()
    },
    handleRemoveStatus(value) {
      this.toggleFilter = value
    },
    handleShowStatus(value) {
      this.toggleFilter = value
    },
    clearFilter() {
      this.gudang = ''
      this.status = ''
      this.dateRange = {
        startDate: kompackDate,
        endDate: today,
      }
      this.$refs.myDropdown.hide()
    },
    waitingResponse(value) {
      this.waitingRes = value
    },
  },
}
</script>
<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
  .vs__dropdown-menu {
  max-height: 130px;
}
</style>
<style scoped>
.padding-arrow {
  padding: 1px 0px;
}
.max-5-opt{
  max-height:120px;
  overflow-y: scroll;
}
</style>
