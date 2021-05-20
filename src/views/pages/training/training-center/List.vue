<template>
  <b-row>
    <b-col cols="12">
      <b-card no-body>
        <b-card-body>
          <b-form-row class="align-items-md-center">
            <b-col>
              <b-card-title class="mb-1 mb-md-0">
                {{ $route.meta.name.plural }}
              </b-card-title>
            </b-col>
            <b-col cols="auto">
              <!-- Card Actions -->
              <b-card-actions-container
                class="mr-md-50"
                :available-actions="['refresh']"
                @refresh="reload"
              />
            </b-col>
            <b-col md="auto">
              <b-form-group class="mb-0">
                <b-input-group
                  class="input-group-merge"
                  size="sm"
                >
                  <b-input-group-prepend is-text>
                    <feather-icon icon="SearchIcon" />
                  </b-input-group-prepend>
                  <b-form-input
                    id="filterInput"
                    v-model="filter"
                    type="search"
                    placeholder="Cari..."
                    debounce="500"
                  />
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-form-row>
        </b-card-body>
        <b-overlay
          variant="light"
          :show="loading"
          spinner-variant="primary"
          blur="0"
          opacity=".5"
          rounded="sm"
        >
          <div
            v-if="!loading && !items.length && filter"
            class="text-center pt-4 pb-5 mb-1"
          >
            Tidak ada hasil untuk kata kunci '{{ filter }}'.
          </div>
          <div
            v-else-if="!loading && !items.length"
            class="text-center pt-4 pb-5 mb-1"
          >
            Tidak ada data untuk ditampilkan.
          </div>
          <div
            v-else
            class="px-2 pb-3"
          >
            <b-row
              class="match-height"
              style="min-height: 200px"
            >
              <b-col
                v-for="item in items"
                :key="`item-${item.id}`"
                md="3"
              >
                <b-card
                  class="border"
                  no-body
                >
                  <b-card-body>
                    <div class="w-100 my-2 px-2">
                      <b-img
                        fluid
                        class="w-100 training-center-img"
                        :src="meetingImg"
                        alt="Meeting"
                      />
                    </div>
                    <div class="text-center card-title">
                      {{ item.name }}
                    </div>
                    <b-form-row class="font-small-3">
                      <b-col cols="auto">
                        Kapasitas:
                      </b-col>
                      <b-col class="font-weight-bolder">
                        {{ item.capacity }}
                      </b-col>
                    </b-form-row>
                    <b-form-row class="font-small-3">
                      <b-col cols="auto">
                        Lokasi:
                      </b-col>
                      <b-col class="font-weight-bolder">
                        {{ item.address }}
                      </b-col>
                    </b-form-row>
                  </b-card-body>
                  <b-card-footer class="pt-1 border-top-0">
                    <b-row v-if="!isDeleted(item.id)">
                      <b-col>
                        <b-button
                          v-if="hasActionEdit"
                          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                          tag="router-link"
                          :to="{ name: $route.meta.routeEdit, params: { id: item.id } }"
                          size="sm"
                          variant="primary"
                          class="px-2"
                        >
                          Edit
                        </b-button>
                      </b-col>
                      <b-col cols="auto">
                        <b-button
                          v-if="hasActionDelete"
                          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                          class="btn-icon"
                          size="sm"
                          variant="flat-primary"
                          @click="confirmDelete(item)"
                        >
                          <feather-icon
                            icon="Trash2Icon"
                          />
                        </b-button>
                      </b-col>
                    </b-row>
                    <b-alert
                      v-else
                      class="mb-0"
                      variant="primary"
                      show
                    >
                      <div class="alert-body">
                        <span><strong>Deleted</strong></span>
                      </div>
                    </b-alert>
                  </b-card-footer>
                </b-card>
              </b-col>
            </b-row>
            <div
              v-if="items.length && items.length < total"
              class="text-center mt-1"
            >
              <b-button
                variant="primary"
                class="px-2"
                :disabled="loadingLoadMore"
                @click="loadMore"
              >
                <b-spinner
                  v-if="loadingLoadMore"
                  small
                />
                Lebih banyak
              </b-button>
            </div>
            <div
              v-if="items.length && items.length === total"
              class="text-center pt-1"
            >
              Menampilkan seluruh hasil.
            </div>
          </div>
        </b-overlay>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
/* eslint-disable global-require */
import BCardActionsContainer from '@core/components/b-card-actions/BCardActionsContainer.vue'
import {
  BRow, BButton, BSpinner, BAlert, BFormRow, BCol, BCard, BCardBody, BCardTitle, BFormGroup, BInputGroup, BFormInput, BInputGroupPrepend, BImg, BOverlay, BCardFooter,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BRow,
    BButton,
    BAlert,
    BFormRow,
    BCol,
    BCard,
    BCardTitle,
    BCardBody,
    BCardFooter,
    BCardActionsContainer,
    BFormGroup,
    BInputGroup,
    BFormInput,
    BInputGroupPrepend,
    BImg,
    BOverlay,
    BSpinner,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      perPage: 8,
      filter: '',
      total: 1,
      currentPage: 1,
      sortBy: '',
      sortDirection: 'asc',
      items: [],
      endpointGetAll: '/trainingCenter',
      endpointDelete: '/trainingCenter/:id',
      meetingImg: require('@/assets/images/illustration/meeting.svg'),
      loading: false,
      loadingLoadMore: false,
      deletedIds: [],
      fields: [
        { key: 'id', label: 'Id' },
        { key: 'name', label: 'Nama' },
      ],
    }
  },
  computed: {
    hasActionDelete() {
      return this.endpointDelete !== undefined
    },
    hasActionEdit() {
      return this.$route.meta.routeEdit !== undefined
    },
    hasActionCreate() {
      return this.$route.meta.routeCreate !== undefined
    },
  },
  watch: {
    filter() {
      this.reload()
    },
  },
  mounted() {
    this.reload()
  },
  methods: {
    async reload() {
      this.loading = true
      this.currentPage = 1
      this.items = await this.loadItems()
      this.loading = false
    },
    async loadMore() {
      this.loadingLoadMore = true
      this.currentPage += 1

      const newItems = await this.loadItems()
      if (!newItems.length) this.currentPage += 1

      this.items = [...this.items, ...newItems]
      this.loadingLoadMore = false
    },
    loadItems() {
      return this.$http.get(this.endpointGetAll, {
        params: {
          keyword: this.filter,
          page: this.currentPage,
          limit: this.perPage,
          sort: this.sortBy,
          direction: this.sortDirection,
        },
      }).then(response => {
        const { data } = response.data.data
        this.total = response.data.data.total
        return data
      }).catch(() => {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Failure',
            icon: 'AlertCircleIcon',
            text: 'Unable to load the table data. Please try again later or contact support.',
            variant: 'danger',
          },
        })
      })
    },
    confirmDelete(data) {
      this.$swal({
        title: 'Anda yakin?',
        text: `Hapus satu ${this.$route.meta.name.singular} dari tabel. Aksi ini tidak dapat dibatalkan.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, Hapus!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.delete(data)
        }
      })
    },
    delete(data) {
      this.loading = true
      const endpoint = this.endpointDelete.replace(/:id/g, data.id)

      this.$http.delete(endpoint)
        .then(() => {
          this.deletedIds.push(data.id)
        })
        .finally(() => {
          this.loading = false
        })
    },
    isDeleted(id) {
      return this.deletedIds.includes(id)
    },
  },
}
</script>
