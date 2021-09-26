<template>
  <section :class="isEditable ? 'view-order-table' : 'view-order-table-no-edit'">
    <b-table
      :ref="tableRefName"
      :items="items"
      :fields="fields"
      class="add-order-table"
      responsive
    >
      <template
        v-if="!isEditable"
        #head(total)="totalData"
      >
        <div class="div-mid-text">{{ totalData.label }}</div>
      </template>
      <template #cell(name)="nameData">
        <div class="add-product-name-wrapper">
          <div class="product-name-img-wrapper">
            <img src="nameData.value.img">
          </div>
          <div class="product-name-desc">
            <div class="product-name-text">{{ nameData.value.text }}</div>
            <b-button
              v-if="isEditable && nameData.value.isVariation && nameData.value.selectedVariationData.length < 1"
              class="product-name-button"
              variant="outline-primary"
              @click="handleShowVariation(nameData.item.id, nameData.value.variation)"
            >
              Pilih Variasi
            </b-button>
            <div
              v-if="isEditable && nameData.value.selectedVarText"
              class="variation-text-content"
            >
              Variasi : {{ nameData.value.selectedVarText }}
            </div>
            <div
              v-if="!isEditable && nameData.value.selectedVarText"
              class="variation-text-content"
            >
              Variasi : {{ nameData.value.selectedVarText }}
            </div>
          </div>
        </div>
      </template>

      <template #cell(total)="inputData">
        <div class="add-product-total-wrapper">
          <div
            v-if="isEditable"
            class="product-total-input-wrapper"
          >
            <b-button
              class="minus-button"
              variant="outline-primary"
              @click="addTotalItem(inputData.item, '-')"
            >
              -
            </b-button>
            <div class="input-text">{{ inputData.value.input }}</div>
            <b-button
              v-if="(inputData.value.isStockExist && (inputData.value.stock - inputData.value.input) > 0) || !inputData.value.isStockExist"
              class="plus-button"
              variant="outline-primary"
              @click="addTotalItem(inputData.item, '+')"
            >
              +
            </b-button>
          </div>
          <div
            v-if="isEditable && inputData.value.isStockExist"
            class="product-stock-input"
          >
            {{ "Stok tersedia: " + (inputData.value.isFirstAfterAdd ? (inputData.value.stock-1) : (inputData.value.stock - inputData.value.input)) }}
          </div>
          <div
            v-if="!isEditable"
            class="product-total-input-wrapper no-mg"
          >
            <div class="input-text div-mid-text">{{ inputData.value.input }}</div>
          </div>
        </div>
      </template>
    </b-table>
  </section>
</template>

<script>
import {
  BTable,
  BButton,
} from 'bootstrap-vue'

export default {
  components: {
    BTable,
    BButton,
  },
  props: {
    tableRefName: {
      type: String,
      default: 'tableOne',
    },
    fields: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },
    isEditable: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    addTotalItem(itemSelected, param) {
      this.$emit('onAddTotalItem', itemSelected, param)
    },
    handleShowVariation(productId, selectedDataVariation) {
      this.$emit('onShowPopUp', productId, selectedDataVariation)
    },
    refreshTable() {
      this.$refs[this.tableRefName].refresh()
    },
  },
}

</script>

<style>

</style>
