<template>
  <b-card>
    <b-row class="d-flex justify-content-end align-items-center">
      <b-col
        cols="3"
      >
        <b-input-group class="input-group-merge">
          <b-input-group-prepend is-text>
            <feather-icon icon="SearchIcon" />
          </b-input-group-prepend>
          <b-form-input
            placeholder="Example"
          />
        </b-input-group>
      </b-col>
      <b-col
        cols="auto"
      >
        <b-button
          id="popover-button-danger"
          v-ripple.400="'rgba(234, 84, 85, 0.15)'"
          variant="primary"
          size="sm"
          class="btn-icon mr-2"
        >
          <b-img
            fluid
            src="@core/assets/image/filter-icon-kompship.png"
          />
        </b-button>
        <b-popover
          target="popover-button-danger"
          variant="danger"
          triggers="focus"
          placement="bottom"
        >
          <b-row class="p-50">
            <b-form>
              <b-row>
                <b-col
                  cols="12"
                  class="ml-50 mt-50"
                >
                  <b-form-group
                    label="Daerah"
                  >
                    <div class="d-flex justify-content-center align-items-center">
                      <b-col
                        md="5"
                        class="pl-0"
                      >
                        <b-form-select
                          v-model="selected"
                          :options="options"
                        />
                      </b-col>
                      <b-col
                        md="7"
                        class="pl-0"
                      >
                        <b-form-input
                          v-model="area"
                          class="mr-1"
                        />
                      </b-col>
                    </div>
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
                      />
                    </div>
                  </b-form-group>
                </b-col>

                <b-col
                  cols="12"
                  class="ml-50 mt-50"
                >
                  <b-form-group
                    label="Produk"
                  >
                    <div class="d-flex justify-content-center align-items-center mr-1">
                      <b-form-input
                        v-model="productName"
                        class=""
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
                    type="submit"
                    variant="primary"
                    @click.prevent="filterCustomer"
                  >
                    Terapkan
                  </b-button>
                </b-col>
              </b-row>
            </b-form>
          </b-row>
        </b-popover>
      </b-col>
    </b-row>

    <b-overlay
      :show="loading"
      spinner-variant="primary"
      variant="light"
      rounded="sm"
      opacity=".5"
      blur="0"
    >
      <b-table
        ref="tables"
        striped
        hover
        responsive
        class="position-relative mt-2"
        empty-text="Tidak ada data untuk ditampilkan."

        :items="itemsCustomer"
        :fields="fields"
        :show-empty="!loading"
      >

        <template #cell(customer_name)="data">
          {{ data.item.customer_name }}
        </template>

        <template #cell(customer_address)="data">
          {{ data.item.customer_address }}
        </template>

        <template #cell(total_order)="data">
          {{ data.item.total_order }}
        </template>

        <template #cell(total_pcs)="data">
          {{ data.item.total_pcs }}
        </template>

        <template #cell(total_spent)="data">
          Rp. {{ formatPrice(data.value) }}
        </template>

        <template #cell(action)="data">
          <b-button
            size="sm"
            variant="flat-info"
            tag="router-link"
            :to="{ name: $route.meta.routeDetail, params: { customer_id: data.item.customer_id } }"
          >
            Lihat Detail
          </b-button>
        </template>

      </b-table>
    </b-overlay>
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
  BImg,
  BTable,
  VBPopover,
  BPopover,
  BForm,
  BFormGroup,
  BFormSelect,
  BCard,
  BOverlay,
} from 'bootstrap-vue'
import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'
import Ripple from 'vue-ripple-directive'
import useJwt from '@/auth/jwt/useJwt'
import { dateFormat } from '@core/mixins/ui/date'

export default {
  components: {
    BCard,
    BCol,
    BFormInput,
    BInputGroup,
    BInputGroupPrepend,
    BButton,
    BRow,
    BImg,
    BTable,
    FeatherIcon,
    BPopover,
    BForm,
    BFormGroup,
    BFormSelect,
    BOverlay,
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
      options: [
        { value: 1, text: 'Kabupaten' },
      ],

      fields: [
        {
          key: 'customer_name',
          label: 'Nama Customer',
        },
        {
          key: 'customer_address',
          label: 'Alamat',
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
        },
        {
          key: 'last_order',
          label: 'Terakhir Order',
          formatter: value => {
            if (!value || value === '00-00-0000') return '-'
            return this.dateFormat(value, 'dd mmmm yyyy')
          },
        },
        {
          key: 'action',
          label: 'Aksi',
        },
      ],

      itemsCustomer: [],

      // Params Filter
      productName: '',
      spentFrom: null,
      spentTo: null,
      orderFrom: null,
      orderTo: null,
      pcsFrom: null,
      pcsTo: null,
      area: '',

      endpoint: null,
      url: '/v1/customers',
    }
  },
  mounted() {
    this.tableProvider()
  },
  methods: {
    tableProvider() {
      this.loading = true
      this.$httpKomship.get('/v1/customers', {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(response => {
        const { data } = response.data
        this.itemsCustomer = data
        console.log(this.itemsCustomer)
        this.loading = false
        return this.itemsCustomer
      })
    },
    filterCustomer() {
      this.loading = true
      const params = {}

      if (this.orderFrom) Object.assign(params, { orderFrom: this.orderFrom })
      if (this.orderTo) Object.assign(params, { orderTo: this.orderTo })

      this.$httpKomship.get('/v1/customers', {
        params,
      }).then(response => {
        const { data } = response.data
        console.log(data)
        this.itemsCustomer = data
        console.log(this.itemsCustomer)
        this.loading = false
        return this.itemsCustomer
      })
    },
    resetFilter() {
      this.tableProvider()
    },
    formatPrice(value) {
      const val = value
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
  },
}
</script>
