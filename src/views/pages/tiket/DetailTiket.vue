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
          <div class="status">
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
              class="input"
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
              class="input"
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
            class="input"
            disabled="true"
            :value="dataDetailTiket.partner_name"
          />
        </b-col>
        <b-col md="6">
          <p class="font-bold">
            Buyer
          </p>
          <b-form-input
            class="input"
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
            class="input"
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
            class="input"
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

<style scoped>
.status{
  border: 1px solid #FCD4BE;
  background: #FCD4BE;
  color: #AB2900;
  border-radius: 8px;
  width: 200px;
  text-align: center;
  font-weight: 600;
}
.font-bold{
  color: #626262;
}
.send{
  color: #08A0F7;
}
.input{
  border-radius: 12px;
  border-color: #E2E2E2;
  background-color: white;
}
.download{
  color: #08A0F7;
}
.input-group-text{
  cursor: pointer;
}
.text-xl{
  color:#222222;
}
</style>
