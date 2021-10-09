<template>
  <div class="data-order-header-filter-wrapper">
    <div
      id="popoverDataOrderFilter1"
      class="org-button filter-button ml-1"
      @click="() => handleShowFilter('popoverDataOrderFilter1')"
    >
      <img
        src="@/assets/images/icons/filter-icon-kompship.png"
      >
    </div>

    <b-popover
      id="popoverDataOrderFilter1"
      ref="popoverDataOrderFilter1"
      target="popoverDataOrderFilter1"
      triggers="click"
      placement="bottomleft"
    >
      <b-form-group
        label="Tanggal"
        label-for="dateInput"
      >
        <date-range-picker
          id="dateInput"
          ref="dateInput"
          v-model="dateRange"
          :locale-data="locale"
          :opens="'left'"
          :ranges="ranges"
          class="w-100 mr-1"
        >
          <template v-slot:input="picker">
            <div class="d-flex justify-content-between align-items-center">
              <span class="mr-2">{{ formatDate(picker.startDate) }} - {{ formatDate(picker.endDate) }}</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 2V5"
                  stroke="#222222"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16 2V5"
                  stroke="#222222"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3.5 9.08984H20.5"
                  stroke="#222222"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                  stroke="#222222"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15.6947 13.7002H15.7037"
                  stroke="#222222"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15.6947 16.7002H15.7037"
                  stroke="#222222"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11.9955 13.7002H12.0045"
                  stroke="#222222"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11.9955 16.7002H12.0045"
                  stroke="#222222"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.29431 13.7002H8.30329"
                  stroke="#222222"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.29431 16.7002H8.30329"
                  stroke="#222222"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </template>
        </date-range-picker>
      </b-form-group>
      <b-form-group
        label="Produk"
        label-for="productInput"
      >
        <b-form-input
          id="productInput"
          v-model="chooseProduct"
          placeholder="Pilih produk"
        />
      </b-form-group>
      <b-form-group
        label="Metode Pembayaran"
        label-for="metodeInput"
      >
        <v-select
          id="metodeInput"
          label="value"
          label-cols-md="2"
          :value="selectedExp"
          :options="listExpedition"
          @input="onAddExpedition"
        />
      </b-form-group>
      <b-button
        class="sm-gap-r white-button"
        variant="outline-warning"
        @click="resetFilter"
      >
        Reset
      </b-button>
      <b-button
        variant="warning org-button"
        @click="submitFilter"
      >
        Terapkan
      </b-button>
    </b-popover>
  </div>
</template>

<script>
import {
  BButton,
  BFormGroup,
  BFormInput,
  BPopover,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import moment from 'moment'
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

export default {
  components: {
    BButton,
    BFormGroup,
    BFormInput,
    BPopover,
    DateRangePicker,
    vSelect,
  },
  data() {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const last7 = new Date()
    last7.setDate(today.getDate() - 7)
    last7.setHours(0, 0, 0, 0)

    const last30 = new Date()
    last30.setDate(today.getDate() - 30)
    last30.setHours(0, 0, 0, 0)

    const firstDateOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    const lastDateOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
    return {
      selectedExp: ['COD'],
      chooseProduct: '',
      dateRange: {
        startDate: today,
        endDate: today,
      },
      ranges: {
        '7 Hari Terakhir': [last7, today],
        '30 Hari Terakhir': [last30, today],
        'Bulan Ini': [firstDateOfMonth, lastDateOfMonth],
      },
      locale: {
        format: 'dd/mm/yyyy',
      },
      listExpedition: [
        { key: 'code', value: 'COD' },
        { key: 'transfer', value: 'Transfer' },
      ],
      filterForm: {
        date: '',
        product: '',
        method: null,
      },
    }
  },
  methods: {
    formatDate(d) {
      return moment(d).format('D MMM YYYY')
    },
    handleShowFilter(popOverId) {
      this.$root.$emit('bv::show::popover', popOverId)
    },
    onAddExpedition(itemSelected) {
      if (itemSelected && itemSelected.value) {
        if (this.selectedExp.indexOf(itemSelected.value) > -1) {
          this.selectedExp.splice(this.selectedExp.indexOf(itemSelected.value), 1)
        } else {
          this.selectedExp.push(itemSelected.value)
        }
      } else {
        this.selectedExp = []
      }
    },
    submitFilter() {
      this.filterForm = {
        date: this.dateRange,
        product: this.selectedExp && this.selectedExp.length > 0 ? this.selectedExp[0].toLowerCase() : '',
        method: this.chooseProduct,
      }
      this.$emit('onFormSubmit', this.filterForm)
    },
    resetFilter() {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      this.chooseProduct = ''
      this.selectedExp = []
      this.dateRange = {
        startDate: today,
        endDate: today,
      }
      this.filterForm = {
        date: '',
        product: '',
        method: null,
      }
      this.$emit('onFormSubmit', this.filterForm)
    },
  },
}
</script>

<style lang="scss">
  @import '~@core/scss/vue/libs/vue-select.scss';
</style>
