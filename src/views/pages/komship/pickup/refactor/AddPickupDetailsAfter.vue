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
        variant="primary"
        :disabled="fieldItemsPrint.length === 0"
        @click="onShowModalPrint"
      >
        + Print Label
      </b-button>
    </b-row>

    <b-row>
      <b-table
        ref="tableOrder"
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
            <div class="d-flex">
              <b-form-checkbox
                v-model="data.item.printIsActive"
                class="custom-control-primary mt-1"
                @change="getItemPrint(data)"
              />
              <div>
                <h5>
                  <strong>
                    {{ data.item.order_date }}
                  </strong>
                </h5>
                <p>
                  {{ data.item.shipping }}
                </p>
              </div>
            </div>
          </b-row>
        </template>
        <template #cell(pelanggan)="data">
          <h5>
            <strong>
              {{ data.item.customer_name }}
            </strong>
          </h5>
        </template>
        <template #cell(product)="data">
          <div
            v-for="(itemsProduct, index) in data.item.product"
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
                  />
                </div>
                <div class="ml-1">
                  <p><strong>{{ itemsProduct.product_name }}</strong></p>
                  <p class="text-primary"><strong>{{ itemsProduct.variant_name }}</strong></p>
                </div>
              </b-container>
            </b-row>
          </div>
        </template>
        <template #cell(address)="data">
          <h5>
            <strong>
              {{ data.item.district }}
            </strong>
          </h5>
          <p>
            {{ data.item.detail_address }}
          </p>
        </template>
        <template #cell(resi)="data">
          {{ data.item.airway_bill }}
        </template>
      </b-table>

      <pickup-label-print
        ref="printLabelContent"
        :print-option="printOption"
        :profile="{profile}"
        :list-order="selectedOrder"
        @onAfterPrintLabel="handleAfterPrintLabel"
      />

      <vue-html2pdf
        ref="html2Pdf"
        :enable-download="false"
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
            v-for="(itemsPrint, index) in fieldItemsPrint"
            :key="index+1"
          >
            <div
              class="w-full h-full"
              style="padding-left: 20px; padding-right: 20px; padding-top:24px"
            >
              <div
                class="flex flex-col w-full space-y-4 border border-black"
                style="padding-left: 12px; padding-right:12px; padding-top:8px; padding-bottom:16px"
              >
                <div class="grid grid-cols-3 gap-8 ">
                  <div class="col-span-1 items-center justify-center flex flex-col space-y-2">
                    <h4 class="text-black">
                      <strong>
                        Order ID
                      </strong>
                    </h4>
                    <h4 class="text-black">
                      {{ itemsPrint.order_no }}
                    </h4>
                  </div>
                  <div class="col-span-1 flex items-center justify-center ">
                    <b-img

                      height="24"
                      src="@/assets/images/expedisi/logo-jne.png"
                      alt="ekspedisi"
                    />
                  </div>
                  <div class="col-span-1 flex  justify-center items-center">
                    <img
                      height="24"
                      src="@/assets/images/logo.png"
                      alt=""
                    >
                  </div>
                </div>
                <div
                  style="margin-top: 9px"
                  class="grid grid-cols-2 gap-2"
                >
                  <div class="col-span-1 px-2 py-1 border border-black flex flex-col space-y-1">
                    <div class="text-lg w-full justify-center text-black flex center">
                      <h4 class="text-black">
                        <strong>
                          PENGIRIM
                        </strong>
                      </h4>
                    </div>
                    <b-list-group>
                      <b-list-group-item class="d-flex border-0">
                        <span class="mr-1 text-black">
                          <feather-icon
                            icon="UserIcon"
                            size="16"
                          />
                        </span>
                        <span class="text-black">{{ profile.user_name }} </span>
                      </b-list-group-item>

                      <b-list-group-item class="d-flex border-0">
                        <span class="mr-1 text-black">
                          <feather-icon
                            icon="PhoneIcon"
                            size="17"
                          />
                        </span>
                        <span class="text-black">{{ profile.user_phone }}</span>
                      </b-list-group-item>

                      <b-list-group-item class="d-flex border-0">
                        <span class="mr-1 text-black">
                          <feather-icon
                            icon="MapPinIcon"
                            size="16"
                          />
                        </span>
                        <span class="text-black">{{ profile.user_address }}</span>
                      </b-list-group-item>
                    </b-list-group>
                  </div>
                  <div class="col-span-1 px-2 py-1 border border-black">
                    <div class="text-lg w-full justify-center text-black flex center">
                      <h4 class="text-black">
                        <strong>
                          PENERIMA
                        </strong>
                      </h4>
                    </div>
                    <b-list-group>
                      <b-list-group-item class="d-flex border-0">
                        <span class="mr-1 text-black">
                          <feather-icon
                            icon="UserIcon"
                            size="16"
                          />
                        </span>
                        <span class="text-black">{{ itemsPrint.customer_name }} </span>
                      </b-list-group-item>

                      <b-list-group-item class="d-flex border-0">
                        <span class="mr-1 text-black">
                          <feather-icon
                            icon="PhoneIcon"
                            size="17"
                          />
                        </span>
                        <span class="text-black">082134567890</span>
                      </b-list-group-item>

                      <b-list-group-item class="d-flex border-0">
                        <span class="mr-1 text-black">
                          <feather-icon
                            icon="MapPinIcon"
                            size="16"
                          />
                        </span>
                        <span class="text-black">{{ `${itemsPrint.district}, ${itemsPrint.detail_address}` }}</span>
                      </b-list-group-item>
                    </b-list-group>
                  </div>
                </div>
                <div class="grid grid-cols-3 gap-2">
                  <div class="col-span-1 border-black text-4xl py-2 px-2 border flex justify-center text-black font-black text-center items-center">
                    {{ itemsPrint.payment_method }}
                  </div>
                  <div class="col-span-2 border-black px-2 py-2 items-center justify-center border flex flex-row space-x-2">
                    <div class="flex flex-col justify-center">
                      <h4 class="font-bold text-black text-center">
                        Nomor Resi
                      </h4>
                      <barcode
                        :value="itemsPrint.airway_bill"
                        height="33"
                      >
                        Show this if the rendering fails.
                      </barcode>
                    </div>
                  </div>
                </div>
                <div
                  v-for="(dataProduct, indexProduct) in itemsPrint.product"
                  :key="indexProduct+1"
                >
                  <div class="grid grid-cols-3 gap-2">
                    <div class="col-span-1 border-black text-xl py-2 px-2  border flex text-black font-black">
                      Kuantitas : {{ dataProduct.qty }}
                    </div>
                    <div class="col-span-2 border-black px-2 py-2 items-center  border flex flex-row space-x-2">
                      <div class="text-xl text-black font-black">
                        ISI PAKET : {{ dataProduct.product_name }}
                      </div>
                      <div class="text-xl text-black font-medium">
                        {{ dataProduct.variant_name }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </vue-html2pdf>
    </b-row>
    <AddPickupPopupPrint
      :selected-option="printOption"
      @onSubmitOption="onSubmitOptionPrint"
      @onChangeOption="handleChangeOption"
    />
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
  BFormCheckbox,
  BIconFileEarmarkEaselFill,
} from 'bootstrap-vue'
import VueHtml2pdf from 'vue-html2pdf'
import VueBarcode from 'vue-barcode'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import useJwt from '@/auth/jwt/useJwt'
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
    BFormCheckbox,
  },

  data() {
    return {
      selectedOrder: this.$route.params.selected_order,

      items: [],
      fields: [
        {
          key: 'date_order',
          label: 'Tanggal Order',
        },
        {
          key: 'pelanggan',
          label: 'Pelanggan',
        },
        {
          key: 'product',
          label: 'Produk',
        },
        {
          key: 'address',
          label: 'Alamat',
        },
        {
          key: 'resi',
          label: 'resi',
          formatter(value) {
            return value === null ? '-' : value
          },
        },
      ],

      profile: [],
      printOption: 1,

      valuePrint: [],

      idOrderFromHistory: this.$route.params.selected_order_from_history.data_order,
      idOrder: [],

      selectItemPrint: false,
      allSelectItemPrint: false,

      fieldItemsPrint: [],
      disableButtonPrint: true,
    }
  },
  mounted() {
    this.items = this.selectedOrder
    console.log('selectedOrder', this.selectedOrder)
    this.getProfile()
  },
  methods: {
    getOrder() {
      this.idOrderFromHistory.map(items => this.idOrder.push(items.id))
      this.$http_komship.get(`/v1/order/${this.profile.partner_id}`, {
        params: {
          order_id: this.idOrder.toString(),
        },
      }).then(response => {
        const { data } = response.data.data
        this.items = data
        // eslint-disable-next-line no-plusplus
        for (let x = 0; x < this.items.length; x++) {
          Object.assign(this.items[x], { printIsActive: false })
        }
        console.log('itemsOrder', this.items)
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
      })
    },
    onShowModalPrint() {
      this.$bvModal.show('modal-8')
      // this.$refs.addPickupPopUpPrint.showModal()
      // this.$refs.html2Pdf.generatePdf()
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
      console.log('opttion print view', values)
      this.$refs.html2Pdf.generatePdf()
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
      this.$http_komship.post('v1/my-profile', {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(response => {
        this.profile = response.data.data
        console.log('profile', this.profile.partner_id)
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
        this.fieldItemsPrint.push(data.item)
      }
      if (data.item.printIsActive === false) {
        this.fieldItemsPrint.splice(data.index, 1)
      }
    },
    getAllItemPrint() {
      if (this.allSelectItemPrint === true) {
        console.log(true)
        // eslint-disable-next-line no-plusplus
        for (let x = 0; x < this.items.length; x++) {
          this.items[x].printIsActive = true
          this.fieldItemsPrint.push(this.items[x])
        }
      } else {
        console.log(false)
        // eslint-disable-next-line no-plusplus
        for (let x = 0; x < this.items.length; x++) {
          this.items[x].printIsActive = false
          this.fieldItemsPrint = []
        }
      }
      this.$refs.tableOrder.refresh()
    },
  },
}
</script>

<style lang="scss">
  @import '../../order/data-order.scss';
  @import '../add-pickup-detail.scss';
</style>
