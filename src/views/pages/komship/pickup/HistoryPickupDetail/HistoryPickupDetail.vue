<!-- eslint-disable vue/no-v-html -->
<template>
  <b-card class="text-[#222222]">
    <header class="d-flex mb-2">
      <b-button
        variant="primary"
        size="sm"
        class="rounded-lg mr-2 my-auto"
        @click="$router.go(-1)"
      >
        <b-icon-chevron-left />
      </b-button>
      <h3 class="text-[20px] text-[#222222] font-semibold my-auto">
        Riwayat Pengajuan Pickup
      </h3>
    </header>
    <main class="mx-auto max-w-[93%]">
      <b-row class="justify-content-between align-items-center">
        <b-col
          cols="auto"
          class="mb-1"
        >
          <h4 class="text-[16px] text-[#222222] font-semibold my-auto">
            Penjemputan
          </h4>
        </b-col>
        <b-col cols="auto">
          <b-button
            variant="primary"
            class="d-flex rounded-lg mb-1"
            @click="handleToPagePrint"
          >
            <span class="font-semibold mr-[6px]">Label Pengiriman</span>
            <b-icon-chevron-right />
          </b-button>
        </b-col>
      </b-row>
      <hr style="border:1px solid #C2C2C2"><br>
      <b-row class="mb-1">
        <b-col
          cols="12"
          md="3"
        >
          <span class="text-[16px] font-semibold">Alamat</span>
        </b-col>
        <b-col
          cols="12"
          md="9"
          class="p-0 wrapper__info__pickup__mobile"
        >
          <span class="text-[16px] font-semibold">{{ address.address_name }}</span><br>
          <span class="text-[14px] font-medium text-[#828282]">{{ address.address_detail }}</span>
        </b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col
          cols="12"
          md="3"
        >
          <span class="text-[16px] font-semibold">Tanggal</span>
        </b-col>
        <b-col
          cols="12"
          md="9"
          class="p-0 wrapper__info__pickup__mobile"
        >
          <span class="text-[14px] font-medium text-[#828282]">{{ formatDate(pickupDate) }}</span>
        </b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col
          cols="12"
          md="3"
        >
          <span class="text-[16px] font-semibold">Waktu Jemput</span>
        </b-col>
        <b-col
          cols="12"
          md="9"
          class="p-0 wrapper__info__pickup__mobile"
        >
          <span class="text-[14px] font-medium text-[#828282]">{{ pickupTime }}</span>
        </b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col
          cols="12"
          md="3"
        >
          <span class="text-[16px] font-semibold">Kendaraan</span>
        </b-col>
        <b-col
          cols="8"
          lg="9"
          class="p-0 wrapper__info__pickup__mobile"
        >
          <b-button
            v-if="vehicle === 'MOBIL'"
            variant="outline-light"
            class="rounded-lg px-1"
            style="border:1px solid #828282"
          >
            <img src="@/assets/images/icons/mobil.png"><br>
            <span class="text-dark">Mobil</span>
          </b-button>
          <b-button
            v-else-if="vehicle === 'TRUCK'"
            variant="outline-light"
            class="rounded-lg px-1"
            style="border:1px solid #828282"
          >
            <img src="@/assets/images/icons/truck.png"><br>
            <span class="text-dark">Truk</span>
          </b-button>
          <b-button
            v-else-if="vehicle === 'MOTOR'"
            variant="outline-light"
            class="rounded-lg px-1"
            style="border:1px solid #828282"
          >
            <img src="@/assets/images/icons/motor.png"><br>
            <span class="text-dark">Motor</span>
          </b-button>
        </b-col>
      </b-row>
      <b-card
        class="mt-3 rounded"
        style="border:1px solid #E2E2E2"
      >
        <b-row class="justify-content-between mb-1">
          <b-col
            cols="auto"
            class="d-flex my-auto"
          >
            <span class="text-[14px] font-semibold">Packing List</span>
            <img
              id="infoPackingList"
              src="@/assets/images/icons/info-circle.svg"
              class="ml-[8px] cursor-pointer"
              style="max-width:20px"
            >
            <b-popover
              target="infoPackingList"
              variant="primary"
              triggers="hover"
              placement="bottom"
            >
              <p class="text-[12px] text-[#828282] font-medium mb-0">
                Berfungsi untuk mempercepat tim gudang menyiapkan jenis & jumlah produk yang akan dipacking
              </p>
            </b-popover>
          </b-col>
          <b-col
            cols="auto"
            class="mt-1"
          >
            <button
              id="btnDownload"
              class="btn btn-sm btn-download"
              @click="downloadPackingList"
              @mouseover="buttonDownload = true"
              @mouseleave="buttonDownload = false"
            >
              <span class="my-auto mr-[5px]">Download</span>
              <img
                v-if="buttonDownload"
                src="@/assets/images/icons/telegram-white.svg"
              >
              <img
                v-else
                src="@/assets/images/icons/telegram.svg"
              >
            </button>
            <b-popover
              target="btnDownload"
              variant="primary"
              triggers="hover"
              placement="bottom"
            >
              <p class="text-[12px] text-[#828282] font-medium mb-0">
                Download & Share Packing List
              </p>
            </b-popover>
          </b-col>
        </b-row>
        <table
          class="table border text-[14px] table-responsive"
        >
          <thead>
            <tr>
              <th colspan="2">
                Produk
              </th>
              <th class="text-right">
                Jumlah
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="items in order"
              :key="items.index"
              class="border"
            >
              <td
                class="pr-0 align-top"
                style="width:80px"
              >
                <img
                  style="width:100%"
                  :src="items.image_path"
                  @error="setImageDefault"
                >
              </td>
              <td
                colspan="2"
                class="pl-0 "
              >
                <div class="ml-[8px]">
                  <p class="mb-[8px] font-semibold">
                    {{ items.product_name }}
                  </p>
                  <template v-if="items.is_variant === 1">
                    <div
                      v-for="options in items.variant"
                      :key="options.index"
                      class="d-flex justify-between mb-[8px]"
                    >
                      <span>{{ options.product_variant_name }}</span>
                      <span>{{ options.total }}</span>
                    </div>
                  </template>
                  <template v-else>
                    <div class="d-flex justify-between mb-[8px]">
                      <span>&mdash;</span>
                      <span>{{ items.total }}</span>
                    </div>
                  </template>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </b-card>
    </main>
    <VueHtml2pdf
      ref="html2Pdf"
      :show-layout="false"
      :float-layout="true"
      :enable-download="true"
      :preview-modal="false"
      :paginate-elements-by-height="1100"
      filename="packing-list"
      :pdf-quality="2"
      :manual-pagination="true"
      pdf-format="a4"
      pdf-orientation="portrait"
      pdf-content-width="800px"
      :html-to-pdf-options="pdfOptions"
    >
      <section slot="pdf-content">
        <b-container class="py-1">
          <div
            class="p-1"
            style="border:2px solid #222222;border-radius:6px"
          >
            <div class="d-flex justify-between mb-2">
              <span class="text-[16px] font-semibold my-auto">Packing List</span>
              <div class="d-flex">
                <span class="text-[16px] font-semibold my-auto mr-[6px]">Pengiriman Via</span>
                <img
                  style="margin-top:10px"
                  src="@/assets/images/logo/komship-logo.svg"
                >
              </div>
            </div>
            <table class="table border text-[14px]">
              <thead>
                <tr>
                  <th colspan="2">
                    Produk
                  </th>
                  <th class="text-right">
                    Jumlah
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="items in order"
                  :key="items.index"
                  class="border"
                >
                  <td
                    class="pr-0 align-top"
                    style="width:80px"
                  >
                    <img
                      style="width:100%"
                      :src="items.image_path"
                      crossorigin=""
                      @error="setImageDefault"
                    >
                  </td>
                  <td
                    colspan="2"
                    class="pl-0 "
                  >
                    <div class="ml-[8px]">
                      <p class="mb-[8px] font-semibold">
                        {{ items.product_name }}
                      </p>
                      <template v-if="items.is_variant === 1">
                        <div
                          v-for="options in items.variant"
                          :key="options.index"
                          class="d-flex justify-between mb-[8px]"
                        >
                          <span>{{ options.product_variant_name }}</span>
                          <span>{{ options.total }}</span>
                        </div>
                      </template>
                      <template v-else>
                        <div class="d-flex justify-between mb-[8px]">
                          <span>&mdash;</span>
                          <span>{{ items.total }}</span>
                        </div>
                      </template>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot class="bg-[#F4F4F4] text-[#222222] text-[14px]">
                <tr>
                  <td
                    colspan="2"
                    class="font-semibold"
                  >
                    Waktu Pickup
                  </td>
                  <td class="font-semibold text-right">
                    Total Kuantitas: {{ totalQty }} Pcs
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="2"
                    class="pt-0"
                  >
                    {{ formatDate(pickupDate) }}<br>
                    <small class="text-[12px] text-[#828282]">{{ pickupTime }} WIB</small>
                  </td>
                  <td class="font-semibold text-right pt-0">
                    Total Orderan: {{ totalOrder }} Paket<br>
                    <small class="text-[12px]">*detail orderan cek di label pengiriman</small>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </b-container>
      </section>
    </VueHtml2pdf>
    <b-modal
      id="modal-blocker-profile"
      hide-footer
      hide-header
      modal-class="modal-dark"
      centered
      no-close-on-backdrop
      no-close-on-esc
    >
      <b-col
        md="12"
        class="d-flex justify-content-center pt-1"
      >
        <b-img
          width="100"
          src="https://storage.googleapis.com/komerce/core/icon-popup-warning.png"
        />
      </b-col>

      <b-col class="text-center px-5 pt-2 text-black">
        Kamu belum melengkapi profile, yuk lengkapi profilemu terlebih dahulu
      </b-col>
      <b-col class="text-center px-5 py-2">
        <b-btn
          variant="primary"
          @click="$router.push({ path: '/setting-kompship/profile' })"
        >
          Lengkapi Profile
        </b-btn>
      </b-col>
    </b-modal>
  </b-card>
</template>
<script>
import moment from 'moment'
import VueHtml2pdf from 'vue-html2pdf'
import imageNull from '@/assets/images/avatars/image-null.png'
import { mapState } from 'vuex'

export default {
  components: { VueHtml2pdf },
  data() {
    return {
      address: '',
      pickupDate: '',
      pickupTime: '',
      vehicle: '',
      order: [],
      buttonDownload: false,
      totalQty: '',
      totalOrder: '',
      pdfOptions: {
        filename: `packing-list-${this.generateRandomCharacters()}.pdf`,
        image: { type: 'png', quality: 0.98 },
        html2canvas: {
          scale: 2,
          bottom: 20,
        },
      },
      dateToPrint: {
        pickupDate: '',
        pickupTime: '',
      },
    }
  },
  computed: {
    ...mapState('dashboard', ['profile']),
  },
  created() {
    this.getHistoryPickup()
  },
  methods: {
    generateRandomCharacters() {
      let result = ''
      const length = 3
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      const charactersLength = characters.length
      for (let i = 0; i < length; i += 1) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
      }
      return result
    },
    setImageDefault(e) {
      e.target.src = imageNull
    },
    formatDate(value) {
      const date = moment(value)
      if (!date.isValid()) return value
      return moment(value).locale('id').format('DD MMMM YYYY')
    },
    async getHistoryPickup() {
      try {
        const pickupDetail = await this.$http_komship.get(
          `/v3/pickup/history/detail/${this.$route.params.order_data_id}`,
        )
        const { data } = pickupDetail.data
        this.address = ({
          address_name: data.address_name,
          address_detail: data.address_detail,
        })
        this.pickupDate = data.pickup_date
        this.pickupTime = data.pickup_time.substring(0, 5)
        this.vehicle = data.vehicle
        this.order = data.data_order
        this.totalQty = data.total_qty
        this.totalOrder = data.total_order
        this.dateToPrint.pickupDate = data.pickup_date
        this.dateToPrint.pickupTime = data.pickup_time
        this.$store.commit('saldo/UPDATE_PICKUP_DATE_TIME', this.dateToPrint)
      } catch (error) {
        console.error(error)
      }
    },
    downloadPackingList() {
      this.$refs.html2Pdf.generatePdf()
    },
    handleToPagePrint() {
      if (this.profile.partner_business_name === null
      || this.profile.partner_no_hp_business === null
      || this.address_partner_business === null) {
        this.$bvModal.show('modal-blocker-profile')
      } else {
        this.$router.push({ path: `/detail-orderan-pickup/${this.$route.params.order_data_id}` })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.btn-download{
  display: flex;
  font-weight: 600;
  font-size: 14px;
  border: 1px solid #C2C2C2;
  border-radius: 4px;
}
.btn-download:hover{
  background-color: #F95031;
  color: #FFFFFF;
  border: 1px solid #F95031;
}

@media (max-width: 576px) {
  .wrapper__info__pickup__mobile {
    padding-right: 1rem!important;
    padding-left: 1rem!important;
  }
}
</style>
