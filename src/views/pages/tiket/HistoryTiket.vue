<template>
  <div>
    <div class="title mt-2 mb-2">
      Riwayat Tiket
    </div>
    <div class="history">
      <div
        v-for="(historyTikcet, idx) in data.history_ticket"
        :key="idx"
        v-bind="historyTikcet.type === 'Partner' ? { class: 'history-left' } : { class: 'history-right' }"
      >
        {{ historyTikcet.type === 'Partner' ? data.shipping : historyTikcet.name }}
        <div
          v-bind="historyTikcet.type === 'Partner' ? { class: 'history-left-card' } : { class: 'history-right-card' }"
        >
          <div v-if="historyTikcet.type === 'Partner'">
            Jenis Tiket : {{ data.ticket_type }}
          </div>
          <div v-if="historyTikcet.type === 'Partner'">
            Deskripsi : {{ data.description }}
          </div>
          {{ historyTikcet.type !== 'Partner' && historyTikcet.message }}
        </div>
        <div class="time">
          {{ formatDate(historyTikcet.date_created) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'HistoryTiket',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate(d) {
      return moment(d).format('D MMM YYYY | HH:mm')
    },
  },
}
</script>

<style lang src="./HistoryTiket.scss"/>
