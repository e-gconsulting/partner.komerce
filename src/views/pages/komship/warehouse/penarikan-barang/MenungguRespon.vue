<template>
  <b-row>
    <b-table
      bordered
      hover
      table-variant="light"
      :fields="fieldsRespons"
      :items="itemsRespons"
    >
      <template />
    </b-table>
  </b-row>
</template>

<script>
import { BTable } from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BTable,
  },
  data() {
    return {
      fieldsRespons: [
        {
          key: 'date',
          label: 'Tanggal',
          thClass: 'text-black py-1 text-[14px]',
          thStyle: {
            fontSize: '14px',
            color: 'black',
          },
          tdClass: 'text-black',
        },
        {
          key: 'alasan',
          label: 'Alasan',
          thClass: 'text-black py-1 text-[14px]',
          thStyle: {
            fontSize: '14px',
            color: 'black',
          },
          tdClass: 'text-black',
        },
        {
          key: 'warehouse',
          label: 'Gudang',
          thClass: 'text-black py-1 text-[14px]',
          thStyle: {
            fontSize: '14px',
            color: 'black',
          },
          tdClass: 'text-black',
        },
        {
          key: 'stock',
          label: 'Jumlah Produk',
          thClass: 'text-black py-1 text-[14px]',
          thStyle: {
            fontSize: '14px',
            color: 'black',
          },
          tdClass: 'text-black',
        },
        {
          key: 'action',
          label: 'Action',
          thClass: 'text-black py-1 text-[14px]',
          thStyle: {
            fontSize: '14px',
            color: 'black',
          },
          tdClass: 'text-black',
        },
      ],
      itemsRespons: [],
    }
  },
}

</script>
