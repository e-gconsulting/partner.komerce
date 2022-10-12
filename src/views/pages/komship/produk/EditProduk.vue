<template>
  <b-overlay
    variant="light"
    :show="loadingLoadData"
    spinner-variant="primary"
    blur="0"
    opacity=".75"
    rounded="sm"
  >
    <b-card-actions
      ref="formCard"
      no-actions
    >

      <b-row class="align-items-center">
        <div
          class="wrapper__handle__back ml-50 cursor-pointer"
          @click="goBack"
        >
          <feather-icon
            icon="ChevronLeftIcon"
            size="25"
            style="color: black;"
          />
        </div>
        <h3 class="text-black ml-1 mt-50">
          <strong>
            Edit Produk
          </strong>
        </h3>
      </b-row>
      <validation-observer ref="formRules">
        <b-form
          class="mt-1"
        >
          <b-row>

            <b-row class="mx-1 p-2 wrapper__product__name mb-2">
              <b-row class="ml-50">
                <h4 class="text-black ml-50 mt-50">
                  <strong>
                    Informasi Produk
                  </strong>
                </h4>
              </b-row>
              <b-col
                cols="12"
                class="mb-2 mt-1"
              >
                <b-row>
                  <b-col
                    cols="2"
                  >
                    <label for="name-product">
                      <h5>
                        <strong>
                          Nama Produk<span class="text-primary">*</span>
                        </strong>
                      </h5>
                    </label>
                  </b-col>

                  <b-col
                    cols="10"
                  >
                    <validation-provider
                      #default="{errors}"
                      name="Nama Produk"
                      rules="required"
                    >
                      <b-form-input
                        id="name-product"
                        v-model="productName"
                        class="wrapper__form__input__variant"
                        placeholder="Contoh: Jilbab Pashmina"
                        :formatter="formatNameProduct"
                        :state="errors.length > 0 ? false:null"
                        :style="errors[0] || !productNameAvailable ? 'background-color: #FFEDED;' : 'background-color: white;'"
                        @keypress="validateInputProductName"
                        @input="checkProductName"
                      />
                      <b-row>
                        <small
                          v-if="errors[0]"
                          class="text-primary ml-1 mt-50"
                        >*Wajib diisi ya</small>
                        <small
                          v-if="!productNameAvailable"
                          class="text-primary mt-50"
                        >
                          *Nama produk sudah dipakai, yuk coba dengan nama lain
                        </small>
                        <small
                          v-if="messageErrorLengthProduct"
                          class="text-primary mt-50 ml-1"
                        >
                          *Terlalu pendek
                        </small>
                        <small class="ml-auto mr-1 mt-50">
                          <small
                            v-if="messageErrorIsActive"
                            class="text-primary"
                          >
                            *hindari menggunakan simbol (/) (=) (:) (;) (&)
                          </small>
                          {{ productName.length }}/60
                        </small>
                      </b-row>
                    </validation-provider>
                  </b-col>
                </b-row>
              </b-col>

              <b-col
                cols="12"
                class="mb-2"
              >
                <b-row>
                  <b-col
                    cols="2"
                  >
                    <label for="sku-product">
                      <div class="d-flex">
                        <h5 class="mr-50 mt-50">
                          <strong>
                            SKU
                          </strong>
                        </h5>
                        <img
                          id="infoSaldoPending"
                          src="@/assets/images/icons/info-circle.svg"
                        >
                        <b-popover
                          triggers="hover"
                          target="infoSaldoPending"
                          placement="topright"
                          custom-class="my-popover-class"
                        >
                          Stock Keeping Unit adalah kode unik untuk menandai barangmu. Kalo punya, kamu bisa isi loh...
                        </b-popover>
                      </div>
                    </label>
                  </b-col>

                  <b-col
                    cols="10"
                  >
                    <b-form-input
                      id="sku-product"
                      v-model="skuName"
                      class="wrapper__form__input__variant"
                      placeholder="Contoh: Pashmina-001"
                      :formatter="formatSkuProduct"
                      :style="!skuNameAvailable ? 'background-color: #FFEDED;' : 'background-color: white;'"
                      @input="checkSkuName"
                    />
                    <b-row>
                      <small
                        v-if="!skuNameAvailable"
                        class="text-primary mt-50"
                      >
                        *SKU sudah digunakan, yuk coba dengan nama lain
                      </small>
                      <small class="ml-auto mr-1 mt-50">
                        <small
                          v-if="messageErrorIsActive"
                          class="text-primary"
                        >
                          *hindari menggunakan simbol (/) (=) (:) (;) (&)
                        </small>
                        {{ skuName.length }}/60
                      </small>
                    </b-row>
                  </b-col>
                </b-row>
              </b-col>

              <b-col
                cols="12"
                class="mb-2"
              >
                <b-row>
                  <b-col
                    cols="2"
                  >
                    <label for="description-product">
                      <h5>
                        <strong>
                          Deskripsi Produk
                        </strong>
                      </h5>
                    </label>
                  </b-col>

                  <b-col
                    cols="10"
                  >
                    <b-form-textarea
                      id="description-product"
                      v-model="descriptionProduct"
                      :formatter="formatDescriptionProduct"
                      placeholder="Masukkan deskripsi produkmu di sini ya"
                      rows="3"
                    />
                    <b-row>
                      <small class="ml-auto mr-1 mt-50">
                        {{ descriptionProduct.length }}/300
                      </small>
                    </b-row>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>

            <b-row class="mx-1 wrapper__product__variant mb-2">
              <b-row
                class="py-2 w-100 justify-content-between align-items-center ml-50"
                :style="isVariantActive ? 'border-bottom: 1px solid #E2E2E2; margin: 0px 0px 0px 0px;' : 'margin: 0px 0px 0px 0px;'"
              >
                <div class="ml-1">
                  <h4 class="text-black ml-1 mt-50">
                    <strong>
                      Varian Produk
                    </strong>
                  </h4>
                  <span class="ml-1">
                    Kamu bisa menambah varian seperti warna, ukuran, atau lainnya disini loh.
                  </span>
                </div>
                <div>
                  <b-button
                    :variant="isVariantActive ? 'flat-dark' : 'flat-primary'"
                    :class="isVariantActive ? 'text-dark btn-icon mr-2' : 'text-primary btn-icon mr-2'"
                    style="border: 1px solid #E2E2E2;"
                    @click="handleIsVariant"
                  >
                    <feather-icon
                      :icon="isVariantActive ? 'MinusIcon' : 'PlusIcon'"
                      style="display: inline-block!important;"
                    />
                    {{ isVariantActive ? 'Hapus Varian' : 'Tambah Varian' }}
                  </b-button>
                </div>
              </b-row>

              <!-- Variant -->
              <b-row
                v-if="isVariantActive"
                class="w-100 mx-1 mt-2 mb-2"
              >
                <b-row
                  v-for="(item, index) in variantInputItems"
                  :key="index+1"
                  class="w-100 mb-2 ml-50"
                >
                  <b-col
                    cols="12"
                  >
                    <h4
                      class="text-black mb-1"
                      style="font-weight: 500;"
                    >
                      Tipe Variasi {{ index+1 }}
                    </h4>
                  </b-col>
                  <b-col
                    cols="12"
                    class="ml-1"
                  >
                    <b-row class="w-100">
                      <b-col cols="6">
                        <b-form-group
                          label-for="variant-name"
                        >
                          <template #label>
                            <span style="font-size: 14px;">
                              <strong>
                                Nama Variasi
                              </strong>
                            </span>
                          </template>
                          <div class="d-flex align-items-center">
                            <b-form-input
                              id="variant-name"
                              v-model="item.variant.variantName"
                              placeholder="Contoh: Warna, Ukuran, Bahan"
                              :formatter="formatterVariantNameProduct"
                              class="wrapper__form__input__variant"
                              :style="item.variant.isValid === false ? 'background-color: #FFEDED;' : 'background-color: white;'"
                              @input="validateVariantField(item, index)"
                            />
                            <div>
                              <b-button
                                class="btn-icon"
                                size="sm"
                                variant="flat-dark"
                                @click="handleDeleteVariant(item)"
                              >
                                <b-img
                                  src="@/assets/images/icons/trash.svg"
                                  width="30"
                                />
                              </b-button>
                            </div>
                          </div>
                          <small
                            v-if="item.variant.isValid === false"
                            class="text-primary"
                          >*Wajib diisi ya</small>
                          <small
                            v-if="item.variant.isSame"
                            class="text-primary"
                          >*Nama varian sudah dipakai, yuk pakai nama lain.</small>
                        </b-form-group>
                      </b-col>
                      <b-col
                        v-for="(variantOption, indexVariantOption) in item.variant.variantOptionItem"
                        :key="indexVariantOption+1"
                        cols="6"
                        :offset="indexVariantOption !== 0 ? 6 : ''"
                      >
                        <div>
                          <b-form-group
                            label-for="variant-name"
                          >
                            <template
                              v-if="indexVariantOption === 0"
                              #label
                            >
                              <span>
                                <span style="font-size: 14px;">
                                  <strong>
                                    Pilihan
                                  </strong>
                                </span>
                                (Max 8 Pilihan)
                              </span>
                            </template>
                            <div class="d-flex align-items-center">
                              <b-input-group
                                class="input-group-merge"
                              >
                                <b-form-input
                                  id="variant-name"
                                  v-model="variantOption.variantOptionName"
                                  placeholder="Contoh: Merah, XL, Cotton"
                                  class="wrapper__form__input__variant"
                                  :formatter="formatterVariantNameProduct"
                                  :style="variantOption.isValid === false ? 'background-color: #FFEDED;' : 'background-color: white;'"
                                  @input="validateVariantOptionField(index, indexVariantOption, variantOption)"
                                />
                                <b-input-group-append
                                  is-text
                                  style="border-radius: 12px !important;"
                                >
                                  <b-img src="@/assets/images/icons/icon-draggable.svg" />
                                </b-input-group-append>
                              </b-input-group>
                              <div>
                                <b-button
                                  :class="item.variant.variantOptionItem.length < 2 ? 'btn-icon cursor-not-allowed' : 'btn-icon'"
                                  size="sm"
                                  variant="flat-dark"
                                  :disabled="item.variant.variantOptionItem.length < 2"
                                  @click="deleteVariantOption(item, variantOption)"
                                >
                                  <b-img
                                    src="@/assets/images/icons/close-circle.svg"
                                    width="30"
                                  />
                                </b-button>
                              </div>
                            </div>
                            <small
                              v-if="variantOption.isValid === false"
                              class="text-primary"
                            >*Wajib diisi ya</small>
                            <small
                              v-if="variantOption.isSame"
                              class="text-primary"
                            >*Nama tipe varian sudah dipakai, yuk pakai nama lain.</small>
                          </b-form-group>
                        </div>
                      </b-col>
                      <b-row
                        v-if="item.variant.variantOptionItem.length < 8"
                        class="justify-content-end w-100"
                      >
                        <b-col cols="6">
                          <b-button
                            variant="flat-dark"
                            class="text-dark btn-icon ml-1"
                            style="border: 1px solid #E2E2E2;"
                            :disabled="addVariantOptionIsActive"
                            @click="addVariantOption(item)"
                          >
                            <feather-icon
                              icon="PlusIcon"
                              style="display: inline-block!important;"
                            />
                            Tambah Pilihan
                          </b-button>
                        </b-col>
                      </b-row>
                    </b-row>
                  </b-col>
                </b-row>

                <b-row class="w-100 mx-1 mb-2">
                  <span
                    style="border: 1px solid #E2E2E2; height: 1px; width: 100%;"
                  />
                </b-row>

                <b-row class="justify-content-end w-100 mb-2">
                  <b-col
                    cols="6"
                  >
                    <b-row class="ml-50">
                      <b-col
                        cols="6"
                      >
                        <b-button
                          v-if="variantInputItems.length < 3"
                          variant="outline-primary"
                          style="height: 45px;"
                          :class="addVariantIsActive ? 'cursor-not-allowed' : ''"
                          block
                          :disabled="addVariantIsActive"
                          @click="addVariant"
                        >
                          <feather-icon
                            icon="PlusIcon"
                            style="display: inline-block !important;"
                          />
                          Tambahkan tipe varian
                        </b-button>
                      </b-col>
                      <b-col cols="6">
                        <b-button
                          :class="applyVariantIsActive ? 'text-white cursor-not-allowed' : 'text-white'"
                          :variant="applyVariantIsActive ? 'dark' : 'primary'"
                          block
                          :style="applyVariantIsActive ? 'height: 45px; background: #C2C2C2!important; border: 0px!important' : 'height: 45px;'"
                          :disabled="applyVariantIsActive"
                          @click="applyVariant"
                        >
                          Terapkan Variasi
                        </b-button>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>

                <b-row class="w-100 mx-1 mb-2">
                  <span
                    style="border: 1px solid #E2E2E2; height: 1px; width: 100%;"
                  />
                </b-row>

                <b-row class="mb-2 w-100 ml-50">
                  <b-col
                    cols="12"
                  >
                    <h4
                      class="text-black mb-1"
                      style="font-weight: 500;"
                    >
                      Tabel Varian
                    </h4>
                  </b-col>

                  <b-col
                    cols="12"
                  >
                    <div class="w-100 mx-1 wrapper__table__variant py-2">
                      <b-row class="mx-1 mb-2">
                        <b-col cols="5">
                          <div class="d-flex align-items-center">
                            <span style="font-size: 14px; min-width: 110px;">
                              <strong>
                                Harga & Stok
                              </strong>
                            </span>
                            <b-input-group>
                              <b-input-group-prepend is-text>
                                <span style="font-size: 14px;">
                                  <strong>
                                    Rp
                                  </strong>
                                </span>
                              </b-input-group-prepend>
                              <b-form-input
                                id="all-price-variant"
                                v-model="setPriceAll"
                                class="wrapper__form__input__variant"
                                placeholder="Contoh : 85000"
                                :formatter="formatPriceVariant"
                                @keyup="formatPriceInput($event)"
                                @keypress="validateInputPriceVariant($event, setPriceAll)"
                                @paste="handlePastePriceVariant"
                              />
                            </b-input-group>
                          </div>
                        </b-col>
                        <b-col cols="4">
                          <b-input-group>
                            <b-input-group-prepend is-text>
                              <span style="font-size: 14px;">
                                <strong>
                                  Stok
                                </strong>
                              </span>
                            </b-input-group-prepend>
                            <b-form-input
                              id="all-stock-variant"
                              v-model="setStockAll"
                              class="wrapper__form__input__variant"
                              placeholder="Contoh : 1000"
                              :formatter="formatPriceVariant"
                              @keyup="formatPriceInput($event)"
                              @keypress="validateInputPriceVariant($event, setStockAll)"
                              @paste="handlePastePriceVariant"
                            />
                          </b-input-group>
                        </b-col>
                        <b-col cols="3">
                          <b-button
                            :variant="variantItems.length === 0 ? '' : 'outline-primary'"
                            block
                            :style="variantItems.length === 0 ? 'height: 45px; background: #C2C2C2!important; border: 0px!important;' : 'height: 45px;'"
                            :class="variantItems.length === 0 ? 'cursor-not-allowed' : ''"
                            :disabled="variantItems.length === 0 ? true : false"
                            @click="setAllPriceStock"
                          >
                            Terapkan ke semua
                          </b-button>
                        </b-col>
                      </b-row>

                      <b-table
                        striped
                        hover
                        :fields="variantFields"
                        :items="variantItems"
                        show-empty
                      >
                        <template #head="data">
                          <span style="font-size: 14px;">
                            <strong>
                              {{ data.label }}
                            </strong>
                          </span>
                        </template>
                        <template #empty>
                          <div
                            style="height: 150px;"
                            class="d-flex justify-content-center align-items-center"
                          >
                            <div>
                              <b-row
                                class="text-center justify-content-center"
                              >
                                <h3
                                  class="text-center"
                                  style="color: #626262;"
                                >
                                  Tabel varian belum diisi
                                </h3>
                              </b-row>
                              <b-row class="text-center justify-content-center">
                                <span
                                  class="text-center"
                                  style="color: #626262;"
                                >
                                  Lengkapi tipe varian di atas untuk mengisi tabel varian
                                </span>
                              </b-row>
                            </div>
                          </div>
                        </template>

                        <template #cell(variant1)="data">
                          <b-row class="mt-1">
                            {{ data.item.option_name }}
                          </b-row>
                        </template>

                        <template #cell(variant2)="data">
                          <b-row v-if="variantInputItems.length === 3">
                            <b-col
                              v-for="(item, index) in data.item.options"
                              :key="index+1"
                              cols="12"
                            >
                              <div
                                v-for="(secondItem, secondIndex) in item.options"
                                :key="secondIndex+1"
                              >
                                <b-form-input
                                  v-model="item.option_name"
                                  class="wrapper__variant2__table mb-1"
                                  disabled
                                />
                              </div>
                            </b-col>
                          </b-row>
                          <b-row v-if="variantInputItems.length === 2">
                            <div
                              v-for="(item, index) in data.item.options"
                              :key="index+1"
                              cols="12"
                            >
                              <b-form-input
                                v-model="item.option_name"
                                class="wrapper__variant2__table mb-1"
                                disabled
                              />
                            </div>
                          </b-row>
                        </template>

                        <template #cell(variant3)="data">
                          <b-row>
                            <b-col
                              v-for="(item, index) in data.item.options"
                              :key="index+1"
                              cols="12"
                            >
                              <div
                                v-for="(items, index1) in item.options"
                                :key="index1+1"
                                cols="12"
                              >
                                <b-form-input
                                  v-model="items.option_name"
                                  class="wrapper__variant2__table mb-1"
                                  disabled
                                />
                              </div>
                            </b-col>
                          </b-row>
                        </template>

                        <template #cell(stock)="data">
                          <b-row>
                            <div v-if="variantInputItems.length === 3">
                              <b-col
                                v-for="(items, index) in data.item.options"
                                :key="index+1"
                                cols="12"
                              >
                                <div
                                  v-for="(itemVariant, indexVariant) in items.options"
                                  :key="indexVariant+1"
                                >
                                  <b-form-input
                                    :id="`stock-variant-${indexVariant + data.index}-${data.index+1}`"
                                    v-model="itemVariant.variant_stock"
                                    class="wrapper__form__input__variant mb-1"
                                    placeholder="Contoh : 1000"
                                    :formatter="formatPriceVariant"
                                    @keyup="formatPriceInput($event)"
                                    @keypress="validateInputPriceVariant($event, itemVariant.variant_stock)"
                                    @input="checkValidationSubmit(itemVariant)"
                                    @paste="handlePastePriceVariant"
                                  />
                                </div>
                              </b-col>
                            </div>

                            <div v-if="variantInputItems.length === 2">
                              <b-col
                                v-for="(items, index) in data.item.options"
                                :key="index+1"
                                cols="12"
                              >
                                <b-form-input
                                  :id="`stock-variant-${index + data.index}-${data.index+1}`"
                                  v-model="items.variant_stock"
                                  class="wrapper__form__input__variant mb-1"
                                  placeholder="Contoh : 1000"
                                  :formatter="formatPriceVariant"
                                  @keyup="formatPriceInput($event)"
                                  @keypress="validateInputPriceVariant($event, items.variant_stock)"
                                  @input="checkValidationSubmit(items)"
                                  @paste="handlePastePriceVariant"
                                />
                              </b-col>
                            </div>

                            <div v-if="variantInputItems.length === 1">
                              <b-form-input
                                id="stock-variant"
                                v-model="data.item.variant_stock"
                                class="wrapper__form__input__variant mb-1"
                                placeholder="Contoh : 85000"
                                :formatter="formatPriceVariant"
                                @keyup="formatPriceInput($event)"
                                @keypress="validateInputPriceVariant($event, data.item.variant_stock)"
                                @input="checkValidationSubmit(data.item)"
                                @paste="handlePastePriceVariant"
                              />
                            </div>
                          </b-row>
                        </template>

                        <template #cell(price)="data">
                          <div v-if="variantInputItems.length === 3">
                            <b-col
                              v-for="(items, index) in data.item.options"
                              :key="index+1"
                              cols="12"
                            >
                              <div
                                v-for="(itemVariant, indexVariant) in items.options"
                                :key="indexVariant+1"
                              >
                                <b-input-group class="mb-1">
                                  <b-input-group-prepend is-text>
                                    <span style="font-size: 14px;">
                                      <strong>
                                        Rp
                                      </strong>
                                    </span>
                                  </b-input-group-prepend>
                                  <b-form-input
                                    :id="`price-variant-${indexVariant + data.index}-${data.index+1}`"
                                    v-model="itemVariant.option_price"
                                    class="wrapper__form__input__variant"
                                    placeholder="Contoh : 85000"
                                    :formatter="formatPriceVariant"
                                    @keyup="formatPriceInput($event)"
                                    @keypress="validateInputPriceVariant($event, itemVariant.option_price)"
                                    @input="checkValidationSubmit(itemVariant)"
                                    @paste="handlePastePriceVariant"
                                  />
                                </b-input-group>
                              </div>
                            </b-col>
                          </div>

                          <div v-if="variantInputItems.length === 2">
                            <b-col
                              v-for="(items, index) in data.item.options"
                              :key="index+1"
                              cols="12"
                            >
                              <b-input-group class="mb-1">
                                <b-input-group-prepend is-text>
                                  <span style="font-size: 14px;">
                                    <strong>
                                      Rp
                                    </strong>
                                  </span>
                                </b-input-group-prepend>
                                <b-form-input
                                  :id="`price-variant-${index + data.index}-${data.index+1}`"
                                  v-model="items.option_price"
                                  class="wrapper__form__input__variant"
                                  placeholder="Contoh : 85000"
                                  :formatter="formatPriceVariant"
                                  @keyup="formatPriceInput($event)"
                                  @keypress="validateInputPriceVariant($event, items.option_price)"
                                  @input="checkValidationSubmit(items)"
                                  @paste="handlePastePriceVariant"
                                />
                              </b-input-group>
                            </b-col>
                          </div>

                          <div v-if="variantInputItems.length === 1">
                            <b-input-group class="mb-1">
                              <b-input-group-prepend is-text>
                                <span style="font-size: 14px;">
                                  <strong>
                                    Rp
                                  </strong>
                                </span>
                              </b-input-group-prepend>
                              <b-form-input
                                id="price-variant"
                                v-model="data.item.option_price"
                                class="wrapper__form__input__variant"
                                placeholder="Contoh : 85000"
                                :formatter="formatPriceVariant"
                                @keyup="formatPriceInput($event)"
                                @keypress="validateInputPriceVariant($event, data.item.option_price)"
                                @input="checkValidationSubmit(data.item)"
                                @paste="handlePastePriceVariant"
                              />
                            </b-input-group>
                          </div>
                        </template>

                      </b-table>
                    </div>
                  </b-col>
                </b-row>
              </b-row>
            </b-row>

            <b-row class="mx-1 p-2 wrapper__product__info mb-2">
              <b-row class="ml-50 w-100 mb-1">
                <h4 class="text-black ml-50 mt-50">
                  <strong>
                    Harga, Stok dan Ukuran
                  </strong>
                </h4>
              </b-row>
              <b-row class="w-100">
                <b-col
                  v-if="!isVariantActive"
                  cols="12"
                  class="mb-2 ml-1"
                >
                  <b-row>
                    <b-col
                      cols="2"
                    >
                      <label for="price-product">
                        <h5>
                          <strong>
                            Harga<span class="text-primary">*</span>
                          </strong>
                        </h5>
                      </label>
                    </b-col>

                    <b-col
                      cols="10"
                    >
                      <validation-provider
                        #default="{errors}"
                        name="Harga"
                        rules="required"
                      >
                        <b-input-group>
                          <b-input-group-prepend is-text>
                            Rp
                          </b-input-group-prepend>
                          <b-form-input
                            id="price-product"
                            v-model="priceProduct"
                            class="wrapper__form__input__variant"
                            placeholder="Contoh : 85000 (masukkan angka saja tanpa titik, koma atau karakter lain)"
                            :formatter="formatPriceNotVariant"
                            type="number"
                            :state="errors.length > 0 ? false:null"
                            :style="errors[0] ? 'background-color: #FFEDED;' : 'background-color: white;'"
                            @keyup="formatPriceInput($event)"
                            @keypress="validateInputPrice($event)"
                            @paste="handlePastePrice"
                          />
                        </b-input-group>
                        <small
                          v-if="errors[0]"
                          class="text-primary ml-1 mt-50"
                        >*Wajib diisi ya</small>
                      </validation-provider>
                    </b-col>
                  </b-row>
                </b-col>

                <b-col
                  v-if="!isVariantActive"
                  cols="12"
                  class="mb-2 ml-1"
                >
                  <b-row>
                    <b-col
                      cols="2"
                    >
                      <label for="stock-product">
                        <h5>
                          <strong>
                            Stok<span class="text-primary">*</span>
                          </strong>
                        </h5>
                      </label>
                    </b-col>

                    <b-col
                      cols="10"
                    >
                      <validation-provider
                        #default="{errors}"
                        name="Stock"
                        rules="required"
                      >
                        <b-form-input
                          id="stock-product"
                          v-model="stockProduct"
                          class="wrapper__form__input__variant"
                          placeholder="Masukkan jumlah stok produk"
                          type="number"
                          :formatter="formatPriceNotVariant"
                          :state="errors.length > 0 ? false:null"
                          :style="errors[0] ? 'background-color: #FFEDED;' : 'background-color: white;'"
                          @keyup="formatStock($event)"
                          @keypress="validateInputStock($event)"
                          @paste="handlePasteStock"
                        />
                        <small
                          v-if="errors[0]"
                          class="text-primary ml-1 mt-50"
                        >*Wajib diisi ya</small>
                      </validation-provider>
                    </b-col>
                  </b-row>
                </b-col>

                <b-col
                  v-if="isVariantActive"
                  cols="12"
                  class="mb-2 ml-1"
                >
                  <b-row>
                    <b-col
                      cols="2"
                    >
                      <label for="stock-product">
                        <h5>
                          <strong>
                            Harga & Stok<span class="text-primary">*</span>
                          </strong>
                        </h5>
                      </label>
                    </b-col>

                    <b-col
                      cols="10"
                    >
                      <span style="color: #626262;">Kamu telah mengatur <strong>Harga</strong> dan <strong>Jumlah Stok</strong> di variasi produk</span>
                    </b-col>
                  </b-row>
                </b-col>

                <b-col
                  cols="12"
                  class="mb-2 ml-1"
                >
                  <b-row>
                    <b-col
                      cols="2"
                    >
                      <label for="price-product">
                        <h5>
                          <strong>
                            Berat Produk<span class="text-primary">*</span>
                          </strong>
                        </h5>
                        <small>
                          Masukkan berat produk setelah dikemas ya
                        </small>
                      </label>
                    </b-col>

                    <b-col
                      cols="10"
                    >
                      <validation-provider
                        #default="{errors}"
                        name="Berat Produk"
                        rules="required"
                      >
                        <b-input-group>
                          <b-form-input
                            id="price-product"
                            v-model="weightProduct"
                            class="wrapper__form__input__variant"
                            :formatter="formatterVolume"
                            placeholder="(Contoh : 200)"
                            type="number"
                            :state="errors.length > 0 ? false:null"
                            :style="errors[0] ? 'background-color: #FFEDED;' : 'background-color: white;'"
                            @keypress="validateInputWeight($event)"
                            @keyup="validateInputWeight($event)"
                            @paste="handlePasteWeight"
                          />
                          <b-input-group-append is-text>
                            gram
                          </b-input-group-append>
                        </b-input-group>
                        <small
                          v-if="errors[0]"
                          class="text-primary ml-1 mt-50"
                        >*Wajib diisi ya, minimal 1 gram</small>
                      </validation-provider>
                    </b-col>
                  </b-row>
                </b-col>

                <b-col
                  cols="12"
                  class="mb-2 ml-1"
                >
                  <b-row>
                    <b-col
                      cols="2"
                    >
                      <label for="price-product">
                        <h5>
                          <strong>
                            Volume
                          </strong>
                        </h5>
                        <small>
                          Masukkan ukuran produk setelah
                          dikemas, untuk mempermudah sistem menghitung volume.
                        </small>
                      </label>
                    </b-col>

                    <b-col
                      cols="10"
                    >
                      <b-row class="justify-content-around">
                        <b-col>
                          <b-input-group>
                            <b-form-input
                              id="price-product"
                              v-model="lengthProduct"
                              class="wrapper__form__input__variant"
                              placeholder="Panjang"
                              type="number"
                              :formatter="formatterVolume"
                              @keypress="validateInputVolumeLength($event)"
                              @keydown="validateInputVolumeLength($event)"
                              @keyup="validateInputVolumeLength($event)"
                              @input="calculateVolumeProduct"
                              @paste="handlePasteLength"
                            />
                            <b-input-group-append is-text>
                              cm
                            </b-input-group-append>
                          </b-input-group>
                        </b-col>
                        <b-col>
                          <b-input-group>
                            <b-form-input
                              id="price-product"
                              v-model="widthProduct"
                              class="wrapper__form__input__variant"
                              placeholder="Lebar"
                              type="number"
                              :formatter="formatterVolume"
                              @keydown="validateInputVolumeWidth($event)"
                              @keypress="validateInputVolumeWidth($event)"
                              @keyup="validateInputVolumeWidth($event)"
                              @input="calculateVolumeProduct"
                              @paste="handlePasteWidth"
                            />
                            <b-input-group-append is-text>
                              cm
                            </b-input-group-append>
                          </b-input-group>
                        </b-col>
                        <b-col>
                          <b-input-group>
                            <b-form-input
                              id="price-product"
                              v-model="heightProduct"
                              class="wrapper__form__input__variant"
                              placeholder="Tinggi"
                              type="number"
                              :formatter="formatterVolume"
                              @keydown="validateInputVolumeHeight($event)"
                              @keypress="validateInputVolumeHeight($event)"
                              @keyup="validateInputVolumeHeight($event)"
                              @input="calculateVolumeProduct"
                              @paste="handlePasteHeight"
                            />
                            <b-input-group-append is-text>
                              cm
                            </b-input-group-append>
                          </b-input-group>
                        </b-col>
                      </b-row>
                    </b-col>
                  </b-row>
                </b-col>

                <b-col
                  v-if="calculateVolumeProductItem > weightProduct / 1000"
                  cols="12"
                  class="mb-2 ml-1"
                >
                  <div class="wrapper__alert__volume__product">
                    <div class="mr-1">
                      <b-img src="@/assets/images/icons/warning-alert-product.svg" />
                    </div>
                    <div>
                      <span class="text-black">
                        Berat yang dipakai adalah {{ calculateVolumeProductItem.toFixed(3) * 1000 }} gram (hasil dari konversi volume ke berat) karena lebih besar dari berat aslinya.
                      </span>
                    </div>
                  </div>
                </b-col>

                <b-col
                  cols="12"
                  class="mb-2 ml-1"
                >
                  <div class="wrapper__alert__volume__product">
                    <div class="mr-1">
                      <b-img src="@/assets/images/icons/warning-alert-product.svg" />
                    </div>
                    <div>
                      <span class="text-black">
                        Perhatikan dengan baik berat dan Volume produk ya agar tidak terjadi selisih data dengan pihak kurir
                        <span class="text-info"><a
                          class="text-info"
                          href="https://bantuan.komerce.id/id/article/cara-menghitung-konversi-volume-ke-berat-di-pengiriman-barang-1hofvu6/"
                          target="_blank"
                        >Pelajari selengkapnya</a></span>
                      </span>
                    </div>
                  </div>
                </b-col>
              </b-row>
            </b-row>

            <b-row class="mx-1 p-2 wrapper__product__variant mb-2 align-items-center">
              <b-col
                cols="12"
                class="mb-2 mt-1"
              >
                <div class="w-100">
                  <h4 class="text-black">
                    <strong>
                      Upload Foto
                    </strong>
                  </h4>
                </div>
                <b-row class="align-items-center">
                  <b-col
                    cols="2"
                  >
                    <label for="name-product">
                      <h5>
                        <strong>
                          Foto Produk
                        </strong>
                      </h5>
                      <small>
                        Format gambar .jpg .jpeg .png dan ukuran minimum 300 x 300px
                        (Untuk gambar optimal gunakan ukuran minimal 700 x 700 px).
                      </small>
                    </label>
                  </b-col>

                  <b-col
                    cols="10"
                  >
                    <b-row class="align-items-center">
                      <b-img
                        v-if="imageFile === null && imageInitialFile === null"
                        src="@/assets/images/icons/preview-default-prov-retur.svg"
                        width="75"
                        class="mr-1"
                      />
                      <a
                        :href="fileUrl(imageFile)"
                        target="_blank"
                      >
                        <b-img
                          v-if="imageFile !== null"
                          :src="fileUrl(imageFile)"
                          width="75"
                          class="mr-1"
                        />
                      </a>
                      <a
                        :href="imageInitialFile"
                        target="_blank"
                      >
                        <b-img
                          v-if="imageFile === null && imageInitialFile !== null"
                          :src="imageInitialFile"
                          width="75"
                          class="mr-1"
                        />
                      </a>
                      <div>
                        <label
                          for="image-product"
                          style="border: 1px solid #E2E2E2;"
                          class="btn btn-icon btn-flat-dark"
                        >
                          Pilih Foto
                        </label>
                        <input
                          id="image-product"
                          type="file"
                          hidden
                          @change="setImageProduct($event)"
                        >
                      </div>
                    </b-row>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>

            <!-- submit and reset -->
            <b-col
              cols="12"
              class="d-flex justify-content-end pb-2 pr-2"
            >
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                type="submit"
                variant="outline-primary"
                :class="buttonIsSubmit ? 'mr-1 cursor-not-allowed' : 'mr-1'"
                :disabled="buttonIsSubmit"
                @click.prevent="submit(0)"
              >
                Simpan Draft
                <b-spinner
                  v-if="loadingSubmitDraft"
                  small
                  variant="primary"
                />
              </b-button>
              <b-button
                v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                type="reset"
                variant="primary"
                :class="buttonIsSubmit ? 'cursor-not-allowed' : ''"
                :disabled="buttonIsSubmit"
                @click.prevent="submit(1)"
              >
                Simpan ke Produk Aktif
                <b-spinner
                  v-if="loadingSubmitPublish"
                  small
                />
              </b-button>
            </b-col>
          </b-row>
        </b-form>
      </validation-observer>

      <b-modal
        ref="modal-validation-upload"
        body-class="modalUploadWarning__body"
        hide-header
        hide-footer
        hide-header-close
      >
        <div class="d-block text-center">
          <img
            :src="require('@/assets/images/icons/warning.svg')"
            alt="warning"
            width="142px"
            height="134.43px"
            class="modalUploadWarning__img"
          >
          <p class="modalUploadWarning__text">
            Maaf, maksimal file hanya 2 MB.
          </p>
          <b-button
            variant="danger"
            class="modalUploadWarning__btn"
            @click="handleOkModalValidationUpload"
          >Oke</b-button>
        </div>
      </b-modal>
      <b-modal
        id="modalOnboarding"
        hide-header
        hide-footer
        size="lg"
        centered
      >
        <b-container class="py-2">
          <b-img
            src="@/assets/images/icons/close-circle.svg"
            class="absolute top-[10px] right-[10px]"
            style="cursor:pointer"
            @click="$bvModal.hide('modalOnboarding')"
          />
          <p class="text-[20px] font-semibold text-center mb-2">
            Jangan dipikir input produk itu <span class="text-primary">lama</span> dan <span class="text-primary">ribet</span>
          </p>
          <div class="mb-2">
            <b-img
              :src="require('@/assets/images/banner/popup-product-onboarding.svg')"
              style="max-width:100%;"
              class="mx-auto"
            />
          </div>
          <p class="text-[16px] mb-1">🛒 Ga harus langsung semua diinput, bisa coba yang <b class="text-primary">paling sering laku</b><br>
            📝 Kalau lagi gabut, bisa isi dulu <b class="text-primary">kolom yang wajib</b>, sisanya dilengkapi pas senggang aja</p>
          <div class="d-flex justify-content-center mb-2">
            <b-button
              variant="primary"
              class="rounded-lg"
              @click="dissmissNewUser"
            >
              Ok, Coba input 1 dulu ah...
            </b-button>
          </div>
          <p
            class="text-[12px] mx-auto text-center"
            style="max-width: 620px"
          >
            *abis input produk, produknya jadi otomatis muncul pas bikin orderan dan label pengiriman, lalu jadi keluar data varian produk terlaris dan juga pelanggan terloyal, jadi...., semangat yaa...
          </p>
        </b-container>
      </b-modal>

      <!-- Popup delete variant -->
      <b-modal
        ref="popup-delete-variant"
        hide-header
        hide-footer
        centered
      >
        <b-row class="my-1 justify-content-center mx-1">
          <b-img src="@/assets/images/icons/icon-delete-variant.svg" />
        </b-row>

        <b-row class="my-1 justify-content-center mx-1">
          <b-col
            class="text-center"
            cols="12"
          >
            <h4 class="text-black">
              Hapus Tipe Varian?
            </h4>
          </b-col>
          <b-col
            class="text-center"
            cols="12"
          >
            <p>
              Semua list pilihan dari varian akan otomatis terhapus juga lho...
            </p>
          </b-col>
        </b-row>

        <b-row class="justify-content-center mx-1 mt-1 mb-2">
          <b-button
            variant="outline-primary"
            class="mr-2"
            @click="closePopupDeleteVariant"
          >
            Batal
          </b-button>
          <b-button
            variant="primary"
            class="text-white"
            @click="deleteVariant"
          >
            Hapus
          </b-button>
        </b-row>
      </b-modal>

      <!-- Popup delete All variant -->
      <b-modal
        ref="popup-delete-all-variant"
        hide-header
        hide-footer
        centered
      >
        <b-row class="my-1 justify-content-center mx-1">
          <b-img src="@/assets/images/icons/icon-delete-variant.svg" />
        </b-row>

        <b-row class="my-1 justify-content-center mx-1">
          <b-col
            class="text-center"
            cols="12"
          >
            <h4 class="text-black">
              Hapus Semua Varian?
            </h4>
          </b-col>
          <b-col
            class="text-center"
            cols="12"
          >
            <p>
              Semua list pilihan dari varian akan otomatis terhapus juga lho...
            </p>
          </b-col>
        </b-row>

        <b-row class="justify-content-center mx-1 mt-1 mb-2">
          <b-button
            variant="outline-primary"
            class="mr-2"
            @click="closePopupDeleteAllVariant"
          >
            Batal
          </b-button>
          <b-button
            variant="primary"
            class="text-white"
            @click="deleteAllVariant"
          >
            Hapus
          </b-button>
        </b-row>
      </b-modal>

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
  BPopover,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import BCardActions from '@/@core/components/b-card-actions/BCardActions.vue'
import draggable from 'vuedraggable'
import { ValidationObserver, ValidationProvider, number } from 'vee-validate'
import { required } from '@validations'
import { heightTransition } from '@core/mixins/ui/transition'
import ToastificationContent from '@/@core/components/toastification/ToastificationContent.vue'
import useJwt from '@/auth/jwt/useJwt'

export default {
  components: {
    BRow,
    BCol,
    // BFormGroup,
    BFormInput,
    // BFormFile,
    BForm,
    BButton,
    BCardActions,
    BFormTextarea,
    // BTable,
    // BFormCheckbox,
    BInputGroupAppend,
    BInputGroup,
    // draggable,
    ValidationObserver,
    ValidationProvider,
    // BAvatar,
    // BSpinner,
    // BOverlay,
    BPopover,
  },
  directives: {
    Ripple,
  },
  mixins: [heightTransition],
  data() {
    return {
      productId: this.$route.params.product_id,
      isVariantActive: false,

      loadingSubmitDraft: false,
      loadingSubmitPublish: false,

      // Data Option Variant
      variantInputItems: [],

      // Table Variant
      variantFields: [],
      variantItems: [],
      editVariantItems: [],

      productName: '',
      productNameAvailable: true,
      skuName: '',
      skuNameAvailable: true,

      // validation
      applyVariantIsActive: true,
      messageErrorIsActive: false,

      // store
      descriptionProduct: '',
      priceProduct: null,
      stockProduct: null,
      setPriceAll: null,
      setStockAll: null,
      weightProduct: null,
      lengthProduct: null,
      widthProduct: null,
      heightProduct: null,
      calculateVolumeProductItem: 0,
      imageFile: null,
      imageInitialFile: null,
      variantStore: [],
      optionStore: [],

      buttonIsSubmit: false,

      messageErrorLengthProduct: false,

      pricePaste: null,
      pricePasteMode: false,
      stockPaste: null,
      stockPasteMode: false,

      weightPaste: null,
      weightPasteMode: false,
      lengthPaste: null,
      lengthPasteMode: false,
      widthPaste: null,
      widthPasteMode: false,
      heightPaste: null,
      heightPasteMode: false,
      priceAllPaste: null,
      priceAllPasteMode: false,
      stockAllPaste: null,
      stockAllPasteMode: false,

      loadingLoadData: false,

      itemToDelete: null,
      variantOptionToDelete: null,

      variantToDelete: null,

      addVariantIsActive: false,
      addVariantOptionIsActive: false,

      empty: [],
    }
  },
  computed: {},
  watch: {
    productName: {
      handler() {
        if (this.productName.length < 4) {
          this.messageErrorLengthProduct = true
        } else {
          this.messageErrorLengthProduct = false
        }
      },
    },
  },
  mounted() {
    this.checkNewUser()
    this.loadProduct()
  },
  methods: {
    loadProduct() {
      this.loadingLoadData = true
      this.$http_komship.get(`/v1/product/detail/${this.productId}`)
        .then(response => {
          const { data } = response.data
          this.productName = data.product_name
          this.skuName = data.product_sku
          this.descriptionProduct = data.product_description
          this.weightProduct = data.product_weight
          this.lengthProduct = data.product_length
          this.widthProduct = data.product_width
          this.heightProduct = data.product_height
          this.calculateVolumeProductItem = data.product_pbv
          if (data.product_image[0] !== undefined) {
            this.imageInitialFile = data.product_image[0].images_path
          }
          this.calculateVolumeProduct()
          if (data.product_is_variant === '1') this.isVariantActive = true
          this.priceProduct = data.product_price
          this.stockProduct = data.product_stock
          data.variants.forEach((item, index) => {
            this.variantInputItems.push({
              variant: {
                productId: item.product_id,
                type: index + 1,
                id: item.id,
                variantName: item.variant_name,
                parent: null,
                stock: null,
                price: null,
                isValid: true,
                newParent: false,
                variantOptionItem: [],
              },
            })
            this.variantFields.push({
              key: `variant${index + 1}`,
              label: item.variant_name,
              tdClass: 'firstVariantItemsClass',
              trClass: 'firstVariantFieldsClass',
              tdStyle: {
                backgroundColor: 'white',
                borderBottom: '0px',
                verticalAlign: 'text-top',
              },
              thStyle: {
                backgroundColor: 'white',
                borderBottom: '0px',
              },
            })
          })
          this.variantFields.push({
            key: 'stock',
            label: 'Stok',
            tdClass: 'bg-white',
            tdStyle: {
              backgroundColor: 'white',
              borderBottom: '0px',
              verticalAlign: 'text-top',
            },
            thStyle: {
              backgroundColor: 'white',
              borderBottom: '0px',
            },
          })
          this.variantFields.push({
            key: 'price',
            label: 'Harga',
            tdClass: 'bg-white',
            tdStyle: {
              backgroundColor: 'white',
              borderBottom: '0px',
              verticalAlign: 'text-top',
            },
            thStyle: {
              backgroundColor: 'white',
              borderBottom: '0px',
            },
          })
          this.variantItems = data.options
          this.editVariantItems = data.options
          this.variantInputItems.forEach((dataVariant, indexVariant) => {
            if (this.variantInputItems[indexVariant].variant.type === 1) {
              data.options.forEach((dataOption, indexOption) => {
                this.variantInputItems[indexVariant].variant.variantOptionItem.push({
                  variantOptionName: dataOption.option_name,
                  parent: dataOption.option_parent,
                  stock: dataOption.variant_stock,
                  price: dataOption.option_price,
                  isValid: true,
                  newVariant: false,
                  newParent: false,
                  option: [],
                })
              })
            }
            if (this.variantInputItems[indexVariant].variant.type === 2) {
              data.options.forEach((dataOption, indexOption) => {
                data.options[indexOption].options.forEach((secondDataOption, secondIndexOption) => {
                  const findVariantOption = this.variantInputItems[indexVariant].variant.variantOptionItem.find(variant => variant.variantOptionName === data.options[indexOption].options[secondIndexOption].option_name)
                  if (findVariantOption === undefined) {
                    this.variantInputItems[indexVariant].variant.variantOptionItem.push({
                      variantOptionName: secondDataOption.option_name,
                      parent: secondDataOption.option_parent,
                      stock: secondDataOption.variant_stock,
                      price: secondDataOption.option_price,
                      isValid: true,
                      newVariant: false,
                      newParent: false,
                      option: [],
                    })
                  }
                })
              })
            }
            if (this.variantInputItems[indexVariant].variant.type === 3) {
              data.options.forEach((dataOption, indexOption) => {
                data.options[indexOption].options.forEach((secondDataOption, secondIndexOption) => {
                  data.options[indexOption].options[secondIndexOption].options.forEach((thirdDataOption, thirdIndexOption) => {
                    const findVariantOption = this.variantInputItems[indexVariant].variant.variantOptionItem.find(variant => variant.variantOptionName === data.options[indexOption].options[secondIndexOption].options[thirdIndexOption].option_name)
                    if (findVariantOption === undefined) {
                      this.variantInputItems[indexVariant].variant.variantOptionItem.push({
                        variantOptionName: thirdDataOption.option_name,
                        parent: thirdDataOption.option_parent,
                        stock: thirdDataOption.variant_stock,
                        price: thirdDataOption.option_price,
                        isValid: true,
                        newVariant: false,
                        newParent: false,
                        option: [],
                      })
                    }
                  })
                })
              })
            }
          })
          this.applyVariantIsActive = false
          this.loadingLoadData = false
        }).catch(err => {
          this.loadingLoadData = false
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Failure',
              icon: 'AlertCircleIcon',
              text: err,
              variant: 'danger',
            },
          })
        })
    },
    formatPrice(value) {
      const val = value
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    fileUrl: file => (file ? URL.createObjectURL(file) : null),
    handleOkModalValidationUpload() {
      this.imageFile = null
      this.$refs['modal-validation-upload'].hide()
    },
    formatStock($event) {
      const keyCode = ($event.keyCode ? $event.keyCode : $event.which)
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 190) {
        $event.preventDefault()
      }
      if (this.stockPasteMode) this.stockProduct = this.stockPaste
      this.stockPasteMode = false
    },
    formatPriceInput($event) {
      const e = $event
      const keyCode = ($event.keyCode ? $event.keyCode : $event.which)
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 190) {
        $event.preventDefault()
      }
      if (e.keyCode === 45 || e.keyCode === 43 || e.keyCode === 44 || e.keyCode === 46 || e.keyCode === 101 || e.keyCode === 190) {
        e.preventDefault()
      }
      if (this.pricePasteMode) this.priceProduct = this.pricePaste
      this.pricePasteMode = false
    },
    formatNameProduct(e) {
      return String(e).substring(0, 60)
    },
    formatSkuProduct(e) {
      return String(e).substring(0, 10)
    },
    formatDescriptionProduct(e) {
      return String(e).substring(0, 300)
    },
    formatPriceVariant(e) {
      return String(e).substring(0, 9).replace(/[^\d]/g, '')
    },
    formatPriceNotVariant(e) {
      return String(e).substring(0, 7)
    },
    formatterVolume(e) {
      return String(e).substring(0, 7)
    },
    formatterVariantNameProduct(e) {
      return String(e).substring(0, 30)
    },
    validateInputProductName(e) {
      if (e.keyCode === 47 || e.keyCode === 61 || e.keyCode === 58 || e.keyCode === 59 || e.keyCode === 38) {
        e.preventDefault()
        this.messageErrorIsActive = true
      } else {
        this.messageErrorIsActive = false
      }
      if (this.productName.length < 3) {
        this.messageErrorLengthProduct = true
      } else {
        this.messageErrorLengthProduct = false
      }
    },
    validateInputWeight(e) {
      if (e.keyCode === 45 || e.keyCode === 43 || e.keyCode === 44 || e.keyCode === 46 || e.keyCode === 101) {
        e.preventDefault()
      }
      if (this.weightProduct === null && e.keyCode === 48) {
        e.preventDefault()
      }
      if (this.weightProduct === '' && e.keyCode === 48) {
        e.preventDefault()
      }
      if (this.weightPasteMode) this.weightProduct = this.weightPaste
      this.weightPasteMode = false
      this.validateSubmitButton()
    },
    validateInputPrice(e) {
      if (e.keyCode === 45 || e.keyCode === 43 || e.keyCode === 44 || e.keyCode === 46 || e.keyCode === 101) {
        e.preventDefault()
      }
      if (this.pricePasteMode) this.priceProduct = this.pricePaste
      this.pricePasteMode = false
      if (e.target.value === '0') {
        if (e.keyCode === 48) {
          e.preventDefault()
        } else {
          e.target.value = e.target.value.substring(1)
        }
      }
      this.validateSubmitButton()
    },
    validateInputPriceVariant(e, data) {
      if (e.keyCode === 45 || e.keyCode === 43 || e.keyCode === 44 || e.keyCode === 46 || e.keyCode === 101) {
        e.preventDefault()
      }
      if (e.target.value === '0') {
        if (e.keyCode === 48) {
          e.preventDefault()
        } else {
          e.target.value = e.target.value.substring(1)
        }
      }
      this.validateSubmitButton()
    },
    validateInputStock(e) {
      if (e.keyCode === 45 || e.keyCode === 43 || e.keyCode === 44 || e.keyCode === 46 || e.keyCode === 101) {
        e.preventDefault()
      }
      if (e.target.value === '0') {
        if (e.keyCode === 48) {
          e.preventDefault()
        } else {
          e.target.value = e.target.value.substring(1)
        }
      }
      if (this.stockPasteMode) this.stockProduct = this.stockPaste
      this.stockPasteMode = false
      this.validateSubmitButton()
    },
    validateInputVolumeLength(e) {
      if (e.keyCode === 45 || e.keyCode === 43 || e.keyCode === 44 || e.keyCode === 46 || e.keyCode === 101) {
        e.preventDefault()
      }
      if (this.lengthProduct === null && e.keyCode === 48) {
        e.preventDefault()
      }
      if (this.lengthProduct === '' && e.keyCode === 48) {
        e.preventDefault()
      }
      if (this.lengthPasteMode) this.lengthProduct = this.lengthPaste
      this.lengthPasteMode = false
    },
    validateInputVolumeWidth(e) {
      if (e.keyCode === 45 || e.keyCode === 43 || e.keyCode === 44 || e.keyCode === 46 || e.keyCode === 101) {
        e.preventDefault()
      }
      if (this.widthProduct === null && e.keyCode === 48) {
        e.preventDefault()
      }
      if (this.widthProduct === '' && e.keyCode === 48) {
        e.preventDefault()
      }
      if (this.widthPasteMode) this.widthProduct = this.widthPaste
      this.widthPasteMode = false
    },
    validateInputVolumeHeight(e) {
      if (e.keyCode === 45 || e.keyCode === 43 || e.keyCode === 44 || e.keyCode === 46 || e.keyCode === 101) {
        e.preventDefault()
      }
      if (this.heightProduct === null && e.keyCode === 48) {
        e.preventDefault()
      }
      if (this.heightProduct === '' && e.keyCode === 48) {
        e.preventDefault()
      }
      if (this.heightPasteMode) this.heightProduct = this.heightPaste
      this.heightPasteMode = false
    },
    async checkNewUser() {
      if (localStorage.getItem('newUser')) {
        this.newUser = localStorage.getItem('newUser')
      }
      await this.$http_komship.get('/v1/product', {
        params: { status: 1 },
      })
        .then(res => {
          const { data } = res.data
          if (data.length < 1 && this.newUser === true) {
            this.$bvModal.show('modalOnboarding')
          }
        })
    },
    dissmissNewUser() {
      this.$bvModal.hide('modalOnboarding')
      localStorage.setItem('newUser', false)
    },
    async checkProductName() {
      this.validateSubmitButton()
      if (this.messageErrorLengthProduct === false) {
        await this.$http_komship.get('/v1/product/check-name', {
          params: {
            product_name: this.productName,
          },
        }).then(response => {
          const { data } = response
          if (data.code === 1003) {
            this.productNameAvailable = false
          } else {
            this.productNameAvailable = true
          }
        }).catch(() => { this.productNameAvailable = true })
      }
    },
    async checkSkuName() {
      await this.$http_komship.get('/v1/product/check-sku', {
        params: {
          product_sku: this.skuName,
        },
      }).then(response => {
        const { data } = response
        if (data.code === 1003) {
          this.skuNameAvailable = false
        } else {
          this.skuNameAvailable = true
        }
      }).catch(() => { this.skuNameAvailable = true })
    },
    handleIsVariant() {
      if (this.isVariantActive) {
        this.$refs['popup-delete-all-variant'].show()
      } else {
        this.isVariantActive = true
        this.variantInputItems.push({
          variant: {
            type: this.variantInputItems.length + 1,
            variantName: '',
            parent: null,
            stock: null,
            price: null,
            newParent: false,
            newSecondParent: false,
            isValid: true,
            isSame: false,
            variantOptionItem: [
              {
                variantOptionName: '',
                parent: null,
                stock: null,
                price: null,
                isValid: true,
                isSame: false,
                newParentItem: true,
                option: [],
              },
            ],
          },
        })
      }
    },
    addVariant() {
      if (this.variantInputItems.length < 3) {
        this.variantInputItems.push({
          variant: {
            type: this.variantInputItems.length + 1,
            variantName: '',
            parent: null,
            stock: null,
            price: null,
            isValid: true,
            isSame: false,
            newParent: true,
            newSecondParent: false,
            variantOptionItem: [
              {
                variantOptionName: '',
                parent: null,
                stock: null,
                price: null,
                isValid: true,
                isSame: false,
                newParentItem: true,
                option: [],
              },
            ],
          },
        })
        this.applyVariantIsActive = true
      }
    },
    addVariantOption(data) {
      const findIndexVariant = this.variantInputItems.findIndex(item => item.variant.type === data.variant.type)
      this.variantInputItems[findIndexVariant].variant.variantOptionItem.push(
        {
          variantOptionName: '',
          parent: null,
          stock: null,
          price: null,
          isValid: true,
          isSame: false,
          newVariant: true,
          option: [],
          newParentItem: true,
        },
      )
      if (this.variantInputItems[findIndexVariant].variant.type === 1) {
        this.variantInputItems.forEach((items, indexs) => {
          this.variantInputItems[indexs].variant.newParent = true
        })
      }
      if (this.variantInputItems[findIndexVariant].variant.type === 2) {
        this.variantInputItems.forEach((items, indexs) => {
          this.variantInputItems[indexs].variant.newSecondParent = true
        })
      }
      this.applyVariantIsActive = true
    },
    handleDeleteVariant(data) {
      this.variantToDelete = data
      this.$refs['popup-delete-variant'].show()
    },
    deleteVariant() {
      const findIndexVariant = this.variantInputItems.findIndex(item => item.variant.type === this.variantToDelete.variant.type)
      this.variantInputItems.splice(findIndexVariant, 1)
      if (this.variantInputItems.length === 0) this.isVariantActive = false
      this.$refs['popup-delete-variant'].hide()
    },
    closePopupDeleteVariant() {
      this.$refs['popup-delete-variant'].hide()
    },
    deleteVariantOption(item, variantOption) {
      const findIndexVariant = this.variantInputItems.findIndex(itemVariant => itemVariant.variant.variantName === item.variant.variantName)
      const findIndexVariantOption = this.variantInputItems[findIndexVariant].variant.variantOptionItem.findIndex(itemVariantOption => itemVariantOption.variantOptionName === variantOption.variantOptionName)
      this.variantInputItems[findIndexVariant].variant.variantOptionItem.splice(findIndexVariantOption, 1)
      const findVariant = this.variantItems.findIndex(items => items.option_name === variantOption.variantOptionName)
      if (findVariant !== -1) {
        this.variantItems.splice(findVariant, 1)
      }
      if (findVariant === -1) {
        this.variantItems.forEach((items, indexs) => {
          const findSecondVariant = items.options.findIndex((options, indexOptions) => options.option_name === variantOption.variantOptionName)
          if (findSecondVariant !== -1) {
            this.variantItems[indexs].options.splice(findSecondVariant, 1)
          }
          if (findSecondVariant === -1) {
            this.variantItems[indexs].options.forEach((secondOption, secondIndexOptions) => {
              const findThirdVariant = secondOption.options.findIndex((secondOptions, secondIndexOption) => secondOptions.option_name === variantOption.variantOptionName)
              if (findThirdVariant !== -1) {
                this.variantItems[indexs].options[secondIndexOptions].options.splice(findThirdVariant, 1)
              }
            })
          }
        })
      }
    },
    deleteAllVariant() {
      this.variantItems = []
      this.variantFields = []
      this.variantInputItems = []
      this.isVariantActive = false
      this.$refs['popup-delete-all-variant'].hide()
    },
    closePopupDeleteAllVariant() {
      this.isVariantActive = true
      this.$refs['popup-delete-all-variant'].hide()
    },
    applyVariant() {
      if (this.variantItems.length > 0) {
        this.variantFields = []
        this.variantInputItems.forEach(item => {
          if (item.variant.type === 1) {
            this.variantFields.push({
              key: 'variant1',
              label: item.variant.variantName,
              tdClass: 'firstVariantItemsClass',
              trClass: 'firstVariantFieldsClass',
              tdStyle: {
                backgroundColor: 'white',
                borderBottom: '0px',
                verticalAlign: 'text-top',
              },
              thStyle: {
                backgroundColor: 'white',
                borderBottom: '0px',
              },
            })
            item.variant.variantOptionItem.forEach(parentItem => {
              const findVariant = this.variantItems.find(variantItem => variantItem.option_name === parentItem.variantOptionName)
              if (findVariant === undefined) {
                this.variantItems.push({
                  option_name: parentItem.variantOptionName,
                  option_parent: parentItem.parent !== null ? parentItem.option_parent : 0,
                  option_price: parentItem.newVariant || item.variant.newParent ? null : parentItem.price,
                  variant_stock: parentItem.newVariant || item.variant.newParent ? null : parentItem.stock,
                  options: [],
                })
              }
            })
          }
        })
        this.variantInputItems.forEach(item => {
          if (item.variant.type === 2) {
            if (this.variantInputItems.length === 2) {
              this.variantFields.push({
                key: 'variant2',
                label: item.variant.variantName,
                tdClass: 'secondVariantItemsClass',
                tdStyle: {
                  backgroundColor: 'white',
                  borderBottom: '0px',
                  verticalAlign: 'text-top',
                },
                thStyle: {
                  backgroundColor: 'white',
                  borderBottom: '0px',
                },
              })
              item.variant.variantOptionItem.forEach(secondVariantItem => {
                this.variantItems.forEach((dataSecondVariant, indexSecondVariant) => {
                  const findVariant = this.variantItems[indexSecondVariant].options.find(variantItem => variantItem.option_name === secondVariantItem.variantOptionName)
                  if (findVariant === undefined) {
                    this.variantItems[indexSecondVariant].options.push({
                      option_name: secondVariantItem.variantOptionName,
                      option_parent: secondVariantItem.parent !== null ? secondVariantItem.option_parent : 0,
                      option_price: secondVariantItem.newVariant || item.variant.newParent ? null : secondVariantItem.price,
                      variant_stock: secondVariantItem.newVariant || item.variant.newParent ? null : secondVariantItem.stock,
                      options: [],
                    })
                  }
                })
              })
            } else {
              this.variantFields.push({
                key: 'variant2',
                label: item.variant.variantName,
                tdClass: 'secondVariantItemsClass',
                tdStyle: {
                  backgroundColor: 'white',
                  borderBottom: '0px',
                  verticalAlign: 'text-top',
                },
                thStyle: {
                  backgroundColor: 'white',
                  borderBottom: '0px',
                },
              })
              item.variant.variantOptionItem.forEach(secondVariantItem => {
                this.variantItems.forEach((dataSecondVariant, indexSecondVariant) => {
                  const findVariant = this.variantItems[indexSecondVariant].options.find(variantItem => variantItem.option_name === secondVariantItem.variantOptionName)
                  if (findVariant === undefined) {
                    this.variantItems[indexSecondVariant].options.push({
                      option_name: secondVariantItem.variantOptionName,
                      option_parent: secondVariantItem.parent !== null ? secondVariantItem.option_parent : 0,
                      option_price: secondVariantItem.newVariant || item.variant.newParent ? null : secondVariantItem.price,
                      variant_stock: secondVariantItem.newVariant || item.variant.newParent ? null : secondVariantItem.stock,
                      options: [],
                    })
                  }
                })
              })
            }
          }
        })
        this.variantInputItems.forEach(item => {
          if (item.variant.type === 3) {
            this.variantFields.push({
              key: 'variant3',
              label: item.variant.variantName,
              tdClass: 'bg-white',
              tdStyle: {
                backgroundColor: 'white',
                borderBottom: '0px',
                verticalAlign: 'text-top',
              },
              thStyle: {
                backgroundColor: 'white',
                borderBottom: '0px',
              },
            })
            item.variant.variantOptionItem.forEach(thirdVariant => {
              this.variantItems.forEach((dataSecondVariant, index) => {
                this.variantItems[index].options.forEach((dataThirdVariant, indexThirdVariant) => {
                  const findVariant = this.variantItems[index].options[indexThirdVariant].options.find(variantItem => variantItem.option_name === thirdVariant.variantOptionName)
                  if (findVariant === undefined) {
                    this.variantItems[index].options[indexThirdVariant].options.push({
                      option_name: thirdVariant.variantOptionName,
                      option_parent: thirdVariant.parent !== null ? thirdVariant.option_parent : 0,
                      option_price: thirdVariant.newVariant || item.variant.newParent || item.variant.newSecondParent ? null : thirdVariant.price,
                      variant_stock: thirdVariant.newVariant || item.variant.newParent || item.variant.newSecondParent ? null : thirdVariant.stock,
                      options: [],
                    })
                  }
                })
              })
            })
          }
        })
        this.variantFields.push({
          key: 'stock',
          label: 'Stok',
          tdClass: 'bg-white',
          tdStyle: {
            backgroundColor: 'white',
            borderBottom: '0px',
            verticalAlign: 'text-top',
          },
          thStyle: {
            backgroundColor: 'white',
            borderBottom: '0px',
          },
        })
        this.variantFields.push({
          key: 'price',
          label: 'Harga',
          tdClass: 'bg-white',
          tdStyle: {
            backgroundColor: 'white',
            borderBottom: '0px',
            verticalAlign: 'text-top',
          },
          thStyle: {
            backgroundColor: 'white',
            borderBottom: '0px',
          },
        })
      } else {
        this.variantFields = []
        this.variantInputItems.forEach(item => {
          if (item.variant.type === 1) {
            this.variantFields.push({
              key: 'variant1',
              label: item.variant.variantName,
              tdClass: 'firstVariantItemsClass',
              trClass: 'firstVariantFieldsClass',
              tdStyle: {
                backgroundColor: 'white',
                borderBottom: '0px',
                verticalAlign: 'text-top',
              },
              thStyle: {
                backgroundColor: 'white',
                borderBottom: '0px',
              },
            })
            item.variant.variantOptionItem.forEach(parentItem => {
              this.variantItems.push({
                option_name: parentItem.variantOptionName,
                option_parent: parentItem.parent !== null ? parentItem.option_parent : 0,
                option_price: parentItem.newVariant || item.variant.newParent ? null : parentItem.price,
                variant_stock: parentItem.newVariant || item.variant.newParent ? null : parentItem.stock,
                options: [],
              })
            })
          }
        })
        this.variantInputItems.forEach(item => {
          if (item.variant.type === 2) {
            if (this.variantInputItems.length === 2) {
              this.variantFields.push({
                key: 'variant2',
                label: item.variant.variantName,
                tdClass: 'secondVariantItemsClass',
                tdStyle: {
                  backgroundColor: 'white',
                  borderBottom: '0px',
                  verticalAlign: 'text-top',
                },
                thStyle: {
                  backgroundColor: 'white',
                  borderBottom: '0px',
                },
              })
              item.variant.variantOptionItem.forEach(secondVariantItem => {
                this.variantItems.forEach((dataSecondVariant, indexSecondVariant) => {
                  this.variantItems[indexSecondVariant].options.push({
                    option_name: secondVariantItem.variantOptionName,
                    option_parent: secondVariantItem.parent !== null ? secondVariantItem.option_parent : 0,
                    option_price: secondVariantItem.newVariant || item.variant.newParent ? null : secondVariantItem.price,
                    variant_stock: secondVariantItem.newVariant || item.variant.newParent ? null : secondVariantItem.stock,
                    options: [],
                  })
                })
              })
            } else {
              this.variantFields.push({
                key: 'variant2',
                label: item.variant.variantName,
                tdClass: 'secondVariantItemsClass',
                tdStyle: {
                  backgroundColor: 'white',
                  borderBottom: '0px',
                  verticalAlign: 'text-top',
                },
                thStyle: {
                  backgroundColor: 'white',
                  borderBottom: '0px',
                },
              })
              item.variant.variantOptionItem.forEach(secondVariantItem => {
                this.variantItems.forEach((dataSecondVariant, indexSecondVariant) => {
                  this.variantItems[indexSecondVariant].options.push({
                    option_name: secondVariantItem.variantOptionName,
                    option_parent: secondVariantItem.parent !== null ? secondVariantItem.option_parent : 0,
                    option_price: secondVariantItem.newVariant || item.variant.newParent ? null : secondVariantItem.price,
                    variant_stock: secondVariantItem.newVariant || item.variant.newParent ? null : secondVariantItem.stock,
                    options: [],
                  })
                })
              })
            }
          }
        })
        this.variantInputItems.forEach(item => {
          if (item.variant.type === 3) {
            this.variantFields.push({
              key: 'variant3',
              label: item.variant.variantName,
              tdClass: 'bg-white',
              tdStyle: {
                backgroundColor: 'white',
                borderBottom: '0px',
                verticalAlign: 'text-top',
              },
              thStyle: {
                backgroundColor: 'white',
                borderBottom: '0px',
              },
            })
            item.variant.variantOptionItem.forEach(thirdVariant => {
              this.variantItems.forEach((dataSecondVariant, index) => {
                this.variantItems[index].options.forEach((dataThirdVariant, indexThirdVariant) => {
                  this.variantItems[index].options[indexThirdVariant].options.push({
                    option_name: thirdVariant.variantOptionName,
                    option_parent: thirdVariant.parent !== null ? thirdVariant.option_parent : 0,
                    option_price: thirdVariant.newVariant || item.variant.newParent || item.variant.newSecondParent ? null : thirdVariant.price,
                    variant_stock: thirdVariant.newVariant || item.variant.newParent || item.variant.newSecondParent ? null : thirdVariant.stock,
                    options: [],
                  })
                })
              })
            })
          }
        })
        this.variantFields.push({
          key: 'stock',
          label: 'Stok',
          tdClass: 'bg-white',
          tdStyle: {
            backgroundColor: 'white',
            borderBottom: '0px',
            verticalAlign: 'text-top',
          },
          thStyle: {
            backgroundColor: 'white',
            borderBottom: '0px',
          },
        })
        this.variantFields.push({
          key: 'price',
          label: 'Harga',
          tdClass: 'bg-white',
          tdStyle: {
            backgroundColor: 'white',
            borderBottom: '0px',
            verticalAlign: 'text-top',
          },
          thStyle: {
            backgroundColor: 'white',
            borderBottom: '0px',
          },
        })
      }
    },

    validateVariantField(item, index) {
      if (item.variant.variantName !== '') {
        this.variantInputItems[index].variant.isValid = true
      } else {
        this.variantInputItems[index].variant.isValid = false
      }
      const findParent = this.variantInputItems.find(items => items.variant.isValid === false)
      const findOption = this.variantInputItems[index].variant.variantOptionItem.find(itemOption => itemOption.isValid === false)
      if (findParent !== undefined || findOption !== undefined) {
        this.applyVariantIsActive = true
      } else {
        this.applyVariantIsActive = false
      }
      if (this.variantInputItems.length > 1) {
        const findSameVariant = this.variantInputItems.filter(items => items.variant.variantName === item.variant.variantName)
        if (findSameVariant.length > 1) {
          this.addVariantIsActive = true
          this.applyVariantIsActive = true
        } else {
          this.addVariantIsActive = false
          this.applyVariantIsActive = false
        }
      }

      if (this.variantInputItems[index].variant.isValid === false) {
        this.applyVariantIsActive = true
      } else {
        this.applyVariantIsActive = false
      }

      if (this.variantInputItems[index].variant.isValid === true && findOption !== undefined) {
        this.applyVariantIsActive = true
      }

      const findEmptyOption = this.variantInputItems[index].variant.variantOptionItem.find(itemOption => itemOption.variantOptionName === '')
      if (findEmptyOption !== undefined) {
        this.applyVariantIsActive = true
      }

      if (this.variantInputItems.length > 1) {
        const findSameVariantNotEmpty = this.variantInputItems.filter(option => option.variant.variantName !== '')
        const findSameVariant = findSameVariantNotEmpty.filter(option => option.variant.variantName === item.variant.variantName)
        if (findSameVariant.length > 1) {
          this.variantInputItems[index].variant.isSame = true
          this.applyVariantIsActive = true
        } else {
          this.variantInputItems[index].variant.isSame = false
          this.applyVariantIsActive = false
        }
      }
    },
    validateVariantOptionField(index, indexVariantOption, variantOption) {
      if (variantOption.variantOptionName !== '') {
        this.variantInputItems[index].variant.variantOptionItem[indexVariantOption].isValid = true
        if (this.variantInputItems[index].variant.isValid === true
        && this.variantInputItems[index].variant.variantOptionItem[indexVariantOption].isValid === true) this.applyVariantIsActive = false
      } else {
        this.variantInputItems[index].variant.variantOptionItem[indexVariantOption].isValid = false
        if (this.variantInputItems[index].variant.isValid === true
        && this.variantInputItems[index].variant.variantOptionItem[indexVariantOption].isValid === false) this.applyVariantIsActive = true
      }
      const findParent = this.variantInputItems.find(items => items.variant.isValid === false)
      const findOption = this.variantInputItems[index].variant.variantOptionItem.find(itemOption => itemOption.isValid === false)
      if (findOption !== undefined || findParent !== undefined) {
        this.applyVariantIsActive = true
      } else {
        this.applyVariantIsActive = false
      }

      if (this.variantInputItems[index].variant.variantOptionItem.length > 1) {
        const filterEmptyOption = this.variantInputItems[index].variant.variantOptionItem.filter(itemOption => itemOption.variantOptionName !== '')
        const filterOption = filterEmptyOption?.filter(itemOption => itemOption.variantOptionName === variantOption.variantOptionName)
        if (filterOption.length > 1) {
          this.variantInputItems[index].variant.variantOptionItem[indexVariantOption].isSame = true
          this.addVariantOptionIsActive = true
          this.addVariantIsActive = true
          this.applyVariantIsActive = true
        } else {
          this.variantInputItems[index].variant.variantOptionItem[indexVariantOption].isSame = false
          this.addVariantOptionIsActive = false
          this.addVariantIsActive = false
          this.applyVariantIsActive = false
        }
      }
      if (this.variantInputItems[index].variant.isValid === false) {
        this.applyVariantIsActive = true
      } else {
        this.applyVariantIsActive = false
      }

      if (this.variantInputItems[index].variant.variantOptionItem[indexVariantOption].isValid === false) {
        this.applyVariantIsActive = true
      } else {
        this.applyVariantIsActive = false
      }

      if (this.variantInputItems[index].variant.variantOptionItem[indexVariantOption].isValid === true && this.variantInputItems[index].variant.isValid === false) {
        this.applyVariantIsActive = true
      }

      if (this.variantInputItems[index].variant.variantOptionItem[indexVariantOption].isSame === true && this.variantInputItems[index].variant.isValid === false) {
        this.applyVariantIsActive = true
      }

      const findEmptyOption = this.variantInputItems[index].variant.variantOptionItem.find(itemOption => itemOption.variantOptionName === '')
      if (findEmptyOption !== undefined) {
        this.applyVariantIsActive = true
      }
      const findSameOption = this.variantInputItems[index].variant.variantOptionItem.find(itemOption => itemOption.isSame === true)
      if (findSameOption !== undefined) {
        this.applyVariantIsActive = true
      }
    },
    setAllPriceStock() {
      if (this.variantInputItems.length === 3) {
        this.variantItems.forEach((item, index) => {
          this.variantItems[index].options.forEach((secondItem, secondIndex) => {
            this.variantItems[index].options[secondIndex].options.forEach((thirdItem, thirdIndex) => {
              this.variantItems[index].options[secondIndex].options[thirdIndex].variant_stock = this.setStockAll
              this.variantItems[index].options[secondIndex].options[thirdIndex].option_price = this.setPriceAll
            })
          })
        })
      } else if (this.variantInputItems.length === 2) {
        this.variantItems.forEach((item, index) => {
          this.variantItems[index].options.forEach((secondItem, secondIndex) => {
            this.variantItems[index].options[secondIndex].variant_stock = this.setStockAll
            this.variantItems[index].options[secondIndex].option_price = this.setPriceAll
          })
        })
      } else if (this.variantInputItems.length === 1) {
        this.variantItems.forEach((item, index) => {
          this.variantItems[index].variant_stock = this.setStockAll
          this.variantItems[index].option_price = this.setPriceAll
        })
      }
      this.empty = []
      this.validateSubmitButton()
    },
    calculateVolumeProduct() {
      if (this.lengthProduct && this.widthProduct && this.heightProduct) {
        // eslint-disable-next-line no-mixed-operators
        this.calculateVolumeProductItem = this.lengthProduct * this.widthProduct * this.heightProduct / 6000
      } else {
        this.calculateVolumeProductItem = 0
      }
    },
    setImageProduct(event) {
      // eslint-disable-next-line prefer-destructuring
      this.imageFile = event.target.files[0]
    },
    submit(status) {
      this.variantStore = []
      this.optionStore = []
      this.variantInputItems.forEach(item => {
        this.variantStore.push({
          val: item.variant.variantName,
        })
      })
      this.variantItems.forEach((item, index) => {
        this.optionStore.push({
          val: item.option_name,
          parent: 0,
          stock: this.variantInputItems.length === 1 ? item.variant_stock : null,
          price: this.variantInputItems.length === 1 ? item.option_price : null,
          option: [],
        })
        if (this.variantInputItems.length > 1) {
          item.options.forEach((optionItem, optionIndex) => {
            this.optionStore[index].option.push({
              val: optionItem.option_name,
              parent: 0,
              stock: this.variantInputItems.length === 2 ? optionItem.variant_stock : null,
              price: this.variantInputItems.length === 2 ? optionItem.option_price : null,
              option: [],
            })
            if (this.variantInputItems.length > 2) {
              optionItem.options.forEach((secondOptionItem, secondIndexOption) => {
                this.optionStore[index].option[optionIndex].option.push({
                  val: secondOptionItem.option_name,
                  parent: 0,
                  stock: this.variantInputItems.length === 3 ? secondOptionItem.variant_stock : null,
                  price: this.variantInputItems.length === 3 ? secondOptionItem.option_price : null,
                  option: [],
                })
              })
            }
          })
        }
      })

      this.buttonIsSubmit = true
      if (status === 0) this.loadingSubmitDraft = true
      if (status === 1) this.loadingSubmitPublish = true
      this.$http_komship.put(`/v1/product/update/${this.productId}`, {
        product_name: this.productName,
        sku: this.skuName,
        description: this.descriptionProduct,
        weight: this.weightProduct,
        weight_pbv: this.calculateVolumeProductItem.toFixed(3) * 1000,
        length: this.lengthProduct,
        width: this.widthProduct,
        height: this.heightProduct,
        status,
        price: this.isVariantActive ? null : this.priceProduct,
        stock: this.isVariantActive ? null : this.stockProduct,
        variant_option: this.variantStore,
        option: this.optionStore,
      }).then(response => {
        if (this.imageFile) {
          // Update Image
          const formData = new FormData()
          formData.append('product_id', this.productId)
          formData.append('image_path', this.imageFile)
          this.$http_komship.post('/v1/product/update-upload-img-product', formData, {
            headers: { Authorization: `Bearer ${useJwt.getToken()}` },
          }).then(() => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Success',
                icon: 'CheckIcon',
                text: 'Success update produk',
                variant: 'success',
              },
            })
            this.loadingSubmitDraft = false
            this.loadingSubmitPublish = false
            this.buttonIsSubmit = false
            this.$router.push({ name: this.$route.meta.routeAllProduk, query: { tab: 'semua' } })
          }).catch(() => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Failed',
                icon: 'AlertCircleIcon',
                text: 'Gagal update gambar produk, silahkan coba lagi!',
                variant: 'danger',
              },
            })
            this.loadingSubmitDraft = false
            this.loadingSubmitPublish = false
            this.buttonIsSubmit = false
          })
        } else {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Success',
              icon: 'CheckIcon',
              text: 'Success update produk',
              variant: 'success',
            },
          })
          this.loadingSubmitDraft = false
          this.loadingSubmitPublish = false
          this.buttonIsSubmit = false
          this.$router.push({ name: this.$route.meta.routeAllProduk, query: { tab: 'semua' } })
        }
      }).catch(err => {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Failed',
            icon: 'AlertCircleIcon',
            text: err,
            variant: 'danger',
          },
        })
        this.loadingSubmitDraft = false
        this.loadingSubmitPublish = false
        this.buttonIsSubmit = false
      })
    },
    goBack() {
      window.history.back()
    },
    formatCurrency(blur, el, value) {
      const input = document.getElementById(el)
      let inputVal = input.value

      if (inputVal === '' || inputVal === 'Rp' || inputVal === 'Rp ') {
        return
      }

      const originalLen = inputVal.length
      let caretPos = input.selectionStart

      if (inputVal.indexOf(',') >= 0) {
        const decimalPos = inputVal.indexOf(',')
        let leftSide = inputVal.substring(0, decimalPos)
        let rightSide = inputVal.substring(decimalPos)

        leftSide = this.formatNumber(leftSide)
        rightSide = this.formatNumber(rightSide)

        rightSide = rightSide.substring(0, 2)
        inputVal = leftSide + ',' + rightSide // eslint-disable-line
      } else {
        inputVal = this.formatNumber(inputVal)
        inputVal = inputVal // eslint-disable-line
      }

      input.value = inputVal

      const updatedLen = inputVal.length
      caretPos = updatedLen - originalLen + caretPos
      input.setSelectionRange(caretPos, caretPos)

      if (this.priceAllPasteMode) this.setPriceAll = this.priceAllPaste
      this.priceAllPasteMode = false
      if (this.stockAllPasteMode) this.setStockAll = this.stockAllPaste
      this.stockAllPasteMode = false
    },
    formatNumber(n) {
      return n.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    validateSubmitButton() {
      if (this.isVariantActive === false) {
        if (!this.productNameAvailable
        || this.messageErrorIsActive
        || !this.skuNameAvailable
        || this.messageErrorIsActive
        || this.weightProduct === ''
        || this.productName === ''
        || this.weightProduct === null
        || this.productName === null
        || this.priceProduct === null
        || this.priceProduct === ''
        || this.stockProduct === null
        || this.stockProduct === ''
        || this.empty.length > 0) {
          this.buttonIsSubmit = true
        } else {
          this.buttonIsSubmit = false
        }
      }

      if (this.isVariantActive) {
        if (!this.productNameAvailable
        || this.messageErrorIsActive
        || !this.skuNameAvailable
        || this.messageErrorIsActive
        || this.weightProduct === ''
        || this.productName === ''
        || this.weightProduct === null
        || this.productName === null
        || this.empty.length > 0) {
          this.buttonIsSubmit = true
        } else {
          this.buttonIsSubmit = false
        }
      }
    },
    handlePastePrice(e) {
      this.pricePasteMode = true
      this.pricePaste = e.clipboardData.getData('text').replace(/[^\d]/g, '')
      if (this.pricePaste.charAt(0) === '0') this.pricePaste = this.pricePaste.slice(1, this.pricePaste.length)
    },
    handlePastePriceVariant(e, data) {
      return e.target.value.replace(/[^\d]/g, '')
    },
    handlePasteStock(e) {
      this.stockPasteMode = true
      this.stockPaste = e.clipboardData.getData('text').replace(/[^\d]/g, '')
      if (this.stockPaste.charAt(0) === '0') this.stockPaste = this.stockPaste.slice(1, this.stockPaste.length)
    },
    handlePasteWeight(e) {
      this.weightPasteMode = true
      this.weightPaste = e.clipboardData.getData('text').replace(/[^\d]/g, '')
      if (this.weightPaste.charAt(0) === '0') this.weightPaste = this.weightPaste.slice(1, this.weightPaste.length)
    },
    handlePasteWidth(e) {
      this.widthPasteMode = true
      this.widthPaste = e.clipboardData.getData('text').replace(/[^\d]/g, '')
      if (this.widthPaste.charAt(0) === '0') this.widthPaste = this.widthPaste.slice(1, this.widthPaste.length)
    },
    handlePasteLength(e) {
      this.lengthPasteMode = true
      this.lengthPaste = e.clipboardData.getData('text').replace(/[^\d]/g, '')
      if (this.lengthPaste.charAt(0) === '0') this.lengthPaste = this.lengthPaste.slice(1, this.lengthPaste.length)
    },
    handlePasteHeight(e) {
      this.heightPasteMode = true
      this.heightPaste = e.clipboardData.getData('text').replace(/[^\d]/g, '')
      if (this.heightPaste.charAt(0) === '0') this.heightPaste = this.heightPaste.slice(1, this.heightPaste.length)
    },
    handlePastePriceAll(e) {
      this.priceAllPasteMode = true
      this.priceAllPaste = e.clipboardData.getData('text').replace(/[^\d]/g, '')
      if (this.priceAllPaste.charAt(0) === '0') this.priceAllPaste = this.priceAllPaste.slice(1, this.priceAllPaste.length)
    },
    handlePasteStockAll(e) {
      this.stockAllPasteMode = true
      this.stockAllPaste = e.clipboardData.getData('text').replace(/[^\d]/g, '')
      if (this.stockAllPaste.charAt(0) === '0') this.stockAllPaste = this.stockAllPaste.slice(1, this.stockAllPaste.length)
    },
    checkValidationSubmit(data) {
      this.empty = []
      if (this.variantInputItems.length === 1) {
        this.variantItems.forEach(item => {
          if (item.variant_stock === null || item.variant_stock === '') {
            this.empty.push(item)
          }
          if (item.option_price === null || item.option_price === '') {
            this.empty.push(item)
          }
        })
      }
      if (this.variantInputItems.length === 2) {
        this.variantItems.forEach(item => {
          item.options.forEach(secondItem => {
            if (secondItem.variant_stock === null || secondItem.variant_stock === '') {
              this.empty.push(secondItem)
            }
            if (secondItem.option_price === null || secondItem.option_price === '') {
              this.empty.push(secondItem)
            }
          })
        })
      }
      if (this.variantInputItems.length === 3) {
        this.variantItems.forEach(item => {
          item.options.forEach(secondItem => {
            secondItem.options.forEach(thirdItem => {
              if (thirdItem.variant_stock === null || thirdItem.variant_stock === '') {
                this.empty.push(thirdItem)
              }
              if (thirdItem.option_price === null || thirdItem.option_price === '') {
                this.empty.push(thirdItem)
              }
            })
          })
        })
      }
      this.validateSubmitButton()
    },
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
* {
  font-family: Poppins;
}
.modalUploadWarning__body {
  padding: 0px;
}
.modalUploadWarning__text {
  font-weight: 600;
  font-size: 20px;
  line-height: 150%;
  letter-spacing: 0.5px;
  color: #222222;
  margin: 27.79px 0px 40px;
}
.modalUploadWarning__img {
  margin: 47.79px auto 0px;
}
.modalUploadWarning__btn {
  margin-bottom: 40px;
  width: 120px;
  height: 56px;
  background: #F95031 !important;
  border-radius: 12px;
  border: none;
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.5px;
  color: #FFFFFF;
}

.wrapper__handle__back {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background-color: #FFFFFF;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
}

.wrapper__handle__back:hover {
  background-color: #F8F8F8;
}

.wrapper__product__info {
  width: 100%;
  border: 1px solid #E2E2E2;
  border-radius: 16px;
}

.wrapper__product__variant {
  width: 100%;
  border: 1px solid #E2E2E2;
  border-radius: 16px;
}

.wrapper__product__name {
  width: 100%;
  border: 1px solid #E2E2E2;
  border-radius: 16px;
}

.wrapper__form__input__variant {
  border-radius: 12px;
  height: 48px !important;
}

.wrapper__table__variant {
  border: 1px solid #E2E2E2;
  border-radius: 12px;
}

.firstVariantItemsClass {
  vertical-align: top!important;
  padding-left: 40px!important;
  background: white!important;
}

.firstVariantFieldsClass {
  background: white!important;
}

.secondVariantItemsClass {
  align-items: center;
  vertical-align: top!important;
  background: white!important;
}

.my-popover-class .arrow:after {
  border-top-color: red !important;
}

.wrapper__variant2__table {
  background: white!important;
  border: 0px!important;
  height: 48px !important;
}

.wrapper__variant3__table {
  background: white!important;
  border: 0px!important;
  height: 48px !important;
}

.wrapper__alert__volume__product {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 12px;;
  background: #FFF2E2;
  border: 1px solid #FBA63C;
  border-radius: 12px;
  font-weight: 400;
  font-size: 14px;
}

</style>
