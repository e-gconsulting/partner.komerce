<template>
  <b-card>
    <span class="font-bold text-[24px]">Notification Bar</span>
    <b-row class="d-flex justify-content-end p-1">
      <b-button
        variant="outline-dark"
        class="rounded-lg"
        :disabled="selected.length < 1"
        @click="deleteSelected()"
      >
        <b-icon-trash />
      </b-button>
      <b-button
        variant="primary"
        class="ml-1 rounded-lg"
        to="/notification/create"
      >
        <b-icon-plus /> Buat Notifikasi
      </b-button>
    </b-row>
    <b-overlay
      variant="light"
      :show="loadTable"
      spinner-variant="primary"
      blur="0"
      opacity=".5"
      rounded="sm"
    >
      <b-table
        :fields="fieldTable"
        :items="itemTable"
      >
        <template #head(checkbox)>
          <div class="d-flex justify-content-center">
            <b-checkbox
              v-model="allSelected"
              @change="selectAll()"
            />
          </div>
        </template>
        <template #cell(checkbox)="data">
          <div class="d-flex justify-content-center">
            <b-checkbox
              v-model="selected"
              :value="data.item.id"
              @change="select()"
            />
          </div>
        </template>
        <template #cell(no)="data">
          {{ data.index + 1 }}
        </template>
        <template #cell(status)="data">
          <span
            v-if="data.item.status === 1"
            class="text-success font-bold"
          >Aktif</span>
          <span
            v-else
            class="text-danger font-bold"
          >Non Aktif</span>
        </template>
        <template #cell(updated_at)="data">
          {{ formatDate(data.item.updated_at) }}
          <span class="text-muted ml-1">{{ formatTime(data.item.updated_at) }}</span>
        </template>
        <template #cell(action)="data">
          <b-button
            variant="primary"
            size="sm"
            :to="{ name: $route.meta.routeDetail, params: { notification_id: data.item.id } }"
          >
            Detail
          </b-button>
        </template>
      </b-table>
    </b-overlay>
  </b-card>
</template>
<script>
import moment from 'moment'

export default {
  data() {
    return {
      fieldTable: [
        {
          key: 'checkbox', label: '', thClass: 'pr-0 align-middle', tdClass: 'pr-0',
        },
        {
          key: 'no', label: 'No', tdClass: 'text-center p-0', thClass: 'align-middle text-center p-0',
        },
        { key: 'title', label: 'Judul' },
        { key: 'description', label: 'Deskripsi' },
        { key: 'status', label: 'Status' },
        { key: 'updated_at', label: 'Terakhir Update' },
        { key: 'action', label: '' },
      ],
      itemTable: [],
      selected: [],
      allSelected: false,
      loadTable: false,
    }
  },
  created() {
    this.getNotification()
  },
  methods: {
    async getNotification() {
      this.loadTable = true
      await this.$http_komship.get('/v1/admin/notification-bar')
        .then(result => {
          const { data } = result.data
          this.itemTable = data
          this.loadTable = false
        }).catch(err => {
          console.error(err)
          this.loadTable = false
        })
    },
    formatDate(date) {
      const validDate = moment(date)
      if (validDate.isValid()) {
        const monthName = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
        const day = moment(date).format('DD')
        const month = moment(date).format('M')
        const year = moment(date).format('YYYY')
        return `${day} ${monthName[month - 1]} ${year}`
      }
      return ''
    },
    formatTime(date) {
      const validDate = moment(date)
      if (validDate.isValid()) {
        const time = moment(date).format('HH:mm')
        return time
      }
      return ''
    },
    selectAll() {
      this.selected = []
      if (this.allSelected) {
        // eslint-disable-next-line no-plusplus
        for (let index = 0; index < this.itemTable.length; index++) {
          this.selected.push(this.itemTable[index].id)
        }
      }
    },
    select() {
      this.allSelected = false
    },
    deleteSelected() {
      this.$swal({
        title: '<span class="font-medium text-[16px]">Kamu yakin ingin menghapus notifikasi ini?</span>',
        // eslint-disable-next-line global-require
        imageUrl: require('@/assets/images/icons/warning.svg'),
        confirmButtonText: 'Hapus',
        confirmButtonClass: 'btn btn-primary rounded-lg',
        showCancelButton: true,
        cancelButtonText: 'Batal',
        cancelButtonClass: 'btn btn-outline-primary bg-white text-primary rounded-lg',
      }).then(then => {
        if (then.isConfirmed) {
          this.$http_komship.post('/v1/admin/notification-bar', {
            action: 'delete',
            id: this.selected,
          }).then(this.getNotification)
        }
      })
    },
  },
}
</script>
