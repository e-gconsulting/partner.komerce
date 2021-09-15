<template>
  <b-card>
    <b-row class="d-flex align-items-center mt-1">
      <b-col>
        <h5>
          <strong>Pengaturan Ekspedisi</strong>
        </h5>
      </b-col>
      <b-col class="d-flex justify-content-end">
        <b-form-checkbox
          checked="true"
          class="custom-control-primary"
          name="check-button"
          switch
        />
      </b-col>
    </b-row>

    <b-row class="mt-2">
      <b-col>
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

              <template #cell(status)>
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
                  checked="true"
                  class="custom-control-primary"
                  name="check-button"
                  switch
                />
              </template>
            </b-table>

          </template>

        </b-table>
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

    <b-row class="mt-3">
      <b-col>
        <b-table
          :fields="fieldsSendNonKompship"
          :items="itemsSendNonKompship"
          class="border"
        >

          <template #cell(send_non_kompship)>

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
                <b-row class="d-flex align-items-center">
                  <b-form-checkbox
                    checked="true"
                    class="custom-control-primary"
                    name="check-button"
                    switch
                  />

                  <b-button
                    class="btn-icon"
                    size="sm"
                    variant="flat-dark"
                    @click="confirmDelete(data)"
                  >
                    <feather-icon
                      icon="Trash2Icon"
                    />
                  </b-button>
                </b-row>
              </template>
            </b-table>

            <b-col class="mt-50">
              <b-form
                @submit.prevent
              >
                <b-row>
                  <b-col cols="5">
                    <v-select />
                  </b-col>
                </b-row>
              </b-form>
            </b-col>

            <b-col class="mt-1">
              <b-button
                variant="primary"
              >
                <feather-icon
                  icon="PlusIcon"
                  class="mr-50"
                />
                <span class="align-middle">Simpan</span>
              </b-button>
            </b-col>

            <b-col class="mt-2">
              <b-button
                variant="outline-primary"
              >
                <feather-icon
                  icon="PlusIcon"
                  class="mr-50"
                />
                <span class="align-middle">Tambahkan Ekspedisi</span>
              </b-button>
            </b-col>

          </template>

        </b-table>
      </b-col>
    </b-row>

  </b-card>
</template>

<script>
import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'
import vSelect from 'vue-select'
import {
  BCard,
  BRow,
  BCol,
  BFormCheckbox,
  BTable,
  BButton,
  BForm,
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
    BButton,
    vSelect,
    BForm,
  },

  data() {
    return {

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

      fieldsSendNonKompship: [
        {
          key: 'send_non_kompship', label: 'Pengiriman Non Kompship',
        },
      ],

      items: [
        {
          name_ekspedisi: 'JNE',
        },
        {
          name_ekspedisi: 'J&T',
        },
      ],

      itemsSendKompship: [
        {
          send_kompship: 'Ketika mengaktifkan pengiriman mandiri kamu akan berhenti berlangganan membership kompship dan tidak dapat menggunakan sebagian fitur Kompship.',
        },
      ],

      itemsSendNonKompship: [
        {
          send_non_kompship: null,
        },
      ],
    }
  },
  methods: {
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
  },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
</style>
