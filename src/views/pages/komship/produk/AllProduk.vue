<template>
  <b-col>
    <b-form @submit.prevent>
      <b-row>
        <b-col cols="12">
          <b-form-group>
            <b-row class="d-flex justify-content-end align-items-center mt-2 mr-50">
              <b-col
                md="3"
                class="text-center"
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
              <b-col md="auto">
                <b-button
                  id="popover-button-danger"
                  v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                  variant="primary"
                  size="sm"
                  class="btn-icon"
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
                          class="ml-50"
                        >
                          <b-form-group
                            label="Stok"
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
                            label="Terjual"
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
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>
    <b-row class="mt-1">
      <b-col
        cols="12"
        class=""
      >
        <b-overlay
          variant="light"
          :show="loading"
          spinner-variant="primary"
          blur="0"
          opacity=".5"
          rounded="sm"
        >
          <b-table
            ref="table"
            striped
            hover
            responsive
            class="position-relative border"
            empty-text="Tidak ada data untuk ditampilkan."

            :show-empty="!loading"
            :items="tableProvider"
            :fields="fields"
            :busy.sync="loading"
          >
            <template #cell(product_name)="data">
              <div class="d-flex align-items-center">
                <b-avatar
                  square
                  size="50px"
                  variant="light-primary"
                  :src="data.item.product_image[0]"
                />
                <div>
                  <p class="ml-1">
                    <strong> {{ data.item.product_name }} </strong>
                  </p>
                  <small class="text-secondary ml-1">SKU : {{ data.item.sku }}</small>
                </div>
              </div>
            </template>

            <template #cell(variant)>
              <b-table
                :fields="variantFieldsTable"
                :items="tableProvider"
                :head-variant="headVariant"
              >

                <template #cell(variant)="dataVariant">
                  <div
                    v-for="(itemVariant, index) in dataVariant.item.variant"
                    :key="index+1"
                  >
                    {{ itemVariant.variant }}
                  </div>
                </template>

                <template #cell(price)="dataVariant">
                  <div
                    v-for="(variantPrice, index) in dataVariant.item.variant"
                    :key="index+1"
                  >
                    Rp. {{ variantPrice.price }}
                  </div>
                </template>

                <template #cell(stock)="dataVariant">
                  <div
                    v-for="(stockVariant, index) in dataVariant.item.variant"
                    :key="index+1"
                  >
                    {{ stockVariant.stock }}
                  </div>
                </template>

                <template #cell(sold)="dataVariant">
                  <div
                    v-for="(variantSold, index) in dataVariant.item.variant"
                    :key="index+1"
                  >
                    {{ variantSold.sold }}
                  </div>
                </template>

              </b-table>
              <app-collapse>
                <app-collapse-item title="Tampilkan Variasi Lainnya">
                  <b-table
                    :fields="variantFieldsTable"
                    :items="tableProvider"
                  >

                    <template #cell(variant)="dataVariant">
                      <div
                        v-for="(itemVariant, index) in dataVariant.item.variant"
                        :key="index+1"
                      >
                        {{ itemVariant.variant }}
                      </div>
                    </template>

                    <template #cell(price)="dataVariant">
                      <div
                        v-for="(variantPrice, index) in dataVariant.item.variant"
                        :key="index+1"
                      >
                        Rp. {{ variantPrice.price }}
                      </div>
                    </template>

                    <template #cell(stock)="dataVariant">
                      <div
                        v-for="(stockVariant, index) in dataVariant.item.variant"
                        :key="index+1"
                      >
                        {{ stockVariant.stock }}
                      </div>
                    </template>

                    <template #cell(sold)="dataVariant">
                      <div
                        v-for="(variantSold, index) in dataVariant.item.variant"
                        :key="index+1"
                      >
                        {{ variantSold.sold }}
                      </div>
                    </template>

                  </b-table>
                </app-collapse-item>
              </app-collapse>
            </template>

            <template #cell(action)>
              <b-button
                variant="flat-secondary"
                class="btn-icon"
                tag="router-link"
                :to="{name: $route.meta.routeEdit}"
              >
                <feather-icon
                  icon="EditIcon"
                />
              </b-button>
            </template>

          </b-table>
        </b-overlay>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import {
  BRow,
  BCol,
  BForm,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupPrepend,
  BButton,
  BImg,
  BTable,
  BAvatar,
  VBPopover,
  BPopover,
  BOverlay,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import useJwt from '@/auth/jwt/useJwt'
import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'
import axios2 from '../setting-kompship/baseUrl2'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupPrepend,
    BButton,
    BImg,
    BTable,
    BAvatar,
    BPopover,
    BForm,
    BOverlay,
    AppCollapse,
    AppCollapseItem,
  },
  directives: {
    'b-popover': VBPopover,
    Ripple,
  },
  data() {
    return {
      defaultFilter: 0,
      headVariant: null,

      loading: false,
      variantFieldsTable: [
        {
          key: 'variant',
          label: 'Variasi',
          thClass: 'border-0 bg-white',
          tdClass: 'border-0',
        },
        {
          key: 'price',
          label: 'Harga',
          thClass: 'border-0 bg-white',
          tdClass: 'border-0',
        },
        {
          key: 'stock',
          label: 'Stock',
          thClass: 'border-0 bg-white',
          tdClass: 'border-0',
        },
        {
          key: 'sold',
          label: 'Terjual',
          thClass: 'border-0 bg-white',
          tdClass: 'border-0',
        },
      ],

      fields: [
        {
          key: 'product_name', label: 'Nama Produk',
        },
        {
          key: 'variant',
          label: 'Variasi',
          thClass: 'text-center',
        },
        {
          key: 'action', label: 'Aksi',
        },
      ],
      items: [],
    }
  },
  methods: {
    tableProvider() {
      return axios2.get('/v1/product', {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(response => {
        const { data } = response.data
        console.log(data)
        data.forEach(this.myLoop)
        return data
      })
    },
    myLoop(data) {
      data.variant.forEach(this.myVariant)
    },
    myVariant(data) {
      console.log(data)
    },
    tes(data) {
      console.log(data)
    },
  },
}
</script>

<style scoped>

[dir] .background-table-variant {
  background: #FFF;
}

</style>
