<template>
  <b-card>
    <h3 class="text-black">
      <strong>
        Riwayat Pengajuan Pickup
      </strong>
    </h3>

    <b-row class="mt-3 justify-content-center">
      <b-col cols="11">
        <h4 class="text-black">
          <strong>
            Penjemputan
          </strong>
        </h4>
      </b-col>
      <b-col cols="11">
        <hr style="height:1px;border-width:0;color:#C2C2C2;background-color:#C2C2C2">
      </b-col>
    </b-row>
    <b-overlay
      variant="light"
      :show="loading"
      spinner-variant="primary"
      blur="0"
      opacity=".5"
      rounded="sm"
    >
      <b-form @submit.prevent>
        <b-row class="justify-content-center">
          <b-col cols="11">
            <b-form-group
              label="Alamat"
              label-for="h-first-name"
              label-cols-md="2"
              label-class="text-black font-weight-bold"
            >
              <b-row class="mt-50">
                <b-col md="10">
                  <h5 class="text-black">
                    <strong>
                      {{ addressName }}
                    </strong>
                  </h5>
                  <p>
                    {{ addressDetail }}
                  </p>
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>
          <b-col cols="11">
            <b-form-group
              label="Tanggal"
              label-for="h-email"
              label-cols-md="2"
              label-class="text-black font-weight-bold"
            >
              <div class="add-pickup-input-date-label mt-50">
                {{ dateLabel }}
              </div>
            </b-form-group>
          </b-col>
          <b-col cols="11">
            <b-form-group
              label="Waktu Jemput"
              label-for="h-number"
              label-cols-md="2"
              label-class="text-black font-weight-bold"
            >
              <p class="mt-50">
                {{ timeValueText }}
              </p>
            </b-form-group>
          </b-col>
          <b-col cols="11">
            <b-form-group
              label="Kendaraan"
              label-for="h-password"
              label-cols-md="2"
              label-class="text-black font-weight-bold"
            >
              <div
                id="input-pickup-vehicle"
                class="add-pickup-input-vehicle-btn-wrapper"
              >
                <b-button
                  v-if="profile && profile.vehicle && profile.vehicle.indexOf('MOTOR') > -1"
                  :class="`vehicle-button-content ${chosenVehicle === 'MOTOR' ? 'vehicle-selected white-button mr-1' : 'vehicle-button mr-1 d-none'}`"
                >
                  <img src="@/assets/images/icons/motor.png">
                  <span>Motor</span>
                </b-button>
                <b-button
                  v-if="profile && profile.vehicle && profile.vehicle.indexOf('MOBIL') > -1"
                  :class="`vehicle-button-content ${chosenVehicle === 'MOBIL' ? 'vehicle-selected white-button mr-1' : 'vehicle-button mr-1 d-none'}`"
                >
                  <img src="@/assets/images/icons/mobil.png">
                  <span>Mobil</span>
                </b-button>
                <b-button
                  v-if="profile && profile.vehicle && profile.vehicle.indexOf('TRUCK') > -1"
                  :class="`vehicle-button-content vehicle-button-content-truk ${chosenVehicle === 'TRUCK' ? 'vehicle-selected white-button' : 'vehicle-button d-none'}`"
                >
                  <img src="@/assets/images/icons/truk.png">
                  <span>Truk</span>
                </b-button>
              </div>
            </b-form-group>
          </b-col>
          <b-col
            class="mt-1"
            cols="11"
          >
            <b-form-group
              label="Orderan"
              label-for="h-password"
              label-cols-md="2"
              label-class="text-black font-weight-bold"
            />
          </b-col>
        </b-row>

        <div v-if="selectedOrderToStore === []">
          <b-row class="justify-content-center">
            <b-col
              cols="11"
              class="d-flex justify-content-between"
            >
              <div>
                <h5>
                  <strong>
                    Produk
                  </strong>
                </h5>
              </div>
              <div>
                <h5>
                  <strong>
                    Jumlah
                  </strong>
                </h5>
              </div>
            </b-col>
            <b-col cols="11">
              <hr style="height:1px;border-width:0;color:#C2C2C2;background-color:#C2C2C2">
            </b-col>
          </b-row>
        </div>

        <b-row class="justify-content-center mt-1">
          <b-col cols="11">
            <b-table
              :fields="fieldsPreviewProductOrder"
              :items="itemsPreviewProductOrder"
            >
              <template #cell(product)="data">
                <b-row class="">
                  <div
                    fluid
                    class="d-flex"
                  >
                    <div>
                      <b-avatar
                        variant="light-primary"
                        square
                        size="50px"
                        :src="data.item.product_image"
                      />
                    </div>
                    <div class="ml-1">
                      <h5 class="text-black">
                        <strong>
                          {{ data.item.product_name }}
                        </strong>
                      </h5>
                      <div v-if="data.item.product_variant_name !== ''">
                        <span class="text-black">
                          <strong>
                            {{ data.item.product_variant_name }}
                          </strong>
                        </span>
                      </div>
                      <div v-else>
                        <span class="text-black">
                          <strong>
                            Tidak ada variasi
                          </strong>
                        </span>
                      </div>
                    </div>
                  </div>
                </b-row>
              </template>

              <template #cell(total)="data">
                <h5 class="text-black">
                  <strong>
                    {{ data.item.qty }}
                  </strong>
                </h5>
              </template>

            </b-table>
          </b-col>
        </b-row>

        <b-row class="justify-content-center mb-1">
          <b-col
            class="mb-1"
            cols="11"
          >
            <hr style="height:2px;border-width:0;color:#ebe9f1;background-color:#ebe9f1">
          </b-col>
          <b-col
            cols="11"
            class="d-flex justify-content-between pl-0"
          >
            <div>
              <b-button
                class="btn-icon"
                variant="flat-info"
                tag="router-link"
                :to="{ name: $route.meta.routeDetailOrderan, params: { selected_order_from_history: itemsDataOrder } }"
              >
                Lihat detail...
              </b-button>
            </div>
            <div>
              <span class="text-black">
                <strong>
                  Total: {{ itemsPreviewProductOrder.length }}
                </strong>
              </span>
            </div>
          </b-col>
        </b-row>

      </b-form>
    </b-overlay>

  </b-card>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BFormGroup,
  BForm,
  BButton,
  BTable,
  BAvatar,
  BOverlay,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import useJwt from '@/auth/jwt/useJwt'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
// import httpKomship from '../../setting-kompship/http_komship'

export default {

  components: {
    BCard,
    BRow,
    BCol,
    BFormGroup,
    BForm,
    BButton,
    BTable,
    BAvatar,
    BOverlay,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      loading: false,

      addressName: '',
      addressDetail: '',
      dateValue: new Date(),
      dateLabel: '',

      timeValueText: '09 : 00',
      timeValue: '09:00',

      profile: null,
      chosenVehicle: '',

      itemsAddress: [],
      selectedOrderToStore: [],
      selectedAddress: '',

      fieldsPreviewProductOrder: [
        {
          key: 'product',
          label: 'Produk',
          thClass: 'bg-white text-black text-start pl-0 ml-0 border-top-0',
          tdClass: 'text-start pl-1 border-top-0',
        },
        {
          key: 'total',
          label: 'Jumlah',
          tdClass: 'text-center border-top-0',
          thClass: 'text-center text-black bg-white border-top-0',
          class: 'col-action',
        },
      ],
      itemsPreviewProductOrder: [],
      selectedOrdersId: [],

      namePic: '',
      picPhone: '',
      addressId: '',

      id: this.$route.params.order_data_id,

      itemsDataOrder: [],
    }
  },
  mounted() {
    this.getProfile()
  },
  methods: {
    getProfile() {
      this.loading = true
      this.$http_komship.post('v1/my-profile', {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(response => {
        this.userData = response.data.data
        this.profile = response.data.data
        console.log('profile', this.profile)
        this.getDetailPickup()
      }).catch(() => {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Gagal',
            icon: 'AlertCircleIcon',
            text: 'Gagal meload data, silahkan refresh halaman!',
            variant: 'danger',
          },
        })
        this.loading = false
      })
    },
    getDetailPickup() {
      this.$http_komship.get(`/v1/pickup/history/detail/${this.id}`, {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(response => {
        const { data } = response.data
        console.log(data)
        this.itemsDataOrder = data
        this.addressName = data.address_name
        this.addressDetail = data.address_detail
        this.timeValueText = data.pickup_time
        this.dateLabel = data.pickup_date
        this.chosenVehicle = data.vehicle
        this.itemsPreviewProductOrder = data.data_order
        this.loading = false
      }).catch(() => {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Gagal',
            icon: 'AlertCircleIcon',
            text: 'Gagal meload data, silahkan refresh halaman!',
            variant: 'danger',
          },
        })
        this.loading = false
      })
    },
  },
}
</script>

<style>

</style>
<style lang="scss">
  @import '~@core/scss/vue/libs/vue-select.scss';
  @import '../add-pickup.scss';
</style>
