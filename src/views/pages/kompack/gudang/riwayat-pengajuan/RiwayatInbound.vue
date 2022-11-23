<template>
  <div class="border pt-1 -mt-4">
    <div class="d-flex flex-row space-x-3 float-right mb-2">
      <BFormSelect
        v-model="partnerList"
        :options="options"
      />
      <div class="">
        date
      </div>
    </div>
    <div class="">
      <b-table
        small
        class="text-center"
        :fields="fields"
        :items="items"
        responsive="sm"
      >
        <template #cell(tanggal_pengajuan)="data">
          {{ formatDate(data.item.inbound_date) }}
        </template>

        <template #cell(nama_gudang)="data">
          <div class="d-flex flex-row items-center">
            <div class="mr-1">
              <b-avatar
                :src="data.item.image_logo_url"
              />
            </div>
            <div class="d-flex flex-column items-start py-1">
              <div class="">
                {{ data.item.warehouses_name }}
              </div>
              <div class="">
                {{ data.item.city_name }}
              </div>
            </div>
          </div>
        </template>
        <template #cell(jenis_pengiriman)="data">
          <div class="d-flex flex-column align-items-center">
            <b-img
              :src="shippingMethods('img', data.item.shipping)"
            />
            <div class="">
              {{ shippingMethods('text', data.item.shipping) }}
            </div>
          </div>
        </template>
        <template #cell(status)="data">
          <div :class="statusColor(data.item.status)">
            {{ data.item.status }}
          </div>
        </template>
        <template #cell(tanggal_inbound)="data">
          <div>
            {{ data.item.arrived_date != '-' ? formatDate(data.item.arrived_date) : '-' }}
          </div>
        </template>
        <template #cell(action)="data">
          <div
            class=""
            style="color: #08A0F7;"
            @click="detail(data.item)"
          >
            <u>Lihat Detail</u>
          </div>
        </template>
      </b-table>
      <div class="hidden">
        <b-button
          variant="primary"
          class="rounded-pill p-1"
        >
          <feather-icon
            icon="PlusIcon"
            size="35"
          />
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import secureLocalStorage from '@/libs/secureLocalstorage'

export default {
  name: 'RiwayatInbound',
  data() {
    return {
      partnerList: '',

      options: [
        {
          value: '',
          text: 'Semua Gudang',
        },
      ],

      fields: [
        {
          key: 'tanggal_pengajuan',
          label: 'Tanggal Pengajuan',
        },
        {
          key: 'nama_gudang',
          label: 'Nama Gudang',
        },
        {
          key: 'jenis_pengiriman',
          label: 'Jenis Pengiriman',
        },
        {
          key: 'tanggal_inbound',
          label: 'Tanggal Inbound',
        },
        {
          key: 'status',
          label: 'Status',
        },
        {
          key: 'action',
          label: 'Action',
        },
      ],
      items: [],
    }
  },

  computed: {
    ...mapState('riwayatPengajuan', ['inbound']),
  },

  created() {
    this.fetchRiwayatInbound()
  },

  methods: {

    fetchRiwayatInbound() {
      this.$store
        .dispatch('riwayatPengajuan/getListInbound')
        .then(() => {
          this.items = this.inbound
        })
    },

    detail(data) {
      // console.log(data)

      const { id } = data

      this.$router.push({
        path: `/detail-inbound/${id}`,
      })
      localStorage.setItem('dataTes', JSON.stringify(data))
    },

    shippingMethods(part, shipping) {
      if (part === 'img') {
        if (shipping != null) {
          return 'https://storage.googleapis.com/komerce/assets/dikirimekpedisi.svg'
        }
        return 'https://storage.googleapis.com/komerce/assets/ekpedisidikirim-pribadi.svg'
      }
      if (shipping != null) {
        return shipping
      }
      return 'Dikirim Sendiri'
    },
    statusColor(status) {
      if (status === 'Proses') {
        return 'text-warning'
      } if (status === 'Selesai') {
        return 'text-success'
      }
      return 'text-danger'
    },
    formatDate(value) {
      return moment(value).format('DD MMMM YYYY')
    },
  },
}
</script>
