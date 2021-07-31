<template>
  <b-overlay
    variant="light"
    :show="loading"
    spinner-variant="primary"
    blur="0"
    opacity=".5"
    rounded="sm"
  >
    <b-table
      responsive
      :fields="fields"
      :items="items"
      class="mb-0"
      empty-text="Tidak ada data untuk ditampilkan."
    >
      <template #cell(Phone)="data">
        <span class="text-nowrap">
          {{ data.value }}
        </span>
      </template>

      <!-- Optional default data cell scoped slot -->
      <template #cell()="data">
        {{ data.value }}
      </template>

      <template #cell(paid)="data">
        <b-avatar variant="primary" v-if="data.item.status == 2">
          <feather-icon icon="CheckIcon" />
        </b-avatar>
        <b-avatar variant="secondary" v-else>
          <feather-icon icon="XIcon" />
        </b-avatar>
      </template>

      <template #cell(cancel)="data">
        <b-avatar variant="primary" v-if="data.item.status == 3">
          <feather-icon icon="CheckIcon" />
        </b-avatar>
        <b-avatar variant="secondary" v-else>
          <feather-icon icon="XIcon" />
        </b-avatar>
      </template>

      <template #cell(action)="data">
        <b-row>
          <b-button
            tag="router-link"
            :to="{
              name: $route.meta.routeShow,
              params: { id: data.item.id },
            }"
            class="btn-icon mr-50"
            size="sm"
            variant="flat-info"
          >
            <feather-icon icon="SearchIcon" />
          </b-button>
        </b-row>
      </template>
    </b-table>
    <b-row>
      <b-col md="12" class="ml-1 my-2">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          first-number
          last-number
          prev-class="prev-item"
          next-class="next-item"
          class="mb-0"
        >
          <template #prev-text>
            <feather-icon icon="ChevronLeftIcon" size="18" />
          </template>
          <template #next-text>
            <feather-icon icon="ChevronRightIcon" size="18" />
          </template>
        </b-pagination>
      </b-col>
    </b-row>
  </b-overlay>
</template>

<script>
import {
  BRow,
  BCol,
  BTable,
  BButton,
  BOverlay,
  BAvatar,
  BPagination,
} from 'bootstrap-vue'

export default {
  components: {
    BCol,
    BRow,
    BTable,
    BButton,
    BOverlay,
    BAvatar,
    BPagination,
  },
  data() {
    return {
      loading: false,
      currentPage: 1,
      perPage: 10,
      totalRows: 0,
      fields: [
        {
          key: 'user_to.full_name',
          label: 'Partner',
        },
        {
          key: 'invoice_km_id',
          label: 'No. Invoice',
        },
        {
          key: 'invoice_period',
          label: 'Tanggal',
        },
        {
          key: 'invoice_peroid',
          label: 'Jumlah Talent',
        },
        {
          key: 'invoice_peroid',
          label: 'Nominal',
        },
        {
          key: 'paid',
          label: 'Paid',
        },
        {
          key: 'cancel',
          label: 'Cancel',
        },
        {
          key: 'action',
          label: 'Aksi',
        },
      ],
      items: [],
    }
  },
  mounted() {
    this.getData()
  },
  watch: {
    currentPage() {
      this.getData()
    },
  },
  methods: {
    async getData() {
      this.loading = true
      const userRequesterId = this.$store.state.auth.userData.role_name !== 'Admin'
        ? this.$store.state.auth.userData.id
        : ''

      this.$http
        .get(
          `/invoice?page=${this.currentPage}&limit=${this.perPage}&invoice_type=2&status=2,3&user_requester_id=${userRequesterId}`,
        )
        .then(res => {
          const { data } = res.data
          this.items = data.data
          this.totalRows = data.total
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
