<template>
  <b-card body>
    <div class="d-flex align-items-center">
      <b-button
        variant="primary"
        size="sm"
        class="mr-1 rounded-lg p-0"
        @click="$router.go(-1)"
      >
        <feather-icon
          size="2x"
          icon="ChevronLeftIcon"
        />
      </b-button>
      <h4 class="my-0">
        Riwayat Inbound
      </h4>
    </div>
    <b-table
      small
      :fields="fields"
      :items="items"
      responsive="sm"
    >
      <!-- A custom formatted column -->
      <template #cell(name)="data">
        <b class="text-info">{{ data.value.last.toUpperCase() }}</b>,
        <b class="text-info">{{ items.Kota }}</b>
      </template>

      <!-- A virtual composite column -->
      <template #cell(nameage)="data">
        {{ data.item.name.first }} is {{ data.item.age }} years old
      </template>

      <!-- Optional default data cell scoped slot -->
      <template #cell(Status)="data">
        <router-link to="/dikirim-ekspedisi">
          {{ data.value }}
        </router-link>
      </template>
      <template #cell(Action)="data">
        <router-link to="/dikirim-sendiri">
          {{ data.value }}
        </router-link>
      </template>
    </b-table>
    <div class="">
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
  </b-card>
</template>

<script>
export default {
  name: 'DataInbound',
  data() {
    return {
      userId: this?.$store?.state?.auth?.userData?.id,
      items: [
        {
          Tanggal_Pengajuan: '01/01/2022',
          Nama_Partner: 'Dickerson,Malang',
          Kota: 'Malang',
          Jenis_Pengiriman: 'Macdonald',
          Tanggal_Inbound: '17 Agustus 2022',
          Status: 'Proses',
          Action: 'Lihat Detail',
        },
      ],
    }
  },
}
</script>

<style>
</style>
