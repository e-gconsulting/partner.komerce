<template>
  <div>
    <BRow
      v-if="item.status === 'Pickup'"
      class="mb-1"
    >
      <BCol
        cols="2"
        md="2"
        class="pr-0"
      >
        <img
          src="@/assets/images/icons/resi-pickup.svg"
          alt="Komerce"
          class="w-10"
          style="top: -15px"
        >
        <div class="dashed" />
      </BCol>
      <BCol
        cols="10"
        md="10"
      >
        <span>{{ formatDate(item.date) }}</span>
        <h5 class="mb-1">
          {{ item.desc }}
        </h5>
        <BRow
          v-if="item.send_wa === 1"
          class="flex rounded p-[5px]"
          style="border: 1px solid #e2e2e2"
        >
          <BCol
            cols="3"
            class="p-0"
          >
            <div>
              <img
                src="@/assets/images/icons/whatsapp-notif.svg"
                alt="Komerce"
              >
            </div>
          </BCol>
          <BCol
            cols="9"
            class="pl-0"
          >
            <h5
              v-if="item.type === 'sending'"
              class="mb-1 ml-1"
            >
              Pemberitahuan pemberangkatan telah terkirim ke WA Pelanggan
            </h5>
            <h5
              v-if="item.type === 'arrived'"
              class="mb-1 ml-1"
            >
              Info paket COD hampir sampai telah terkirim ke WA Pelanggan
            </h5>
          </BCol>
        </BRow>
      </BCol>
    </BRow>
    <BRow
      v-if="item.status === 'Process'"
      class="mb-1"
    >
      <BCol
        cols="2"
        class="pr-0"
      >
        <img
          src="@/assets/images/icons/resi-kirim.svg"
          alt="Komerce"
          class="w-10"
          style="top: -15px"
        >
        <div class="dashed" />
      </BCol>
      <BCol cols="10">
        <span>{{ formatDate(item.date) }}</span>
        <h5 class="mb-1">
          {{ item.desc }}
        </h5>
      </BCol>
    </BRow>
    <BRow
      v-if="item.status === 'Delivered'"
      class="mb-1"
    >
      <BCol
        cols="2"
        class="pr-0"
      >
        <img
          src="@/assets/images/icons/resi-terima.svg"
          alt="Komerce"
          class="w-10"
          style="top: -15px"
        >
        <!-- <div class="dashed" /> -->
      </BCol>
      <BCol cols="10">
        <span>{{ formatDate(item.date) }}</span>
        <h5 class="mb-1">
          {{ item.desc }}
        </h5>
      </BCol>
    </BRow>
    <BRow
      v-if="item.status === 'Problem'"
      class="mb-1"
    >
      <BCol
        cols="2"
        class="pr-0"
      >
        <img
          src="@/assets/images/icons/resi-problem.svg"
          alt="Komerce"
          class="w-10"
          style="top: -15px"
        >
        <div class="dashed" />
      </BCol>
      <BCol cols="10">
        <span>{{ formatDate(item.date) }}</span>
        <h5
          class="mb-1"
          style="color: #e31a1a"
        >
          Kendala Pengiriman
        </h5>
        <BRow
          class="flex rounded p-[5px]"
          style="border: 1px solid #e2e2e2"
        >
          <BCol
            cols="2"
            class="p-0"
          >
            <img
              src="@/assets/images/icons/resi-retur.svg"
              alt="Komerce"
              class="w-10"
              style="top: -15px"
            >
          </BCol>
          <BCol
            cols="10"
            class="pl-0"
          >
            <h5
              class="mb-1"
              style="color: #e31a1a"
            >
              {{ item.desc }}
            </h5>
          </BCol>
        </BRow>
      </BCol>
    </BRow>
    <BRow
      v-if="item.status === 'Retur'"
      class="mb-1 no-wrap"
    >
      <BCol
        cols="2"
        class="pr-0"
      >
        <img
          src="@/assets/images/icons/resi-retur.svg"
          alt="Komerce"
          class="w-10"
          style="top: -15px"
        >
        <div class="dashed" />
      </BCol>
      <BCol cols="10">
        <span>{{ formatDate(item.date) }}</span>
        <h5 class="mb-1">
          {{ item.desc }}
        </h5>
      </BCol>
    </BRow>
    <BRow
      v-if="item.status === 'Delivery'"
      class="mb-1 no-wrap"
    >
      <BCol
        cols="2"
        class="pr-0"
      >
        <img
          src="@/assets/images/icons/icon-log-pengantar.svg"
          alt="Komerce"
          class="w-10"
          style="top: -15px"
        >
        <div class="dashed" />
      </BCol>
      <BCol cols="10">
        <span>{{ formatDate(item.date) }}</span>
        <h5 class="mb-1">
          {{ item.desc }}
        </h5>
      </BCol>
    </BRow>
  </div>
</template>

<script>
import { BCol, BRow } from 'bootstrap-vue'
import moment from 'moment'

export default {
  components: {
    BCol,
    BRow,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate(value) {
      return moment(value).format('DD MMMM YYYY - HH:mm')
    },
  },
}
</script>
<style lang src="./PopupLacakResi.scss" />
