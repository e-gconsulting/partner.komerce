<template>
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
          Tambah Produk
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
                    placeholder="Contoh : JBB"
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
                      {{ skuName.length }}/10
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
                            class="wrapper__form__input__variant"
                            :style="item.variant.isValid === false ? 'background-color: #FFEDED;' : 'background-color: white;'"
                            @input="validateVariantField(item, index)"
                          />
                          <div>
                            <b-button
                              class="btn-icon"
                              size="sm"
                              variant="flat-dark"
                              @click="deleteVariant(item)"
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
                        block
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
                          {{ data.item.variant1.val }}
                        </b-row>
                      </template>

                      <template #cell(variant2)="data">
                        <div v-if="variantInputItems.length === 3">
                          <div
                            v-for="(item, index) in data.item.variant1.option"
                            :key="index+1"
                          >
                            <b-col
                              v-for="(secondItem, secondIndex) in item.variant2.option"
                              :key="secondIndex+1"
                              cols="12"
                            >
                              <div
                                class="wrapper__variant2__table mb-1 d-flex align-items-center"
                                disabled
                              >
                                {{ item.variant2.val }}
                              </div>
                            </b-col>
                          </div>
                        </div>
                        <div v-if="variantInputItems.length === 2">
                          <b-col
                            v-for="(item, index) in data.item.variant1.option"
                            :key="index+1"
                            cols="12"
                          >
                            <div
                              class="wrapper__variant2__table mb-1 d-flex align-items-center"
                              disabled
                            >
                              {{ item.variant2.val }}
                            </div>
                          </b-col>
                        </div>
                      </template>

                      <template #cell(variant3)="data">
                        <div
                          v-for="(item, index) in data.item.variant1.option"
                          :key="index+1"
                        >
                          <b-col
                            v-for="(items, index1) in item.variant2.option"
                            :key="index1+1"
                            cols="12"
                          >
                            <div
                              class="wrapper__variant2__table mb-1 d-flex align-items-center"
                              disabled
                            >
                              {{ items.variant3.val }}
                            </div>
                          </b-col>
                        </div>
                      </template>

                      <template #cell(stock)="data">
                        <div v-if="variantInputItems.length === 3">
                          <b-col
                            v-for="(items, index) in data.item.variant1.option"
                            :key="index+1"
                            cols="12"
                          >
                            <div
                              v-for="(itemVariant, indexVariant) in items.variant2.option"
                              :key="indexVariant+1"
                            >
                              <b-form-input
                                :id="`stock-variant-${indexVariant + data.index}-${data.index+1}`"
                                v-model="itemVariant.variant3.stock"
                                class="wrapper__form__input__variant mb-1"
                                placeholder="Contoh : 1000"
                                :formatter="formatPriceVariant"
                                @keyup="formatPriceInput($event)"
                                @keypress="validateInputPriceVariant($event, itemVariant.variant3.stock)"
                                @paste="handlePastePriceVariant"
                              />
                            </div>
                          </b-col>
                        </div>

                        <div v-if="variantInputItems.length === 2">
                          <b-col
                            v-for="(items, index) in data.item.variant1.option"
                            :key="index+1"
                            cols="12"
                          >
                            <b-form-input
                              :id="`stock-variant-${index + data.index}-${data.index+1}`"
                              v-model="items.variant2.stock"
                              class="wrapper__form__input__variant mb-1"
                              placeholder="Contoh : 1000"
                              :formatter="formatPriceVariant"
                              @keyup="formatPriceInput($event)"
                              @keypress="validateInputPriceVariant($event, items.variant2.stock)"
                              @paste="handlePastePriceVariant"
                            />
                          </b-col>
                        </div>

                        <div v-if="variantInputItems.length === 1">
                          <b-form-input
                            v-model="data.item.variant1.stock"
                            class="wrapper__form__input__variant mb-1"
                            placeholder="Contoh : 1000"
                            :formatter="formatPriceVariant"
                            @keyup="formatPriceInput($event)"
                            @keypress="validateInputPriceVariant($event, data.item.variant1.stock)"
                            @paste="handlePastePriceVariant"
                          />
                        </div>
                      </template>

                      <template #cell(price)="data">
                        <div v-if="variantInputItems.length === 3">
                          <b-col
                            v-for="(items, index) in data.item.variant1.option"
                            :key="index+1"
                            cols="12"
                          >
                            <div
                              v-for="(itemVariant, indexVariant) in items.variant2.option"
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
                                  v-model="itemVariant.variant3.price"
                                  class="wrapper__form__input__variant"
                                  placeholder="Contoh : 85000"
                                  :formatter="formatPriceVariant"
                                  @keyup="formatPriceInput($event)"
                                  @keypress="validateInputPriceVariant($event, itemVariant.variant3.price)"
                                  @paste="handlePastePriceVariant"
                                />
                              </b-input-group>
                            </div>
                          </b-col>
                        </div>

                        <div v-if="variantInputItems.length === 2">
                          <b-col
                            v-for="(items, index) in data.item.variant1.option"
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
                                v-model="items.variant2.price"
                                class="wrapper__form__input__variant"
                                placeholder="Contoh : 85000"
                                :formatter="formatPriceVariant"
                                @keyup="formatPriceInput($event)"
                                @keypress="validateInputPriceVariant($event, items.variant2.price)"
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
                              v-model="data.item.variant1.price"
                              class="wrapper__form__input__variant"
                              placeholder="Contoh : 85000"
                              :formatter="formatPriceVariant"
                              @keyup="formatPriceInput($event)"
                              @keypress="validateInputPriceVariant($event, data.item.variant1.price)"
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
                      <b-input-group>
                        <b-input-group-prepend is-text>
                          Pcs
                        </b-input-group-prepend>
                        <b-form-input
                          id="stock-product"
                          v-model="stockProduct"
                          class="wrapper__form__input__variant"
                          placeholder="Contoh : 1000"
                          type="number"
                          :formatter="formatPriceNotVariant"
                          :state="errors.length > 0 ? false:null"
                          :style="errors[0] ? 'background-color: #FFEDED;' : 'background-color: white;'"
                          @keyup="formatStock($event)"
                          @keypress="validateInputStock($event)"
                          @paste="handlePasteStock"
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
                      name="Berat produk"
                      rules="required"
                    >
                      <b-input-group>
                        <b-form-input
                          id="price-product"
                          v-model="weightProduct"
                          class="wrapper__form__input__variant"
                          placeholder="(Contoh : 200)"
                          type="number"
                          :formatter="formatterVolume"
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
                      v-if="imageFile === null"
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
              :disabled="validateSubmitButton()"
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
              :class="buttonIsSubmit ? 'cursor-not-allowed' : ''"
              :disabled="validateSubmitButton()"
              variant="primary"
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
  BOverlay,
  BPopover,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import BCardActions from '@/@core/components/b-card-actions/BCardActions.vue'
import draggable from 'vuedraggable'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { required } from '@validations'
import { heightTransition } from '@core/mixins/ui/transition'
import ToastificationContentVue from '@/@core/components/toastification/ToastificationContent.vue'
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
      isVariantActive: false,

      loadingSubmitDraft: false,
      loadingSubmitPublish: false,

      // Data Option Variant
      variantInputItems: [],

      // Table Variant
      variantFields: [],
      variantItems: [],

      productName: '',
      productNameAvailable: true,
      skuName: '',
      skuNameAvailable: true,

      // validation
      applyVariantIsActive: true,
      messageErrorIsActive: false,
      messageErrorLengthProduct: false,

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
      variantStore: [],
      optionStore: [],

      buttonIsSubmit: false,

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
  },
  methods: {
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
    },
    validateInputPrice(e) {
      if (e.keyCode === 45 || e.keyCode === 43 || e.keyCode === 44 || e.keyCode === 46 || e.keyCode === 101) {
        e.preventDefault()
      }
      if (this.priceProduct === null && e.keyCode === 48) {
        e.preventDefault()
      }
      if (this.priceProduct === '' && e.keyCode === 48) {
        e.preventDefault()
      }
      if (this.weightPasteMode) this.weightProduct = this.weightPaste
      this.weightPasteMode = false
    },
    validateInputPriceVariant(e, data) {
      if (e.keyCode === 45 || e.keyCode === 43 || e.keyCode === 44 || e.keyCode === 46 || e.keyCode === 101) {
        e.preventDefault()
      }
      if (data === null && e.keyCode === 48) {
        e.preventDefault()
      }
      if (data === '' && e.keyCode === 48) {
        e.preventDefault()
      }
    },
    validateInputStock(e) {
      if (e.keyCode === 45 || e.keyCode === 43 || e.keyCode === 44 || e.keyCode === 46 || e.keyCode === 101) {
        e.preventDefault()
      }
      if (this.stockProduct === null && e.keyCode === 48) {
        e.preventDefault()
      }
      if (this.stockProduct === '' && e.keyCode === 48) {
        e.preventDefault()
      }
      if (this.weightPasteMode) this.weightProduct = this.weightPaste
      this.weightPasteMode = false
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
        this.isVariantActive = false
        this.variantInputItems = []
        this.variantItems = []
        this.variantFields = []
      } else {
        this.isVariantActive = true
        this.variantInputItems.push({
          variant: {
            type: this.variantInputItems.length + 1,
            variantName: '',
            parent: null,
            stock: null,
            price: null,
            isValid: true,
            variantOptionItem: [
              {
                variantOptionName: '',
                parent: null,
                stock: null,
                price: null,
                isValid: true,
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
            variantOptionItem: [
              {
                variantOptionName: '',
                parent: null,
                stock: null,
                price: null,
                isValid: true,
                option: [],
              },
            ],
          },
        })
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
          option: [],
        },
      )
    },
    deleteVariant(data) {
      const findIndexVariant = this.variantInputItems.findIndex(item => item.variant.type === data.variant.type)
      this.variantInputItems.splice(findIndexVariant, 1)
    },
    deleteVariantOption(item, variantOption) {
      const findIndexVariant = this.variantInputItems.findIndex(itemVariant => itemVariant.variant.variantName === item.variant.variantName)
      const findIndexVariantOption = this.variantInputItems[findIndexVariant].variant.variantOptionItem.findIndex(itemVariantOption => itemVariantOption.variantOptionName === variantOption.variantOptionName)
      this.variantInputItems[findIndexVariant].variant.variantOptionItem.splice(findIndexVariantOption, 1)
    },
    applyVariant() {
      this.variantItems = []
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
          if (item.variant.variantOptionName !== '') {
            item.variant.variantOptionItem.forEach(parentItem => {
              this.variantItems.push({
                variant1: {
                  val: parentItem.variantOptionName,
                  parent: null,
                  price: null,
                  option: [],
                },
              })
            })
          }
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
            if (item.variant.variantOptionName !== '') {
              item.variant.variantOptionItem.forEach(secondVariantItem => {
                this.variantItems.forEach((dataSecondVariant, indexSecondVariant) => {
                  this.variantItems[indexSecondVariant].variant1.option.push({
                    variant2: {
                      val: secondVariantItem.variantOptionName,
                      parent: null,
                      price: null,
                      option: [],
                    },
                  })
                })
              })
            }
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
            if (item.variant.variantOptionName !== '') {
              item.variant.variantOptionItem.forEach(secondVariantItem => {
                this.variantItems.forEach((dataSecondVariant, indexSecondVariant) => {
                  this.variantItems[indexSecondVariant].variant1.option.push({
                    variant2: {
                      val: secondVariantItem.variantOptionName,
                      parent: null,
                      price: null,
                      option: [],
                    },
                  })
                })
              })
            }
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
          if (item.variant.variantOptionName !== '') {
            item.variant.variantOptionItem.forEach(thirdVariant => {
              this.variantItems.forEach((dataSecondVariant, index) => {
                this.variantItems[index].variant1.option.forEach((dataThirdVariant, indexThirdVariant) => {
                  this.variantItems[index].variant1.option[indexThirdVariant].variant2.option.push({
                    variant3: {
                      val: thirdVariant.variantOptionName,
                      parent: null,
                      price: null,
                      option: [],
                    },
                  })
                })
              })
            })
          }
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
    },
    setAllPriceStock() {
      if (this.variantInputItems.length === 3) {
        this.variantItems.forEach((item, index) => {
          this.variantItems[index].variant1.option.forEach((secondItem, secondIndex) => {
            this.variantItems[index].variant1.option[secondIndex].variant2.option.forEach((thirdItem, thirdIndex) => {
              this.variantItems[index].variant1.option[secondIndex].variant2.option[thirdIndex].variant3.stock = this.setStockAll
              this.variantItems[index].variant1.option[secondIndex].variant2.option[thirdIndex].variant3.price = this.setPriceAll
            })
          })
        })
        this.variantInputItems.forEach((dataVariant, dataVariantIndex) => {
          if (this.variantInputItems[dataVariantIndex].variant.type === 3) {
            this.variantInputItems[dataVariantIndex].variant.variantOptionItem.forEach((dataOption, indexOption) => {
              this.variantInputItems[dataVariantIndex].variant.variantOptionItem[indexOption].price = this.setPriceAll
              this.variantInputItems[dataVariantIndex].variant.variantOptionItem[indexOption].stock = this.setPriceAll
            })
          }
        })
      } else if (this.variantInputItems.length === 2) {
        this.variantItems.forEach((item, index) => {
          this.variantItems[index].variant1.option.forEach((secondItem, secondIndex) => {
            this.variantItems[index].variant1.option[secondIndex].variant2.stock = this.setStockAll
            this.variantItems[index].variant1.option[secondIndex].variant2.price = this.setPriceAll
          })
        })
        this.variantInputItems.forEach((dataVariant, dataVariantIndex) => {
          if (this.variantInputItems[dataVariantIndex].variant.type === 2) {
            this.variantInputItems[dataVariantIndex].variant.variantOptionItem.forEach((dataOption, indexOption) => {
              this.variantInputItems[dataVariantIndex].variant.variantOptionItem[indexOption].price = this.setPriceAll
              this.variantInputItems[dataVariantIndex].variant.variantOptionItem[indexOption].stock = this.setStockAll
            })
          }
        })
      } else if (this.variantInputItems.length === 1) {
        this.variantItems.forEach((item, index) => {
          this.variantItems[index].variant1.stock = this.setStockAll
          this.variantItems[index].variant1.price = this.setPriceAll
        })
        this.variantInputItems.forEach((dataVariant, dataVariantIndex) => {
          if (this.variantInputItems[dataVariantIndex].variant.type === 1) {
            this.variantInputItems[dataVariantIndex].variant.variantOptionItem.forEach((dataOption, indexOption) => {
              this.variantInputItems[dataVariantIndex].variant.variantOptionItem[indexOption].price = this.setPriceAll
              this.variantInputItems[dataVariantIndex].variant.variantOptionItem[indexOption].stock = this.setStockAll
            })
          }
        })
      }
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
      this.variantInputItems.forEach(item => {
        this.variantStore.push({
          val: item.variant.variantName,
        })
        if (item.variant.type === 1) {
          item.variant.variantOptionItem.forEach(dataVariant => {
            let price = null
            if (dataVariant.price !== null) {
              if (dataVariant.price.toString().includes('.')) {
                price = dataVariant.price.split('.').join('')
              } else {
                price = dataVariant.price
              }
            }
            this.optionStore.push({
              val: dataVariant.variantOptionName,
              parent: 0,
              stock: this.variantInputItems.length === 1 ? dataVariant.stock : null,
              price: this.variantInputItems.length === 1 ? price : null,
              option: [],
            })
          })
        }
        if (item.variant.type === 2) {
          item.variant.variantOptionItem.forEach(dataVariant => {
            let secondPrice = null
            if (dataVariant.price !== null) {
              if (dataVariant.price.toString().includes('.')) {
                secondPrice = dataVariant.price.split('.').join('')
              } else {
                secondPrice = dataVariant.price
              }
            }
            this.optionStore.forEach((optionItem, optionIndex) => {
              this.optionStore[optionIndex].option.push({
                val: dataVariant.variantOptionName,
                parent: 0,
                stock: this.variantInputItems.length === 2 ? dataVariant.stock : null,
                price: this.variantInputItems.length === 2 ? secondPrice : null,
                option: [],
              })
            })
          })
        }
        if (item.variant.type === 3) {
          item.variant.variantOptionItem.forEach(dataVariant => {
            let thirdPrice = null
            if (dataVariant.price !== null) {
              if (dataVariant.price.toString().includes('.')) {
                thirdPrice = dataVariant.price.split('.').join('')
              } else {
                thirdPrice = dataVariant.price
              }
            }
            this.optionStore.forEach((optionItem, optionIndex) => {
              this.optionStore[optionIndex].option.forEach((optionItemSecond, optionIndexSecond) => {
                this.optionStore[optionIndex].option[optionIndexSecond].option.push({
                  val: dataVariant.variantOptionName,
                  parent: 0,
                  stock: this.variantInputItems.length === 3 ? dataVariant.stock : null,
                  price: this.variantInputItems.length === 3 ? thirdPrice : null,
                  option: [],
                })
              })
            })
          })
        }
      })

      let price = null
      if (this.priceProduct !== null) {
        if (this.priceProduct.toString().includes('.')) {
          price = this.priceProduct.split('.').join('')
        } else {
          price = this.priceProduct
        }
      }

      const params = {
        product_name: this.productName,
        sku: this.skuName,
        description: this.descriptionProduct,
        weight: this.weightProduct,
        weight_pbv: this.calculateVolumeProductItem.toFixed(3) * 1000,
        length: this.lengthProduct,
        width: this.widthProduct,
        height: this.heightProduct,
        price: this.isVariantActive ? null : price,
        stock: this.isVariantActive ? null : this.stockProduct,
      }

      if (this.isVariantActive === true) {
        Object.assign(params, {
          variant_option: this.variantStore,
          option: this.optionStore,
        })
      }

      this.buttonIsSubmit = true
      if (status === 0) this.loadingSubmitDraft = true
      if (status === 1) this.loadingSubmitPublish = true
      this.$http_komship.post(`/v1/product/create/${status}`, params).then(response => {
        this.productId = response.data.data.product_id
        if (this.imageFile !== null) {
          // Store image
          const formData = new FormData()
          formData.append('product_id', response.data.data.product_id)
          formData.append('image_path', this.imageFile)
          this.$http_komship.post('/v1/product/upload-img-product', formData).then(() => {
            this.$toast({
              component: ToastificationContentVue,
              props: {
                title: 'Success',
                icon: 'CheckIcon',
                text: 'Success menambahkan produk',
                variant: 'success',
              },
            })
            setTimeout(() => {
              this.$router.push({ name: this.$route.meta.routeAllProduk, query: { tabs: 'semua' } })
            }, 500)
            this.loadingSubmitDraft = false
            this.loadingSubmitPublish = false
            this.buttonIsSubmit = false
          }).catch(() => {
            this.$toast({
              component: ToastificationContentVue,
              props: {
                title: 'Gagal',
                icon: 'AlertCircleIcon',
                text: 'Gagal menambahkan gambar produk, silahkan coba lagi!',
                variant: 'danger',
              },
            })
            this.loadingSubmitDraft = false
            this.loadingSubmitPublish = false
            this.buttonIsSubmit = false
          })
        } else {
          this.$toast({
            component: ToastificationContentVue,
            props: {
              title: 'Success',
              icon: 'CheckIcon',
              text: 'Success menambahkan produk',
              variant: 'success',
            },
          })
          this.loadingSubmitDraft = false
          this.loadingSubmitPublish = false
          this.buttonIsSubmit = false
          this.$router.push({ name: this.$route.meta.routeAllProduk, query: { tabs: 'semua' } })
        }
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
      || this.stockProduct === '') {
        this.buttonIsSubmit = true
      } else {
        this.buttonIsSubmit = false
      }
      return this.buttonIsSubmit
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
