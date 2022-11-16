<template>
  <div>
    <b-card body>
      <div class="d-flex align-items-center">
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
        <h4 class="my-0">
          Search Gudang
        </h4>
      </div>
      <b-row>
        <b-col lg="3" />
        <b-col lg="3" />
        <b-col lg="3" />
        <b-col
          sm="12"
          lg="3"
          class="d-flex"
        >
          <b-input-group class="input-group-merge mr-1">
            <b-input-group-prepend is-text>
              <feather-icon icon="SearchIcon" />
            </b-input-group-prepend>
            <b-form-input
              id="field-search-for-tbl"
              v-model="search"
              placeholder="Search"
              @input="searching()"
            />
          </b-input-group>
        </b-col>
        <b-col
          lg="12"
          class="mt-2"
        >
          <div
            v-for="item in items"
            :key="item.id"
            class="border rounded-lg p-1 my-1"
          >
            <b-row class="">
              <b-col
                lg="1"
              ><img
                src="@/assets/images/logo/logo.png"
                alt="logo"
              ></b-col>
              <b-col class="font-bold align-self-center">
                <div class="mb-1">
                  {{ item.name }}
                </div>
                <div>{{ item.approved_date }}</div>
              </b-col>
            </b-row>
            <b-row class="mt-1">
              <b-col lg="2">
                <p>Sektor Bisnis</p>
                <p>Tipe Bisnis</p>
              </b-col>
              <b-col lg="5">
                <p>{{ item.business_sector }}</p>
                <p>{{ item.business_type }}</p>
              </b-col>
              <b-col lg="2">
                <p>Jumlah Produk</p>
                <p>Total Terjual</p>
              </b-col>
              <b-col lg="1">
                <p>{{ item.product_total }}</p>
                <p>{{ item.total_sold }}</p>
              </b-col>
              <b-col lg="2">
                <b-button
                  class="mb-1"
                  size="sm"
                  variant="primary"
                  @click="search(item)"
                >Lihat Stock
                </b-button>
                <b-button
                  size="sm"
                  variant="outline-primary"
                  @click="chat(item.number_phone)"
                >Chat Partner
                </b-button>
              </b-col>
            </b-row>
            <hr style="height:1px; background-color:#828282; color: #828282; opacity: 0.5;">
            <div v-if="variantData.length > 0">
              <div
                v-for="(itemsData, index) in variantData"
                :key="index+1"
              >
                <b-row>
                  <b-col
                    cols="3"
                    class="pb-3"
                  >
                    <b-row class="ml-2">
                      <b-container
                        fluid
                        class="d-flex"
                      >
                        <b-img
                          v-if="itemsData.product_image[0] !== undefined"
                          :src="itemsData.product_image[0].images_path"
                          fluid
                          class="image-product"
                        />
                        <b-img
                          v-else
                          :src="require('@/assets/images/avatars/image-null.png')"
                          fluid
                          width="50"
                          class="image-product"
                        />
                        <div class="ml-1">
                          <p><strong>{{ itemsData.product_name }}</strong></p>
                          <small>SKU: {{ itemsData.sku }}</small>
                        </div>
                      </b-container>
                    </b-row>
                  </b-col>
                  <b-col
                    v-if="itemsData.variants[0] !== undefined"
                    cols="3"
                    class=""
                  >
                    <div
                      v-for="(itemsVariant, indexVariant) in itemsData.variants.slice(0,3)"
                      :key="indexVariant+1"
                    >
                      <p class="ml-2">
                        {{ itemsVariant.variant }}
                      </p>
                    </div>
                  </b-col>
                  <b-col
                    v-else
                    cols="3"
                    class=""
                  >
                    <p class="ml-2">
                      -
                    </p>
                  </b-col>
                  <b-col
                    v-if="itemsData.variants[0] !== undefined"
                    cols="2"
                    class=""
                  >
                    <div
                      v-for="(itemsVariant, indexVariant) in itemsData.variants.slice(0,3)"
                      :key="indexVariant+1"
                    >
                      <p class="ml-2">
                        Rp {{ formatPrice(itemsVariant.price) }}
                      </p>
                    </div>
                  </b-col>
                  <b-col
                    v-else
                    cols="2"
                    class=""
                  >
                    <p class="ml-2">
                      Rp {{ formatPrice(itemsData.price) }}
                    </p>
                  </b-col>
                  <b-col
                    v-if="itemsData.variants[0] !== undefined"
                    cols="2"
                    class=""
                  >
                    <div
                      v-for="(itemsVariant, indexVariant) in itemsData.variants.slice(0,3)"
                      :key="indexVariant+1"
                    >
                      <p class="ml-2">
                        {{ itemsVariant.stock }}
                      </p>
                    </div>
                  </b-col>
                  <b-col
                    v-else
                    cols="2"
                    class=""
                  >
                    <p class="ml-2">
                      {{ itemsData.stock }}
                    </p>
                  </b-col>
                  <b-col
                    v-if="itemsData.variants[0] !== undefined"
                    cols="1"
                    class=""
                  >
                    <div
                      v-for="(itemsVariant, indexVariant) in itemsData.variants.slice(0,3)"
                      :key="indexVariant+1"
                    >
                      <p class="ml-2">
                        {{ itemsVariant.sold }}
                      </p>
                    </div>
                  </b-col>
                  <b-col
                    v-else
                    cols="1"
                    class=""
                  >
                    <p class="ml-2">
                      {{ itemsData.sold }}
                    </p>
                  </b-col>
                  <b-col
                    cols="1"
                    class=""
                  >
                    <b-button
                      class="btn-icon"
                      size="sm"
                      variant="flat-dark"
                      tag="router-link"
                      :to="{ name: $route.meta.routeEdit, params: { product_id: itemsData.product_id } }"
                    >
                      <feather-icon
                        icon="EditIcon"
                      />
                    </b-button>
                    <b-button
                      class="btn-icon"
                      size="sm"
                      variant="flat-dark"
                      @click="showConfirmDelete(itemsData.product_id)"
                    >
                      <feather-icon
                        icon="Trash2Icon"
                      />
                    </b-button>
                  </b-col>
                </b-row>
                <b-col
                  cols="12"
                  class="p-0"
                >
                  <b-collapse
                    :id="`collapse-${String(index)}`"
                    class=""
                  >
                    <b-row>
                      <b-col cols="3" />
                      <b-col
                        cols="3"
                      >
                        <div
                          v-for="(itemsVariant, indexVariant) in itemsData.variants.slice(3,itemsData.variants.length)"
                          :key="indexVariant+1"
                        >
                          <p class="ml-2">
                            {{ itemsVariant.variant }}
                          </p>
                        </div>
                      </b-col>
                      <b-col
                        cols="2"
                      >
                        <div
                          v-for="(itemsVariant, indexVariant) in itemsData.variants.slice(3,itemsData.variants.length)"
                          :key="indexVariant+1"
                        >
                          <p class="ml-2">
                            Rp {{ formatPrice(itemsVariant.price) }}
                          </p>
                        </div>
                      </b-col>
                      <b-col
                        cols="2"
                      >
                        <div
                          v-for="(itemsVariant, indexVariant) in itemsData.variants.slice(3,itemsData.variants.length)"
                          :key="indexVariant+1"
                        >
                          <p class="ml-2">
                            {{ itemsVariant.stock }}
                          </p>
                        </div>
                      </b-col>
                      <b-col
                        cols="1"
                      >
                        <div
                          v-for="(itemsVariant, indexVariant) in itemsData.variants.slice(3,itemsData.variants.length)"
                          :key="indexVariant+1"
                        >
                          <p class="ml-2">
                            {{ itemsVariant.sold }}
                          </p>
                        </div>
                      </b-col>
                    </b-row>
                  </b-collapse>
                </b-col>
                <b-row
                  v-if="itemsData.variants.length > 3"
                  class="d-flex justify-content-end mb-2"
                >
                  <b-col cols="auto">
                    <div>
                      <b-button
                        v-b-toggle="`collapse-${String(index)}`"
                        variant="flat-dark"
                        size="sm"
                      >
                        <span class="when-opened">
                          Tutup
                        </span>
                        <span class="when-closed">
                          Tampilkan variasi lainnya
                        </span>
                        <feather-icon
                          icon="ChevronDownIcon"
                          class="when-closed"
                        />
                        <feather-icon
                          icon="ChevronUpIcon"
                          class="when-opened"
                        />
                      </b-button>
                    </div>
                  </b-col>
                </b-row>
                <hr>
              </div>
            </div>
            <div v-else>
              <b-col
                cols="12"
                class="text-center"
              >
                <h5 class="p-1">
                  <strong>
                    Tidak ada data untuk ditampilkan.
                  </strong>
                </h5>
              </b-col>
            </div>
          </b-container>

          <!-- Mobile -->
          <b-table
            ref="tables"
            striped
            hover
            responsive
            class="position-relative table-list-product-mobile"
            empty-text="Tidak ada data untuk ditampilkan."

            :items="variantData"
            :fields="fields"
            :show-empty="!loading"
          >
            <template #cell(product_name)="data">
              <b-row class="ml-2">
                <div
                  class="d-flex"
                  style="min-width: 300px;"
                >
                  <b-img
                    v-if="data.item.product_image[0] !== undefined"
                    variant="light-primary"
                    square
                    fluid
                    width="50"
                    class="image-product"
                    :src="data.item.product_image[0].images_path"
                  />
                  <b-img
                    v-else
                    :src="require('@/assets/images/avatars/image-null.png')"
                    fluid
                    width="50"
                    class="image-product"
                  />
                  <div class="ml-1">
                    <span><strong>{{ data.item.product_name }}</strong></span>
                    <span>SKU: {{ data.item.sku }}</span>
                  </div>
                </div>
              </b-row>
            </template>

            <template
              #cell(variants)="data"
            >
              <div v-if="data.item.variants.length > 0">
                <div
                  v-for="(itemsVariant, indexVariant) in data.item.variants.slice(0, 3)"
                  :key="indexVariant+1"
                  class="mb-50"
                >
                  {{ itemsVariant.variant }}
                </div>
                <b-collapse
                  :id="`collapse-${String(data.index)}`"
                  class=""
                >
                  <div
                    v-for="(itemsVariant, indexVariant) in data.item.variants.slice(3, data.item.variants.length)"
                    :key="indexVariant+1"
                    class="mb-50"
                  >
                    {{ itemsVariant.variant }}
                  </div>
                </b-collapse>
              </div>
              <div v-else>
                -
              </div>
            </template>

            <template #cell(price)="data">
              <div v-if="data.item.variants.length > 0">
                <div
                  v-for="(itemsVariant, indexVariant) in data.item.variants.slice(0, 3)"
                  :key="indexVariant+1"
                  class="mb-50"
                >
                  Rp {{ formatPrice(itemsVariant.price) }}
                </div>
                <b-collapse
                  :id="`collapse-${String(data.index)}`"
                  class=""
                >
                  <div
                    v-for="(itemsVariant, indexVariant) in data.item.variants.slice(3, data.item.variants.length)"
                    :key="indexVariant+1"
                    class="mb-50"
                  >
                    Rp {{ formatPrice(itemsVariant.price) }}
                  </div>
                </b-collapse>
              </div>
              <div v-else>
                Rp {{ formatPrice(data.item.price) }}
              </div>
            </template>

            <template #cell(stock)="data">
              <div
                v-if="data.item.variants.length > 0"
              >
                <div
                  v-for="(itemsVariant, indexVariant) in data.item.variants.slice(0, 3)"
                  :key="indexVariant+1"
                  class="mb-50"
                >
                  {{ itemsVariant.stock }}
                </div>
                <b-collapse
                  :id="`collapse-${String(data.index)}`"
                  class=""
                >
                  <div
                    v-for="(itemsVariant, indexVariant) in data.item.variants.slice(3, data.item.variants.length)"
                    :key="indexVariant+1"
                    class="mb-50"
                  >
                    {{ itemsVariant.stock }}
                  </div>
                </b-collapse>
              </div>
              <div v-else>
                {{ data.item.stock }}
              </div>
            </template>

            <template #cell(sold)="data">
              <div
                v-if="data.item.variants.length > 0"
              >
                <div
                  v-for="(itemsVariant, indexVariant) in data.item.variants.slice(0, 3)"
                  :key="indexVariant+1"
                  class="mb-50"
                >
                  {{ itemsVariant.sold }}
                </div>
                <b-collapse
                  :id="`collapse-${String(data.index)}`"
                  class=""
                >
                  <div
                    v-for="(itemsVariant, indexVariant) in data.item.variants.slice(3, data.item.variants.length)"
                    :key="indexVariant+1"
                    class="mb-50"
                  >
                    {{ itemsVariant.sold }}
                  </div>
                </b-collapse>
              </div>
              <div v-else>
                {{ data.item.sold }}
              </div>
            </template>

            <template #cell(action)="data">
              <b-row>
                <b-col>
                  <b-button
                    class="btn-icon"
                    size="sm"
                    variant="flat-dark"
                    tag="router-link"
                    :to="{ name: $route.meta.routeEdit, params: { product_id: data.item.product_id } }"
                  >
                    <feather-icon
                      icon="EditIcon"
                    />
                  </b-button>
                  <b-button
                    class="btn-icon"
                    size="sm"
                    variant="flat-dark"
                    @click="showConfirmDelete(data.item.product_id)"
                  >
                    <feather-icon
                      icon="Trash2Icon"
                    />
                  </b-button>
                </b-col>
              </b-row>
              <b-button
                v-if="data.item.variants.length > 3"
                v-b-toggle="`collapse-${String(data.index)}`"
                class="btn-icon text-right"
                variant="flat-dark"
                size="sm"
              >
                <span class="when-opened">
                  Tutup
                </span>
                <span class="when-closed">
                  Tampilkan variasi lainnya
                </span>
                <feather-icon
                  icon="ChevronDownIcon"
                  class="when-closed"
                />
                <feather-icon
                  icon="ChevronUpIcon"
                  class="when-opened"
                />
              </b-button>
            </template>

          </b-table>
        </b-overlay>
      </b-col>
    </b-row>

    <!-- confirm Delete Product -->
    <b-modal
      ref="modal-confirm-delete-product"
      no-close-on-backdrop
      hide-header-close
      hide-header
      modal-class="modal-primary"
      centered
      title="Primary Modal"
    >

      <b-col
        md="12"
        class="d-flex justify-content-center pt-3"
      >
        <b-img
          width="100"
          src="@core/assets/image/icon-popup-warning.png"
        />
      </b-col>

      <b-col class="text-center mt-1">
        <h4>
          Anda yakin ingin hapus satu produk ?
        </h4>
      </b-col>

      <template #modal-footer>
        <b-col
          md="12"
          class="d-flex justify-content-center pb-2"
        >
          <b-button
            variant="primary"
            class="mr-50"
            @click="deleteProduct"
          >
            Iya
          </b-button>
          <b-button
            variant="flat-primary"
            @click="closeConfirmDelete"
          >
            Batal
          </b-button>
          </div>
        </b-col>
      </b-row>
    </b-card>
  </div>
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
  BAvatar,
  VBPopover,
  BOverlay,
  VBToggle,
  BModal,
  BDropdown,
  BDropdownForm,
  BTable,
  BContainer,
  BCollapse,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import useJwt from '@/auth/jwt/useJwt'
import { heightTransition } from '@core/mixins/ui/transition'

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
    BForm,
    BOverlay,
    BModal,
    BDropdown,
    BDropdownForm,
    BTable,
    BContainer,
    BCollapse,
  },
  directives: {
    'b-popover': VBPopover,
    'b-toggle': VBToggle,
    Ripple,
  },
  mixins: [heightTransition],
  data() {
    return {
      defaultFilter: 0,
      headVariant: null,

      idDelete: '',

      loading: false,
      variantFieldsTable: [
        {
          key: 'variant',
          label: 'Variasi',
          thClass: 'border-0 bg-white',
          tdClass: 'border-0',
        },
      ],
      variantItems: [[]],
      variantItemsExpand: [[]],
      variantData: [],
      fields: [
        {
          key: 'product_name', label: 'Nama Produk',
        },
        {
          key: 'variants',
          label: 'Variasi',
        },
        {
          key: 'price',
          label: 'Harga',
        },
        {
          key: 'stock',
          label: 'Stock',
        },
        {
          key: 'sold',
          label: 'Terjual',
        },
        {
          key: 'action', label: 'Aksi', class: 'col-action',
        },
      ],
      items: [],

      imageFileProduct: null,

      searchProduct: '',

      expandCollapseIsActive: false,

      // Filter
      name: '',
      stockFrom: '',
      stockTo: '',
      soldFrom: '',
      soldTo: '',
    }
  },
  mounted() {
    this.getProduct()
  },
  methods: {
    // eslint-disable-next-line func-names
    getProduct: _.debounce(function () {
      this.loading = true
      const params = {
        status: 1,
      }
      if (this.searchProduct) Object.assign(params, { name: this.searchProduct })
      if (this.soldFrom) Object.assign(params, { soldFrom: this.soldFrom })
      if (this.soldTo) Object.assign(params, { soldTo: this.soldTo })
      if (this.stockFrom) Object.assign(params, { stockFrom: this.stockFrom })
      if (this.stockTo) Object.assign(params, { stockTo: this.stockTo })
      return this.$http_komship.get('/v1/product', {
        params,
      }, {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(response => {
        const { data } = response.data
        this.variantData = data
        this.loading = false
        return this.variantData
      }).catch(() => {
        this.loading = false
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Gagal',
            icon: 'AlertCircleIcon',
            text: 'Gagal me-load produk, silahkan coba lagi!',
            variant: 'danger',
          },
        })
      })
    }, 1000),
    showConfirmDelete(id) {
      this.idDelete = id
      this.$refs['modal-confirm-delete-product'].show()
    },
    closeConfirmDelete() {
      this.$refs['modal-confirm-delete-product'].hide()
    },
    deleteProduct() {
      this.$http_komship.delete(`/v1/product/delete/${this.idDelete}`).then(() => {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Success',
            icon: 'CheckIcon',
            text: 'Success hapus produk',
            variant: 'success',
          },
        })
        this.closeConfirmDelete()
        this.getProduct()
      }).catch(() => {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Gagal',
            icon: 'AlertCircleIcon',
            text: 'Gagal hapus produk, silahkan coba lagi!',
            variant: 'danger',
          },
        })
      })
    },
    resetFilter() {
      this.name = ''
      this.stockFrom = ''
      this.stockTo = ''
      this.soldFrom = ''
      this.soldTo = ''
      this.getProduct()
    },
    formatPrice(value) {
      const val = value
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
  },
}
</script>
<style lang="scss" scoped>
p {
  font-weight: 500;
  color: #000000
}
@media only screen and (min-width: 923px) {
    [dir] .table-list-product {
        display: inline-block;
    }
    [dir] .table-list-product-mobile {
        display: none;
    }
}

[dir] .when-closed {
  display: inline-block;
}

[dir] .when-opened {
  display: inline-block;
}

.collapsed > .when-opened,
    :not(.collapsed) > .when-closed {
        display: none;
    }

.image-product {
  object-fit: cover;
  object-position: center center;
  width: 50px!important;
  height: 50px!important;
}

@media only screen and (min-width: 991px) {
  [dir] .wrapper__filter__data__product__mobile {
    display: none!important;
  }
}

@media only screen and (max-width: 990px) {
  [dir] .wrapper__filter__data__product {
    display: none!important;
  }
  [dir] .wrapper__form__filter__data__product__mobile {
    width: 270px!important;
.rounded {
  &-lg {
    border-radius: 16px !important;
  }
}
</style>