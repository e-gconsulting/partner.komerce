<template>
  <b-card>
    <!-- Dialog Konfirmasi Non Kompship -->
    <!-- <b-modal
      ref="modal-konfirmasi-nonkompship"
      no-close-on-backdrop
      hide-header-close
      hide-header
      modal-class="modal-primary"
      centered
      title="Primary Modal"
    >

      <b-col
        md="12"
        class="d-flex justify-content-center pt-3"
      >
        <b-img
          width="100"
          src="@core/assets/image/icon-popup-warning.png"
        />
      </b-col>

      <b-col class="text-center mt-1">
        <h4>
          Ketika menggunakan pengiriman Non Kompship kamu harus menambahkan ekspedisi dan mengaktifkannya agar dapat menambahkan order
        </h4>
      </b-col>

      <template #modal-footer>
        <b-col
          md="12"
          class="d-flex justify-content-center pb-2"
        >
          <b-button
            variant="primary"
            @click="closeConfirmNonkomship"
          >
            Oke
          </b-button>
        </b-col>
      </template>

    </b-modal> -->

    <b-row class="d-flex align-items-center mt-1">
      <b-col>
        <h5>
          <strong>Pengaturan Ekspedisi</strong>
        </h5>
      </b-col>
      <b-col class="d-flex justify-content-end">
        <b-form-checkbox
          v-model="settingEkspedisi"
          class="custom-control-primary"
          name="check-button"
          switch
          @change="switchSettingEkspedisi"
        />
      </b-col>
    </b-row>

    <b-row class="mt-2">
      <b-col>
        <b-overlay
          variant="light"
          :show="loading"
          spinner-variant="primary"
          blur="0"
          opacity=".5"
          rounded="sm"
        >
          <b-table
            :fields="fieldsSendKompship"
            :items="itemsSendKompship"
            class="border"
          >

            <template #cell(send_kompship)>

              <b-table
                :fields="fields"
                :items="items"
              >

                <template #cell(name_ekspedisi)="data">
                  <b-col>
                    <h5>
                      {{ data.value }}
                    </h5>
                  </b-col>
                </template>

                <template #cell(status)="data">
                  <app-collapse
                    accordion
                    class="bg-dark"
                  >
                    <app-collapse-item title="">
                      J&T Exspress adalah perusahaan pengiriman ekspres yang menerapkan aperkembangan teknologi sebagai dasar dari sistemnya. Jaringan luas yang dimiliki oleh J&T Exspress memfasilitasi layanan- layanan ekspres untuk pelanggan di seluruh indonesia.

                      J&T Express tidak menerima cairan dan baterai untuk pengiriman yang melalui transportasi udara.

                      Customer Care : 021-8066-1888
                      Website : http//jet.co.id
                      Batasan
                      Berat Maks : 50000gr
                    </app-collapse-item>
                  </app-collapse>
                  <b-form-checkbox
                    class="custom-control-primary"
                    name="check-button"
                    switch
                    @change="switchStatusEkspedisi(data)"
                  />
                </template>
              </b-table>

            </template>

          </b-table>
        </b-overlay>
      </b-col>
    </b-row>

    <b-row class="mt-3">
      <b-col>
        <b-table
          :fields="fieldsSendKompship"
          :items="itemsSendKompship"
          class="border"
        />
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'
// import vSelect from 'vue-select'
import { heightTransition } from '@core/mixins/ui/transition'
import {
  BCard,
  BRow,
  BCol,
  BFormCheckbox,
  BTable,
  VBModal,
  BOverlay,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BFormCheckbox,
    BTable,
    AppCollapse,
    AppCollapseItem,
    BOverlay,
  },
  directives: {
    'b-modal': VBModal,
  },
  mixins: [heightTransition],
  data() {
    return {

      settingEkspedisi: false,
      statusEkspedisiNonKomship: false,

      formAddEkspedisi: false,

      fields: [
        {
          key: 'name_ekspedisi', label: 'Nama Ekspedisi', class: 'col-md-3 bg-white border-bottom-0',
        },
        {
          key: 'status', label: 'Status', class: 'bg-white border-bottom-0 ', thClass: 'text-right pr-5', tdClass: 'd-flex justify-content-end align-items-start',
        },
      ],

      fieldsSendKompship: [
        {
          key: 'send_kompship', label: 'Pengiriman Kompship',
        },
      ],

      items: [
        {
          name_ekspedisi: 'JNE',
        },
      ],

      itemsSendKompship: [
        {
          send_kompship: 'Ketika mengaktifkan pengiriman mandiri kamu akan berhenti berlangganan membership kompship dan tidak dapat menggunakan sebagian fitur Kompship.',
        },
      ],

      loading: false,
    }
  },
  mounted() {
    // this.$refs['modal-konfirmasi-nonkompship'].show()
    this.$httpKomship.get('/v1/partner/shipment', {
      is_komship: 1,
    }).then(response => {
      console.log(response.data.data)
    })
  },
  methods: {
    switchSettingEkspedisi() {
      if (this.settingEkspedisi === true) {
        this.settingEkspedisi = true
        this.statusEkspedisi = true
      } else {
        this.settingEkspedisi = false
        this.statusEkspedisi = false
      }
    },
    switchStatusEkspedisi(data) {
      console.log(data)
    },
    confirmDelete(data) {
      console.log(data)
      this.$swal({
        text: 'Kamu yakin hapus ekspedisi ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Hapus',
        cancelButtonText: 'Batal',
        customClass: {
          confirmButton: 'btn btn-outline-primary',
          cancelButton: 'btn btn-primary ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.delete(data)
        }
      })
    },
    submitEkspedisi() {
      this.formAddEkspedisi = false
    },
    addEkspedisi() {
      this.formAddEkspedisi = true
    },
  },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
</style>
