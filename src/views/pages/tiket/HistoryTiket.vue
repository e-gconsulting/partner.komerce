<template>
  <div>
    <div class="title mt-2 mb-2">
      Riwayat Tiket
    </div>
    <div class="history">
      <div
        v-for="(item, idx) in data.history_ticket"
        :key="idx"
        :class="item.type === 'Partner'
          ? 'history-left'
          : 'history-right'
        "
      >
        {{ item.name }}
        <div
          :class=" item.type === 'Partner'
            ? 'history-left-card'
            : 'history-right-card'
          "
        >
          <div v-if="item.type === 'Partner'">
            Jenis Tiket : {{ data.ticket_type }}
          </div>
          <div v-if="item.type === 'Partner'">
            Deskripsi : {{ item.message }}
          </div>
          <div v-if="item.type === 'Mitra'">
            {{ item.message }}
          </div>
        </div>
        <div
          v-for="(file, index) in item.file"
          :key="index"
        >
          <video
            v-if="handelregexvideo(file.path)"
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
            v-if="handleregeximage(file.path)"
            width="220"
            height="140"
            :src="file.path"
            style="margin-top: 10px;"
          >
          <a
            v-if="handleregexdoc(file.path)"
            :href="file.path"
            download
            style="margin-top: 10px; margin-bottom: 10px; display: block;"
          >
            {{ handlecuturl(file.path) }}
          </a>
        </div>
        <div class="time">
          {{ formatdate(item.date_created) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HistoryTiket',
  props: {
    data: {
      type: Object,
      required: true,
    },
    handleregeximage: {
      type: Function,
      required: true,
    },
    handleregexdoc: {
      type: Function,
      required: true,
    },
    handelregexvideo: {
      type: Function,
      required: true,
    },
    formatdate: {
      type: Function,
      required: true,
    },
    handleextension: {
      type: Function,
      required: true,
    },
    handlecuturl: {
      type: Function,
      required: true,
    },
  },
}
</script>

<style lang src="./HistoryTiket.scss" />
