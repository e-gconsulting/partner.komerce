<template>
  <b-col class="pl-0 pr-0">
    <b-form>
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
                    v-model="searchProduct"
                    placeholder="Example"
                    @input="getProduct"
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
                                v-model="stockFrom"
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
                                v-model="stockTo"
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
                                v-model="soldFrom"
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
                                v-model="soldTo"
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
                            @click="resetFilter"
                          >
                            Reset
                          </b-button>
                          <b-button
                            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                            type="submit"
                            variant="primary"
                            @click="getProduct"
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
          <b-container fluid>
            <b-row>
              <b-col
                cols="3"
              >
                <strong class="ml-2">
                  Nama Produk
                </strong>
              </b-col>
              <b-col cols="3">
                <strong class="ml-2">
                  Variasi
                </strong>
              </b-col>
              <b-col cols="2">
                <strong class="ml-2">
                  Harga
                </strong>
              </b-col>
              <b-col cols="2">
                <strong class="ml-2">
                  Stock
                </strong>
              </b-col>
              <b-col cols="1">
                <strong>
                  Terjual
                </strong>
              </b-col>
              <b-col cols="1">
                <strong class="ml-2">
                  Aksi
                </strong>
              </b-col>
            </b-row>
            <hr style="height:1px; background-color:#828282; color: #828282; opacity: 0.5;">
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
                      <div>
                        <b-avatar
                          v-if="itemsData.product_image[0] !== undefined"
                          variant="light-primary"
                          square
                          size="50px"
                          :src="itemsData.product_image[0].image"
                        />
                        <b-avatar
                          v-else
                          variant="light-primary"
                          square
                          size="50px"
                          :src="imageFileProduct"
                        />
                      </div>
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
                >
                  <p class="ml-2">
                    Tidak Ada Variasi
                  </p>
                </b-col>
                <b-col
                  v-if="itemsData.variants[0] !== undefined"
                  cols="2"
                >
                  <div
                    v-for="(itemsVariant, indexVariant) in itemsData.variants.slice(0,3)"
                    :key="indexVariant+1"
                  >
                    <p class="ml-2">
                      Rp. {{ formatPrice(itemsVariant.price) }}
                    </p>
                  </div>
                </b-col>
                <b-col
                  v-else
                  cols="2"
                >
                  <p class="ml-2">
                    Rp. {{ formatPrice(itemsData.price) }}
                  </p>
                </b-col>
                <b-col
                  v-if="itemsData.variants[0] !== undefined"
                  cols="2"
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
                >
                  <p class="ml-2">
                    {{ itemsData.stock }}
                  </p>
                </b-col>
                <b-col
                  v-if="itemsData.variants[0] !== undefined"
                  cols="1"
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
                >
                  <p class="ml-2">
                    {{ itemsData.sold }}
                  </p>
                </b-col>
                <b-col
                  cols="1"
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
              <b-row
                v-if="itemsData.variants.length > 3"
                class="d-flex justify-content-end mb-2"
              >
                <b-col cols="auto">
                  <b-button
                    v-b-toggle="`collapse-${String(index)}`"
                    variant="flat-dark"
                    size="sm"
                  >
                    Tampilkan Versi Lainnya
                    <feather-icon
                      icon="ChevronDownIcon"
                    />
                  </b-button>
                </b-col>
                <b-col cols="12">
                  <b-collapse
                    :id="`collapse-${String(index)}`"
                    class="mt-2"
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
                            Rp. {{ formatPrice(itemsVariant.price) }}
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
              </b-row>
              <hr>
            </div>
          </b-container>
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
        </b-col>
      </template>

    </b-modal>

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
  BAvatar,
  VBPopover,
  BPopover,
  BOverlay,
  BContainer,
  BCollapse,
  VBToggle,
  BModal,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import useJwt from '@/auth/jwt/useJwt'

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
    BAvatar,
    BPopover,
    BForm,
    BOverlay,
    BContainer,
    BCollapse,
    BModal,
  },
  directives: {
    'b-popover': VBPopover,
    'b-toggle': VBToggle,
    Ripple,
  },
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
          thClass: 'text-center',
        },
        {
          key: 'action', label: 'Aksi',
        },
      ],
      items: [],

      imageFileProduct: null,

      searchProduct: '',

      // Filter
      name: '',
      stockFrom: '',
      stockTo: '',
      soldFrom: '',
      soldTo: '',
    }
  },
  created() {
    this.getProduct()
  },
  methods: {
    getProduct() {
      this.loading = true
      const params = {
        status: '0',
      }
      if (this.searchProduct) Object.assign(params, { name: this.searchProduct })
      if (this.soldFrom) Object.assign(params, { soldFrom: this.soldFrom })
      if (this.soldTo) Object.assign(params, { soldTo: this.soldTo })
      if (this.stockFrom) Object.assign(params, { stockFrom: this.stockFrom })
      if (this.stockTo) Object.assign(params, { stockTo: this.stockTo })
      return this.$httpKomship.get('/v1/product', {
        params,
      }, {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(response => {
        const { data } = response.data
        console.log(data)
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
    },
    showConfirmDelete(id) {
      this.idDelete = id
      this.$refs['modal-confirm-delete-product'].show()
    },
    closeConfirmDelete() {
      this.$refs['modal-confirm-delete-product'].hide()
    },
    deleteProduct() {
      this.$httpKomship.delete(`/v1/product/delete/${this.idDelete}`, {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(() => {
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

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
* {
  font-family: Poppins;
}

[dir] .background-table-variant {
  background: #FFF;
}
</style>
