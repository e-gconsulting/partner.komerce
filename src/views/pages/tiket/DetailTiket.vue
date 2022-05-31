<template>
  <div class="container">
    <div class="flex items-center">
      <img src="@/assets/images/icons/back.svg">
      <div class="text-xl ml-1 font-bold ">
        Detail Tiket
      </div>

    </div>
    <div class="ring-2 rounded-xl ring-gray-300 mt-8 p-2">
      <b-row class="mb-1">
        <b-col md="6">
          <p class="font-bold">
            Status Tiket
          </p>
          <div
            class="status"
            v-bind="dataDetailTiket.ticket_status === 'Batal' ? {class: 'cancel'} : dataDetailTiket.ticket_status === 'Selesai' ? {class: 'finish'} : dataDetailTiket.ticket_status === 'Belum diproses' ? {class:'onProsess'} : {class:'needProsess'}"
          >
            {{ dataDetailTiket.ticket_status }}
          </div>
        </b-col>
        <b-col md="6">
          <p class="font-bold">
            Status Order
          </p>
          <div class="send">
            {{ dataDetailTiket.order_status }}
          </div>
        </b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col md="6">
          <p class="font-bold">
            Nomor Tiket
          </p>
          <b-input-group>
            <b-form-input
              ref="copyClipboard"
              disabled="true"
              :value="dataDetailTiket.ticket_no"
              @focus="$event.target.select()"
            />
            <b-input-group-append>
              <span
                class="input-group-text"
                @click="copy"
              ><b-icon-clipboard /></span>
            </b-input-group-append>
          </b-input-group>
        </b-col>
        <b-col md="6">
          <p class="font-bold">
            Nomor Resi
          </p>
          <b-input-group>
            <b-form-input
              ref="copyClipboard"
              disabled="true"
              :value="dataDetailTiket.no_resi"
              @focus="$event.target.select()"
            />
            <b-input-group-append>
              <span
                class="input-group-text"
                @click="copy"
              >
                <b-icon-clipboard />
              </span>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col md="6">
          <p class="font-bold">
            Seller
          </p>
          <b-form-input
            disabled="true"
            :value="dataDetailTiket.partner_name"
          />
        </b-col>
        <b-col md="6">
          <p class="font-bold">
            Buyer
          </p>
          <b-form-input
            disabled="true"
            :value="dataDetailTiket.customer_name"
          />
        </b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col md="6">
          <p class="font-bold">
            Jenis Tiket
          </p>
          <b-form-input
            disabled="true"
            :value="dataDetailTiket.ticket_type"
          />
        </b-col>
        <b-col
          v-if="!dataDetailTiket.file"
          md="6"
        >
          <p class="font-bold">
            File
          </p>
          <a
            href="/example.pdf"
            download="my-download.pdf"
            class="download"
          >
            {{ dataDetailTiket.file }}
          </a>
        </b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col md="6">
          <p class="font-bold">
            Deskripsi
          </p>
          <b-form-textarea
            disabled="true"
            :value="dataDetailTiket.description"
          />
        </b-col>
        <b-col md="6">

          <b-button
            variant="outline-primary"
            class="text-red-400 absolute bottom-0 right-8"
          >
            Detail Order
          </b-button>
        </b-col>
      </b-row>
    </div>
    <HistoryTiket :data="dataDetailTiket" />
  </div>
</template>

<script>
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import HistoryTiket from './HistoryTiket.vue'

export default {
  name: 'DetailTiket',
  components: {
    HistoryTiket,
  },
  data() {
    return {
      dataDetailTiket: {},
    }
  },
  mounted() {
    this.$http_komship.get(`/v1/ticket-admin/detail/${this.$route.params.id}`)
      .then(res => this.setDataDetailTiket(res.data.data))
      .catch(error => {
        this.$toast(
          {
            component: ToastificationContent,
            props: {
              title: 'Failure',
              icon: 'AlertCircleIcon',
              text: error,
              variant: 'danger',
            },
          },
          2000,
        )
      })
  },
  methods: {
    setDataDetailTiket(data) {
      this.dataDetailTiket = data
    },
    copy() {
      this.$refs.copyClipboard.focus()
    },
  },
}
</script>
<style lang src="./DetailTiket.scss" />
