<template>
  <b-overlay
    variant="light"
    :show="loading"
    spinner-variant="primary"
    blur="0"
    opacity=".5"
    rounded="sm"
  >
    <b-card>
      <b-row class="d-flex align-items-center mt-1 mb-2">
        <b-col>
          <h3 class="text-black">
            <strong>Pengaturan Ekspedisi</strong>
          </h3>
        </b-col>
      </b-row>

      <b-row class="justify-content-center wrapper__setting__ekspedisi">
        <b-col
          cols="3"
          class="mr-3 mb-3"
        >
          <b-row
            class="justify-content-center py-3"
            style="
              background: #F8F8F8;
              border-top-right-radius: 18px;
              border-top-left-radius: 18px;
            "
          >
            <b-img
              src="@/assets/images/expedisi/logo-jne.png"
              fluid
              width="150"
            />
          </b-row>
          <b-row
            class="justify-content-between pl-1 pr-50 py-2 border-2 border-top-0"
            style="
              border-bottom-left-radius: 18px;
              border-bottom-right-radius: 18px;
            "
          >
            <div>
              <h4 class="text-primary">
                <strong>
                  JNE
                </strong>
              </h4>
            </div>
            <b-form-checkbox
              checked="true"
              name="check-button"
              switch
            />
          </b-row>
        </b-col>
        <b-col
          cols="3"
          class="mr-3 mb-3"
        >
          <b-row
            class="justify-content-center py-3"
            style="
              background: #F8F8F8;
              border-top-right-radius: 18px;
              border-top-left-radius: 18px;
            "
          >
            <b-img
              src="@/assets/images/expedisi/logo-jne.png"
              fluid
              width="150"
            />
          </b-row>
          <b-row
            class="justify-content-between pl-1 pr-50 py-2 border-2 border-top-0"
            style="
              border-bottom-left-radius: 18px;
              border-bottom-right-radius: 18px;
            "
          >
            <div>
              <h4 class="text-primary">
                <strong>
                  JNE
                </strong>
              </h4>
            </div>
            <b-form-checkbox
              checked="true"
              name="check-button"
              switch
            />
          </b-row>
        </b-col>
        <b-col
          cols="3"
          class="mr-3 mb-3"
        >
          <b-row
            class="justify-content-center py-3"
            style="
              background: #F8F8F8;
              border-top-right-radius: 18px;
              border-top-left-radius: 18px;
            "
          >
            <b-img
              src="@/assets/images/expedisi/logo-jne.png"
              fluid
              width="150"
            />
          </b-row>
          <b-row
            class="justify-content-between pl-1 pr-50 py-2 border-2 border-top-0"
            style="
              border-bottom-left-radius: 18px;
              border-bottom-right-radius: 18px;
            "
          >
            <div>
              <h4 class="text-primary">
                <strong>
                  JNE
                </strong>
              </h4>
            </div>
            <b-form-checkbox
              checked="true"
              name="check-button"
              switch
            />
          </b-row>
        </b-col>
        <b-col
          cols="3"
          class="mr-3 mb-3"
        >
          <b-row
            class="justify-content-center py-3"
            style="
              background: #F8F8F8;
              border-top-right-radius: 18px;
              border-top-left-radius: 18px;
            "
          >
            <b-img
              src="@/assets/images/expedisi/logo-jne.png"
              fluid
              width="150"
            />
          </b-row>
          <b-row
            class="justify-content-between pl-1 pr-50 py-2 border-2 border-top-0"
            style="
              border-bottom-left-radius: 18px;
              border-bottom-right-radius: 18px;
            "
          >
            <div>
              <h4 class="text-primary">
                <strong>
                  JNE
                </strong>
              </h4>
            </div>
            <b-form-checkbox
              checked="true"
              name="check-button"
              switch
            />
          </b-row>
        </b-col>
      </b-row>

      <b-row class="justify-content-center px-1 wrapper__setting__ekspedisi__mobile">
        <b-col
          cols="12"
          class="mb-2"
        >
          <b-row
            class="justify-content-center py-3"
            style="
              background: #F8F8F8;
              border-top-right-radius: 18px;
              border-top-left-radius: 18px;
            "
          >
            <b-img
              src="@/assets/images/expedisi/logo-jne.png"
              fluid
              width="150"
            />
          </b-row>
          <b-row
            class="justify-content-between pl-1 pr-50 py-2 border-2 border-top-0"
            style="
              border-bottom-left-radius: 18px;
              border-bottom-right-radius: 18px;
            "
          >
            <div>
              <h4 class="text-primary">
                <strong>
                  JNE
                </strong>
              </h4>
            </div>
            <b-form-checkbox
              checked="true"
              name="check-button"
              switch
            />
          </b-row>
        </b-col>
        <b-col
          cols="12"
          class="mb-2"
        >
          <b-row
            class="justify-content-center py-3"
            style="
              background: #F8F8F8;
              border-top-right-radius: 18px;
              border-top-left-radius: 18px;
            "
          >
            <b-img
              src="@/assets/images/expedisi/logo-jne.png"
              fluid
              width="150"
            />
          </b-row>
          <b-row
            class="justify-content-between pl-1 pr-50 py-2 border-2 border-top-0"
            style="
              border-bottom-left-radius: 18px;
              border-bottom-right-radius: 18px;
            "
          >
            <div>
              <h4 class="text-primary">
                <strong>
                  JNE
                </strong>
              </h4>
            </div>
            <b-form-checkbox
              checked="true"
              name="check-button"
              switch
            />
          </b-row>
        </b-col>
        <b-col
          cols="12"
          class="mb-2"
        >
          <b-row
            class="justify-content-center py-3"
            style="
              background: #F8F8F8;
              border-top-right-radius: 18px;
              border-top-left-radius: 18px;
            "
          >
            <b-img
              src="@/assets/images/expedisi/logo-jne.png"
              fluid
              width="150"
            />
          </b-row>
          <b-row
            class="justify-content-between pl-1 pr-50 py-2 border-2 border-top-0"
            style="
              border-bottom-left-radius: 18px;
              border-bottom-right-radius: 18px;
            "
          >
            <div>
              <h4 class="text-primary">
                <strong>
                  JNE
                </strong>
              </h4>
            </div>
            <b-form-checkbox
              checked="true"
              name="check-button"
              switch
            />
          </b-row>
        </b-col>
        <b-col
          cols="12"
          class="mb-2"
        >
          <b-row
            class="justify-content-center py-3"
            style="
              background: #F8F8F8;
              border-top-right-radius: 18px;
              border-top-left-radius: 18px;
            "
          >
            <b-img
              src="@/assets/images/expedisi/logo-jne.png"
              fluid
              width="150"
            />
          </b-row>
          <b-row
            class="justify-content-between pl-1 pr-50 py-2 border-2 border-top-0"
            style="
              border-bottom-left-radius: 18px;
              border-bottom-right-radius: 18px;
            "
          >
            <div>
              <h4 class="text-primary">
                <strong>
                  JNE
                </strong>
              </h4>
            </div>
            <b-form-checkbox
              checked="true"
              name="check-button"
              switch
            />
          </b-row>
        </b-col>
      </b-row>
    </b-card>
  </b-overlay>

</template>

<script>
import { heightTransition } from '@core/mixins/ui/transition'
import {
  BCard,
  BRow,
  BCol,
  VBModal,
  BOverlay,
  BImg,
  BFormCheckbox,
} from 'bootstrap-vue'
import useJwt from '@/auth/jwt/useJwt'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import httpKomship from './http_komship'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BOverlay,
    BImg,
    BFormCheckbox,
  },
  directives: {
    'b-modal': VBModal,
  },
  mixins: [heightTransition],
  data() {
    return {
      loading: false,
      partnerId: JSON.parse(localStorage.getItem('userData')),
    }
  },
  mounted() {
    httpKomship.get('/v1/partner/shipment/not-active',
      {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(response => {
      const { data } = response.data
      console.log('data', data)
      this.loading = false
    })
  },
  methods: {

  },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';

@media only screen and (min-width: 991px) {

  [dir] .wrapper__setting__ekspedisi__mobile {
    display: none;
  }
}

@media only screen and (max-width: 990px) {
  [dir] .wrapper__setting__ekspedisi {
    display: none!important;
  }

  [dir] .wrapper__setting__ekspedisi__mobile {
    display: block;
  }
}
</style>
