/* eslint-disable indent */
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
                  v-model="productName"
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
                  v-model="skuName"
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
                  v-model="descriptionProduct"
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

              <transition name="fade">
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
                        <validation-provider
                          #default="{errors}"
                          name="Variasi 1"
                        >
                          <b-form-input
                            v-model="variationName1"
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
                              v-for="(data, indexs) in formChoices1"
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
                          </transition-group>
                        </draggable>
                      </b-form-group>
                    </b-col>

                    <b-col
                      v-if="formChoices1.length < 5"
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
                </div>
              </transition>

              <transition name="fade">
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
                        <validation-provider
                          #default="{errors}"
                          name="Variasi 2"
                        >
                          <b-form-input
                            v-model="variationName2"
                            placeholder="Masukan nama variasi"
                            :state="errors.length > 0 ? false:null"
                          />
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
                        <draggable v-model="myList2">
                          <transition-group name="fade">
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
                                    v-model="data.choices"
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
                          </transition-group>
                        </draggable>
                      </b-form-group>
                    </b-col>

                    <b-col
                      v-if="formChoices2.length < 5"
                      cols="8"
                    >
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
              </transition>

              <transition name="fade">
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
                          v-model="variationName3"
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
                        <draggable v-model="myList3">
                          <transition-group name="fade">
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
                                    v-model="data.choices"
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
                          </transition-group>
                        </draggable>
                      </b-form-group>
                    </b-col>

                    <b-col
                      v-if="formChoices3.length < 5"
                      cols="8"
                    >
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
              </transition>

              <transition name="fade">
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
              </transition>

              <transition name="fade">
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
                      <div v-if="editMode === true && indexRow === data.index">
                        <b-col
                          cols="12"
                          class="mb-50"
                        >
                          <div
                            v-for="(dataItem, index) in data.item"
                            :key="index+1"
                          >
                            <div
                              v-for="(dataVariant, indexVariant) in dataItem.variant1"
                              :key="indexVariant+1"
                            >
                              <div
                                v-for="(itemVariant, indexItem) in dataVariant"
                                :key="indexItem+1"
                              >
                                <b-form-input
                                  v-model="itemVariant.val"
                                  class="mb-50"
                                />
                              </div>
                            </div>
                          </div>
                        </b-col>
                      </div>
                      <div v-else>
                        <b-col
                          cols="12"
                          class="mb-50"
                        >
                          <div
                            v-for="(dataItem, index) in data.item"
                            :key="index+1"
                          >
                            <div
                              v-for="(dataVariant, indexVariant) in dataItem.variant1"
                              :key="indexVariant+1"
                            >
                              <div
                                v-for="(itemVariant, indexItem) in dataVariant"
                                :key="indexItem+1"
                              >
                                {{ itemVariant.val }}
                              </div>
                            </div>
                          </div>
                        </b-col>
                      </div>
                    </template>

                    <template #cell(variant2)="data">
                      <div v-if="editMode === true && indexRow === data.index">
                        <b-col
                          cols="12"
                          class="mb-50"
                        >
                          <div
                            v-for="(dataItem, index) in data.item"
                            :key="index+1"
                          >
                            <div
                              v-for="(dataVariant, indexVariant) in dataItem.variant2"
                              :key="indexVariant+1"
                            >
                              <div
                                v-for="(itemVariant, indexItem) in dataVariant"
                                :key="indexItem+1"
                              >
                                <b-form-input
                                  v-model="itemVariant.val"
                                  class="mb-50"
                                />
                              </div>
                            </div>
                          </div>
                        </b-col>
                      </div>
                      <div v-else>
                        <b-col
                          cols="12"
                          class="mb-50"
                        >
                          <div
                            v-for="(dataItem, index) in data.item"
                            :key="index+1"
                          >
                            <div
                              v-for="(dataVariant, indexVariant) in dataItem.variant2"
                              :key="indexVariant+1"
                            >
                              <div
                                v-for="(itemVariant, indexItem) in dataVariant"
                                :key="indexItem+1"
                              >
                                {{ itemVariant.val }}
                              </div>
                            </div>
                          </div>
                        </b-col>
                      </div>
                    </template>

                    <template #cell(variant3)="data">
                      <div v-if="editMode === true && indexRow === data.index">
                        <b-col
                          cols="12"
                          class="mb-50"
                        >
                          <div
                            v-for="(dataItem, index) in data.item"
                            :key="index+1"
                          >
                            <div
                              v-for="(dataVariant, indexVariant) in dataItem.variant3"
                              :key="indexVariant+1"
                            >
                              <div
                                v-for="(itemVariant, indexItem) in dataVariant"
                                :key="indexItem+1"
                              >
                                <b-form-input
                                  v-model="itemVariant.val"
                                  class="mb-50"
                                />
                              </div>
                            </div>
                          </div>
                        </b-col>
                      </div>
                      <div v-else>
                        <b-col
                          cols="12"
                          class="mb-50"
                        >
                          <div
                            v-for="(dataItem, index) in data.item"
                            :key="index+1"
                          >
                            <div
                              v-for="(dataVariant, indexVariant) in dataItem.variant3"
                              :key="indexVariant+1"
                            >
                              <div
                                v-for="(itemVariant, indexItem) in dataVariant"
                                :key="indexItem+1"
                              >
                                {{ itemVariant.val }}
                              </div>
                            </div>
                          </div>
                        </b-col>
                      </div>
                    </template>

                    <template #cell(price)="data">
                      <div v-if="editMode === true && indexRow === data.index">
                        <b-col cols="12">
                          <div
                            v-for="(dataItem, index) in data.item"
                            :key="index+1"
                          >
                            <div
                              v-for="(dataVariant, indexVariant) in dataItem.variant2"
                              :key="indexVariant+1"
                            >
                              <div
                                v-for="(itemVariant, indexItem) in dataVariant"
                                :key="indexItem+1"
                              >
                                <b-form-input
                                  v-model="itemVariant.price"
                                  class="mb-50"
                                />
                              </div>
                            </div>
                          </div>
                        </b-col>
                      </div>
                      <div v-else>
                        <b-col cols="12">
                          <div
                            v-for="(dataItem, index) in data.item"
                            :key="index+1"
                          >
                            <div
                              v-for="(dataVariant, indexVariant) in dataItem.variant2"
                              :key="indexVariant+1"
                            >
                              <div
                                v-for="(itemVariant, indexItem) in dataVariant"
                                :key="indexItem+1"
                              >
                                {{ itemVariant.price }}
                              </div>
                            </div>
                          </div>
                        </b-col>
                      </div>
                    </template>

                    <template #cell(stock)="data">
                      <div v-if="editMode === true && indexRow === data.index">
                        <b-col cols="12">
                          <div
                            v-for="(dataItem, index) in data.item"
                            :key="index+1"
                          >
                            <div
                              v-for="(dataVariant, indexVariant) in dataItem.variant2"
                              :key="indexVariant+1"
                            >
                              <div
                                v-for="(itemVariant, indexItem) in dataVariant"
                                :key="indexItem+1"
                              >
                                <b-form-input
                                  v-model="itemVariant.stock"
                                  class="mb-50"
                                />
                              </div>
                            </div>
                          </div>
                        </b-col>
                      </div>
                      <div v-else>
                        <b-col cols="12">
                          <div
                            v-for="(dataItem, index) in data.item"
                            :key="index+1"
                          >
                            <div
                              v-for="(dataVariant, indexVariant) in dataItem.variant2"
                              :key="indexVariant+1"
                            >
                              <div
                                v-for="(itemVariant, indexItem) in dataVariant"
                                :key="indexItem+1"
                              >
                                {{ itemVariant.stock }}
                              </div>
                            </div>
                          </div>
                        </b-col>
                      </div>
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
                        @click="updateTable(data)"
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
                    v-model="weightProduct"
                    placeholder="1000"
                  />
                  <b-input-group-append is-text>
                    gram
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
                      v-model="lengthProduct"
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
                      v-model="widthProduct"
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
                      v-model="heightProduct"
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
import useJwt from '@/auth/jwt/useJwt'

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

      loading: false,

      isVariation: false,
      formChoices1: [{ choices: null }],
      formChoices2: [{ choices: null }],
      formChoices3: [{ choices: null }],

      variationFields1: false,
      variationFields2: false,
      variationFields3: false,

      activeAddChoices1: false,
      activeAddChoices2: false,
      activeAddChoices3: false,

      variationName1: null,
      variationName2: null,
      variationName3: null,

      variantChoices1: null,

      // Table
      fields: [],
      variantItems: [],
      stock: '',
      price: '',

      fieldEditData: '',

      imageFile: null,
      imageInitialFile: null,

      editMode: false,

      indexRow: null,

      // Data Store
      productName: '',
      skuName: '',
      descriptionProduct: '',
      weightProduct: null,
      lengthProduct: null,
      widthProduct: null,
      heightProduct: null,
      cod: true,
      transfer: true,
      variantStore: [
        {
          val: null,
          option: [],
        },
        {
          val: null,
          option: [],
        },
        {
          val: null,
          option: [],
        },
      ],
      parentVariant1: 0,
      parentVariant2: 1,
      parentVariant3: 2,
      parentVariant4: 3,
      parentVariant5: 4,

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
  mounted() {
    this.$httpKomship.get('/v1/product', {
      headers: { Authorization: `Bearer ${useJwt.getToken()}` },
    }).then(response => {
      console.log(response.data)
    })
  },
  methods: {
    submitPublish() {
      this.variantStore[0].val = this.variationName1
      this.variantStore[1].val = this.variationName2
      this.variantStore[2].val = this.variationName3

      if (this.formChoices1[0] !== undefined) {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < this.formChoices1.length; i++) {
          this.variantStore[0].option.push(this.variantItems[i][0].variant1.option[0])
        }
      }

      if (this.formChoices2[0] !== undefined && this.formChoices1[0] !== undefined) {
        // eslint-disable-next-line no-plusplus
        for (let i = 1; i < this.formChoices2.length + 1; i++) {
          this.variantStore[1].option.push(this.variantItems[0][i].variant2.option[0])
        }
      }

      if (this.formChoices2[0] !== undefined && this.formChoices1[1] !== undefined) {
        // eslint-disable-next-line no-plusplus
        for (let i = 1; i < this.formChoices2.length + 1; i++) {
          this.variantStore[1].option.push(this.variantItems[1][i].variant2.option[0])
        }
      }

      if (this.formChoices2[0] !== undefined && this.formChoices1[2] !== undefined) {
        // eslint-disable-next-line no-plusplus
        for (let i = 1; i < this.formChoices2.length + 1; i++) {
          this.variantStore[1].option.push(this.variantItems[2][i].variant2.option[0])
        }
      }

      if (this.formChoices2[0] !== undefined && this.formChoices1[3] !== undefined) {
        // eslint-disable-next-line no-plusplus
        for (let i = 1; i < this.formChoices2.length + 1; i++) {
          this.variantStore[1].option.push(this.variantItems[3][i].variant2.option[0])
        }
      }

      if (this.formChoices2[0] !== undefined && this.formChoices1[4] !== undefined) {
        // eslint-disable-next-line no-plusplus
        for (let i = 1; i < this.formChoices2.length + 1; i++) {
          this.variantStore[1].option.push(this.variantItems[4][i].variant2.option[0])
        }
      }

      if (this.formChoices3[0] !== undefined) {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < this.formChoices3.length; i++) {
          this.variantStore[2].option.push(this.variantItems[i][0].variant3.option[0])
        }
      }

      if (this.cod === true) {
        this.flavours = 'COD'
      } else if (this.transfer === true) {
        this.flavours = 'BANK TRANSFER'
      }
      console.log(this.productName)
      console.log(this.skuName)
      console.log(this.descriptionProduct)
      console.log(this.weightProduct)
      console.log(this.lengthProduct)
      console.log(this.heightProduct)
      console.log(this.flavours)
      console.log(this.variantStore)

      this.$httpKomship.post('/v1/product/create/618', {
        product_name: this.productName,
        sku: this.skuName,
        description: this.descriptionProduct,
        weight: this.weightProduct,
        length: this.lengthProduct,
        width: this.widthProduct,
        height: this.heightProduct,
        price: this.price,
        stock: this.stock,
        flavours: this.flavours,
        variant_option: this.variantStore,
      }, {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(response => {
        console.log(response)
      })
    },
    createListVariation() {
      const tesArray = [
        {
          val: 'Warna',
          option: [{
            val: 'Merah',
            parent: null,
            stock: null,
            price: null,
          },
          {
            val: 'Biru',
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
              val: 'S',
              parent: 0,
              stock: 99,
              price: 1000,
            },
            {
              val: 'M',
              parent: 0,
              stock: 99,
              price: 1000,
            },
            {
              val: 'S',
              parent: 1,
              stock: 99,
              price: 1000,
            },
            {
              val: 'M',
              parent: 1,
              stock: 99,
              price: 1000,
            },
          ],
        },
        {
          val: 'Jenis',
          option: [
            {
              val: 'Kalung',
              parent: 0,
              stock: 99,
              price: 1000,
            },
            {
              val: 'Cincin',
              parent: 0,
              stock: 99,
              price: 1000,
            },
            {
              val: 'Kalung',
              parent: 1,
              stock: 99,
              price: 1000,
            },
            {
              val: 'Cincin',
              parent: 1,
              stock: 99,
              price: 1000,
            },
          ],
        },
      ]
      console.log(tesArray)
      // Per Row
      // Variant 1
      if (this.formChoices1[0] !== undefined) {
        if (this.variantItems.length < 2) {
        // eslint-disable-next-line no-plusplus
          for (let i = 0; i < this.formChoices3.length; i++) {
            this.variantItems.push([{
              variant1: {
                option: [
                  {
                    val: this.formChoices1[0].choices,
                    parent: null,
                    stock: null,
                    price: null,
                  },
                ],
              },
              variant3: {
                option: [
                  {
                    val: this.formChoices3[i].choices,
                    parent: 0,
                    stock: this.stock,
                    price: this.price,
                  },
                ],
              },
            }])
          }
        }
      }
      if (this.formChoices1[1] !== undefined) {
        this.variantItems.push([{
          variant1: {
            option: [
              {
                val: this.formChoices1[1].choices,
                parent: null,
                stock: null,
                price: null,
              },
            ],
          },
        }])
        if (this.variantItems.length > 1) {
        // eslint-disable-next-line no-plusplus
          for (let i = 0; i < this.formChoices3.length; i++) {
            this.variantItems.push([{
              variant1: {
                option: [
                  {
                    val: this.formChoices1[1].choices,
                    parent: null,
                    stock: null,
                    price: null,
                  },
                ],
              },
              variant3: {
                option: [
                  {
                    val: this.formChoices3[i].choices,
                    parent: 1,
                    stock: this.stock,
                    price: this.price,
                  },
                ],
              },
            }])
          }
        }
      }
      if (this.formChoices1[2] !== undefined) {
        this.variantItems.push([{
          variant1: {
            option: [
              {
                val: this.formChoices1[2].choices,
                parent: null,
                stock: null,
                price: null,
              },
            ],
          },
        }])
        if (this.variantItems.length > 2) {
        // eslint-disable-next-line no-plusplus
          for (let i = 0; i < this.formChoices3.length; i++) {
            this.variantItems.push([{
              variant1: {
                option: [
                  {
                    val: this.formChoices1[2].choices,
                    parent: null,
                    stock: null,
                    price: null,
                  },
                ],
              },
              variant3: {
                option: [
                  {
                    val: this.formChoices3[i].choices,
                    parent: 2,
                    stock: this.stock,
                    price: this.price,
                  },
                ],
              },
            }])
          }
        }
      }
      if (this.formChoices1[3] !== undefined) {
        this.variantItems.push([{
          variant1: {
            option: [
              {
                val: this.formChoices1[3].choices,
                parent: null,
                stock: null,
                price: null,
              },
            ],
          },
        }])
        if (this.variantItems.length > 2) {
        // eslint-disable-next-line no-plusplus
          for (let i = 0; i < this.formChoices3.length; i++) {
            this.variantItems.push([{
              variant1: {
                option: [
                  {
                    val: this.formChoices1[3].choices,
                    parent: null,
                    stock: null,
                    price: null,
                  },
                ],
              },
              variant3: {
                option: [
                  {
                    val: this.formChoices3[i].choices,
                    parent: 3,
                    stock: this.stock,
                    price: this.price,
                  },
                ],
              },
            }])
          }
        }
      }
      if (this.formChoices1[4] !== undefined) {
        this.variantItems.push([{
          variant1: {
            option: [
              {
                val: this.formChoices1[4].choices,
                parent: null,
                stock: null,
                price: null,
              },
            ],
          },
        }])
        if (this.variantItems.length > 2) {
        // eslint-disable-next-line no-plusplus
          for (let i = 0; i < this.formChoices3.length; i++) {
            this.variantItems.push([{
              variant1: {
                option: [
                  {
                    val: this.formChoices1[4].choices,
                    parent: null,
                    stock: null,
                    price: null,
                  },
                ],
              },
              variant3: {
                option: [
                  {
                    val: this.formChoices3[i].choices,
                    parent: 4,
                    stock: this.stock,
                    price: this.price,
                  },
                ],
              },
            }])
          }
        }
      }

      // Delete row undefined
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < this.variantItems.length; i++) {
        if (this.variantItems[i][0].variant3 === undefined) {
          this.variantItems.splice(i, 1)
        }
      }

      // Variant 2
      if (this.formChoices2[0] !== undefined && this.variantItems[0] !== undefined) {
        this.variantItems[0].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[0].choices,
                parent: 0,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[1] !== undefined && this.variantItems[0] !== undefined) {
        this.variantItems[0].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[1].choices,
                parent: 0,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[2] !== undefined && this.variantItems[0] !== undefined) {
        this.variantItems[0].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[2].choices,
                parent: 0,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[3] !== undefined && this.variantItems[0] !== undefined) {
        this.variantItems[0].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[3].choices,
                parent: 0,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[4] !== undefined && this.variantItems[0] !== undefined) {
        this.variantItems[0].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[4].choices,
                parent: 0,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }

      if (this.formChoices2[0] !== undefined && this.variantItems[1] !== undefined) {
        this.variantItems[1].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[0].choices,
                parent: 1,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[1] !== undefined && this.variantItems[1] !== undefined) {
        this.variantItems[1].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[1].choices,
                parent: 1,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[2] !== undefined && this.variantItems[1] !== undefined) {
        this.variantItems[1].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[2].choices,
                parent: 1,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[3] !== undefined && this.variantItems[1] !== undefined) {
        this.variantItems[1].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[3].choices,
                parent: 1,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[4] !== undefined && this.variantItems[1] !== undefined) {
        this.variantItems[1].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[4].choices,
                parent: 1,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }

      if (this.formChoices2[0] !== undefined && this.variantItems[2] !== undefined) {
        this.variantItems[2].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[0].choices,
                parent: 2,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[1] !== undefined && this.variantItems[2] !== undefined) {
        this.variantItems[2].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[1].choices,
                parent: 2,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[2] !== undefined && this.variantItems[2] !== undefined) {
        this.variantItems[2].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[2].choices,
                parent: 2,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[3] !== undefined && this.variantItems[2] !== undefined) {
        this.variantItems[2].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[3].choices,
                parent: 2,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[4] !== undefined && this.variantItems[2] !== undefined) {
        this.variantItems[2].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[4].choices,
                parent: 2,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }

      if (this.formChoices2[0] !== undefined && this.variantItems[3] !== undefined) {
        this.variantItems[3].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[0].choices,
                parent: 3,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[1] !== undefined && this.variantItems[3] !== undefined) {
        this.variantItems[3].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[1].choices,
                parent: 3,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[2] !== undefined && this.variantItems[3] !== undefined) {
        this.variantItems[3].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[2].choices,
                parent: 3,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[3] !== undefined && this.variantItems[3] !== undefined) {
        this.variantItems[3].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[3].choices,
                parent: 3,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[4] !== undefined && this.variantItems[3] !== undefined) {
        this.variantItems[3].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[4].choices,
                parent: 3,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }

      if (this.formChoices2[0] !== undefined && this.variantItems[4] !== undefined) {
        this.variantItems[4].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[0].choices,
                parent: 4,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[1] !== undefined && this.variantItems[4] !== undefined) {
        this.variantItems[4].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[1].choices,
                parent: 4,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[2] !== undefined && this.variantItems[4] !== undefined) {
        this.variantItems[4].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[2].choices,
                parent: 4,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[3] !== undefined && this.variantItems[4] !== undefined) {
        this.variantItems[4].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[3].choices,
                parent: 4,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[4] !== undefined && this.variantItems[4] !== undefined) {
        this.variantItems[4].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[4].choices,
                parent: 4,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }

      if (this.formChoices2[0] !== undefined && this.variantItems[5] !== undefined) {
        this.variantItems[5].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[0].choices,
                parent: 5,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[1] !== undefined && this.variantItems[5] !== undefined) {
        this.variantItems[5].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[1].choices,
                parent: 5,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[2] !== undefined && this.variantItems[5] !== undefined) {
        this.variantItems[5].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[2].choices,
                parent: 5,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[3] !== undefined && this.variantItems[5] !== undefined) {
        this.variantItems[5].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[3].choices,
                parent: 5,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[4] !== undefined && this.variantItems[5] !== undefined) {
        this.variantItems[5].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[4].choices,
                parent: 5,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }

      if (this.formChoices2[0] !== undefined && this.variantItems[6] !== undefined) {
        this.variantItems[6].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[0].choices,
                parent: 6,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[1] !== undefined && this.variantItems[6] !== undefined) {
        this.variantItems[6].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[1].choices,
                parent: 6,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[2] !== undefined && this.variantItems[6] !== undefined) {
        this.variantItems[6].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[2].choices,
                parent: 6,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[3] !== undefined && this.variantItems[6] !== undefined) {
        this.variantItems[6].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[3].choices,
                parent: 6,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[4] !== undefined && this.variantItems[6] !== undefined) {
        this.variantItems[6].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[4].choices,
                parent: 6,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }

      if (this.formChoices2[0] !== undefined && this.variantItems[7] !== undefined) {
        this.variantItems[7].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[0].choices,
                parent: 7,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[1] !== undefined && this.variantItems[7] !== undefined) {
        this.variantItems[7].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[1].choices,
                parent: 7,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[2] !== undefined && this.variantItems[7] !== undefined) {
        this.variantItems[7].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[2].choices,
                parent: 7,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[3] !== undefined && this.variantItems[7] !== undefined) {
        this.variantItems[7].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[3].choices,
                parent: 7,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[4] !== undefined && this.variantItems[7] !== undefined) {
        this.variantItems[7].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[4].choices,
                parent: 7,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }

      if (this.formChoices2[0] !== undefined && this.variantItems[8] !== undefined) {
        this.variantItems[8].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[0].choices,
                parent: 8,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[1] !== undefined && this.variantItems[8] !== undefined) {
        this.variantItems[8].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[1].choices,
                parent: 8,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[2] !== undefined && this.variantItems[8] !== undefined) {
        this.variantItems[8].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[2].choices,
                parent: 8,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[3] !== undefined && this.variantItems[8] !== undefined) {
        this.variantItems[8].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[3].choices,
                parent: 8,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[4] !== undefined && this.variantItems[8] !== undefined) {
        this.variantItems[8].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[4].choices,
                parent: 8,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }

      if (this.formChoices2[0] !== undefined && this.variantItems[9] !== undefined) {
        this.variantItems[9].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[0].choices,
                parent: 9,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[1] !== undefined && this.variantItems[9] !== undefined) {
        this.variantItems[9].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[1].choices,
                parent: 9,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[2] !== undefined && this.variantItems[9] !== undefined) {
        this.variantItems[9].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[2].choices,
                parent: 9,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[3] !== undefined && this.variantItems[9] !== undefined) {
        this.variantItems[9].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[3].choices,
                parent: 9,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[4] !== undefined && this.variantItems[9] !== undefined) {
        this.variantItems[9].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[4].choices,
                parent: 9,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }

      if (this.formChoices2[0] !== undefined && this.variantItems[10] !== undefined) {
        this.variantItems[10].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[0].choices,
                parent: 10,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[1] !== undefined && this.variantItems[10] !== undefined) {
        this.variantItems[10].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[1].choices,
                parent: 10,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[2] !== undefined && this.variantItems[10] !== undefined) {
        this.variantItems[10].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[2].choices,
                parent: 10,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[3] !== undefined && this.variantItems[10] !== undefined) {
        this.variantItems[10].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[3].choices,
                parent: 10,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[4] !== undefined && this.variantItems[10] !== undefined) {
        this.variantItems[10].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[4].choices,
                parent: 10,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }

      if (this.formChoices2[0] !== undefined && this.variantItems[11] !== undefined) {
        this.variantItems[11].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[0].choices,
                parent: 11,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[1] !== undefined && this.variantItems[11] !== undefined) {
        this.variantItems[11].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[1].choices,
                parent: 11,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[2] !== undefined && this.variantItems[11] !== undefined) {
        this.variantItems[11].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[2].choices,
                parent: 11,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[3] !== undefined && this.variantItems[11] !== undefined) {
        this.variantItems[11].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[3].choices,
                parent: 11,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[4] !== undefined && this.variantItems[11] !== undefined) {
        this.variantItems[11].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[4].choices,
                parent: 11,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }

      if (this.formChoices2[0] !== undefined && this.variantItems[12] !== undefined) {
        this.variantItems[12].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[0].choices,
                parent: 12,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[1] !== undefined && this.variantItems[12] !== undefined) {
        this.variantItems[12].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[1].choices,
                parent: 12,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[2] !== undefined && this.variantItems[12] !== undefined) {
        this.variantItems[12].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[2].choices,
                parent: 12,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[3] !== undefined && this.variantItems[12] !== undefined) {
        this.variantItems[12].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[3].choices,
                parent: 12,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[4] !== undefined && this.variantItems[12] !== undefined) {
        this.variantItems[12].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[4].choices,
                parent: 12,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }

      if (this.formChoices2[0] !== undefined && this.variantItems[13] !== undefined) {
        this.variantItems[13].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[0].choices,
                parent: 13,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[1] !== undefined && this.variantItems[13] !== undefined) {
        this.variantItems[13].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[1].choices,
                parent: 13,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[2] !== undefined && this.variantItems[13] !== undefined) {
        this.variantItems[13].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[2].choices,
                parent: 13,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[3] !== undefined && this.variantItems[13] !== undefined) {
        this.variantItems[13].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[3].choices,
                parent: 13,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[4] !== undefined && this.variantItems[13] !== undefined) {
        this.variantItems[13].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[4].choices,
                parent: 13,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }

      if (this.formChoices2[0] !== undefined && this.variantItems[14] !== undefined) {
        this.variantItems[14].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[0].choices,
                parent: 14,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[1] !== undefined && this.variantItems[14] !== undefined) {
        this.variantItems[14].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[1].choices,
                parent: 14,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[2] !== undefined && this.variantItems[14] !== undefined) {
        this.variantItems[14].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[2].choices,
                parent: 14,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[3] !== undefined && this.variantItems[14] !== undefined) {
        this.variantItems[14].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[3].choices,
                parent: 14,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[4] !== undefined && this.variantItems[14] !== undefined) {
        this.variantItems[14].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[4].choices,
                parent: 14,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }

      if (this.formChoices2[0] !== undefined && this.variantItems[15] !== undefined) {
        this.variantItems[15].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[0].choices,
                parent: 15,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[1] !== undefined && this.variantItems[15] !== undefined) {
        this.variantItems[15].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[1].choices,
                parent: 15,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[2] !== undefined && this.variantItems[15] !== undefined) {
        this.variantItems[15].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[2].choices,
                parent: 15,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[3] !== undefined && this.variantItems[15] !== undefined) {
        this.variantItems[15].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[3].choices,
                parent: 15,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[4] !== undefined && this.variantItems[15] !== undefined) {
        this.variantItems[15].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[4].choices,
                parent: 15,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }

      if (this.formChoices2[0] !== undefined && this.variantItems[16] !== undefined) {
        this.variantItems[16].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[0].choices,
                parent: 16,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[1] !== undefined && this.variantItems[16] !== undefined) {
        this.variantItems[16].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[1].choices,
                parent: 16,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[2] !== undefined && this.variantItems[16] !== undefined) {
        this.variantItems[16].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[2].choices,
                parent: 16,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[3] !== undefined && this.variantItems[16] !== undefined) {
        this.variantItems[16].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[3].choices,
                parent: 16,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[4] !== undefined && this.variantItems[16] !== undefined) {
        this.variantItems[16].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[4].choices,
                parent: 16,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }

      if (this.formChoices2[0] !== undefined && this.variantItems[17] !== undefined) {
        this.variantItems[17].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[0].choices,
                parent: 17,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[1] !== undefined && this.variantItems[17] !== undefined) {
        this.variantItems[17].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[1].choices,
                parent: 17,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[2] !== undefined && this.variantItems[17] !== undefined) {
        this.variantItems[17].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[2].choices,
                parent: 17,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[3] !== undefined && this.variantItems[17] !== undefined) {
        this.variantItems[17].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[3].choices,
                parent: 17,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[4] !== undefined && this.variantItems[17] !== undefined) {
        this.variantItems[17].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[4].choices,
                parent: 17,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }

      if (this.formChoices2[0] !== undefined && this.variantItems[18] !== undefined) {
        this.variantItems[18].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[0].choices,
                parent: 18,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[1] !== undefined && this.variantItems[18] !== undefined) {
        this.variantItems[18].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[1].choices,
                parent: 18,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[2] !== undefined && this.variantItems[18] !== undefined) {
        this.variantItems[18].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[2].choices,
                parent: 18,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[3] !== undefined && this.variantItems[18] !== undefined) {
        this.variantItems[18].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[3].choices,
                parent: 18,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[4] !== undefined && this.variantItems[18] !== undefined) {
        this.variantItems[18].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[4].choices,
                parent: 18,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }

      if (this.formChoices2[0] !== undefined && this.variantItems[19] !== undefined) {
        this.variantItems[19].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[0].choices,
                parent: 19,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[1] !== undefined && this.variantItems[19] !== undefined) {
        this.variantItems[19].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[1].choices,
                parent: 19,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[2] !== undefined && this.variantItems[19] !== undefined) {
        this.variantItems[19].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[2].choices,
                parent: 19,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[3] !== undefined && this.variantItems[19] !== undefined) {
        this.variantItems[19].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[3].choices,
                parent: 19,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[4] !== undefined && this.variantItems[19] !== undefined) {
        this.variantItems[19].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[4].choices,
                parent: 19,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }

      if (this.formChoices2[0] !== undefined && this.variantItems[20] !== undefined) {
        this.variantItems[20].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[0].choices,
                parent: 20,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[1] !== undefined && this.variantItems[20] !== undefined) {
        this.variantItems[20].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[1].choices,
                parent: 20,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[2] !== undefined && this.variantItems[20] !== undefined) {
        this.variantItems[20].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[2].choices,
                parent: 20,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[3] !== undefined && this.variantItems[20] !== undefined) {
        this.variantItems[20].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[3].choices,
                parent: 20,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[4] !== undefined && this.variantItems[20] !== undefined) {
        this.variantItems[20].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[4].choices,
                parent: 20,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }

      if (this.formChoices2[0] !== undefined && this.variantItems[21] !== undefined) {
        this.variantItems[21].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[0].choices,
                parent: 21,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[1] !== undefined && this.variantItems[21] !== undefined) {
        this.variantItems[21].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[1].choices,
                parent: 21,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[2] !== undefined && this.variantItems[21] !== undefined) {
        this.variantItems[21].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[2].choices,
                parent: 21,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[3] !== undefined && this.variantItems[21] !== undefined) {
        this.variantItems[21].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[3].choices,
                parent: 21,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[4] !== undefined && this.variantItems[21] !== undefined) {
        this.variantItems[21].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[4].choices,
                parent: 21,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }

      if (this.formChoices2[0] !== undefined && this.variantItems[22] !== undefined) {
        this.variantItems[22].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[0].choices,
                parent: 22,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[1] !== undefined && this.variantItems[22] !== undefined) {
        this.variantItems[22].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[1].choices,
                parent: 22,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[2] !== undefined && this.variantItems[22] !== undefined) {
        this.variantItems[22].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[2].choices,
                parent: 22,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[3] !== undefined && this.variantItems[22] !== undefined) {
        this.variantItems[22].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[3].choices,
                parent: 22,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[4] !== undefined && this.variantItems[22] !== undefined) {
        this.variantItems[22].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[4].choices,
                parent: 22,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }

      if (this.formChoices2[0] !== undefined && this.variantItems[23] !== undefined) {
        this.variantItems[23].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[0].choices,
                parent: 23,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[1] !== undefined && this.variantItems[23] !== undefined) {
        this.variantItems[23].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[1].choices,
                parent: 23,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[2] !== undefined && this.variantItems[23] !== undefined) {
        this.variantItems[23].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[2].choices,
                parent: 23,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[3] !== undefined && this.variantItems[23] !== undefined) {
        this.variantItems[23].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[3].choices,
                parent: 23,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[4] !== undefined && this.variantItems[23] !== undefined) {
        this.variantItems[23].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[4].choices,
                parent: 23,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }

      if (this.formChoices2[0] !== undefined && this.variantItems[24] !== undefined) {
        this.variantItems[24].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[0].choices,
                parent: 24,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[1] !== undefined && this.variantItems[24] !== undefined) {
        this.variantItems[24].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[1].choices,
                parent: 24,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[2] !== undefined && this.variantItems[24] !== undefined) {
        this.variantItems[24].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[2].choices,
                parent: 24,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[3] !== undefined && this.variantItems[24] !== undefined) {
        this.variantItems[24].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[3].choices,
                parent: 24,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }
      if (this.formChoices2[4] !== undefined && this.variantItems[24] !== undefined) {
        this.variantItems[24].push({
          variant2: {
            option: [
              {
                val: this.formChoices2[4].choices,
                parent: 24,
                stock: this.stock,
                price: this.price,
              },
            ],
          },
        })
      }

      if (this.variationName1 !== null) {
        this.fields.push({
          key: 'variant1',
          label: String(this.variationName1),
        })
      }
      if (this.variationName2 !== null) {
        this.fields.push({
          key: 'variant2',
          label: String(this.variationName2),
        })
      }
      if (this.variationName3 !== null) {
        this.fields.push({
          key: 'variant3',
          label: String(this.variationName3),
        })
      }
      if (this.price !== null) {
        this.fields.push({
          key: 'price',
          label: 'Harga',
        })
      }
      if (this.stock !== null) {
        this.fields.push({
          key: 'stock',
          label: 'Stok',
        })
      }
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.fields.push(
          {
            key: 'action',
            label: 'Aksi',
            class: 'col-action',
          },
        )
      }, 1000)
      console.log(this.variantItems)

      return this.variantItems
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
      this.formChoices1.push({ choices: null })
    },
    addChoices2() {
      this.formChoices2.push({ choices: null })
    },
    addChoices3() {
      this.formChoices3.push({ choices: null })
    },
    addChoices4() {
      this.formChoices4.push({ choices: null })
    },
    addChoices5() {
      this.formChoices5.push({ choices: null })
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
    editTable(data) {
      console.log(data)
      console.log(data.index)
      this.indexRow = data.index
      this.rowSelected = data.rowSelected
      this.rowSelected = true
      this.editMode = true
    },
    updateTable(data) {
      this.editMode = false
      console.log(data)
      console.log(this.variantItems)
    },
    fileUrl: file => (file ? URL.createObjectURL(file) : null),
  },
}
</script>

<style scoped>

</style>
