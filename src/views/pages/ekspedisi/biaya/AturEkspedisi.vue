<template>
  <section id="cod-data-partner-detail">
    <div v-if="!loadDataAwal">
      <b-card no-body>
        <b-card-body>
          <div class="d-flex align-items-center">
            <b-button
              variant="primary"
              size="sm"
              class="mr-2 btn-custom"
              @click="$router.go(-1)"
            >
              <feather-icon
                size="2x"
                icon="ChevronLeftIcon"
              />
            </b-button>
            <h4
              class="text-24-bold"
              style="color: #222222;"
            >
              {{ $route.meta.type === 'add' ? 'Menambahkan Ekspedisi' : 'Edit Besaran Biaya' }}
            </h4>
          </div>
          <b-form @submit.prevent="submitData()">
            <div class="d-flex justify-content-end mb-1">
              <div
                class="d-flex"
              >
                <b-button
                  variant="outline-primary"
                  size="sm"
                  class="mr-1 btn-custom btn-custom--edit"
                  @click="$router.go(-1)"
                >Batal
                </b-button>
                <b-button
                  variant="primary"
                  size="sm"
                  class="btn-custom btn-custom--edit"
                  @click="simpanFormEdit"
                >Simpan
                </b-button>
              </div>
            </div>

            <div>
              <h3
                class="font-weight-bolder"
                style="font-size:20px;color:#222222;"
              >
                Ekspedisi
              </h3>
              <b-row>
                <b-col
                  cols="2"
                >
                  <span>Nama Ekspedisi</span>
                </b-col>
                <b-col
                  cols="3"
                >
                  <b-form-input
                    id="name"
                    v-model="name"
                    placeholder="Masukkan Nama Ekspedisi"
                  />
                </b-col>
              </b-row>
            </div>

            <div>
              <b-row>
                <b-col cols="2">
                  <h3
                    class="font-weight-bolder"
                    style="font-size:20px;color:#222222;"
                  >
                    Besaran Biaya
                  </h3>
                </b-col>
                <b-col cols="2">
                  <h3
                    class="font-weight-bolder"
                    style="font-size:18px;color:#222222;"
                  >
                    Dari Ekspedisi
                  </h3>
                </b-col>
                <b-col cols="2">
                  <h3
                    class="font-weight-bolder"
                    style="font-size:18px;color:#222222;"
                  >
                    Ke Pengguna
                  </h3>
                </b-col>
              </b-row>
              <b-row>
                <b-col
                  cols="2"
                >
                  <span>Cashback</span>
                </b-col>
                <b-col
                  cols="2"
                >
                  <b-form-input
                    id="name"
                    v-model="name"
                    placeholder="Masukkan Data"
                  />
                </b-col>
                <b-col
                  cols="2"
                >
                  <b-form-input
                    id="name"
                    v-model="name"
                    placeholder="Masukkan Data"
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col
                  cols="2"
                >
                  <span>Biaya COD</span>
                </b-col>
                <b-col
                  cols="2"
                >
                  <b-form-input
                    id="name"
                    v-model="name"
                    placeholder="Masukkan Data"
                  />
                </b-col>
                <b-col
                  cols="2"
                >
                  <b-form-input
                    id="name"
                    v-model="name"
                    placeholder="Masukkan Data"
                  />
                </b-col>
              </b-row>
            </div>
          </b-form>

          <div class="mt-1">
            <h4
              class="font-weight-bolder"
              style="font-size: 20px;color: #222222;"
            >
              Penjemputan Barang
            </h4>
            <b-row
              class="mt-1 align-items-center"
            >
              <b-col
                md="3"
              >
                <span
                  class="text-18-normal"
                  style="color: #222222;"
                >
                  Maksimal Penjemputan
                </span>
              </b-col>
              <b-col
                md="3"
              >
                <b-form-input
                  id="name"
                  v-model="name"
                  placeholder="Masukkan Data"
                />
              </b-col>
            </b-row>
            <b-row
              class="mt-1 align-items-center"
            >
              <b-col
                md="3"
              >
                <span
                  class="text-18-normal"
                  style="color: #222222;"
                >
                  Kendaraan
                </span>
              </b-col>
              <b-col
                md="3"
              >
                <div class="d-flex justify-content-between">
                  <div
                    id="choicemotor"
                    class="choiceTypeVehicle"
                    @click="handleChoiceTypeVehicle('motor')"
                  >
                    <img
                      :src="require('@/assets/images/elements/expedisimotor.png')"
                      alt="motor"
                      width="40px"
                      height="26px"
                    >
                    <span>Motor</span>
                  </div>

                  <div
                    id="choicemobil"
                    class="choiceTypeVehicle"
                    @click="handleChoiceTypeVehicle('mobil')"
                  >
                    <img
                      :src="require('@/assets/images/elements/expedisimobil.png')"
                      alt="mobil"
                      width="54px"
                      height="24px"
                    >
                    <span>Mobil</span>
                  </div>

                  <div
                    id="choicetruk"
                    class="choiceTypeVehicle"
                    @click="handleChoiceTypeVehicle('truk')"
                  >
                    <img
                      :src="require('@/assets/images/elements/expedisitruk.png')"
                      alt="truk"
                      width="34px"
                      height="30px"
                    >
                    <span>Truk</span>
                  </div>
                </div>
              </b-col>
            </b-row>
          </div>

          <div class="mt-1">
            <h4
              class="font-weight-bolder"
              style="font-size: 20px;color: #222222;"
            >
              Pembatasan Daerah Akses COD
            </h4>
            <b-row
              class="mt-1 align-items-center"
            >
              <b-col
                md="3"
              >
                <span
                  class="text-18-normal"
                  style="color: #222222;"
                >
                  Data Daerah Tanpa Akses
                </span>
              </b-col>
              <b-col
                md="3"
              >
                <b-button
                  block
                  variant="outline-primary"
                  class="btn-custom--editakseslayanan"
                  @click="$router.push(`/data-partner/${$route.params.id}/detail/riwayat-penarikan`)"
                >
                  Lihat Data
                </b-button>
              </b-col>
            </b-row>
          </div>

        </b-card-body>
      </b-card>
      <b-modal
        id="modal-edit-akseslayanan"
        ref="modal-edit-akseslayanan"
        centered
        hide-header
        hide-header-close
        hide-footer
        size="md"
        @show="checkAksesLayanan"
      >
        <div
          style="display: grid; grid-row-gap: 1rem;"
        >
          <h3
            class="text-24-bold"
            style="color: #222222;"
          >
            Menambahkan Akses Layanan
          </h3>
          <b-form-group>
            <b-form-checkbox
              v-for="option in listCheckBox"
              :key="option.value"
              v-model="selectedCheckbox"
              :value="option.value"
              name="checkboxAksesLayanan"
            >
              {{ option.text }}
            </b-form-checkbox>
          </b-form-group>
          <div
            class="d-flex mt-1 justify-content-end"
          >
            <b-button
              variant="outline-primary"
              class="mr-1 btn-custom--editakseslayananbtn"
              @click="hideModalAksesLayanan"
            >
              Batal
            </b-button>
            <b-button
              variant="primary"
              class="btn-custom--editakseslayananbtn"
              @click="simpanDataAksesLayanan"
            >
              Simpan
            </b-button>
          </div>
        </div>
      </b-modal>

    </div>

    <div
      v-else
      class="text-center"
    >
      <b-spinner
        variant="primary"
        label="Text Centered"
      />
    </div>
  </section>
</template>

<script>
import {
  BRow,
  BCol,
  BForm,
  BModal,
  BFormInput,
  BFormGroup,
  BFormCheckbox,
  // BListGroup,
  // BListGroupItem,
  BButton,
  BCard,
  BSpinner,
  BCardBody,
} from 'bootstrap-vue'

export default {
  components: {
    BRow,
    BCol,
    BForm,
    BModal,
    BFormInput,
    BFormGroup,
    BFormCheckbox,
    // BListGroup,
    // BListGroupItem,
    BButton,
    BCard,
    BSpinner,
    BCardBody,
  },
  data() {
    return {
      loadDataAwal: true,
      name: '',
      listCheckBox: [
        { text: 'Hiring', value: 'hiring' },
        { text: 'COD', value: 'cod' },
        { text: 'Hiring dan COD', value: 'hiringncod' },
        { text: 'Lainnya', value: 'lainny' },
      ],
      selectedCheckbox: [],
    }
  },
  computed: {
    //
  },
  watch: {
    //
  },
  mounted() {
    //
  },
  created() {
    setTimeout(() => {
      this.loadDataAwal = false
    }, 1000)
  },
  methods: {
    submitData() {
      console.log(this.name)
    },
    checkAksesLayanan() {
      //
    },
    hideModalAksesLayanan() {
      this.$nextTick(() => {
        this.$bvModal.hide('modal-edit-akseslayanan')
      })
    },
    simpanDataAksesLayanan() {
      // calling api and finish hide modal
      // refresh or watch selected list akses layanan
      this.$nextTick(() => {
        this.$bvModal.hide('modal-edit-akseslayanan')
      })
    },
    simpanFormEdit() {
      // calling api for simpan data
    },
    handleChoiceTypeVehicle(val) {
      console.log(val)
      const el = document.getElementById(`choice${val}`)
      // make radio choice
      el.style.border = '1px solid #F95031'
    },
  },
}
</script>

<style lang="scss" scoped>
.btn-custom{
  border-radius: 16px;
  width: 56px;
  height: 56px;

  &--edit{
    width: 178px;
    height: 56px;
    border-radius: 12px;
  }
  &--editakseslayanan{
    height: 56px;

    &btn{
      width: 178px;
      height: 56px;
    }
  }
}
.choiceTypeVehicle{
  display: grid;
  justify-content: center;
  align-content: center;
  text-align: center;
  grid-row-gap: 10px;
  width: 70px;
  height: 70px;
  border: 1px solid #828282;
  border-radius: 12px;
  cursor: pointer;
}
</style>
