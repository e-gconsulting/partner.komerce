<template>
  <div>
    <h4><strong class="text-black text-2xl">Pelanggan</strong></h4>
    <BCard class="card-graphic mt-1">
      <div class="flex justify-between mb-1">
        <h5><strong
          style="color: #000000"
          class="text-xl"
        >Grafik Pertumbuhan Pelanggan</strong></h5>
        <BButton
          size="sm"
          variant="outline-primary"
          style="padding: 0.4rem 2rem; border: 1px solid #ECE9F1 !important; color: black;"
          class="cursor-pointer"
        >
          <BRow>
            <Datepicker
              v-model="filterChart"
              :format="formatDateFilter"
              minimum-view="year"
              name="datepicker"
              wrapper-class="border-solid border-slate-200 rounded w-auto"
              calendar-class="w-full ml-[-22em]"
            />
            <b-img
              src="@/assets/images/icons/arrow-down-light.svg"
              class="w-3"
            />
          </BRow>
        </BButton>
      </div>
      <BOverlay
        :show="isLoading"
        spinner-variant="primary"
        variant="light"
        blur="0"
        opacity=".5"
        rounded="sm"
      >
        <VueApexcharts
          ref="myChart"
          height="300"
          type="area"
          :options="chartOptions"
          :series="seriesChart"
        />
      </BOverlay>
    </BCard>
    <BCard>
      <div class="flex justify-between">
        <div class="flex items-center">
          <span class="text-[13px] text-black">Total kontak</span>
          <strong class="text-[24px] ml-1 font-bold text-black">{{ totalRows }}</strong>
        </div>
        <BRow class="mr-0">
          <BCol
            class="mb-[5px] text-center pl-0 pr-0"
            md="auto"
          >
            <BButton
              id="download"
              class="mr-1"
              style="padding: 5px 1rem"
              variant="primary"
              size="sm"
              @click="getDownloadContact"
            >
              <BRow class="align-items-center justify-content-between">
                <div class="ml-[10px] mr-[10px] flex items-center">
                  <b-img src="@/assets/images/svg/document-download.svg" />
                  <span class="ml-[4px]">Download Data Excel</span>
                </div>
              </BRow>
            </BButton>
          </BCol>
          <BCol
            class="mb-[5px] text-center pl-0 pr-0"
            md="auto"
          >
            <BDropdown
              variant="outline-danger"
              :text="handleTextDropdown(provinceName)"
              menu-class="h-80 overflow-auto"
              class="dropdown mr-1"
              size="md"
            >
              <BDropdownItem @click="filterDataByProvince()">
                Semua Provinsi
              </BDropdownItem>
              <BDropdownItem
                v-for="(items, index) in provinces"
                :key="index"
                v-model="provinceName"
                @click="filterDataByProvince(items.province_name)"
              >
                {{ items.province_name }}
              </BDropdownItem>
            </BDropdown>
          </BCol>
          <BCol
            class="mb-[5px] text-center pl-0 pr-0"
            md="auto"
          >
            <BInputGroup class="input-group-merge">
              <BInputGroupPrepend is-text>
                <feather-icon icon="SearchIcon" />
              </BInputGroupPrepend>
              <BFormInput
                v-model="search"
                size="md"
                placeholder="Nama pelanggan"
                style="padding: 8px 1rem"
                @input="searchData"
              />
            </BInputGroup>
          </BCol>
        </BRow>
      </div>
      <BOverlay
        :show="isLoading"
        spinner-variant="primary"
        variant="light"
        blur="0"
        opacity=".5"
        rounded="sm"
      >
        <BTable
          :items="items"
          :fields="fields"
          show-empty
          empty-text="Tidak ada data yang ditampilkan."
          responsive
          head-variant="light"
          class="mt-1"
          selectable
          :select-mode="selectMode"
          hover
          @row-selected="handleToDetail"
        >
          <template #head(customer_name)="data">
            <span class="text-black">{{ data.label }}</span>
          </template>
          <template #head(total_order)="data">
            <span class="text-black">{{ data.label }}</span>
          </template>
          <template #head(total_pcs)="data">
            <span class="text-black">{{ data.label }}</span>
          </template>
          <template #head(customer_address)="data">
            <span class="text-black">{{ data.label }}</span>
          </template>
          <template #head(total_spent)="data">
            <span class="text-black">{{ data.label }}</span>
          </template>
          <template #head(last_order)="data">
            <span class="text-black">{{ data.label }}</span>
          </template>

          <template #head(customer_phone)="data">
            <b-row class="align-items-center">
              <span class="text-black">{{ data.label }}</span>
              <b-img
                id="infoNo"
                src="@/assets/images/icons/info-circle.svg"
                class="ml-50"
              />
              <b-popover
                triggers="hover"
                target="infoNo"
                placement="topright"
              >Akan ada icon penanda jika nomor HP pelanggan terdaftar di WhatsApp</b-popover>
            </b-row>
          </template>
          <template #cell(customer_phone)="data">
            <div
              class="flex items-center"
              @mouseover="handleHoverButtonWa(data)"
              @mouseleave="handleLeaveHoverButtonWa(data)"
              @click="handlePhone(data)"
            >
              <b-img
                v-if="data.item.is_whatsapp === 1"
                :src="data.item.wa_icon"
                alt="Komerce"
                style="cursor: pointer"
              />
              <span :class="`text-[${data.item.text_color}] ml-[2px]`">{{ data.value }}</span>
            </div>
          </template>
          <template #cell(total_spent)="data">
            <div style="min-width: 150px!important;">
              Rp. {{ formatRupiah(data.item.total_spent) }}
            </div>
          </template>
          <template #cell(last_order)="data">
            <div style="min-width: 150px!important;">
              {{ formatDate(data.item.last_order) }}
            </div>
          </template>
          <template #cell(customer_address)="data">
            <div style="min-width: 190px!important;">
              {{ data.value }}
            </div>
          </template>
        </BTable>
        <BRow>
          <BCol
            cols="12"
            class="d-flex justify-content-between"
          >
            <div
              class="
              bg-light
              d-flex
              justify-content-center
              align-items-center
              p-50
              rounded
            "
            >
              <span class="text-black mr-50"> List per halaman: </span>
              <BButton
                v-for="page in optionsPage"
                :key="page"
                class="btn-icon"
                size="sm"
                :variant="totalPerPage === page ? 'primary' : 'flat-dark'"
                @click="setPerPage(page)"
              >
                {{ page }}
              </BButton>
            </div>

            <BPagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="totalPerPage"
              first-number
              last-number
              class="pagination-primary"
            >
              <template #prev-text>
                <feather-icon
                  size="18"
                  icon="ChevronLeftIcon"
                />
              </template>
              <template #next-text>
                <feather-icon
                  size="18"
                  icon="ChevronRightIcon"
                />
              </template>
            </BPagination>
          </BCol>
        </BRow>
      </BOverlay>
    </BCard>
  </div>
</template>
<script>
import {
  BCard,
  BOverlay,
  BFormInput,
  BTable,
  BPagination,
  BDropdown,
  BDropdownItem,
  BInputGroup,
  BInputGroupPrepend,
} from 'bootstrap-vue'
import VueApexcharts from 'vue-apexcharts'
import moment from 'moment'
import Datepicker from 'vuejs-datepicker'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import isEmpty from 'lodash/isEmpty'

export default {
  components: {
    BCard,
    VueApexcharts,
    BFormInput,
    BTable,
    BPagination,
    BDropdown,
    BDropdownItem,
    Datepicker,
    BInputGroup,
    BInputGroupPrepend,
  },
  data() {
    return {
      selectMode: 'single',
      search: '',
      isLoading: true,
      seriesChart: [],
      provinces: [],
      provinceName: '',
      chartOptions: {
        chart: {
          type: 'area',
          stacked: false,
          height: 350,
          width: '100%',
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
        },
        stroke: {
          curve: 'smooth',
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.75,
            opacityTo: 0.05,
            stops: [20, 100, 100, 100],
          },
        },
        yaxis: {
          forceNiceScale: true,
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        xaxis: {
          type: 'category',
          categories: [],
          min: '',
        },
        noData: {
          text: 'Tidak ada data',
        },
        color: ['#08A0F7'],
        tooltip: {
          shared: false,
          custom({
            series,
            seriesIndex,
            dataPointIndex,
            w,
          }) {
            const seriesName = w.globals.seriesNames[seriesIndex]
            const seriesValue = series[seriesIndex][dataPointIndex]
            const seriesMonth = w.globals.categoryLabels[dataPointIndex].slice(0, 3)
            const seriesYear = w.config.xaxis.min[dataPointIndex]

            return `<div class="px-1 py-75" style="box-shadow: 0px 8px 8px rgba(50, 50, 71, 0.08), 0px 8px 16px rgba(50, 50, 71, 0.06);">
              <div class="row">
                <div class="col flex">
                  <div class="mb-25 mr-1"><small class="text-muted">${seriesName}</small></div>
                  <div class="font-weight-bolder text-dark mb-0 h4 text-sm">${seriesValue}</div>
                </div>
              </div>
              <div class="text-muted">${seriesMonth} - ${seriesYear}</div>
            </div>`
          },
        },
      },
      filterChart: moment()
        .format('YYYY-MM-DD'),
      yearLabel: [],
      items: [],
      fields: [
        {
          key: 'customer_name',
          label: 'Nama Pelanggan',
          thClass: 'font-bold text-black',
          class: 'align-middle text-black',
          sortable: true,
        },
        {
          key: 'customer_phone',
          label: 'No. HP',
          thClass: 'font-bold',
          class: 'align-middle text-black',
        },
        {
          key: 'customer_address',
          label: 'Alamat',
          thClass: 'font-bold',
          class: 'align-middle text-black',
        },
        {
          key: 'total_order',
          label: 'Total Order',
          thClass: 'font-bold pr-1',
          class: 'align-middle text-black',
          sortable: true,
        },
        {
          key: 'total_pcs',
          label: 'Total Pcs',
          thClass: 'font-bold',
          class: 'align-middle p-1 text-black',
          sortable: true,
        },
        {
          key: 'total_spent',
          label: 'Total Belanja',
          thClass: 'font-bold',
          class: 'align-middle p-1 text-black',
          sortable: true,
        },
        {
          key: 'last_order',
          label: 'Terakhir Order',
          thClass: 'font-bold',
          class: 'align-middle p-1 text-black',
          sortable: true,
        },
      ],
      currentPage: 1,
      totalRows: 0,
      optionsPage: [50, 100, 200],
      totalPerPage: 50,
    }
  },
  watch: {
    currentPage: {
      handler() {
        this.getCustomer()
      },
    },
    filterChart: {
      handler() {
        this.getCustomerGrowth()
      },
    },
    provinceName: {
      handler() {
        this.getCustomer()
      },
    },
  },
  created() {
    this.getCustomer()
  },
  mounted() {
    this.getCustomerGrowth()
    this.getProvince()
  },
  methods: {
    async getCustomerGrowth() {
      this.isLoading = true
      const params = {}
      Object.assign(params, {
        filter: this.formatDateFilter(this.filterChart),
      })
      await this.$http_komship('/v1/customer/contact-growth', { params })
        .then(res => {
          const { data } = res.data
          this.seriesChart = [
            {
              name: 'Pelanggan',
              data: data.map(item => isEmpty(item.total.total_contact) && item.total.total_contact),
            },
          ]
          this.chartOptions = {
            ...this.chartOptions,
            xaxis: {
              ...this.chartOptions.xaxis,
              categories: data.map(item => item.total.month),
              min: data.map(item => item.total.year),
            },
          }
          this.isLoading = false
        })
        .catch(err => {
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Failure',
                icon: 'AlertCircleIcon',
                text: err.message,
                variant: 'danger',
              },
            },
            2000,
          )
          this.isLoading = false
        })
    },
    async getCustomer() {
      const params = {}
      Object.assign(params, { search: this.search })
      Object.assign(params, { province_name: this.provinceName })
      Object.assign(params, { total_per_page: this.totalPerPage })
      Object.assign(params, { page: this.currentPage })
      await this.$http_komship.get('/v2/customers', { params })
        .then(async res => {
          const { data } = res.data.data
          this.items = data
          // eslint-disable-next-line array-callback-return
          await this.items.map((item, index) => {
            // eslint-disable-next-line global-require
            if (item.is_whatsapp === 0) Object.assign(this.items[index], { wa_icon: require('@/assets/images/icons/icon-wa-notactive.svg') })
            Object.assign(this.items[index], { text_color: 'black' })
          })
          this.totalRows = res.data.data.total
          this.isLoading = false
          this.$forceUpdate()
        })
        .catch(err => {
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Failure',
                icon: 'AlertCircleIcon',
                text: err.message,
                variant: 'danger',
              },
            },
            2000,
          )
          this.isLoading = false
        })
    },
    async getDownloadContact() {
      await this.$http_komship.get('/v1/customer/export')
        .then(res => {
          const { data } = res
          const a = document.createElement('a')
          a.href = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${data}`
          a.download = 'Data Kontak.xls'
          a.click()
        })
        .catch(err => {
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Failure',
                icon: 'AlertCircleIcon',
                text: err.message,
                variant: 'danger',
              },
            },
            2000,
          )
          this.isLoading = false
        })
    },
    async getProvince() {
      await this.$http_komship.get('/v1/provinces')
        .then(res => {
          const { data } = res.data
          this.provinces = data
        })
        .catch(err => {
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Failure',
                icon: 'AlertCircleIcon',
                text: err.message,
                variant: 'danger',
              },
            },
            2000,
          )
          this.isLoading = false
        })
    },
    handlePhone(data) {
      if (data.item.is_whatsapp === 1) {
        window.open(`https://wa.me/62${data.item.customer_phone.substring(1)}`, '_blank')
      }
    },
    formatRupiah(value) {
      const data = new Intl.NumberFormat('id-ID').format(value)
      return data
    },
    formatDate(value) {
      return moment(value)
        .format('DD MMMM YYYY')
    },
    searchData: _.debounce(function search() {
      this.getCustomer()
    }, 1000),
    setPerPage(page) {
      this.totalPerPage = page
      this.getCustomer()
    },
    filterDataByProvince(value) {
      this.provinceName = value
    },
    handleTextDropdown(value) {
      if (value) {
        return value
      }
      return 'Semua Provinsi'
    },
    formatDateFilter(value) {
      return moment(value)
        .startOf('year')
        .format('YYYY')
        .valueOf()
    },
    handleToDetail(value) {
      const idCustomer = value[0].customer_id
      this.$router.push({
        path: `/info-customer/detail-customer/${idCustomer}`,
      })
    },
    handleHoverButtonWa(data) {
      if (data.item.is_whatsapp === 1) {
        // eslint-disable-next-line global-require, no-param-reassign
        data.item.wa_icon = require('@/assets/images/icons/whatsapp.svg')
        this.$forceUpdate()
      }
      // eslint-disable-next-line no-param-reassign
      data.item.text_color = '#34A770'
      this.$forceUpdate()
    },
    handleLeaveHoverButtonWa(data) {
      if (data.item.is_whatsapp === 1) {
        // eslint-disable-next-line global-require, no-param-reassign
        data.item.wa_icon = require('@/assets/images/icons/icon-wa-notactive.svg')
        this.$forceUpdate()
      }
      // eslint-disable-next-line no-param-reassign
      data.item.text_color = 'black'
      this.$forceUpdate()
    },
  },
}
</script>

<style scoped>
.card-graphic {
  border: 1px solid #E2E2E2;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
}

.btn-outline-primary:not(:disabled):not(.disabled):active, .btn-outline-primary:not(:disabled):not(.disabled).active, .btn-outline-primary:not(:disabled):not(.disabled):focus {
  background-color: transparent;
}
</style>
