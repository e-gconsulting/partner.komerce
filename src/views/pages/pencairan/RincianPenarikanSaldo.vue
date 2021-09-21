<template>
  <section id="cod-rincian-penarikan-saldo">
    <div v-if="!loadDataAwal">
      <b-card no-body>
        <b-card-header class="custom-card-header">
          <b-row style="width: 100%;">
            <b-col
              md="12"
              class="d-flex justify-content-between"
            >
              <div class="d-flex align-items-center">
                <b-button
                  variant="primary"
                  size="sm"
                  class="mr-50 btn-custom"
                >
                  <feather-icon
                    size="2x"
                    icon="ChevronLeftIcon"
                  />
                </b-button>
                <h4
                  class="card-title text-24-bold"
                >
                  Rincian Penarikan Saldo
                </h4>
              </div>
              <div
                class="statusWrapper d-flex align-items-center justify-content-center"
                :class="$route.params.slug.toLowerCase() | changeStatus"
              >
                {{ $route.params.slug.replace('-', ' ') }}
              </div>
            </b-col>
          </b-row>
        </b-card-header>
        <b-card-body>
          <div class="mb-2 d-flex justify-content-between">
            <table
              class="table-custom"
            >
              <tr>
                <td class="td-custom text-18-normal">
                  Tanggal Penarikan
                </td>
                <td class="text-18-bold">
                  31 Agustus 2021
                </td>
              </tr>
              <tr>
                <td class="td-custom text-18-normal">
                  Nama
                </td>
                <td class="text-18-bold">
                  Hanif Muflihul
                </td>
              </tr>
              <tr>
                <td class="td-custom text-18-normal">
                  Nama Bank
                </td>
                <td class="text-18-bold">
                  Bank Mandiri
                </td>
              </tr>
              <tr>
                <td class="td-custom text-18-normal">
                  No Rekening
                </td>
                <td class="text-18-bold">
                  900012321423
                </td>
              </tr>
            </table>
            <b-card no-body>
              <b-card-body>
                <div style="display: grid;">
                  <span class="text-bukti-transfer">
                    Bukti Transfer
                  </span>
                  <div class="wrapper-uploaded d-flex">
                    <div class="icon-uploaded d-flex justify-content-center align-items-center">
                      <feather-icon
                        icon="FileIcon"
                        size="2x"
                      />
                    </div>
                    <div style="display: grid;">
                      <span class="text-bukti-transfer">
                        Bukti-Transfer.png
                      </span>
                      <span class="text-filesize-bukti-transfer">
                        159 Kb
                      </span>
                    </div>
                  </div>
                </div>
              </b-card-body>
            </b-card>
          </div>
          <div class="d-flex mb-2">
            <div class="details-total mr-2">
              <div class="d-flex align-items-center">
                <span class="text-16-normal">
                  Total Saldo:
                  <span class="text-16-normal font-weight-bolder">
                    Rp5.000.000
                  </span>
                </span>
                <b-button
                  variant="outline-primary"
                  size="sm"
                  class="btn-icon btn-custom-details"
                >
                  <feather-icon icon="AlertCircleIcon" />
                </b-button>
              </div>
              <div class="d-flex align-items-center">
                <span class="text-16-normal">
                  Total Saldo:
                  <span class="text-16-normal font-weight-bolder">
                    Rp5.000.000
                  </span>
                </span>
                <b-button
                  variant="outline-info"
                  size="sm"
                  class="btn-icon btn-custom-details"
                >
                  <feather-icon icon="AlertCircleIcon" />
                </b-button>
              </div>
            </div>

            <div class="details-total">
              <div class="d-flex align-items-center">
                <span class="text-16-normal">
                  Nominal Penarikan Saldo:
                  <span class="text-16-normal font-weight-bolder">
                    Rp5.000.000
                  </span>
                </span>
                <b-button
                  variant="outline-success"
                  size="sm"
                  class="btn-icon btn-custom-details"
                >
                  <feather-icon icon="CopyIcon" />
                </b-button>
              </div>
              <span class="text-16-normal">
                Sisa Saldo:
                <span class="text-16-normal font-weight-bolder">
                  Rp500.000
                </span>
              </span>
            </div>
          </div>
          <b-row>
            <b-col
              lg="12"
            >
              <b-table-simple responsive>
                <b-thead>
                  <b-tr>
                    <b-th>Nama</b-th>
                    <b-th>Nama Bank</b-th>
                    <b-th>No Rekening</b-th>
                    <b-th>Nominal</b-th>
                    <b-th>Status</b-th>
                  </b-tr>
                </b-thead>
                <b-tbody>
                  <b-tr
                    v-for="row in rowsTable"
                    :key="row.userId"
                  >
                    <b-td
                      class="font-weight-bolder"
                    >
                      <span>
                        {{ row.name }}
                      </span>
                      <br>
                      <span>
                        {{ row.email }}
                      </span>
                    </b-td>
                    <b-td>
                      {{ row.bankName }}
                    </b-td>
                    <b-td>{{ row.bankNo }}</b-td>
                    <b-td
                      class="font-weight-bolder"
                    >
                      {{ row.nominal }}
                    </b-td>
                    <b-td
                      style="cursor: pointer;"
                    >
                      <!-- <b-link
                        :to="{ name: 'cod-rincian-penarikan-saldo', params: { slug: row.status.replace(' ','-') } }"
                      > -->
                      <span
                        :class="colorStatus(row.status)"
                      >
                        {{ row.status }}
                      </span>
                      <!-- </b-link> -->
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-col>
          </b-row>

        </b-card-body>
      </b-card>
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
  BCard,
  // BFormInput,
  // BFormGroup,
  // BDropdownForm,
  BTableSimple,
  BThead,
  BTbody,
  BTh,
  BTr,
  BTd,
  // BInputGroup,
  // BInputGroupPrepend,
  // BDropdown,
  BButton,
  BSpinner,
  BCardBody,
  BCardHeader,
  // BFormSelect,
} from 'bootstrap-vue'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    // BFormInput,
    BTableSimple,
    BThead,
    BTbody,
    BTh,
    BTr,
    BTd,
    // BInputGroup,
    // BFormGroup,
    // BDropdownForm,
    // BInputGroupPrepend,
    // BDropdown,
    BButton,
    BSpinner,
    BCardBody,
    // BFormSelect,
    BCardHeader,
  },
  filters: {
    // capitalize: value => {
    //   let val = value
    //   if (!val) return ''
    //   val = val.toString()
    //   return val.charAt(0).toUpperCase() + val.slice(1)
    // },
    changeStatus: val => {
      let className = ''
      switch (val) {
        case 'disetujui':
          className = 'statusSuccess'
          break
        case 'perlu-disetujui':
          className = 'statusPrimary'
          break
        case 'sedang-direview':
          className = 'statusWarning'
          break
        default:
          break
      }
      return className
    },
  },
  data() {
    return {
      loadDataAwal: true,
      rowsTable: [
        {
          userId: 1,
          name: 'Hanif Muflihul',
          email: 'hallobusiness@gmail.com',
          bankName: 'Bank Mandiri',
          bankNo: 9000021233213,
          nominal: 4500000,
          status: 'Perlu disetujui',
        },
        {
          userId: 11,
          name: 'Terry Siphron',
          email: 'hallobusiness@gmail.com',
          bankName: 'Bank Mandiri',
          bankNo: 9000021233213,
          nominal: 5000000,
          status: 'Sedang direview',
        },
        {
          userId: 21,
          name: 'Kadin Franci',
          email: 'hallobusiness@gmail.com',
          bankName: 'Bank Mandiri',
          bankNo: 9000021233213,
          nominal: 5000000,
          status: 'Disetujui',
        },
      ],
    }
  },
  mounted() {
    this.loadDataAwal = false
    //
  },
  created() {
    // this.fetchData()
    // get data tabel detail pencairan
    // get data for select option status
  },
  methods: {
    colorStatus(status) {
      let classStatusColor = ''
      switch (status) {
        case 'Perlu disetujui':
          // #FF6A3A
          classStatusColor = 'colorStatusPrimary'
          break
        case 'Sedang direview':
          // #FBA63C
          classStatusColor = 'colorStatusWarning'
          break
        case 'Disetujui':
          // #34A770
          classStatusColor = 'colorStatusSuccess'
          break
        default:
          break
      }
      return classStatusColor
    },
  },
}
</script>

<style lang="scss" scoped>
.statusSuccess{
  background: #DCF3EB;
  color: #34A770;
}
.statusPrimary{
  background: #FFECE9;
  color: #F95031;
}
.statusWarning{
  background: #FFF2E2;
  color: #FBA63C;
}
.statusWrapper{
  width: 194px;
  height: 50px;
  border-radius: 4px;
  letter-spacing: 0.5px;
  font-weight: 600;
  font-size: 20px;
  line-height: 150%;
}
.btn-custom{
  border-radius: 16px;
  width: 56px;
  height: 56px;
}
.table-custom{
  border: none;
}
td{
  padding-bottom: 20px;
}
.td-custom{
  width: 200px;
}
.text-bukti-transfer{
  font-weight: 600;
  font-size: 20px;
  line-height: 150%;
  letter-spacing: 0.5px;
  color: #444444;
}
.text-filesize-bukti-transfer{
  font-weight: 500;
  font-size: 18px;
  line-height: 150%;
  /* identical to box height, or 27px */
  display: flex;
  align-items: center;
  letter-spacing: 0.5px;
  /* Grayscale/Label */
  color: #828282;
}
.wrapper-uploaded{
  background: #FFFFFF;
  border: 1px solid #444444;
  box-sizing: border-box;
  border-radius: 12px;
  padding: 1rem;
  margin-top: 1rem;
}
.icon-uploaded{
  background: #F1F2F6;
  border: 1px solid #444444;
  box-sizing: border-box;
  width: 57px;
  height: 65px;
  margin-right: 10px;
  border-radius: 12px;
}
.details-total{
  display: grid;
  padding: 16px;
  width: 400px;
  height: 94px;
  border-radius: 8px;
  background: #FFFFFF;
  border: 1px solid #E2E2E2;
  box-sizing: border-box;
}
.btn-custom-details{
  border: none !important;
}
</style>>
