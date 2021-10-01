<template>
  <b-card-actions
    ref="formCard"
    title="Tambah Produk"
    no-actions
  >
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
            <b-form-input
              placeholder="Masukan nama produk kamu"
            />
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <b-form-group
            label="SKU Produk"
            label-cols-md="2"
          >
            <b-form-input
              placeholder="Masukan SKU produk kamu"
            />
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <b-form-group
            label="Masukan Deskripsi"
            label-cols-md="2"
          >
            <b-form-textarea
              id="textarea-default"
              placeholder="Masukan deskripsi produk kamu"
              rows="3"
            />
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
              v-if="variationFields1 === true"
            >
              <b-form-group
                v-if="isVariation === true"
                label="Variasi 1"
                label-cols-md="2"
                class="mt-1"
              >
                <b-col cols="8">
                  <b-form-group
                    label="Nama"
                    label-cols-md="3"
                  >
                    <b-form-input
                      placeholder="Masukan nama variasi"
                    />
                  </b-form-group>
                </b-col>

                <b-col
                  cols="8"
                >
                  <b-form-group
                    label="Pilihan"
                    label-cols-md="3"
                  >
                    <b-row
                      v-for="(data, indexs) in formChoices1"
                      :key="indexs + 1"
                      class="d-flex align-items-center justify-content-center"
                    >
                      <b-col
                        class="pt-0 pr-0 pb-0 mb-1"
                      >
                        <b-input-group>
                          <b-form-input
                            placeholder="Masukan Pilihan Variasi"
                          />
                          <b-input-group-append is-text>
                            <feather-icon
                              icon="AlignJustifyIcon"
                            />
                          </b-input-group-append>
                        </b-input-group>
                      </b-col>
                      <b-col
                        v-if="formChoices1.length > 1"
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
                  </b-form-group>
                </b-col>

                <b-col cols="8">
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
            </div>

            <div
              v-if="variationFields2 === true"
            >
              <b-form-group
                v-if="isVariation === true"
                label="Variasi 2"
                label-cols-md="2"
                class="mt-1"
              >
                <b-col cols="8">
                  <b-form-group
                    label="Nama"
                    label-cols-md="3"
                  >
                    <b-form-input
                      placeholder="Masukan nama variasi"
                    />
                  </b-form-group>
                </b-col>

                <b-col
                  cols="8"
                >
                  <b-form-group
                    label="Pilihan"
                    label-cols-md="3"
                  >
                    <b-row
                      v-for="(data, indexs) in formChoices2"
                      :key="indexs + 1"
                      class="d-flex align-items-center justify-content-center"
                    >
                      <b-col
                        class="pt-0 pr-0 pb-0 mb-1"
                      >
                        <b-input-group>
                          <b-form-input
                            placeholder="Masukan Pilihan Variasi"
                          />
                          <b-input-group-append is-text>
                            <feather-icon
                              icon="AlignJustifyIcon"
                            />
                          </b-input-group-append>
                        </b-input-group>
                      </b-col>
                      <b-col
                        v-if="formChoices2.length > 1"
                        md="auto"
                        class="mb-1"
                      >
                        <b-button
                          class="btn-icon"
                          variant="light-dark"
                          size="sm"
                          @click="removeChoices2(indexs)"
                        >
                          <feather-icon
                            icon="Trash2Icon"
                          />
                        </b-button>
                      </b-col>
                    </b-row>
                  </b-form-group>
                </b-col>

                <b-col cols="8">
                  <b-form-group
                    label=""
                    label-cols-md="3"
                  >
                    <b-button
                      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                      variant="outline-info"
                      @click="addChoices2"
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
            </div>

            <div
              v-if="variationFields3 === true"
            >
              <b-form-group
                v-if="isVariation === true"
                label="Variasi 3"
                label-cols-md="2"
                class="mt-1"
              >
                <b-col cols="8">
                  <b-form-group
                    label="Nama"
                    label-cols-md="3"
                  >
                    <b-form-input
                      placeholder="Masukan nama variasi"
                    />
                  </b-form-group>
                </b-col>

                <b-col
                  cols="8"
                >
                  <b-form-group
                    label="Pilihan"
                    label-cols-md="3"
                  >
                    <b-row
                      v-for="(data, indexs) in formChoices3"
                      :key="indexs + 1"
                      class="d-flex align-items-center justify-content-center"
                    >
                      <b-col
                        class="pt-0 pr-0 pb-0 mb-1"
                      >
                        <b-input-group>
                          <b-form-input
                            placeholder="Masukan Pilihan Variasi"
                          />
                          <b-input-group-append is-text>
                            <feather-icon
                              icon="AlignJustifyIcon"
                            />
                          </b-input-group-append>
                        </b-input-group>
                      </b-col>
                      <b-col
                        v-if="formChoices3.length > 1"
                        md="auto"
                        class="mb-1"
                      >
                        <b-button
                          class="btn-icon"
                          variant="light-dark"
                          size="sm"
                          @click="removeChoices3(indexs)"
                        >
                          <feather-icon
                            icon="Trash2Icon"
                          />
                        </b-button>
                      </b-col>
                    </b-row>
                  </b-form-group>
                </b-col>

                <b-col cols="8">
                  <b-form-group
                    label=""
                    label-cols-md="3"
                  >
                    <b-button
                      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                      variant="outline-info"
                      @click="addChoices3"
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
            </div>

            <div
              v-if="variationFields4 === true"
            >
              <b-form-group
                v-if="isVariation === true"
                label="Variasi 4"
                label-cols-md="2"
                class="mt-1"
              >
                <b-col cols="8">
                  <b-form-group
                    label="Nama"
                    label-cols-md="3"
                  >
                    <b-form-input
                      placeholder="Masukan nama variasi"
                    />
                  </b-form-group>
                </b-col>

                <b-col
                  cols="8"
                >
                  <b-form-group
                    label="Pilihan"
                    label-cols-md="3"
                  >
                    <b-row
                      v-for="(data, indexs) in formChoices4"
                      :key="indexs + 1"
                      class="d-flex align-items-center justify-content-center"
                    >
                      <b-col
                        class="pt-0 pr-0 pb-0 mb-1"
                      >
                        <b-input-group>
                          <b-form-input
                            placeholder="Masukan Pilihan Variasi"
                          />
                          <b-input-group-append is-text>
                            <feather-icon
                              icon="AlignJustifyIcon"
                            />
                          </b-input-group-append>
                        </b-input-group>
                      </b-col>
                      <b-col
                        v-if="formChoices4.length > 1"
                        md="auto"
                        class="mb-1"
                      >
                        <b-button
                          class="btn-icon"
                          variant="light-dark"
                          size="sm"
                          @click="removeChoices4(indexs)"
                        >
                          <feather-icon
                            icon="Trash2Icon"
                          />
                        </b-button>
                      </b-col>
                    </b-row>
                  </b-form-group>
                </b-col>

                <b-col cols="8">
                  <b-form-group
                    label=""
                    label-cols-md="3"
                  >
                    <b-button
                      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                      variant="outline-info"
                      @click="addChoices4"
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
            </div>

            <div
              v-if="variationFields5 === true"
            >
              <b-form-group
                v-if="isVariation === true"
                label="Variasi 5"
                label-cols-md="2"
                class="mt-1"
              >
                <b-col cols="8">
                  <b-form-group
                    label="Nama"
                    label-cols-md="3"
                  >
                    <b-form-input
                      placeholder="Masukan nama variasi"
                    />
                  </b-form-group>
                </b-col>

                <b-col
                  cols="8"
                >
                  <b-form-group
                    label="Pilihan"
                    label-cols-md="3"
                  >
                    <b-row
                      v-for="(data, indexs) in formChoices5"
                      :key="indexs + 1"
                      class="d-flex align-items-center justify-content-center"
                    >
                      <b-col
                        class="pt-0 pr-0 pb-0 mb-1"
                      >
                        <b-input-group>
                          <b-form-input
                            placeholder="Masukan Pilihan Variasi"
                          />
                          <b-input-group-append is-text>
                            <feather-icon
                              icon="AlignJustifyIcon"
                            />
                          </b-input-group-append>
                        </b-input-group>
                      </b-col>
                      <b-col
                        v-if="formChoices5.length > 1"
                        md="auto"
                        class="mb-1"
                      >
                        <b-button
                          class="btn-icon"
                          variant="light-dark"
                          size="sm"
                          @click="removeChoices5(indexs)"
                        >
                          <feather-icon
                            icon="Trash2Icon"
                          />
                        </b-button>
                      </b-col>
                    </b-row>
                  </b-form-group>
                </b-col>

                <b-col cols="8">
                  <b-form-group
                    label=""
                    label-cols-md="3"
                  >
                    <b-button
                      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                      variant="outline-info"
                      @click="addChoices5"
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
            </div>

            <b-form-group
              v-if="variationFields1 === true && activeAddChoices1 === true"
              label="Tambah Variasi"
              label-cols-md="2"
              class="mt-1"
            >
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="outline-info"
                @click="addVariationItems2"
              >
                <feather-icon
                  icon="PlusIcon"
                  class="mr-50"
                />
                <span class="align-middle">Tambahkan Variasi</span>
              </b-button>
            </b-form-group>

            <b-form-group
              v-if="variationFields2 === true && activeAddChoices2 === true "
              label="Tambah Variasi"
              label-cols-md="2"
              class="mt-1"
            >
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="outline-info"
                @click="addVariationItems3"
              >
                <feather-icon
                  icon="PlusIcon"
                  class="mr-50"
                />
                <span class="align-middle">Tambahkan Variasi</span>
              </b-button>
            </b-form-group>

            <b-form-group
              v-if="variationFields3 === true && activeAddChoices3 === true "
              label="Tambah Variasi"
              label-cols-md="2"
              class="mt-1"
            >
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="outline-info"
                @click="addVariationItems4"
              >
                <feather-icon
                  icon="PlusIcon"
                  class="mr-50"
                />
                <span class="align-middle">Tambahkan Variasi</span>
              </b-button>
            </b-form-group>

            <b-form-group
              v-if="variationFields4 === true && activeAddChoices4 === true "
              label="Tambah Variasi"
              label-cols-md="2"
              class="mt-1"
            >
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="outline-info"
                @click="addVariationItems5"
              >
                <feather-icon
                  icon="PlusIcon"
                  class="mr-50"
                />
                <span class="align-middle">Tambahkan Variasi</span>
              </b-button>
            </b-form-group>

            <b-form-group
              v-if="isVariation === true"
              label="Info Variasi"
              label-cols-md="2"
              class="mt-2"
            >
              <b-row class="d-flex align-items-center">
                <b-col md="4">
                  <b-form-input
                    placeholder="Rp | Harga"
                  />
                </b-col>

                <b-col md="2">
                  <b-form-input
                    placeholder="Stok"
                  />
                </b-col>

                <b-col md="6">
                  <b-button
                    variant="primary"
                  >
                    Terapkan Kesemua
                  </b-button>
                </b-col>

              </b-row>
            </b-form-group>

            <b-form-group
              v-if="isVariation === true"
              label="Daftar Variasi"
              label-cols-md="2"
              class="mt-2"
            >
              <b-table
                class="border"
              >

                <template #cell(name)="data">
                  {{ data.value }}
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
            </b-form-group>

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
                v-model="selected"
                value="A"
                class="custom-control-primary"
              >
                Bayar Ditempat (COD)
              </b-form-checkbox>
              <b-form-checkbox
                v-model="selected"
                value="A"
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
          >
            Publish
          </b-button>
        </b-col>
      </b-row>

    </b-form>
  </b-card-actions>
</template>

<script>
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BForm,
  BButton,
  BFormTextarea,
  BTable,
  BFormCheckbox,
  BInputGroupAppend,
  BInputGroup,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import BCardActions from '@/@core/components/b-card-actions/BCardActions.vue'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BButton,
    BCardActions,
    BFormTextarea,
    BTable,
    BFormCheckbox,
    BInputGroupAppend,
    BInputGroup,
  },
  directives: {
    Ripple,
  },
  data() {
    return {

      isVariation: false,
      formChoices1: [{ form: '' }],
      formChoices2: [{ form: '' }],
      formChoices3: [{ form: '' }],
      formChoices4: [{ form: '' }],
      formChoices5: [{ form: '' }],

      variationFields1: false,
      variationFields2: false,
      variationFields3: false,
      variationFields4: false,
      variationFields5: false,

      activeAddChoices1: false,
      activeAddChoices2: false,
      activeAddChoices3: false,
      activeAddChoices4: false,
      activeAddChoices5: false,

      selected: ['A'],
    }
  },
  methods: {
    tesAdd() {
      console.log('tes')
    },
    addVariation() {
      this.isVariation = true
      this.variationFields1 = true
      this.activeAddChoices1 = true
    },
    addVariationItems2() {
      this.variationFields2 = true
      this.activeAddChoices2 = true
      this.activeAddChoices1 = false
    },
    addVariationItems3() {
      this.variationFields3 = true
      this.activeAddChoices3 = true
      this.activeAddChoices2 = false
    },
    addVariationItems4() {
      this.variationFields4 = true
      this.activeAddChoices4 = true
      this.activeAddChoices3 = false
    },
    addVariationItems5() {
      this.variationFields5 = true
      this.activeAddChoices5 = true
      this.activeAddChoices4 = false
    },
    addChoices1() {
      this.formChoices1.push({ form: '' })
    },
    addChoices2() {
      this.formChoices2.push({ form: '' })
    },
    addChoices3() {
      this.formChoices3.push({ form: '' })
    },
    addChoices4() {
      this.formChoices4.push({ form: '' })
    },
    addChoices5() {
      this.formChoices5.push({ form: '' })
    },
    removeChoices1(index) {
      this.formChoices1.splice(index, 1)
    },
    removeChoices2(index) {
      this.formChoices2.splice(index, 1)
    },
    removeChoices3(index) {
      this.formChoices3.splice(index, 1)
    },
    removeChoices4(index) {
      this.formChoices4.splice(index, 1)
    },
    removeChoices5(index) {
      this.formChoices5.splice(index, 1)
    },
  },
}
</script>

<style scoped>

</style>
