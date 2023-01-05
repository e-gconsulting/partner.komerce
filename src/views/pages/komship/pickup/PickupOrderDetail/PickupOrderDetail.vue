<template>
  <b-card id="pickup-order-detail">
    <b-row class="mb-2 px-1">
      <b-button
        variant="primary"
        class="rounded-lg my-auto"
        size="sm"
        @click="goBack"
      >
        <b-icon-chevron-left />
      </b-button>
      <span class="font-bold text-[22px] ml-2 my-auto">
        Detail Orderan Pickup
      </span>
    </b-row>
    <b-alert
      v-if="$route.params.order_data_id === undefined"
      variant="primary"
      class="p-1"
      show
      dismissible
    >
      *Ajukan pickup terlebih dahulu untuk mendapatkan label dan nomor resi
    </b-alert>
    <b-row
      v-else
      class="p-0 mb-1"
    >
      <b-col
        cols="12"
        class="text-right"
      >
        <v-select
          v-model="shipment"
          :options="listShipment"
          placeholder="Pilih Ekspedisi"
          class="d-inline-block mb-1"
          style="width:205px"
          @input="getOrderDataByExpedition"
        />
        <b-button
          :variant="listOrderPrint.length < 1 ? 'secondary' : 'primary'"
          class="d-inline-block ml-1"
          :disabled="listOrderPrint.length < 1"
          @click="popupPrintLabel"
        >
          <span class="text-[14px] font-semibold">Print Label
            <span v-if="listOrderPrint.length > 0">({{ listOrderPrint.length }})</span>
          </span>
        </b-button>
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
      <b-table
        hover
        striped
        show-empty
        responsive
        empty-text="Tidak ada data untuk ditampilkan."
        :busy="loading"
        :fields="fieldOrder"
        :items="order"
      >
        <template #head(no)>
          <div v-if="$route.params.order_data_id === undefined">
            No
          </div>
          <div v-else>
            <b-form-checkbox
              v-model="checklistAllOrder"
              @input="selectAllOrder"
            />
          </div>
        </template>
        <template #cell(no)="data">
          <div v-if="$route.params.order_data_id === undefined">
            {{ data.index + 1 }}
          </div>
          <div v-else>
            <b-form-checkbox
              v-model="listOrderPrint"
              :value="data.item"
            />
          </div>
        </template>
        <template #cell(order_date)="data">
          <span class="font-bold">{{ data.item.order_date.slice(0, 10) }}</span><br>
          <span>{{ data.item.order_date.slice(11, -3) }}</span>
        </template>
        <template #cell(product)="data">
          <div v-if="data.item.product[0]">
            <div
              class="d-flex"
              style="min-width:160px!important"
            >
              <div v-if="data.item.product[0].product_image === null">
                <img
                  class="image-product"
                  :src="imageNull"
                >
              </div>
              <div v-else>
                <img
                  class="image-product"
                  :src="data.item.product[0].product_image"
                  @error="setImageDefault"
                >
              </div>
              <div
                class="ml-1 w-[70%]"
              >
                <span class="font-bold">{{ data.item.product[0].product_name }}</span><br>
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
            <div
              v-if="data.item.product.length > 1"
              style="min-width:160px!important"
            >
              <b-collapse :id="'collapse-'+data.item.order_id">
                <div
                  v-for="item in data.item.product.slice(1)"
                  :key="item.order_id"
                  class="d-flex mt-1"
                  style="min-width:160px!important"
                >
                  <div v-if="item.product_image === null">
                    <img
                      class="image-product"
                      :src="imageNull"
                    >
                  </div>
                  <div v-else>
                    <img
                      class="image-product"
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

        <template #cell(customer_name)="data">
          <h5 class="text-top">
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
            <span class="ml-50">
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
      </b-table>
    </b-overlay>
    <b-modal
      id="printLabel"
      size="xl"
      hide-header
      scrollable
    >
      <b-img
        src="@/assets/images/icons/close-circle.svg"
        class="absolute right-[1rem] top-[1rem]"
        role="button"
        @click="$bvModal.hide('printLabel')"
      />
      <p class="text-center font-bold text-[24px] my-3">
        Pilih Bentuk Print Label
      </p>
      <b-row class="justify-content-center">
        <b-col cols="auto">
          <b-card
            class="card-print-label"
            :class="formatPrint === 'page_1' ? 'active' : ''"
            role="button"
            @click="formatPrint = 'page_1'"
          >
            <div class="label-preview">
              <div class="label-preview-top" />
            </div>
            <p class="text-[#222222] text-[14px] font-semibold my-1">
              1 Label / Halaman
            </p>
            <p class="text-[#828282] text-[14px] font-medium mb-0">
              Direkomandasikan kertas A4
            </p>
          </b-card>
        </b-col>
        <b-col cols="auto">
          <b-card
            class="card-print-label"
            :class="formatPrint === 'page_2' ? 'active' : ''"
            role="button"
            @click="formatPrint = 'page_2'"
          >
            <div class="label-preview">
              <div class="label-preview-top" />
              <div class="label-preview-bottom" />
            </div>
            <p class="text-[#222222] text-[14px] font-semibold my-1">
              2 Label / Halaman
            </p>
            <p class="text-[#828282] text-[14px] font-medium mb-0">
              Direkomandasikan kertas A4
            </p>
          </b-card>
        </b-col>
        <b-col cols="auto">
          <b-card
            class="card-print-label"
            :class="formatPrint === 'page_4' ? 'active' : ''"
            role="button"
            @click="formatPrint = 'page_4'"
          >
            <div class="label-preview">
              <div class="label-preview-topleft" />
              <div class="label-preview-topright" />
              <div class="label-preview-bottomleft" />
              <div class="label-preview-bottomright" />
            </div>
            <p class="text-[#222222] text-[14px] font-semibold my-1">
              4 Label / Halaman
            </p>
            <p class="text-[#828282] text-[14px] font-medium mb-0">
              Direkomandasikan kertas A4
            </p>
          </b-card>
        </b-col>
        <b-col cols="auto">
          <b-card
            class="card-print-label"
            :class="formatPrint === 'page_5' ? 'active' : ''"
            role="button"
            @click="formatPrint = 'page_5'"
          >
            <div class="label-preview">
              <div class="label-preview-full" />
            </div>
            <p class="text-[#222222] text-[14px] font-semibold my-1">
              10 cm x 10cm
            </p>
            <p class="text-[#828282] text-[14px] font-medium mb-0">
              Printer Thermal
            </p>
          </b-card>
        </b-col>
        <b-col cols="auto">
          <b-card
            class="card-print-label"
            :class="formatPrint === 'page_6' ? 'active' : ''"
            role="button"
            @click="formatPrint = 'page_6'"
          >
            <div class="px-2">
              <div class="label-preview">
                <div class="label-preview-full" />
              </div>
            </div>
            <p class="text-[#222222] text-[14px] font-semibold my-1">
              10 cm x 15cm
            </p>
            <p class="text-[#828282] text-[14px] font-medium mb-0">
              Printer Thermal
            </p>
          </b-card>
        </b-col>
      </b-row>
      <template #modal-footer>
        <div class="d-flex justify-end">
          <b-form-checkbox
            v-model="printDate"
            class="font-medium my-auto mr-1"
          >
            Tambahkan tanggal cetak di label
          </b-form-checkbox>
          <b-button
            variant="primary"
            class="my-auto"
            :disabled="formatPrint === ''"
            @click="downloadPrintLabel"
          >
            <span class="font-semibold">Download Label</span>
          </b-button>
        </div>
      </template>
    </b-modal>
  </b-card>
</template>
<script>
import vSelect from 'vue-select'
import imageNull from '@/assets/images/avatars/image-null.png'
import axios from 'axios'
import useJwt from '@core/auth/jwt/useJwt'
import '@core/scss/vue/libs/vue-select.scss'

const { jwt } = useJwt(axios, {})
const token = jwt.getToken()
const httpKomship = axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
  },
  baseURL: process.env.VUE_APP_BASE_URL_KOMSHIP,
})

export default {
  components: { vSelect },
  data() {
    return {
      profile: JSON.parse(localStorage.userData),
      fieldOrder: [
        {
          key: 'no', label: '', thClass: 'text-center', tdClass: 'text-center align-top',
        },
        { key: 'order_date', label: 'Tanggal Order', tdClass: 'align-top pr-0' },
        { key: 'customer_name', label: 'Pelanggan', tdClass: 'align-top' },
        { key: 'product', label: 'Produk', tdClass: 'align-top' },
        { key: 'detail_address', label: 'Alamat', tdClass: 'align-top' },
        {
          key: 'airway_bill', label: 'Resi', thClass: 'text-center', tdClass: 'align-top text-center',
        },
      ],
      orderID: '',
      order: [],
      loading: false,
      shipment: 'Semua Ekspedisi',
      listShipment: [],
      listOrderPrint: [],
      orderIdPrint: '',
      checklistAllOrder: false,
      page: 1,
      limit: 50,
      lastOrderData: false,
      formatPrint: '',
      printDate: false,
    }
  },
  async created() {
    this.getShipment()
    if (this.$route.params.order_data_id !== undefined) {
      await this.getOrderID()
    } else if (this.$route.params.order) {
      let orderID = ''
      const orderData = this.$route.params.order
      for (let index = 0; index < orderData.length; index += 1) {
        if (index === orderData.length - 1) {
          orderID += `${orderData[index].order_id}`
        } else {
          orderID += `${orderData[index].order_id},`
        }
      }
      this.orderID = orderID
    }
    this.getOrderData()
    const main = document.getElementById('pickup-order-detail')
    if (main) {
      window.onscroll = () => {
        if ((window.innerHeight + window.scrollY)
        >= main.offsetHeight
        && !this.loading) {
          this.getOrderData()
        }
      }
    }
  },
  methods: {
    setImageDefault(e) {
      e.target.src = imageNull
    },
    async getShipment() {
      try {
        const listShipment = await this.$http_komship.get('/v1/shipments')
        const { data } = listShipment.data
        for (let index = 0; index < data.length; index += 1) {
          this.listShipment.push(data[index].shipping_name)
        }
      } catch (error) {
        console.error(error)
      }
    },
    goBack() {
      if (this.$route.params.order_data_id === undefined) {
        this.$router.push({
          name: 'ajukan-pickup',
          params: {
            address: this.$route.params.address,
            order: this.$route.params.order,
            pickup_date: this.$route.params.pickup_date,
            pickup_time: this.$route.params.pickup_time,
            vehicle: this.$route.params.vehicle,
          },
        })
      } else {
        this.$router.go(-1)
      }
    },
    async getOrderID() {
      try {
        const listOrderId = await this.$http_komship.get(
          `/v1/pickup/history/detail/order/${this.$route.params.order_data_id}`,
        )
        const { data } = listOrderId.data
        let orderID = ''
        for (let index = 0; index < data.length; index += 1) {
          if (index === data.length - 1) {
            orderID += `${data[index].order_id}`
          } else {
            orderID += `${data[index].order_id},`
          }
        }
        this.orderID = orderID
      } catch (error) {
        console.error(error)
      }
    },
    async getOrderData() {
      if (this.orderID !== '' && !this.lastOrderData) {
        this.loading = true
        try {
          const order = await this.$http_komship.get(`/v2/pickup/detail/order/${this.$route.params.order_data_id}`)
          const { data } = order.data
          this.order.push(...data)
          console.log(this.order)
          this.page += 1
          this.loading = false
          if (data.length < this.limit) {
            this.lastOrderData = true
          }
        } catch (error) {
          console.error(error)
          this.loading = false
        }
      }
    },
    getOrderDataByExpedition() {
      this.page = 1
      this.order = []
      this.listOrderPrint = []
      this.checklistAllOrder = false
      this.lastOrderData = false
      this.getOrderData()
    },
    selectAllOrder() {
      if (this.checklistAllOrder) {
        this.listOrderPrint = this.order
      } else {
        this.listOrderPrint = []
      }
    },
    popupPrintLabel() {
      this.$bvModal.show('printLabel')
      let orderIdPrint = ''
      for (let index = 0; index < this.listOrderPrint.length; index += 1) {
        if (index === this.listOrderPrint.length - 1) {
          orderIdPrint += `${this.listOrderPrint[index].order_id}`
        } else {
          orderIdPrint += `${this.listOrderPrint[index].order_id},`
        }
      }
      this.orderIdPrint = orderIdPrint
    },
    async downloadPrintLabel() {
      try {
        const print = await httpKomship.post('/v2/generate/print-label', null, {
          params: {
            order_id: this.orderIdPrint,
            page: this.formatPrint,
            print_date: this.printDate ? 1 : 0,
          },
        })
        const { data } = print.data
        const { path } = data
        const split = path.split('/')
        const fileName = split[split.length - 1]
        const url = `data:application/pdf;base64,${path}`
        const link = document.createElement('a')
        link.href = url
        link.download = fileName
        link.click()
        window.open(path, '_blank')
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
<style lang="scss">
.collapsed > .when-open,
.not-collapsed > .when-closed {
  display: none;
}
.custom-control-label::before{
  border: 1px solid #828282;
}
#printLabel.modal{
  width: 100%;
  max-width: 1200px;
  left: 50%;
  transform: translateX(-50%);
}
.card-print-label{
  border: 2px solid #E2E2E2;
  border-radius: 6px;
  width: 280px;
  margin: 7px;
  display: inline-block;
  text-align: left;
  padding: 7px;
}
.card-print-label:hover{
  border: 2px solid #F95031;
}
.card-print-label:hover .label-preview{
  border: 1px solid #F95031;
}
.card-print-label:hover .label-preview-full{
  background-color: #FFECE9;
}
.card-print-label:hover .label-preview-top{
  background-color: #FFECE9;
}
.card-print-label:hover .label-preview-topleft{
  background-color: #FFECE9;
}
.card-print-label:hover .label-preview-topright{
  background-color: #FFECE9;
}
.card-print-label:hover .label-preview-bottom{
  background-color: #FFECE9;
}
.card-print-label:hover .label-preview-bottomleft{
  background-color: #FFECE9;
}
.card-print-label:hover .label-preview-bottomright{
  background-color: #FFECE9;
}
.card-print-label.active{
  border: 2px solid #F95031;
}
.card-print-label.active .label-preview{
  border: 1px solid #F95031;
}
.card-print-label.active .label-preview-full{
  background-color: #FFECE9;
}
.card-print-label.active .label-preview-top{
  background-color: #FFECE9;
}
.card-print-label.active .label-preview-topleft{
  background-color: #FFECE9;
}
.card-print-label.active .label-preview-topright{
  background-color: #FFECE9;
}
.card-print-label.active .label-preview-bottom{
  background-color: #FFECE9;
}
.card-print-label.active .label-preview-bottomleft{
  background-color: #FFECE9;
}
.card-print-label.active .label-preview-bottomright{
  background-color: #FFECE9;
}
.label-preview{
  border: 1px solid #E2E2E2;
  border-radius: 6px;
  height: 240px;
  width: 100%;
  padding: 10px;
}
.label-preview-full{
  background-color: #E2E2E2;
  height: 100%;
  border-radius: 6px;
}
.label-preview-top{
  background-color: #E2E2E2;
  height: 48%;
  margin-bottom: 4%;
  border-radius: 6px;
}
.label-preview-topleft{
  display: inline-block;
  background-color: #E2E2E2;
  height: 48%;
  width: 48%;
  margin-bottom: 2%;
  margin-right: 2%;
  border-radius: 6px;
}
.label-preview-topright{
  display: inline-block;
  background-color: #E2E2E2;
  height: 48%;
  width: 48%;
  margin-bottom: 2%;
  margin-left: 2%;
  border-radius: 6px;
}
.label-preview-bottom{
  background-color: #E2E2E2;
  height: 48%;
  margin-bottom: 2%;
  border-radius: 6px;
}
.label-preview-bottomleft{
  display: inline-block;
  background-color: #E2E2E2;
  height: 48%;
  width: 48%;
  margin-top: 2%;
  margin-right: 2%;
  border-radius: 6px;
}
.label-preview-bottomright{
  display: inline-block;
  background-color: #E2E2E2;
  height: 48%;
  width: 48%;
  margin-top: 2%;
  margin-left: 2%;
  border-radius: 6px;
}
.image-product {
  object-fit: cover;
  object-position: center center;
  width: 50px!important;
  height: 50px!important;
}

@media (max-width: 576px) {
  .card-print-label {
    width: 200px!important;
  }

  .label-preview {
    height: 200px!important;
  }
}
</style>
