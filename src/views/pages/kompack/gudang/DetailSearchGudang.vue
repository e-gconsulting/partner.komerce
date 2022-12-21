<template>
  <div
    id="container"
    class="card p-3"
  >
    <div class="d-flex flex-col">
      <div class="d-flex align-items-center">
        <b-button
          variant="primary"
          size="md"
          class="mr-1 rounded-lg p-0"
          @click="$router.go(-1)"
        >
          <feather-icon
            size="2x"
            icon="ChevronLeftIcon"
          />
        </b-button>
        <h4 class="my-0">
          Informasi Gudang
        </h4>
      </div>
      <b-row>
        <b-col lg="6">
          <div class="container__img">
            <div class="boxFirst">
              <img
                ref="imageDisplayOne"
                :src="imagesone"
                class="h-100"
                alt="data logo"
              >
            </div>
            <div class="container__navimg">
              <span
                v-if="countSlide > 0"
                class="cursorLeftSlide"
                @click="handleCursor('left')"
              >
                <feather-icon
                  size="2x"
                  icon="ChevronLeftIcon"
                />
              </span>
              <div
                ref="imgcontainer__childBox"
                class="container__childBox"
              >
                <div
                  v-for="(dt, keyImg) in imagesothers"
                  :key="keyImg"
                  :ref="`childOtherbox-${keyImg}`"
                  class="childOtherbox"
                  @click="handleChangeImge(dt, `childOtherbox-${keyImg}`)"
                >
                  <img
                    :src="dt"
                    style="height: 100%"
                    alt="datalogo"
                  >
                </div>
              </div>
              <span
                v-if="countSlide < imagesothers.length - 1"
                class="cursorRightSlide"
                @click="handleCursor('right')"
              >
                <feather-icon
                  size="2x"
                  icon="ChevronRightIcon"
                />
              </span>
            </div>
          </div>
        </b-col>
        <b-col
          lg="6"
          class="p-x1 mt-1"
        >
          <div
            class="
              d-flex
              align-items-center
              justify-content-between
              containerDetail
            "
          >
            <div class="d-flex align-items-center mb-1">
              <img
                :src="detailInfo.image_logo_url"
                alt="Photo"
                class="mr-1 border-radius"
                style="
                  width: 80px;
                  height: 80px;
                  border-radius: 50%;
                  object-fit: cover;
                "
              >
              <div class="d-grid">
                <h5 class="text-black my-0">
                  {{ detailInfo.warehouse_name }}
                </h5>
                <span class="text-gray-500">{{ detailInfo.city_name }}</span>
              </div>
            </div>
            <div
              class="px-1 bg-blue-100 d-flex aling-items-center rounded-lg"
              style="padding-top: 8px; padding-bottom: 8px"
            >
              <div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.4902 2.22859L5.50016 4.10859C4.35016 4.53859 3.41016 5.89859 3.41016 7.11859V14.5486C3.41016 15.7286 4.19016 17.2786 5.14016 17.9886L9.44016 21.1986C10.8502 22.2586 13.1702 22.2586 14.5802 21.1986L18.8802 17.9886C19.8302 17.2786 20.6102 15.7286 20.6102 14.5486V7.11859C20.6102 5.88859 19.6702 4.52859 18.5202 4.09859L13.5302 2.22859C12.6802 1.91859 11.3202 1.91859 10.4902 2.22859Z"
                    stroke="#08A0F7"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9.0498 11.8697L10.6598 13.4797L14.9598 9.17969"
                    stroke="#08A0F7"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <span
                v-if="detailInfo.partner_verification === 'Terverifikasi'"
                class="text-blue-500"
              >{{ detailInfo.partner_verification }}</span>
            </div>
          </div>
          <b-row class="mb-1">
            <b-col cols="4">
              <span class="text-black">Status</span>
            </b-col>
            <span class="text-black">: </span>
            <b-col>
              <b-badge
                :variant="
                  detailInfo.availability === 'Penuh'
                    ? 'light-primary'
                    : 'light-success'
                "
              >
                {{ detailInfo.availability }}
              </b-badge>
            </b-col>
          </b-row>
          <b-row class="mb-1">
            <b-col cols="4">
              <span class="text-black">Jumlah Order</span>
            </b-col>
            <span class="text-black">: </span>
            <b-col>
              <span
                class="text-black"
              >{{ detailInfo.total_order }} Order Pengiriman</span>
            </b-col>
          </b-row>
          <b-row class="mb-1">
            <b-col cols="4">
              <span class="text-black">Owner</span>
            </b-col>
            <span class="text-black">: </span>
            <b-col class="d-flex">
              <span class="text-black mr-1">{{ detailInfo.owner }}</span>
              <div v-if="detailInfo.partner_verification === 'Terverifikasi'">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.4902 2.22859L5.50016 4.10859C4.35016 4.53859 3.41016 5.89859 3.41016 7.11859V14.5486C3.41016 15.7286 4.19016 17.2786 5.14016 17.9886L9.44016 21.1986C10.8502 22.2586 13.1702 22.2586 14.5802 21.1986L18.8802 17.9886C19.8302 17.2786 20.6102 15.7286 20.6102 14.5486V7.11859C20.6102 5.88859 19.6702 4.52859 18.5202 4.09859L13.5302 2.22859C12.6802 1.91859 11.3202 1.91859 10.4902 2.22859Z"
                    stroke="#08A0F7"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9.0498 11.8697L10.6598 13.4797L14.9598 9.17969"
                    stroke="#08A0F7"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </b-col>
          </b-row>
          <b-row class="mb-1">
            <b-col cols="4">
              <span class="text-black">Mulai Bergabung</span>
            </b-col>
            <span class="text-black">: </span>
            <b-col>
              <span class="text-black">{{ tglJoinData }}</span>
            </b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col cols="4">
              <span class="text-black">Alamat Gudang</span>
            </b-col>
            <span class="text-black">: </span>
            <b-col>
              <span class="text-black">{{ detailInfo.detail_address }}</span>
            </b-col>
          </b-row>

          <b-row>
            <b-col
              lg="6"
              md="6"
              sm="12"
              class="columnChat"
            >
              <b-button
                variant="outline-primary"
                class="d-flex justify-content-center align-items-center"
                :disabled="detailInfo.subscribe_status === 0"
                block
                @click="waWeb(detailInfo.phone_number)"
              >
                <span class="mr-1">
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.25 5.46875V9.93123C19.25 11.0425 18.8825 11.9787 18.2263 12.6262C17.5788 13.2825 16.6425 13.65 15.5312 13.65V15.2337C15.5312 15.8287 14.8662 16.1875 14.3762 15.855L13.5275 15.295C13.6063 15.0237 13.6412 14.7262 13.6412 14.4112V10.85C13.6412 9.06502 12.4513 7.875 10.6663 7.875H4.72499C4.60249 7.875 4.48875 7.88377 4.375 7.89252V5.46875C4.375 3.2375 5.8625 1.75 8.09375 1.75H15.5312C17.7625 1.75 19.25 3.2375 19.25 5.46875Z"
                      stroke="#F95031"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M13.6412 10.85V14.4112C13.6412 14.7262 13.6063 15.0237 13.5275 15.295C13.2038 16.5812 12.1363 17.3862 10.6663 17.3862H8.28625L5.64375 19.145C5.25 19.4163 4.72499 19.1275 4.72499 18.655V17.3862C3.83249 17.3862 3.08875 17.0888 2.5725 16.5725C2.0475 16.0475 1.75 15.3037 1.75 14.4112V10.85C1.75 9.18752 2.7825 8.04127 4.375 7.89252C4.48875 7.88377 4.60249 7.875 4.72499 7.875H10.6663C12.4513 7.875 13.6412 9.06502 13.6412 10.85Z"
                      stroke="#F95031"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                <span class="font-bolder"> Chat Mitra Gudang </span>
              </b-button>
            </b-col>
            <b-col
              lg="6"
              md="6"
              sm="12"
            >
              <b-button
                variant="primary"
                class="text-center py-1 px-2"
                :disabled="detailInfo.availability === 'Penuh' || detailInfo.submission_pending === 1"
                block
                @click="redirectToSubmission(detailInfo.subscribe_status)"
              >
                <span
                  v-if="detailInfo.subscribe_status === 0"
                  class="font-bolder"
                  style="font-size: 12px"
                >
                  Ajukan Langganan Gudang
                </span>
                <span
                  v-if="detailInfo.subscribe_status === 1"
                  block
                  class="font-bolder"
                  style="font-size: 12px"
                >
                  Cek Stock
                </span>
              </b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <hr class="border-gray-300 my-2">

      <div class="d-grid">
        <h5 class="text-black font-extrabold">
          Deskripsi
        </h5>
        <span class="text-black mt-1">{{ detailInfo.description }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  BButton, BRow, BCol, BBadge,
} from 'bootstrap-vue'
import ToastificationContentVue from '@/@core/components/toastification/ToastificationContent.vue'
import moment from 'moment'

export default {
  data() {
    return {
      imagesone: '',
      imagesothers: [],
      isLoadingPage: true,
      detailInfo: {},
      countSlide: 0,
    }
  },
  computed: {
    tglJoinData() {
      return moment(this.detailInfo.join_date).format('DD MMMM YYYY')
    },
  },
  watch: {
    countSlide: {
      handler(newVal, oldVal) {
        this.imagesone = this.imagesothers[newVal]
        this.$refs[`childOtherbox-${oldVal}`][0].classList.remove(
          'borderActive',
        )
        this.$refs[`childOtherbox-${newVal}`][0].classList.toggle(
          'borderActive',
        )
        if (oldVal > newVal) {
          this.$refs.imgcontainer__childBox.scrollLeft -= 100
        } else {
          this.$refs.imgcontainer__childBox.scrollLeft += 100
        }
      },
    },
  },
  mounted() {
    this.fetchData()
    // this.$nextTick(() => {
    //   console.log(this.$refs['childOtherbox-0'])
    //   // this.$refs['childOtherbox-0'][0].classList.toggle('borderActive')
    // })
  },
  methods: {
    handleChangeImge(dt, refKey) {
      this.imagesone = dt
      const [indexData] = refKey.split('-')
      this.countSlide = parseInt(indexData, 10)
    },
    redirectToSubmission(data) {
      const { subscribe_status } = data
      if (data === 0) {
        this.$router.push({
          path: `/search-gudang/detail/submission/${this.$route.params.id}`,
        })
      } if (data === 1) {
        this.$router.push({
          path: '/gudangku-kompack',
        })
      }
    },
    waWeb(e) {
      window.open(`https://wa.me/62${e}`)
    },
    handleCursor(type) {
      switch (type) {
        case 'left':
          if (this.countSlide === 0) {
            //
          } else {
            this.countSlide -= 1
          }
          break
        case 'right':
          if (this.countSlide === this.imagesothers.length - 1) {
            //
          } else {
            this.countSlide += 1
          }
          break
        default:
          break
      }
    },
    handleEditData() {
      this.$router.push({
        name: 'kompack-rincian-mitra-gudang',
        params: {
          id: this.$route.params.id,
        },
        query: {
          isEditMode: true,
        },
      })
    },
    fetchData() {
      this.$http_komship(
        `/v1/komship/warehouse/information/${this.$route.params.id}`,
      )
        .then(({ data }) => {
          this.detailInfo = data.data
          console.log(this.detailInfo)

          this.imagesone = data.data.image_warehouse[0].image_url
          this.imagesothers = [...data.data.image_warehouse]
            .splice(0, 8)
            .map(x => x.image_url)
          this.$nextTick(() => {
            this.isLoadingPage = false
          })
        })
        .catch(() => {
          this.$toast({
            component: ToastificationContentVue,
            props: {
              title: 'Failed',
              text: 'Galat detail information mitra gudang',
              icon: 'AlertCircleIcon',
              variant: 'danger',
            },
          })
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.container__img {
  margin-top: 1em;
  display: grid;
  justify-content: center;
  grid-row-gap: 1em;
}
.boxFirst {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 450px;
  height: 300px;

  & > img {
    border-radius: 8px;
  }
}
.container__navimg {
  display: flex;
  align-items: center;
  position: relative;
}
/*.boxFirst > img {
    -o-transition: 1s all ease-in-out;
    -ms-transition: 1s all ease-in-out;
    -webkit-transition: 1s all ease-in-out;
    -moz-transition: 1s all ease-in-out;
    transition: 1s all ease-in-out;
  }*/
.container__childBox {
  display: -webkit-box;
  width: 450px;
  overflow-x: scroll;
  overflow-y: hidden;
}
.childOtherbox {
  margin-right: 10px;
  object-fit: cover;
  border: 1px solid black;
  border-radius: 8px;
  width: 80px;
  height: 80px;
}
.childOtherbox > img {
  border-radius: 8px;
}
.borderActive {
  border-width: 3px;
}
.cursorLeftSlide {
  cursor: pointer;
  position: absolute;
  left: -35px;
}
.cursorRightSlide {
  cursor: pointer;
  position: absolute;
  right: -30px;
}
*,
img {
  user-select: none;
}
@media only screen and (max-width: 900px) {
  .columnChat {
    margin-bottom: 1em;
  }
}
@media only screen and (max-width: 500px) {
  .container__childBox {
    width: 85vw;
  }
  .cursorLeftSlide {
    left: 0px;
  }
  .cursorRightSlide {
    right: 0px;
  }
  .boxFirst {
    width: 100%;
  }
  .containerDetail {
    display: grid !important;
    margin-bottom: 1em;
    width: 135px;
  }
}
</style>
