<template>
  <div>
    <div class="title mt-2 mb-2">
      Riwayat Tiket
    </div>
    <div class="history">
      <div
        v-for="(historyTikcet, idx) in data.history_ticket"
        :key="idx"
        class="history-left"
      >
        {{ data.shipping }}
        <div class="history-left-card">
          <div>Jenis Tiket : {{ data.ticket_type }}</div>
          <span>Deskripsi : {{ historyTikcet.message }}</span>
        </div>
        <div class="time">
          {{ formatDate(historyTikcet.date_created) }}
        </div>
      </div>

      <!-- <div class="history-right">
        Interco
        <div class="history-right-card">
          <div>SIlahkan hubungi nomor 092210892532</div>
          <span>Mohon segera dihubungi dan diantarkan</span>
        </div>
        <div class="time">
          {{ formatDate(historytiket.date_created) }}
        </div>
      </div> -->
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

<style scoped>
.title{
  color: #222222;
  font-weight: bold;
  font-size: 17.5px;
}
.history{
  padding: 2em;
  background: #F8F8F8;
  border: 2px solid #E2E2E2;
  border-radius: 10px;
  max-height: 50vh;
  overflow: auto;
  /* position: absolute; */
}
/* .history::-webkit-scrollbar{
  display: none;
} */
.history-right{
  float: right;
  margin-bottom: 1.5em;
}
.history-left{
  margin-bottom: 1.5em;
}
.history-left-card{
  background: #FCD4BE;
  border-radius: 0px 8px 8px 8px;
  padding: 1em;
  width: 40%;
  color: #222222;
}
.history-right-card{
  background: #FF6A3A;
  border-radius: 8px 0px 8px 8px;
  padding: 1em;
  color:white;
  text-align: c;
}
.time{
  color: #222222;
  font-size: 12px;
}
</style>
