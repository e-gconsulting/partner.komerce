<template>
  <div class="container">
    <div class="container-title">
      <img
        src="@/assets/images/icons/back.svg"
        style="cursor: pointer;"
        @click="handleRouterBack"
      >
      <div class="container-title-t">
        Detail Tiket
      </div>

    </div>
    <div class="ring-2 rounded-xl ring-gray-300 mt-8 p-2 container-border">
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
          v-if="dataDetailTiket.file.length > 0"
          md="6"
        >
          <p class="font-bold">
            File
          </p>
          <!-- <div
            v-for="(item, index) in dataDetailTiket.file"
            :key="index"
          >
            <video
              v-if="handelRegexVideo(item.path)"
              width="320"
              height="240"
              controls
              style="margin-top: 10px;"
            >
              <source
                :src="item.path"
                type="video/mp4"
              >
            </video>
            <img
              width="220"
              height="140"
              :src="item.path"
              style="margin-top: 10px;"
            >
            <a
              v-if="handleRegexDoc(item.path)"
              :href="item.path"
              download
              style="margin-top: 10px; margin-bottom: 10px; display: block;"
            >
              {{ handleCutUrl(item.path) }}
            </a>
          </div> -->

          <a
            v-for="(item, index) in dataDetailTiket.file"
            :key="index"
            target="_blank"
            :href="item.path"
            class="download"
          >
            {{ handleCutUrl(item.path) }}
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
            @click="handleDetailOrder()"
          >
            Detail Order
          </b-button>
        </b-col>
      </b-row>
    </div>

    <HistoryTiket
      v-if="dataDetailTiket.history_ticket.length > 0"
      :data="dataDetailTiket"
      :handleregeximage="handleRegexImage"
      :handleregexdoc="handleRegexDoc"
      :handelregexvideo="handelRegexVideo"
      :formatdate="formatDate"
      :handleextension="handleExtension"
      :handlecuturl="handleCutUrl"
    />
  </div>
</template>

<script>
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import moment from 'moment'
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
    handleDetailOrder() {
      this.$router.push({
        path: `/tiket/detail/order/${this.dataDetailTiket.order_id}`,
      })
    },
    handleRouterBack() {
      this.$router.back()
    },
    handleCutUrl(value) {
      return value.substring(value.lastIndexOf('/') + 1, value.length)
    },
    handleRegexImage(filename) {
      return /\.(png|svg|jpg|jpeg|gif)$/i.test(filename)
    },
    handleRegexDoc(filename) {
      return /\.(xlsx|xls|doc|docx|pdf)$/i.test(filename)
    },
    handelRegexVideo(filename) {
      return /\.(mp4)$/i.test(filename)
    },
    formatDate(value) {
      return moment(value).format('D MMM YYYY | HH:mm')
    },
    handleExtension(value) {
      return value.split('.').pop()
    },
  },
}
</script>
<style scoped lang src="./DetailTiket.scss" />
