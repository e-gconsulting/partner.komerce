<template>
  <b-card-actions
    ref="formCard"
    title="Tambah Produk"
    no-actions
  >
    <validation-observer ref="formRules">
      <b-form
        class="mt-3"
        @submit.prevent
      >
        <b-row>
          <b-col cols="12">
            <b-form-group
              label="Nama Produk"
              label-cols-md="2"
            >
              <validation-provider
                #default="{errors}"
                name="Nama Produk"
                rules="required"
              >
                <b-form-input
                  placeholder="Masukan nama produk kamu"
                  :state="errors.length > 0 ? false:null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col cols="12">
            <b-form-group
              label="SKU Produk"
              label-cols-md="2"
            >
              <validation-provider
                #default="{errors}"
                name="SKU Produk"
                rules="required"
              >
                <b-form-input
                  placeholder="Masukan SKU produk kamu"
                  :state="errors.length > 0 ? false:null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col cols="12">
            <b-form-group
              label="Upload Gambar"
              label-cols-md="2"
            >
              <validation-provider
                #default="{errors}"
                name="Upload Gambar"
                rules="required"
              >
                <b-avatar
                  variant="light-primary"
                  size="50"
                  :src="imageFile ? fileUrl(imageFile) : imageInitialFile"
                  class="mr-50"
                />
                <label for="uploadImage">
                  <b-avatar
                    variant="light-dark"
                    size="50"
                  >
                    <!-- <b-button
                      class="btn-icon"
                      variant="flat-primary"
                    > -->
                    <feather-icon
                      icon="PlusIcon"
                      size="35"
                    />
                    <!-- </b-button> -->
                  </b-avatar>
                </label>
                <b-form-file
                  id="uploadImage"
                  v-model="imageFile"
                  :state="errors.length > 0 ? false : null"
                  :placeholder="
                    imageInitialFile
                      ? imageInitialFile.split('/').pop()
                      : `Pilih atau drop file disini...`
                  "
                  drop-placeholder="Drop file disini..."
                  accept="image/*"
                  class="d-none"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col cols="12">
            <b-form-group
              label="Masukan Deskripsi"
              label-cols-md="2"
            >
              <validation-provider
                #default="{errors}"
                name="Deskripsi"
                rule="required"
              >
                <b-form-textarea
                  id="textarea-default"
                  placeholder="Masukan deskripsi produk kamu"
                  rows="3"
                  :state="errors.length > 0 ? false:null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col cols="12">
            <b-form-group
              label="Variasi"
              label-cols-md="2"
            >
              <b-button
                v-if="isVariation === false"
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="outline-info"
                @click="addVariation"
              >
                <feather-icon
                  icon="PlusIcon"
                  class="mr-50"
                />
                <span class="align-middle">Tambahkan Variasi</span>
              </b-button>

              <div
                v-for="(items, index) in formVariation"
                :key="index+1"
              >
                <transition name="fade">
                  <b-form-group
                    v-if="isVariation === true"
                    :label="`Variasi ${index+1}`"
                    label-cols-md="2"
                    class="mt-1"
                  >
                    <b-col cols="8">
                      <b-form-group
                        label="Nama"
                        label-cols-md="3"
                      >
                        <validation-provider
                          #default="{errors}"
                          :name="`Variasi ${index+1}`"
                        >
                          <b-form-input
                            v-model="items.val"
                            placeholder="Masukan nama variasi"
                            :state="errors.length > 0 ? false:null"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-group>
                    </b-col>

                    <b-col
                      cols="8"
                    >
                      <b-form-group
                        label="Pilihan"
                        label-cols-md="3"
                      >
                        <draggable v-model="myList1">
                          <transition-group name="fade">
                            <b-row
                              v-for="(data, indexs) in formChoices"
                              :key="indexs + 1"
                              class="d-flex align-items-center justify-content-center"
                            >
                              <b-col
                                class="pt-0 pr-0 pb-0 mb-1"
                              >
                                <validation-provider
                                  #default="{errors}"
                                  name="Pilihan"
                                >
                                  <b-input-group>
                                    <b-form-input
                                      v-model="data.choices"
                                      placeholder="Masukan Pilihan Variasi"
                                      :state="errors.length > 0 ? false:null"
                                    />
                                    <b-input-group-append is-text>
                                      <feather-icon
                                        icon="AlignJustifyIcon"
                                      />
                                    </b-input-group-append>
                                  </b-input-group>
                                  <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                              </b-col>
                              <b-col
                                v-if="formChoices.length > 1"
                                md="auto"
                                class="mb-1"
                              >
                                <b-button
                                  class="btn-icon"
                                  variant="light-dark"
                                  size="sm"
                                  @click="removeChoices1(indexs)"
                                >
                                  <feather-icon
                                    icon="Trash2Icon"
                                  />
                                </b-button>
                              </b-col>
                            </b-row>
                          </transition-group>
                        </draggable>
                      </b-form-group>
                    </b-col>

                    <b-col
                      v-if="formChoices.length < 5"
                      cols="8"
                    >
                      <b-form-group
                        label=""
                        label-cols-md="3"
                      >
                        <b-button
                          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                          variant="outline-info"
                          @click="addChoices1"
                        >
                          <feather-icon
                            icon="PlusIcon"
                            class="mr-50"
                          />
                          <span class="align-middle">Tambahkan Pilihan</span>
                        </b-button>
                      </b-form-group>
                    </b-col>
                  </b-form-group>
                </transition>
              </div>

              <transition name="fade">
                <b-form-group
                  v-if="isVariation === true && formVariation.length < 3"
                  label="Tambah Variasi"
                  label-cols-md="2"
                  class="mt-1"
                >
                  <b-button
                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                    variant="outline-info"
                    @click="addVariationItems"
                  >
                    <feather-icon
                      icon="PlusIcon"
                      class="mr-50"
                    />
                    <span class="align-middle">Tambahkan Variasi</span>
                  </b-button>
                </b-form-group>
              </transition>

              <transition name="fade">
                <b-form-group
                  v-if="isVariation === true"
                  label="Info Variasi"
                  label-cols-md="2"
                  class="mt-2"
                >
                  <b-row class="d-flex align-items-center">
                    <b-col md="4">
                      <b-form-input
                        v-model="price"
                        placeholder="Rp | Harga"
                      />
                    </b-col>

                    <b-col md="2">
                      <b-form-input
                        v-model="stock"
                        placeholder="Stok"
                      />
                    </b-col>

                    <b-col
                      md="6"
                      class="d-flex align-items-center"
                    >
                      <div class="d-flex align-items-center">
                        <b-button
                          variant="primary"
                          class="d-flex align-items-center"
                          @click="createListVariation"
                        >
                          <b-spinner
                            v-if="loading"
                            variant="light"
                            size="sm"
                            class="mr-50"
                          />
                          Terapkan Kesemua
                        </b-button>
                      </div>
                    </b-col>

                  </b-row>
                </b-form-group>
              </transition>

              <transition name="fade">
                <b-form-group
                  v-if="isVariation === true"
                  label="Daftar Variasi"
                  label-cols-md="2"
                  class="mt-2"
                >
                  <b-table
                    responsive
                    class="border position-relative"
                    :fields="fields"
                    :items="variantItems"
                  >

                    <template #cell(variant1)="data">
                      <b-col
                        cols="12"
                      >
                        <div
                          v-for="(dataVariantOption, index) in data.item.variant1.option"
                          :key="index+1"
                        >
                          {{ dataVariantOption.val }}
                        </div>
                      </b-col>
                    </template>

                    <template #cell(variant2)="data">
                      <b-col
                        cols="12"
                      >
                        <div v-if="editMode === true && indexRow === data.index">
                          <div
                            v-for="(dataVariantOption, index) in data.item.variant2.option"
                            :key="index+1"
                          >
                            <b-form-input
                              v-model="dataVariantOption.val"
                              class="mb-50"
                            />
                          </div>
                        </div>
                        <div v-else>
                          <div
                            v-for="(dataVariantOption, index) in data.item.variant2.option"
                            :key="index+1"
                          >
                            <b-row>
                              {{ dataVariantOption.val }},
                            </b-row>
                          </div>
                        </div>
                      </b-col>
                    </template>

                    <template #cell(variant3)="data">
                      <b-col cols="12">
                        <div v-if="editMode === true && indexRow === data.index">
                          <div
                            v-for="(dataVariantOption, index) in data.item.variant3.option"
                            :key="index+1"
                          >
                            <b-form-input
                              v-model="dataVariantOption.val"
                              class="mb-50"
                            />
                          </div>
                        </div>
                        <div v-else>
                          <div
                            v-for="(dataVariantOption, index) in data.item.variant3.option"
                            :key="index+1"
                          >
                            {{ dataVariantOption.val }}
                          </div>
                        </div>
                      </b-col>
                    </template>

                    <template #cell(stock)="data">
                      <b-col cols="12">
                        <div v-if="editMode === true && indexRow === data.index">
                          <div
                            v-for="(dataVariantOption, index) in data.item.variant2.option"
                            :key="index+1"
                          >
                            <b-form-input
                              v-model="dataVariantOption.stock"
                              class="mb-50"
                            />
                          </div>
                        </div>
                        <div v-else>
                          <div
                            v-for="(dataVariantOption, index) in data.item.variant2.option"
                            :key="index+1"
                          >
                            {{ dataVariantOption.stock }}
                          </div>
                        </div>
                      </b-col>
                    </template>

                    <template #cell(price)="data">
                      <b-col cols="12">
                        <div v-if="editMode === true && indexRow === data.index">
                          <div
                            v-for="(dataVariantOption, index) in data.item.variant2.option"
                            :key="index+1"
                          >
                            <b-form-input
                              v-model="dataVariantOption.price"
                              class="mb-50"
                            />
                          </div>
                        </div>
                        <div v-else>
                          <div
                            v-for="(dataVariantOption, index) in data.item.variant2.option"
                            :key="index+1"
                          >
                            {{ dataVariantOption.price }}
                          </div>
                        </div>
                      </b-col>
                    </template>

                    <template #cell(action)="data">
                      <b-button
                        variant="flat-secondary"
                        class="btn-icon"
                        @click="editTable(data)"
                      >
                        <feather-icon
                          icon="EditIcon"
                        />
                      </b-button>
                      <b-button
                        v-if="editMode === true && indexRow === data.index"
                        variant="flat-primary"
                        class="btn-icon"
                        @click="updateTable"
                      >
                        Simpan
                      </b-button>
                    </template>

                  </b-table>
                </b-form-group>
              </transition>

            </b-form-group>
          </b-col>

          <b-col cols="12">
            <b-form-group
              label="Pengiriman"
              label-cols-md="2"
            />
          </b-col>

          <b-col md="4">
            <b-form-group
              label="Berat"
              label-cols-md="3"
              class="ml-5"
            >
              <b-col class="d-flex align-items-center">
                <b-input-group class="input-group-merge">
                  <b-form-input
                    id="hi-first-name"
                    placeholder="1000"
                  />
                  <b-input-group-append is-text>
                    cm
                  </b-input-group-append>
                </b-input-group>
              </b-col>
            </b-form-group>
          </b-col>

          <b-col md="12">
            <b-form-group
              label="Ukuran"
              label-cols-md="1"
              content-cols-md="5"
              class="ml-5"
            >
              <b-row
                class="d-flex align-items-center"
              >
                <b-col class="d-flex align-items-center">
                  <b-input-group class="input-group-merge">
                    <b-form-input
                      id="hi-first-name"
                      placeholder="P"
                    />
                    <b-input-group-append is-text>
                      cm
                    </b-input-group-append>
                  </b-input-group>
                </b-col>
                <b-col class="d-flex align-items-center">
                  <b-input-group class="input-group-merge">
                    <b-form-input
                      id="hi-first-name"
                      placeholder="L"
                    />
                    <b-input-group-append is-text>
                      cm
                    </b-input-group-append>
                  </b-input-group>
                </b-col>
                <b-col class="d-flex align-items-center">
                  <b-input-group class="input-group-merge">
                    <b-form-input
                      id="hi-first-name"
                      placeholder="T"
                    />
                    <b-input-group-append is-text>
                      cm
                    </b-input-group-append>
                  </b-input-group>
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>

          <b-col
            cols="10"
            class="mt-2"
          >
            <b-form-group
              label="Pembayaran"
              label-cols-sm="2"
            >
              <div
                class="demo-inline-spacing"
              >
                <b-form-checkbox
                  v-model="cod"
                  class="custom-control-primary"
                >
                  Bayar Ditempat (COD)
                </b-form-checkbox>
                <b-form-checkbox
                  v-model="transfer"
                  class="custom-control-primary"
                >
                  Transfer Bank
                </b-form-checkbox>
              </div>
            </b-form-group>
          </b-col>

          <!-- submit and reset -->
          <b-col
            cols="12"
            class="d-flex justify-content-end pb-2 pr-2"
          >
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="submit"
              variant="outline-primary"
              class="mr-1"
            >
              Simpan Draft
            </b-button>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              type="reset"
              variant="primary"
              @click="submitPublish"
            >
              Publish
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>

  </b-card-actions>
</template>

<script>
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormFile,
  BForm,
  BButton,
  BFormTextarea,
  BTable,
  BFormCheckbox,
  BInputGroupAppend,
  BInputGroup,
  BAvatar,
  BSpinner,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import BCardActions from '@/@core/components/b-card-actions/BCardActions.vue'
import draggable from 'vuedraggable'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { required } from '@validations'
import { heightTransition } from '@core/mixins/ui/transition'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormFile,
    BForm,
    BButton,
    BCardActions,
    BFormTextarea,
    BTable,
    BFormCheckbox,
    BInputGroupAppend,
    BInputGroup,
    draggable,
    ValidationObserver,
    ValidationProvider,
    BAvatar,
    BSpinner,
  },
  directives: {
    Ripple,
  },
  mixins: [heightTransition],
  data() {
    return {

      formVariation: [],

      loading: false,

      isVariation: false,
      formChoices: [{ choices: null }],

      variationFields1: false,

      activeAddChoices1: false,

      variationName: null,

      variantChoices1: null,

      productName: '',
      skuName: '',
      descriptionProduct: '',
      weightProduct: null,
      lengthProduct: null,
      heightProduct: null,
      flavours: '',

      // Table
      fields: [],
      variantItems: [],
      stock: '',
      price: '',

      cod: true,
      transfer: true,
      imageFile: null,
      imageInitialFile: null,

      editMode: false,

      indexRow: null,

      fieldsDummy: [
        {
          key: 'variant1', label: 'Variant 1',
        },
        {
          key: 'variant2', label: 'Variant 2',
        },
        {
          key: 'variant3', label: 'Variant 3',
        },
        {
          key: 'price', label: 'harga',
        },
        {
          key: 'stock', label: 'stock',
        },
        {
          key: 'action', label: 'Aksi',
        },
      ],

      dataDummyTable: [
        {
          variant1: {
            option: [
              {
                val: 'Merah',
                parent: null,
                stock: 99,
                price: 'Rp. 10000',
              },
            ],
          },
          variant2: {
            option: [
              {
                val: 's',
                parent: null,
                stock: 99,
                price: 'Rp. 10000',
              },
              {
                val: 's',
                parent: null,
                stock: 99,
                price: 'Rp. 10000',
              },
              {
                val: 's',
                parent: null,
                stock: 99,
                price: 'Rp. 10000',
              },
              {
                val: 's',
                parent: null,
                stock: 99,
                price: 'Rp. 10000',
              },
              {
                val: 's',
                parent: null,
                stock: 99,
                price: 'Rp. 10000',
              },
            ],
          },
          variant3: {
            option: [
              {
                val: 'Gelang',
                parent: null,
                stock: 99,
                price: 'Rp. 10000',
              },
            ],
          },
        },
        {
          variant1: {
            option: [
              {
                val: 'Merah',
                parent: null,
                stock: 99,
                price: 'Rp. 10000',
              },
            ],
          },
          variant2: {
            option: [
              {
                val: 's',
                parent: null,
                stock: 99,
                price: 'Rp. 10000',
              },
              {
                val: 's',
                parent: null,
                stock: 99,
                price: 'Rp. 10000',
              },
              {
                val: 's',
                parent: null,
                stock: 99,
                price: 'Rp. 10000',
              },
              {
                val: 's',
                parent: null,
                stock: 99,
                price: 'Rp. 10000',
              },
              {
                val: 's',
                parent: null,
                stock: 99,
                price: 'Rp. 10000',
              },
            ],
          },
          variant3: {
            option: [
              {
                val: 'Gelang',
                parent: null,
                stock: 99,
                price: 'Rp. 10000',
              },
            ],
          },
        },
        {
          variant1: {
            option: [
              {
                val: 'Merah',
                parent: null,
                stock: 99,
                price: 'Rp. 10000',
              },
            ],
          },
          variant2: {
            option: [
              {
                val: 's',
                parent: null,
                stock: 99,
                price: 'Rp. 10000',
              },
              {
                val: 's',
                parent: null,
                stock: 99,
                price: 'Rp. 10000',
              },
              {
                val: 's',
                parent: null,
                stock: 99,
                price: 'Rp. 10000',
              },
              {
                val: 's',
                parent: null,
                stock: 99,
                price: 'Rp. 10000',
              },
              {
                val: 's',
                parent: null,
                stock: 99,
                price: 'Rp. 10000',
              },
            ],
          },
          variant3: {
            option: [
              {
                val: 'Gelang',
                parent: null,
                stock: 99,
                price: 'Rp. 10000',
              },
            ],
          },
        },
        {
          variant1: {
            option: [
              {
                val: 'Merah',
                parent: null,
                stock: 99,
                price: 'Rp. 10000',
              },
            ],
          },
          variant2: {
            option: [
              {
                val: 's',
                parent: null,
                stock: 99,
                price: 'Rp. 10000',
              },
              {
                val: 's',
                parent: null,
                stock: 99,
                price: 'Rp. 10000',
              },
              {
                val: 's',
                parent: null,
                stock: 99,
                price: 'Rp. 10000',
              },
              {
                val: 's',
                parent: null,
                stock: 99,
                price: 'Rp. 10000',
              },
              {
                val: 's',
                parent: null,
                stock: 99,
                price: 'Rp. 10000',
              },
            ],
          },
          variant3: {
            option: [
              {
                val: 'Gelang',
                parent: null,
                stock: 99,
                price: 'Rp. 10000',
              },
            ],
          },
        },
      ],

      fieldStore: [],

      // Validation
      required,
    }
  },
  computed: {
    myList1: {
      get() {
        return this.$store.state.myList1
      },
      set(value) {
        this.$store.commit('updateList', value)
      },
    },
    myList2: {
      get() {
        return this.$store.state.myList2
      },
      set(value) {
        this.$store.commit('updateList', value)
      },
    },
    myList3: {
      get() {
        return this.$store.state.myList3
      },
      set(value) {
        this.$store.commit('updateList', value)
      },
    },
    myList4: {
      get() {
        return this.$store.state.myList4
      },
      set(value) {
        this.$store.commit('updateList', value)
      },
    },
    myList5: {
      get() {
        return this.$store.state.myList5
      },
      set(value) {
        this.$store.commit('updateList', value)
      },
    },
    itemsProvider() {
      const fields = [...this.fields]
      return fields
    },
  },
  methods: {
    submitPublish() {
      const data = {
        product_name: 'Jilbab',
        sku: 'JBB-01',
        description: '',
        weight: 100,
        length: 100,
        width: 100,
        height: 100,
        variant_option: [
          {
            val: this.variationName1,
            option: [
              {
                val: this.formChoices1[0].choices,
                parent: null,
                stock: null,
                price: null,
              },
              {
                val: this.formChoices1[1].choices,
                parent: null,
                stock: null,
                price: null,
              },
            ],
          },
          {
            val: 'Ukuran',
            option: [
              {
                val: 'M',
                parent: 0,
                stock: 10,
                price: 20000,
              },
              {
                val: 'L',
                parent: 0,
                stock: 10,
                price: 22000,
              },
              {
                val: 'M',
                parent: 1,
                stock: 10,
                price: 20000,
              },
              {
                val: 'L',
                parent: 1,
                stock: 10,
                price: 22000,
              },
            ],
          },
        ],
      }
      this.fieldStore.push(data)
    },
    createListVariation() {
      this.variantItems.push({
        variant1: {
          option: [
            {
              val: this.formChoices1[0].choices,
              parent: null,
              stock: this.stock,
              price: `Rp. ${this.price}`,
            },
          ],
        },
        variant2: {
          option: [
            {
              val: this.formChoices2[0].choices,
              parent: null,
              stock: this.stock,
              price: `Rp. ${this.price}`,
            },
            {
              val: this.formChoices2[1].choices,
              parent: null,
              stock: this.stock,
              price: `Rp. ${this.price}`,
            },
            {
              val: this.formChoices2[2].choices,
              parent: null,
              stock: this.stock,
              price: `Rp. ${this.price}`,
            },
            {
              val: this.formChoices2[3].choices,
              parent: null,
              stock: this.stock,
              price: `Rp. ${this.price}`,
            },
            {
              val: this.formChoices2[4].choices,
              parent: null,
              stock: this.stock,
              price: `Rp. ${this.price}`,
            },
          ],
        },
        variant3: {
          option: [
            {
              val: this.formChoices3[0].choices,
              parent: null,
              stock: this.stock,
              price: `Rp. ${this.price}`,
            },
          ],
        },
      },
      {
        variant1: {
          option: [
            {
              val: this.formChoices1[1].choices,
              parent: null,
              stock: this.stock,
              price: `Rp. ${this.price}`,
            },
          ],
        },
        variant2: {
          option: [
            {
              val: this.formChoices2[0].choices,
              parent: null,
              stock: this.stock,
              price: `Rp. ${this.price}`,
            },
            {
              val: this.formChoices2[1].choices,
              parent: null,
              stock: this.stock,
              price: `Rp. ${this.price}`,
            },
            {
              val: this.formChoices2[2].choices,
              parent: null,
              stock: this.stock,
              price: `Rp. ${this.price}`,
            },
            {
              val: this.formChoices2[3].choices,
              parent: null,
              stock: this.stock,
              price: `Rp. ${this.price}`,
            },
            {
              val: this.formChoices2[4].choices,
              parent: null,
              stock: this.stock,
              price: `Rp. ${this.price}`,
            },
          ],
        },
        variant3: {
          option: [
            {
              val: this.formChoices3[1].choices,
              parent: null,
              stock: this.stock,
              price: `Rp. ${this.price}`,
            },
          ],
        },
      },
      {
        variant1: {
          option: [
            {
              val: this.formChoices1[2].choices,
              parent: null,
              stock: this.stock,
              price: `Rp. ${this.price}`,
            },
          ],
        },
        variant2: {
          option: [
            {
              val: this.formChoices2[0].choices,
              parent: null,
              stock: this.stock,
              price: `Rp. ${this.price}`,
            },
            {
              val: this.formChoices2[1].choices,
              parent: null,
              stock: this.stock,
              price: `Rp. ${this.price}`,
            },
            {
              val: this.formChoices2[2].choices,
              parent: null,
              stock: this.stock,
              price: `Rp. ${this.price}`,
            },
            {
              val: this.formChoices2[3].choices,
              parent: null,
              stock: this.stock,
              price: `Rp. ${this.price}`,
            },
            {
              val: this.formChoices2[4].choices,
              parent: null,
              stock: this.stock,
              price: `Rp. ${this.price}`,
            },
          ],
        },
        variant3: {
          option: [
            {
              val: this.formChoices3[2].choices,
              parent: null,
              stock: this.stock,
              price: `Rp. ${this.price}`,
            },
          ],
        },
      },
      {
        variant1: {
          option: [
            {
              val: this.formChoices1[3].choices,
              parent: null,
              stock: this.stock,
              price: `Rp. ${this.price}`,
            },
          ],
        },
        variant2: {
          option: [
            {
              val: this.formChoices2[0].choices,
              parent: null,
              stock: this.stock,
              price: `Rp. ${this.price}`,
            },
            {
              val: this.formChoices2[1].choices,
              parent: null,
              stock: this.stock,
              price: `Rp. ${this.price}`,
            },
            {
              val: this.formChoices2[2].choices,
              parent: null,
              stock: this.stock,
              price: `Rp. ${this.price}`,
            },
            {
              val: this.formChoices2[3].choices,
              parent: null,
              stock: this.stock,
              price: `Rp. ${this.price}`,
            },
            {
              val: this.formChoices2[4].choices,
              parent: null,
              stock: this.stock,
              price: `Rp. ${this.price}`,
            },
          ],
        },
        variant3: {
          option: [
            {
              val: this.formChoices3[3].choices,
              parent: null,
              stock: this.stock,
              price: `Rp. ${this.price}`,
            },
          ],
        },
      },
      {
        variant1: {
          option: [
            {
              val: this.formChoices1[4].choices,
              parent: null,
              stock: this.stock,
              price: `Rp. ${this.price}`,
            },
          ],
        },
        variant2: {
          option: [
            {
              val: this.formChoices2[0].choices,
              parent: null,
              stock: this.stock,
              price: `Rp. ${this.price}`,
            },
            {
              val: this.formChoices2[1].choices,
              parent: null,
              stock: this.stock,
              price: `Rp. ${this.price}`,
            },
            {
              val: this.formChoices2[2].choices,
              parent: null,
              stock: this.stock,
              price: `Rp. ${this.price}`,
            },
            {
              val: this.formChoices2[3].choices,
              parent: null,
              stock: this.stock,
              price: `Rp. ${this.price}`,
            },
            {
              val: this.formChoices2[4].choices,
              parent: null,
              stock: this.stock,
              price: `Rp. ${this.price}`,
            },
          ],
        },
        variant3: {
          option: [
            {
              val: this.formChoices3[4].choices,
              parent: null,
              stock: this.stock,
              price: `Rp. ${this.price}`,
            },
          ],
        },
      })
      this.fields.unshift({
        key: 'variant1',
        label: String(this.variationName1),
      },
      {
        key: 'variant2',
        label: String(this.variationName2),
      },
      {
        key: 'variant3',
        label: String(this.variationName3),
      },
      {
        key: 'price',
        label: 'Harga',
      },
      {
        key: 'stock',
        label: 'Stok',
      },
      {
        key: 'action',
        label: 'Aksi',
        class: 'col-action',
      })
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1000)

      console.log(this.variantItems)
    },
    myArrayChoices1(data) {
      console.log(data.choices)
    },
    myArrayChoices2(data) {
      console.log(data.choices)
    },
    myArrayChoices3(data) {
      console.log(data.choices)
    },
    myArrayChoices4(data) {
      console.log(data.choices)
    },
    myArrayChoices5(data) {
      console.log(data.choices)
    },
    tesAdd() {
      console.log('tes')
    },
    addVariation() {
      this.isVariation = true
      this.formVariation.push({ val: '', option: [{ val: '' }] })
    },
    addVariationItems() {
      this.formVariation.push({ val: '', option: [{ val: '' }] })
    },
    addChoices1() {
      this.formChoices.push({ choices: null })
    },
    removeChoices1(index) {
      this.formChoices.splice(index, 1)
    },
    editTable(data) {
      console.log(data.rowSelected)
      console.log(data.index)
      this.indexRow = data.index
      this.rowSelected = data.rowSelected
      this.rowSelected = true
      console.log(this.rowSelected)
      this.editMode = true
    },
    updateTable() {
      this.editMode = false
    },
    fileUrl: file => (file ? URL.createObjectURL(file) : null),
  },
}
</script>

<style scoped>

</style>
