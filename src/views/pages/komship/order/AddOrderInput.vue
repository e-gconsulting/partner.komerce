<template>
  <div class="add-order-main-wrapper">
    <b-card-title class="mb-4">Tambah Order</b-card-title>
    <div class="add-order-dsc-title top-right">Pengiriman Kompship</div>
    <section class="add-order-form mb-4">
      <b-form-group
        class="add-order-label mb-2"
        label="Tanggal"
        label-cols-md="2"
        label-for="input-date"
      >
        <div class="add-order-date-label">{{ dateLabel }}</div>
        <b-form-datepicker
          id="input-date"
          ref="dp1"
          v-model="dateValue"
          class="add-order-date-button"
          button-only
          @context="onChangeDate"
        />
      </b-form-group>
      <b-form-group
        class="add-order-label"
        label="Pilih Produk"
        label-cols-md="2"
      >
        <v-select
          class="add-order-product-input"
          label="product_name"
          label-cols-md="2"
          :options="listProduct"
          @input="onAddProduct"
        />
      </b-form-group>
    </section>

    <add-order-table
      ref="tableAddOrderOne"
      :items="selectedItems"
      :fields="fields"
      table-ref-name="tableAddOrder"
      :is-editable="true"
      @onShowPopUp="handleShowVariationPopUp"
      @onAddTotalItem="onChangeSelectedProduct"
    />

    <section class="view-order-summary">
      <div class="add-order-summary-text"><span>{{ selectedItems.length }}</span> Produk ditambahkan</div>
      <div class="add-order-summary-button-wrapper">
        <b-button
          v-if="selectedItems.length > 0"
          class="cancel-button"
          variant="outline-primary"
          @click="deleteAllSelectedItems"
        >
          Batalkan
        </b-button>
        <b-button
          v-else
          class="cancel-button hide"
          variant="outline-primary"
        >
          Batalkan
        </b-button>
        <b-button
          class="next-button"
          @click="onUpdateScreenViewParent"
        >
          Lanjutkan
        </b-button>
      </div>
    </section>
    <b-modal
      id="modal-1"
      ref="modalVariationAddOrder"
      hide-footer
      hide-header
    >
      <div class="modal-add-order-variation">
        <b-form-group
          v-for="(selectedVar, indexVar) in selectedVariation"
          :key="indexVar+'selectedVar'"
        >
          <label :for="indexVar+'selectedVar'">{{ selectedVar.variant_name }}</label>
          <b-button
            v-for="(selectedVarItem, indexVarItem) in selectedVar.variant_option"
            :key="indexVarItem+'selectedVarItem'"
            :class="'add-order-modal-header-item-button' + (selectedVar.indexSelected === indexVarItem ? ' add-order-modal-selected' : '')"
            :disabled="(!selectedVarItem.isAvailable)"
            @click="updateSelectedVariation(indexVarItem, indexVar)"
          >
            {{ selectedVarItem.option_name }}
          </b-button>
        </b-form-group>
        <div class="add-order-variation-modal-submit">
          <b-button
            class="next-button"
            @click="handleUpdateSelectedVariationInsideList()"
          >
            Ok
          </b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import {
  BCardTitle,
  BFormDatepicker,
  BFormGroup,
  BButton,
} from 'bootstrap-vue'
import AddOrderTable from './AddOrderTable.vue'

function changeDate(dateString) {
  if (dateString && dateString !== '') {
    let today = new Date(dateString)
    const dd = today.getDate()
    const monthArr = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
    const mm = today.getMonth()
    const yyyy = today.getFullYear()
    today = `${dd} ${monthArr[mm]} ${yyyy}`
    return today
  }
  return dateString
}

function numberWithCommas(x) {
  if (x) return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, '.')
  return x
}

function checkSameById(itemId, listData) {
  const index = -1
  for (let i = 0; i < listData.length; i += 1) {
    if (listData && listData[i] && listData[i].id && listData[i].id === itemId) return i
  }
  return index
}

function updateIndexNumber(selectedItemsArr) {
  if (selectedItemsArr && selectedItemsArr.length > 0) {
    const newselectedItemsArr = selectedItemsArr
    for (let i = 0; i < selectedItemsArr.length; i += 1) {
      newselectedItemsArr[i].no = i + 1
    }
    return newselectedItemsArr
  }
  return selectedItemsArr
}

function genVarText(varArr) {
  if (varArr && varArr.length && varArr.length > 0) {
    let newText = ''
    for (let i = 0; i < varArr.length; i += 1) {
      newText += varArr[i].variant_option[varArr[i].indexSelected].option_name + (i !== (varArr.length - 1) ? ', ' : '')
    }
    return newText
  }
  return ''
}

function checkSameByName(itemName, listData) {
  const index = -1
  for (let i = 0; i < listData.length; i += 1) {
    if (listData && listData[i] && listData[i].name && listData[i].name.text && listData[i].name.text === itemName) return i
  }
  return index
}

function checkSameByVariantId(itemId, listData) {
  const index = -1
  for (let i = 0; i < listData.length; i += 1) {
    if (listData && listData[i] && listData[i].variantId && listData[i].variantId.length && listData[i].variantId.length > 0) {
      return listData[i].variantId.indexOf(itemId)
    }
  }
  return index
}

function checkSameByVariantNameId(itemName, itemId, listData) {
  const index = -1
  for (let i = 0; i < listData.length; i += 1) {
    if (listData && listData[i] && listData[i].name && listData[i].name === itemName
      && listData[i].option_parent && listData[i].option_parent === itemId
    ) return i
  }
  return index
}

function updateSelectedProductVariant(productId, prodVarList, changedList, changedStockAmount, isDelete = false) {
  let isContinue = false
  if (prodVarList && prodVarList.length && prodVarList.length > 0
    && changedList && changedList.length && changedList.length > 0
    && productId && productId !== '' && changedStockAmount
  ) {
    const newChangedList = changedList
    for (let j = 0; j < changedList.length; j += 1) {
      if ((changedList[j] && changedList[j].variantId && changedList[j].variantId.indexOf(productId) > -1) || isDelete) {
        isContinue = true
      }
      if (isContinue) {
        for (let i = 0; i < prodVarList.length; i += 1) {
          const selectedVariantIdx = prodVarList[i].indexSelected
          const selectedVariant = prodVarList[i].variant_option[selectedVariantIdx]
          const optionName = selectedVariant.option_name
          const optionId = selectedVariant.option_id
          const indexFindVarParent = checkSameByVariantNameId(optionName, optionId, changedList[j].variantList)

          if (indexFindVarParent > -1) {
            newChangedList[j].variantList[indexFindVarParent].stock += changedStockAmount
          }
        }
      }
    }
    return newChangedList
  }
  return changedList
}

function setStatusButtonVariationPopUp(listData) {
  if (listData && listData.length && listData.length > 0) {
    const newListData = listData
    for (let i = 0; i < listData.length; i += 1) {
      if (listData[i].variant_option && listData[i].variant_option.length && listData[i].variant_option.length > 0) {
        for (let j = 0; j < listData[i].variant_option.length; j += 1) {
          newListData[i].variant_option[j].isAvailable = true
        }
      }
    }
    return newListData
  }
  return listData
}

export default {
  components: {
    BCardTitle,
    BFormDatepicker,
    BFormGroup,
    BButton,
    vSelect,
    AddOrderTable,
  },
  props: {
    screens: {
      type: String,
      default: '',
    },
    dateText: {
      type: String,
      default: '',
    },
    listProduct: {
      type: Array,
      default: () => [],
    },
    listSelected: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      dateValue: this.dateText,
      dateLabel: '',
      fields: [
        { key: 'no', label: 'No' },
        { key: 'name', label: 'Nama Produk' },
        { key: 'price', label: 'Harga Satuan' },
        { key: 'total', label: 'Jumlah' },
        { key: 'subtotal', label: 'Subtotal' },
      ],
      selectedItems: this.listSelected,
      selectedVariation: [],
      selectedProductVariant: [],
      selectedProdukIndexOnModal: -1,
    }
  },
  methods: {
    onChangeDate(ctx) {
      if (ctx && ctx.activeYMD) {
        this.dateLabel = changeDate(ctx.activeYMD)
        this.$emit('onUpdateDate', ctx.activeYMD)
      }
    },
    handleShowVariationPopUp(productId, selectedDataVariation) {
      const container = selectedDataVariation
      for (let i = 0; i < selectedDataVariation.length; i += 1) {
        container[i].indexSelected = 0
      }
      this.selectedVariation = container
      this.selectedProdukIndexOnModal = checkSameById(productId, this.selectedItems)
      this.$root.$emit('bv::show::modal', 'modal-1')
    },
    updateSelectedVariation(indexItem, variationItemIndex) {
      const currentSelectedVariation = this.selectedVariation
      if (currentSelectedVariation && currentSelectedVariation[variationItemIndex]) {
        currentSelectedVariation[variationItemIndex].indexSelected = indexItem
      }
      this.selectedVariation = currentSelectedVariation
      this.$forceUpdate()
    },
    handleUpdateSelectedVariationInsideList() {
      const currentSelectedVariation = this.selectedVariation
      const crIdx = this.selectedProdukIndexOnModal
      if (this.selectedItems && this.selectedItems[crIdx] && this.selectedItems[crIdx].name
        && this.selectedItems[crIdx].name.variation && currentSelectedVariation && currentSelectedVariation.length > 0
      ) {
        this.selectedItems[crIdx].name.selectedVariationData = currentSelectedVariation
        this.selectedItems[crIdx].name.selectedVarText = genVarText(currentSelectedVariation)
        this.selectedItems[crIdx].total.isStockExist = true

        const inputAmountToVarStock = (this.selectedItems[crIdx].total.input * -1)
        this.selectedProductVariant = updateSelectedProductVariant(this.selectedItems[crIdx].id, this.selectedItems[crIdx].name.selectedVariationData, this.selectedProductVariant, inputAmountToVarStock)

        this.onUpdateSelectedItemsOnParent()
      }
      /* reset the variable after update the variation option : when user click ok button on variation popup */
      this.resetTmpContainerOnTable()
      this.$root.$emit('bv::hide::modal', 'modal-1')
      this.$refs.tableAddOrderOne.refreshTable()
    },
    onAddProduct(itemSelected) {
      if (itemSelected) {
        const currentIndex = this.selectedItems.length + 1
        const findIndexByName = checkSameByName(itemSelected.product_name, this.selectedItems)

        const container = {
          id: `selectedProduct${itemSelected.product_id + (Math.floor(Math.random() * 100))}`,
          no: currentIndex,
          name: {
            text: itemSelected.product_name,
            isVariation: itemSelected.is_variant,
            img: itemSelected.product_image,
            selectedVariationData: [],
            variation: setStatusButtonVariationPopUp(itemSelected.variant),
            selectedVarText: '',
          },
          priceNumber: itemSelected.price,
          price: `Rp ${numberWithCommas(itemSelected.price)}`,
          subtotal: `Rp ${numberWithCommas(itemSelected.price)}`,
          total: {
            input: 1,
            stock: itemSelected.stock,
            isStockExist: !itemSelected.is_variant,
            isFirstAfterAdd: true,
          },
        }
        const variantContainer = {
          id: `productVariantWrap${itemSelected.product_id + (Math.floor(Math.random() * 100))}`,
          variantId: [container.id],
          variantList: itemSelected.product_variant,
        }

        const findIndex = checkSameById(container.id, this.selectedItems)
        if (findIndex < 0) this.selectedItems.push(container)

        /* update selectedProductVariant for track the stock of the product with variant */
        const findProdVarIndex = checkSameById(variantContainer.id, this.selectedProductVariant)
        let itemId = -1
        if (findIndexByName < 0 && findProdVarIndex < 0) {
          this.selectedProductVariant.push(variantContainer)
        } else if (findIndexByName > -1 && findProdVarIndex < 0) {
          itemId = checkSameByVariantId(this.selectedItems[findIndexByName].id, this.selectedProductVariant)
          if (itemId > -1) this.selectedProductVariant[itemId].variantId.push(container.id)
        }

        this.onUpdateSelectedItemsOnParent()
      }
    },
    onChangeSelectedProduct(itemSelected, param) {
      if (itemSelected && param) {
        const currentIndex = checkSameById(itemSelected.id, this.selectedItems)
        const inputAmount = param === '+' ? (itemSelected.total.input + 1) : (itemSelected.total.input - 1)
        const findIndexByName = checkSameByName(itemSelected.name.text, this.selectedItems)
        const isRemoveItem = inputAmount === 0

        let idIdx = -1
        if (this.selectedProductVariant[findIndexByName] && this.selectedProductVariant[findIndexByName].variantId) {
          idIdx = this.selectedProductVariant[findIndexByName].variantId.indexOf(itemSelected.id)
        }

        if (!isRemoveItem && currentIndex > -1) {
          const price = itemSelected.priceNumber * inputAmount
          const container = itemSelected
          container.subtotal = `Rp ${numberWithCommas(price)}`
          container.total.input = inputAmount
          if (container.total.isFirstAfterAdd) container.total.isFirstAfterAdd = !container.total.isFirstAfterAdd
          this.selectedItems[currentIndex] = container
          const inputAmountToUpdateStock = param === '+' ? -1 : 1

          if (container && container.name && !container.name.isVariation) {
            this.selectedItems[currentIndex].total.stock = container.total.stock + inputAmountToUpdateStock
          } else {
            /* Update selected product variant */
            this.selectedProductVariant = updateSelectedProductVariant(itemSelected.id, itemSelected.name.selectedVariationData, this.selectedProductVariant, inputAmountToUpdateStock)
          }
        } else if (isRemoveItem && currentIndex > -1) {
          this.selectedItems.splice(currentIndex, 1)
          this.selectedItems = updateIndexNumber(this.selectedItems)

          /* Update selected product variant */
          if (idIdx > -1) this.selectedProductVariant[findIndexByName].variantId.splice(idIdx, 1)
          this.selectedProductVariant = updateSelectedProductVariant(itemSelected.id, itemSelected.name.selectedVariationData, this.selectedProductVariant, 1, true)
        }

        this.onUpdateSelectedItemsOnParent()
        this.$refs.tableAddOrderOne.refreshTable()
      }
    },
    onUpdateSelectedItemsOnParent() {
      this.$emit('onUpdateSelectedItems', this.selectedItems)
    },
    onUpdateScreenViewParent() {
      const newInputScreen = this.screens === 'input' ? 'details' : 'input'
      this.$emit('onUpdateScreenView', newInputScreen)
    },
    deleteAllSelectedItems() {
      this.selectedItems = []
      this.resetTmpContainerOnTable()
      this.onUpdateSelectedItemsOnParent()
    },
    resetTmpContainerOnTable() {
      this.selectedVariation = []
      this.selectedProdukIndexOnModal = 0
      this.selectedProdukIndexOnModal = -1
    },
  },
}
</script>
