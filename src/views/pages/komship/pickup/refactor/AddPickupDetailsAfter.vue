<template>
  <b-card>
    <b-row class="justify-content-end">
      <h4 class="mr-3">
        <strong>
          Detail orderan pickup
        </strong>
      </h4>
    </b-row>
    <b-row class="justify-content-end mr-3 mt-2 mb-5">
      <b-button
        :variant="disableButtonPrint === true ? 'dark' : 'primary'"
        :disabled="disableButtonPrint"
        :style="disableButtonPrint === true ? 'cursor: no-drop' : ''"
        @click="onShowModalPrint"
      >
        {{ totalLabel === 0 ? 'Print Label' : `Print Label (${totalLabel})` }}
      </b-button>
    </b-row>

    <b-overlay
      variant="light"
      :show="loading"
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
              class="ml-1"
            />
            <span class="text-black ml-50">
              <strong>
                {{ data.item.shipping_type }}
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
                        Tidak ada variasi
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
                          Tidak ada variasi
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
                        Tidak ada variasi
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

    <pickup-label-print
      ref="printLabelContent"
      :print-option="printOption"
      :profile="{profile}"
      :list-order="selectedOrder"
      @onAfterPrintLabel="handleAfterPrintLabel"
    />

    <vue-html2pdf
      ref="html2Pdf"
      :enable-download="computedDownloadPdf"
      :show-layout="false"
      :float-layout="true"
      :preview-modal="computePreviewModalPdf"
      :paginate-elements-by-height="1400"
      :filename="labelformobile"
      :pdf-quality="2"
      :manual-pagination="false"
      pdf-format="a4"
      pdf-orientation="portrait"

      pdf-content-width="100%"
      @progress="onProgress($event)"
      @startPagination="startPagination()"
      @hasPaginated="hasPaginated()"
      @hasStartedGeneration="hasStartedGeneration()"
      @beforeDownload="beforeDownload($event)"
      @hasDownloaded="hasDownloaded($event)"
    >
      <section
        slot="pdf-content"
      >
        <div v-if="valuesOption === 1">
          <div
            v-for="(itemsPrint, index) in fieldItemsPrint"
            :key="index+1"
          >
            <div
              class="container pt-1"
            >
              <div
                class="border-4 border-black px-50 mb-50"
              >

                <b-row>
                  <b-col
                    class="align-self-center text-center"
                  >
                    <h4 class="text-black mt-50">
                      <strong>
                        ORDER ID
                      </strong>
                    </h4>
                    <p class="text-black">
                      <strong>
                        {{ itemsPrint.order_no }}
                      </strong>
                    </p>
                  </b-col>
                  <b-col
                    class="d-flex align-items-center justify-content-center"
                  >
                    <b-img
                      v-if="itemsPrint.shipping === 'JNE'"
                      src="@/assets/images/expedisi/logo-jne.png"
                      alt="ekspedisi"
                      style="max-width: 50%;"
                    />
                    <b-img
                      v-if="itemsPrint.shipping === 'SICEPAT'"
                      src="@/@core/assets/image/icons/logo__sicepat.svg"
                      alt="ekspedisi"
                      style="max-width: 50%;"
                    />
                    <b-img
                      v-if="itemsPrint.shipping === 'IDEXPRESS'"
                      src="@/@core/assets/image/icons/logo-idexpress.svg"
                      alt="ekspedisi"
                      style="max-width: 50%;"
                    />
                  </b-col>
                  <b-col
                    class="d-flex justify-content-center align-items-center"
                  >
                    <b-img
                      src="@/assets/images/logo.png"
                      alt=""
                      class="mt-2"
                      style="max-width: 60%;"
                    />
                  </b-col>
                </b-row>

                <b-row class="mx-50">
                  <b-col class="border-4 border-black mr-50">
                    <h4 class="text-center text-black">
                      <strong>
                        PENGIRIM
                      </strong>
                    </h4>
                    <b-list-group>
                      <b-list-group-item class="d-flex border-0 align-items-center px-0 pt-0 pb-50">
                        <span class="mr-1 text-black">
                          <feather-icon
                            icon="UserIcon"
                            size="16"
                          />
                        </span>
                        <span class="text-black">{{ profile.partner_business_name }}</span>
                      </b-list-group-item>

                      <b-list-group-item class="d-flex border-0 align-items-center px-0 pt-0 pb-50">
                        <span class="mr-1 text-black">
                          <feather-icon
                            icon="PhoneIcon"
                            size="17"
                          />
                        </span>
                        <span class="text-black">{{ profile.partner_no_hp_business }}</span>
                      </b-list-group-item>

                      <b-list-group-item class="d-flex border-0 align-items-center px-0 pt-0 pb-50">
                        <span class="mr-1 text-black">
                          <feather-icon
                            icon="MapPinIcon"
                            size="16"
                          />
                        </span>
                        <span class="text-black">{{ getValueDistrict(idOrderFromHistory.district) }}</span>
                      </b-list-group-item>
                    </b-list-group>
                  </b-col>
                  <b-col class="border-4 border-black">
                    <h4 class="text-center text-black">
                      <strong>
                        PENERIMA
                      </strong>
                    </h4>
                    <b-list-group>
                      <b-list-group-item class="d-flex border-0 align-items-center px-0 pt-0 pb-50">
                        <span class="mr-1 text-black">
                          <feather-icon
                            icon="UserIcon"
                            size="16"
                          />
                        </span>
                        <span class="text-black">{{ itemsPrint.customer_name }}</span>
                      </b-list-group-item>

                      <b-list-group-item class="d-flex border-0 align-items-center px-0 pt-0 pb-50">
                        <span class="mr-1 text-black">
                          <feather-icon
                            icon="PhoneIcon"
                            size="17"
                          />
                        </span>
                        <span class="text-black">{{ getCustomerPhone(itemsPrint.customer_phone) }}</span>
                      </b-list-group-item>

                      <b-list-group-item class="d-flex border-0 align-items-center px-0 pt-0 pb-50">
                        <span class="mr-1 text-black">
                          <feather-icon
                            icon="MapPinIcon"
                            size="16"
                          />
                        </span>
                        <span class="text-black">{{ `${itemsPrint.detail_address}, ${itemsPrint.customer_detail_address}` }}</span>
                      </b-list-group-item>
                    </b-list-group>
                  </b-col>
                </b-row>

                <b-row class="mt-50 mx-50">
                  <b-col
                    cols="4"
                    class="d-flex justify-content-center align-items-center border-4 border-black"
                  >
                    <b-row>
                      <b-col
                        cols="12"
                        class="text-center"
                      >
                        <h4 class="text-black">
                          <strong>
                            {{ itemsPrint.payment_method === 'COD' ? 'COD' : 'Non-COD' }}
                          </strong>
                        </h4>
                      </b-col>
                      <b-col
                        v-if="itemsPrint.payment_method === 'COD'"
                        cols="12"
                        class="text-center"
                      >
                        <h5 class="text-black">
                          <strong>
                            Rp. {{ formatPrice(itemsPrint.grand_total) }}
                          </strong>
                        </h5>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col
                    cols="8"
                    class="border-4 border-black border-l-0"
                  >
                    <b-row class="d-flex justify-content-center">
                      <h4 class="text-black">
                        <strong>
                          Nomor Resi
                        </strong>
                      </h4>
                    </b-row>
                    <b-row class="d-flex mt-1 justify-content-center">
                      <barcode
                        :value="itemsPrint.airway_bill"
                        height="60"
                        width="3"
                      >
                        Show this if the rendering fails.
                      </barcode>
                    </b-row>
                  </b-col>
                </b-row>

                <b-row class="px-2 mt-50">
                  <b-col
                    cols="12"
                    class="border-4 border-black pb-1 text-center"
                  >
                    <span class="text-black">
                      <strong>
                        Jenis layanan: {{ getService(itemsPrint.shipping_type) }}
                      </strong>
                    </span>
                  </b-col>
                </b-row>

                <b-row class="mt-50 px-2">
                  <b-col
                    cols="4"
                    class="border-4 border-black pb-1"
                  >
                    <span class="text-black">
                      <strong>
                        Asuransi : Tidak Ada
                      </strong>
                    </span>
                  </b-col>
                  <b-col
                    cols="8"
                    class="border-4 border-black pb-1"
                  >
                    <span
                      v-if="itemsPrint.product[1] === undefined"
                      class="text-black"
                    >
                      <strong>
                        Berat : <span>
                          {{ (itemsPrint.product[0].weight/1000).toFixed(2) }} Kg
                        </span>
                      </strong>
                    </span>
                    <span
                      v-if="itemsPrint.product[1] !== undefined"
                      class="text-black"
                    >
                      <strong>
                        Berat : <span>
                          {{ (itemsPrint.product.reduce((x,y) => x+y.weight,0)/1000).toFixed(2) }} Kg
                        </span>
                      </strong>
                    </span>
                  </b-col>
                </b-row>

                <b-row class="mt-50 mx-50 pb-50">
                  <b-col
                    cols="4"
                    class="border-4 border-black pb-1"
                  >
                    <span class="text-black">
                      <strong>
                        Kuantitas:
                      </strong>
                      {{ sumAll(itemsPrint.product) }}
                    </span>
                  </b-col>
                  <b-col
                    cols="8"
                    class="border-4 border-black d-flex pb-1 align-items-start border-l-0"
                  >
                    <span class="text-black">
                      <strong>
                        ISI PAKET:
                      </strong>
                    </span>
                    <div>
                      <b-list-group
                        v-for="(dataProduct, indexProduct) in itemsPrint.product"
                        :key="indexProduct+1"
                        class="ml-1"
                      >
                        <b-list-group-item class="d-flex border-0 align-items-center pt-0 pb-50">
                          <div
                            v-if="dataProduct.variant_name !== '0' && dataProduct.variant_name !== ''"
                            class="d-flex align-items-start"
                          >
                            <span
                              class="text-black"
                            >
                              <strong>
                                {{ dataProduct.qty }} {{ dataProduct.product_name }} {{ dataProduct.variant_name }},
                              </strong>
                            </span>
                          </div>
                          <div v-else>
                            <span
                              class="ml-1 text-black mr-50"
                            >
                              <strong>
                                {{ dataProduct.qty }}
                              </strong>
                            </span>
                            <span
                              class="text-black"
                            >
                              <strong>
                                {{ `${ dataProduct.product_name } ${ dataProduct.variant_name }` }},
                              </strong>
                            </span>
                          </div>
                        </b-list-group-item>
                      </b-list-group>
                    </div>
                  </b-col>
                </b-row>

                <b-row class="px-2 mt-50 pb-50">
                  <b-col
                    cols="12"
                    class="border-4 border-black pb-1"
                  >
                    <span class="text-black">
                      <strong>
                        Catatan: Mohon hubungi nomor pembeli untuk konfirmasi pengiriman
                      </strong>
                    </span>
                  </b-col>
                </b-row>

              </div>
              <div class="html2pdf__page-break" />
            </div>
          </div>
        </div>

        <div v-if="valuesOption === 2">
          <div
            v-for="(itemsPrint, index) in fieldItemsPrint"
            :key="index+1"
            class="p-50"
          >
            <div
              class="border-4 border-black mt-1"
              style="width: 100%; height:35rem;"
            >

              <b-row>
                <b-col
                  cols="4"
                  class="text-center"
                >
                  <span
                    class="text-black"
                    style="font-size: 9px; margin-top: -10px;"
                  >
                    <strong>
                      Order ID
                    </strong>
                  </span>
                  <p
                    class="text-black mt-0"
                    style="font-size: 9px; line-height: 1px;"
                  >
                    <strong>
                      {{ itemsPrint.order_no }}
                    </strong>
                  </p>
                </b-col>
                <b-col
                  cols="4"
                  class="d-flex justify-content-center"
                >
                  <b-img
                    v-if="itemsPrint.shipping === 'JNE'"
                    src="@/assets/images/expedisi/logo-jne.png"
                    alt="ekspedisi"
                    style="margin:auto;"
                    class="mt-50"
                    width="50"
                  />
                  <b-img
                    v-if="itemsPrint.shipping === 'SICEPAT'"
                    src="@/@core/assets/image/icons/logo__sicepat.svg"
                    alt="ekspedisi"
                    style="margin:auto;"
                    class="mt-50"
                    width="70"
                  />
                  <b-img
                    v-if="itemsPrint.shipping === 'IDEXPRESS'"
                    src="@/@core/assets/image/icons/logo-idexpress.svg"
                    alt="ekspedisi"
                    style="margin:auto;"
                    class="mt-50"
                    width="50"
                  />
                </b-col>
                <b-col
                  cols="4"
                  class="d-flex"
                >
                  <b-img
                    src="@/assets/images/logo/komship-bw.png"
                    alt="komship"
                    style="margin:auto;"
                    class="mt-1 mr-50"
                    width="60"
                  />
                </b-col>
              </b-row>

              <b-row class="mx-50 mb-50">
                <b-col
                  cols="6"
                  class="p-0"
                >
                  <div
                    class="border-4 border-black"
                    style="width: 100%; height: 150px;"
                  >
                    <b-row class="justify-content-center">
                      <span
                        class="text-black"
                        style="font-size: 10px;"
                      >
                        <strong>
                          Pengirim
                        </strong>
                      </span>
                    </b-row>
                    <b-row class="ml-50">
                      <ul>
                        <li
                          class="text-black d-flex align-items-center"
                          style="line-height: 9px; margin-bottom: 1px;"
                        >
                          <span>
                            <feather-icon icon="UserIcon" />
                          </span>
                          <span
                            style="font-size: 9px;"
                            class="ml-50"
                          >
                            <strong>
                              {{ profile.partner_business_name }}
                            </strong>
                          </span>
                        </li>
                        <li
                          class="text-black d-flex align-items-center"
                          style="line-height: 8px; margin-bottom: 1px;"
                        >
                          <span>
                            <feather-icon icon="PhoneIcon" />
                          </span>
                          <span
                            style="font-size: 9px;"
                            class="ml-50"
                          >
                            <strong>
                              {{ profile.partner_no_hp_business }}
                            </strong>
                          </span>
                        </li>
                        <li
                          class="text-black d-flex"
                          style="line-height: 9px;"
                        >
                          <span>
                            <feather-icon icon="MapPinIcon" />
                          </span>
                          <span
                            style="font-size: 9px;"
                            class="ml-50"
                          >
                            <strong>
                              {{ getValueDistrict(idOrderFromHistory.district) }}
                            </strong>
                          </span>
                        </li>
                      </ul>
                    </b-row>
                  </div>
                </b-col>
                <b-col
                  cols="6"
                  class="p-0 pr-50"
                >
                  <div
                    class="border-4 border-black ml-50"
                    style="width: 100%; height: 150px;"
                  >
                    <b-row class="justify-content-center">
                      <span
                        class="text-black"
                        style="font-size: 10px;"
                      >
                        <strong>
                          Penerima
                        </strong>
                      </span>
                    </b-row>
                    <b-row class="ml-50">
                      <ul>
                        <li
                          class="text-black d-flex align-items-center"
                          style="line-height: 8px; margin-bottom: 1px;"
                        >
                          <span>
                            <feather-icon icon="UserIcon" />
                          </span>
                          <span
                            style="font-size: 9px;"
                            class="ml-50"
                          >
                            <strong>
                              {{ itemsPrint.customer_name }}
                            </strong>
                          </span>
                        </li>
                        <li
                          class="text-black d-flex align-items-center"
                          style="line-height: 8px; margin-bottom: 1px;"
                        >
                          <span>
                            <feather-icon icon="PhoneIcon" />
                          </span>
                          <span
                            style="font-size: 9px;"
                            class="ml-50"
                          >
                            <strong>
                              {{ getCustomerPhone(itemsPrint.customer_phone) }}
                            </strong>
                          </span>
                        </li>
                        <li
                          class="text-black d-flex align-items-center pr-1 pb-5"
                          style="line-height: 9px;"
                        >
                          <span>
                            <feather-icon icon="MapPinIcon" />
                          </span>
                          <span
                            style="font-size: 9px;"
                            class="ml-50"
                          >
                            <strong>
                              {{ `${itemsPrint.detail_address}, ${itemsPrint.customer_detail_address}` }}
                            </strong>
                          </span>
                        </li>
                      </ul>
                    </b-row>
                  </div>
                </b-col>
              </b-row>

              <b-row class="border-4 border-black mx-50 mb-50">
                <b-col
                  cols="4"
                  style="border-right: 1px solid black"
                >
                  <b-row
                    class="justify-content-center text-center align-items-center"
                  >
                    <h5
                      class="text-black text-center"
                      style="font-size: 14px; margin-top: 10px;"
                    >
                      <strong>
                        {{ itemsPrint.payment_method === 'COD' ? 'COD' : 'Non-COD' }}
                        <br>
                        {{ itemsPrint.payment_method !== 'COD' ? '' : `Rp. ${ formatPrice(itemsPrint.grand_total) }` }}
                      </strong>
                    </h5>
                  </b-row>
                </b-col>
                <b-col
                  cols="8"
                  class="d-flex justify-content-center align-items-center"
                >
                  <barcode
                    :value="itemsPrint.airway_bill"
                    height="35"
                    font-size="8"
                    font-options="bold"
                    width="3"
                  >
                    Show this if the rendering fails.
                  </barcode>
                </b-col>
              </b-row>

              <b-row
                class="border-4 border-black justify-content-center mx-50 mb-50"
                style="height: 20px;"
              >
                <span
                  class="text-black"
                  style="font-size: 9px; line-height: 5px;"
                >
                  <strong>
                    Jenis Layanan: {{ getService(itemsPrint.shipping_type) }}
                  </strong>
                </span>
              </b-row>

              <b-row class="mx-50 mb-50">
                <b-col
                  cols="4"
                >
                  <b-row
                    class="border-4 border-black"
                    style="border-right: 0px!important; height: 20px;"
                  >
                    <span
                      class="text-black ml-50"
                      style="font-size: 9px; line-height: 5px;"
                    >
                      <strong>
                        Asuransi: tidak ada
                      </strong>
                    </span>
                  </b-row>
                </b-col>
                <b-col
                  cols="8"
                >
                  <b-row
                    class="border-4 border-black"
                    style="height: 20px;"
                  >
                    <span
                      class="text-black ml-50"
                      style="font-size: 9px; line-height: 5px;"
                    >
                      <strong>
                        Berat: {{ itemsPrint.product[1] === undefined ? (itemsPrint.product[0].weight/1000).toFixed(2) : (itemsPrint.product.reduce((x,y) => x+y.weight,0)/1000).toFixed(2) }} Kg
                      </strong>
                    </span>
                  </b-row>
                </b-col>
              </b-row>

              <b-row class="mx-50 mb-50">
                <b-col
                  cols="4"
                >
                  <b-row
                    class="border-4 border-black"
                    style="border-right: 0px!important; height: 100px;"
                  >
                    <span
                      class="text-black ml-50"
                      style="font-size: 9px; line-height: 5px;"
                    >
                      <strong>
                        Kuantitas: {{ sumAll(itemsPrint.product) }}
                      </strong>
                    </span>
                  </b-row>
                </b-col>
                <b-col
                  cols="8"
                >
                  <b-row
                    class="border-4 border-black"
                    style="height: 100px;"
                  >
                    <ul>
                      <li class="d-flex">
                        <span
                          class="text-black mx-50"
                          style="font-size: 9px; line-height: 10px;"
                        >
                          <strong>
                            Isi paket:
                          </strong>
                        </span>
                        <span
                          v-for="(dataProduct, indexProduct) in itemsPrint.product"
                          :key="indexProduct+1"
                          class="text-black"
                          style="font-size: 9px; line-height: 9px;"
                        >
                          <strong
                            v-if="dataProduct.variant_name !== '0' && dataProduct.variant_name !== ''"
                          >
                            {{ dataProduct.qty }} {{ dataProduct.product_name }} {{ dataProduct.variant_name }},
                          </strong>
                          <strong v-else>
                            {{ dataProduct.qty }} {{ `${ dataProduct.product_name } ${ dataProduct.variant_name }` }},
                          </strong>
                        </span>
                      </li>
                    </ul>
                  </b-row>
                </b-col>
              </b-row>

              <b-row
                :class="itemsPrint.shipping === 'IDEXPRESS' ? 'border-4 border-black mx-50 mb-50' : 'border-4 border-black mx-50' "
                style="height: 20px;"
              >
                <span
                  class="text-black ml-50"
                  style="font-size: 9px; line-height: 5px;"
                >
                  <strong>
                    Catatan: Mohon hubungi nomor pembeli untuk konfirmasi pengiriman
                  </strong>
                </span>
              </b-row>
            </div>
            <div
              v-if="index % 2 !== 0"
              class="html2pdf__page-break"
            />
          </div>
        </div>

        <div v-if="valuesOption === 4">
          <div
            class="grid grid-cols-2 pb-50"
          >
            <section
              v-for="(itemsPrint, index) in fieldItemsPrint"
              :key="index+1"
              slot="pdf-content"
              class="px-50 pt-50 pt-0"
            >
              <div
                class="border-4 border-black mt-1"
                style="height:35rem;"
              >

                <b-row>
                  <b-col
                    cols="4"
                    class="text-center"
                  >
                    <span
                      class="text-black"
                      style="font-size: 8px; margin-top: -10px;"
                    >
                      <strong>
                        Order ID
                      </strong>
                    </span>
                    <p
                      class="text-black mt-0"
                      style="font-size: 8px; line-height: 1px;"
                    >
                      <strong>
                        {{ itemsPrint.order_no }}
                      </strong>
                    </p>
                  </b-col>
                  <b-col
                    cols="4"
                    class="d-flex justify-content-center"
                  >
                    <b-img
                      v-if="itemsPrint.shipping === 'JNE'"
                      src="@/assets/images/expedisi/logo-jne.png"
                      alt="ekspedisi"
                      style="margin:auto;"
                      class="mt-50"
                      width="50"
                    />
                    <b-img
                      v-if="itemsPrint.shipping === 'SICEPAT'"
                      src="@/@core/assets/image/icons/logo__sicepat.svg"
                      alt="ekspedisi"
                      style="margin:auto;"
                      class="mt-50"
                      width="70"
                    />
                    <b-img
                      v-if="itemsPrint.shipping === 'IDEXPRESS'"
                      src="@/@core/assets/image/icons/logo-idexpress.svg"
                      alt="ekspedisi"
                      style="margin:auto;"
                      class="mt-50"
                      width="50"
                    />
                  </b-col>
                  <b-col
                    cols="4"
                    class="d-flex"
                  >
                    <b-img
                      src="@/assets/images/logo/komship-bw.png"
                      alt="komship"
                      style="margin:auto;"
                      class="mt-1 mr-50"
                      width="60"
                    />
                  </b-col>
                </b-row>

                <b-row class="mx-50 mb-50">
                  <b-col
                    cols="6"
                    class="p-0"
                  >
                    <div
                      class="border-4 border-black"
                      style="width: 100%; height: 150px;"
                    >
                      <b-row class="justify-content-center">
                        <span
                          class="text-black"
                          style="font-size: 9px;"
                        >
                          <strong>
                            Pengirim
                          </strong>
                        </span>
                      </b-row>
                      <b-row class="ml-50">
                        <ul>
                          <li
                            class="text-black d-flex align-items-center"
                            style="line-height: 8px; margin-bottom: 1px;"
                          >
                            <span>
                              <feather-icon icon="UserIcon" />
                            </span>
                            <span
                              style="font-size: 8px;"
                              class="ml-50"
                            >
                              <strong>
                                {{ profile.partner_business_name }}
                              </strong>
                            </span>
                          </li>
                          <li
                            class="text-black d-flex align-items-center"
                            style="line-height: 8px; margin-bottom: 1px;"
                          >
                            <span>
                              <feather-icon icon="PhoneIcon" />
                            </span>
                            <span
                              style="font-size: 8px;"
                              class="ml-50"
                            >
                              <strong>
                                {{ profile.partner_no_hp_business }}
                              </strong>
                            </span>
                          </li>
                          <li
                            class="text-black d-flex"
                            style="line-height: 9px;"
                          >
                            <span>
                              <feather-icon icon="MapPinIcon" />
                            </span>
                            <span
                              style="font-size: 8px;"
                              class="ml-50"
                            >
                              <strong>
                                {{ getValueDistrict(idOrderFromHistory.district) }}
                              </strong>
                            </span>
                          </li>
                        </ul>
                      </b-row>
                    </div>
                  </b-col>
                  <b-col
                    cols="6"
                    class="p-0 pr-50"
                  >
                    <div
                      class="border-4 border-black ml-50"
                      style="width: 100%; height: 150px;"
                    >
                      <b-row class="justify-content-center">
                        <span
                          class="text-black"
                          style="font-size: 9px;"
                        >
                          <strong>
                            Penerima
                          </strong>
                        </span>
                      </b-row>
                      <b-row class="ml-50">
                        <ul>
                          <li
                            class="text-black d-flex align-items-center"
                            style="line-height: 8px; margin-bottom: 1px;"
                          >
                            <span>
                              <feather-icon icon="UserIcon" />
                            </span>
                            <span
                              style="font-size: 8px;"
                              class="ml-50"
                            >
                              <strong>
                                {{ itemsPrint.customer_name }}
                              </strong>
                            </span>
                          </li>
                          <li
                            class="text-black d-flex align-items-center"
                            style="line-height: 8px; margin-bottom: 1px;"
                          >
                            <span>
                              <feather-icon icon="PhoneIcon" />
                            </span>
                            <span
                              style="font-size: 8px;"
                              class="ml-50"
                            >
                              <strong>
                                {{ getCustomerPhone(itemsPrint.customer_phone) }}
                              </strong>
                            </span>
                          </li>
                          <li
                            class="text-black d-flex align-items-center pr-1 pb-5"
                            style="line-height: 9px;"
                          >
                            <span>
                              <feather-icon icon="MapPinIcon" />
                            </span>
                            <span
                              style="font-size: 8px;"
                              class="ml-50"
                            >
                              <strong>
                                {{ `${itemsPrint.detail_address}, ${itemsPrint.customer_detail_address}` }}
                              </strong>
                            </span>
                          </li>
                        </ul>
                      </b-row>
                    </div>
                  </b-col>
                </b-row>

                <b-row class="border-4 border-black mx-50 mb-50">
                  <b-col
                    cols="4"
                    style="border-right: 1px solid black"
                  >
                    <b-row
                      class="justify-content-center text-center align-items-center"
                    >
                      <h5
                        class="text-black text-center"
                        style="font-size: 14px; margin-top: 10px;"
                      >
                        <strong>
                          {{ itemsPrint.payment_method === 'COD' ? 'COD' : 'Non-COD' }}
                          <br>
                          {{ itemsPrint.payment_method !== 'COD' ? '' : `Rp. ${ formatPrice(itemsPrint.grand_total) }` }}
                        </strong>
                      </h5>
                    </b-row>
                  </b-col>
                  <b-col
                    cols="8"
                    class="d-flex justify-content-center align-items-center"
                  >
                    <barcode
                      :value="itemsPrint.airway_bill"
                      height="25"
                      font-size="8"
                      font-options="bold"
                      width="1"
                    >
                      Show this if the rendering fails.
                    </barcode>
                  </b-col>
                </b-row>

                <b-row
                  class="border-4 border-black justify-content-center mx-50 mb-50"
                  style="height: 20px;"
                >
                  <span
                    class="text-black"
                    style="font-size: 8px; line-height: 5px;"
                  >
                    <strong>
                      Jenis Layanan: {{ getService(itemsPrint.shipping_type) }}
                    </strong>
                  </span>
                </b-row>

                <b-row class="mx-50 mb-50">
                  <b-col
                    cols="4"
                  >
                    <b-row
                      class="border-4 border-black"
                      style="border-right: 0px!important; height: 20px;"
                    >
                      <span
                        class="text-black ml-50"
                        style="font-size: 8px; line-height: 5px;"
                      >
                        <strong>
                          Asuransi: tidak ada
                        </strong>
                      </span>
                    </b-row>
                  </b-col>
                  <b-col
                    cols="8"
                  >
                    <b-row
                      class="border-4 border-black"
                      style="height: 20px;"
                    >
                      <span
                        class="text-black ml-50"
                        style="font-size: 8px; line-height: 5px;"
                      >
                        <strong>
                          Berat: {{ itemsPrint.product[1] === undefined ? (itemsPrint.product[0].weight/1000).toFixed(2) : (itemsPrint.product.reduce((x,y) => x+y.weight,0)/1000).toFixed(2) }} Kg
                        </strong>
                      </span>
                    </b-row>
                  </b-col>
                </b-row>

                <b-row class="mx-50 mb-50">
                  <b-col
                    cols="4"
                  >
                    <b-row
                      class="border-4 border-black"
                      style="border-right: 0px!important; height: 100px;"
                    >
                      <span
                        class="text-black ml-50"
                        style="font-size: 8px; line-height: 5px;"
                      >
                        <strong>
                          Kuantitas: {{ sumAll(itemsPrint.product) }}
                        </strong>
                      </span>
                    </b-row>
                  </b-col>
                  <b-col
                    cols="8"
                  >
                    <b-row
                      class="border-4 border-black"
                      style="height: 100px;"
                    >
                      <ul>
                        <li class="d-flex">
                          <span
                            class="text-black mx-50"
                            style="font-size: 8px; line-height: 10px;"
                          >
                            <strong>
                              Isi paket:
                            </strong>
                          </span>
                          <span
                            v-for="(dataProduct, indexProduct) in itemsPrint.product"
                            :key="indexProduct+1"
                            class="text-black"
                            style="font-size: 8px; line-height: 9px;"
                          >
                            <strong
                              v-if="dataProduct.variant_name !== '0' && dataProduct.variant_name !== ''"
                            >
                              {{ dataProduct.qty }} {{ dataProduct.product_name }} {{ dataProduct.variant_name }},
                            </strong>
                            <strong v-else>
                              {{ dataProduct.qty }} {{ `${ dataProduct.product_name } ${ dataProduct.variant_name }` }},
                            </strong>
                          </span>
                        </li>
                      </ul>
                    </b-row>
                  </b-col>
                </b-row>

                <b-row
                  :class="itemsPrint.shipping === 'IDEXPRESS' ? 'border-4 border-black mx-50 mb-50' : 'border-4 border-black mx-50' "
                  style="height: 20px;"
                >
                  <span
                    class="text-black ml-50"
                    style="font-size: 8px; line-height: 5px;"
                  >
                    <strong>
                      Catatan: Mohon hubungi nomor pembeli untuk konfirmasi pengiriman
                    </strong>
                  </span>
                </b-row>

              </div>
              <div
                v-if="index === 3 || index === 7 || index === 11 || index === 15 || index === 19 || index === 23 || index === 27 || index === 31 || index === 35 || index === 39 || index === 43 || index === 47 || index === 51 || index === 55 || index === 59 || index === 63 || index === 67 || index === 71 || index === 75 || index === 79 || index === 83 || index === 87 || index === 91 || index === 95 || index === 99"
                class="html2pdf__page-break"
              />
            </section>
          </div>
        </div>
      </section>
    </vue-html2pdf>
    <AddPickupPopupPrint
      :selected-option="printOption"
      @onSubmitOption="onSubmitOptionPrint"
      @onSubmitOptionMobile="onSubmitOptionPrintMobile"
      @onChangeOption="handleChangeOption"
    />
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
    <vue-html2pdf
      ref="html2PdfThermalSquare"
      :show-layout="false"
      :float-layout="true"
      :enable-download="computedDownloadPdf"
      :preview-modal="computePreviewModalPdf"
      :filename="labelformobile"
      :pdf-quality="2"
      pdf-format="a6"
      pdf-content-width="100%"
      pdf-orientation="portrait"
      :manual-pagination="false"
      :paginate-elements-by-height="400"
      @hasStartedGeneration="hasStartedGeneration()"
      @hasGenerated="hasGenerated($event)"
    >
      <section
        v-for="(itemsPrint, index) in fieldItemsPrint"
        slot="pdf-content"
        :key="index+1"
        class="px-50 pt-50 pt-0"
      >
        <div
          class="border-4 border-black"
          style="width: 100%; height:25rem;"
        >

          <b-row>
            <b-col
              cols="4"
              class="text-center"
            >
              <span
                class="text-black"
                style="font-size: 8px; margin-top: -10px;"
              >
                <strong>
                  Order ID
                </strong>
              </span>
              <p
                class="text-black mt-0"
                style="font-size: 8px; line-height: 1px;"
              >
                <strong>
                  {{ itemsPrint.order_no }}
                </strong>
              </p>
            </b-col>
            <b-col
              cols="4"
              class="d-flex justify-content-center"
            >
              <b-img
                v-if="itemsPrint.shipping === 'JNE'"
                src="@/assets/images/logo/jne-bw.png"
                alt="ekspedisi"
                style="margin:auto;"
                class="mt-50"
                width="50"
              />
              <b-img
                v-if="itemsPrint.shipping === 'SICEPAT'"
                src="@/@core/assets/image/icons/logo__sicepat.svg"
                alt="ekspedisi"
                style="margin:auto;"
                class="mt-50"
                width="60"
              />
              <b-img
                v-if="itemsPrint.shipping === 'IDEXPRESS'"
                src="@/@core/assets/image/icons/logo-idexpress.svg"
                alt="ekspedisi"
                style="margin:auto;"
                class="mt-50"
                width="45"
              />
            </b-col>
            <b-col
              cols="4"
              class="d-flex"
            >
              <b-img
                src="@/assets/images/logo/komship-bw.png"
                alt="komship"
                style="margin:auto;"
                class="mt-1 mr-50"
                width="60"
              />
            </b-col>
          </b-row>

          <b-row class="mx-50 mb-50">
            <b-col
              cols="6"
              class="p-0"
            >
              <div
                class="border-4 border-black"
                style="width: 100%; height: 100px;"
              >
                <b-row class="justify-content-center">
                  <span
                    class="text-black"
                    style="font-size: 9px;"
                  >
                    <strong>
                      Pengirim
                    </strong>
                  </span>
                </b-row>
                <b-row class="ml-50">
                  <ul>
                    <li
                      class="text-black d-flex align-items-center"
                      style="line-height: 7px; margin-bottom: 1px;"
                    >
                      <span>
                        <feather-icon icon="UserIcon" />
                      </span>
                      <span
                        style="font-size: 7px;"
                        class="ml-50"
                      >
                        <strong>
                          {{ profile.partner_business_name }}
                        </strong>
                      </span>
                    </li>
                    <li
                      class="text-black d-flex align-items-center"
                      style="line-height: 7px; margin-bottom: 1px;"
                    >
                      <span>
                        <feather-icon icon="PhoneIcon" />
                      </span>
                      <span
                        style="font-size: 7px;"
                        class="ml-50"
                      >
                        <strong>
                          {{ profile.partner_no_hp_business }}
                        </strong>
                      </span>
                    </li>
                    <li
                      class="text-black d-flex"
                      style="line-height: 8px;"
                    >
                      <span>
                        <feather-icon icon="MapPinIcon" />
                      </span>
                      <span
                        style="font-size: 7px;"
                        class="ml-50"
                      >
                        <strong>
                          {{ getValueDistrict(idOrderFromHistory.district) }}
                        </strong>
                      </span>
                    </li>
                  </ul>
                </b-row>
              </div>
            </b-col>
            <b-col
              cols="6"
              class="p-0 pr-50"
            >
              <div
                class="border-4 border-black ml-50"
                style="width: 100%; height: 100px;"
              >
                <b-row class="justify-content-center">
                  <span
                    class="text-black"
                    style="font-size: 9px;"
                  >
                    <strong>
                      Penerima
                    </strong>
                  </span>
                </b-row>
                <b-row class="ml-50">
                  <ul>
                    <li
                      class="text-black d-flex align-items-center"
                      style="line-height: 7px; margin-bottom: 1px;"
                    >
                      <span>
                        <feather-icon icon="UserIcon" />
                      </span>
                      <span
                        style="font-size: 7px;"
                        class="ml-50"
                      >
                        <strong>
                          {{ itemsPrint.customer_name }}
                        </strong>
                      </span>
                    </li>
                    <li
                      class="text-black d-flex align-items-center"
                      style="line-height: 7px; margin-bottom: 1px;"
                    >
                      <span>
                        <feather-icon icon="PhoneIcon" />
                      </span>
                      <span
                        style="font-size: 7px;"
                        class="ml-50"
                      >
                        <strong>
                          {{ getCustomerPhone(itemsPrint.customer_phone) }}
                        </strong>
                      </span>
                    </li>
                    <li
                      class="text-black d-flex align-items-center pr-1 pb-5"
                      style="line-height: 8px;"
                    >
                      <span>
                        <feather-icon icon="MapPinIcon" />
                      </span>
                      <span
                        style="font-size: 7px;"
                        class="ml-50"
                      >
                        <strong>
                          {{ `${itemsPrint.detail_address}, ${itemsPrint.customer_detail_address}` }}
                        </strong>
                      </span>
                    </li>
                  </ul>
                </b-row>
              </div>
            </b-col>
          </b-row>

          <b-row class="border-4 border-black mx-50 mb-50">
            <b-col
              cols="12"
            >
              <b-row
                class="justify-content-center text-center align-items-center"
              >
                <h5
                  class="text-black text-center"
                  style="font-size: 9px;"
                >
                  <strong>
                    {{ itemsPrint.payment_method === 'COD' ? 'COD' : 'Non-COD' }}
                    <br>
                    {{ itemsPrint.payment_method !== 'COD' ? '' : `Rp. ${ formatPrice(itemsPrint.grand_total) }` }}
                  </strong>
                </h5>
              </b-row>
            </b-col>
            <b-col
              cols="12"
              class="d-flex justify-content-center align-items-center"
            >
              <barcode
                :value="itemsPrint.airway_bill"
                height="35"
                font-size="10"
                font-options="bold"
                width="2"
              >
                Show this if the rendering fails.
              </barcode>
            </b-col>
          </b-row>

          <b-row
            class="border-4 border-black mx-50 mb-50"
            style="height: 14px;"
          >
            <b-col
              cols="4"
              class="d-flex pl-0"
              style="border-right: 1px solid black;"
            >
              <span
                class="text-black"
                style="font-size: 7px; line-height: 4px; margin-left: 3px;"
              >
                <strong>
                  Jenis Layanan: {{ getService(itemsPrint.shipping_type) }}
                </strong>
              </span>
            </b-col>
            <b-col
              cols="4"
              class="d-flex pl-0"
              style="border-right: 1px solid black;"
            >
              <span
                class="text-black"
                style="font-size: 7px; line-height: 4px; margin-left: 3px;"
              >
                <strong>
                  Asuransi: tidak ada
                </strong>
              </span>
            </b-col>
            <b-col
              cols="4"
              class="d-flex pl-0"
            >
              <span
                class="text-black ml-50"
                style="font-size: 7px; line-height: 4px; margin-left: 2px;"
              >
                <strong>
                  Berat: {{ itemsPrint.product[1] === undefined ? (itemsPrint.product[0].weight/1000).toFixed(2) : (itemsPrint.product.reduce((x,y) => x+y.weight,0)/1000).toFixed(2) }} Kg
                </strong>
              </span>
            </b-col>
          </b-row>

          <b-row
            class="mx-50 mb-50 border-4 border-black"
            style="height: 55px;"
          >
            <b-col
              cols="12"
              class="p-0 d-flex"
            >
              <span
                class="text-black ml-50"
                style="font-size: 7px;"
              >
                <strong>
                  Kuantitas: {{ sumAll(itemsPrint.product) }}
                </strong>
              </span>
            </b-col>
            <b-col
              cols="12"
              class="pl-0"
            >
              <ul class="p-0">
                <li class="d-flex">
                  <span
                    class="text-black ml-50"
                    style="font-size: 7px;"
                  >
                    <strong>
                      Isi
                    </strong>
                  </span>
                  <span
                    class="text-black"
                    style="font-size: 7px; margin-left: 4px;"
                  >
                    <strong>
                      paket:
                    </strong>
                  </span>
                  <span
                    v-for="(dataProduct, indexProduct) in itemsPrint.product"
                    :key="indexProduct+1"
                    class="text-black ml-50"
                    style="font-size: 7px; line-height: 9px; margin-top: 1px;"
                  >
                    <strong
                      v-if="dataProduct.variant_name !== '0' && dataProduct.variant_name !== ''"
                    >
                      {{ dataProduct.qty }} {{ dataProduct.product_name }} {{ dataProduct.variant_name }},
                    </strong>
                    <strong v-else>
                      {{ dataProduct.qty }} {{ `${ dataProduct.product_name } ${ dataProduct.variant_name }` }},
                    </strong>
                  </span>
                </li>
              </ul>
            </b-col>
          </b-row>

          <b-row
            :class="itemsPrint.shipping === 'IDEXPRESS' ? 'border-4 border-black mx-50 mb-50' : 'border-4 border-black mx-50' "
            style="height: 14px;"
          >
            <span
              class="text-black ml-50"
              style="font-size: 7px; line-height: 4px;"
            >
              <strong>
                Catatan: Mohon hubungi nomor pembeli untuk konfirmasi pengiriman
              </strong>
            </span>
          </b-row>

        </div>
        <div class="html2pdf__page-break" />
      </section>
    </vue-html2pdf>
    <vue-html2pdf
      ref="html2PdfThermal"
      :show-layout="false"
      :float-layout="true"
      :enable-download="computedDownloadPdf"
      :preview-modal="computePreviewModalPdf"
      :filename="labelformobile"
      :paginate-elements-by-height="1400"
      :pdf-quality="2"
      pdf-format="a6"
      pdf-content-width="100%"
      pdf-orientation="portrait"
      :manual-pagination="false"
      @hasStartedGeneration="hasStartedGeneration()"
      @hasGenerated="hasGenerated($event)"
    >
      <section
        v-for="(itemsPrint, index) in fieldItemsPrint"
        slot="pdf-content"
        :key="index+1"
        class="px-50 pt-0"
      >
        <div
          class="border-4 border-black mt-1"
          style="width: 100%; height:35rem;"
        >

          <b-row>
            <b-col
              cols="4"
              class="text-center"
            >
              <span
                class="text-black"
                style="font-size: 8px; margin-top: -10px;"
              >
                <strong>
                  Order ID
                </strong>
              </span>
              <p
                class="text-black mt-0"
                style="font-size: 8px; line-height: 1px;"
              >
                <strong>
                  {{ itemsPrint.order_no }}
                </strong>
              </p>
            </b-col>
            <b-col
              cols="4"
              class="d-flex justify-content-center"
            >
              <b-img
                v-if="itemsPrint.shipping === 'JNE'"
                src="@/assets/images/logo/jne-bw.png"
                alt="ekspedisi"
                style="margin:auto;"
                class="mt-50"
                width="50"
              />
              <b-img
                v-if="itemsPrint.shipping === 'SICEPAT'"
                src="@/@core/assets/image/icons/logo__sicepat.svg"
                alt="ekspedisi"
                style="margin:auto;"
                class="mt-50"
                width="70"
              />
              <b-img
                v-if="itemsPrint.shipping === 'IDEXPRESS'"
                src="@/@core/assets/image/icons/logo-idexpress.svg"
                alt="ekspedisi"
                style="margin:auto;"
                class="mt-50"
                width="50"
              />
            </b-col>
            <b-col
              cols="4"
              class="d-flex"
            >
              <b-img
                src="@/assets/images/logo/komship-bw.png"
                alt="komship"
                style="margin:auto;"
                class="mt-1 mr-50"
                width="60"
              />
            </b-col>
          </b-row>

          <b-row class="mx-50 mb-50">
            <b-col
              cols="6"
              class="p-0"
            >
              <div
                class="border-4 border-black"
                style="width: 100%; height: 150px;"
              >
                <b-row class="justify-content-center">
                  <span
                    class="text-black"
                    style="font-size: 9px;"
                  >
                    <strong>
                      Pengirim
                    </strong>
                  </span>
                </b-row>
                <b-row class="ml-50">
                  <ul>
                    <li
                      class="text-black d-flex align-items-center"
                      style="line-height: 8px; margin-bottom: 1px;"
                    >
                      <span>
                        <feather-icon icon="UserIcon" />
                      </span>
                      <span
                        style="font-size: 8px;"
                        class="ml-50"
                      >
                        <strong>
                          {{ profile.partner_business_name }}
                        </strong>
                      </span>
                    </li>
                    <li
                      class="text-black d-flex align-items-center"
                      style="line-height: 8px; margin-bottom: 1px;"
                    >
                      <span>
                        <feather-icon icon="PhoneIcon" />
                      </span>
                      <span
                        style="font-size: 8px;"
                        class="ml-50"
                      >
                        <strong>
                          {{ profile.partner_no_hp_business }}
                        </strong>
                      </span>
                    </li>
                    <li
                      class="text-black d-flex"
                      style="line-height: 9px;"
                    >
                      <span>
                        <feather-icon icon="MapPinIcon" />
                      </span>
                      <span
                        style="font-size: 8px;"
                        class="ml-50"
                      >
                        <strong>
                          {{ getValueDistrict(idOrderFromHistory.district) }}
                        </strong>
                      </span>
                    </li>
                  </ul>
                </b-row>
              </div>
            </b-col>
            <b-col
              cols="6"
              class="p-0 pr-50"
            >
              <div
                class="border-4 border-black ml-50"
                style="width: 100%; height: 150px;"
              >
                <b-row class="justify-content-center">
                  <span
                    class="text-black"
                    style="font-size: 9px;"
                  >
                    <strong>
                      Penerima
                    </strong>
                  </span>
                </b-row>
                <b-row class="ml-50">
                  <ul>
                    <li
                      class="text-black d-flex align-items-center"
                      style="line-height: 8px; margin-bottom: 1px;"
                    >
                      <span>
                        <feather-icon icon="UserIcon" />
                      </span>
                      <span
                        style="font-size: 8px;"
                        class="ml-50"
                      >
                        <strong>
                          {{ itemsPrint.customer_name }}
                        </strong>
                      </span>
                    </li>
                    <li
                      class="text-black d-flex align-items-center"
                      style="line-height: 8px; margin-bottom: 1px;"
                    >
                      <span>
                        <feather-icon icon="PhoneIcon" />
                      </span>
                      <span
                        style="font-size: 8px;"
                        class="ml-50"
                      >
                        <strong>
                          {{ getCustomerPhone(itemsPrint.customer_phone) }}
                        </strong>
                      </span>
                    </li>
                    <li
                      class="text-black d-flex align-items-center pr-1 pb-5"
                      style="line-height: 9px;"
                    >
                      <span>
                        <feather-icon icon="MapPinIcon" />
                      </span>
                      <span
                        style="font-size: 8px;"
                        class="ml-50"
                      >
                        <strong>
                          {{ `${itemsPrint.detail_address}, ${itemsPrint.customer_detail_address}` }}
                        </strong>
                      </span>
                    </li>
                  </ul>
                </b-row>
              </div>
            </b-col>
          </b-row>

          <b-row class="border-4 border-black mx-50 mb-50">
            <b-col
              cols="12"
            >
              <b-row
                class="justify-content-center text-center align-items-center"
              >
                <h5
                  class="text-black text-center"
                  style="font-size: 14px;"
                >
                  <strong>
                    {{ itemsPrint.payment_method === 'COD' ? 'COD' : 'Non-COD' }}
                    <br>
                    {{ itemsPrint.payment_method !== 'COD' ? '' : `Rp. ${ formatPrice(itemsPrint.grand_total) }` }}
                  </strong>
                </h5>
              </b-row>
            </b-col>
            <b-col
              cols="12"
              class="d-flex justify-content-center align-items-center"
            >
              <barcode
                :value="itemsPrint.airway_bill"
                height="35"
                font-size="10"
                font-options="bold"
                width="2"
              >
                Show this if the rendering fails.
              </barcode>
            </b-col>
          </b-row>

          <b-row
            class="border-4 border-black mx-50 mb-50"
            style="height: 20px;"
          >
            <b-col
              cols="4"
              class="d-flex pl-0"
              style="border-right: 1px solid black;"
            >
              <span
                class="text-black"
                style="font-size: 8px; line-height: 5px; margin-left: 3px;"
              >
                <strong>
                  Jenis Layanan: {{ getService(itemsPrint.shipping_type) }}
                </strong>
              </span>
            </b-col>
            <b-col
              cols="4"
              class="d-flex pl-0"
              style="border-right: 1px solid black;"
            >
              <span
                class="text-black"
                style="font-size: 8px; line-height: 5px; margin-left: 3px;"
              >
                <strong>
                  Asuransi: tidak ada
                </strong>
              </span>
            </b-col>
            <b-col
              cols="4"
              class="d-flex pl-0"
            >
              <span
                class="text-black ml-50"
                style="font-size: 8px; line-height: 5px; margin-left: 2px;"
              >
                <strong>
                  Berat: {{ itemsPrint.product[1] === undefined ? (itemsPrint.product[0].weight/1000).toFixed(2) : (itemsPrint.product.reduce((x,y) => x+y.weight,0)/1000).toFixed(2) }} Kg
                </strong>
              </span>
            </b-col>
          </b-row>

          <b-row
            class="mx-50 mb-50 border-4 border-black"
            style="height: 100px;"
          >
            <b-col
              cols="12"
              class="p-0 d-flex"
            >
              <span
                class="text-black ml-50"
                style="font-size: 8px;"
              >
                <strong>
                  Kuantitas: {{ sumAll(itemsPrint.product) }}
                </strong>
              </span>
            </b-col>
            <b-col
              cols="12"
              class="p-0 d-flex"
            >
              <ul class="p-0">
                <li class="d-flex">
                  <span
                    class="text-black ml-50"
                    style="font-size: 8px;"
                  >
                    <strong>
                      Isi
                    </strong>
                  </span>
                  <span
                    class="text-black"
                    style="font-size: 8px; margin-left: 4px;"
                  >
                    <strong>
                      paket:
                    </strong>
                  </span>
                  <span
                    v-for="(dataProduct, indexProduct) in itemsPrint.product"
                    :key="indexProduct+1"
                    class="text-black ml-50"
                    style="font-size: 8px; line-height: 10px; margin-top: 1px;"
                  >
                    <strong
                      v-if="dataProduct.variant_name !== '0' && dataProduct.variant_name !== ''"
                    >
                      {{ dataProduct.qty }} {{ dataProduct.product_name }} {{ dataProduct.variant_name }} ,
                    </strong>
                    <strong v-else>
                      {{ dataProduct.qty }} {{ `${ dataProduct.product_name } ${ dataProduct.variant_name }` }} ,
                    </strong>
                  </span>
                </li>
              </ul>
            </b-col>
          </b-row>

          <b-row
            :class="itemsPrint.shipping === 'IDEXPRESS' ? 'border-4 border-black mx-50 mb-50' : 'border-4 border-black mx-50' "
            style="height: 20px;"
          >
            <span
              class="text-black ml-50"
              style="font-size: 8px; line-height: 5px;"
            >
              <strong>
                Catatan: Mohon hubungi nomor pembeli untuk konfirmasi pengiriman
              </strong>
            </span>
          </b-row>

        </div>
        <div class="html2pdf__page-break" />
      </section>
    </vue-html2pdf>

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
  </b-card>
</template>

<script>
import {
  BCard,
  BRow,
  BTable,
  BContainer,
  BAvatar,
  BButton,
  BImg,
  BListGroup,
  BListGroupItem,
  BOverlay,
  BCol,
  BFormCheckbox,
  VBModal,
  BPagination,
  BCollapse,
  BInputGroupAppend,
} from 'bootstrap-vue'
import VueHtml2pdf from 'vue-html2pdf'
import VueBarcode from 'vue-barcode'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import useJwt from '@/auth/jwt/useJwt'
import { dateFormat } from '@core/mixins/ui/date'
import printJS from 'print-js'
import AddPickupPopupPrint from '../AddPickupPopupPrint.vue'
import PickupLabelPrint from '../PickupLabelPrint.vue'

export default {
  components: {
    BCard,
    BRow,
    BTable,
    BContainer,
    BAvatar,
    BButton,
    VueHtml2pdf,
    barcode: VueBarcode,
    AddPickupPopupPrint,
    PickupLabelPrint,
    BImg,
    BListGroup,
    BListGroupItem,
    BOverlay,
    // BCol,
    BFormCheckbox,
    BPagination,
    BCollapse,
  },
  directives: { VBModal },
  mixins: [dateFormat],
  data() {
    return {
      loading: false,
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

      profile: [],
      printOption: 1,

      valuePrint: [],

      idOrderFromHistory: this.$route.params.selected_order_from_history,
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
    }
  },
  computed: {
    labelformobile() {
      const date = `${this.idOrderFromHistory.pickup_date}T${this.idOrderFromHistory.pickup_time}`
      return `label-${this.$moment(date).format('YYYY-MM-DD-HH-mm-ss')}`
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
        this.getOrder().catch(error => {
          console.error(error)
        })
      },
    },
  },
  mounted() {
    this.items = this.selectedOrder
    this.getProfile()
  },
  methods: {
    onProgress(progress) {
      this.progress = progress
      // console.log(`PDF generation progress: ${progress}%`)
    },
    startPagination() {
      // console.log('PDF has started pagination')
    },
    hasPaginated() {
      // console.log('PDF has been paginated')
    },
    async beforeDownload({ html2pdf, options, pdfContent }) {
      // console.log('On Before PDF Generation')
      await html2pdf().set(options).from(pdfContent).toPdf()
        .get('pdf')
        .then(pdf => {
          const getIframe = document.getElementsByTagName('iframe')
          // console.log(getIframe)
          const totalPages = pdf.internal.getNumberOfPages()
          // eslint-disable-next-line no-plusplus
          for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i)
            pdf.setFontSize(10)
            pdf.setTextColor(150)
            pdf.text(`Page ${i} of ${totalPages}`, (pdf.internal.pageSize.getWidth() * 0.88), (pdf.internal.pageSize.getHeight() - 0.3))
          }
        })
        // .save()
    },
    hasDownloaded(blobPdf) {
      // console.log('PDF has downloaded yehey')
      this.pdfDownloaded = true
      // console.log(blobPdf)
    },
    domRendered() {
      // console.log('Dom Has Rendered')
      this.contentRendered = true
    },
    onBlobGenerate(blob) {
      console.log(blob)
    },
    getOrder() {
      this.loading = true
      this.idOrderFromHistory.data_order.map(items => this.idOrder.push(items.id))
      this.$http_komship.get(`/v1/order/${this.profile.partner_id}`, {
        params: {
          order_id: this.idOrder.toString(),
          page: this.currentPage,
          total_per_page: this.totalPerPage,
        },
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
        this.loading = false
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
        this.loading = false
      })
    },
    onShowModalPrint() {
      if (this.profile.user_phone === '' || this.profile.user_fullname === '') {
        this.$refs['modal-validate-print-label'].show()
      } else {
        this.$bvModal.show('modal-8')
      }
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
      this.handlePreviewModalPrint = true
      this.valuesOption = values
      if (values === 150) {
        this.$refs.html2PdfThermal.generatePdf()
      } else if (values === 100) {
        this.$refs.html2PdfThermalSquare.generatePdf()
      } else {
        this.$refs.html2Pdf.generatePdf()
      }
      // // The Base64 string of a simple PDF file
      // const b64 = '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bWxuczpyZGY9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMnIHhtbG5zOmlYPSdodHRwOi8vbnMuYWRvYmUuY29tL2lYLzEuMC8nPgo8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0ndXVpZDo0YTIzZDZiNi1lZmE2LTExZTgtMDAwMC05ZmIzZWU2NTk2YjMnIHhtbG5zOnBkZj0naHR0cDovL25zLmFkb2JlLmNvbS9wZGYvMS4zLycgcGRmOlByb2R1Y2VyPSdHUEwgR2hvc3RzY3JpcHQgOS4yMCcvPgo8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0ndXVpZDo0YTIzZDZiNi1lZmE2LTExZTgtMDAwMC05ZmIzZWU2NTk2YjMnIHhtbG5zOnhtcD0naHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyc+PHhtcDpNb2RpZnlEYXRlPjIwMTgtMTEtMjFUMDc6MDM6MzErMDI6MDA8L3htcDpNb2RpZnlEYXRlPgo8eG1wOkNyZWF0ZURhdGU+MjAxOC0xMS0yMVQwNzowMzozMSswMjowMDwveG1wOkNyZWF0ZURhdGU+Cjx4bXA6Q3JlYXRvclRvb2w+VW5rbm93bkFwcGxpY2F0aW9uPC94bXA6Q3JlYXRvclRvb2w+PC9yZGY6RGVzY3JpcHRpb24+CjxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSd1dWlkOjRhMjNkNmI2LWVmYTYtMTFlOC0wMDAwLTlmYjNlZTY1OTZiMycgeG1sbnM6eGFwTU09J2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8nIHhhcE1NOkRvY3VtZW50SUQ9J3V1aWQ6NGEyM2Q2YjYtZWZhNi0xMWU4LTAwMDAtOWZiM2VlNjU5NmIzJy8+CjxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSd1dWlkOjRhMjNkNmI2LWVmYTYtMTFlOC0wMDAwLTlmYjNlZTY1OTZiMycgeG1sbnM6ZGM9J2h0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvJyBkYzpmb3JtYXQ9J2FwcGxpY2F0aW9uL3BkZic+PGRjOnRpdGxlPjxyZGY6QWx0PjxyZGY6bGkgeG1sOmxhbmc9J3gtZGVmYXVsdCc+VW50aXRsZWQ8L3JkZjpsaT48L3JkZjpBbHQ+PC9kYzp0aXRsZT48L3JkZjpEZXNjcmlwdGlvbj4KPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSd3Jz8+CmVuZHN0cmVhbQplbmRvYmoKMjcgMCBvYmoKPDwvTGVuZ3RoIDIyL0ZpbHRlci9GbGF0ZURlY29kZT4+CnN0cmVhbQp4nGNgcHRgAAKeBWwNDIMVAAAMFQG0CmVuZHN0cmVhbQplbmRvYmoKMjggMCBvYmoKPDwvTGVuZ3RoIDgxMjEvRmlsdGVyL0ZsYXRlRGVjb2RlPj4Kc3RyZWFtCnic7XsJdFRVtvY+594aU8OtSs0Z7q1UqhJSCZkTIpG6CUkEIxBGU2KkAgRBbQlCRGkFRBENCjjPEu0WaCduKoAVhiZq220PNtjaNtqD+RXb1ibdvG5E2yZVb59bAfH/ff3/b7311nr/Wt7LvvsM+zvD3vvsc04SgACAAdYDB8Ki61dJfzl2/y+w5HEA3YQl3Vd+52nuLw5Mvw2guejKa25cAuqTgzKWtqVdnYt/tjWjGqAW66FmKRbYX7W9DmDOxnz+0u+suiEtX9MNQBZfs3xRZzpfjPXGWd/pvKHblGE7hfIyFkrd13V1f8+1wYn5GIBwjWY/ZKu0E7L5ECAmdfwsJZeljrM6xumn2HpOmsaeODwPvyGFRIIB8iW44QviJeUwFXj4HGe6G0bhAXDAHHiQ2CEfXDAXphIeZcJwF3ksdX3qE7gQ7oWnUy+RDalnsX4r/Bi+wBH8gSdQC9NRfi50wSfcRxBNPQp62AQZMBFmERd0wjv4foZjuA/uhx+Sm1JfYK8O2IDt1UMDNKReTp2BIriL36Y5ZtgL98ABok0tSi2DXMiDXhpOvZN6H0IQhe/B8zimMBnip4AfroaN8DDxcj/G1APwfUgSE+3gJmsOY09TYR5cC6uhF56FnxE7adMc05xMfTf1MWghEwpxTMvgE1JNptFneFNqUuo9mA+D8DrOl71D/Hx+p2Z+MpJ6IvUKOOElYiQHycuaCs2W0VtST6VeBBOOpxw1Mh37WQi3wsvwU/g3+Btdl1oHU2A29vwaySESCaHG36Feupau5d6C8TjbDhxtD2wHBS2yHw7AIdTNb2EYPiIOkkUuJgvJPeRv1EQX0yPcY9we7m2e8D9AfQcgiDpaBc/APvgFvAFHiAbbLyNt5CqynDxEniDDVKEn6Oe8nr+V/yc/qgklh5P/TE1PfQYe8MElsAbWoW6/BwOwB34Jv4a/wd/hNBHIBLKUPEUUMkxOUAPNozNoN32QPkNf4KZz93Av89V8I381/wb/nuZ2zWZdpy55ZkfyvuQLyTdTL6XeRN+xYPshaEGN3oJe8Qwchrew9Xfh9/AB8x9sfyK5jFyBvawkd5D7yQvkNfIm+RRnCeqbRyfSJux1Ob0O9bSB3kfvx96P4HuUvkd/T/9MP+M0XB5Xw63gnuIULsEd5f7IC3yIH8+X8zP4y/gUWqZCc5FmtmaX5jnNK5qT2nrtYm239k+6Dbrb9L8YLRr9QxKSS5NKcgB9V4+etAY18SQ8jX6/B23wM9ToL3HEw3AKreAjflKA464jLaSVTCOXkstJF9lANpF7ycPkMfI0eRFngHOgOhx7mDbQ2bSTdtHb6CZ6N92D7376U/oOPUZHcORuLsCFuXJuKncZN5+7FuewilvL3YaavYd7ljvCvcV9zP2JG0Gruflcvodfwz/C7+T38G9qLtF8B9+nNYc1Q5o3NWc0Z7RU69Nma0u1V2l3aT/QaXU1ujbdnbq3dX/Xd5NsUoQjl+C8h3pxDebSZ6mDX0dGWJAiPFhx5mG0w2xcFX+HCJdEu1hYPY7NSb18JkNqZV5B/CpyAKrJa7BOSzmMivwwxMnv6DD/Kr0Qfk1ixMvv5K7V/Iz64TmMRtvoQXqANMIeWk/n0cc5IB+RXfAR+vsNcD+5mqyE58gIuYDcTGrJOniburjZ5DaoTz1NeWIgU8lJwBHALfxiuAL+5UPq4HfwSfJJ3szfhPEpAQ+iRZ+H98kP4EuiSZ3A6MZhNOrEKHMX+vtGYFGvA9fZOlyPXowg12iPwB6ixSheq53Er4GT8A/4RLMfPaoRI+nHyWX8k/yHqdpUCa4wXGWwC9fdUrgIV8xH6CWHMM9yl+NKN2IsqcBV3QaXwWK4GaPePSkl9Xjq1tSNqeXwc8R+SYrJl6QPV0QCEfXwOr5b4V2yGdfhRf96nv/Rk1wMQ/Ap8ZAgqcD1MKK5XrNN86xmj+aHmje05ajt2+Ax9OgP0JuNOINF8CZ8Cp8TPdrGC8VQheOdgGNvh2tolDsEk4kPunHNFmIcbxybyUpsZQNq73Fcz4dwbZzEOHE5/BCOEUrcOKNF2L8e22lFPS9A6R1owVvJAJYsxqhdBH/GeVvIBLoK+5OxpQcxag3hmH4Hf0Rtp9RxFWNcaCLzsK3P4VJYjD3UQBvph5bUPoxU06GJ+wXqO58I0EjyyPcRF8MVaoEcqNN8SCgUJ6enJtBl3CHcY1JY3oe7VxZcSFbgKKw4j1FwkhlQnZwFxbIsRyZdWD/xgroJtdVVlRXlZaXjS4rDReMKC0LB/ECeXxJzc7KzfF6P2+V0ZNptgtViNmUYDXqdVsNzlEBxc6AlJimhmMKHAlOmlLB8oBMLOs8riCkSFrV8XUaRYqqY9HVJGSWX/G+SclpSPidJBKke6kuKpeaApLzRFJAS5LKZ7Zi+uykQlZQRNT1NTW9T02ZM+/0IkJo9S5skhcSkZqXl+qW9zbEmbK4/wzg5MLnLWFIM/cYMTGZgSnEHuvuJexJRE9TdfEE/Bb0ZB6X4Ak3NijfQxEagcMHmzsVK28z25qYsvz9aUqyQyYsCCxUINCrWsCoCk9VuFO1kRad2Iy1js4HNUn/xUO9dCQEWxsKmxYHFnZe3K1xnlPVhC2O/TYp7zXHPV1ls3D65fdP5tVlcb7NnmcSyvb2bJGVoZvv5tX72jUaxDcTSYEustwW7vguV2Dpbwt7oxmi7QjZilxKbCZtVen5dgWZWErtKUgyBxsDS3qtiaBpfrwKzbvTHfT55MDUMvmapd057wK9EsgLRzqbsfgf0zrpxwCtL3q/XlBT3C7a0Yvst1rGEyXx+outcnZpSxVmqddY5zRI2osBUdAhFWiThSNoDOKcJ7NM1AXoXTUAxfKIEUcpitMgyxTA51itcwMoZXtEEhYDU+xmgBwRGTny9pHOsRBsUPgOWZH5yztWw/mxaCYeVoiLmIrrJaFMc4yQ1X11SfH2C1gS6BQkZqg/aULed0QtKUf1+PzPw5oQMCzGjrJ/Zns5LsDArDnJpOKrQGKsZOlvjnMtq1p+tOQePBdCT9wA7jzsVfejcP6vgymxeeoFCXP+iuitd3zo70DrzsnapuTc2ptvWOV/LpesnnKsbSymZk9u5LDqWolmcWotOefk5YZZpNyl8EP9pVaderHDolGoBkVoUITYl/Y0a/f7/EJPQ6c8DJVInGUplX8HGRqlcEP56fuLX8l8bnamXw/HyIdo657LeXuPX6lowAPX2tgSklt5Yb2citX5hQBICvYN0J93Z290cO2vQRGr/5iyl5a4oTmIpuaAEmLJ1k5LTYbIAX36ZnCk0q+o//4myEk0h7pX1sAg0eMAToBQjMminCdfgvkwPcY+ClRAQU0PcwwOCo0JOcI8MWDMr5AaBewDakCgo3DQYQqKwnLsH1iFRFG+Nl5RXDLLEgNFSIaD8ZpCQ1iNx0IdfouZlJCa/eSDTxZq/NW61qbjvxsuq0okBwVPR1uDgbgDCdXHX4vFaxGPZtbh5idwi5DnIF3KLwayOUx6wChXrsb8IikfwlDIOqxs4F+79ItfE+XDfYWI9cUu6n554YVFFg5GbzHlUEStnxm1X5PScLl4hSgc4GUcqc3cMGDLY+O6IC86KQ9xGTofXIpFbj1Ju0XqIM0IpEpvJnAGDuWJbg4mbg9Ocg2oRcYwEtqtfmbs2jg1hf81cNl4VRO5qLgevLSLXwuXGneLQAe4+Vexe1gr2Nymur2RswGypGGowcJOwVuG2oMa3qL1tGwhNwFNNiCuEMiSKSl2HqXXMmFwvpnrRTL1oml40TS+OohevVcDdiTV3okwptwa6udWwDWk7pnls0hlHDQ6qifzCikHOy3lQE8IB1B3BUt+AwcJG5onbM1Uxz4DJUhE5xK2EGUgUB79qwO2pWH6AK1KnUjzgyWKA7rjBhKpzp22BQBezwSEum8tVNZGjakBpEDFPwMqJQOjP6FGmHfoW/TWzL7toqPznY/yNMf7LNE8N0aMD2IucoL9ifLghm36EjS2gv4ftmKL0AH0VyhDwHk2wUdB36SBEkB/D/GLkg8grke+P+18XEzQxgAzH/ljc7GKTpa/Gw6VjCTE4lnBnjSXsroqGIH2FvoyXbZH+Bnk+8pfpEF6ORXoYuQf5EB61Xke+l1bjtVvES0ia/4geZD5NX6L78NAn0oG4hQ1BiesY2x3XMvZiHNK5tlLxIH2RPof3RZG+EA/5sHTXQChftB7A9ghey1bFc0R7g5E+RdrJKRTqwyMhcrDTp+O1rJFt8YOSOEi30W2yp1YOyiXyDq4sWFZStoOTglKJVCvtkBoEugVDw3aKC5Zuxm8tSBS9B0lG2kbvjPO1SsMozonNi8J6/PapqRh+u9UUXk9AOFd7Uk1F6EaYgUSxjbVI65DWI92CV4FtdA3Sd5FuQrpZLVmF1IO0GsNHNyK6EdGNiG4V0Y2IbkR0I6JbRXSrvfcgMUQMETFExBARUxExRMQQEUNETEWw8cYQEVMRbYhoQ0QbItpURBsi2hDRhog2FdGGiDZEtKkIGREyImREyCpCRoSMCBkRsoqQESEjQlYRZYgoQ0QZIspURBkiyhBRhogyFVGGiDJElKkICRESIiRESCpCQoSECAkRkoqQECEhQlIRAiIERAiIEFSEgAgBEQIiBBUhqPbpQWKIYUQMI2IYEcMqYhgRw4gYRsSwihhGxDAihunqfu5ow2sIOYqQowg5qkKOIuQoQo4i5KgKOYqQowg5Ojb1VaoyKLrNWqR1SOuRGHYIsUOIHULskIodUt2rB4lhFUQoiFAQoagIBREKIhREKCpCQYSCCEVF9CGiDxF9iOhTEX2I6ENEHyL6VESf6rg9SAzxn3fK/7Rp6C2kXY+bK11Pxql8HZxQ+Vo4pvKboV/lN8EOlX8XNqh8DdSqfDWEVI7tqXwViHoSF2utDS4MATOQFiAtR9qOtBvpMJJOTR1Beh8pRavlPN6qm6HbrtutO6zT7NYN66hVO0O7Xbtbe1ir2a0d1lKpIYua1TiKoQW2qt91+P0rEm4i+I2oqQitwn6rMM5W41tFq2TbiPTXInKkiBwuIruLyNYi0mCgFxFejXQS1OJ9TSTtsik0STyGVBsqmISRacu+E24xHqoRE+Rgmo2Tw8hPIPUj7UDagFSLVIFUghREEtWyIpRvl/PGmjyIVIDkR5JYF+By4eHHbtPLg9RMdgy8ZgYD66egEHEH4gVlyBLxghnIXooXLBQbDGQfFLBjENmLlnsO+e64eByrX0iz5+PiAWS74mIVso54wXhk8+MFb4gNZjIXRJ5B54zx2ThvxmfFxXkoNjMujkMWjheEmHQRdhTE2nGkHY4jD46h8tM9BeLiRGR5cbGOSeuhgBmeaKFEHZ4GiXFuAAf010HSzhM5QxwR7xNPIPzPqFh0j3elBI/sSDBB5slG8WDJkyjcIMYbjEwe94f+Ma4wvlfcEbxTfAzbIsF94iPieHFLSUKPxXfjuO9Uu4iLG/Bu8ZycKa4Xy8RVJcfFleLFYqc4S+wIYnlcvFw8yIYJUdJOn9sntmGDU3EWwbh4UTChDrFFvFGUxQKxTjrI9AsT0u3WlhxkGoCKdO/FqN+iYIL5+NzaBLHJRbqTum26+bpG3URdQJeny9Xl6Bx6u17QW/QmvVGv12v1vJ7qQe9IpIblMDsUO7QCY1qefXk1LVD2paCemSnRU7gYlEyulbbObiStytAiaF0oKadnBxLEiEd3TaCRKPZWaJ3TqEwItyZ0qVlKbbhV0bXNb+8nZEsUSxV6R4LAnPYESbGijVnsjtxPYOPdWYNAiHfj3dEoeFzXRzwR+yRbXUvTN3xiY9/wV4/n/GSO8mDr7Hbl2ZyoUsESqZxoq3ILu0EPUis1NzcNUgtj0fZBvptam2excr67KYpix1Ux9GYLikEBYyimbwSJiWE8aWRiaKO0XAjhKOdnDOWMZgipciGjWZXjCZPrPyY1N/VLkioTBDimyhwLwnky6DGIbeoPhVSpgETamRRpD0jqwMapDYkiipSIqgjBc53akEjUzpTSr0SCYyLV50Sq1b448pWMmJZxFJ6VcRSiTPi/+HQ1hslAec/aV9kPJWKB5i6kmLL5+qUeZf1CSepf2zP204pQbOGipYx3dik9ga4mZW2gSeovf/Ubql9l1eWBpn54tXlOe/+rcldTvFwubw50NkUHIvXtDV/r685zfbXXf0Nj9ayxdtZXpOEbqhtYdYT11cD6amB9ReSI2lfzMub3be39emiM4iVY5QM0w4g+HMvyRxtdQvck5tCDE/2etVn7eSC7ICMcVUyBRsWMxKpKGkoaWBWuM1ZlYT95GqvyrJ3oz9pPdo1VCVhsCzTCWdUCE2pVqme2Kv7Zl7UzV1Hkzm+22Ur2qNUeaF7WhP8wv0olfM+XhJXf+Kz6pqenp2cl+/SEVwK0KkWzW5UavMP363TYVawpimXjz5ZxnFrWbzA0J1JDWBnGQZBVrDuWCpMwalA24q1LR/u0fTrKrgqrBnw5FcsP4Q6+DgnvcXR1vFS9L9PVA3lBdn9ZNVBaneZ4P2U87vNXYA8DtQhlPJjmsq0EE9uC20q21fYF+0r6arVYum8HFoo72FYaL93BwarwyrOKwOSqKCobh8X6eyqenaN23McS4XA0vJKo+vo/lU3OKv2cYleOtbpSbX7VWYOky1dCWjhdGe45C+oZg6iVPSqE9UfZjyc0+OJZSgeNeyhJanUJGpEzQcMnOTDq+CQBr16rSVLuIAmBgSjEA56wcLp+tH66cKp+2mg9RDAtnMFPeZnf5rcF8YNhHs5I3NAZWQP/BIkfYnH+Pvw8T7zYV77spBPASENW3GkkvBzy4OWvvN4TxiY7po1CZNpIeVkltnUf+4Vj8mPcIiAEwDdphsCIl86fynUmyVxnMHlNYdNs09WmD0zaETPR8i4+yBeap5jnm3eaXzL/2GwguBOZtGadxphh1oHJZDYnyIuyj+MdHMdz1MSbOTPljaCTzUPmo5g5QApBj4rZsw94HgGA55o9mq1GYkwQKtsFPLMd1nE6nzVC11FKvZb95BIyBdjQj68QTndMO9VRz3QSQeWMdtQTm73OXlcHKtukGR/mbxZ+ZLVay8tIRwd0hFFX1aTSVukM2IiN0LWju+hNJ/btS55M7iYFp7nvnbni8+S7NJd8lsxAHVya+pgvQh24IQCD8sSrMnr0m/QPeXdqdup/YHk2c9Cyz3Yoc8h2JNPs1NTYmoQ1rr30V8JRh+4AHEE4T3Qeu5AlZdEs5sVZdldV1g6rWfSX+qlfxpx/h2w4akgZODyczRjYTQhJEL+cJ/KlPOWZAL/DqSHHYHXusRkmYvIFPcfs3vy3XlENN21kunB6xbSRUyMQGQ2vONVxumMkvCKCxJTANNDBZg0dRBMKBfK0uprKCrvTAYE8sAlQWeEiDldlRU11FavkrcmTxjmTo98Vlj2u/DP5xZE/JD8gRX/Z+dvRp9bOnL60e87Mbn527py2vtGbkqfe/l/JkyRK7iT3kcUHznxy5wNrNm/dyH4cMzX1J348Pwm1VUGmy0t1Pn22JsfluzhrSvbU4G+F922GGm+L99LQEu+VodtD93rv8+3wDWb9xPd6lkmrNTtdWq+rQDvOGfWuprfTHdq92h9rTYer3hVoTn5Fua3YnC+Hx1fly3mF+PHmVC3PP5NP81tymHLLLNaqC3MI5Ag5Ss4/cvicnGJSCTKWMp+nMNcvZ9sifjlLwI/HV+XHcLOX15nMxmIWabBO5VitcpQoRglZdmTklof04wyF5qho2m6ioomk0BSyxVVl8s2oIlUxXGlbytB0leP8C9zkfTeZ4V7gXu7m3N7KZQ3pJbbiOjTTipGO6ULH6XA6d5w57QgGhUg9Wi8cPtURPm6vK+1YER7pwCxaj7MI9fW4xskKtOEKUlCD9nO5nJzD5faHCkIFWm0gL1RdVVNTW1ObNiLRanVaJ7MqFtVUk65U+FdHDiZauaxg8tMMQcdN+X7H9w/Ne+ze1y5pW946h1xR82l+bXvTJc2VQgb9YPyj90fvfCmZuGvjJdm1Xn1LS/yOy+5uzQ5K2TObJyZ/Za/wFNRPnFcRqs3vYvFhE9r6fs1+sEI2PDEI9tQXcnlGXW3WRVnUPk87zzjPNc8Tzf5cp63mJ5onZlZnNfOt5tbM5qz7dY8YjCYLwWDoYzFfo3MwTWdmZFjB6Pbrfd25JFcYR7mQld2JTKQb1mN/3pxIWpsr6qeNjNb/cbqw4vQ0dP36yAi+qCdY0UE6JrfLGUu0S4xLXEs8y7I1HVFc8yywMd9Hr0eNFTgzHe6vHH8T8W6Iv5JMjg7O75ftVVNv7Lj1tiu7btfsHz15f/Lj5D8wMrw3P/o4LXpmRvf25/Y99QSbewPOvQD93AHZ5HuDIODcWzLqHjE8an5Q2KXZaTxgOGBO+PR6B5lCL9K2GGfk7jLv0+7z/cT4uukd4zHTF7rPzeZsa7ZTzsqpcsoWW5XVedh5xMk5me9ZcyMqt7iR07tlk9Vib7PELNTisRO28XmzqkilHZhMjlSl8rxxaR4uSXNPtsplKy6APnbmF3DYC+x2ttnyGXYP03h+hg78pNTpn2EhFl9p7oLc5bnbc/lcq18vm61Vem/OmP+GWajB8JKONSNss3d45EJHxCPnWvGDi8bDVhfb7qKRUbbroj8MDaCEnQ0Ghexji4vx+FlRXBjqPqkCACswbLF6N2PKgME4Sc02+CPqVh09zpZFh9q9RUYtWVinFta9RUZlqXtxtLQel9N14TBuBZUs/q1ADyAaXCxSQaiaxT3g/C5m/0wWFXVaN/2SeGo+2Z3888ZlxPHWCLFrR2VuQ2fjZQXcDfMur68nZFbpo0/tvef3RE/CyZ8kD928eQq5Zs26yZNXMl+Yk5zJx9SYV0oq5NjqnE051G4yd5ffbl5fzkskQANcGamklZxMJtPJXNQadUSD88bNw6F+Yfsi0zbRXOmaWFhZ3GpucrUWNhWfNI26jVswxmSYzBlFJnOBxeV2lphNbhfvyWf236vaXzWzxaaqaCDDlOaFRWnzB4JpXl6VdgODM0sNVAs0bMWJ1gLGLMYS5gYZTp3Hqy0alxHyediCM3i9Pt/WclKOm1ECT3WV+X67t6y9fmzTOTXCVl79NGFEGD1+dvmNnrouffA5HsbNx63uPnWMdHrh7NJcgWvTvMy6zLEseOW4JeFlpVq2Ot0al/tswKrGiDZmJHe13+aw0ICEES7zvH3qRtKgzymcd21tMNO8duidmxcScvi19UQ3qfvA1uTfPjhza+zKLXcs7bq1pWCCM9fvKg9c8djze7f+mmQQ3wsPnLno4P6r6ge3WOitP3jiqSef6XsCVbIJD2O1aD8BdsmFD2mIwUJma5ZoejRcqb3dstTSbeeNBqtJNNGtppSJRkwzTNSUoKvlcTodASNHtcZCMAiGMkO3gTf41tm32+kC+zr7bvtRO28XIEQ4ptUMSteTPgx6XltkkGTD2VDG1Ignu44Vpzu8046DBxWKKsU9oq4ivXuvwJO4eza7K+BJ3FgxAXXmx1OMk20Hbh3TidZG+pIfE83kq5ti0UsvunDirFI+9NDVTdWfjW94NvlvOMcyjFcCzrGIXis/qbVpA/oCt80deNj+sOOhggeKDDpHi4PaD5gHLT/xfxT4wnw6TzvOPNfcZX4g4yH7zrxBk64hIOc3ha7MWxzaZN/kuD3v1nxDbahZ25JxsXmGtcXfmKfLyy8I1Zqq/dV51YHqfJ3WqLEZ/B5zgSkvLy+gy8+Ti1eabnDc6Lx+XE/RHc7bih51PlC0J29PwLyebHXf5Xmk6AdFSrE2L5H6OfNi/xjH/PBAbj7LDw+I+em816fm5SxMXG0mNXkteQ+b78/7Ud7beVp/nsnM8z4YWydQyVbMgLskQsZCiprPC1YxLuf4ME6SMiKTNsLHyHpyknBABMzFCK9KZrpQkhC5G09zC/iTeC5rKcxwydi0q9ItY7tuGRt1y9W1VW52OnHLwXH4wXatblE9CPDuuT45L7/K6iNtvpSP+loydW6/S/YHqlxytlglusj7LuKq1PvbgluDNCh7cqqCPnYKkd02Y6StmJQVk9JiUpzrLxOIUEn86tK2GiIqR5H0EjeYq8AbviHBPOsMLkX1yME867rw6TA7J2IizM6KGHVPdZxdrix7ip1J0lm2eMeicjh99FiBT0eHGqLzUz+VDRn2iLUQP2iBE/vMdSaHqY4l46Y6tM2n/Rl1MHaPiuKqzwy61MVdXYUHFnQQPK7gIcatSYdeJ27EPPsTF3aSKSM++7WLvlMbdDinJp+fv/a9j957uzD5uW1B+/IyKTtEXo62n/rru6OkNDxrbmF2qeR02FonzXuk9+CWzeWTGkVXINeZveTi1tvv/ZWCHn83evxsPgQueFx2X2q70vaghjNovdp6Wm9rpa22j6nOyoKfjc9wgdHpcBgN2kxHyOkEtlgtLlnKr9rtIik0DEZFVK8LLbjN0+eh3Z6THvpXD/EYM0IGvbrHomyfnpzUE73XHUnHSdQnu6uNqR9p2ki9oN7d6gV1hWNQxJjor1ZPcaFqPKI41F2phiW56RccWnb1s5cQrzgrMuW6IuLdPnfhFc8+SPuSnuGuiTN6jpOhf77Hfr9d83995573/gZ+Q5b/d7y0i37IXu4T7hP+p9/0aiZq92j36Aq/fb99v32/fb99v32/fb99v33/J70AWvaL4/8i0Tq475uIXwmhMbr0/yOayn8Im87RSmhQ6UOY8/9KXI6KK1PpQ7hb/StV+uaJfmX3/gXW+s/0Xr36x6pPf1iv/g+5vRfGj3z55ZlRoVm/EGUNZ/+q9d8B16TbfgplbmRzdHJlYW0KZW5kb2JqCjI5IDAgb2JqCjw8L0xlbmd0aCAxMi9GaWx0ZXIvRmxhdGVEZWNvZGU+PgpzdHJlYW0KeJxzYKAjAAAbrQBBCmVuZHN0cmVhbQplbmRvYmoKMzAgMCBvYmoKPDwvTGVuZ3RoIDIwOS9GaWx0ZXIvRmxhdGVEZWNvZGU+PgpzdHJlYW0KeJxdkE0OAiEMRvecghvMP6OJ6UY3LjRGvQBCMSyGITguvL0zRWsiCS/po03oV2z3u33wkyxOaTQXnKTzwSZ8jM9kUN7w7oOoamm9mT4V0Qw6imJ70PH6iijnBnS5PuoBi3NTkqnyjBktPqI2mHS4o9iU84GNmw8IDPbveZ2Hbu7X3QCzLoFUC8y6ItVoYHY9qVYBUzVZrYCpuqwcMJUh1ZXAVDarGpjKZdUDs29pl++vl7WWjL6RSPNMCcNEQVJQS0A+IGcdx7hMyfmKN6KGdLoKZW5kc3RyZWFtCmVuZG9iagozMSAwIG9iago8PC9MZW5ndGggMTkvRmlsdGVyL0ZsYXRlRGVjb2RlPj4Kc3RyZWFtCnick2AAAwWmxoUMgxYAANUuAV0KZW5kc3RyZWFtCmVuZG9iagozMiAwIG9iago8PC9MZW5ndGggNjEzMy9GaWx0ZXIvRmxhdGVEZWNvZGU+PgpzdHJlYW0KeJztOmt4FEW2p6q7p2cmk0zP5DGTZMj0ZDKDZMIrCeRBNpmQTIANgfA0g4kkQCQgSCC8XBEGFZHwXFZRcFfwsYq6SucBOwnuBQVfIML6YNfHAmpWcTWCXsVVSfqe6gkIu+799v653/3uR585jzp1qurUqVPV1QQgAGCAEHAgzVy6WN7W+MZS1PwaQDfkpsbZ85f1f/IblF8DEJTZ8269CbTHdhAb6Rvq62YdybuwGSBjBSqHN6DCOt/yFICJldMa5i9eHrH3OQBI7bwFM+siZfkVAOPE+XXLGw2vm36F9ruYsnFRfeNnzyz8EMvYv7FH6IRExCThCUjkvWAHUD9BPMt47xz1LKtnnP4NW4f7EGA3PEPmwDNwAF4g57HVHuiAdngFbFCK81oB98Ja0ME01KyDiQgC6u8liWo7DIaHMQ4PwzG0vR5WQickELv6KayCNdyb2GoNREMqFEMlLICNZKy6BKrhNH8n5MBYuAUaSUitUjepW9XH4LfQwb2i9kAUJMFMhGPqF8Kf1fdhILa4D7bDabLVsBf8OEoILX8Di2AHV8MTdbb6PXrggmXoAw8VcIwcpD7svR4+IXaygivBXh5VFfUwWjmgBhpgB3SSYWQUdQnVaoV6DBJwjOXY63ZohX0IYfgDvEtMwnn1MfU8JEIGjMH5tMPr5CDX27O6twgjJmCUBkAe1iyA/4CX4QRxk+fpAsEkZAp+4RfqWxAHQ2EKevsEtvyYfEtXIqziXuLL1JEQg3H5JYs2vAgfkCQymIwnU+kAuoA+xC0CPY44FGEWzMF4P4C9nyI+so+a6HHuUf5p/gddv94zagyuiBcehN/A8yQaZyqTJnIHOUk+oiV0On2Qfsjdyz/JvyHW4axvhPmwEZ6Gb4mV5JIJ5AbSQFaQteSXZDs5Rk6Qs7SYTqY303NcA7eQ+wM/EmES38TfKdwtrNed7a3qPdz7x95v1Uz1bpiA+bAavb8PHsKZdcBxeAfhNHxIBBJFYhBk4iJTyG0IK8lG8gjZTZ4k7TjKCfIh+ZR8Rb4hP1BA0NFk6qKpCG66iC6j99Jf0+MIJ+jn9DvOxqVyPm4YV8AFuQXo1VpuC8Je7gM+iT/OqxjnTGGbsFPYLTwtvCCc15nEO/Sgf+3ioz3pPad6ofee3m29rb3t6gcQj2uYhFFwQgF6X4cwF9d7G2bcHniTmDB2SSSdFJKxGJnpZC5ZSJZjJO8iO8hvNd+fJc9hlP5EzqHP0dSh+TyIDqMj6XiEG2k9XUi30K20nZ6k33MiF8WZuXgunRvF1XD13GLuVm4bp3CvcX/hPuQucBcRVN7IO/lU3sv7+FH8dH4J/xD/Cf+JUC0cFf6qM+rm6+7WhXVfisPFQrFSnCDWiJvFfeJb+lrMzkOwF34PVzzkDLeaC3B7YRPN4hPp6/R1zOfpMIuroJipdDe5h95O2mmasFw3go4g4+A878VYv0R30gt0BFdByskkmEuHRnrTxfF4GkEBfwi6+edwbq9jz8t1JrKSntOZoJUAzcMxX+SG8D7uKLzLnSYi/zC8xxuJjXTTJ7hKzII/8IVCFbi4X8Oz3EJyO+ylATydftBvwDweR57Cc2EyySR/51Tg6DjMohzuI7gTbqZ/hm7cx/fA/WQWPxs2QRZZAZ/A47grBgi36NJ18eRVOodvprGkHSj/JM4uj6QRToiDu0gNt0N3jr4DS+A4b4RT3O/Q++P0Wa6CPy9MJA24A26Hu2GhuhpuFar4N8hs4MhU8PBn8HRbwWXyLuSr8FSpxjNtH+7uTjwHirkK1Ngxc8ZiXkzBE2IHwgN4TvCYQXNwj1+Pp9jr0K6bTMMwW4gheOoA8Ed7J8I09XHYrs6GW9StMBDPg7XqCuxxN/wVNsNusqb3NmiEFNw5p8hYoYweF8rUgbSZvkMn0W1Xry9G20Ps8DeEZ6EMCoX90Mz/CSZBkbpBfRuz+zo8YbfDDPg5dOEsv8ARRnMHIat3HG1Ry7hGnO9pmKA+oTqJERrUeTAenoPfigLUiT5/cbG/qPBnBSPy83JzhmVnZQ4dMnjQwAxf+oDr+ns9ae5Ul+xM6edITkq02xLi42KtFskcE22KMhr0ok7gOUogI+Auq5UVb63Ce92jRw9kZXcdKuquUNQqMqrKrrZR5FrNTL7a0o+WN/2DpT9i6b9sSSS5AAoGZsgBt6wcK3XLYTJtQhXKG0vdQVnp1uQKTd6iydEou1zYQA7YG0plhdTKAaVsaUNzoLYUu2uJMpa4S+qNAzOgxRiFYhRKis3d2EJshUQTqC2Q30JBH41OKUnu0oCS6C5lHiicJ1A3S6mcUBUoTXa5ggMzFFIy0z1DAfdIxezTTKBEG0bRlSiiNow8h80G1sstGQebN4QlmFHrM81yz6qrrlK4uiAbw+LDcUsV2y+67D8WsXNrSdXaK2uTueaAfY7Mis3Na2Vl14SqK2tdjAaD2Ae2pZ6y2uYyHHoDBrF8koyj0TXBKoWswSFlNhM2q8j86t0BpqmdKysG90h3Q/PcWlyapGYFJt7qak1K8neoZyApIDdPrnK7lKJkd7Cu1NESB80Tb21L9MuJV9cMzGiRLJHAtsSY+wRT9JVC/eU6TdLMmVQ+8XJkCfPIPQYTQpFnyuhJlRvnlMtIfS40z8xFM3yCBFsps3BF5iiGktpmKZ/pWXtF8EhuufkbwAxwd39+taauT6PzSN8AE1meXE41rL8kKz6fkp7OUkQswTVFHwu18rCBGUvD1O1ulGRkGD6oxNjWBfMHY/hdLrbA68N+mIEFJTShKlKWYUZyK/gH+4IKrWU1By/VxE9hNaFLNZeb17oxk9uBXUTjFb338s8sJcQGGvIVkvDfVNdH6ssnucsnTKuSA821fbEtn3xVKVKfe7muT1JiS6q4ZNon0WROq8WkrL5szApVJoX34E+nJfWssKjHrNQ0RC5TpNrRERo0ulz/ZqOwep610tiPzfrcVPJ9V5dHXFW+yj1TM4cO40uwfPK05mbjVXWYapEBx/QxzHiYXOWSSxSYgjvTg7+wejCXYTBZ8WPISpgB5l9E1Ve8yjC5Tw7iw7JzYEYZHnTNzWVuuay5trkurIZmuGXJ3dxBX6AvNDcGai8lTljtXJ+slG0IYqwaSP5AtqZiYe84KJHg+z29WVK+tspXPlVMI1yHpAhv0QJetCR8o43Et5LJ2IN3YFrsBjNng3OIKiIHTqSDEccjTkfcjLgTUafZMc0CxFWIBxDPazV+zta6NcsfRrZeY21z52VqxbpIsbpGK7ZdH4zwigkRXjomYpYfMRuaHVEPGhnh/TMi3OrJDDFujM48WJzAJcAJRAqNSAk9DGZC8KW8i4sHBZFyuj6Nn7O2pXkzdx7geCAc5Qheop3qQY60Rlsyi41UpefACk76Be2O1NDuthhL5s7in9MPYQ/iAUSOfojwAf0AVtEzGE0z0iLEnYgHEI8jnkPU0TMIpxFO0VNo9RcYjFiEOB1xJ+IBxHOIIv0LUom+z9ZGo0wuQqT0faQSfQ+n9R5SM30XpXfpu+jam605eZkdmuAb3Cc4PX2CLblPsCZkhukbrd8NcIbpR22yz7mreAh9CxREioO9hZ2/BTJiJWItYiOiDqWTKJ2EEOIWxF2ICqIO25zENiexzRHE1xBPwhBEP2Ilop6eaMVhwvR4q3ekszgBb5wv49efkx6jr2j8NfqSxo/SFzX+KvIU5EfoS60pTiiOwnrANhJyCflgrBfo821pVqdabKEHMDxOpIMRixDHI05H3IyoowdoausspxU72Q9H9ICWrfCpxh+HR/Tgn+v0e0swx2RGvPk/QwnJTnmnl/q927ZjkRHvpq0oMeK9awNKjHh/sRolRrzzlqLEiHfWXJQY8U6bjhIj3vGTUUISpg/9Pq2/M2f8zUQuNtNlGKVlGKVlGKVlwOMHDQJ8xzPfHmxNT8eI7fD7BqQ7Q50k9BwJTSShR0ionoRWktBqEiogoRtJyEdCDhJKISE/Ce0nuRiKEPG3X1XM89tJ6AgJPUNCTSTkJSEPCaWRkExy/GHqah2TpbGAxtqK2b5C/rPCTDP66MKIujCtXbjtDyA9jqhqJT8ayakR48QUxlPb0osi5UH5mQuKR9ND2PAQLsMhOI3I4wIdwjQ6hJ0cwg7MSIsQpyMeRDyHqCLq0DoVHd+sUTPSwYhFiNMRVyGeQ9Rp7pxDpLCgz8U9mmOD+5wez0r0EAL7YnRRl7+f5JB80mhus4OYU8j4FDWF5kBCAp6BVoveEibR+76N/vu30WAoNtBNdDP0w4XY0sc3t37XzxkmD7R69zuL48n9kMJj1pE88BIP8lxo0srDwKFnPBsc9Gnkma2OqdjM3OrNcHaSGNZqn/M7R5fzU0eYonjWsd/5JznMk1bn26h5ep/zLcc656uDw3rUPOcNE2Sdsmba4ch1PnNEM12NFTtanSsZ2+e83THKebNDq6iPVNzYhCW/2TnRO805Gvsrdcxw+puwz33OIseNzoKI1TDWZp9zCLrgi4jp6OwAhzaoO0XrcEpOmDT4M8RtYpU4Hj8vM8UM0SU6xX5ishint+olfYzepDfq9XqdntdT/KCOC6tn/D78BoE4ncSYjmeU12SJMkrZJwruaKKn+A2ixHLltHzSSFKuHJwJ5TNk5cIkd5gY8SUsuEcSxVoO5ZNHKrm+8rCoTlRyfOWKWHlDVQshm4KoVeg9YYJv0DBRmWpNMrvudgAhljUbkxm/bs3GYBDsCUuL7EXWQkteWelPkNo+6vvxsV8l91O2lU+qUp7qF1QymaD2C5Yrv2L34Q7yFTkfKO0gXzIWrOrgCslXgYlMzxWWBoPlYTJVswOZfIl2mDFfanb6FJCZHcj6lIjdjoidB9ujXRpjaGcwgEez8xgMmh1PmF1LU1qgtCUtTbOxydCk2TTZ5CttjnjQxuPRbBJCcESzOZIQYjZKoWbicKBJikMzIUng0EwcJEkzmfqjyeA+k3WXTdZpI3HkRxtHxCb6zCWb6DNo4/t3n/qRPh9pGxGcWc2+JWrdgXrEWmX90ga7Epohyy0zg30fGd7aGTMbGK+rV4Lu+lJlprtUbhlR/RPV1ax6hLu0BaoDk6taqv31pa0j/CMC7rrSYNuoyuycq8Zad3ms7Mqf6KySdZbNxhqV8xPVOax6FBsrh42Vw8Ya5R+ljQVajldWtehhZBCvrhpvo1FGzNfaZFdwZILUWKgl7wiXfWVyJ15IdkMU3uRN+FUYjciqBhYPLGZVuKdYVQz7YOyrsq8c4UruJLv7qiRUW9wjwbd4SdMSsAfmlEZ+TfigavESFvAI9TX9qwfrAvjtV9q0GKBcSZ9UrhThXblFFFFby6ak5F/SRUUF8MoaUQ5CZT5TctxlQ6YrYDqDoc/wn9d/SR8vYbsgRPe3EX8KWQxNQU5JKZ9M8SiY3Hcz78TrEns9NAVxgk3ER5ou9aG5DREZ2Hwv4eIlfVJfHBb38UgrbNJ0KRyXH2zDbsiUaP+AKwC+XUQY2U5Jl04M0+3+WBD4Lg6MIt9FIFGvE7oo9xwdCgaynQwCu0+6UNBTME76uqCipwCKUJYuIhk6xGVxWTxI8FiEizJ38KJfgB9A5g/iWKDg4bhZ6MThDHB9i0MI0z1+r75AR0FnjDrKGfKFXL4AcnX5hCugVCaEHDUao1a7Hn4ATywcrKagQuqWurp6urqkL6CoqELq+RhPrDYBE4pIBVJBcOiQWM6SZeG4YVnxn+Sczn70OJnHGUigd//Fb3vvPXaMnc6J+N2wFL2wkw3+0gHgtQyweu15MNySZx1uHwOjLGOso+xVcL2lynq9XXpA/4CZcrwgUJ2o1wvGKJPJEB1jNpviYq3W+ASb3R4fVgvaBLDLjJusFsb90+L1BhmvcjgLiMP7uF3Q61Pi7XHx8XaryWBIibeiaLWYzGZZssRJksVqMOnt8YLZIpmACvEmgbNLZrPBoNdTSqjdarVYQJ9ksyVJxQYyAWQwIY1H9INAJuyTWbQSE8NkfctuuxarpMSKniR7T09SYo99XKC+9GNcJhajCGVgteURa16e5RLm5a2tGORbe/vhtYPs/8wwadbGSIcPIyk4fEm6kuBbzow7wYI7odVqtIfVC7m5QVR6UJmOyg4A9uGHGyYKNTGoaTP5BT8aDR1CFtW4SFZsgm14DjIrstgs4ibe/jqRkId6b3v5dFpSrpHY/vbGeLdj4MeHem/Z33u0v2iL631V6LxYdP99n6Vxp3qSej//z/Xt3LPfl/E1G+T6UT88yta7Uj3LdfOFkATH/KMMJuJ0lMSW2CbFTrLVxtbaHqQPcjuiH5MeSzLpoxONc+kcbq6wxNQYHYp+3LTXsM+412RKMN1t+ohyManTzQvMq8ycmYTpU/4xQzD2lVALjbAFdsEZOI9pbTZH4eel1REl2h18lMNMzGkxqcnoRVqUz4l5gKs0xhGfdlwkTrFIpOLQ5OzDbDfVLOxGsqjvkx1f7ixU3Yu+7l4ERd1F3da8wZa8wVJNF/6GDoGahQR/Np3OnQqWbOvwrMwEm+j1ulN18XEJWZnDuYKWfueefbf320WfrnvmfeeexFXT7nnqsbvmbiJrbL8/TvoR4+8IXb3n4eSb5x168+QLd+DeLFfP8ikYpXi8E57yz3KCI55O4WqEGsOUqHruZmGBoT5KL4FEJNrf+o7wfdyFJHGoNT9xqKPYWpFU7JhgrU6c6Kizzk+qcyzXLY+/QC/YJUgg5mibrTKhNqERv1wd5i3SLolKEp/sMIrAgmgg98VioGz+aDw5/Yb+6dlKNIlOcmKpzePNZtzfL8WdPcRJnAlZUproT0vPZqEbL3JiYkp2TiTZfRU9XeOkhT7fhYW+im4MWU+XFrSagp6FBYRltzUPs6wGasjCRZcCJ0FWJljiRFcCixlxefuzCHI3dmZ80fFp7zkS9/7bJIZcPGtsXTNzQ8+7dIIpd+q6FU+SqbZH24mTcMRErus91fudJO/pbCD33V3S8DjLtzuR5OD5wsGGDhBwHjm52QKbT/awCB8yNMJTPRr3e+Jt2WbBKewUTgv8eCTnBc4pNAohQRXw6g1GynkIhCM9Me5PyhqWvRPIQUw5vHHKcAKzj4dx/KjKSC4t8vkK2LlcxObMSvhk4bl4Z7vQ+X0Z+rgWQOfF1XbDSx1gUP/sL46KzvbwXXyX4QPbX2XhbeGCTG162W2wJ8sGjnOnOHTxjqgo3I46d1KiZDzhIVs8uzzUgydSjGeLheBHRs1eu2dLMklGyZ8INMvtISeAsL1BnVAE4zEiiWmeMFne5mKO+sZ9jb7hC6QLF7D765oe7ZRaiAlfUFBQVKSd9d0WPKNw+djqldzqj8FT1xtnsiQTa3R8MgEf8flWs1Vls4sfru0DRuItbkt2ZD9oEgoorX048/G5S+93rjzy0FNt7urCxnvbq2aNXZ3Pe+8bN31GVeeefT396W/mTc+/77Ge+2nr8uWVO37Z8w5GuBT3Rn+MVjS+O57311hFY6JplG60fqouqJ+tm6PXZ0v51vyEYfaAVG4tTwjYq4Vqw0SpxlqTMNE+X5hvmCXNt85PmGVfRuINOiH6Bm6yMNl4g2keVy/UG+eZjDYHL1owvHFpIlve2DRP9hCRgCiJMqb50NMsqKhPZBsB5Zg08KMJCyqFoUlsE+Cq+7pxA9RcqEFBOzNw7RfWwEK8cfgNk4RJhhnCDANPaoKxUg7GCOLjtF0Qqx0Yw7QYlT627sX3SMJtn60/3dvd0br27ta2NWtbaSzpv2lp7wc9xz67g6SQ6NeOvvbHF48eYWea+hVNF7aDDUIdYMT8dHuzDczRYhRCiXjamaKNhIMEyeAzG3UJDi7KLKVCKom2ekxEFfUBQ6BWbBRD4haRB5zrLlERD4onRJ3YSefiC3p4y02RhP66S+pml4yurwvY3FDEt3WeJStLepWluM/nseFkvN5hFvewLEsOJoPbEse2NZWSxhbMmJdx111te/fG+q5LeXinVFj/CJ25gYjzejdu6PlVRUYSuwkN74Nb//eALPxpoDzCk1fBD9xWbiuez5fgrmtwDa7BNbgG1+AaXINr8H8L8PuK/YGgD9n/E0NU/j+iuBES/yfIA1Rq2ATl/wrJy3Cn7ilYyxDLpf+IOG6a9td++sfPW5Q9ndPNBd/ok/XaH/0f+ah/OuN7f9b6yvd7emZL+fqx2v9S7vvfAf8Fjg3ofQplbmRzdHJlYW0KZW5kb2JqCjMzIDAgb2JqCjw8L0ZpbHRlci9GbGF0ZURlY29kZS9UeXBlL1hSZWYvTGVuZ3RoIDc0L1Jvb3QgNyAwIFIvV1sxIDIgMV0vU2l6ZSAzMy9JRFsoLHv08KD69FR7eaTQP3nxwikoLHv08KD69FR7eaTQP3nxwildL0luZm8gMjAgMCBSL0RlY29kZVBhcm1zPDwvQ29sdW1ucyA0L1ByZWRpY3RvciAxMj4+Pj4Kc3RyZWFtCngBtc6hEYAwFAPQJBxoFBZGwnHHFgzCSMyDaU0X+M0fouZdohIhAiJXgwYB4EBi+qrA30N6zFIMdzO/mW5zRN44s26ZLnQdSAs8CmVuZHN0cmVhbQplbmRvYmoKc3RhcnR4cmVmCjE5NzExCiUlRU9GCg=='

      // // Decode Base64 to binary and show some information about the PDF file (note that I skipped all checks)
      // const bin = atob(b64)
      // console.log('File Size:', Math.round(bin.length / 1024), 'KB')
      // console.log('PDF Version:', bin.match(/^.PDF-([0-9.]+)/)[1])
      // console.log('Create Date:', bin.match(/<xmp:CreateDate>(.+?)<\/xmp:CreateDate>/)[1])
      // console.log('Modify Date:', bin.match(/<xmp:ModifyDate>(.+?)<\/xmp:ModifyDate>/)[1])
      // console.log('Creator Tool:', bin.match(/<xmp:CreatorTool>(.+?)<\/xmp:CreatorTool>/)[1])

      // // Embed the PDF into the HTML page and show it to the user
      // const obj = document.createElement('object')
      // obj.style.width = '100%'
      // obj.style.height = '842pt'
      // obj.type = 'application/pdf'
      // obj.data = `data:application/pdf;base64,${b64}`
      // const binary = atob(b64.replace(/\s/g, ''))
      // const len = binary.length
      // const buffer = new ArrayBuffer(len)
      // const view = new Uint8Array(buffer)
      // // eslint-disable-next-line no-plusplus
      // for (let i = 0; i < len; i++) {
      //   view[i] = binary.charCodeAt(i)
      // }
      // const file = new Blob([view], { type: 'application/pdf' })
      // const fileURL = URL.createObjectURL(file)
      // window.open(fileURL)
      // // document.body.appendChild(obj)

      // // Insert a link that allows the user to download the PDF file
      // const link = document.createElement('a')
      // link.innerHTML = 'Download PDF file'
      // link.download = 'file.pdf'
      // link.href = `data:application/octet-stream;base64,${b64}`
    },
    onSubmitOptionPrintMobile(values) {
      this.valuesOption = values
      // this.$refs.html2Pdf.generatePdf()
      if (values === 150) {
        this.$refs.html2PdfThermal.generatePdf()
      } else if (values === 100) {
        this.$refs.html2PdfThermalSquare.generatePdf()
      } else {
        this.$refs.html2Pdf.generatePdf()
      }
    },
    onSubmitPrint(values) {
      // if (values) this.$refs.printLabelContent.printContent()

      this.$refs.html2Pdf.generatePdf()
    },
    handleAfterPrintLabel() {
      if (this.profile.is_onboarding) {
        this.$emit('onBoardingShow')
      } else {
        this.$router.push('history-pickup')
      }
    },
    getProfile() {
      this.loading = true
      this.$http_komship.post('v1/my-profile', {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(response => {
        this.profile = response.data.data
        this.getOrder()
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
      })
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
      }
      if (data.item.printIsActive === false) this.fieldItemsPrint.splice(data.index, 1)
      if (this.fieldItemsPrint[0] === undefined) this.disableButtonPrint = true
      this.totalLabel = this.fieldItemsPrint.length
    },
    getAllItemPrint() {
      if (this.allSelectItemPrint === true) {
        // eslint-disable-next-line no-plusplus
        for (let x = 0; x < this.items.length; x++) {
          this.items[x].printIsActive = true
          this.fieldItemsPrint.push(this.items[x])
        }
        this.disableButtonPrint = false
      }
      if (this.allSelectItemPrint === false) {
        this.fieldItemsPrint = []
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
      let result = ''
      if (data === 'REG19' || data === 'CTC') {
        result = 'Reguler'
      } else if (data === 'GOKIL' || data === 'SIUNTUNG') {
        result = data
      } else {
        result = data
      }
      return result
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
      console.log('result', this.itemsWeightProduct)
      console.log('data', data)
      return this.itemsWeightProduct
    },
  },
}
</script>

<style lang="scss">
  @import '../add-pickup-detail.scss';

  [dir] .expand-button-variation {
    text-align: right;
    position: absolute;
    right: 2rem;
    margin-top: -1.72rem;
  }

  [dir] .expand-button-variation-mobile {
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
  @media only screen and (min-width: 579px) {
    [dir] .wrapper__pagination__print__mobile {
        display: none!important;
    }
  }
  @media only screen and (max-width: 578px) {
    [dir] .wrapper__pagination__print {
        display: none!important;
    }
  }
</style>
