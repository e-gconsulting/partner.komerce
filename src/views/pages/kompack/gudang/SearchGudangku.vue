<template>
  <BCard body>
    <div class="d-flex flex-column">
      <h3 class="font-bold text-black mb-0">
        Cari Gudang
      </h3>
      <div class="text-muted">
        Temukan mitra gudangmu
      </div>
    </div>
    <div class="d-flex justify-content-end">
      <div class="d-flex flex-row">
        <div>
          <b-input-group class="input-group-merge">
            <b-input-group-prepend is-text>
              <feather-icon icon="SearchIcon" />
            </b-input-group-prepend>
            <b-form-input
              id="search"
              v-model="searchGudang"
              type="search"
              class="form-search"
              placeholder="Cari nama gudang atau pemilik"
              @change="getGudangList()"
            />
          </b-input-group>
        </div>
        <div class="pl-1">
          <b-dropdown
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            right
            no-caret
            variant="primary"
            toggle-class="p-0"
          >
            <template
              #button-content
            >
              <img
                style="margin: 7px;"
                src="https://storage.googleapis.com/komerce/assets/komerce-icon/Putih/candle.svg"
              >
            </template>
            <b-dropdown-form
              style="width: 340px;"
            >
              <h5 class="font-bold text-black">
                Filter
              </h5>
              <b-form>
                <div class="d-flex flex-column gap-3">
                  <div class="">
                    <label class="font-bold">Urut berdasarkan</label>
                    <v-select
                      v-model="sortTanggal"
                      class="w-100"
                      :clearable="false"
                      :options="sortList"
                      :reduce="sort => sort.value"
                    />
                  </div>
                  <div class="">
                    <label class="font-bold">Kota</label>
                    <v-select
                      v-model="cityGudang"
                      class="w-100"
                      :clearable="false"
                      :options="cityList"
                      :reduce="city => city.value"
                    />
                  </div>
                  <div class="">
                    <label class="font-bold">Status</label>
                    <v-select
                      v-model="statusGudang"
                      class="w-100"
                      :clearable="false"
                      :options="statusList"
                      :reduce="status => status.value"
                    />
                  </div>
                  <div class="d-flex flex-row justify-content-start mt-1">
                    <b-button
                      type="reset"
                      variant="outline-primary"
                      @click="onReset()"
                    >
                      Reset
                    </b-button>
                    <b-button
                      class="ml-1"
                      variant="primary"
                      @click="getGudangList()"
                    >
                      Terapkan
                    </b-button>
                  </div>
                </div>
              </b-form>
            </b-dropdown-form>
          </b-dropdown>
        </div>
      </div>
    </div>
    <hr class="-mx-6">
    <!-- GUDANG LIST -->
    <div
      id="gudang"
      class="container-gudang"
    >
      <b-overlay
        variant="light"
        :show="loading"
        spinner-variant="primary"
        blur="0"
        opacity=".5"
        rounded="sm"
      >
        <div v-if="listGudang[0] === undefined">
          <div class="text-center">
            <div class="text-xl font-semibold my-2">
              <p>Tidak ada data untuk ditampilkan</p>
            </div>
          </div>
        </div>
        <div v-else>
          <div
            v-for="(item) in listGudang"
            :key="item.id"
            class="pt-1 pb-1 d-flex flex-row"
          >
            <div>
              <img
                class="img-gudang"
                :src="item.image_warehouse? item.image_warehouse : $assets('assets/illustration/image_not_found.svg')"
                alt=""
              ></div>
            <div class="w-100  pl-2 pr-2 d-flex flex-col">
              <div class="d-flex justify-items-center flex-row">
                <div>
                  <b-avatar
                    size="3rem"
                    variant="info"
                    :src="item.image_logo_url ? item.image_logo_url : $assets('assets/illustration/image_not_found.svg')"
                  />
                </div>
                <div class="d-flex flex-col pl-1">
                  <h5 class="title">
                    <b>{{ item.name }}</b>
                  </h5>
                  <p>{{ item.join_date }}</p>
                </div>
              </div>
              <div class="d-flex flex-row">
                <table>
                  <tbody>
                    <tr valign="top">
                      <td>
                        Kota
                      </td>
                      <td class="td-divider">
                        :
                      </td>
                      <td>
                        {{ item.city_name }}
                      </td>
                    </tr>
                    <tr valign="top">
                      <td>
                        Owner
                      </td>
                      <td class="td-divider">
                        :
                      </td>
                      <td>
                        {{ item.owner }}
                      </td>
                    </tr>
                    <tr valign="top">
                      <td>
                        Deskripsi
                      </td>
                      <td class="td-divider">
                        :
                      </td>
                      <td class="desc">
                        {{ item.description }}
                      </td>
                    </tr>
                    <tr valign="top">
                      <td />
                      <td />
                      <td>
                        <button

                          tag="router-link"
                          class="btn btn-link custom-btn"
                          @click="detailClick(item)"
                        >
                          Lihat Detail
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <b-badge
                v-if="item.availability==='Penuh'"
                variant="danger"
              >
                {{ item.availability }}
              </b-badge>
              <b-badge
                v-if="item.availability==='Tersedia'"
                variant="success"
              >
                {{ item.availability }}
              </b-badge>
            </div>
          </div>
        </div>
      </b-overlay>
    </div>

    <!-- POPUP -->
    <b-modal
      id="modal-blocker-profile"
      hide-footer
      hide-header
      modal-class="modal-dark"
      centered
      no-close-on-backdrop
      no-close-on-esc
    >
      <b-col
        md="12"
        class="d-flex justify-content-center pt-1"
      >
        <b-img
          width="100"
          src="https://storage.googleapis.com/komerce/core/icon-popup-warning.png"
        />
      </b-col>

      <b-col class="text-center px-5 pt-2 text-black">
        Kamu belum melengkapi profile, yuk lengkapi profilemu terlebih dahulu
      </b-col>
      <b-col class="text-center px-5 py-2">
        <b-btn
          variant="primary"
          @click="goToProfile()"
        >
          Lengkapi Profile
        </b-btn>
      </b-col>
    </b-modal>
  </BCard>
</template>

<script>
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import moment from 'moment'

export default {
  components: {
    vSelect,
  },
  data() {
    return {
      noHPBisnis: null,
      partnerBisnis: null,

      searchGudang: '',
      sortTanggal: 'DESC',
      cityGudang: null,
      statusGudang: null,
      limits: 10,
      offset: 0,
      lastData: false,

      searchProduct: '',
      loading: false,
      listGudang: [],

      sortList: [
        {
          label: 'Tanggal Bergabung : Terbaru',
          value: 'DESC',
        },
        {
          label: 'Tanggal Bergabung : Terlama',
          value: 'ASC',
        },
      ],
      cityList: [
        {
          label: 'Semua Kota',
          value: null,
        },
      ],
      statusList: [
        {
          label: 'Semua',
          value: null,
        },
        {
          label: 'Penuh',
          value: 0,
        },
        {
          label: 'Tersedia',
          value: 1,
        },
      ],
    }
  },

  created() {
    this.fetchMyProfile()
  },
  mounted() {
    this.getGudangList()
    this.getCityList()
    window.onscroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.getElementById('gudang').offsetHeight && !this.loading) {
        this.getNextGudangList()
      }
    }
  },
  methods: {
    async fetchMyProfile() {
      await this.$http_komship.post('/v1/my-profile')
        .then(response => {
          this.noHPBisnis = response.data.data.partner_no_hp_business
          this.partnerBisnis = response.data.data.partner_business_name
          if (this.noHPBisnis === null) this.$bvModal.show('modal-blocker-profile')
          if (this.partnerBisnis === null) this.$bvModal.show('modal-blocker-profile')
        }).catch(() => {
          this.loading = false
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Gagal',
                icon: 'AlertCircleIcon',
                text: 'Gagal load data, silahkan coba lagi',
                variant: 'danger',
              },
            },
            2000,
          )
        })
    },
    goToProfile() {
      this.$router.push({
        path: '/setting-kompship/profile',
      })
    },

    async getGudangList() {
      this.offset = 0
      this.loading = true
      await this.$http_komship.get('/v1/komship/warehouse/search', {
        params: {
          search: this.searchGudang,
          sort: this.sortTanggal,
          city_name: this.cityGudang,
          status: this.statusGudang,
          limits: this.limits,
          offset: this.offset,
        },
      }).then(response => {
        this.loading = false
        const { data } = response.data
        this.listGudang = data
        if (data.length < this.limits) {
          this.lastData = true
        } else {
          this.lastData = false
        }
        this.offset = data.length
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },

    async getNextGudangList() {
      if (!this.lastData) {
        this.loading = true
        await this.$http_komship.get('/v1/komship/warehouse/search', {
          params: {
            search: this.searchGudang,
            sort: this.sortTanggal,
            city_name: this.cityGudang,
            status: this.statusGudang,
            limits: this.limits,
            offset: this.offset,
          },
        }).then(response => {
          this.loading = false
          const { data } = response.data
          this.listGudang.push(...data)
          this.offset += data.length
          if (data.length < this.limits) {
            this.lastData = true
          }
        }).catch(err => {
          this.loading = false
          console.log(err)
        })
      }
    },

    getCityList() {
      this.$http_komship.get('/v1/komship/warehouse/option/destination')
        .then(res => {
          const { data } = res.data
          this.cityList.push(...data.map(obj => ({
            label: obj.city_name,
            value: obj.city_name,
          })))
        }).catch(err => {
          console.log(err)
        })
    },
    detailClick(item) {
      this.$router.push({ path: `/search-gudang/detail/${item.mitra_id}` })
    },
    onReset() {
      this.searchGudang = ''
      this.sortTanggal = 'DESC'
      this.cityGudang = null
      this.statusGudang = null
      this.getGudangList()
    },
    formatDate(d) {
      return moment(d).format('D MMM YYYY')
    },
    setCustomDate() {
      this.titleCustomDate = 'Custom Tanggal'
    },
    removeCustomDate() {
      this.titleCustomDate = null
    },
    momentTime(date) {
      const validDate = moment(date)
      if (validDate.isValid()) {
        return moment(date).format('HH:mm')
      }
      return ''
    },
    formatNumber: value => `${value}`.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
    moment(date) {
      const validDate = moment(date)
      if (validDate.isValid()) {
        return moment(date).format('DD-MM-YYYY')
      }
      return ''
    },
  },
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
.vs__dropdown-menu {
  max-height: 137px;
}
</style>
<style lang="scss" scoped>
.input-group{
  height: 40px;
  min-width: 300px;
}

.input-group{
  height: 40px;
  min-width: 300px;
}
input{
  height: 40px !important;
}
.img-gudang{
  border-radius: 12px;
  width: 195px;
  height: 144px;
  object-fit: cover;
}
.title{
  font-weight: 500;
}
.custom-btn{
  padding-left: 0px !important;
}
.td-divider{
  padding-left: 16px !important;
  padding-right: 8px !important;
}
.container-gudang{
  width: 100%;
  min-height: 150px;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
}
.b-overlay-wrap{
  width: 100% !important;
}
.desc {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  @supports (-webkit-line-clamp: 2) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: initial;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
.daterangepicker {
  position: absolute !important;
  color: inherit !important;
  background-color: #fff !important;
  border-radius: 4px !important;
  border: 1px solid #ddd !important;
  width: 278px !important;
  max-width: none !important;
  padding: 0 !important;
  margin-top: 7px !important;
  top: 100px !important;
  left: 20px !important;
  z-index: 3001 !important;
  display: none !important;
  font-size: 15px !important;
  line-height: 1em !important;
}
</style>
