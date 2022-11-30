<template>
  <div class="card">
    <div class="pl-3 pr-3 pt-3">
      <h3>Cari Gudang</h3>
      <p>Temukan mitra gudangmu</p>
    </div>

    <div class="d-flex justify-content-end pl-3 pr-3 pt-2 pb-2">
      <div class="d-flex flex-row">
        <div>
          <b-input-group class="input-group-merge">
            <b-input-group-prepend is-text>
              <feather-icon icon="SearchIcon" />
            </b-input-group-prepend>
            <b-form-input
              id="search"
              v-model="formFilter.search"
              type="search"
              class="form-search"
              placeholder="Cari nama gudang atau pemilik"
              @input="getProduct"
              @change="onChangeSearchProduct()"
            />
          </b-input-group>
        </div>
        <div class="pl-1">
          <b-dropdown
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            right
            no-caret
            variant="primary"
          >
            <template
              #button-content
            >
              <feather-icon icon="SlidersIcon" />
            </template>
            <b-dropdown-form
              style="width: 417px;"
            >
              <h5>Filter</h5>
              <b-form>
                <div class="d-flex flex-column">
                  <div class="mt-1">
                    <label for="">Tanggal Bergabung</label>
                    <date-range-picker
                      ref="picker"
                      v-model="dateRange"
                      :locale-data="locale"
                      :ranges="ranges"
                      :opens="'left'"
                      class="w-100"
                      @start-selection="setCustomDate"
                      @finish-selection="setCustomDate"
                      @select="removeCustomDate"
                    >
                      <template
                        v-slot:input="picker"
                        style="min-width: 350px"
                      >
                        <div
                          class="d-flex justify-content-between align-items-center"
                        >
                          <span
                            class="mr-2"
                          >{{ formatDate(picker.startDate) }} -
                            {{ formatDate(picker.endDate) }}</span>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8 2V5"
                              stroke="#222222"
                              stroke-width="1.5"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M16 2V5"
                              stroke="#222222"
                              stroke-width="1.5"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M3.5 9.08984H20.5"
                              stroke="#222222"
                              stroke-width="1.5"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                              stroke="#222222"
                              stroke-width="1.5"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M15.6947 13.7002H15.7037"
                              stroke="#222222"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M15.6947 16.7002H15.7037"
                              stroke="#222222"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M11.9955 13.7002H12.0045"
                              stroke="#222222"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M11.9955 16.7002H12.0045"
                              stroke="#222222"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M8.29431 13.7002H8.30329"
                              stroke="#222222"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M8.29431 16.7002H8.30329"
                              stroke="#222222"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </div>
                      </template>
                    </date-range-picker>
                  </div>
                  <b-form-group
                    id="city_name"
                    class="mt-1"
                    label="Kota"
                    label-for="city_name"
                  >
                    <b-form-input
                      id="city_name"
                      v-model="formFilter.city_name"
                      type="text"
                      placeholder="Masukan Kota"
                    />
                  </b-form-group>
                  <b-form-group
                    id="input-group-3"
                    class=""
                    label="Status"
                    label-for="input-3"
                  >
                    <b-form-select
                      id="input-3"
                      v-model="status"
                      :options="statusList"
                      label-field="text"
                      text-field="text"
                      @change="onchangeStatus"
                    />
                  </b-form-group>
                  <div class="d-flex flex-row justify-content-start">
                    <b-button
                      type="reset"
                      variant="outline-primary"
                      @click="onReset()"
                    >
                      Submit
                    </b-button>
                    <b-button
                      type="reset"
                      class="ml-1"
                      variant="primary"
                      @click="onSubmitFilter()"
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
    <hr>
    <!-- GUDANG LIST -->
    <div class="container-gudang pr-3 pl-3">

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
        <!-- <div class="d-flex flex-column w-100 justify-content-center align-content-center">
          <div>
            <svg
              width="270"
              height="263"
              viewBox="0 0 270 263"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="269.635"
                height="262.982"
                fill="black"
                style="mix-blend-mode:saturation"
              />
            </svg>

          </div>
        </div> -->
      </b-overlay>
    </div>
  </div>
</template>

<script>
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

import {
  BFormInput, BInputGroup, BFormGroup, BForm, BFormDatepicker,
} from 'bootstrap-vue'
import useJwt from '@/auth/jwt/useJwt'
import moment from 'moment'
import {
  today,
  last7,
  last30,
  firstDateOfMonth,
  lastDateOfMonth,
} from '@/store/helpers'

export default {
  components: {
    BFormInput,
    BInputGroup,
    // BFormGroup,
    BForm,
    DateRangePicker,
  },
  data() {
    return {
      status: '',
      formFilter: {
        search: '',
        start_date: '',
        end_date: '',
        city_name: '',
        limits: 50,
        offset: 0,
      },
      searchProduct: '',
      loading: false,
      listGudang: [],
      statusList:
      [{
        value: null,
        text: '',
      },
      {
        value: 0,
        text: 'Penuh',
      }, {
        value: 1,
        text: 'Tersedia',
      }],
      today,
      last7,
      last30,
      firstDateOfMonth,
      lastDateOfMonth,
      valueDate: '',
      formattedDate: '',
      selectedDate: '',
      locale: {
        format: 'dd/mm/yyyy',
        daysOfWeek: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
        monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
      },
      ranges: {
        '7 Hari Terakhir': [last7, today],
        '30 Hari Terakhir': [last30, today],
        'Bulan Ini': [firstDateOfMonth, today],
        'Custom Tanggal': [today, today],
      },

      dateRange: {
        startDate: last7,
        endDate: today,
      },
    }
  },

  watch: {
    dateRange: {
      handler() {
        this.fetchData()
      },
    },
  },
  mounted() {
    const params = {
      search: this.formFilter.search,
      start_date: this.formFilter.start_date,
      end_date: this.formFilter.end_date,
      city_name: this.formFilter.city_name,
      status: this.status,
      limits: 50,
      offset: 0,
    }
    this.getGudangList(params)
  },
  methods: {
    onchangeStatus(e) {
      console.log(e)
    },
    getGudangList(params) {
      this.loading = true
      this.$http_komship.get('/v1/komship/warehouse/search', {
        params,
      }).then(response => {
        this.loading = false
        this.listGudang = response.data.data
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    detailClick(item) {
      this.$router.push({ path: `/search-gudang/detail/${item.mitra_id}` })
    },

    onSubmitFilter() {
      const params = {
        start_date: this.dateRange.startDate,
        end_date: this.dateRange.endDate,
        city_name: this.formFilter.city_name,
        status: this.status,
        limits: 50,
        offset: 0,
      }
      this.getGudangList(params)
    },
    onReset() {
      const params = {
        search: '',
        start_date: '',
        end_date: '',
        city_name: '',
        status: '',
        limits: 50,
        offset: 0,
      }
      this.getGudangList(params)
    },
    onChangeSearchProduct() {
      const params = {
        search: this.formFilter.search,
      }
      this.getGudangList(params)
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
      console.log(date)
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
  getProduct($event) {

  },
}
</script>
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
  height: 144px
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
