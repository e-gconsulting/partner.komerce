<template>
  <b-card>
    <div class="">
      <b-button
        variant="primary"
        size="sm"
        class="mr-1 rounded-lg p-0"
        @click="handleBack()"
      >
        <feather-icon
          size="2x"
          icon="ChevronLeftIcon"
        />
      </b-button>
      <h4 class="font-bold text-black d-inline-flex mb-0">
        Tambah Stok Produk
      </h4>
    </div>
    <div class="mt-2">
      <BTable
        ref="selectableTable"
        striped
        hover
        responsive
        :items="items"
        :fields="fields"
        empty-text="Tidak ada data yang ditampilkan."
        :select-mode="`multi`"
        selectable
        show-empty
        @row-selected="onRowSelected"
      >
        <template #head(checkbox)>
          <BCheckbox
            v-model="isSelected"
            @change="selectAllRows()"
          />
        </template>
        <template #cell(checkbox)="value">
          <BCheckbox
            v-model="selected"
            :value="value.item"
            @change="select"
          />
        </template>

        <template #cell(product_name)="value">
          <div
            class="d-flex align-items-center"
          >
            <img
              :src="handleImage(value.item.image_path)"
              class="mr-1"
              style="width: 40px"
            >
            <div class="d-flex flex-column ml-1">
              <h6 class="text-black font-bold mb-0.5">
                {{ value.item.product_name }}
              </h6>
              <p
                class="my-0"
                style="color: #ff6a3a"
              >
                SKU: {{ value.item.sku }}
              </p>
            </div>
          </div>
        </template>
        <template #cell(variant)="data">
          <div class="space-y-4 text-start">
            <div
              v-if="data.item.is_variant === 0"
            >
              <div>
                {{ '-' }}
              </div>
            </div>
            <div
              v-for="i in data.item.variant"
              :key="i.option_id"
            >
              <div class="">
                {{ i.variant_name ? i.variant_name : 'null' }}
              </div>
            </div>
          </div>
        </template>
        <template #cell(product_stock)="data">
          <div
            v-if="(data.item.is_variant === 1)"
            class="space-y-3 my-1"
          >
            <div
              v-for="i in data.item.variant"
              :key="i.option_id"
              class="d-flex justify-center"
            >
              <b-button
                variant="outline-primary"
                class="p-0"
                style="border-radius:50%;width:25px;height:25px"
                size="sm"
                :disabled="i.stock <= 1"
                @click="setQuantity('minus', data.index, data.item.variant.map(object => object.option_id).indexOf(i.option_id))"
              >
                <span class="font-bold text-lg">-</span>
              </b-button>
              <span
                class="text-lg"
                style="margin: 0 10px"
              >{{ i.stock }}</span>
              <b-button
                variant="outline-primary"
                class="p-0"
                style="border-radius:50%;width:25px;height:25px"
                size="sm"
                @click="setQuantity('plus', data.index, data.item.variant.map(object => object.option_id).indexOf(i.option_id))"
              >
                <span class="font-bold text-lg">+</span>
              </b-button>
            </div>
          </div>
          <div
            v-else
            class="my-1"
          >
            <b-button
              variant="outline-primary"
              class="p-0"
              style="border-radius:50%;width:25px;height:25px"
              size="sm"
              :disabled="data.item.stock <= 1"
              @click="data.item.stock -= 1"
            >
              <span class="font-bold text-lg">-</span>
            </b-button>
            <span
              class="text-lg"
              style="margin: 0 10px"
            >{{ data.item.stock }}</span>
            <b-button
              variant="outline-primary"
              class="p-0"
              style="border-radius:50%;width:25px;height:25px"
              size="sm"
              @click="data.item.stock +=1"
            >
              <span class="font-bold text-lg">+</span>
            </b-button>
          </div>
        </template>
      </BTable>
    </div>
  </b-card>
</template>

<script>
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  name: 'TambahProductInbound',
  data() {
    return {
      // table
      items: [],
      fields: [
        {
          key: 'checkbox',
          label: '',
          thClass: 'text-black text-capitalize',
          class: 'bg-white',
          thStyle: {
            textTransform: 'capitalize',
            fontSize: '13px',
            color: 'black',
          },
          tdClass: 'text-black',
        },
        {
          key: 'product_name',
          label: 'Nama Produk',
          thClass: 'text-black text-capitalize',
          class: 'bg-white',
          thStyle: {
            textTransform: 'capitalize',
            fontSize: '13px',
            color: 'black',
          },
          tdClass: 'text-black',
        },
        {
          key: 'variant',
          label: 'Variasi',
          thClass: 'text-black text-start text-capitalize',
          class: 'bg-white',
          thStyle: {
            textTransform: 'capitalize',
            fontSize: '13px',
            color: 'black',
          },
          tdClass: 'text-black',
        },
        {
          key: 'product_stock',
          label: 'Stock Product',
          thClass: 'text-black text-capitalize',
          class: 'bg-white text-center',
          thStyle: {
            textTransform: 'capitalize',
            fontSize: '13px',
            color: 'black',
          },
          tdClass: 'text-black',
        },
      ],
      selected: [],
      isSelected: false,

      // warehouse id
      detail: JSON.parse(localStorage.getItem('detailInbound')),
    }
  },

  created() {
    this.fetchListProduct()
  },

  methods: {
    fetchListProduct() {
      this.$http_komship.get(`/v1/komship/inbound/${this.detail.warehouse_id}/products`)
        .then(response => {
          const { data } = response.data
          this.data = data
          this.items = data
        }).catch(() => {
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

    setQuantity(status, product, variant) {
      if (status === 'plus') {
        this.items[product].variant[variant].stock += 1
      } else if (status === 'minus') {
        this.items[product].variant[variant].stock -= 1
      }
    },

    selectAllRows() {
      if (this.isSelected) {
        this.$refs.selectableTable.selectAllRows()
      }
      if (!this.isSelected) {
        this.$refs.selectableTable.clearSelected()
      }
    },

    onRowSelected(items) {
      this.selected = items
    },

    handleBack() {
      this.$emit('back')
    },

    handleImage(image) {
      if (image === null) {
        return 'https://storage.googleapis.com/komerce/assets/icons/product-placehold.svg'
      }
      return image
    },
  },
}
</script>
