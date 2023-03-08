<template>
  <b-row>
      <b-overlay
            variant="light"
            :show="loading"
            spinner-variant="primary"
            blur="0"
            opacity=".5"
            rounded="sm"
            style="width: 100%;"
      >
      <b-card>
        <b-row class="m-1">
          <h1 class="text-black" style="font-size: 2rem!important;">
            <strong> Inbox </strong>
          </h1>
        </b-row>

        <div class="container-inbox">
          <b-row>
            <b-col class="pb-1">
              <b-row
                v-for="(item, index) in inboxItems"
                :key="index + 1"
                :class="
                  isOpened
                    ? 'wrapper-inbox pl-1 py-1'
                    : 'wrapper-inbox pl-1 py-1 cursor-pointer'
                "
                :style="getStyleWrapperinbox(item)"
                @click="openInbox(item)"
              >
                <b-col
                  :cols="isOpened ? '12' : ''"
                  :class="isOpened ? 'mb-2 d-flex align-items-start' : 'mb-2 d-flex align-items-start'"
                >
                  <b-img
                    v-if="item.service === 'komship'"
                    class="mr-1"
                    src="https://storage.googleapis.com/komerce/assets/svg/icon-komship.svg"
                  />
                  <b-img
                    v-else
                    class="mr-1"
                    src="https://storage.googleapis.com/komerce/assets/svg/logo_kompack.svg"
                  />
                  <span class="text-black">
                    <strong> Team {{ item.service === 'komship' ? 'Komship' : 'Kompack' }} </strong>
                  </span>
                </b-col>
                <b-col :cols="isOpened ? '12' : '8'" class="mb-2">
                  <div v-if="isOpened">
                    <span class="text-black">
                      <strong>
                        {{ (item.title + ' - ' + item.message_text).substring(0, 40) }}...
                      </strong>
                    </span>
                  </div>
                  <div v-if="!isOpened" class="d-flex flex-column">
                    <p class="text-black" style="margin-bottom: 1rem!important">
                      <strong>
                        {{ item.title }}
                      </strong>
                    </p>
                    <span>
                      {{ item.message_text.substring(0, 189) }}...
                    </span>
                  </div>
                </b-col>
                <b-col
                  :cols="isOpened ? '12' : ''"
                  :class="isOpened ? '' : 'text-end'"
                >
                  <span class="text-black"> {{ getFormatterDate(item.created_at) }} </span>
                </b-col>
              </b-row>
            </b-col>
            <transition name="slide-fade">
                <b-col
                  v-if="isOpened"
                  cols="8"
                  class="bg-white pl-0"
                  style="border: 1px solid #e2e2e2; border-bottom: 0; height: 100vh;"
                >
                <b-overlay
                    variant="light"
                    :show="loadingDetail"
                    spinner-variant="primary"
                    blur="0"
                    opacity=".5"
                    rounded="sm"
                >
                  <b-row class="align-items-center mb-4 mt-1 mx-2">
                    <b-button
                      class="btn-icon p-0 mr-1"
                      size="sm"
                      variant="flat-dark"
                      @click="closeInbox(inboxDetail)"
                    >
                      <b-img
                        src="https://storage.googleapis.com/komerce/assets/komerce-icon/Hitam/arrow-left-2.svg"
                      />
                    </b-button>
                    <h4 class="text-black mb-0" style="font-size: 1.286rem!important">
                      {{ inboxDetail.title }}
                    </h4>
                  </b-row>

                  <b-row
                    v-if="!loadingDetail"
                    class="align-items-center justify-content-between mx-2 mb-1"
                  >
                    <div class="d-flex align-items-center">
                      <b-img
                        v-if="inboxDetail.service === 'komship'"
                        class="mr-1"
                        src="https://storage.googleapis.com/komerce/assets/svg/icon-komship.svg"
                      />
                      <b-img
                        v-else
                        class="mr-1"
                        src="https://storage.googleapis.com/komerce/assets/svg/logo_kompack.svg"
                      />
                      <span class="text-black"> Team {{ inboxDetail.service === 'komship' ? 'Komship' : 'Kompack' }} </span>
                    </div>
                    <div>
                      <span> {{ getFormatterDate(inboxDetail.created_at) }} </span>
                    </div>
                  </b-row>

                  <b-row
                    class="mx-2 p-1"
                    style="background: #f8f8f8; border-radius: 8px"
                  >
                    <div v-html="inboxDetail.message_text"></div>
                  </b-row>
                </b-overlay>
                </b-col>
            </transition>
          </b-row>
        </div>
      </b-card>
    </b-overlay>
    </b-row>
</template>

<script>
import ToastificationContent from '@/@core/components/toastification/ToastificationContent.vue'
import moment from 'moment'

export default {
  data() {
    return {
      isOpened: false,
      inboxItems: [],
      moment,
      inboxDetail: {},
      loading: true,
      loadingDetail: false,
      clickId: null,
    }
  },
  mounted() {
    this.fetchInbox()
  },
  methods: {
    async openInbox(data) {
      if (!this.isOpened) {
        this.loadingDetail = true
        this.isOpened = true
        await this.fetchDetailInbox(data.id)
        await this.updateInbox(data.id)
        this.clickId = data.id
      }
    },
    closeInbox() {
      this.isOpened = false
      this.clickId = null
    },
    fetchInbox() {
      this.$http_komship.get('/v1/partner-inbox/list').then(response => {
        this.inboxItems = response.data.data
        this.loading = false
      }).catch(err => {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Failure',
            icon: 'AlertCircleIcon',
            text: err,
            variant: 'danger',
          },
        }, 2000)
        this.loading = false
      })
    },
    fetchDetailInbox(id) {
      this.$http_komship.get(`/v1/partner-inbox/detail/${id}`).then(response => {
        this.inboxDetail = response.data.data
      }).catch(err => {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Failure',
            icon: 'AlertCircleIcon',
            text: err,
            variant: 'danger',
          },
        }, 2000)
        this.loadingDetail = false
      })
    },
    updateInbox(id) {
      this.$http_komship.put(`/v1/partner-inbox/read/${id}`).then(() => {
        this.loadingDetail = false
        this.fetchInbox()
      }).catch(err => {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Failure',
            icon: 'AlertCircleIcon',
            text: err,
            variant: 'danger',
          },
        }, 2000)
        this.loadingDetail = false
      })
    },
    getStyleWrapperinbox(data) {
      let result
      if (data.is_read === 1) result = 'background: #f4f4f4'
      if (data.is_read === 0) result = 'background: white'
      if (this.clickId === data.id) result = 'background: #FCD4BE'
      return result
    },
    getFormatterDate(value) {
      const pastDate = moment(value)
      const currentDate = moment(new Date())
      const asHours = moment.duration(currentDate.diff(pastDate))
      const hour = Math.round(asHours.asHours())
      const minutes = Math.round(asHours.asMinutes())
      let format = ''
      if (hour === 0) {
        format = `${minutes} menit yang lalu`
      }
      if (hour === 1 || hour > 1) {
        format = `${hour} jam yang lalu`
      }
      if (hour > 3 && hour < 24) {
        format = moment(new Date(value)).format('HH.mm')
      }
      if (hour >= 20 && hour <= 48) {
        format = `Kemarin ${moment(new Date(value)).format('HH.mm')}`
      }
      if (hour > 48) {
        format = `${moment(new Date(value)).format('DD MMMM YYYY HH.mm')}`
      }
      return format
    },
  },
}
</script>

<style>
.container-inbox {
  height: 100vh;
}

.wrapper-inbox {
  border-width: 1px 0px;
  border-style: solid;
  border-color: #e2e2e2;
}

.wrapper-inbox:hover {
  background: #FCD4BE!important;
}

.wrapper-inbox-opened {
  transition: 2s;
}

.slide-fade-enter-active {
  transition: all 0.2s ease-in;
}

.slide-fade-leave-active {
  opacity: 100%;
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from {
  transform: translateY(1000px);
}

.slide-fade-leave-to {
  transform: translateX(1000px);
}

#is-red {
  color: #E31A1A;
}

#is-green {
  color: #34A770;
}

#is-black {
  color: black;
}
</style>
