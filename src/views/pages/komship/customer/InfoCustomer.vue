<template>
  <b-card>
    <h4><strong>Pelanggan</strong></h4>
    <b-row class="d-flex justify-content-end align-items-center">
      <b-col
        cols="3"
      >
        <b-input-group class="input-group-merge">
          <b-input-group-prepend is-text>
            <feather-icon icon="SearchIcon" />
          </b-input-group-prepend>
          <b-form-input
            v-model="customerName"
            placeholder="Masukan Nama Pelanggan"
            @input="fetchDataCustomer"
          />
        </b-input-group>
      </b-col>
      <b-col
        cols="auto"
      >
        <b-dropdown
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          right
          no-caret
          variant="primary"
        >
          <template
            #button-content
          >
            <feather-icon icon="SlidersIcon" />
          </template>
          <b-dropdown-form
            style="width: 417px;"
          >
            <b-form>
              <b-row>
                <b-col
                  cols="12"
                  class="mt-50 pr-2 pl-2"
                >
                  <b-form-group
                    label="Daerah"
                  >
                    <v-select
                      v-model="destination"
                      label="label"
                      :options="itemsDestinations"
                      :reduce="items => items.city_name"
                      placeholder="Masukan nama Provinsi atau Kota"
                      @search="onSearchDestination"
                    />
                  </b-form-group>
                </b-col>

                <b-col
                  cols="12"
                  class="ml-50"
                >
                  <b-form-group
                    label="Uang Dihabiskan"
                  >
                    <div class="d-flex justify-content-center align-items-center">
                      <b-form-input
                        v-model="spentFrom"
                        class=""
                        placeholder="Rp 10.000.000"
                      />
                      <b-button
                        class="btn-icon"
                        variant="flat-dark"
                        disabled
                      >
                        <feather-icon
                          icon="MinusIcon"
                        />
                      </b-button>
                      <b-form-input
                        v-model="spentTo"
                        class="mr-1"
                        placeholder="Rp 10.000.000"
                      />
                    </div>
                  </b-form-group>
                </b-col>

                <b-col
                  cols="12"
                  class="ml-50 mt-50"
                >
                  <b-form-group
                    label="Pcs"
                  >
                    <div class="d-flex justify-content-center align-items-center">
                      <b-form-input
                        v-model="pcsFrom"
                        class=""
                        placeholder="0"
                      />
                      <b-button
                        class="btn-icon"
                        variant="flat-dark"
                        disabled
                      >
                        <feather-icon
                          icon="MinusIcon"
                        />
                      </b-button>
                      <b-form-input
                        v-model="pcsTo"
                        class="mr-1"
                        placeholder="0"
                      />
                    </div>
                  </b-form-group>
                </b-col>

                <b-col
                  cols="12"
                  class="ml-50 mt-50"
                >
                  <b-form-group
                    label="Total Order"
                  >
                    <div class="d-flex justify-content-center align-items-center">
                      <b-form-input
                        v-model="orderFrom"
                        class=""
                        placeholder="0"
                      />
                      <b-button
                        class="btn-icon"
                        variant="flat-dark"
                        disabled
                      >
                        <feather-icon
                          icon="MinusIcon"
                        />
                      </b-button>
                      <b-form-input
                        v-model="orderTo"
                        class="mr-1"
                        placeholder="0"
                      />
                    </div>
                  </b-form-group>
                </b-col>

                <!-- submit and reset -->
                <b-col
                  cols="12"
                  class="ml-50 mt-1"
                >
                  <b-button
                    v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                    type="reset"
                    variant="outline-primary"
                    class="mr-1"
                    @click="resetFilter"
                  >
                    Reset
                  </b-button>

                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    variant="primary"
                    @click="fetchDataCustomer"
                  >
                    Terapkan
                  </b-button>
                </b-col>
              </b-row>
            </b-form>
          </b-dropdown-form>
        </b-dropdown>
      </b-col>
    </b-row>

    <b-overlay
      variant="light"
      :show="loading"
      spinner-variant="primary"
      blur="0"
      opacity=".5"
      rounded="sm"
    >
      <b-table
        id="pagination"
        striped
        hover
        responsive
        class="position-relative mt-2"
        empty-text="Tidak ada data untuk ditampilkan."
        :items="itemsCustomer"
        :fields="fields"
        :show-empty="!loading"
        @row-clicked="onRowClicked"
      >

        <template #head(customer_name)="data">
          <span class="capitalizeText">{{ data.label }}</span>
        </template>
        <template #head(customer_address)="data">
          <span class="capitalizeText">{{ data.label }}</span>
        </template>
        <template #head(total_order)="data">
          <b-row class="align-items-center">
            <span class="capitalizeText mr-50">{{ data.label }}</span>
            <b-button
              v-if="sortOrderMode === ''"
              variant="flat-dark"
              class="btn-icon d-flex align-items-center"
              size="sm"
              @click="sortDataOrderDesc"
            >
              <feather-icon
                icon="CodeIcon"
              />
            </b-button>
            <b-button
              v-if="sortOrderMode === 'ASC'"
              variant="flat-dark"
              class="btn-icon d-flex align-items-center"
              size="sm"
              @click="sortDataOrderDesc"
            >
              <feather-icon
                icon="ArrowUpIcon"
              />
            </b-button>
            <b-button
              v-if="sortOrderMode === 'DESC'"
              variant="flat-dark"
              class="btn-icon d-flex align-items-center"
              size="sm"
              @click="sortDataOrderAsc"
            >
              <feather-icon
                icon="ArrowDownIcon"
              />
            </b-button>
          </b-row>
        </template>
        <template #head(total_pcs)="data">
          <b-row class="align-items-center">
            <span class="capitalizeText mr-50">{{ data.label }}</span>
            <b-button
              v-if="sortPcsMode === ''"
              variant="flat-dark"
              class="btn-icon d-flex align-items-center"
              size="sm"
              @click="sortDataPcsDesc"
            >
              <feather-icon
                icon="CodeIcon"
              />
            </b-button>
            <b-button
              v-if="sortPcsMode === 'ASC'"
              variant="flat-dark"
              class="btn-icon d-flex align-items-center"
              size="sm"
              @click="sortDataPcsDesc"
            >
              <feather-icon
                icon="ArrowUpIcon"
              />
            </b-button>
            <b-button
              v-if="sortPcsMode === 'DESC'"
              variant="flat-dark"
              class="btn-icon d-flex align-items-center"
              size="sm"
              @click="sortDataPcsAsc"
            >
              <feather-icon
                icon="ArrowDownIcon"
              />
            </b-button>
          </b-row>
        </template>
        <template #cell(total_spent)="data">
          <span class="capitalizeText">Rp {{ formatPrice(data.item.total_spent) }}</span>
        </template>
        <template #head(last_order)="data">
          <span class="capitalizeText">{{ data.label }}</span>
        </template>
      </b-table>
    </b-overlay>
    <b-row class="justify-content-between mt-5 mx-50 mb-2">
      <div>
        <span class="text-black mr-1">
          List Per halaman
        </span>
        <b-button
          v-for="(page, index) in pageItems"
          :key="index+1"
          class="btn-icon"
          :variant="page === perPage ? 'primary' : 'flat-primary'"
          size="sm"
          @click="setPerPage(page)"
        >
          {{ page }}
        </b-button>
      </div>
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        first-number
        last-number
        class="pagination-primary"
      />
    </b-row>
  </b-card>
</template>
<script>
import {
  BCol,
  BFormInput,
  BInputGroup,
  BInputGroupPrepend,
  BButton,
  BRow,
  BTable,
  BForm,
  BFormGroup,
  BCard,
  BPagination,
  BOverlay,
  VBPopover,
  BDropdown,
  BDropdownForm,
} from 'bootstrap-vue'

import Ripple from 'vue-ripple-directive'
import { dateFormat } from '@core/mixins/ui/date'
import vSelect from 'vue-select'

export default {
  components: {
    BCard,
    BCol,
    BFormInput,
    BInputGroup,
    BInputGroupPrepend,
    BButton,
    BRow,
    BTable,
    BForm,
    BFormGroup,
    BOverlay,
    vSelect,
    BPagination,
    BDropdown,
    BDropdownForm,
  },
  directives: {
    'b-popover': VBPopover,
    Ripple,
  },
  mixins: [dateFormat],

  data() {
    return {
      loading: false,
      selected: 1,
      filterCustomer: null,
      options: [
        { value: 1, text: 'Kabupaten' },
      ],
      fields: [
        {
          key: 'customer_name',
          label: 'Nama Pelanggan',
          sortable: true,
        },
        {
          key: 'customer_address',
          label: 'Alamat',
          tdClass: 'capitalizeText',
        },
        {
          key: 'total_order',
          label: 'Total Order',
          tdClass: 'text-center',
        },
        {
          key: 'total_pcs',
          label: 'Total Pcs',
          tdClass: 'text-center',
        },
        {
          key: 'total_spent',
          label: 'Uang Dihabiskan',
          sortable: true,
        },
        {
          key: 'last_order',
          label: 'Terakhir Order',
          sortable: true,
          formatter: value => {
            if (!value || value === '00-00-0000') return '-'
            value.split('')
            const newFormat = []
            newFormat.push(value[6])
            newFormat.push(value[7])
            newFormat.push(value[8])
            newFormat.push(value[9])
            newFormat.push(value[2])
            newFormat.push(value[3])
            newFormat.push(value[4])
            newFormat.push(value[5])
            newFormat.push(value[0])
            newFormat.push(value[1])
            newFormat.join('')
            return this.dateFormat(String(newFormat.join('')), 'dd mmmm yyyy')
          },
        },
      ],

      itemsCustomer: [],
      productName: '',
      spentFrom: null,
      spentTo: null,
      orderFrom: null,
      orderTo: null,
      pcsFrom: null,
      pcsTo: null,
      area: '',
      destination: '',
      itemsDestinations: [],

      customerName: '',

      endpoint: null,
      url: '/v2/customers',
      loadTable: false,

      pageItems: [50, 100, 200],
      totalRows: 0,
      currentPage: 1,
      perPage: 50,

      sortOrderMode: '',
      sortPcsMode: '',

    }
  },

  watch: {
    currentPage: {
      handler(value) {
        this.fetchDataCustomer()
      },
    },
  },
  mounted() {
    this.fetchDataCustomer()
  },
  methods: {
    fetchDataCustomer() {
      this.loading = true
      const params = {
        customer_name: this.customerName,
        orderFrom: this.orderFrom,
        orderTo: this.orderTo,
        area: this.destination,
        spentFrom: this.spentFrom,
        spentTo: this.spentTo,
        pcsFrom: this.pcsFrom,
        pcsTo: this.pcsTo,
        page: this.currentPage,
        limits: this.perPage,
      }
      if (this.sortOrderMode !== '') Object.assign(params, { sort_order: this.sortOrderMode })
      if (this.sortPcsMode !== '') Object.assign(params, { sort_pcs: this.sortPcsMode })
      this.$http_komship.get('v2/customers',
        {
          params,
        }).then(response => {
        const { data } = response.data.data
        this.itemsCustomer = data
        this.totalRows = response.data.data.total
        this.loading = false
      })
    },
    onSearchDestination(search, loading) {
      if (search.length) {
        this.searchDestination(loading, search, this)
      }
    },
    searchDestination: _.debounce((loading, search, that) => {
      loading(true)
      that.loadDestination(search)
      loading(false)
    }, 1000),
    loadDestination(search) {
      this.$http_komship.get(`/v1/destination?search=${search}`).then(response => {
        const { data } = response.data.data
        this.itemsDestinations = data
        return this.itemsDestinations
      })
    },
    resetFilter() {
      this.customerName = ''
      this.orderTo = null
      this.orderTo = null
      this.destination = ''
      this.spentFrom = null
      this.spentTo = null
      this.pcsFrom = null
      this.pcsTo = null
      this.fetchDataCustomer()
    },
    formatPrice(value) {
      const val = value
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    onRowClicked(item) {
      this.$router.push({
        name: this.$route.meta.routeDetail,
        params: { customer_id: item.customer_id },
      })
    },
    setPerPage(page) {
      this.perPage = page
      this.fetchDataCustomer()
    },
    sortDataOrderAsc() {
      this.sortOrderMode = 'ASC'
      this.sortPcsMode = ''
      this.fetchDataCustomer()
    },
    sortDataOrderDesc() {
      this.sortOrderMode = 'DESC'
      this.sortPcsMode = ''
      this.fetchDataCustomer()
    },
    sortDataPcsAsc() {
      this.sortPcsMode = 'ASC'
      this.sortOrderMode = ''
      this.fetchDataCustomer()
    },
    sortDataPcsDesc() {
      this.sortPcsMode = 'DESC'
      this.sortOrderMode = ''
      this.fetchDataCustomer()
    },
  },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
.capitalizeText {
  text-transform: capitalize;
}
</style>
