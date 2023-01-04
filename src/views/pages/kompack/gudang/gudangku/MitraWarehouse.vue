<template>
  <b-overlay
    variant="light"
    :show="loading"
    spinner-variant="primary"
    blur="0"
    opacity=".5"
    rounded="sm"
  >
    <b-card>
      <h3 class="text-black ml-50 mb-2">
        <strong>Gudangku</strong>
      </h3>
      <b-img
        v-if="!formAddAddress && warehouseItems.length > 0 && editMode === false"
        v-b-modal="'warehouse-options'"
        src="@/assets/images/icons/add-circle.svg"
        class="cursor-pointer button__add__warehouse"
      />
      <b-row
        v-if="formAddAddress === false && editMode === false"
        :class="warehouseItems.length > 0 ? '' : 'h-[600px] justify-content-center align-items-center'"
      >
        <b-col
          v-if="warehouseItems.length > 0"
          cols="12"
          class="px-0"
        >
          <b-table
            :items="warehouseItems"
            :fields="warehouseFields"
            responsive
          >
            <template #cell(name)="data">
              <div
                id="warehouseKompack"
                class="d-flex align-items-center"
                style="min-width: 200px!important;"
              >
                <b-img
                  :src="data.item.image_logo_url"
                  class="mr-50"
                />
                <span class="text-black">{{ data.value }}</span>
              </div>
              <b-popover
                v-if="data.item.warehouse_type === 'Mitra Kompack'"
                triggers="hover"
                target="warehouseKompack"
                placement="top"
                custom-class="my-popover-class"
              >
                Mitra Gudang Kompack
              </b-popover>
            </template>
            <template #cell(city)="data">
              {{ data.value }}
            </template>
            <template #cell(pic_name)="data">
              {{ data.value }}
            </template>
            <template #cell(product_total)="data">
              {{ data.value }}
            </template>
            <template #cell(action)="data">
              <b-button
                v-if="data.item.warehouse_type !== 'Mitra Kompack'"
                variant="flat-info"
                class="btn-icon"
                @click="editAddress(data)"
              >
                Lihat Detail
              </b-button>
              <div
                v-if="data.item.is_default === 1"
                class="d-flex align-items-center ml-50"
              >
                <b-img
                  src="@/assets/images/icons/verify-warehouse.svg"
                  class="mr-50"
                />
                <span class="text-primary">[Utama]</span>
              </div>
            </template>
          </b-table>
        </b-col>
        <div v-if="warehouseItems.length === 0">
          <b-row class="justify-content-center">
            <b-img
              v-b-modal="'warehouse-options'"
              class="cursor-pointer"
              src="@/assets/images/warehouse/icons/plus-icon.svg"
            />
          </b-row>
          <b-row class="justify-content-center mb-50">
            <h4 class="text-black ml-50">
              Tambah Gudang
            </h4>
          </b-row>
          <b-row class="justify-content-center">
            <b-col
              cols="7"
              class="text-center"
            >
              <span class="text-muted">
                Kamu belum memiliki alamat atau gudang yang terdaftar. Silahkan daftarkan alamat/gudang untuk alamat penjemputan
              </span>
            </b-col>
          </b-row>
        </div>
      </b-row>

      <transition name="fade">
        <b-row
          v-if="formAddAddress === true"
          class="mt-3 ml-50"
        >
          <b-col
            cols="11"
            class="border"
          >
            <b-row class="d-flex mt-50 mb-1">
              <b-col md="6">
                <h4 class="text-black">
                  <strong>Tambah Alamat</strong>
                </h4>
              </b-col>
            </b-row>
            <validation-observer
              ref="formRulesAdd"
            >
              <b-form class="">
                <b-row>
                  <b-col
                    cols="12"
                    class="mb-1 ml-16 pl-50"
                  >
                    <b-row>
                      <b-col cols="9">
                        <b-form-group label-cols-md="4">
                          <template #label>
                            <h4 class="text-black">
                              Nama Tempat<span class="text-primary">*</span>
                            </h4>
                          </template>
                          <validation-provider
                            #default="{errors}"
                            name="Nama Alamat"
                            rules="required"
                          >
                            <b-form-input
                              v-model="fieldAddAddressName"
                              placeholder="Contoh: Gudang Jawa Barat"
                              :state="errors.length > 0 ? false : null"
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-col>

                  <b-col
                    cols="12"
                    class="mb-1 ml-16 pl-50"
                  >
                    <b-row>
                      <b-col cols="9">
                        <b-form-group label-cols-md="4">
                          <template #label>
                            <h4 class="text-black">
                              Kelurahan/Kecamatan<span class="text-primary">*</span>
                            </h4>
                          </template>
                          <validation-provider
                            #default="{errors}"
                            name="Kelurahan/Kecamatan"
                            rules="required"
                          >
                            <v-select
                              v-model="fieldAddOrigin"
                              :options="itemsOriginEdit"
                              label="label"
                              :state="errors.length > 0 ? false : null"
                              placeholder="Masukkan Kelurahan/Kecamatan"
                              @search="onSearchOrigin"
                            />
                            <small
                              v-if="errors[0]"
                              class="text-danger"
                            >*Kelurahan/Kecamatan harus diisi</small>
                          </validation-provider>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col
                    cols="12"
                    class="mb-3 ml-16 pl-50"
                  >
                    <b-row>
                      <b-col cols="9">
                        <b-form-group label-cols-md="4">
                          <template #label>
                            <h4 class="text-black">
                              Alamat Detail<span class="text-primary">*</span>
                            </h4>
                            <small>
                              Alamat ini akan jadi petunjuk kurir saat mau
                              jemput barang. Pastikan kamu isi dengan detail ya.
                            </small>
                          </template>
                          <validation-provider
                            #default="{errors}"
                            name="Alamat Detail"
                            rules="required"
                          >
                            <b-form-textarea
                              v-model="fieldAddAddressDetail"
                              placeholder="Contoh: Jl. Raya Tamansari, Kompleks Karangwuni, Desa, Dusun I, Tamansari, Karangmoncol, Kabupaten Purbalingga, Jawa Tengah 53355"
                              rows="3"
                              :state="errors.length > 0 ? false : null"
                              :formatter="formatDetailAddress"
                              @keypress="validateInputDetail"
                            />
                            <b-row class="justify-content-between">
                              <small class="text-primary ml-1 mt-50">{{
                                errors[0]
                              }}</small>
                              <small class="mr-1 mt-50">
                                <small
                                  v-if="messageErrorLengthAddress"
                                  class="text-primary"
                                >
                                  *hindari menggunakan simbol (/) (=) (:) (;)
                                </small>
                                {{ fieldAddAddressDetail.length }}/85
                              </small>
                            </b-row>
                          </validation-provider>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col
                    cols="12"
                    class="mb-2"
                  >
                    <h4 class="text-black">
                      <strong>
                        Penanggung Jawab
                      </strong>
                    </h4>
                  </b-col>
                  <b-col
                    cols="12"
                    class="mb-1 ml-16 pl-50"
                  >
                    <b-row>
                      <b-col cols="9">
                        <b-form-group label-cols-md="4">
                          <template #label>
                            <h4 class="text-black">
                              Nama<span class="text-primary">*</span>
                            </h4>
                          </template>
                          <validation-provider
                            #default="{errors}"
                            name="PIC"
                            rules="required"
                          >
                            <b-form-input
                              v-model="fieldAddPicName"
                              placeholder="Masukkan Nama Penanggung Jawab Gudang"
                              :state="errors.length > 0 ? false : null"
                              :formatter="formatName"
                              @keypress="validateInputName"
                            />
                            <small
                              v-if="errors[0]"
                              class="text-primary mt-50"
                            >*Nama Penanggung Jawab harus diisi</small>
                          </validation-provider>
                          <b-row class="justify-content-end">
                            <small class="mr-1 mt-50">
                              <small
                                v-if="messageErrorLengthName"
                                class="text-primary"
                              >
                                *hindari menggunakan simbol (/) (=) (:) (;)
                              </small>
                              {{ fieldAddPicName.length }}/30
                            </small>
                          </b-row>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col
                    cols="12"
                    class="ml-16 pl-50"
                  >
                    <b-row>
                      <b-col cols="9">
                        <b-form-group label-cols-md="4">
                          <template #label>
                            <h4 class="text-black">
                              No. HP<span class="text-primary">*</span>
                            </h4>
                            <small>
                              Kurir yang jemput akan menghubungi nomor ini
                            </small>
                          </template>
                          <validation-provider
                            #default="{errors}"
                            name="No. HP"
                            rules="required"
                          >
                            <b-form-input
                              v-model="fieldAddPhoneUser"
                              placeholder="Masukkan Nomor HP Penanggung Jawab Gudang"
                              type="number"
                              :state="errors.length > 0 ? false : null"
                              @input="formatPhoneUser"
                              @keypress="validateInputPhone"
                            />
                            <b-row>
                              <small class="text-primary ml-1 mt-50">{{
                                errors[0]
                              }}</small>
                            </b-row>
                            <b-row>
                              <small class="ml-1 mt-50">
                                <small
                                  v-if="messageErrorPhone"
                                  class="text-primary"
                                >
                                  *minimal 9 digit dan hanya berupa angka.
                                </small>
                              </small>
                            </b-row>
                          </validation-provider>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-col>

                  <b-col
                    md="12"
                    class="ml-16 pl-50"
                  >
                    <b-form-group label-cols-md="4">
                      <b-form-checkbox
                        v-model="isDefault"
                        @change="changeDefaultAddress"
                      >
                        <span class="text-black">Jadikan sebagai alamat utama</span>
                      </b-form-checkbox>
                    </b-form-group>
                  </b-col>

                  <transition name="fade">
                    <b-col
                      md="12"
                      class="d-flex justify-content-end mt-1 pb-1"
                    >
                      <b-button
                        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                        type="submit"
                        variant="outline-primary"
                        class="mr-1"
                        @click.prevent="removeFormAddress"
                      >
                        Hapus
                      </b-button>
                      <b-button
                        v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                        type="reset"
                        variant="primary"
                        class="mr-1"
                        :disabled="messageErrorPhone === true"
                        @click.prevent="submitAddress"
                      >
                        <b-spinner
                          v-if="loadingSubmit"
                          variant="light"
                          small
                        />
                        Simpan
                      </b-button>
                    </b-col>
                  </transition>
                </b-row>
              </b-form>
            </validation-observer>
          </b-col>
        </b-row>
      </transition>

      <!-- Edit -->
      <transition name="fade">
        <b-row
          v-if="editMode"
          class="mt-3 ml-50"
        >
          <b-col
            cols="11"
            class="border"
          >
            <b-row class="d-flex mt-50 mb-1">
              <b-col
                cols="12"
                class="mb-1"
              >
                <div
                  class="cursor-pointer"
                  @click="goBack"
                >
                  <feather-icon
                    icon="ChevronLeftIcon"
                    size="25"
                    style="color: black;"
                  />
                </div>
              </b-col>
              <b-col md="6">
                <h4 class="text-black">
                  <strong>Edit Alamat</strong>
                </h4>
              </b-col>
            </b-row>
            <validation-observer
              ref="formRulesEdit"
            >
              <b-form class="">
                <b-row>
                  <b-col
                    cols="12"
                    class="mb-1 ml-16 pl-50"
                  >
                    <b-row>
                      <b-col cols="9">
                        <b-form-group label-cols-md="4">
                          <template #label>
                            <h4 class="text-black">
                              Nama Tempat<span class="text-primary">*</span>
                            </h4>
                          </template>
                          <validation-provider
                            #default="{errors}"
                            name="Nama Alamat"
                            rules="required"
                          >
                            <b-form-input
                              v-model="addressName"
                              placeholder="Contoh: Gudang Jawa Barat"
                              :state="errors.length > 0 ? false : null"
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-col>

                  <b-col
                    cols="12"
                    class="mb-1 ml-16 pl-50"
                  >
                    <b-row>
                      <b-col cols="9">
                        <b-form-group label-cols-md="4">
                          <template #label>
                            <h4 class="text-black">
                              Kelurahan/Kecamatan<span class="text-primary">*</span>
                            </h4>
                          </template>
                          <validation-provider
                            #default="{errors}"
                            name="Kelurahan/Kecamatan"
                            rules="required"
                          >
                            <v-select
                              v-model="originValue"
                              :options="itemsOriginEdit"
                              label="label"
                              :state="errors.length > 0 ? false : null"
                              placeholder="Masukkan Kelurahan/Kecamatan"
                              @search="onSearchOrigin"
                            />
                            <small
                              v-if="errors[0]"
                              class="text-danger"
                            >*Kelurahan/Kecamatan harus diisi</small>
                          </validation-provider>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col
                    cols="12"
                    class="mb-3 ml-16 pl-50"
                  >
                    <b-row>
                      <b-col cols="9">
                        <b-form-group label-cols-md="4">
                          <template #label>
                            <h4 class="text-black">
                              Alamat Detail<span class="text-primary">*</span>
                            </h4>
                            <small>
                              Alamat ini akan jadi petunjuk kurir saat mau
                              jemput barang. Pastikan kamu isi dengan detail ya.
                            </small>
                          </template>
                          <validation-provider
                            #default="{errors}"
                            name="Alamat Detail"
                            rules="required"
                          >
                            <b-form-textarea
                              v-model="addressDetail"
                              placeholder="Contoh: Jl. Raya Tamansari, Kompleks Karangwuni, Desa, Dusun I, Tamansari, Karangmoncol, Kabupaten Purbalingga, Jawa Tengah 53355"
                              rows="3"
                              :state="errors.length > 0 ? false : null"
                              :formatter="formatDetailAddress"
                              @keypress="validateInputDetail"
                            />
                            <b-row class="justify-content-between">
                              <small class="text-primary ml-1 mt-50">{{
                                errors[0]
                              }}</small>
                              <small class="mr-1 mt-50">
                                <small
                                  v-if="messageErrorLengthAddress"
                                  class="text-primary"
                                >
                                  *hindari menggunakan simbol (/) (=) (:) (;)
                                </small>
                                <!-- {{ addressDetail.length }}/85 -->
                              </small>
                            </b-row>
                          </validation-provider>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col
                    cols="12"
                    class="mb-2"
                  >
                    <h4 class="text-black">
                      <strong>
                        Penanggung Jawab
                      </strong>
                    </h4>
                  </b-col>
                  <b-col
                    cols="12"
                    class="mb-1 ml-16 pl-50"
                  >
                    <b-row>
                      <b-col cols="9">
                        <b-form-group label-cols-md="4">
                          <template #label>
                            <h4 class="text-black">
                              Nama<span class="text-primary">*</span>
                            </h4>
                          </template>
                          <validation-provider
                            #default="{errors}"
                            name="PIC"
                            rules="required"
                          >
                            <b-form-input
                              v-model="picName"
                              placeholder="Masukkan Nama Penanggung Jawab Gudang"
                              :formatter="formatName"
                              :state="errors.length > 0 ? false : null"
                              @keypress="validateInputName"
                            />
                            <small
                              v-if="errors[0]"
                              class="text-primary mt-50"
                            >*Nama Penanggung Jawab harus diisi</small>
                            <b-row class="justify-content-end">
                              <small class="mr-1 mt-50">
                                <small
                                  v-if="messageErrorLengthName"
                                  class="text-primary"
                                >
                                  *hindari menggunakan simbol (/) (=) (:) (;)
                                </small>
                                {{ picName.length }}/30
                              </small>
                            </b-row>
                          </validation-provider>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col
                    cols="12"
                    class="ml-16 pl-50"
                  >
                    <b-row>
                      <b-col cols="9">
                        <b-form-group label-cols-md="4">
                          <template #label>
                            <h4 class="text-black">
                              No. HP<span class="text-primary">*</span>
                            </h4>
                            <small>
                              Kurir yang jemput akan menghubungi nomor ini
                            </small>
                          </template>
                          <validation-provider
                            #default="{errors}"
                            name="No. HP"
                            rules="required"
                          >
                            <b-form-input
                              v-model="phoneUser"
                              placeholder="Masukkan Nomor HP Penanggung Jawab Gudang"
                              type="number"
                              :state="errors.length > 0 ? false : null"
                              @input="formatEditPhoneUser"
                              @keypress="validateEditInputPhone"
                            />
                            <b-row>
                              <small class="text-primary ml-1 mt-50">{{
                                errors[0]
                              }}</small>
                            </b-row>
                            <b-row>
                              <small class="ml-1 mt-50">
                                <small
                                  v-if="messageErrorPhone"
                                  class="text-primary"
                                >
                                  *minimal 9 digit dan hanya berupa angka.
                                </small>
                              </small>
                            </b-row>
                          </validation-provider>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-col>

                  <b-col
                    md="12"
                    class="ml-16 pl-50"
                  >
                    <b-form-group label-cols-md="4">
                      <b-form-checkbox
                        v-model="isDefault"
                        @change="changeDefaultAddress"
                      >
                        <span class="text-black">Jadikan sebagai alamat utama</span>
                      </b-form-checkbox>
                    </b-form-group>
                  </b-col>

                  <transition name="fade">
                    <b-col
                      md="12"
                      class="d-flex justify-content-end mt-1 pb-1"
                    >
                      <b-button
                        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                        type="submit"
                        variant="outline-primary"
                        class="mr-1"
                        @click.prevent="confirmDelete(editIdAddress)"
                      >
                        Hapus
                      </b-button>
                      <b-button
                        v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                        type="reset"
                        variant="primary"
                        class="mr-1"
                        :disabled="messageErrorPhone === true"
                        @click.prevent="submitUpdateAddress"
                      >
                        <b-spinner
                          v-if="loadingSubmit"
                          variant="light"
                          small
                        />
                        Simpan
                      </b-button>
                    </b-col>
                  </transition>
                </b-row>
              </b-form>
            </validation-observer>
          </b-col>
        </b-row>
      </transition>
    </b-card>

    <!-- confirm Delete Address -->
    <b-modal
      ref="modal-confirm-delete-address"
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
          Ingin hapus Alamat ini ?
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
            @click="deleteAddress"
          >
            Hapus
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

    <b-modal
      ref="modal-validate-address"
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
          Kamu tidak dapat menghapus alamat penjemputan yang menjadi alamat
          utama.
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
            @click="closeAlertCannotDelete"
          >
            Oke
          </b-button>
        </b-col>
      </template>
    </b-modal>
    <b-modal
      ref="modal-validate-address-stilluse"
      hide-header-close
      hide-header
      modal-class="modal-primary"
      centered
      title="Primary Modal"
    >
      <b-col
        md="12"
        class="d-flex justify-content-center pt-3 mb-2"
      >
        <b-img
          width="100"
          src="@core/assets/image/icon-popup-warning.png"
        />
      </b-col>

      <b-col class="text-center">
        <h4 class="text-black">
          Kamu tidak dapat menghapus alamat penjemputan karena sudah terhubung
          dengan orderku.
        </h4>
      </b-col>
      <template #modal-footer>
        <b-col
          md="12"
          class="d-flex justify-content-center pb-2"
        >
          <b-button
            variant="primary"
            @click="handleCloseModal"
          >
            Oke
          </b-button>
        </b-col>
      </template>
    </b-modal>
    <b-modal
      id="warehouse-options"
      ref="warehouse-options"
      hide-header
      hide-footer
      centered
    >
      <div class="py-1">
        <h2 class="text-[20px] text-center font-semibold mb-2">
          Tambahkan Gudang
        </h2>
        <b-row>
          <b-col cols="6">
            <b-card
              class="border-primary"
              role="button"
              style="height:180px"
              @click="selectWarehouse('ownWarehouse')"
            >
              <b-img
                src="@/assets/images/banner/private-warehouse.svg"
                class="m-auto"
              /><br>
              <p class="text-[16px] text-[#626262] text-center">
                Gudang Pribadi
              </p>
            </b-card>
          </b-col>
          <b-col cols="6">
            <b-card
              id="partnerWarehouse"
              class="border-primary p-0"
              role="button"
              style="height:180px"
              @click="selectWarehouse('partnerWarehouse')"
            >
              <b-img
                src="@/assets/images/banner/kompack-warehouse.svg"
                class="m-auto grayscale"
              /><br>
              <div class="d-flex text-center -m-1">
                <div class="text-[14px] text-[#626262]">
                  Mitra Gudang
                </div>
                <b-img
                  src="@/assets/images/logo/kompack-logo.svg"
                  class="m-auto kompack-logo ml-[5px]"
                  style="height:14px"
                />
              </div>
              <b-popover
                target="partnerWarehouse"
                variant="primary"
                triggers="hover"
                placement="bottom"
              >
                <small class="text-[#828282] font-medium">
                  Simpan barang kamu di Mitra Gudang Kompack. Biaya packing termurah dan tanpa biaya bulanan. Klik sekarang untuk register!
                </small>
              </b-popover>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </b-modal>

  </b-overlay>
</template>

<script>
import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required } from '@validations'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import {
  BCard,
  BRow,
  BCol,
  BForm,
  BFormGroup,
  BFormInput,
  BFormTextarea,
  BButton,
  BOverlay,
  BFormCheckbox,
  BSpinner,
  BModal,
  BImg,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BButton,
    BOverlay,
    BModal,
    BImg,
    vSelect,
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      loading: false,
      loadingSubmit: false,
      isDefault: false,
      dataAddress: [],
      itemsOrigin: [],
      codeOrigin: [],
      fieldOrigin: '',
      formAddAddress: false,

      // Edit Mode
      editMode: false,
      editIdAddress: null,
      originValue: '',

      addressName: '',
      codeOriginEdit: [],
      itemsOriginEdit: [],
      addressDetail: '',
      picName: '',
      phoneUser: '',

      // Add Address
      fieldAddAddressName: '',
      fieldAddAddressDetail: '',
      fieldAddPicName: '',
      fieldAddPhoneUser: '',
      fieldAddOrigin: '',

      tes: [],
      dataDelete: null,

      // Validation
      required,

      dataIsDefault: 0,

      handleOldOrigin: false,

      messageErrorLengthAddress: false,
      messageErrorLengthName: false,
      messageErrorPhone: false,

      warehouseItems: [],
      warehouseFields: [
        {
          key: 'name',
          label: 'Nama Gudang',
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
        },
        {
          key: 'city',
          label: 'Kota/Kabupaten',
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
        },
        {
          key: 'pic_name',
          label: 'Penanggung Jawab',
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
        },
        {
          key: 'product_total',
          label: 'Produk',
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
        },
        {
          key: 'action',
          label: 'Aksi',
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
        },
      ],
      items: [],
    }
  },
  mounted() {
    this.getAddress()
  },
  methods: {
    getAddress() {
      this.loading = true
      this.$http_komship
        .get('/v1/komship/warehouse')
        .then(async response => {
          const { data } = response.data
          this.items = data
          this.dataAddress = data
          this.loading = false
          this.warehouseItems = data
        })
        .catch(() => {
          this.loading = false
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Gagal',
                icon: 'AlertCircleIcon',
                text: 'Gagal load data, silahkan coba lagi',
                variant: 'danger',
              },
            },
            2000,
          )
        })
    },
    submitAddress() {
      this.loadingSubmit = true
      this.$refs.formRulesAdd.validate().then(success => {
        if (success) {
          const formData = new FormData()
          formData.append('_method', 'post')
          formData.append('address_name', this.fieldAddAddressName)
          formData.append('origin_code', this.fieldAddOrigin.origin_code)
          formData.append('address_detail', this.fieldAddAddressDetail)
          formData.append('pic', this.fieldAddPicName)
          formData.append('zip_code', this.fieldAddOrigin.zip_code)
          formData.append('destination_id', this.fieldAddOrigin.id)
          formData.append('phone', this.fieldAddPhoneUser)
          formData.append('is_default', this.dataIsDefault)

          this.$http_komship
            .post('/v1/address/store', formData)
            .then(response => {
              if (response.data.code !== 400) {
                this.$toast(
                  {
                    component: ToastificationContent,
                    props: {
                      title: 'Success',
                      icon: 'CheckIcon',
                      text: 'Success menambahkan alamat pickup',
                      variant: 'success',
                    },
                  },
                  2000,
                )
                this.loadingSubmit = false
                this.formAddAddress = false
                this.getAddress()
              } else {
                this.$toast(
                  {
                    component: ToastificationContent,
                    props: {
                      title: 'Gagal',
                      icon: 'AlertCircleIcon',
                      text:
                          'Gagal menambahkan alamat pickup, silahkan coba lagi!',
                      variant: 'danger',
                    },
                  },
                  2000,
                )
                this.loadingSubmit = false
                this.formAddAddress = false
                this.getAddress()
              }
            })
            .catch(() => {
              this.loadingSubmit = false
              this.$toast(
                {
                  component: ToastificationContent,
                  props: {
                    title: 'Gagal',
                    icon: 'AlertCircleIcon',
                    text: 'Gagal menambahkan alamat, silahkan coba lagi',
                    variant: 'danger',
                  },
                },
                2000,
              )
            })
        } else {
          this.loadingSubmit = false
        }
      })
    },
    checkAddressIsDefault(data) {
      let result = false
      if (data.is_default > 0) {
        result = true
      }
      return result
    },
    addAddress() {
      this.fieldAddAddressName = ''
      this.fieldAddOrigin = ''
      this.fieldAddAddressDetail = ''
      this.fieldAddPicName = ''
      this.fieldAddPhoneUser = ''
      this.isDefault = false
      this.formAddAddress = true
      this.editMode = false
    },
    removeFormAddress() {
      this.formAddAddress = false
    },
    submitUpdateAddress() {
      this.loadingSubmit = true
      // eslint-disable-next-line dot-notation
      this.$refs['formRulesEdit'].validate().then(success => {
        if (success) {
          const formData = new FormData()
          formData.append('_method', 'put')
          formData.append('address_name', this.addressName)
          if (this.originValue !== null || this.originValue !== '') {
            formData.append('origin_code', this.originValue.origin_code)
            formData.append('destination_id', this.originValue.id)
            formData.append('zip_code', this.originValue.zip_code)
          }
          formData.append('address_detail', this.addressDetail)
          formData.append('pic', this.picName)
          formData.append('phone', this.phoneUser)
          formData.append('is_default', this.dataIsDefault)
          this.$http_komship
            .post(`/v1/address/update/${this.editIdAddress}`, formData)
            .then(() => {
              this.tes = []
              this.handleOldOrigin = false
              this.loadingSubmit = false
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Success',
                  icon: 'CheckIcon',
                  text: 'Success update satu alamat pickup',
                  variant: 'success',
                },
              })
              this.editMode = false
              this.getAddress()
            })
            .catch(() => {
              this.loadingSubmit = false
              this.$toast(
                {
                  component: ToastificationContent,
                  props: {
                    title: 'Failed',
                    icon: 'AlertCircleIcon',
                    text: 'Gagal update alamat pickup, silahkan coba lagi!',
                    variant: 'danger',
                  },
                },
                2000,
              )
            })
        } else {
          this.loadingSubmit = false
        }
      })
    },
    editAddress(data) {
      this.editMode = true
      if (this.warehouseItems[data.index].warehouse_type === 'Mitra Kompack') {
        this.editIdAddress = this.warehouseItems[data.index].mitra_id
      } else {
        this.editIdAddress = this.warehouseItems[data.index].id
      }
      this.addressName = this.warehouseItems[data.index].name
      this.addressDetail = this.warehouseItems[data.index].detail_address
      this.picName = this.warehouseItems[data.index].pic_name
      this.phoneUser = this.warehouseItems[data.index].pic_phone
      if (this.warehouseItems[data.index].is_default === 0) {
        this.isDefault = false
      } else {
        this.isDefault = true
      }
      this.$http_komship
        .get(`/v1/destination?destination_id=${this.warehouseItems[data.index].destination_id}`)
        .then(response => {
          if (response.data.data !== null) {
            this.originValue = response.data.data
          }
        })
    },
    confirmDelete(data) {
      this.dataDelete = data
      this.$refs['modal-confirm-delete-address'].show()
    },
    deleteAddress() {
      if (this.dataDelete.is_default !== 1) {
        this.$http_komship
          .delete(`/v1/address/delete/${this.dataDelete}`)
          .then(response => {
            this.$refs['modal-confirm-delete-address'].hide()
            this.getAddress()
            if (response.data.code === 400) {
              this.$refs['modal-validate-address-stilluse'].show()
            }
            this.editMode = false
          })
          .catch(() => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Gagal',
                icon: 'AlertCircleIcon',
                text: 'Gagal hapus alamat, silahkan coba lagi',
                variant: 'danger',
              },
            })
          })
      } else {
        this.$refs['modal-confirm-delete-address'].hide()
        this.$refs['modal-validate-address'].show()
      }
    },
    onSearchOrigin(search, loading) {
      if (search.length) {
        this.searchOrigin(loading, search, this)
      }
    },
    searchOrigin: _.debounce((loading, search, that) => {
      loading(true)
      that.loadOrigin(search).then(() => loading(false))
    }, 500),
    loadOrigin(search) {
      return this.$http_komship
        .get(`/v1/destination?search=${search}`)
        .then(response => {
          this.itemsOriginEdit = response.data.data.data
        })
        .catch(err => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Gagal',
              icon: 'AlertCircleIcon',
              text: err,
              variant: 'danger',
            },
          })
        })
    },
    changeDefaultAddress() {
      if (this.isDefault === false) {
        this.dataIsDefault = 0
      } else {
        this.dataIsDefault = 1
      }
    },
    changeEditMode() {
      this.editMode = false
    },
    closeConfirmDelete() {
      this.$refs['modal-confirm-delete-address'].hide()
    },
    closeAlertCannotDelete() {
      this.$refs['modal-validate-address'].hide()
    },
    handleCloseModal() {
      this.$refs['modal-validate-address-stilluse'].hide()
    },
    handleSelectOrigin(data) {
      this.originValue = data
    },
    formatDetailAddress(e) {
      return String(e).substring(0, 85)
    },
    formatName(e) {
      return String(e).substring(0, 30)
    },
    formatEditPhoneUser() {
      if (this.phoneUser.length < 9) {
        this.messageErrorPhone = true
      } else {
        this.messageErrorPhone = false
      }
    },
    formatPhoneUser() {
      if (this.fieldAddPhoneUser.length < 9) {
        this.messageErrorPhone = true
      } else {
        this.messageErrorPhone = false
      }
    },
    validateInputDetail(e) {
      if (
        e.keyCode === 47
          || e.keyCode === 61
          || e.keyCode === 58
          || e.keyCode === 59
      ) {
        e.preventDefault()
        this.messageErrorLengthAddress = true
      } else {
        this.messageErrorLengthAddress = false
      }
    },
    validateInputName(e) {
      if (
        e.keyCode === 47
          || e.keyCode === 61
          || e.keyCode === 58
          || e.keyCode === 59
      ) {
        e.preventDefault()
        this.messageErrorLengthName = true
      } else {
        this.messageErrorLengthName = false
      }
    },
    validateInputPhone(e) {
      if (e.keyCode === 46) {
        e.preventDefault()
      }
    },
    validateEditInputPhone(e) {
      if (e.keyCode === 46) {
        e.preventDefault()
      }
    },
    selectWarehouse(option) {
      if (option === 'ownWarehouse') {
        this.$refs['warehouse-options'].hide()
        this.addAddress()
      } else {
        window.open('https://kompack.id/', '_blank')
      }
    },
    goBack() {
      this.editMode = false
    },
  },
}
</script>

  <style lang="scss">
  @import '~@core/scss/vue/libs/vue-select.scss';
  .kompack-logo{
    filter: grayscale(100%);
  }
  #partnerWarehouse:hover .kompack-logo {
    filter: grayscale(0);
  }

  .button__add__warehouse {
    position: fixed;
    right: 85px;
    bottom: 60px;
    z-index: 99;
  }

  .my-popover-class .arrow:after {
    border-top-color: red !important;
  }
  </style>
