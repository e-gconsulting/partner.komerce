<template>
  <b-row>
    <b-nav-item-dropdown
      right
      toggle-class="d-flex align-items-center dropdown-user-link"
      class="dropdown-user"
    >
      <template #button-content>
        <b-row>
          <b-col
            cols="12"
            class="d-flex justify-content-end pr-3"
          >
            <div class="d-sm-flex d-none user-nav">
              <div class="d-flex">
                <div
                  v-if="juragan === 'Juragan'"
                  class="mr-[5px]"
                >
                  <img
                    id="popover-juragan"
                    class="icon-juragan"
                    :src="iconJuragan"
                  >
                  <b-popover
                    target="popover-juragan"
                    triggers="hover"
                    placement="bottomleft"
                  >
                    <div class="text-black">
                      Kamu masuk kategori top user Komerce.
                    </div>
                    <div class="text-black">
                      Akun kamu akan mendapatkan pelayanan istimewa dari kami &#128521;
                    </div>
                  </b-popover>
                </div>
                <div
                  v-else
                />
                <h4 class="user-name align-items-center d-flex font-weight-bolder mb-0 text-black">
                  {{ $store.state.auth.userData.full_name || $store.state.auth.userData.username }}
                </h4>
              </div>
              <h4 class="user-status align-items-center text-black">
                {{ $store.state.auth.userData.role }}
              </h4>
            </div>
          </b-col>
          <b-col
            class="d-flex align-items-center justify-content-end pr-4"
            cols="12"
          >
            <div
              id="popover-kompoints"
              class="d-flex "
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.0002 23.6352C18.4261 23.6352 23.6352 18.4261 23.6352 12.0002C23.6352 5.5744 18.4261 0.365234 12.0002 0.365234C5.5744 0.365234 0.365234 5.5744 0.365234 12.0002C0.365234 18.4261 5.5744 23.6352 12.0002 23.6352Z"
                  fill="#FBBC05"
                />
                <path
                  d="M11.9999 22.1423C17.6014 22.1423 22.1423 17.6014 22.1423 11.9999C22.1423 6.39835 17.6014 1.85742 11.9999 1.85742C6.39836 1.85742 1.85742 6.39835 1.85742 11.9999C1.85742 17.6014 6.39836 22.1423 11.9999 22.1423Z"
                  fill="#D69D0D"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.17188 9.65744C7.17188 9.16535 7.57062 8.7666 8.06272 8.7666C8.55482 8.7666 8.95356 9.16535 8.95356 9.65744V17.285C8.95356 17.7771 8.55482 18.1758 8.06272 18.1758C7.57062 18.1758 7.17188 17.7771 7.17188 17.285V9.65744Z"
                  fill="#FBBC05"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16.3333 10.2925C16.3582 9.80264 16.7759 9.42544 17.2657 9.45039C17.7555 9.47533 18.1327 9.89297 18.1078 10.3828C18.0371 11.7446 17.4645 13.0236 16.5767 13.9526C15.6953 14.8741 14.5025 15.4599 13.1694 15.4618L8.06323 15.4686C7.57339 15.4686 7.17578 15.0713 7.17578 14.5811C7.17578 14.0909 7.57302 13.6937 8.06323 13.6937L13.1694 13.6869C13.9854 13.6858 14.7289 13.3135 15.2894 12.7276C15.8949 12.0946 16.2853 11.2219 16.3337 10.2925H16.3333Z"
                  fill="#FBBC05"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.9499 9.72422C8.97484 10.214 8.59802 10.6317 8.10781 10.6566C7.61798 10.6816 7.20033 10.3048 7.17539 9.81455C7.15044 9.33492 7.03403 8.8844 6.84468 8.47847C6.64776 8.05705 6.36921 7.6791 6.02943 7.3635C5.66999 7.02901 5.64996 6.46661 5.98408 6.10756C6.31857 5.74812 6.88096 5.72809 7.24002 6.0622C7.74119 6.52746 8.15505 7.09175 8.45213 7.7271C8.73786 8.33901 8.91286 9.0129 8.9499 9.72422Z"
                  fill="#FBBC05"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M17.3269 6.93555C17.8364 6.93555 18.2495 7.34865 18.2495 7.85814C18.2495 8.36762 17.8364 8.78073 17.3269 8.78073C16.8174 8.78073 16.4043 8.36762 16.4043 7.85814C16.4043 7.34865 16.8174 6.93555 17.3269 6.93555Z"
                  fill="#FBBC05"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.1902 6.93555C11.6997 6.93555 12.1128 7.34865 12.1128 7.85814C12.1128 8.36762 11.6997 8.78073 11.1902 8.78073C10.6807 8.78073 10.2676 8.36762 10.2676 7.85814C10.2676 7.34865 10.6807 6.93555 11.1902 6.93555Z"
                  fill="#FBBC05"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.9885 11.228C10.4964 11.228 10.0977 10.8292 10.0977 10.3371C10.0977 9.84503 10.4964 9.44629 10.9885 9.44629H17.2202C17.7123 9.44629 18.1111 9.84503 18.1111 10.3371C18.1111 10.8292 17.7123 11.228 17.2202 11.228H10.9885Z"
                  fill="#FBBC05"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M17.3397 16.9296C17.5359 17.3794 17.3303 17.9029 16.8805 18.0987C16.4308 18.2948 15.9073 18.0892 15.7115 17.6394C15.4288 16.9905 14.9597 16.4394 14.3705 16.0532C13.8024 15.6809 13.1217 15.4643 12.3889 15.4643C11.8968 15.4643 11.498 15.0656 11.498 14.5735C11.498 14.0814 11.8968 13.6826 12.3889 13.6826C13.4789 13.6826 14.4945 14.0065 15.3445 14.5636C16.2183 15.1362 16.9168 15.9583 17.3394 16.9293L17.3397 16.9296Z"
                  fill="#FBBC05"
                />
              </svg>
              <small
                class="text-black ml-50"
              >
                <strong style="vertical-align: sub">
                  KomPoints : <small class="text-warning"><strong>{{ formatPrice(profile.user_kompoints) }}</strong></small>
                </strong>
              </small>
            </div>
            <b-popover
              target="popover-kompoints"
              triggers="hover"
              placement="bottom"
            >
              <div
                class="d-flex"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.0002 23.6352C18.4261 23.6352 23.6352 18.4261 23.6352 12.0002C23.6352 5.5744 18.4261 0.365234 12.0002 0.365234C5.5744 0.365234 0.365234 5.5744 0.365234 12.0002C0.365234 18.4261 5.5744 23.6352 12.0002 23.6352Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M11.9999 22.1423C17.6014 22.1423 22.1423 17.6014 22.1423 11.9999C22.1423 6.39835 17.6014 1.85742 11.9999 1.85742C6.39836 1.85742 1.85742 6.39835 1.85742 11.9999C1.85742 17.6014 6.39836 22.1423 11.9999 22.1423Z"
                    fill="#D69D0D"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.17188 9.65744C7.17188 9.16535 7.57062 8.7666 8.06272 8.7666C8.55482 8.7666 8.95356 9.16535 8.95356 9.65744V17.285C8.95356 17.7771 8.55482 18.1758 8.06272 18.1758C7.57062 18.1758 7.17188 17.7771 7.17188 17.285V9.65744Z"
                    fill="#FBBC05"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16.3333 10.2925C16.3582 9.80264 16.7759 9.42544 17.2657 9.45039C17.7555 9.47533 18.1327 9.89297 18.1078 10.3828C18.0371 11.7446 17.4645 13.0236 16.5767 13.9526C15.6953 14.8741 14.5025 15.4599 13.1694 15.4618L8.06323 15.4686C7.57339 15.4686 7.17578 15.0713 7.17578 14.5811C7.17578 14.0909 7.57302 13.6937 8.06323 13.6937L13.1694 13.6869C13.9854 13.6858 14.7289 13.3135 15.2894 12.7276C15.8949 12.0946 16.2853 11.2219 16.3337 10.2925H16.3333Z"
                    fill="#FBBC05"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.9499 9.72422C8.97484 10.214 8.59802 10.6317 8.10781 10.6566C7.61798 10.6816 7.20033 10.3048 7.17539 9.81455C7.15044 9.33492 7.03403 8.8844 6.84468 8.47847C6.64776 8.05705 6.36921 7.6791 6.02943 7.3635C5.66999 7.02901 5.64996 6.46661 5.98408 6.10756C6.31857 5.74812 6.88096 5.72809 7.24002 6.0622C7.74119 6.52746 8.15505 7.09175 8.45213 7.7271C8.73786 8.33901 8.91286 9.0129 8.9499 9.72422Z"
                    fill="#FBBC05"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.3269 6.93555C17.8364 6.93555 18.2495 7.34865 18.2495 7.85814C18.2495 8.36762 17.8364 8.78073 17.3269 8.78073C16.8174 8.78073 16.4043 8.36762 16.4043 7.85814C16.4043 7.34865 16.8174 6.93555 17.3269 6.93555Z"
                    fill="#FBBC05"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.1902 6.93555C11.6997 6.93555 12.1128 7.34865 12.1128 7.85814C12.1128 8.36762 11.6997 8.78073 11.1902 8.78073C10.6807 8.78073 10.2676 8.36762 10.2676 7.85814C10.2676 7.34865 10.6807 6.93555 11.1902 6.93555Z"
                    fill="#FBBC05"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.9885 11.228C10.4964 11.228 10.0977 10.8292 10.0977 10.3371C10.0977 9.84503 10.4964 9.44629 10.9885 9.44629H17.2202C17.7123 9.44629 18.1111 9.84503 18.1111 10.3371C18.1111 10.8292 17.7123 11.228 17.2202 11.228H10.9885Z"
                    fill="#FBBC05"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.3397 16.9296C17.5359 17.3794 17.3303 17.9029 16.8805 18.0987C16.4308 18.2948 15.9073 18.0892 15.7115 17.6394C15.4288 16.9905 14.9597 16.4394 14.3705 16.0532C13.8024 15.6809 13.1217 15.4643 12.3889 15.4643C11.8968 15.4643 11.498 15.0656 11.498 14.5735C11.498 14.0814 11.8968 13.6826 12.3889 13.6826C13.4789 13.6826 14.4945 14.0065 15.3445 14.5636C16.2183 15.1362 16.9168 15.9583 17.3394 16.9293L17.3397 16.9296Z"
                    fill="#FBBC05"
                  />
                </svg>

                <span
                  class="text-black ml-50"
                >
                  <strong>
                    KomPoints : <span class="text-warning">{{ formatPrice(profile.user_kompoints) }}</span>
                  </strong>
                </span>
              </div>
              <b-row class="p-1">
                <h4 class="text-black">
                  <strong>
                    Komerce Points
                  </strong>
                </h4>
                <small class="text-black">
                  Jika kamu bertransaksi di platform Komerce dan points kamu ada, maka kami akan nyedot dari KomPoints terlebih dahulu sebelum nyedot dari saldo utama.
                </small>
              </b-row>
            </b-popover>
          </b-col>
        </b-row>
        <b-avatar
          size="40"
          :src="$store.state.auth.userData.photo_profile_url"
          variant="light-primary"
          badge
          class="badge-minimal"
          badge-variant="success"
        >
          <feather-icon
            v-if="!$store.state.auth.userData.photo_profile_url"
            icon="UserIcon"
            size="22"
          />
        </b-avatar>
      </template>

      <!-- <b-dropdown-item
      v-if="profileRoute"
      link-class="d-flex align-items-center"
      :to="{ name: profileRoute }"
    >
      <feather-icon
        size="16"
        icon="UserIcon"
        class="mr-50"
      />
      <span>Profile</span>
    </b-dropdown-item> -->
      <b-dropdown-item
        link-class="d-flex align-items-center"
        @click="skin = isDark ? 'light' : 'dark'"
      >
        <feather-icon
          size="16"
          :icon="`${isDark ? 'Sun' : 'Moon'}Icon`"
          class="mr-50"
        />
        <span>{{ isDark ? 'Light' : 'Dark' }} Mode</span>
      </b-dropdown-item>
      <b-dropdown-divider />
      <b-dropdown-item
        link-class="d-flex align-items-center"
        @click="logout"
      >
        <feather-icon
          size="16"
          icon="LogOutIcon"
          class="mr-50"
        />
        <span>Logout</span>
      </b-dropdown-item>
    </b-nav-item-dropdown>
    <div class="mr-3 ml-50">
      <b-button
        size="sm"
        variant="flat-primary"
        class="btn-icon position-relative"
        @click="showNotification"
      >
        <b-img src="https://storage.googleapis.com/komerce/assets/komerce-icon/Hitam/notification-1.svg" />
        <div
          v-if="notificationTotal > 0"
          class="wrapper-notification-count"
        >
          <span class="text-white font-semibold">{{ notificationTotal }}</span>
        </div>
      </b-button>
      <b-modal
        id="modal-notification"
        ref="modal-notification"
        modal-class="myclass"
        hide-footer
        hide-header
      >
        <b-row class="p-1 justify-content-between align-items-center mb-2 mx-2">
          <div>
            <h4 class="text-black">
              <strong>
                Notifications
              </strong>
            </h4>
          </div>
          <div>
            <b-img
              src="https://storage.googleapis.com/komerce/assets/icons/close-circle.svg"
              class="cursor-pointer"
              @click="$bvModal.hide('modal-notification')"
            />
          </div>
        </b-row>
        <div class="wrapper-content-notification">
          <b-row
            v-for="(item, index) in listNotification"
            :key="index + 1"
            :style="item.is_read === 0 ? 'background: #FFECE9; margin-left: -19px; margin-right: -19px; border-top: 1px solid #C2C2C2;' : 'background: white; margin-left: -19px; margin-right: -19px; border-top: 1px solid #C2C2C2;'"
            class="p-[2rem] cursor-pointer"
            @click="readNotif(item)"
          >
            <b-col cols="2">
              <b-img :src="item.image_path" />
            </b-col>
            <b-col
              cols="10"
              class="d-flex flex-column"
              style="width: 100%;"
            >
              <div
                class="d-flex justify-content-between align-items-center mb-1"
              >
                <span class="text-black font-semibold">
                  {{ item.title }}
                </span>
                <small
                  style="color: #626262;"
                  class="font-semibold"
                >
                  {{ getFormatDate(item.created_at) }}
                </small>
              </div>
              <small
                style="color: #626262;"
                v-html="item.description"
              />
            </b-col>
          </b-row>
        </div>
      </b-modal>
    </div>
  </b-row>
</template>

<script>
import {
  BNavItemDropdown, BDropdownItem, BDropdownDivider, BAvatar,
} from 'bootstrap-vue'
import { initialAbility } from '@/libs/acl/config'
import useJwt from '@/auth/jwt/useJwt'
import { avatarText } from '@core/utils/filter'
import { mapState } from 'vuex'
import moment from 'moment'
import useAppConfig from '@core/app-config/useAppConfig'
import { computed } from '@vue/composition-api'
import { isUserLoggedIn } from '@/auth/utils'

export default {
  components: {
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,
  },
  data() {
    return {
      avatarText,
      notificationTotal: 0,

      listNotification: [],
      moment,
      juragan: '',
      iconJuragan: '',
    }
  },
  setup() {
    const { skin } = useAppConfig()

    const isDark = computed(() => skin.value === 'dark')

    return { skin, isDark }
  },
  computed: {
    isAdmin() {
      return isUserLoggedIn() && this.$store.state.auth?.userData?.role_name?.toUpperCase() === 'ADMIN'
    },
    profileRoute() {
      if (!isUserLoggedIn()) return ''
      if (this.$store.state.auth?.userData?.role_name?.toUpperCase() === 'SDM') return 'talent-profile'
      if (this.$store.state.auth?.userData?.role_name?.toUpperCase() === 'PARTNER') return 'partner-profile'
      return ''
    },
    greetingsTime() {
      const date = new Date()
      let dateChange = null
      let str = ''
      if ((date.getUTCHours() - date.getHours()) !== 0) {
        dateChange = date.getHours()
      } else {
        dateChange = (8 + date.getHours())
      }

      if (dateChange < 4) {
        str = 'Selamat Malam,'
      } else if (dateChange < 11) {
        str = 'Selamat Pagi,'
      } else if (dateChange < 16) {
        str = 'Selamat Siang,'
      } else if (dateChange < 20) {
        str = 'Selamat Sore,'
      } else {
        str = 'Selamat Malam,'
      }
      return str
    },
    ...mapState('dashboard', [
      'profile',
    ]),
  },
  mounted() {
    this.getListNotification()
    this.badgeJuragan()
  },
  methods: {
    logout() {
      localStorage.clear()
      // Reset ability
      this.$ability.update(initialAbility)

      // Redirect to login page
      this.$router.push({ name: 'auth-login' })
    },
    formatPrice(value) {
      let val = 0
      if (value !== undefined) {
        val = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      }
      return val
    },
    showNotification() {
      this.$refs['modal-notification'].show()
    },
    getListNotification() {
      this.$http_komship.get('/v1/notification/list')
        .then(response => {
          const { data } = response.data
          this.notificationTotal = data.total_notification
          this.listNotification = data.data
        })
    },
    readNotif(data) {
      this.$http_komship.post(`/v1/notification/read/${data.id}`)
        .then(() => {
          this.getListNotification()
        })
      if (data.notification_type === 'withdrawal') {
        this.$refs['modal-notification'].hide()
        // this.$router.push({ path: `/keuangan/saldo/rincian/${data.reference_id}` }).catch(() => {})
        window.location.assign(`/keuangan/saldo/rincian/${data.reference_id}`)
      } else {
        this.$refs['modal-notification'].hide()
        window.location.assign(`/ticketing/detail/${data.reference_id}`)
      }
    },
    getFormatDate(value) {
      const pastDate = moment(value)
      const currentDate = moment(new Date())
      const asHours = moment.duration(currentDate.diff(pastDate))
      const hour = Math.round(asHours.asHours())
      const minutes = Math.round(asHours.asMinutes())
      // console.log(moment(value).utc().fromNow())
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
    badgeJuragan() {
      this.$http_komship.get('v1/partner/badge')
        .then(response => {
          this.juragan = response.data.data.level
          this.iconJuragan = response.data.data.image_url
        })
    },
  },
}
</script>

<style scoped>
::v-deep .myclass > .modal-dialog {
  position: unset;
  transform: none!important;
}
::v-deep .myclass > .modal-dialog > .modal-content {
  position: absolute;
  top: 0;
  right: 0;
  width: 500px;
  margin: 7rem 2rem;
}
::v-deep .myclass > .modal-dialog > .modal-content .modal-body {
  padding: 0px!important;
}
.wrapper-content-notification {
  overflow-y: scroll;
  overflow-x: hidden;
  height: 500px;
}

.wrapper-notification-count {
  background: #F95031;
  height: 24px;
  min-width: 28px;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  position:absolute;
  top: -5px;
  right: -5px;
}
.icon-juragan {
  width: 32px;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
}
</style>
