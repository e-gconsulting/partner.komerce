/* eslint-disable vue/no-unused-vars */
<template>
  <div class="add-pickup-table-wrapper">
    <div class="add-pickup-table-title">
      Orderan
    </div>
    <div
      class="add-pickup-table-content-animated"
      :style="{ maxHeight: (isExpand ? (items && items.length ? `${ (items.length * 100.15) + 43.85 }px` : '100%') : '244.15px') }"
    >
      <b-table
        :fields="fields"
        :items="items"
        borderless
      >

        <template #head(qty)="data">
          <div class="add-pickup-header-table-qty">
            {{ data.label }}
          </div>
        </template>

        <template #cell(product)="productData">
          <div
            v-for="(prodItem, prodIndex) in productData.value"
            :key="prodIndex+'prodItem'"
            class="product-item-wrapper"
          >
            <div class="product-name-img-wrapper">
              <img
                :src="prodItem.product_image"
                alt
              >
            </div>
            <div class="product-name-wrapper">
              <div class="product-name-content">
                <div class="product-name-text">
                  {{ prodItem.product_name }}
                </div>
                <div class="product-name-variant-wrapper org-text">
                  {{ (prodItem && prodItem.variant_name) ? (prodItem.variant_name.replace(' -', ',')) : ((prodItem && prodItem.product_variant_name) ? (prodItem.product_variant_name.replace(' -', ',')) : '') }}
                </div>
              </div>
              <div class="product-name-wrapper">
                <button
                  class="text-red-500 outline-none font-medium rounded-lg text-sm"
                  @click="generateReport"
                >
                  Download Resi
                </button>
              </div>
            </div>

          </div>
        </template>

        <template #cell(qty)="jumlahData">
          <div
            v-for="(prodItem, prodIndex) in jumlahData.item.product"
            :key="prodIndex+'jumlahProdukItem'"
            class="product-item-wrapper total-product-item-wrapper-on-pickup"
          >
            <div class="product-name-qty">
              {{ `x${prodItem.qty}` }}
            </div>
          </div>
        </template>

      </b-table>
    </div>

    <div
      v-if="items.length === 0"
      class="add-pickup-input-notice-empty"
    >
      <div class="add-pickup-input-notice-title">
        Pilih orderan  yang akan di pickup
      </div>
      <div class="add-pickup-input-notice-button">
        <b-button
          class="org-button"
          @click="onChooseOrder"
        >
          Pilih Orderan
        </b-button>
      </div>
    </div>

    <div
      v-else
      class="add-pickup-input-notice-filled mb-2"
    >
      <div
        :class="`add-pickup-input-notice-filled-button ${ items && items.length && items.length < 3 ? 'hide-details-button' : '' }`"
        @click="handleOpenDetailView"
      >
        Lihat detail...
      </div>
      <div class="add-pickup-input-notice-filled-desc">
        Total Produk : <span class="ml-2">{{ this.genTotalAmount(items) }}</span>
      </div>
    </div>
    <vue-html2pdf
      :enable-download="false"
      ref="html2Pdf"
      :show-layout="false"
      :float-layout="true"
      :preview-modal="true"
      :paginate-elements-by-height="1400"
      filename="hee hee"
      :pdf-quality="2"
      :manual-pagination="false"
      pdf-format="a4"
      pdf-orientation="portrait"

      pdf-content-width="100%"
      @progress="onProgress($event)"
      @hasStartedGeneration="hasStartedGeneration()"
      @hasGenerated="hasGenerated($event)"
    >
      <section slot="pdf-content">
        <div
          class="w-full h-full"
          style="padding-left: 20px; padding-right: 20px; padding-top:24px"
        >
          <div
            class="flex flex-col w-full space-y-4 border border-black"
            style="padding-left: 12px; padding-right:12px; padding-top:8px; padding-bottom:16px"
          >
            <div class="grid grid-cols-3 gap-2">
              <div class="col-span-1">
                Barcode
              </div>
              <div class="col-span-1">
                Logo Expedisi
              </div>
              <div class="col-span-1">
                Logo Kommerce
              </div>
            </div>
            <div
              style="margin-top: 9px"
              class="grid grid-cols-2 gap-2"
            >
              <div class="col-span-1 border border-black flex flex-col space-y-1">
                <h3 class="text-lg w-full justify-center text-black flex center">
                  PENGIRIM
                </h3>
                <div class="flex  flex-row space-x-2">
                  <feather-icon icon="user-icon" />
                  <div class="text-base text-black font-light">
                    Wahyu
                  </div>
                </div>
              </div>
              <div class="col-span-1 border border-black">
                <h3 class="text-lg w-full justify-center text-black flex center">
                  PENERIMA
                </h3>
                sadasd
              </div>
            </div>
            <div class="grid grid-cols-3 gap-2">
              <div class="col-span-1 border-black py-2 px-2  border flex justify-center text-black font-black">
                COD
              </div>
              <div class="col-span-2 border-black px-2 py-2 items-center  border flex flex-row space-x-2">
                <div class="font-bold text-black">Order ID</div>
                <div class="flex flex-col justify-center">
                  <div>barcode</div>
                  <div class="text-xs">123456</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </vue-html2pdf>
  </div>
</template>

<script>
import {
  BTable,
  BButton,
} from 'bootstrap-vue'
import VueHtml2pdf from 'vue-html2pdf'

export default {
  components: {
    BTable,
    BButton,
    VueHtml2pdf,
  },
  props: {
    fields: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isExpand: false,
    }
  },
  methods: {
    handleOpenDetailView() {
      this.isExpand = !this.isExpand
    },
    generateReport() {
      this.$refs.html2Pdf.generatePdf()
    },
    onChooseOrder() {
      this.$emit('onChooseOrder')
    },
    genTotalAmount(arrValue) {
      let amount = 0
      for (let i = 0; i < arrValue.length; i += 1) {
        if (arrValue[i] && arrValue[i].product && arrValue[i].product.length && arrValue[i].product.length > 0) {
          for (let j = 0; j < arrValue[i].product.length; j += 1) {
            amount += arrValue[i].product[j].qty
          }
        }
      }
      return amount
    },
  },
}
</script>

<style lang="scss">
  @import 'add-pickup-table.scss';
</style>
