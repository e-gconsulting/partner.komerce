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

      <template #cell(draft)="data">
        <b-avatar variant="primary" v-if="data.item.status >= 0">
          <feather-icon icon="CheckIcon" />
        </b-avatar>
      </template>

      <template #cell(published)="data">
        <b-avatar variant="primary" v-if="data.item.status >= 1">
          <feather-icon icon="CheckIcon" />
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
            variant="flat-warning"
          >
            <feather-icon icon="EditIcon" />
          </b-button>
          <b-button
            class="btn-icon mr-50"
            size="sm"
            variant="flat-danger"
            @click="remove(data.item.id)"
            v-if="data.item.status == 0"
          >
            <feather-icon icon="TrashIcon" />
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
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

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
          key: 'draft',
          label: 'Draft',
        },
        {
          key: 'published',
          label: 'Published',
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
      this.$http
        .get(
          `/invoice?page=${this.currentPage}&limit=${this.perPage}&invoice_type=1&status=0,1`,
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
    async remove(id) {
      this.loading = true
      this.$http
        .post(`api/invoice/admin/deleteDraft/${id}`, {
          _method: 'DELETE',
        })
        .then(() => {
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Success',
                text: this.successText,
                variant: 'success',
                attachment: 'CheckIcon',
              },
            },
            { timeout: 2500 },
          )
          this.getData()
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
