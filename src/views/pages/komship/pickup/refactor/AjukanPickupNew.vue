<template>
  <b-card>
    <span
      class="font-bold"
      style="font-size:24px"
    >Pengajuan Pickup</span>
    <b-container class="mt-2">
      <span
        class="font-bold"
        style="font-size:20px"
      >Penjemputan</span>
      <hr style="border:1px solid #C2C2C2">
      <b-row class="mb-1">
        <b-col
          md="2"
          class="font-bold"
          style="font-size:16px"
        >
          Alamat
        </b-col>
        <b-col md="5">
          <div v-if="address">
            <span
              class="font-bold"
              style="font-size:16px"
            >{{ address.address_name }}</span><br>
            <span>{{ address.address_detail }}</span>
          </div>
        </b-col>
        <b-col
          md="2"
          class="pl-0"
          style="border-left:1px solid #C2C2C2"
        >
          <b-button
            v-b-modal="'modalSelectAddress'"
            variant="none"
            class="text-primary"
          >
            Pilih
          </b-button>
        </b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col
          md="2"
          class="font-bold"
          style="font-size:16px"
        >
          Tanggal
        </b-col>
        <b-col
          md="3"
          class="pr-0"
        >
          <!-- <b-form-input
            type="date"
          /> -->
          <b-input-group
            class="rounded"
            style="max-width:180px"
          >
            <flat-pickr
              ref="pickupDate"
              v-model="pickupDate"
              :config="formatDate"
              @context="checkPickupTime"
              @on-change="checkPickupTime"
              @on-close="checkPickupTime"
            />
            <b-input-group-append
              is-text
              style="cursor:pointer"
            >
              <img
                src="@/assets/images/icons/date-picker-icon.svg"
                @click="$refs.pickupDate.fp.toggle()"
              >
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col
          md="2"
          class="font-bold"
          style="font-size:16px"
        >
          Waktu Jemput
        </b-col>
        <b-col
          md="4"
        >
          <b-form-timepicker
            v-model="pickupTime"
            locale="id"
            :no-close-button="true"
            :now-button="false"
            :hide-header="true"
            style="max-width: 150px"
            @context="checkPickupTime"
          />
          <span
            v-if="!isPickupTime"
            class="text-primary text-sm"
          >*Tidak bisa angkut jam pickup kurang dari jam saat ini</span>
        </b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col
          md="2"
          class="font-bold"
          style="font-size:16px"
        >
          Kendaraan
        </b-col>
        <b-col md="5">
          <b-button
            :variant="vehicle === 'MOTOR' ? 'outline-primary active' : 'outline-light'"
            class="rounded-lg"
            style="border:1px solid #828282"
            :disabled="!vehicleMotor"
            @click="onSelectVehicle('MOTOR')"
          >
            <img src="@/assets/images/icons/motor.png"><br>
            <span class="text-dark">Motor</span>
          </b-button>
          <b-button
            :variant="vehicle === 'CAR' ? 'outline-primary active' : 'outline-light'"
            class="rounded-lg ml-1 px-1"
            style="border:1px solid #828282"
            :disabled="!vehicleCar"
            @click="onSelectVehicle('CAR')"
          >
            <img src="@/assets/images/icons/mobil.png"><br>
            <span class="text-dark">Mobil</span>
          </b-button>
          <b-button
            :variant="vehicle === 'TRUCK' ? 'outline-primary active' : 'outline-light'"
            class="rounded-lg ml-1 px-2"
            style="border:1px solid #828282"
            :disabled="!vehicleTruck"
            @click="onSelectVehicle('TRUCK')"
          >
            <img src="@/assets/images/icons/truk.png"><br>
            <span class="text-dark">Truk</span>
          </b-button>
        </b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col
          md="2"
          class="font-bold"
          style="font-size:16px"
        >
          Orderan
        </b-col>
      </b-row>
      <b-table
        bordered
        hover
        table-variant="light"
        :fields="fieldsSelectedProduct"
        :items="selectedProduct"
      >
        <template #cell(product_name)="data">
          <div class="d-flex">
            <div v-if="data.item.product_image === null">
              <img
                style="width:50px;height:50px;"
                :src="require('@/assets/images/avatars/image-null.png')"
              >
            </div>
            <div v-else>
              <img
                style="width:50px;height:50px;"
                :src="data.item.product_image"
                :alt="data.item.product_image"
              >
            </div>
            <div
              class="ml-1"
              style="width:70%;"
            >
              <span class="font-bold">{{ data.item.product_name }}</span><br>
              <span
                v-if="data.item.variant_name !== '0'"
                class="text-primary"
              >{{ data.item.variant_name }}</span>
            </div>
          </div>
        </template>
        <template #cell(qty)="data">
          <span class="font-bold">x{{ data.item.qty }}</span>
        </template>
      </b-table>
      <hr style="border:1px solid #C2C2C2">
      <b-row class="mt-2">
        <b-col
          md="6"
          class="my-auto"
        >
          <span
            v-if="selectedProduct.length < 1"
            style="color:#828282"
          >Pilih orderan  yang akan di pickup</span>
          <b-button
            v-if="selectedProduct.length"
            variant="none"
            class="button-detail p-0"
            :to="{ name: $route.meta.routeDetailBefore, params: { selected_order: selectedOrder } }"
          >
            Lihat Detail...
          </b-button>
        </b-col>
        <b-col
          md="6"
          class="d-flex justify-content-end"
        >
          <b-button
            variant="primary"
            :disabled="!address"
            @click="openSelectOrder()"
          >
            Pilih Orderan
          </b-button>
        </b-col>
      </b-row>
      <b-alert
        show
        variant="primary"
        class="p-1 mt-2"
        style="border:1px solid #E31A1A"
      >
        Penarikan saldo kamu memerlukan review oleh pihak admin, dikarenakan adanya kejanggalan dalam pendapatan kamu.
      </b-alert>
      <b-row class="mt-2 justify-content-end">
        <b-button variant="outline-primary">
          Batal
        </b-button>
        <b-button
          variant="primary"
          class="ml-1"
          :disabled="selectedOrder.length < 1 || vehicle === null"
          @click="$refs['modal-alert-submit-pickup'].show()"
        >
          Ajukan Pickup
        </b-button>
      </b-row>
    </b-container>
    <b-modal
      id="modalSelectAddress"
      hide-header
      hide-footer
      scrollable
    >
      <img
        src="@/assets/images/icons/close-circle.svg"
        class="ml-auto"
        style="cursor:pointer"
        @click="$bvModal.hide('modalSelectAddress')"
      >
      <div
        v-for="addressItems in addressList"
        :key="addressItems.address_id"
        class="items-address"
      >
        <b-form-radio
          v-model="address"
          :value="addressItems"
          @change="onSelectAddress(addressItems)"
        >
          <span
            class="font-bold"
            style="font-size:16px"
          >{{ addressItems.address_name }}</span><br>
          <span class="text-primary">{{ addressItems.orders }} </span>
          <span>Orderan belum dipickup</span>
          <span
            v-if="addressItems.is_default === 1"
            style="position:absolute;right:0;top:0"
          >[Utama]</span>
        </b-form-radio>
      </div>
    </b-modal>
    <b-modal
      id="modalSelectOrder"
      size="xl"
    >
      <b-overlay
        variant="light"
        :show="loadTable"
        spinner-variant="primary"
        blur="0"
        opacity=".5"
        rounded="sm"
      >
        <div
          class="table-responsive"
          style="max-height:70vh"
        >
          <b-table
            hover
            striped
            :fields="fieldsOrder"
            :items="itemsOrder"
          >
            <template #head(action)>
              <b-form-checkbox
                v-model="checkAllOrder"
                @input="checkOrder(true)"
              />
            </template>
            <template #cell(action)="data">
              <b-form-checkbox
                v-model="order"
                name="checkboxOrder"
                :value="data.item"
              />
            </template>
            <template #cell(customer_name)="data">
              <span class="font-bold">{{ data.item.customer_name }}</span><br>
              <div
                class="d-flex"
              >
                <img
                  :src="data.item.shipment_image_path"
                  style="width:45px"
                ><span class="my-auto">{{ shippingTypeLabel(data.item.shipping_type) }}</span>
              </div>
            </template>
            <template #cell(product)="data">
              <div v-if="data.item.product[0]">
                <div class="d-flex">
                  <div v-if="data.item.product[0].product_image === null">
                    <img
                      style="width:50px;height:50px;"
                      :src="require('@/assets/images/avatars/image-null.png')"
                    >
                  </div>
                  <div v-else>
                    <img
                      style="width:50px;height:50px;"
                      :src="data.item.product[0].product_image"
                      :alt="data.item.product[0].product_image"
                    >
                  </div>
                  <div
                    class="ml-1"
                    style="width:70%;"
                  >
                    <span class="font-bold">{{ data.item.product[0].product_name }}</span><br>
                    <span
                      v-if="data.item.product[0].variant_name !== '0'"
                      class="text-primary"
                    >{{ data.item.product[0].variant_name }}</span>
                  </div>
                  <div
                    class="ml-1 font-bold"
                    style="10%"
                  >
                    x{{ data.item.product[0].qty }}
                  </div>
                </div>
                <div v-if="data.item.product.length > 1">
                  <b-collapse :id="'collapse-'+data.item.order_id">
                    <div
                      v-for="item in data.item.product.slice(1)"
                      :key="item.order_id"
                      class="d-flex mt-1"
                    >
                      <div v-if="item.product_image === null">
                        <img
                          style="width:50px;height:50px;"
                          :src="require('@/assets/images/avatars/image-null.png')"
                        >
                      </div>
                      <div v-else>
                        <img
                          style="width:50px;height:50px;"
                          :src="item.product_image"
                          :alt="item.product_image"
                        >
                      </div>
                      <div
                        class="ml-1"
                        style="width:70%;"
                      >
                        <span class="font-bold">{{ item.product_name }}</span><br>
                        <span class="text-primary">{{ item.variant_name }}</span>
                      </div>
                      <div
                        class="ml-1 font-bold"
                        style="10%"
                      >
                        x{{ item.qty }}
                      </div>
                    </div>
                  </b-collapse>
                </div>
              </div>
              <div
                v-if="data.item.product.length > 1"
                class="d-flex justify-content-end mt-1 mb-1"
              >
                <b-button
                  v-b-toggle="'collapse-'+data.item.order_id"
                  class="buttonCollapse relative p-0"
                  variant="none"
                  size="sm"
                >
                  <span class="when-open">Tutup <b-icon-chevron-up /></span>
                  <span class="when-closed">{{ data.item.product.length - 1 }} Produk lainnya <b-icon-chevron-down /></span>
                </b-button>
              </div>
            </template>
            <template #cell(grand_total)="data">
              Rp {{ formatNumber(data.item.grand_total) }}<br>
              <span
                v-if="data.item.payment_method === 'COD'"
                class="text-primary"
              >
                COD
              </span>
              <div
                v-else-if="data.item.payment_method === 'BANK TRANSFER'"
                class="d-flex"
              >
                <span class="text-primary">Transfer</span>
                <img
                  v-if="data.item.bank !== '0'"
                  :id="`iconInfo` + data.item.order_id"
                  src="@/assets/images/icons/info-circle.svg"
                  class="icon-info"
                >
                <b-popover
                  triggers="hover"
                  :target="`iconInfo` + data.item.order_id"
                  placement="bottomleft"
                >
                  <label>Nama Bank:</label><br>
                  <span class="font-bold">{{ data.item.bank }}</span><br>
                  <label>No Rekening:</label><br>
                  <span class="font-bold">{{ data.item.bank_account_no }}</span><br>
                  <label>Pemilik Rekening:</label><br>
                  <span class="font-bold">{{ data.item.bank_account_name }}</span><br>
                </b-popover>
              </div>
            </template>
          </b-table>
        </div>
        <div class="d-flex justify-between align-middle">
          <div>
            <span class="mr-1">List per halaman</span>
            <b-button
              v-for="page in pageOptions"
              :key="page"
              :variant="page === perPage ? 'primary' : 'light'"
              size="sm"
              class="btnPage"
              @click="setPage(page)"
            >
              {{ page }}
            </b-button>
          </div>
          <b-pagination
            v-model="currentPage"
            size="md"
            class="float-right mr-2"
            :total-rows="totalItems"
            :per-page="perPage"
            first-number
            last-number
          />
        </div>
      </b-overlay>
      <template #modal-footer>
        <div class="w-100">
          <b-button
            variant="primary"
            class="float-right"
            @click="submitOrder"
          >
            Submit <span v-if="order.length > 0">({{ order.length }})</span>
          </b-button>
          <b-button
            variant="outline-primary"
            class="float-right mr-1"
            @click="show=false"
          >
            Batal
          </b-button>
        </div>
      </template>
    </b-modal>
    <b-modal
      ref="modal-animate-pickup"
      hide-footer
      hide-header
      centered
    >
      <lottie-animation
        path="animation/animate-submit-pickup.json"
        :width="300"
        :height="300"
        class="wrapper__animate__pickup__mobile"
      />
      <b-row
        class="justify-content-center pb-2"
      >
        <h5 class="text-black">
          <strong class="proses__pickup">
            Memproses Pengajuan Pickup
          </strong>
        </h5>
      </b-row>
    </b-modal>
    <b-modal
      ref="modal-success-request-pickup"
      no-close-on-backdrop
      no-close-on-esc
      hide-footer
      hide-header
      centered
    >
      <div class="modal-add-pickup-popup-success">
        <div class="image-wrapper">
          <img src="@/assets/images/icons/success.svg">
        </div>
        <div class="text-wrapper mb-3">
          Pengajuan Pickup Berhasil
        </div>
        <b-button
          class="org-button"
          tag="router-link"
          :to="{ name: $route.meta.routeDetailAfter }"
        >
          Oke
        </b-button>
      </div>
    </b-modal>
    <b-modal
      ref="modal-pickup-error-success"
      no-close-on-backdrop
      no-close-on-esc
      hide-footer
      hide-header
      centered
      size="xl"
    >
      <b-row class="justify-content-center mb-2 pt-2">
        <img src="@/assets/images/icons/warning.svg">
      </b-row>
      <b-row class="justify-content-center text-center mb-2 px-2">
        <b-col md="10">
          <span class="text-black">
            Sebagian orderan telah berhasil diajukan pickup. Silahkan melakukan pickup ulang untuk orderan yang belum berhasil. Jika ada kendala silahkan hubungi CS.
          </span>
        </b-col>
      </b-row>
      <b-row class="mb-2">
        <span class="text-black ml-2">
          <strong>
            Orderan yang gagal diajukan pickup :
          </strong>
        </span>
      </b-row>
      <b-row>
        <b-overlay
          variant="light"
          :show="loadingPickupError"
          spinner-variant="primary"
          blur="0"
          opacity=".5"
          rounded="sm"
        >
          <b-table
            responsive

            :fields="fieldsDataOrder"
            :items="itemsDataOrder"
          >
            <template #cell(date_order_after)="data">
              <span class="text-black">
                <strong>
                  {{ data.item.order_date }}
                </strong>
              </span>
            </template>

            <template #cell(pelanggan_after)="data">
              <b-row>
                <span class="text-black">
                  <strong>
                    {{ data.item.customer_name }}
                  </strong>
                </span>
              </b-row>
              <b-row
                class="mb-50"
              >
                <b-img
                  src="@/assets/images/logo/Komship.png"
                />
              </b-row>
              <b-row
                v-if="data.item.shipping === 'JNE'"
                class="align-items-center"
              >
                <b-img
                  src="@/assets/images/expedisi/logo-jne.png"
                  width="40"
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
                />
                <span class="text-black ml-50">
                  <strong>
                    {{ data.item.shipping_type }}
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
                />
                <span class="text-black ml-50">
                  <strong>
                    {{ data.item.shipping_type }}
                  </strong>
                </span>
              </b-row>
            </template>

            <template #cell(product_after)="data">
              <div
                v-for="(dataProduct, index) in data.item.product"
                :key="index+1"
              >
                <b-row class="mb-2">
                  <b-container
                    fluid
                    class="d-flex"
                  >
                    <div>
                      <b-avatar
                        variant="light-primary"
                        square
                        size="50px"
                        :src="dataProduct.product_image"
                      />
                    </div>
                    <div class="ml-1">
                      <div class="d-flex">
                        <div>
                          <h5 class="text-black">
                            <strong>{{ dataProduct.product_name }}</strong>
                          </h5>
                          <div v-if="dataProduct.variant_name !== '0' && dataProduct.variant_name !== ''">
                            <span class="text-primary"><strong>{{ dataProduct.variant_name }}</strong></span>
                          </div>
                          <div v-else>
                            <span class="text-black">
                              <strong>
                                -
                              </strong>
                            </span>
                          </div>
                        </div>
                        <div>
                          <span class="text-black">
                            <strong>
                              x{{ dataProduct.qty }}
                            </strong>
                          </span>
                        </div>
                      </div>
                    </div>
                  </b-container>
                </b-row>
              </div>
            </template>

            <template #cell(grand_total_after)="data">
              <span class="text-black">
                <strong>
                  Rp. {{ formatPrice(data.item.grandtotal) }}
                </strong>
              </span>
              <p class="text-primary">
                <strong>
                  {{ data.item.payment_method === 'COD' ? data.item.payment_method : 'Non-COD' }}
                </strong>
              </p>
            </template>

            <template #cell(address_after)="data">
              <span class="text-black">
                <strong>
                  {{ data.item.customer_address }}
                </strong>
              </span>
            </template>
          </b-table>
        </b-overlay>
      </b-row>
      <b-row class="justify-content-center pb-2">
        <b-button
          class="org-button"
          @click="handleDataOrderPickupError"
        >
          Oke
        </b-button>
      </b-row>
    </b-modal>
    <b-modal
      ref="modal-failed-request-pickup"
      hide-footer
      hide-header
      centered
    >
      <div class="modal-add-pickup-popup-success">
        <div class="image-wrapper">
          <img src="@/assets/images/icons/fail.svg">
        </div>
        <div class="text-wrapper mb-3 px-2">
          Mohon maaf , ekpedisi sedang terkendala.
          Silahkan refresh halaman
        </div>
        <b-button
          class="org-button"
        >
          Oke
        </b-button>
      </div>
    </b-modal>
    <b-modal
      ref="modal-alert-submit-pickup"
      hide-footer
      hide-header
      centered
    >
      <div class="modal-add-pickup-popup-success">
        <div class="d-flex mb-1">
          <img
            class="m-auto"
            src="@/@core/assets/image/icon-popup-warning.png"
          >
        </div>
        <div class="text-center mb-1 px-1">
          Apakah kamu yakin untuk melakukan Pengajuan Pickup?
          Kurir akan menuju ke lokasi penjemputan kamu
        </div>
        <b-row class="justify-content-center">
          <b-button
            variant="outline-primary"
            class="mr-1"
          >
            Batal
          </b-button>
          <b-button
            variant="primary"
            @click="submitNewPickup"
          >
            Ajukan Pickup
          </b-button>
        </b-row>
      </div>
    </b-modal>
  </b-card>
</template>
<script>
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import moment from 'moment'
import LottieAnimation from 'lottie-vuejs/src/LottieAnimation.vue'

export default {
  components: { flatPickr, LottieAnimation },
  data() {
    return {
      profile: null,
      address: null,
      addressList: null,
      vehicle: null,
      vehicleMotor: false,
      vehicleCar: false,
      vehicleTruck: false,
      fieldsSelectedProduct: [
        {
          key: 'product_name', label: 'Produk', thClass: 'pl-0', tdClass: 'pl-0',
        },
        {
          key: 'qty', label: 'Total', thClass: 'text-right', tdClass: 'text-right',
        },
      ],
      selectedOrder: [],
      selectedProduct: [],
      fieldsOrder: [
        { key: 'action', label: '' },
        {
          key: 'order_date', label: 'Tanggal Order', thClass: 'align-middle', tdClass: 'align-top',
        },
        {
          key: 'customer_name', label: 'Pelanggan', thClass: 'align-middle', tdClass: 'align-top',
        },
        {
          key: 'product', label: 'Produk', thClass: 'align-middle', tdClass: 'align-top p-0',
        },
        {
          key: 'grand_total', label: 'Total Pembayaran', thClass: 'align-middle', tdClass: 'align-top',
        },
        {
          key: 'detail_address', label: 'Alamat', thClass: 'align-middle', tdClass: 'align-top break-words',
        },
      ],
      itemsOrder: [],
      order: [],
      loadTable: false,
      pageOptions: [50, 100, 200],
      totalItems: 0,
      currentPage: 1,
      perPage: 50,
      pickupDate: moment().format('YYYY-MM-DD'),
      pickupTime: moment().format('HH:mm'),
      formatDate: {
        altFormat: 'M j, Y',
        altInput: true,
        minDate: 'today',
        altInputClass: 'bg-white form-control',
      },
      isPickupTime: false,

      // Data Table Popup after submit pickup
      fieldsDataOrder: [
        {
          key: 'date_order_after',
          label: 'Tanggal Order',
          class: 'bg-white',
          thClass: 'border-top-0',
          tdClass: 'border-top-0',
        },
        {
          key: 'pelanggan_after',
          label: 'Pelanggan',
          class: 'bg-white',
          thClass: 'border-top-0',
          tdClass: 'border-top-0',
        },
        {
          key: 'product_after',
          label: 'Produk',
          class: 'bg-white',
          thClass: 'border-top-0',
          tdClass: 'border-top-0',
        },
        {
          key: 'grand_total_after',
          label: 'Total Pembayaran',
          class: 'bg-white',
          thClass: 'border-top-0',
          tdClass: 'border-top-0',
        },
        {
          key: 'address_after',
          label: 'Alamat',
          class: 'bg-white',
          thClass: 'border-top-0',
          tdClass: 'border-top-0',
        },
      ],
      itemsDataOrder: [],
      loadingPickupError: false,
      checkAllOrder: null,
    }
  },
  watch: {
    currentPage: {
      handler(value) {
        this.getDataOrder()
      },
    },
  },
  mounted() {
    if (this.$route.params.selected_order_from_detail) {
      this.order = this.$route.params.selected_order_from_detail
      this.submitOrder()
    }
    this.getProfile()
    this.getAddress()
  },
  methods: {
    formatNumber: value => (`${value}`).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
    getProfile() {
      setTimeout(async () => {
        await this.$http_komship.post('v1/my-profile')
          .then(res => {
            const { data } = res.data
            this.profile = data
            this.vehicleMotor = !!data.vehicle.find(items => items === 'MOTOR')
            this.vehicleCar = !!data.vehicle.find(items => items === 'MOBIL')
            this.vehicleTruck = !!data.vehicle.find(items => items === 'TRUCK')
            this.getDataOrder()
          })
      })
    },
    getAddress() {
      setTimeout(async () => {
        await this.$http_komship.get('/v1/address')
          .then(res => {
            const { data } = res.data
            this.addressList = data
            const defaultAddress = data.find(items => items.is_default === 1)
            if (defaultAddress) {
              this.address = defaultAddress
            }
          })
      })
    },
    checkPickupTime() {
      const getHours = this.pickupTime.substring(0, 2)
      const getHoursNow = moment().format('H')
      if (this.pickupDate > moment().format('YYYY-MM-DD')) {
        this.isPickupTime = true
      // eslint-disable-next-line radix
      } else if (parseInt(getHours) > parseInt(getHoursNow)) {
        this.isPickupTime = true
      } else {
        this.isPickupTime = false
      }
    },
    getDataOrder() {
      this.loadTable = true
      setTimeout(async () => {
        await this.$http_komship.get(`v1/order/${this.profile.partner_id}`, {
          params: {
            order_status: 'Diajukan',
            page: this.currentPage,
            total_per_page: this.perPage,
          },
        })
          .then(res => {
            const { data } = res.data
            this.totalItems = data.total
            this.itemsOrder = data.data
            this.loadTable = false
          })
          .catch(err => { this.loadTable = false })
      })
    },
    setPage(totalPage) {
      this.perPage = totalPage
      this.getDataOrder()
    },
    onSelectAddress(data) {
      this.address = data
      this.$bvModal.hide('modalSelectAddress')
    },
    onSelectVehicle(data) {
      this.vehicle = data
    },
    openSelectOrder() {
      this.order = this.selectedOrder
      this.$bvModal.show('modalSelectOrder')
    },
    submitOrder() {
      this.selectedOrder = this.order
      const product = []
      this.selectedOrder.forEach(element => {
        element.product.forEach(items => {
          product.push(items)
        })
      })
      this.selectedProduct = product
      this.$bvModal.hide('modalSelectOrder')
    },
    submitPickup() {
      const orders = []
      this.$refs['modal-animate-pickup'].show()
      this.selectedOrder.forEach(element => {
        orders.push(element.order_id)
      })
      setTimeout(async () => {
        await this.$http_komship.post(`/v2/pickup/${this.profile.partner_id}/store`, {
          params: {
            partner_name: this.profile.user_fullname,
            pickup_date: this.pickupDate,
            pickup_time: this.pickupTime,
            pic: this.profile.user_address_default.pic_name,
            pic_phone: this.profile.user_address_default.pic_phone,
            vehicle: this.vehicle,
            address_id: this.address.address_id,
            address_detail: this.address.address_detail,
            orders,
          },
        })
          .then(response => {
            if (response.data.code !== 500) {
              this.$refs['modal-animate-pickup'].hide()
              this.$refs['modal-success-request-pickup'].show()
            } else {
              this.$refs['modal-animate-pickup'].hide()
              this.itemsDataOrder = []
              this.handleDataErrorPickup(response.data.data)
              if (response.data.data.pickup_error.length === 0) this.$refs['modal-failed-request-pickup'].show()
            }
            if (response.data.data.pickup_error.length > 0) {
              this.$refs['modal-pickup-error-success'].show()
            } else {
              this.$refs['modal-success-request-pickup'].show()
            }
          }).catch(err => {
            this.handleDataErrorPickup(err.response.data.data)
            if (err.response.data.data.pickup_error.length > 0) {
              this.$refs['modal-pickup-error-success'].show()
              this.$refs['modal-animate-pickup'].hide()
            } else {
              this.$refs['modal-success-request-pickup'].show()
            }
          })
      }, 800)
    },
    handleDataErrorPickup(resData) {
      this.itemsDataOrder = []
      // eslint-disable-next-line array-callback-return
      resData.pickup_error.map(items => {
        this.$http_komship.get(`v1/order/${this.profile.partner_id}/detail/${items.order_id}`).then(response => {
          const { data } = response.data
          this.itemsDataOrder.push(data)
        })
      })
    },
    handleDataOrderPickupError() {
      this.itemsPreviewProductOrder = this.itemsDataOrder
      this.$refs['modal-failed-request-pickup'].hide()
      this.$refs['modal-pickup-error-success'].hide()
    },
    submitNewPickup() {
      this.$refs['modal-alert-submit-pickup'].hide()
      this.submitPickup()
    },
    checkOrder() {
      if (this.checkAllOrder) {
        this.order = this.itemsOrder
      } else {
        this.order = []
      }
    },
    shippingTypeLabel(value) {
      if (value === 'REG19' || value === 'SIUNT' || value === 'STD' || value === 'IDlite' || value === 'CTC19') {
        return 'Reguler'
      } if (value === 'GOKIL') {
        return 'Cargo'
      }
      return value
    },
  },
}
</script>
<style scoped>
.items-address{
    padding: 10px;
    border-radius: 10px;
}
.items-address:hover{
    background-color: #FFECE9;
}
.icon-info {
  width: 20px;
  height: 20px;
  margin-left: 3px;
  cursor: pointer;
}
.collapsed > .when-open,
.not-collapsed > .when-closed {
  display: none;
}
.buttonCollapse {
  width:130px;
  margin-right: -40px;
}
.button-detail {
  font-size: 14px;
  color: #08A0F7!important;
}
.button-detail:hover {
  color: #c3c3c3!important;
}
</style>
