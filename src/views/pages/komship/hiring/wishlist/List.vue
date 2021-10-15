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
            <b-col
              md="auto"
              class="pr-0"
            >
              <b-button
                v-if="false"
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                size="sm"
                class="mr-25"
                @click="toggleModal"
              >
                <feather-icon
                  icon="FilterIcon"
                  class="mr-50"
                />
                Filter
              </b-button>
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
        <div
          v-if="false"
          class="mt-1 pl-2 d-flex overflow-x-scroll overflow-y-hidden"
        >
          <div
            v-for="(item, index) in filterPositionItems"
            :key="`filter-position-${item.id}`"
            class="mr-50"
          >
            <b-form-group>
              <b-button
                :variant="filterPositionId === item.id ? 'primary' : 'flat-primary'"
                class="text-nowrap"
                :class="{'mr-2': index === (filterPositionItems.length - 1)}"
                :pressed="filterPositionId === item.id"
                pill
                size="sm"
                @click="selectPosition(item.id)"
              >
                {{ item.position_name }}
              </b-button>
            </b-form-group>
          </div>
        </div>
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
                    <div class="mb-1 text-center">
                      <b-avatar
                        size="86px"
                        variant="light-secondary"
                        :src="item.photo_profile_url"
                      />
                    </div>
                    <div class="text-center card-title text-capitalize">
                      {{ item.talent.user.full_name.toLowerCase() }}
                    </div>
                    <div class="d-flex align-items-center card-subtitle justify-content-center mt-n1 mb-2">
                      <span class="text-muted mr-50">Rating:</span>
                      <h4 class="mb-0">
                        {{ item.rating }}
                      </h4>
                      <feather-icon
                        icon="StarIcon"
                        class="ml-25 text-warning filled mt-n25"
                        size="16"
                      />
                    </div>
                    <b-form-row class="font-small-3 mb-50">
                      <b-col cols="auto">
                        Posisi
                      </b-col>
                      <b-col class="font-weight-bolder">
                        {{ item.talent.user.position_name || '-' }}
                      </b-col>
                    </b-form-row>
                    <b-form-row class="font-small-3">
                      <b-col cols="auto">
                        Lokasi
                      </b-col>
                      <b-col class="font-weight-bolder">
                        {{ item.talent.user.address }}
                      </b-col>
                    </b-form-row>
                  </b-card-body>
                  <b-card-footer class="pt-1 border-top-0">
                    <b-row>
                      <b-col
                        cols="auto"
                        class="ml-auto"
                      >
                        <b-button
                          v-b-tooltip.hover="'Wishlist'"
                          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                          class="btn-icon mr-50"
                          size="sm"
                          variant="outline-danger"
                          @click="wishlistToggle(item)"
                        >
                          <feather-icon
                            icon="HeartIcon"
                            :class="{ 'filled': isWishlist(item.talent.id) }"
                            size="12"
                          />
                        </b-button>
                        <b-button
                          v-if="hasActionShow"
                          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                          tag="router-link"
                          :to="{ name: $route.meta.routeShow, params: { id: item.talent.id } }"
                          size="sm"
                          variant="primary"
                          class="py-50"
                        >
                          Lihat Profile
                        </b-button>
                      </b-col>
                    </b-row>
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

    <b-modal
      id="form-modal"
      ref="formModal"
      title="Filter"
      centered
    >
      <validation-observer ref="formRules">
        <b-form @submit.stop.prevent="submitFilter">
          <b-col md="12">
            <b-form-group
              label="Sektor bisnis"
              label-cols-md="12"
            >
              <validation-provider
                #default="{ errors }"
                name="Sektor bisnis"
              >
                <v-select
                  v-model="filterPartnerCategoryId"
                  label="partner_category_name"
                  :reduce="option => option.id"
                  :options="filterPartnerCategoryItems"
                  :state="errors.length > 0 ? false:null"
                  transition=""
                  placeholder="Ketik untuk mencari..."
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-form>
      </validation-observer>

      <template #modal-footer>
        <b-form-row class="align-items-center w-100">
          <b-col md>
            <b-button
              size="sm"
              variant="flat-danger"
              class="px-50 ml-n50"
              @click="resetForm"
            >
              Reset Filter
            </b-button>
          </b-col>
          <b-col cols="auto">
            <b-button
              variant="light"
              @click="toggleModal"
            >
              Cancel
            </b-button>
          </b-col>
          <b-col cols="auto">
            <b-button
              variant="primary"
              @click="handleOk"
            >
              Terapkan
            </b-button>
          </b-col>
        </b-form-row>
      </template>
    </b-modal>
  </b-row>
</template>

<script>
/* eslint-disable global-require */
import BCardActionsContainer from '@core/components/b-card-actions/BCardActionsContainer.vue'
import {
  BRow,
  BButton,
  BSpinner,
  BFormRow,
  BCol,
  BCard,
  BCardBody,
  BCardTitle,
  BFormGroup,
  BInputGroup,
  BFormInput,
  BInputGroupPrepend,
  BOverlay,
  BCardFooter,
  BAvatar,
  BModal,
  BForm,
  VBTooltip,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    BRow,
    BButton,
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
    BOverlay,
    BSpinner,
    BAvatar,
    BModal,
    BForm,
    vSelect,
  },
  directives: {
    'b-tooltip': VBTooltip,
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
      wishlistItems: [],
      endpointGetAll: '/wishlist',
      meetingImg: require('@/assets/images/illustration/meeting.svg'),
      loading: false,
      loadingLoadMore: false,
      deletedIds: [],
      filterPartnerCategoryItems: [],

      filterPartnerCategoryId: this.filterPartnerCategoryId,
      filterPositionId: 1,
      filterPositionItems: [],

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
    hasActionShow() {
      return this.$route.meta.routeShow !== undefined
    },
    hasActionCreate() {
      return this.$route.meta.routeCreate !== undefined
    },
    partnerProfileIncomplete() {
      return this.$store.state.auth.userData.role_name.toUpperCase() === 'PARTNER' && !this.$store.state.auth.userData.nik
    },
  },
  watch: {
    filter() {
      this.reload()
    },
    filterPositionId() {
      this.reload()
    },
  },
  mounted() {
    this.reload()
    this.loadPartnerCategories()
    this.loadFilterPositions()
  },
  methods: {
    async reload() {
      this.loading = true
      this.currentPage = 1
      this.wishlistItems = await this.loadWishlistItems()
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
          partner_category_id: this.filterPartnerCategoryId,
          position_id: this.filterPositionId,
          partner_id: this.$store.state.auth.userData.partner_detail.id,
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
    loadWishlistItems() {
      return this.$http.get('/wishlist', {
        params: {
          partner_id: this.$store.state.auth.userData.partner_detail.id,
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
            text: 'Unable to load the wishlist data. Please try again later or contact support.',
            variant: 'danger',
          },
        })
      })
    },
    loadPartnerCategories() {
      return this.$http.post('/partnerCategory', {}, {
        params: {
          sort: 'name',
          direction: 'asc',
        },
      })
        .then(async response => {
          const { data } = response.data
          this.filterPartnerCategoryItems = data
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
    wishlistToggle(data) {
      if (this.partnerProfileIncomplete) {
        this.$swal({
          title: 'Lengkapi Profil',
          text: 'Untuk dapat menambahkan talent ke wishlist, harap lengkapi profil Anda.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Lengkapi Profil',
          cancelButtonText: 'Lain kali',
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-danger ml-1',
          },
          buttonsStyling: false,
        }).then(result => {
          if (result.value) {
            this.$router.push({ name: 'partner-profile' })
          }
        })

        return
      }

      const isWishlist = this.isWishlist(data.talent.id)

      if (isWishlist) this.unWishlist(data)
      else this.wishlist(data)
    },
    wishlist(data) {
      this.wishlistItems.push({ talent: { id: data.talent.id } })

      this.$http.post('/wishlist', {
        partner_id: this.$store.state.auth.userData.partner_detail.id,
        talent_id: data.talent.id,
      })
        .then(response => {
          const dataRes = response.data.data

          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Success',
              text: 'Satu talent telah ditambahkan ke dalam wishlist',
              variant: 'success',
              icon: 'CheckIcon',
            },
          }, { timeout: 2500 })

          const index = this.wishlistItems.map(item => item.talent.id).indexOf(data.talent.id)
          this.wishlistItems[index] = dataRes
        })
        .catch(error => {
          const index = this.wishlistItems.map(item => item.talent.id).indexOf(data.talent.id)
          this.wishlistItems.splice(index, 1)

          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Failed',
              text: error.response.data.message,
              variant: 'danger',
              icon: 'AlertCircleIcon',
            },
          }, { timeout: 2500 })
        })
    },
    unWishlist(data) {
      const index = this.wishlistItems.map(item => item.talent.id).indexOf(data.talent.id)
      const wishlist = this.wishlistItems[index]

      if (!wishlist.id) return

      this.wishlistItems.splice(index, 1)

      this.$http.delete(`/wishlist/${wishlist.id}`, {
        _method: 'put',
      })
        .then(() => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Success',
              text: 'Satu talent telah dihapus dari wishlist',
              variant: 'success',
              icon: 'CheckIcon',
            },
          }, { timeout: 2500 })
        })
        .catch(error => {
          this.wishlistItems.push(wishlist)

          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Failed',
              text: error.response.data.message,
              variant: 'danger',
              icon: 'AlertCircleIcon',
            },
          }, { timeout: 2500 })
        })
    },
    isWishlist(talentId) {
      return this.wishlistItems.map(item => item.talent.id).includes(talentId)
    },
    resetForm() {
      this.filterPartnerCategoryId = ''
    },
    toggleModal() {
      this.$refs.formModal.toggle()
    },
    handleOk(event) {
      event.preventDefault()
      this.submitFilter()
    },
    submitFilter() {
      this.$refs.formRules.validate().then(success => {
        if (success) {
          this.reload()

          this.$nextTick(() => {
            this.$refs.formModal.toggle()
          })
        }
      })
    },
    loadFilterPositions() {
      return this.$http.post('/position')
        .then(async response => {
          const { data } = response.data
          this.filterPositionItems = Object.keys(data).map(key => data[key])
        })
    },
    selectPosition(id) {
      this.filterPositionId = id
    },
  },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
</style>
