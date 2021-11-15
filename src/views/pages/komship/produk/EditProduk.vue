<template>
  <b-overlay
    :show="loading"
    opacity=".5"
    blur="0"
    variant="light"
    spinner-variant="primary"
    rounded="sm"
  >
    <b-card-actions
      ref="formCard"
      title="Edit Produk"
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

                  <!-- Preview Image -->
                  <transition name="fade">
                    <b-avatar
                      v-if="fieldPreviewImage.length > 0"
                      variant="light-primary"
                      size="50"
                      :src="imageFileFirst ? fileUrl(imageFileFirst) : imageInitialFileFirst"
                      class="mr-50"
                    />
                  </transition>
                  <transition name="fade">
                    <b-avatar
                      v-if="fieldPreviewImage.length > 1"
                      variant="light-primary"
                      size="50"
                      :src="imageFileSecond ? fileUrl(imageFileSecond) : imageInitialFileSecond"
                      class="mr-50"
                    />
                  </transition>
                  <transition name="fade">
                    <b-avatar
                      v-if="fieldPreviewImage.length > 2"
                      variant="light-primary"
                      size="50"
                      :src="imageFileThird ? fileUrl(imageFileThird) : imageInitialFileThird"
                      class="mr-50"
                    />
                  </transition>
                  <transition name="fade">
                    <b-avatar
                      v-if="fieldPreviewImage.length > 3"
                      variant="light-primary"
                      size="50"
                      :src="imageFileFourth ? fileUrl(imageFileFourth) : imageInitialFileFourth"
                      class="mr-50"
                    />
                  </transition>
                  <transition name="fade">
                    <b-avatar
                      v-if="fieldPreviewImage.length > 4"
                      variant="light-primary"
                      size="50"
                      :src="imageFileFifth ? fileUrl(imageFileFifth) : imageInitialFileFifth"
                      class="mr-50"
                    />
                  </transition>

                  <!-- Button Upload Image -->
                  <label
                    v-if="fieldPreviewImage.length === 0"
                    for="uploadImageFirst"
                  >
                    <b-avatar
                      variant="light-dark"
                      size="50"
                      class="btn btn-flat-primary btn-icon"
                    >
                      <feather-icon
                        icon="PlusIcon"
                        size="35"
                      />
                    </b-avatar>
                  </label>
                  <label
                    v-if="fieldPreviewImage.length === 1"
                    for="uploadImageSecond"
                  >
                    <b-avatar
                      variant="light-dark"
                      size="50"
                      class="btn btn-flat-primary btn-icon"
                    >
                      <feather-icon
                        icon="PlusIcon"
                        size="35"
                      />
                    </b-avatar>
                  </label>
                  <label
                    v-if="fieldPreviewImage.length === 2"
                    for="uploadImageThird"
                  >
                    <b-avatar
                      variant="light-dark"
                      size="50"
                      class="btn btn-flat-primary btn-icon"
                    >
                      <feather-icon
                        icon="PlusIcon"
                        size="35"
                      />
                    </b-avatar>
                  </label>
                  <label
                    v-if="fieldPreviewImage.length === 3"
                    for="uploadImageFourth"
                  >
                    <b-avatar
                      variant="light-dark"
                      size="50"
                      class="btn btn-flat-primary btn-icon"
                    >
                      <feather-icon
                        icon="PlusIcon"
                        size="35"
                      />
                    </b-avatar>
                  </label>
                  <label
                    v-if="fieldPreviewImage.length === 4"
                    for="uploadImageFifth"
                  >
                    <b-avatar
                      variant="light-dark"
                      size="50"
                      class="btn btn-flat-primary btn-icon"
                    >
                      <feather-icon
                        icon="PlusIcon"
                        size="35"
                      />
                    </b-avatar>
                  </label>

                  <b-button
                    class="btn-icon ml-50"
                    variant="flat-primary"
                    @click="removePreviewAvatar"
                  >
                    <feather-icon
                      icon="Trash2Icon"
                      size="22"
                    />
                  </b-button>

                  <!-- Field Gambar -->
                  <b-form-file
                    id="uploadImageFirst"
                    v-model="imageFileFirst"
                    :state="errors.length > 0 ? false : null"
                    :placeholder="
                      imageInitialFileFirst
                        ? imageInitialFileFirst.split('/').pop()
                        : `Pilih atau drop file disini...`
                    "
                    drop-placeholder="Drop file disini..."
                    accept="image/*"
                    class="d-none"
                    @change="addAvatarFirst"
                  />
                  <b-form-file
                    id="uploadImageSecond"
                    v-model="imageFileSecond"
                    :state="errors.length > 0 ? false : null"
                    :placeholder="
                      imageInitialFileSecond
                        ? imageInitialFileSecond.split('/').pop()
                        : `Pilih atau drop file disini...`
                    "
                    drop-placeholder="Drop file disini..."
                    accept="image/*"
                    class="d-none"
                    @change="addAvatarSecond"
                  />
                  <b-form-file
                    id="uploadImageThird"
                    v-model="imageFileThird"
                    :state="errors.length > 0 ? false : null"
                    :placeholder="
                      imageInitialFileThird
                        ? imageInitialFileThird.split('/').pop()
                        : `Pilih atau drop file disini...`
                    "
                    drop-placeholder="Drop file disini..."
                    accept="image/*"
                    class="d-none"
                    @change="addAvatarThird"
                  />
                  <b-form-file
                    id="uploadImageFourth"
                    v-model="imageFileFourth"
                    :state="errors.length > 0 ? false : null"
                    :placeholder="
                      imageInitialFileFourth
                        ? imageInitialFileFourth.split('/').pop()
                        : `Pilih atau drop file disini...`
                    "
                    drop-placeholder="Drop file disini..."
                    accept="image/*"
                    class="d-none"
                    @change="addAvatarFourth"
                  />
                  <b-form-file
                    id="uploadImageFifth"
                    v-model="imageFileFifth"
                    :state="errors.length > 0 ? false : null"
                    :placeholder="
                      imageInitialFileFifth
                        ? imageInitialFileFifth.split('/').pop()
                        : `Pilih atau drop file disini...`
                    "
                    drop-placeholder="Drop file disini..."
                    accept="image/*"
                    class="d-none"
                    @change="addAvatarFifth"
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
                                  class="mb-1 d-none"
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
                        class="d-none"
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
                                  class="mb-1 d-none"
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
                        class="d-none"
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
                                  class="mb-1 d-none"
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
                        class="d-none"
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
                    class="mt-1 d-none"
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
                    class="mt-1 d-none"
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
                    class="mt-2 d-none"
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
                        {{ data.item.variant1.val }}
                      </template>

                      <template #cell(variant2)="data">
                        <div
                          v-for="(items, index) in filterVariant2(data)"
                          :key="index+1"
                        >
                          {{ items.variant2.val }}
                        </div>
                      </template>

                      <template #cell(variant3)="data">
                        <div
                          v-for="(dataVariant, index) in data.item.variant1.option"
                          :key="index+1"
                        >
                          <div
                            v-for="(items, indexVariant) in filterVariant3(dataVariant, data)"
                            :key="indexVariant+1"
                          >
                            {{ items.variant3.val }}
                          </div>
                        </div>
                      </template>

                      <template #cell(price)="data">
                        <div
                          v-for="(dataVariant, index) in data.item.variant1.option"
                          :key="index+1"
                        >
                          <div
                            v-for="(items, indexVariant) in filterPrice(dataVariant, data)"
                            :key="indexVariant+1"
                          >
                            {{ items.variant3.price }}
                          </div>
                        </div>
                      </template>

                      <template #cell(stock)="data">
                        <div
                          v-for="(dataVariant, index) in data.item.variant1.option"
                          :key="index+1"
                        >
                          <div
                            v-for="(items, indexVariant) in filterStock(dataVariant, data)"
                            :key="indexVariant+1"
                          >
                            {{ items.variant3.stock }}
                          </div>
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
                          <b-spinner
                            v-if="loadingSubmitVariant"
                            small
                            variant="primary"
                          />
                          Simpan
                        </b-button>
                      </template>

                    </b-table>
                  </b-form-group>
                </transition>

              </b-form-group>
            </b-col>

            <b-col
              v-if="isVariation === false"
              cols="12"
            >
              <b-form-group
                label="Stok"
                label-cols-md="2"
              >
                <b-form-input
                  v-model="stockProduct"
                  placeholder="Masukan jumlah stok barang"
                />
              </b-form-group>
            </b-col>

            <b-col
              v-if="isVariation === false"
              cols="12"
            >
              <b-form-group
                label="Harga"
                label-cols-md="2"
              >
                <b-form-input
                  v-model="priceProduct"
                  placeholder="Rp  |  Masukan harga barang"
                />
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
                variant="flat-warning"
                class="mr-1"
                @click="confirmDelete"
              >
                <b-spinner
                  v-if="loadingSubmit"
                  small
                  variant="light"
                />
                Delete
              </b-button>
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                type="submit"
                variant="outline-primary"
                class="mr-1"
                @click="submitDraft"
              >
                <b-spinner
                  v-if="loadingSubmit"
                  small
                  variant="light"
                />
                Simpan Draft
              </b-button>
              <b-button
                v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                type="reset"
                variant="primary"
                @click="submitPublish"
              >
                <b-spinner
                  v-if="loadingSubmit"
                  small
                  variant="light"
                />
                Publish
              </b-button>
            </b-col>
          </b-row>
        </b-form>
      </validation-observer>

    </b-card-actions>
  </b-overlay>
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
  BOverlay,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import BCardActions from '@/@core/components/b-card-actions/BCardActions.vue'
import draggable from 'vuedraggable'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { required } from '@validations'
import { heightTransition } from '@core/mixins/ui/transition'
import useJwt from '@/auth/jwt/useJwt'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

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
    BOverlay,
  },
  directives: {
    Ripple,
  },
  mixins: [heightTransition],
  data() {
    return {

      productId: this.$route.params.product_id,

      loading: false,
      loadingSubmit: false,
      loadingSubmitVariant: false,
      partnerId: null,

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

      imageFileFirst: null,
      imageInitialFileFirst: null,
      imageFileSecond: null,
      imageInitialFileSecond: null,
      imageFileThird: null,
      imageInitialFileThird: null,
      imageFileFourth: null,
      imageInitialFileFourth: null,
      imageFileFifth: null,
      imageInitialFileFifth: null,

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
      variantStore: [],
      optionStore: [],

      // Validation
      required,
      fieldImage: [],

      fieldPreviewImage: [],

      stockProduct: '',
      priceProduct: '',

      getVariant: [],
      valueVariantThird: [],
      valueVariantSecond: [],
      itemsVariantThird: null,
      fieldVariantThird: [],
      fieldVariantSecond: [],
      itemsVariantSecond: null,
      result: [],
      editOption2: [],
      editOption3: [],
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
    this.loadProduct()
    this.getPartnerId()
  },
  methods: {
    loadProduct() {
      this.loading = true
      this.$httpKomship.get(`/v1/product/detail/${this.productId}`, {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(response => {
        const { data } = response
        console.log(data.message)
        this.productName = data.message.product_name
        this.skuName = data.message.product_sku
        this.descriptionProduct = data.message.product_description
        this.stockProduct = data.message.product_stock
        this.priceProduct = data.message.product_price
        this.weightProduct = data.message.product_weight
        this.lengthProduct = data.message.product_length
        this.widthProduct = data.message.product_width
        this.heightProduct = data.message.product_height
        if (data.message.flavors === 'COD') {
          this.cod = true
          this.transfer = false
        } else {
          this.cod = false
          this.transfer = true
        }

        if (data.message.product_is_variant === '1') {
          this.isVariation = true
          if (data.message.variants[0] !== undefined) {
            this.variationFields1 = true
            this.variationName1 = data.message.variants[0].variant_name
            this.variantStore.push({
              val: this.variationName1,
            })
          }
          if (data.message.variants[1] !== undefined) {
            this.variationFields2 = true
            this.variationName2 = data.message.variants[1].variant_name
            this.variantStore.push({
              val: this.variationName2,
            })
          }
          if (data.message.variants[2] !== undefined) {
            this.variationFields3 = true
            this.variationName3 = data.message.variants[2].variant_name
            this.variantStore.push({
              val: this.variationName3,
            })
          }
        }

        if (data.message.variants[0] !== undefined) {
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < data.message.variants[0].options.length; i++) {
            this.formChoices1.push({ choices: '' })
            this.formChoices1[i].choices = data.message.variants[0].options[i].option_name
          }
        }

        if (data.message.variants[1] !== undefined) {
          data.message.variants[1].options.forEach(this.getVariantSecond)
          this.itemsVariantSecond.forEach(items => this.fieldVariantSecond.push(items))
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < this.fieldVariantSecond.length; i++) {
            this.formChoices2.push({ choices: '' })
            this.formChoices2[i].choices = this.fieldVariantSecond[i]
          }
        }

        if (data.message.variants[2] !== undefined) {
          data.message.variants[2].options.forEach(this.getVariantThird)
          this.itemsVariantThird.forEach(items => this.fieldVariantThird.push(items))
          console.log(this.fieldVariantThird)
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < this.fieldVariantThird.length; i++) {
            this.formChoices3.push({ choices: '' })
            this.formChoices3[i].choices = this.fieldVariantThird[i]
          }
        }

        // eslint-disable-next-line no-plusplus
        for (let x = 0; x < this.formChoices1.length; x++) {
          if (this.formChoices1[x].choices === '') {
            this.formChoices1.splice(x, 1)
          }
        }
        // eslint-disable-next-line no-plusplus
        for (let y = 0; y < this.formChoices2.length; y++) {
          if (this.formChoices2[y].choices === '') {
            this.formChoices2.splice(y, 1)
          }
        }
        // eslint-disable-next-line no-plusplus
        for (let z = 0; z < this.formChoices3.length; z++) {
          if (this.formChoices3[z].choices === '') {
            this.formChoices3.splice(z, 1)
          }
        }

        // Create Table
        // eslint-disable-next-line no-plusplus
        if (data.message.variants[2] !== undefined) {
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < this.formChoices1.length; i++) {
            this.variantItems.push({
              variant1: {
                id: data.message.variants[0].options[i].id,
                val: this.formChoices1[i].choices,
                parent: null,
                stock: null,
                price: null,
                option: [],
              },
            })
            // eslint-disable-next-line no-plusplus
            for (let x = 0; x < data.message.variants[1].options.length; x++) {
              this.variantItems[i].variant1.option.push({
                variant2: {
                  id: data.message.variants[1].options[x].id,
                  parent_id: data.message.variants[1].options[x].option_parent,
                  val: data.message.variants[1].options[x].option_name,
                  parent: 0,
                  stock: null,
                  price: null,
                  option: [],
                },
              })
              // eslint-disable-next-line no-plusplus
              for (let y = 0; y < data.message.variants[2].options.length; y++) {
                this.variantItems[i].variant1.option[x].variant2.option.push({
                  variant3: {
                    parent_id_variant2: data.message.variants[2].options[y].option_parent,
                    parent_id_variant1: data.message.variants[0].options[i].id,
                    id_variant2: data.message.variants[1].options[x].id,
                    val: data.message.variants[2].options[y].option_name,
                    parent: 0,
                    stock: data.message.variants[2].options[y].variant_stock,
                    price: data.message.variants[2].options[y].option_price,
                  },
                })
              }
            }
          }
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

        this.loading = false
      })
    },
    filterVariant2(data) {
      return data.item.variant1.option.filter(items => {
        const result = items.variant2.parent_id === data.item.variant1.id
        return result
      })
    },
    filterVariant3(dataVariant, data) {
      return dataVariant.variant2.option.filter(items => {
        const result = items.variant3.parent_id_variant2 === dataVariant.variant2.id && dataVariant.variant2.parent_id === data.item.variant1.id
        return result
      })
    },
    filterPrice(dataVariant, data) {
      return dataVariant.variant2.option.filter(items => {
        const result = items.variant3.parent_id_variant2 === dataVariant.variant2.id && dataVariant.variant2.parent_id === data.item.variant1.id
        return result
      })
    },
    filterStock(dataVariant, data) {
      return dataVariant.variant2.option.filter(items => {
        const result = items.variant3.parent_id_variant2 === dataVariant.variant2.id && dataVariant.variant2.parent_id === data.item.variant1.id
        return result
      })
    },
    getVariantThird(data) {
      this.valueVariantThird.push(data.option_name)
      this.itemsVariantThird = new Set(this.valueVariantThird)
      return this.itemsVariantThird
    },
    getVariantSecond(data) {
      this.valueVariantSecond.push(data.option_name)
      this.itemsVariantSecond = new Set(this.valueVariantSecond)
      return this.itemsVariantSecond
    },
    addAvatarFirst() {
      this.fieldPreviewImage.push({ avatar: '' })
      console.log(this.fieldPreviewImage.length)
    },
    addAvatarSecond() {
      this.fieldPreviewImage.push({ avatar: '' })
      console.log(this.fieldPreviewImage.length)
    },
    addAvatarThird() {
      this.fieldPreviewImage.push({ avatar: '' })
      console.log(this.fieldPreviewImage.length)
    },
    addAvatarFourth() {
      this.fieldPreviewImage.push({ avatar: '' })
      console.log(this.fieldPreviewImage.length)
    },
    addAvatarFifth() {
      this.fieldPreviewImage.push({ avatar: '' })
      console.log(this.fieldPreviewImage.length)
    },
    removePreviewAvatar() {
      this.fieldPreviewImage.splice(0, 1)
      console.log(this.fieldPreviewImage)
    },
    submitPublish() {
      this.loadingSubmit = true
      if (this.fieldPreviewImage.length === 1) {
        this.fieldImage.push(this.imageFileFirst)
      } else if (this.fieldPreviewImage.length === 2) {
        this.fieldImage.push(this.imageFileFirst)
        this.fieldImage.push(this.imageFileSecond)
      } else if (this.fieldPreviewImage.length === 3) {
        this.fieldImage.push(this.imageFileFirst)
        this.fieldImage.push(this.imageFileSecond)
        this.fieldImage.push(this.imageFileThird)
      } else if (this.fieldPreviewImage.length === 4) {
        this.fieldImage.push(this.imageFileFirst)
        this.fieldImage.push(this.imageFileSecond)
        this.fieldImage.push(this.imageFileThird)
        this.fieldImage.push(this.imageFileFourth)
      } else if (this.fieldPreviewImage.length === 5) {
        this.fieldImage.push(this.imageFileFirst)
        this.fieldImage.push(this.imageFileSecond)
        this.fieldImage.push(this.imageFileThird)
        this.fieldImage.push(this.imageFileFourth)
        this.fieldImage.push(this.imageFileFifth)
      }
      if (this.formChoices3[0] !== undefined) {
        this.variantStore.push(
          {
            val: this.variationName1,
          },
          {
            val: this.variationName2,
          },
          {
            val: this.variationName3,
          },
        )

        // eslint-disable-next-line no-plusplus
        for (let x = 0; x < this.variantItems.length; x++) {
          this.optionStore.push(
            {
              id: this.variantItems[x].variant1.id,
              val: this.variantItems[x].variant1.val,
              parent: 0,
              stock: null,
              price: null,
              option: [],
            },
          )
          // eslint-disable-next-line no-plusplus
          for (let y = 0; y < this.variantItems[x].variant1.option.length; y++) {
            this.optionStore[x].option.push(
              {
                id: this.variantItems[x].variant1.option[y].variant2.id,
                parent_id: this.variantItems[x].variant1.option[y].variant2.parent_id,
                val: this.variantItems[x].variant1.option[y].variant2.val,
                parent: 0,
                stock: null,
                price: null,
                option: [],
              },
            )
            // eslint-disable-next-line no-plusplus
            for (let z = 0; z < this.variantItems[x].variant1.option[y].variant2.option.length; z++) {
              this.optionStore[x].option[y].option.push(
                {
                  parent_id_variant1: this.variantItems[x].variant1.option[y].variant2.option[z].variant3.parent_id_variant1,
                  parent_id_variant2: this.variantItems[x].variant1.option[y].variant2.option[z].variant3.parent_id_variant2,
                  val: this.variantItems[x].variant1.option[y].variant2.option[z].variant3.val,
                  parent: 0,
                  stock: this.variantItems[x].variant1.option[y].variant2.option[z].variant3.stock,
                  price: this.variantItems[x].variant1.option[y].variant2.option[z].variant3.price,
                },
              )
            }
          }
        }
      }

      if (this.cod === true) {
        this.flavours = 'COD'
      } else if (this.transfer === true) {
        this.flavours = 'BANK TRANSFER'
      }
      const formData = new FormData()
      formData.append('_method', 'put')
      formData.append('product_name', this.productName)
      formData.append('sku', this.skuName)
      formData.append('description', this.descriptionProduct)
      formData.append('weight', this.weightProduct)
      formData.append('length', this.lengthProduct)
      formData.append('width', this.widthProduct)
      formData.append('height', this.heightProduct)
      formData.append('flavours', this.flavours)
      this.filterOptionStore(this.optionStore)
      console.log(this.result)

      // this.$httpKomship.post(`/v1/product/update/${this.partnerId}`, formData, {
      //   headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      // }).then(response => {
      //   const { data } = response
      //   console.log(data)
      //   this.loadingSubmit = false
      //   this.$toast({
      //     component: ToastificationContent,
      //     props: {
      //       title: 'Success',
      //       icon: 'CheckIcon',
      //       text: 'Success update produk',
      //       variant: 'success',
      //     },
      //   })
      //   this.$router.push({ name: this.$route.meta.routeAllProduk, query: { tab: 'semua' } })
      // }).catch(() => {
      //   this.loadingSubmit = false
      //   this.$toast({
      //     component: ToastificationContent,
      //     props: {
      //       title: 'Failed',
      //       icon: 'AlertCircleIcon',
      //       text: 'Failed update produk',
      //       variant: 'danger',
      //     },
      //   })
      // })
    },
    filterOptionStore(data) {
      // eslint-disable-next-line no-plusplus
      for (let x = 0; x < data.length; x++) {
        // 2
        this.result.push(
          {
            val: data[x].val,
            parent: 0,
            sold: 0,
            stock: null,
            price: null,
            option: [],
          },
        )
        // eslint-disable-next-line no-plusplus
        for (let y = 0; y < data[x].option.length; y++) {
          // 4
          if (data[x].id === data[x].option[y].parent_id) {
            this.result[x].option.push(
              {
                val: data[x].option[y].val,
                parent: 0,
                sold: 0,
                stock: null,
                price: null,
                option: [],
              },
            )
          }
          // eslint-disable-next-line no-plusplus
          for (let z = 0; z < data[x].option[y].option.length; z++) {
            // 8
            this.result[x].option[y].option.push(
              {
                val: data[x].option[y].option[z].val,
                parent: 0,
                sold: 0,
                stock: data[x].option[y].option[z].stock,
                price: data[x].option[y].option[z].price,
              },
            )
          }
        }
        // eslint-disable-next-line no-plusplus
        // for (let y = 0; y < data[x].option.length; y++) {

        // }
      }
    },
    submitDraft() {
      this.loadingSubmit = true
      if (this.fieldPreviewImage.length === 1) {
        this.fieldImage.push(this.imageFileFirst)
      } else if (this.fieldPreviewImage.length === 2) {
        this.fieldImage.push(this.imageFileFirst)
        this.fieldImage.push(this.imageFileSecond)
      } else if (this.fieldPreviewImage.length === 3) {
        this.fieldImage.push(this.imageFileFirst)
        this.fieldImage.push(this.imageFileSecond)
        this.fieldImage.push(this.imageFileThird)
      } else if (this.fieldPreviewImage.length === 4) {
        this.fieldImage.push(this.imageFileFirst)
        this.fieldImage.push(this.imageFileSecond)
        this.fieldImage.push(this.imageFileThird)
        this.fieldImage.push(this.imageFileFourth)
      } else if (this.fieldPreviewImage.length === 5) {
        this.fieldImage.push(this.imageFileFirst)
        this.fieldImage.push(this.imageFileSecond)
        this.fieldImage.push(this.imageFileThird)
        this.fieldImage.push(this.imageFileFourth)
        this.fieldImage.push(this.imageFileFifth)
      }

      if (this.cod === true) {
        this.flavours = 'COD'
      } else if (this.transfer === true) {
        this.flavours = 'BANK TRANSFER'
      }

      this.$httpKomship.post(`/v1/product/update/${this.partnerId}`, {
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
        const { data } = response
        console.log(data)
        this.loadingSubmit = false
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Success',
            icon: 'CheckIcon',
            text: 'Success update product',
            variant: 'success',
          },
        })
        this.$router.push({ name: this.$route.meta.routeDraftProduk, query: { tab: 'draft' } })
      }).catch(() => {
        this.loadingSubmit = false
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Failed',
            icon: 'AlertCircleIcon',
            text: 'Failed update product',
          },
        })
      })
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
    addChoices1() {
      this.formChoices1.push({ choices: null })
    },
    addChoices2() {
      this.formChoices2.push({ choices: null })
    },
    addChoices3() {
      this.formChoices3.push({ choices: null })
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
    editTable(data) {
      console.log(data.item)
      console.log(data.index)
      this.indexRow = data.index
      this.rowSelected = data.rowSelected
      this.rowSelected = true
      this.editMode = true
    },
    updateTable() {
      this.loadingSubmitVariant = true
      console.log(this.loadingSubmitVariant)
    },
    getPartnerId() {
      this.$httpKomship.post('/v1/my-profile', {}, {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(response => {
        const { data } = response.data
        console.log(data)
        this.partnerId = data.partner_id
      })
    },
    fileUrl: file => (file ? URL.createObjectURL(file) : null),
  },
}
</script>

<style scoped>

</style>
