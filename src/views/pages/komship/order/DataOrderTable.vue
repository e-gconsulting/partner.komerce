<template>
  <section :class="'view-data-order-table-wrapper'">
    <b-table
      :ref="tableRefName"
      :filter="searchText"
      :items="items"
      :fields="fields"
      class="view-data-order-table"
      responsive
    >
      <template #cell(order_date)="dateData">
        <div class="date-wrapper">{{ getDate(dateData.value) }}</div>
        <div class="time-wrapper grey-text">{{ getTime(dateData.value) }}</div>
      </template>

      <template #cell(customer_name)="nameCustomer">
        <div class="name-wrapper">{{ nameCustomer.value }}</div>
        <div
          v-if="nameCustomer.item.is_komship === 1"
          class="tag-wrapper grey-text"
        >
          Kompship
        </div>
        <div
          v-else
          class="tag-wrapper grey-text"
        >
          Non-Kompship
        </div>
      </template>

      <template #cell(product)="productData">
        <div v-if="productData.value.length > 1">
          <div
            v-for="(prodItem, prodIndex) in productData.value"
            :key="prodIndex+'prodItem'"
            class="product-item-wrapper"
          >
            <div v-if="prodIndex !== 0">
              <b-collapse
                :id="`collapse${productData.index}`"
                class="mt-2"
              >
                <div class="product-name-img-wrapper">
                  <img src="prodItem.product_image">
                </div>
                <div class="product-name-wrapper">
                  <div class="product-name-content">
                    <div class="product-name-text">
                      {{ prodItem.product_name }}
                    </div>
                    <div class="product-name-variant-wrapper org-text">
                      {{ prodItem.product_variant.replace(' -', ',') }}
                    </div>
                  </div>
                  <div class="product-name-qty">
                    {{ `x${prodItem.qty}` }}
                  </div>
                </div>
              </b-collapse>
            </div>
            <div v-else>
              <div class="product-name-img-wrapper">
                <img src="prodItem.product_image">
              </div>
              <div class="product-name-wrapper">
                <div class="product-name-content">
                  <div class="product-name-text">
                    {{ prodItem.product_name }}
                  </div>
                  <div class="product-name-variant-wrapper org-text">
                    {{ prodItem.product_variant.replace(' -', ',') }}
                  </div>
                </div>
                <div class="product-name-qty">
                  {{ `x${prodItem.qty}` }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else>
          <div
            v-for="(prodItem, prodIndex) in productData.value"
            :key="prodIndex+'prodItem'"
            class="product-item-wrapper"
          >
            <div class="product-name-img-wrapper">
              <img src="prodItem.product_image">
            </div>
            <div class="product-name-wrapper">
              <div class="product-name-content">
                <div class="product-name-text">
                  {{ prodItem.product_name }}
                </div>
                <div class="product-name-variant-wrapper org-text">
                  {{ prodItem.product_variant.replace(' -', ',') }}
                </div>
              </div>
              <div class="product-name-qty">
                {{ `x${prodItem.qty}` }}
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="productData.value.length > 1"
          class="minmax-button-wrapper"
          @click="() => handleSetCollapseContent(productData.value.isClose, productData.index)"
        >
          <div v-if="!productData.value.isClose">
            Tutup
            <b-icon-chevron-up
              aria-hidden="true"
            />
          </div>
          <div v-else>
            {{ `${(productData.value.length - 1)} Produk lainnya` }}
            <b-icon-chevron-down
              aria-hidden="true"
            />
          </div>
        </div>
      </template>

      <template #cell(grand_total)="totalData">
        <div class="price-wrapper">{{ `Rp ${numberWithCommas(totalData.value)}` }}</div>
        <div
          v-if="totalData.item.payment_methode === 'COD'"
          class="label-wrapper"
        >
          {{ totalData.item.payment_methode }}
        </div>
        <div
          v-else
          class="label-wrapper"
        >
          Transfer
        </div>
        <div
          v-if="totalData.item.payment_methode !== 'COD'"
          :id="`popoverTable${totalData.item.order_id}`"
          class="tooltip-wrapper"
          @click="() => handleShowPopOver(`popoverTable${totalData.item.order_id}`)"
        >
          <b-icon-info-circle />
        </div>
        <b-popover
          v-if="totalData.item.payment_methode !== 'COD'"
          :id="`popoverTable${totalData.item.order_id}`"
          :ref="`popoverTable${totalData.item.order_id}`"
          :target="`popoverTable${totalData.item.order_id}`"
          triggers="click"
          placement="top"
        >
          <div class="data-order-table-pop-over">
            <b-form-group
              label="Nama Bank:"
              :label-for="`labelName-${totalData.item.order_id}`"
            >
              <div :id="`labelName-${totalData.item.order_id}`">{{ totalData.item.bank.bank_name }}</div>
            </b-form-group>
            <b-form-group
              label="No Rekening:"
              :label-for="`norek-${totalData.item.order_id}`"
            >
              <div :id="`norek-${totalData.item.order_id}`">{{ totalData.item.bank.account_no }}</div>
            </b-form-group>
            <b-form-group
              label="Pemilik Rekening"
              :label-for="`ownerRek-${totalData.item.order_id}`"
            >
              <div :id="`ownerRek-${totalData.item.order_id}`">{{ totalData.item.bank.account_name }}</div>
            </b-form-group>
          </div>
        </b-popover>
      </template>

      <template #cell(detail_address)="addressData">
        <div class="address-wrapper">{{ addressData.value }}</div>
      </template>

      <template #cell(airway_bill)="resiData">
        <div class="resi-wrapper">
          <div class="resi-content">{{ resiData.value }}</div>
          <div
            v-if="resiData.value"
            class="resi-content-icon"
            @click="() => handleCopy(resiData.value)"
          >
            <b-icon-front />
          </div>
        </div>
      </template>

      <template #cell(acc_date)="accDateData">
        <div class="date-wrapper">{{ getDate(accDateData.item.order_date) }}</div>
      </template>

      <template #cell(details)="detailsData">
        <div class="details-wrapper">
          <b-button
            class="detail-button"
            variant="outline-primary"
            @click="() => handleShowDetail(detailsData.item)"
          >
            Lihat Detail
          </b-button>
        </div>
      </template>

    </b-table>
  </section>
</template>

<script>
import {
  BTable,
  BButton,
  BIconFront,
  BIconInfoCircle,
  BIconChevronUp,
  BIconChevronDown,
  BPopover,
  BFormGroup,
  BCollapse,
} from 'bootstrap-vue'

export default {
  components: {
    BTable,
    BButton,
    BIconFront,
    BIconChevronUp,
    BIconChevronDown,
    BIconInfoCircle,
    BPopover,
    BFormGroup,
    BCollapse,
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
    currentView: {
      type: String,
      default: 'all',
    },
    searchText: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      openId: '',
    }
  },
  mounted() {
    this.setIsCloseValue()
  },
  methods: {
    getDate(dateVal) {
      if (dateVal) {
        let today = dateVal.split(' ')
        let month = today[1]
        const monthArr = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
        month = (monthArr.indexOf(month) + 1) > 9 ? (monthArr.indexOf(month) + 1) : `0${(monthArr.indexOf(month) + 1)}`
        today = `${today[0]}-${month}-${today[2]}`
        return today
      }
      return dateVal
    },
    getTime(dateVal) {
      if (dateVal) {
        const today = dateVal.split(' ')
        let time = today[3].split(':')
        time = `${time[0]}.${time[1]}`
        return time
      }
      return dateVal
    },
    numberWithCommas(x) {
      if (x) return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, '.')
      return x
    },
    handleCopy(val) {
      if (val) navigator.clipboard.writeText(val)
    },
    handleShowPopOver(val) {
      if (val) {
        if (val === this.openId) {
          this.$root.$emit('bv::hide::popover', val)
        } else {
          this.openId = val
          this.$root.$emit('bv::show::popover', val)
        }
      }
    },
    handleShowDetail(val) {
      if (val) {
        this.$emit('onOpenDetailView', val)
      }
    },
    addTotalItem(itemSelected, param) {
      this.$emit('onAddTotalItem', itemSelected, param)
    },
    handleShowVariation(productId, selectedDataVariation) {
      this.$emit('onShowPopUp', productId, selectedDataVariation)
    },
    refreshTable() {
      this.$refs[this.tableRefName].refresh()
    },
    setIsCloseValue() {
      for (let i = 0; i < this.items.length; i += 1) {
        if (this.items[i] && this.items[i].product && this.items[i].product.length && this.items[i].product.length > 0) {
          for (let j = 0; j < this.items[i].product.length; j += 1) {
            this.items[i].product.isClose = true
          }
        }
      }
    },
    handleSetCollapseContent(isClose, indexData) {
      this.items[indexData].product.isClose = !isClose
      this.$root.$emit('bv::toggle::collapse', `collapse${indexData}`)
      this.refreshTable()
    },
  },
}

</script>

<style>

</style>
