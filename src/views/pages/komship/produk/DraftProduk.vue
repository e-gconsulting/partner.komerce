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
      <b-table
        ref="table"
        striped
        hover
        responsive
        class="position-relative"
        empty-text="Tidak ada data untuk ditampilkan."

        :items="items"
        :fields="fields"
      >
        <template #cell(name_produk)="data">
          <div class="d-flex align-items-center">
            <b-avatar
              square
              size="50px"
            />
            <div>
              <p class="ml-1">
                <strong> {{ data.value }} </strong>
              </p>
              <small class="text-secondary ml-1">SKU : JBB-1</small>
            </div>
          </div>
        </template>

        <template #cell(action)>
          <b-button
            variant="flat-secondary"
            class="btn-icon"
          >
            <feather-icon
              icon="EditIcon"
            />
          </b-button>
        </template>

      </b-table>
    </b-row>
  </b-col>
</template>

<script>
import {
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
  VBPopover,
  BPopover,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import useJwt from '@/auth/jwt/useJwt'
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
  },
  directives: {
    'b-popover': VBPopover,
    Ripple,
  },
  data() {
    return {
      defaultFilter: 0,

      fields: [
        {
          key: 'name_produk', label: 'Nama Produk',
        },
        {
          key: 'variation', label: 'Variasi',
        },
        {
          key: 'price', label: 'Harga',
        },
        {
          key: 'stock', label: 'Stock',
        },
        {
          key: 'sold', label: 'Terjual',
        },
        {
          key: 'action', label: 'Aksi',
        },
      ],
      items: [
        {
          name_produk: 'RTX 3090TI',
          variation: 'Nvidia',
          price: 'Rp. 50.000.000',
          stock: 9,
          sold: 9,
        },
        {
          name_produk: 'RTX 3080TI',
          variation: 'Nvidia',
          price: 'Rp. 40.000.000',
          stock: 9,
          sold: 9,
        },
        {
          name_produk: 'RTX 3070TI',
          variation: 'Nvidia',
          price: 'Rp. 30.000.000',
          stock: 9,
          sold: 9,
        },
        {
          name_produk: 'RTX 3060TI',
          variation: 'Nvidia',
          price: 'Rp. 20.000.000',
          stock: 9,
          sold: 9,
        },
      ],
    }
  },
  mounted() {
    this.tableProvider()
  },
  methods: {
    tableProvider() {
      return axios2.get('/v1/product',
        {
          headers: { Authorization: `Bearer ${useJwt.getToken()}` },
        }).then(response => {
        const { data } = response.data
        console.log(data)
      })
    },
  },
}
</script>
