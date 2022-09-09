<template>
  <b-card>
    <!-- Riwayat pengajuan pickup -->
    <div v-if="printLabelIsActive === false">
      <b-row class="justify-content-between mx-2 wrapper__content__detail__pickup">
        <b-button
          variant="primary"
          tag="router-link"
          :to="{ name: $route.meta.routeToHistory }"
        >
          <feather-icon
            icon="ChevronLeftIcon"
          />
        </b-button>
        <h3 class="text-black">
          <strong>
            Riwayat Pengajuan Pickup
          </strong>
        </h3>
      </b-row>
      <b-row class="mt-3 justify-content-center">
        <b-col
          cols="11"
          class="d-flex justify-content-between"
        >
          <h4 class="text-black">
            <strong>
              Penjemputan
            </strong>
          </h4>
          <b-button
            :disabled="labelIsActive"
            variant="primary"
            @click="handlePrintLabel"
          >
            <b-row>
              <span class="align-middle">
                Label Pengiriman
              </span>
              <feather-icon
                icon="ChevronRightIcon"
              />
            </b-row>
          </b-button>
        </b-col>
        <b-col cols="11">
          <hr style="height:1px;border-width:0;color:#C2C2C2;background-color:#C2C2C2">
        </b-col>
      </b-row>
      <b-overlay
        variant="light"
        :show="loading"
        spinner-variant="primary"
        blur="0"
        opacity=".5"
        rounded="sm"
      >
        <b-form @submit.prevent>
          <b-row class="justify-content-center">
            <b-col cols="11">
              <b-form-group
                label="Alamat"
                label-for="h-first-name"
                label-cols-md="2"
                label-class="text-black font-weight-bold"
              >
                <b-row class="mt-50">
                  <b-col md="10">
                    <h5 class="text-black">
                      <strong>
                        {{ addressName }}
                      </strong>
                    </h5>
                    <p>
                      {{ addressDetail }}
                    </p>
                  </b-col>
                </b-row>
              </b-form-group>
            </b-col>
            <b-col cols="11">
              <b-form-group
                label="Tanggal"
                label-for="h-email"
                label-cols-md="2"
                label-class="text-black font-weight-bold"
              >
                <div class="add-pickup-input-date-label mt-50">
                  {{ dateLabel }}
                </div>
              </b-form-group>
            </b-col>
            <b-col cols="11">
              <b-form-group
                label="Waktu Jemput"
                label-for="h-number"
                label-cols-md="2"
                label-class="text-black font-weight-bold"
              >
                <p class="mt-50">
                  {{ timeValueText }}
                </p>
              </b-form-group>
            </b-col>
            <b-col cols="11">
              <b-form-group
                label="Kendaraan"
                label-for="h-password"
                label-cols-md="2"
                label-class="text-black font-weight-bold"
              >
                <div
                  id="input-pickup-vehicle"
                  class="add-pickup-input-vehicle-btn-wrapper"
                >
                  <b-button
                    v-if="profile && profile.vehicle && profile.vehicle.indexOf('MOTOR') > -1"
                    :class="`vehicle-button-content ${chosenVehicle === 'MOTOR' ? 'vehicle-selected white-button mr-1' : 'vehicle-button mr-1 d-none'}`"
                  >
                    <img src="@/assets/images/icons/motor.png">
                    <span>Motor</span>
                  </b-button>
                  <b-button
                    v-if="profile && profile.vehicle && profile.vehicle.indexOf('MOBIL') > -1"
                    :class="`vehicle-button-content ${chosenVehicle === 'MOBIL' ? 'vehicle-selected white-button mr-1' : 'vehicle-button mr-1 d-none'}`"
                  >
                    <img src="@/assets/images/icons/mobil.png">
                    <span>Mobil</span>
                  </b-button>
                  <b-button
                    v-if="profile && profile.vehicle && profile.vehicle.indexOf('TRUCK') > -1"
                    :class="`vehicle-button-content vehicle-button-content-truk ${chosenVehicle === 'TRUCK' ? 'vehicle-selected white-button' : 'vehicle-button d-none'}`"
                  >
                    <img src="@/assets/images/icons/truk.png">
                    <span>Truk</span>
                  </b-button>
                </div>
              </b-form-group>
            </b-col>
            <b-col
              class="mt-1"
              cols="11"
            >
              <b-form-group
                label="Orderan"
                label-for="h-password"
                label-cols-md="2"
                label-class="text-black font-weight-bold"
              />
            </b-col>
          </b-row>

          <div v-if="selectedOrderToStore === []">
            <b-row class="justify-content-center">
              <b-col
                cols="11"
                class="d-flex justify-content-between"
              >
                <div>
                  <h5>
                    <strong>
                      Produk
                    </strong>
                  </h5>
                </div>
                <div>
                  <h5>
                    <strong>
                      Jumlah
                    </strong>
                  </h5>
                </div>
              </b-col>
              <b-col cols="11">
                <hr style="height:1px;border-width:0;color:#C2C2C2;background-color:#C2C2C2">
              </b-col>
            </b-row>
          </div>

          <b-row class="justify-content-center mt-1">
            <b-col cols="11">
              <b-table
                :fields="fieldsPreviewProductOrder"
                :items="itemsPreviewProductOrder"
              >
                <template #cell(product)="data">
                  <b-row class="">
                    <div
                      fluid
                      class="d-flex"
                    >
                      <div>
                        <b-avatar
                          variant="light-primary"
                          square
                          size="50px"
                          :src="data.item.product_image"
                        />
                      </div>
                      <div class="ml-1">
                        <h5 class="text-black">
                          <strong>
                            {{ data.item.product_name }}
                          </strong>
                        </h5>
                        <div v-if="data.item.product_variant_name !== ''">
                          <span class="text-primary">
                            <strong>
                              {{ data.item.product_variant_name }}
                            </strong>
                          </span>
                        </div>
                        <div v-else>
                          <span class="text-primary">
                            <strong>
                              -
                            </strong>
                          </span>
                        </div>
                      </div>
                    </div>
                  </b-row>
                </template>

                <template #cell(total)="data">
                  <h5 class="text-black">
                    <strong>
                      {{ data.item.qty }}
                    </strong>
                  </h5>
                </template>

              </b-table>
            </b-col>
          </b-row>

          <b-row class="justify-content-center mb-1">
            <b-col
              class="mb-1"
              cols="11"
            >
              <hr style="height:2px;border-width:0;color:#ebe9f1;background-color:#ebe9f1">
            </b-col>
            <b-col
              cols="11"
              class="d-flex justify-content-end pl-0"
            >
              <div>
                <span class="text-black">
                  <strong>
                    Total: {{ itemsPreviewProductOrder ? `Total: ${itemsPreviewProductOrder.length}` : 'Total: 0' }}
                  </strong>
                </span>
              </div>
            </b-col>
          </b-row>

        </b-form>
      </b-overlay>
    </div>

    <!-- Print label pengiriman -->
    <div v-else>
      <div class="wrapper__print__label__desktop">
        <b-row class="justify-content-between">
          <b-button
            variant="primary"
            class="ml-3"
            @click="handleBackHistoryPickup"
          >
            <feather-icon
              icon="ChevronLeftIcon"
            />
          </b-button>
          <h4 class="mr-3">
            <strong>
              Detail orderan pickup
            </strong>
          </h4>
        </b-row>
        <b-row class="justify-content-end mr-3 mt-2 mb-5">
          <b-col cols="3">
            <v-select
              v-model="shipmentValue"
              :options="itemsShipment"
              label="shipping_name"
              class="mr-1"
              :reduce="items => items.shipping_name"
              @input="filterPickup"
            />
          </b-col>
          <b-button
            :variant="disableButtonPrint === true ? 'dark' : 'primary'"
            :disabled="disableButtonPrint"
            :style="disableButtonPrint === true ? 'cursor: no-drop' : ''"
            @click="onShowModalPrint"
          >
            {{ totalLabel === 0 ? 'Print Label' : `Print Label (${totalLabel})` }}
          </b-button>
        </b-row>
      </div>
      <div class="wrapper__print__label__mobile">
        <b-row class="justify-content-between mb-1">
          <b-button
            variant="primary"
            class="ml-1 mb-1"
            @click="handleBackHistoryPickup"
          >
            <feather-icon
              icon="ChevronLeftIcon"
            />
          </b-button>
          <h4 class="ml-1">
            <strong>
              Detail orderan pickup
            </strong>
          </h4>
        </b-row>
        <b-row class="justify-content-end">
          <b-col
            cols="12"
            class="mb-1"
          >
            <v-select
              v-model="shipmentValue"
              :options="itemsShipment"
              label="shipping_name"
              class="mr-1"
              :reduce="items => items.shipping_name"
              @input="filterPickup"
            />
          </b-col>
          <b-button
            :variant="disableButtonPrint === true ? 'dark' : 'primary'"
            :disabled="disableButtonPrint"
            :style="disableButtonPrint === true ? 'cursor: no-drop' : ''"
            class="mr-1"
            @click="onShowModalPrint"
          >
            {{ totalLabel === 0 ? 'Print Label' : `Print Label (${totalLabel})` }}
          </b-button>
        </b-row>
      </div>

      <b-overlay
        variant="light"
        :show="loadingPrintLabel"
        spinner-variant="primary"
        blur="0"
        opacity=".5"
        rounded="sm"
      >
        <b-table
          ref="tableOrder"
          hover
          responsive
          class="position-relative"
          show-empty
          empty-text="Tidak ada data untuk ditampilkan."
          :fields="fields"
          :items="items"
        >
          <template #head(date_order)="data">
            <b-row class="align-items-center">
              <b-form-checkbox
                v-model="allSelectItemPrint"
                class="custom-control-primary"
                @change="getAllItemPrint"
              />
              <span>{{ data.label }}</span>
            </b-row>
          </template>
          <template #cell(date_order)="data">
            <b-row>
              <div>
                <b-form-checkbox
                  v-model="data.item.printIsActive"
                  class="custom-control-primary"
                  @change="getItemPrint(data)"
                />
              </div>
              <div>
                <h5 class="text-black">
                  <strong>
                    {{ convertDate(data.item.order_date) }}
                  </strong>
                </h5>
                <p>
                  {{ convertTime(data.item.order_date) }}
                </p>
              </div>
            </b-row>
          </template>
          <template #cell(pelanggan)="data">
            <h5 class="text-black text-top">
              <strong>
                {{ data.item.customer_name }}
              </strong>
            </h5>
            <b-row
              v-if="data.item.shipping === 'JNE'"
              class="align-items-center"
            >
              <b-img
                src="@/assets/images/expedisi/logo-jne.png"
                width="40"
                class="ml-1"
              />
              <span class="text-black ml-50">
                <strong>
                  Reguler
                </strong>
              </span>
            </b-row>
            <b-row
              v-if="data.item.shipping === 'SICEPAT'"
              class="align-items-center"
            >
              <b-img
                src="@/@core/assets/image/icons/logo__sicepat.svg"
                width="60"
                class="ml-1"
              />
              <span class="text-black ml-50">
                <strong>
                  {{ getService(data.item.shipping_type) }}
                </strong>
              </span>
            </b-row>
            <b-row
              v-if="data.item.shipping === 'IDEXPRESS'"
              class="align-items-center"
            >
              <b-img
                src="@/@core/assets/image/icons/logo-idexpress.svg"
                width="40"
                class="ml-1"
              />
              <span class="text-black ml-50">
                <strong>
                  {{ getService(data.item.shipping_type) }}
                </strong>
              </span>
            </b-row>
          </template>
          <template #cell(product)="data">
            <div v-if="data.item.product.length > 1">
              <div
                v-for="(itemsProduct, index) in data.item.product.slice(0, 1)"
                :key="index+1"
              >
                <b-row>
                  <b-container
                    fluid
                    class="d-flex"
                  >
                    <div>
                      <b-avatar
                        variant="light-primary"
                        square
                        size="50px"
                        :src="itemsProduct.product_image"
                      />
                    </div>
                    <div class="ml-1">
                      <p class="text-black">
                        <strong>
                          {{ itemsProduct.product_name }}
                        </strong>
                      </p>
                      <div v-if="itemsProduct.variant_name !== '' && itemsProduct.variant_name !== '0'">
                        <p class="text-primary">
                          <strong>
                            {{ itemsProduct.variant_name }}
                          </strong>
                        </p>
                      </div>
                      <div v-else>
                        <p class="text-primary">
                          -
                        </p>
                      </div>
                    </div>
                  </b-container>
                </b-row>
              </div>
              <div
                v-for="(itemsProduct, index) in data.item.product.slice(1, data.item.product.length)"
                :key="index+2"
              >
                <b-collapse
                  :id="`collapse${data.index}`"
                  class="mt-2"
                >
                  <b-row>
                    <b-container
                      fluid
                      class="d-flex"
                    >
                      <div>
                        <b-avatar
                          variant="light-primary"
                          square
                          size="50px"
                          :src="itemsProduct.product_image"
                        />
                      </div>
                      <div class="ml-1">
                        <p class="text-black">
                          <strong>
                            {{ itemsProduct.product_name }}
                          </strong>
                        </p>
                        <div v-if="itemsProduct.variant_name !== '' && itemsProduct.variant_name !== '0'">
                          <p class="text-primary">
                            <strong>
                              {{ itemsProduct.variant_name }}
                            </strong>
                          </p>
                        </div>
                        <div v-else>
                          <p class="text-primary">
                            -
                          </p>
                        </div>
                      </div>
                    </b-container>
                  </b-row>
                </b-collapse>
              </div>
            </div>
            <div v-else>
              <div
                v-for="(itemsProduct, index) in data.item.product.slice(0, 1)"
                :key="index+1"
              >
                <b-row>
                  <b-container
                    fluid
                    class="d-flex"
                  >
                    <div>
                      <b-avatar
                        variant="light-primary"
                        square
                        size="50px"
                        :src="itemsProduct.product_image"
                      />
                    </div>
                    <div class="ml-1">
                      <span class="d-flex text-black">
                        <strong>{{ itemsProduct.product_name }}</strong>
                        <img
                          v-if="data.item.order_notes !== '0' && data.item.order_notes !== '' && data.item.order_notes !== null"
                          :id="`infoNote` + itemsProduct.order_id"
                          src="@/assets/images/icons/info-order-notes.svg"
                          class="ml-2 cursor-pointer"
                          style="max-width:20px"
                        >
                        <b-popover
                          triggers="hover"
                          :target="`infoNote` + itemsProduct.order_id"
                          placement="topright"
                        >
                          {{ data.item.order_notes }}
                        </b-popover>
                      </span>
                      <div v-if="itemsProduct.variant_name !== '' && itemsProduct.variant_name !== '0'">
                        <p class="text-primary">
                          <strong>
                            {{ itemsProduct.variant_name }}
                          </strong>
                        </p>
                      </div>
                      <div v-else>
                        <p class="text-primary">
                          -
                        </p>
                      </div>
                    </div>
                  </b-container>
                </b-row>
              </div>
            </div>
            <b-button
              v-if="data.item.product.length > 1"
              class="expand-button-variation btn-icon"
              variant="flat-dark"
              @click="handleExpand(data)"
            >
              <b-col class="d-flex">
                {{ data.item.isExpand === true ? 'Tutup' : `${data.item.product.length - 1} Produk Lainnya` }}
                <feather-icon
                  :icon="data.item.isExpand === true ? 'ChevronUpIcon' : 'ChevronDownIcon'"
                />
              </b-col>
            </b-button>
          </template>
          <template #cell(address)="data">
            <h5 class="text-black">
              <strong>
                {{ data.item.customer_detail_address }}
              </strong>
            </h5>
            <p>
              {{ data.item.detail_address }}
            </p>
          </template>
          <template #cell(resi)="data">
            <b-row class="align-items-center justify-content-start">
              <span class="text-black">
                {{ data.item.airway_bill }}
              </span>
            </b-row>
            <b-button
              v-if="data.item.product.length > 1"
              class="expand-button-variation-mobile btn-icon"
              variant="flat-dark"
              @click="handleExpand(data)"
            >
              <b-col class="d-flex">
                {{ data.item.isExpand === true ? 'Tutup' : `${data.item.product.length - 1} Produk Lainnya` }}
                <feather-icon
                  :icon="data.item.isExpand === true ? 'ChevronUpIcon' : 'ChevronDownIcon'"
                />
              </b-col>
            </b-button>
          </template>
        </b-table>
      </b-overlay>

      <!-- Modal Print -->
      <b-modal
        ref="print"
        hide-footer
        hide-header
        scrollable
        size="xl"
      >
        <b-icon-x-circle
          class="close-button-on-popup-pickup"
          @click="handleClosePopUp"
        />

        <div class="title-on-popup-pickup mt-2 mb-2">
          Pilih Bentuk Print Label
        </div>

        <section class="add-pickup-popup-print-options-wrapper">
          <add-pickup-print-panel
            :is-selected="selectedOptions === 1"
            :panel-amount="1"
            :title="'1 Label / Halaman'"
            :sub-title="'Direkomendasikan kertas A4'"
            @onChose="() => handleChosePrintOption(1)"
          />

          <add-pickup-print-panel
            :is-selected="selectedOptions === 2"
            :panel-amount="2"
            :title="'2 Label / Halaman'"
            :sub-title="'Direkomendasikan kertas A4'"
            @onChose="() => handleChosePrintOption(2)"
          />

          <add-pickup-print-panel
            :is-selected="selectedOptions === 4"
            :panel-amount="4"
            :title="'4 Label / Halaman'"
            :sub-title="'Direkomendasikan kertas A4'"
            @onChose="() => handleChosePrintOption(4)"
          />

          <add-pickup-print-panel
            :is-selected="selectedOptions === 100"
            :panel-amount="100"
            :title="'10 cm x 10cm'"
            :sub-title="'Printer Thermal'"
            @onChose="() => handleChosePrintOption(100)"
          />

          <add-pickup-print-panel
            :is-selected="selectedOptions === 150"
            :panel-amount="150"
            :title="'10 cm x 15cm'"
            :sub-title="'Printer Thermal'"
            @onChose="() => handleChosePrintOption(150)"
          />
        </section>

        <b-row class="justify-content-end align-items-center pb-2 wrapper__handle__print__label">
          <b-form-checkbox
            v-model="printDateItem"
            class="custom-control-primary mr-2"
          >
            Tambahkan tanggal cetak di label
          </b-form-checkbox>
          <b-button
            variant="primary"
            class="mr-3 py-1 px-3"
            @click="onSubmitOptionPrint(selectedOptions)"
          >
            <b-spinner
              v-if="loadingButtonPrintLabel"
              small
            />
            Print
          </b-button>
        </b-row>
      </b-modal>

      <b-modal
        ref="modal-validate-print-label"
        hide-footer
        hide-header
        centered
      >
        <div class="modal-add-pickup-popup-success">
          <div class="image-wrapper">
            <img src="@/@core/assets/image/icon-popup-warning.png">
          </div>
          <div class="text-wrapper mb-3 px-1">
            Silahkan lengkapi detail profil Kamu terlebih dahulu sebelum melakukan print label
          </div>
          <b-button
            class="org-button"
            tag="router-link"
            :to="{ name: $route.meta.routeToProfile }"
          >
            Lengkapi Profil
          </b-button>
        </div>
      </b-modal>

      <b-row class="wrapper__pagination__print__mobile">
        <b-col
          cols="12"
          class="mb-1"
        >
          <div
            class="bg-light d-flex justify-content-center align-items-center p-50 rounded"
          >
            <span class="text-black mr-50">
              List per halaman:
            </span>
            <b-button
              v-for="page in optionsPage"
              :key="page"
              class="btn-icon"
              size="sm"
              :variant="totalPerPage === page ? 'primary' : 'flat-dark'"
              @click="setPerPage(page)"
            >
              {{ page }}
            </b-button>
          </div>
        </b-col>
        <b-col
          cols="12"
          class="d-flex justify-content-end"
        >
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="totalPerPage"
            first-number
            last-number
            class="pagination-primary"
          >
            <template #prev-text>
              <feather-icon
                size="18"
                icon="ChevronLeftIcon"
              />
            </template>
            <template #next-text>
              <feather-icon
                size="18"
                icon="ChevronRightIcon"
              />
            </template>
          </b-pagination>
        </b-col>
      </b-row>

      <b-row class="wrapper__pagination__print">
        <b-col
          cols="12"
          class="d-flex justify-content-between"
        >
          <div
            class="bg-light d-flex justify-content-center align-items-center p-50 rounded"
          >
            <span class="text-black mr-50">
              List per halaman:
            </span>
            <b-button
              v-for="page in optionsPage"
              :key="page"
              class="btn-icon"
              size="sm"
              :variant="totalPerPage === page ? 'primary' : 'flat-dark'"
              @click="setPerPage(page)"
            >
              {{ page }}
            </b-button>
          </div>

          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="totalPerPage"
            first-number
            last-number
            class="pagination-primary"
          >
            <template #prev-text>
              <feather-icon
                size="18"
                icon="ChevronLeftIcon"
              />
            </template>
            <template #next-text>
              <feather-icon
                size="18"
                icon="ChevronRightIcon"
              />
            </template>
          </b-pagination>
        </b-col>
      </b-row>
    </div>

  </b-card>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BFormGroup,
  BForm,
  BButton,
  BTable,
  BAvatar,
  BOverlay,
  BContainer,
  BImg,
  BFormCheckbox,
  VBModal,
  BPagination,
  BCollapse,
  BSpinner,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import useJwt from '@/auth/jwt/useJwt'
import vSelect from 'vue-select'
import { dateFormat } from '@core/mixins/ui/date'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import AddPickupPrintPanel from './AddPickupPrintPanel.vue'

export default {

  components: {
    BCard,
    BRow,
    BCol,
    BFormGroup,
    BForm,
    BButton,
    BTable,
    BAvatar,
    BOverlay,
    BContainer,
    BImg,
    BFormCheckbox,
    BPagination,
    BCollapse,
    BSpinner,
    AddPickupPrintPanel,
    vSelect,
  },
  directives: {
    Ripple,
    VBModal,
  },
  mixins: [dateFormat],
  props: {
    selectedOption: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      // Riwayat pengajuan pickup
      loading: false,
      addressName: '',
      addressDetail: '',
      dateValue: new Date(),
      dateLabel: '',
      timeValueText: '09 : 00',
      timeValue: '09:00',
      profile: null,
      chosenVehicle: '',
      itemsAddress: [],
      selectedOrderToStore: [],
      selectedAddress: '',
      fieldsPreviewProductOrder: [
        {
          key: 'product',
          label: 'Produk',
          thClass: 'bg-white text-black text-start pl-0 ml-0 border-top-0',
          tdClass: 'text-start pl-1 border-top-0',
        },
        {
          key: 'total',
          label: 'Jumlah',
          tdClass: 'text-center border-top-0',
          thClass: 'text-center text-black bg-white border-top-0',
          class: 'col-action',
        },
      ],
      itemsPreviewProductOrder: [],
      selectedOrdersId: [],
      namePic: '',
      picPhone: '',
      addressId: '',
      id: this.$route.params.order_data_id,
      itemsDataOrder: [],
      labelIsActive: true,

      // Print label pengiriman
      selectedOptions: this.selectedOption,
      printLabelIsActive: false,
      loadingPrintLabel: false,
      selectedOrder: this.$route.params.selected_order,
      items: [],
      fields: [
        {
          key: 'date_order',
          label: 'Tanggal Order',
          thClass: 'bg-white border-top-0 border-bottom-0 text-black',
          tdClass: 'border-bottom-0 align-top',
          formatter: value => this.dateFormat(value, 'dd mmm yyyy'),
        },
        {
          key: 'pelanggan',
          label: 'Pelanggan',
          thClass: 'bg-white border-top-0 border-bottom-0 text-black',
          tdClass: 'border-bottom-0 align-top',
        },
        {
          key: 'product',
          label: 'Produk',
          thClass: 'bg-white border-top-0 border-bottom-0 text-black',
          tdClass: 'border-bottom-0 align-top',
        },
        {
          key: 'address',
          label: 'Alamat',
          thClass: 'bg-white border-top-0 border-bottom-0 text-black',
          tdClass: 'border-bottom-0 align-top',
        },
        {
          key: 'resi',
          label: 'resi',
          thClass: 'bg-white border-top-0 border-bottom-0 text-black',
          tdClass: 'border-bottom-0 align-top',
          formatter(value) {
            return value === null ? '-' : value
          },
        },
      ],
      printOption: 1,
      valuePrint: [],
      idOrderFromHistory: null,
      idOrder: [],
      selectItemPrint: false,
      allSelectItemPrint: false,
      fieldItemsPrint: [],
      disableButtonPrint: true,
      qtyLabel: [],
      countQty: 0,
      valuesOption: 1,
      totalLabel: 0,
      currentPage: 1,
      totalRows: 0,
      totalPerPage: 50,
      optionsPage: [50, 100, 200],
      itemsWeightProduct: 0,
      handlePreviewModalPrint: true,
      orderIdBase64: [],
      loadingButtonPrintLabel: false,
      itemsShipment: [],
      shipmentValue: 'Semua Ekspedisi',
      shippingName: '',
      paramsBase64: '',
      printDateItem: false,
    }
  },
  computed: {
    labelformobile() {
      let result = null
      if (this.idOrderFromHistory) {
        const date = `${this.idOrderFromHistory.pickup_date}T${this.idOrderFromHistory.pickup_time}`
        result = `label-${this.$moment(date).format('YYYY-MM-DD-HH-mm-ss')}`
      }
      return result
    },
    computePreviewModalPdf() {
      return !(window.screen.width <= 600)
    },
    computedDownloadPdf() {
      return !(window.screen.width >= 600)
    },
  },
  watch: {
    currentPage: {
      handler() {
        this.getOrder()
      },
    },
  },
  mounted() {
    this.getProfile()
    this.getShipment()
  },
  methods: {
    // Riwayat pengajuan pickup
    getProfile() {
      this.loading = true
      this.$http_komship.post('v1/my-profile', {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(response => {
        this.userData = response.data.data
        this.profile = response.data.data
        this.getDetailPickup()
      }).catch(() => {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Gagal',
            icon: 'AlertCircleIcon',
            text: 'Gagal meload data, silahkan refresh halaman!',
            variant: 'danger',
          },
        })
        this.loading = false
        this.labelIsActive = false
      })
    },
    getDetailPickup() {
      this.$http_komship.get(`/v1/pickup/history/detail/${this.id}`, {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(response => {
        const { data } = response.data
        if (data) {
          this.itemsDataOrder = data
          this.addressName = data.address_name
          this.addressDetail = data.address_detail
          this.timeValueText = data.pickup_time
          this.dateLabel = data.pickup_date
          this.chosenVehicle = data.vehicle
          this.itemsPreviewProductOrder = data.data_order
        }
        this.loading = false
        this.labelIsActive = false
      }).catch(() => {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Gagal',
            icon: 'AlertCircleIcon',
            text: 'Gagal meload data, silahkan refresh halaman!',
            variant: 'danger',
          },
        })
        this.loading = false
        this.labelIsActive = false
      })
    },

    // Print label pengiriman
    getOrder() {
      this.loadingPrintLabel = true
      this.idOrderFromHistory.data_order.map(items => this.idOrder.push(items.id))
      const params = {
        order_id: this.idOrder.toString(),
        page: this.currentPage,
        total_per_page: this.totalPerPage,
      }
      if (this.shipmentValue !== 'Semua Ekspedisi') Object.assign(params, { shipping_name: this.shipmentValue })
      this.$http_komship.get(`/v1/order/${this.profile.partner_id}`, {
        params,
      }).then(response => {
        this.totalRows = response.data.data.total
        const { data } = response.data.data
        this.items = data
        // eslint-disable-next-line no-plusplus
        for (let x = 0; x < this.items.length; x++) {
          Object.assign(this.items[x], {
            printIsActive: false,
            isExpand: false,
          })
        }
        // eslint-disable-next-line no-plusplus
        for (let x = 0; x < this.idOrderFromHistory.data_order.length; x++) {
          // eslint-disable-next-line no-plusplus
          for (let y = 0; y < this.items.length; y++) {
            if (this.idOrderFromHistory.data_order[x].id === this.items[y].order_id) {
              Object.assign(this.items[y], { customer_phone: this.idOrderFromHistory.data_order[x].customer_phone })
              Object.assign(this.items[y], { customer_detail_address: this.idOrderFromHistory.data_order[x].address_with_destination })
            }
          }
        }
        this.loadingPrintLabel = false
        this.allSelectItemPrint = false
        this.fieldItemsPrint = []
        this.totalLabel = 0
        this.disableButtonPrint = true
        return this.items
      }).catch(() => {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Gagal',
            icon: 'AlertCircleIcon',
            text: 'Gagal meload data, silahkan coba lagi!',
            variant: 'danger',
          },
        })
        this.loadingPrintLabel = false
      })
    },
    onShowModalPrint() {
      if (this.profile.user_phone === '' || this.profile.user_fullname === '') {
        this.$refs['modal-validate-print-label'].show()
      } else {
        this.$refs.print.show()
      }
    },
    getPrintLabelBase64(values) {
      this.loadingButtonPrintLabel = true
      const params = {
        order_id: this.orderIdBase64.join(),
        page: this.paramsBase64,
      }
      if (this.printDateItem) Object.assign(params, { print_date: 1 })
      this.$http_komship.get('v1/generate/print-label', {
        params,
      }).then(response => {
        try {
          window.open(response.data)
        } catch (e) {
          // eslint-disable-next-line no-alert
          alert('Pop-up Blocker is enabled! Please add this site to your exception list.')
        }
        this.loadingButtonPrintLabel = false
      }).catch(() => {
        this.loadingButtonPrintLabel = false
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Failure',
            icon: 'AlertCircleIcon',
            text: 'Gagal print label, silahkan coba lagi!',
            variant: 'danger',
          },
        })
      })
    },
    onUpdateScreenViewParent() {
      this.$emit('onBackButtonClicked')
    },
    handleChangeOption(values) {
      if (values) {
        this.printOption = values
        this.$refs.printLabelContent.changePrintOption(this.printOption)
      }
    },
    onSubmitOptionPrint(values) {
      if (values === 1) {
        this.paramsBase64 = 'page_1'
        this.getPrintLabelBase64(values)
      } else if (values === 2) {
        this.paramsBase64 = 'page_2'
        this.getPrintLabelBase64(values)
      } else if (values === 4) {
        this.paramsBase64 = 'page_4'
        this.getPrintLabelBase64(values)
      } else if (values === 100) {
        this.paramsBase64 = 'page_5'
        this.getPrintLabelBase64(values)
      } else {
        this.paramsBase64 = 'page_6'
        this.getPrintLabelBase64(values)
      }
      this.handlePreviewModalPrint = true
      this.valuesOption = values
      // Insert a link that allows the user to download the PDF file
      // const link = document.createElement('a')
      // link.innerHTML = 'Download PDF file'
      // link.download = 'file.pdf'
      // link.href = `data:application/octet-stream;base64,${b64}`
    },
    onSubmitOptionPrintMobile(values) {
      if (values === 1) {
        this.paramsBase64 = 'page_1'
        this.getPrintLabelBase64(values)
      } else if (values === 2) {
        this.paramsBase64 = 'page_2'
        this.getPrintLabelBase64(values)
      } else if (values === 4) {
        this.paramsBase64 = 'page_4'
        this.getPrintLabelBase64(values)
      } else if (values === 100) {
        this.paramsBase64 = 'page_5'
        this.getPrintLabelBase64(values)
      } else {
        this.paramsBase64 = 'page_6'
        this.getPrintLabelBase64(values)
      }
      this.handlePreviewModalPrint = true
      this.valuesOption = values
    },
    handleAfterPrintLabel() {
      if (this.profile.is_onboarding) {
        this.$emit('onBoardingShow')
      } else {
        this.$router.push('history-pickup')
      }
    },
    getItemPrint(data) {
      if (data.item.printIsActive === true) {
        this.disableButtonPrint = false
        // eslint-disable-next-line no-plusplus
        for (let x = 0; x < data.item.product.length; x++) {
          this.qtyLabel.push(data.item.product[x].qty)
        }
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < this.qtyLabel.length; i++) {
          this.countQty += this.qtyLabel[i]
        }
        Object.assign(data.item, { qtyTotal: this.countQty })
        this.fieldItemsPrint.push(data.item)
        this.orderIdBase64.push(data.item.order_id)
      }
      if (data.item.printIsActive === false) {
        this.fieldItemsPrint.splice(data.index, 1)
        this.orderIdBase64.splice(data.index, 1)
      }
      if (this.fieldItemsPrint[0] === undefined) this.disableButtonPrint = true
      this.totalLabel = this.fieldItemsPrint.length
    },
    getAllItemPrint() {
      if (this.allSelectItemPrint === true) {
        // eslint-disable-next-line no-plusplus
        for (let x = 0; x < this.items.length; x++) {
          this.items[x].printIsActive = true
          this.fieldItemsPrint.push(this.items[x])
          this.orderIdBase64.push(this.items[x].order_id)
        }
        this.disableButtonPrint = false
      }
      if (this.allSelectItemPrint === false) {
        this.fieldItemsPrint = []
        this.orderIdBase64 = []
        // eslint-disable-next-line no-plusplus
        for (let x = 0; x < this.items.length; x++) {
          this.items[x].printIsActive = false
        }
        this.disableButtonPrint = true
      }
      this.totalLabel = this.fieldItemsPrint.length
      this.$refs.tableOrder.refresh()
    },
    formatPrice(value) {
      const val = value
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    convertDate(value) {
      let result = value
      if (value !== '0000-00-00 00:00:00') {
        result = this.dateFormat(value, 'dd-mm-yyyy')
      }
      return result
    },
    convertTime(value) {
      let result = ''
      if (value !== '0000-00-00 00:00:00') {
        result = this.dateFormat(value, 'HH:MM')
      }
      return result
    },
    getValueDistrict(values) {
      const value = values
      return value.replace(',', ', ')
    },
    getCustomerPhone(value) {
      let result = ''
      if (result.charAt(0) !== '0') {
        result = `0${value}`
      } else if (result.charAt(0) === '6') {
        result = `+${value}`
      }
      return result
    },
    sumAll(product) {
      let total = 0
      product.forEach(item => {
        total += item.qty
      })
      return total
    },
    setPerPage(page) {
      this.totalPerPage = page
      this.getOrder()
    },
    handleExpand(data) {
      // eslint-disable-next-line no-param-reassign
      if (data.item.isExpand === false) {
        // eslint-disable-next-line no-param-reassign
        data.item.isExpand = true
      } else {
        // eslint-disable-next-line no-param-reassign
        data.item.isExpand = false
      }
      this.$root.$emit('bv::toggle::collapse', `collapse${data.index}`)
      this.$refs.tableOrder.refresh()
    },
    getService(data) {
      if (data === 'REG19' || data === 'SIUNT' || data === 'STD' || data === 'IDlite' || data === 'CTC19') {
        return 'Reguler'
      } if (data === 'GOKIL') {
        return 'Cargo'
      }
      return data
    },
    getWeightProduct(data) {
      if (data[1] === undefined) {
        this.itemsWeightProduct = data[0].weight
      } else {
        // eslint-disable-next-line no-plusplus
        for (let x = 0; x < data.length; x++) {
          this.itemsWeightProduct += data[x].weight
        }
      }
      return this.itemsWeightProduct
    },
    getShipment() {
      this.$http_komship.get('/v1/shipments')
        .then(response => {
          this.itemsShipment = response.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    filterPickup() {
      this.getOrder()
    },
    handlePrintLabel() {
      this.idOrderFromHistory = this.itemsDataOrder
      this.printLabelIsActive = true
      this.getOrder()
    },
    handleBackHistoryPickup() {
      this.printLabelIsActive = false
    },
    handleClosePopUp() {
      this.$refs.print.hide()
    },
    handleChosePrintOption(value) {
      if (value) this.selectedOptions = value
      this.$emit('onChangeOption', this.selectedOptions)
    },
  },
}
</script>

<style>

</style>
<style lang="scss">
  @import '~@core/scss/vue/libs/vue-select.scss';
  @import '../HistoryPickup/add-pickup.scss';
  @import '../HistoryPickup/add-pickup-detail.scss';

  [dir] .expand-button-variation {
    text-align: right;
    position: absolute;
    right: 2rem;
    margin-top: -1.72rem;
  }

  [dir] .expand-button-variation-mobile {
      display: none!important;
  }

  [dir] .wrapper__print__label__mobile {
      display: none!important;
    }

  @media only screen and (max-width: 922px) {

    /* History Pickup */
    [dir] .expand-button-variation {
        display: none!important;
    }
    [dir] .expand-button-variation-mobile {
        display: inline-block!important;
    }
  }
  @media only screen and (max-width: 990px) {
    [dir] .wrapper__content__detail__pickup {
      margin: 0px !important;
    }
  }
  @media only screen and (min-width: 579px) {
    [dir] .wrapper__pagination__print__mobile {
        display: none!important;
    }
  }
  @media only screen and (max-width: 578px) {
    [dir] .wrapper__pagination__print {
        display: none!important;
    }
    [dir] .wrapper__print__label__desktop {
      display: none!important;
    }
    [dir] .wrapper__print__label__mobile {
      display: inline-block!important;
    }
  }
</style>
