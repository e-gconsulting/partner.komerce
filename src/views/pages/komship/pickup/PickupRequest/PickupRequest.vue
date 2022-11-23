<template>
  <b-card class="text-[#222222]">
    <p class="font-bold text-[24px]">
      Pengajuan Pickup
    </p>
    <b-container class="font-bold text-[16px] py-3 px-4 container__pickup__mobile">
      <p class="text-[20px]">
        Penjemputan
      </p>
      <hr class="border border-[#C2C2C2] my-1">
      <b-row class="mb-1">
        <b-col md="2">
          Alamat
        </b-col>
        <b-col
          md="4"
          cols="9"
        >
          <div v-if="address !== null">
            <p class="mb-[8px]">
              {{ address.address_name }}
            </p>
            <p class="mb-0 text-[#828282]">
              {{ address.address_detail }}
            </p>
          </div>
          <div v-else>
            <p class="text-[16px] text-muted font-normal">
              Pickup dari salah satu gudangmu
            </p>
          </div>
        </b-col>
        <b-col
          md="2"
          cols="3"
          class="pl-0 border-left border-[#C2C2C2]"
        >
          <b-button
            variant="none"
            class="text-primary"
            @click="showAddressList"
          >
            Pilih
          </b-button>
        </b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col md="2">
          Tanggal
        </b-col>
        <b-col md="3">
          <b-input-group class="rounded max-w-[220px]">
            <flat-pickr
              ref="pickupDate"
              v-model="pickupDate"
              :config="configDate"
              @input="setPickupTime"
            />
            <b-input-group-append
              role="button"
              is-text
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
        <b-col md="2">
          Waktu Jemput
        </b-col>
        <b-col
          md="3"
          class="d-flex"
        >
          <b-form-input
            v-model="pickupTime"
            class="bg-white max-w-[90px] text-center"
            readonly
          />
          <div class="ml-1 max-h-[40px]">
            <b-icon-chevron-up
              role="button"
              @click="setPickupTime('plus')"
            /><br>
            <b-icon-chevron-down
              role="button"
              @click="setPickupTime('minus')"
            />
          </div>
          <b-img
            id="infoPickupTime"
            src="@/assets/images/icons/info-circle.svg"
            class="ml-1 my-auto"
            role="button"
          />
          <b-popover
            target="infoPickupTime"
            triggers="hover"
            custom-class="bg-primary"
          >
            <ul class="text-white text-sm mb-0 list-disc ml-[14px]">
              <li>Jam operasional pickup dari 9 pagi s.d 9 malam</li>
              <li>Pilih jam pickup >1 jam dari waktu saat ini</li>
            </ul>
          </b-popover>
        </b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col md="2">
          Kendaraan
        </b-col>
        <b-col md="5">
          <b-button
            :variant="vehicle === 'MOTOR' ? 'outline-primary active' : 'outline-light'"
            class="rounded-lg border border-[#828282] mr-1 mb-1"
            :disabled="!vehicleList.includes('MOTOR')"
            @click="vehicle = 'MOTOR'"
          >
            <img src="@/assets/images/icons/motor.png"><br>
            <span class="text-dark">Motor</span>
          </b-button>
          <b-button
            :variant="vehicle === 'MOBIL' ? 'outline-primary active' : 'outline-light'"
            class="rounded-lg border border-[#828282] mr-1 px-1 mb-1"
            :disabled="!vehicleList.includes('MOBIL')"
            @click="vehicle = 'MOBIL'"
          >
            <img src="@/assets/images/icons/mobil.png"><br>
            <span class="text-dark">Mobil</span>
          </b-button>
          <b-button
            :variant="vehicle === 'TRUCK' ? 'outline-primary active' : 'outline-light'"
            class="rounded-lg border border-[#828282] mr-1 px-2 mb-1"
            :disabled="!vehicleList.includes('TRUCK')"
            @click="vehicle = 'TRUCK'"
          >
            <img src="@/assets/images/icons/truk.png"><br>
            <span class="text-dark">Truk</span>
          </b-button>
        </b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col md="2">
          Orderan
        </b-col>
        <b-col md="3">
          <b-button
            variant="primary"
            :disabled="!address"
            @click="getOrderList"
          >
            Pilih Orderan
          </b-button>
        </b-col>
      </b-row>
      <b-table
        bordered
        hover
        table-variant="light"
        :fields="fieldProductPreview"
        :items="itemProductPreview"
      >
        <template #cell(product_name)="data">
          <div class="d-flex">
            <div v-if="data.item.product_image === null">
              <img
                class="images__product__orderan"
                :src="imageNull"
              >
            </div>
            <div v-else>
              <img
                class="images__product__orderan"
                :src="data.item.product_image"
                @error="setImageDefault"
              >
            </div>
            <div class="ml-1 min-w-[70%]">
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
      <hr class="border border-[#C2C2C2]">
      <b-row class="mt-2">
        <b-col
          md="6"
          class="my-auto"
        >
          <p
            v-if="itemProductPreview.length < 1"
            class="text-[18px] text-[#828282]"
          >Pilih orderan  yang akan di pickup</p>
          <b-button
            v-else
            variant="none"
            class="button-detail p-0"
            @click="openOrderDetailPickup"
          >
            Lihat Detail...
          </b-button>
        </b-col>
        <b-col
          md="6"
          class="d-flex justify-content-end"
        >
          <span
            v-if="totalProduct > 0"
            class="text-[16px] font-bold"
          >Total Produk : {{ totalProduct }}</span>
        </b-col>
      </b-row>
      <b-alert
        show
        variant="primary"
        class="p-1 mt-2 border border-[#E31A1A] text-[16px] max-w-[625px]"
      >
        *Pastikan produk yang kamu masukan sudah tepat sebelum di ajukan
      </b-alert>
      <b-row class="mt-2 justify-content-end">
        <b-button
          variant="outline-primary"
          @click="resetField"
        >
          Batal
        </b-button>
        <b-button
          variant="primary"
          class="ml-1"
          :disabled="order.length < 1 || vehicle === '' || address.length < 1"
          @click="onSubmitPickup"
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
      <b-img
        src="@/assets/images/icons/close-circle.svg"
        class="ml-auto"
        role="button"
        @click="$bvModal.hide('modalSelectAddress')"
      />
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
          <span class="font-bold text-[16px]">
            {{ addressItems.address_name }}
          </span><br>
          <span class="text-primary">
            {{ addressItems.orders }}
          </span>
          <span>Orderan belum dipickup</span>
          <span
            v-if="addressItems.is_default === 1"
            class="absolute top-0 right-0"
          >[Utama]</span>
        </b-form-radio>
      </div>
    </b-modal>
    <b-modal
      id="modalSelectOrder"
      size="xl"
      centered
      hide-header
      @hide="removeSelectedOrder"
    >
      <b-img
        src="@/assets/images/icons/close-circle.svg"
        class="absolute right-[1rem] top-[1rem]"
        role="button"
        @click="$bvModal.hide('modalSelectOrder')"
      />
      <p class="text-center font-bold text-[24px] my-3">
        Pilih Orderan
      </p>
      <b-table
        ref="tableOrderList"
        hover
        striped
        sticky-header
        show-empty
        empty-text="Tidak ada data untuk ditampilkan."
        :busy="loading"
        :fields="fieldOrderList"
        :items="itemOrderList"
        @scroll.native="getNextOrderList"
      >
        <template #head(action)>
          <b-form-checkbox
            v-model="selectAllOrder"
            @input="checklistSelectedOrder"
          />
        </template>
        <template #cell(action)="data">
          <b-form-checkbox
            v-model="selectedOrder"
            :value="data.item"
          />
        </template>
        <template #cell(order_date)="data">
          <span class="font-bold">{{ data.item.order_date.slice(0, 10) }}</span><br>
          <span>{{ data.item.order_date.slice(11, -3) }}</span>
        </template>
        <template #cell(customer_name)="data">
          <span class="font-bold">{{ data.item.customer_name }}</span><br>
          <div
            class="d-flex"
          >
            <img
              :src="data.item.shipment_image_path"
              class="images__product__orderan"
            ><span class="my-auto">{{ getShippingLabel(data.item.shipping_type) }}</span>
          </div>
        </template>
        <template #cell(product)="data">
          <div v-if="data.item.product[0]">
            <div class="d-flex mt-1">
              <div v-if="data.item.product[0].product_image === null">
                <img
                  class="images__product__orderan"
                  :src="imageNull"
                >
              </div>
              <div v-else>
                <img
                  class="images__product__orderan"
                  :src="data.item.product[0].product_image"
                  @error="setImageDefault"
                >
              </div>
              <div
                class="ml-1 w-[70%]"
              >
                <span class="font-bold d-flex">
                  {{ data.item.product[0].product_name }}
                  <img
                    v-if="data.item.order_notes !== '0' && data.item.order_notes !== '' && data.item.order_notes !== null"
                    :id="`infoNote` + data.item.order_id"
                    src="@/assets/images/icons/info-order-notes.svg"
                    class="ml-auto cursor-pointer"
                    style="max-width:20px"
                  >
                  <b-popover
                    v-if="data.item.order_notes !== '0' && data.item.order_notes !== '' && data.item.order_notes !== null"
                    triggers="hover"
                    :target="`infoNote` + data.item.order_id"
                    placement="bottomright"
                  >
                    {{ data.item.order_notes }}
                  </b-popover>
                </span>
                <span
                  v-if="data.item.product[0].variant_name !== '0'"
                  class="text-primary"
                >{{ data.item.product[0].variant_name }}</span>
              </div>
              <div
                class="ml-1 font-bold w-[10%]"
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
                      class="images__product__orderan"
                      :src="imageNull"
                    >
                  </div>
                  <div v-else>
                    <img
                      class="images__product__orderan"
                      :src="item.product_image"
                      @error="setImageDefault"
                    >
                  </div>
                  <div class="ml-1 w-[70%]">
                    <span class="font-bold">{{ item.product_name }}</span><br>
                    <span class="text-primary">{{ item.variant_name }}</span>
                  </div>
                  <div class="ml-1 font-bold w-[10%]">
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
              v-if="data.item.bank !== '0'"
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
      <template #modal-footer>
        <div class="w-100">
          <b-button
            variant="primary"
            class="float-right"
            :disabled="selectedOrder.length < 1"
            @click="submitSelectedOrder"
          >
            Simpan <span v-if="selectedOrder.length > 0">({{ selectedOrder.length }})</span>
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
      id="modalSubmitPickup"
      centered
      hide-header
      hide-footer
      :no-close-on-backdrop="submitStatus"
    >
      <lottie-animation
        path="animation/pickup-request.json"
        style="margin-top:-100px"
      />
      <div
        v-if="submitStatus"
        class="mt-[-110px] mb-2"
      >
        <div class="mb-1">
          <p class="text-[24px] text-center font-semibold">
            Tunggu beberapa saat
          </p>
          <p class="text-[14px] text-center font-semibold">
            Pengajuan pickup sedang diproses
          </p>
        </div>
        <p class="text-[12px] mb-0 text-right text-success">
          Memproses ajukan pickup
        </p>
        <div class="d-flex mt-[6px]">
          <div class="w-[10%]">
            <img
              src="@/assets/images/icons/export.svg"
              class="my-auto mr-1"
            >
          </div>
          <div class="my-auto w-[90%]">
            <b-progress
              height="20px"
              variant="success"
              style="background-color:#F4F4F4"
              :value="submitPercentage"
            />
          </div>
        </div>
      </div>
      <div
        v-else
        class="mt-[-110px] mb-2"
      >
        <div class="px-2 mb-1">
          <div class="mb-1">
            <p class="text-[24px] text-center font-semibold mb-1">
              Mohon maaf...
            </p>
            <p class="text-[14px] text-center">
              Ajukan Pickup kamu ada kendala saat proses mengunggah, mohon submit ulang, cek kembali <b>koneksi internet</b> atau jika masih gagal harap <b>hubungi CS</b> di live chat.
            </p>
          </div>
          <p class="text-[12px] mb-0 text-right text-danger">
            Ajukan Pickup gagal
          </p>
          <div class="d-flex mt-[6px]">
            <div class="w-[10%]">
              <img
                src="@/assets/images/icons/close-square.svg"
                class="my-auto mr-1"
              >
            </div>
            <div class="my-auto w-[90%]">
              <b-progress
                height="20px"
                variant="danger"
                style="background-color:#F4F4F4"
                :value="submitPercentage"
              />
            </div>
          </div>
        </div>
        <b-button
          v-if="!submitStatus"
          variant="outline-primary"
          size="sm"
          block
          @click="submitPickup"
        >
          <div class="d-flex justify-center my-auto">
            <img
              src="@/assets/images/icons/refresh-2.svg"
              class="my-auto"
            >
            <span class="ml-[6px] text-[16px] my-auto">Submit Ulang</span>
          </div>
        </b-button>
      </div>
    </b-modal>
    <b-modal
      id="modalOrderError"
      hide-header
      hide-footer
      centered
      size="xl"
      @hide="itemOrderError = []"
    >
      <img
        src="@/assets/images/icons/warning.svg"
        class="mx-auto mb-2 mt-3"
      >
      <p class="text-[18px] text-center max-w-[865px] mx-auto mb-3">
        Sebagian orderan telah berhasil diajukan pickup. Silahkan melakukan pickup ulang untuk orderan yang belum berhasil. Jika ada kendala silahkan hubungi CS.
      </p>
      <p class="text-[18px] font-semibold mb-1">
        Orderan yang gagal diajukan pickup :
      </p>
      <b-table
        hover
        striped
        show-empty
        empty-text="Tidak ada data untuk ditampilkan."
        :busy="loading"
        :fields="fieldOrderError"
        :items="itemOrderError"
        responsive
        style="max-height:350px"
      >
        <template #cell(order_date)="data">
          <span class="font-bold">{{ data.item.order_date.slice(0, 10) }}</span><br>
          <span>{{ data.item.order_date.slice(11, -3) }}</span>
        </template>
        <template #cell(customer_name)="data">
          <span class="font-bold">{{ data.item.customer_name }}</span><br>
          <div
            class="d-flex"
          >
            <img
              :src="data.item.shipment_image_path"
              class="images__product__orderan"
            ><span class="my-auto">{{ getShippingLabel(data.item.shipping_type) }}</span>
          </div>
        </template>
        <template #cell(product)="data">
          <div v-if="data.item.product[0]">
            <div class="d-flex mt-1">
              <div v-if="data.item.product[0].product_image === null">
                <img
                  class="images__product__orderan"
                  :src="imageNull"
                >
              </div>
              <div v-else>
                <img
                  class="images__product__orderan"
                  :src="data.item.product[0].product_image"
                  @error="setImageDefault"
                >
              </div>
              <div
                class="ml-1 w-[70%]"
              >
                <span class="font-bold d-flex">
                  {{ data.item.product[0].product_name }}
                  <img
                    v-if="data.item.order_notes !== '0' && data.item.order_notes !== '' && data.item.order_notes !== null"
                    :id="`infoNote` + data.item.order_id"
                    src="@/assets/images/icons/info-order-notes.svg"
                    class="ml-auto cursor-pointer"
                    style="max-width:20px"
                  >
                  <b-popover
                    v-if="data.item.order_notes !== '0' && data.item.order_notes !== '' && data.item.order_notes !== null"
                    triggers="hover"
                    :target="`infoNote` + data.item.order_id"
                    placement="bottomright"
                  >
                    {{ data.item.order_notes }}
                  </b-popover>
                </span>
                <span
                  v-if="data.item.product[0].variant_name !== '0'"
                  class="text-primary"
                >{{ data.item.product[0].variant_name }}</span>
              </div>
              <div
                class="ml-1 font-bold w-[10%]"
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
                      class="images__product__orderan"
                      :src="imageNull"
                    >
                  </div>
                  <div v-else>
                    <img
                      class="images__product__orderan"
                      :src="item.product_image"
                      @error="setImageDefault"
                    >
                  </div>
                  <div class="ml-1 w-[70%]">
                    <span class="font-bold">{{ item.product_name }}</span><br>
                    <span class="text-primary">{{ item.variant_name }}</span>
                  </div>
                  <div class="ml-1 font-bold w-[10%]">
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
              v-if="data.item.bank !== '0'"
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
      <div class="w-100 text-center my-1">
        <b-button
          variant="primary"
          @click="$bvModal.hide('modalOrderError')"
        >
          Oke
        </b-button>
      </div>
    </b-modal>
    <div
      v-if="loading"
      class="loading-order-list"
    >
      <lottie-animation
        path="animation/loading-data-order.json"
        :width="300"
        :height="300"
      />
    </div>
  </b-card>
</template>
<script src="./PickupRequest.js" />
<style lang="scss" src="./PickupRequest.scss" />
