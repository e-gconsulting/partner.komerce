<template>
  <b-card-actions
    ref="formCard"
    :title="$route.meta.name.singular"
    no-actions
    no-body
  >
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
            <b-form @submit.prevent>
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
                          v-model="defaultFilter"
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
                        v-model="defaultFilter"
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
                        v-model="defaultFilter"
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
                        v-model="defaultFilter"
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
                        v-model="defaultFilter"
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
                        v-model="defaultFilter"
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
                        v-model="defaultFilter"
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
                        v-model="defaultFilter"
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
                  >
                    Reset
                  </b-button>

                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    type="submit"
                    variant="primary"
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

    <b-row>
      <b-table
        :items="items"
        :fields="fields"
        class="mt-2"
      >

        <template #cell(action)>
          <b-button
            size="sm"
            variant="flat-info"
            tag="router-link"
            :to="{ name: $route.meta.routeDetail }"
          >
            Lihat Detail
          </b-button>
        </template>

      </b-table>
    </b-row>
  </b-card-actions>
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
} from 'bootstrap-vue'
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'
import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BCardActions,
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
  },
  directives: {
    'b-popover': VBPopover,
    Ripple,
  },
  data() {
    return {
      selected: 1,
      options: [
        { value: 1, text: 'Kabupaten' },
      ],

      fields: [
        {
          key: 'name_customer', label: 'Nama Customer',
        },
        {
          key: 'address', label: 'Alamat',
        },
        {
          key: 'total_order', label: 'Total Order',
        },
        {
          key: 'total_pcs', label: 'Total Pcs',
        },
        {
          key: 'uang_dihabiskan', label: 'Uang Dihabiskan',
        },
        {
          key: 'last_order', label: 'Terakhir Order',
        },
        {
          key: 'action', label: 'Aksi',
        },
      ],

      items: [
        {
          name_customer: 'Cankun',
          address: 'Bocari',
          total_order: 10,
          total_pcs: '100',
          uang_dihabiskan: 'Rp. 1.000',
          last_order: '01 Januari 2000',
        },
        {
          name_customer: 'Cankun Bagus',
          address: 'Bocari',
          total_order: 20,
          total_pcs: '200',
          uang_dihabiskan: 'Rp. 2.000',
          last_order: '01 Januari 2001',
        },
        {
          name_customer: 'Candra',
          address: 'Bocari',
          total_order: 30,
          total_pcs: '300',
          uang_dihabiskan: 'Rp. 3.000',
          last_order: '01 Januari 2002',
        },
        {
          name_customer: 'Candra Dajal',
          address: 'Bocari',
          total_order: 40,
          total_pcs: '400',
          uang_dihabiskan: 'Rp. 4.000',
          last_order: '01 Januari 2003',
        },
        {
          name_customer: 'Leksana Budi Candra',
          address: 'Bocari',
          total_order: 50,
          total_pcs: '500',
          uang_dihabiskan: 'Rp. 5.000',
          last_order: '01 Januari 2004',
        },
        {
          name_customer: 'Candra Budi leksana',
          address: 'Bocari',
          total_order: 0,
          total_pcs: '600',
          uang_dihabiskan: 'Rp. 6.000',
          last_order: '01 Januari 2005',
        },
      ],
    }
  },
}
</script>
