<template>
  <b-row>
    <b-col cols="12">
      <b-row>
        <b-col cols="6">
          <b-card-actions
            no-body
            no-actions
          >
            <div class="d-flex ml-2">
              <b-form-group
                class="mb-0"
              >
                <b-input-group
                  class="input-group-merge"
                  size="sm"
                >
                  <b-button
                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                    v-b-toggle.collapse-1
                    variant="primary"
                    size="sm"
                    class="mr-50"
                  >
                    <feather-icon
                      icon="FilterIcon"
                      class="mr-50"
                    />
                    Filter
                  </b-button>
                  <b-input-group-prepend is-text>
                    <feather-icon icon="SearchIcon" />
                  </b-input-group-prepend>
                  <b-form-input
                    id="filterInput"
                    v-model="filter"
                    type="search"
                    placeholder="Cari..."
                    debounce="500"
                  />
                </b-input-group>
              </b-form-group>
            </div>
          </b-card-actions>
        </b-col>
        <b-col
          cols="6"
          class="text-right"
        >
          <h4 class="mr-2">
            Total: {{ totalStudent }} Student
          </h4>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <b-collapse
            id="collapse-1"
            class="mb-2"
          >
            <b-card class="mb-0">
              <b-row>
                <b-col md="2">
                  <b-form-group
                    label="Percentage"
                  >
                    <b-form-input
                      v-model="percentageStudent"
                      label="title"
                      @input="filterPercent"
                    />
                  </b-form-group>
                </b-col>
                <b-col
                  cols="auto"
                  md="auto"
                  class="mt-2"
                >
                  <b-card
                    class="mb-0 mt-50"
                    no-body
                    title="Tanggal"
                  >
                    <flat-pickr
                      v-model="startDate"
                      class="form-control"
                      placeholder="Start Date"
                      :config="{ mode: 'single', altInput: true, altFormat: 'j/n/Y', dateFormat: 'Y-m-d',}"
                      @on-change="tableProvider"
                    />
                  </b-card>
                </b-col>
                <b-col
                  cols="auto"
                  md="auto"
                  class="mt-2"
                >
                  <b-card
                    class="mb-0 mt-50"
                    no-body
                    title="Tanggal"
                  >
                    <flat-pickr
                      v-model="endDate"
                      class="form-control"
                      placeholder="End Date"
                      :config="{ mode: 'single', altInput: true, altFormat: 'j/n/Y', dateFormat: 'Y-m-d',}"
                      @on-change="tableProvider"
                    />
                  </b-card>
                </b-col>
                <b-col
                  cols="auto"
                  md="auto"
                  class="mt-2"
                >
                  <b-button
                    variant="primary"
                    size="sm"
                    class="mt-1"
                    @click="clearDate"
                  >
                    Clear Date
                  </b-button>
                </b-col>
              </b-row>
            </b-card>
          </b-collapse>
        </b-col>
      </b-row>

      <div class="mb-1 pl-2 d-flex overflow-x-scroll overflow-y-hidden">
        <div
          v-for="(item, index) in filterPositionItems"
          :key="`filter-position-${item.class_id}`"
          class="mr-50"
        >
          <b-form-group>
            <b-button
              v-model="classSkillJoin"
              :variant="filterPositionId === item.class_id ? 'primary' : 'flat-dark'"
              class="text-nowrap"
              :class="{'mr-2': index === (filterPositionItems.length - 1)}"
              :pressed="filterPositionId === item.class_name"
              pill
              size="sm"
              @click="selectPosition(item)"
            >
              {{ item.class_name }}
            </b-button>
          </b-form-group>
        </div>
      </div>

      <b-overlay
        variant="light"
        :show="loading"
        spinner-variant="primary"
        blur="0"
        opacity=".5"
        rounded="sm"
      >
        <b-table
          ref="table"
          striped
          hover
          responsive
          class="position-relative"
          empty-text="Tidak ada data untuk ditampilkan."
          :empty-filtered-text="`Tidak ada hasil untuk kata kunci ${filter}`"

          :show-empty="!loading"
          :items="tableProvider"
          :fields="tableFields"
          :filter="filter"
          :filter-included-fields="filterOn"
          :busy.sync="loading"
        >

          <template #cell(student_user_id)="data">
            <span>{{ data.value }}</span>
          </template>

          <template #cell(student_name)="data">
            <b-row class="mt-1">
              <b-col cols="auto">
                <b-avatar
                  class="mr-50"
                  :src="data.item.student_img"
                />
              </b-col>
              <b-col cols="auto">
                <span>{{ data.item.student_name }}</span>
                <p>{{ data.item.student_email }}</p>
              </b-col>
            </b-row>
          </template>

          <template #cell(student_percentage)="data">
            <span>{{ data.item.student_percentage+'%' }}</span>
          </template>

          <!-- <template #cell(student_join_at)="data">
            <span>{{ data.item.student_join_at }}</span>
            <b-button
              variant="primary"
              size="sm"
              @click="cek(data.item.student_join_at)"
            >
              cek
            </b-button>
          </template> -->

          <template #cell(action)="data">
            <b-button
              variant="flat-info"
              class="btn-icon"
              tag="router-link"
              :to="{ name: $route.meta.routeDetail, params: { student_id: data.item.student_user_id } }"
            >
              <feather-icon
                icon="EyeIcon"
              />
            </b-button>
          </template>
        </b-table>
      </b-overlay>
    </b-col>
  </b-row>
</template>

<script>
import { dateFormat } from '@core/mixins/ui/date'
import flatPickr from 'vue-flatpickr-component'
import { kFormatter } from '@core/utils/filter'
import {
  BButton,
  BRow,
  BCol,
  BFormGroup,
  BInputGroup,
  BInputGroupPrepend,
  BFormInput,
  VBTooltip,
  BTable,
  BAvatar,
  BOverlay,
  BCollapse,
  VBToggle,
  BCard,
  // BFormSelect,
} from 'bootstrap-vue'
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'
import Ripple from 'vue-ripple-directive'

// import vSelect from 'vue-select'

export default {
  directives: {
    'b-tooltip': VBTooltip,
    'b-toggle': VBToggle,
    Ripple,
  },
  components: {
    BButton,
    BRow,
    BCol,
    BFormGroup,
    BInputGroup,
    BInputGroupPrepend,
    BFormInput,
    BCardActions,
    BTable,
    BAvatar,
    BOverlay,
    BCollapse,
    // vSelect,
    BCard,
    flatPickr,
    // BFormSelect,
  },
  mixins: [dateFormat],
  data() {
    return {
      loading: false,

      filterPositionId: 1,
      filterClassId: 'Customer Service',
      filterPositionItems: [],

      classSkillJoin: '',

      fields: [
        {
          key: 'student_user_id',
          label: 'ID',
        },
        {
          key: 'student_name',
          label: 'Data Diri',
        },
        {
          key: 'student_percentage',
          label: 'Percentage',
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          key: 'student_join_at',
          label: 'Tanggal Gabung Kelas',
          thClass: 'text-center',
          tdClass: 'text-center',
          formatter: value => {
            if (!value || value === '00-00-0000') return '-'
            return this.dateFormat(String(value), 'dd mmmm yyyy')
          },
        },
        {
          key: 'action',
          label: 'Aksi',
          class: 'col-action',
        },
      ],

      dataStudent: null,
      filter: '',
      filterOn: [],
      totalStudent: 0,

      startDate: null,
      endDate: null,
      percent: '',
      percentageStudent: null,
    }
  },
  computed: {
    tableFields() {
      const fields = [...this.fields]
      return fields
    },
  },
  watch: {
    filterPositionId() {
      this.refreshTable()
    },
  },
  mounted() {
    this.loadFilterPositions()
  },
  methods: {
    tes() {
      this.tableProvider()
    },
    clearDate() {
      this.startDate = null
      this.endDate = null
    },
    filterPercent() {
      this.tableProvider()
    },
    cek(data) {
      console.log(data)
    },
    tableProvider() {
      return this.$http.get('/lms/report/student', {
        params: {
          class_skill_join: this.filterClassId,
          search_join: this.filter,
          dateFrom: this.startDate,
          dateTo: this.endDate,
        },
      }).then(response => {
        const { data } = response.data
        data.joined.forEach(this.myArray)
        this.refreshTable()
        return this.dataStudent
      }).catch(() => {
        this.refreshTable()
        this.dataStudent = []
        return this.dataStudent
      })
    },
    myArray(data) {
      if (this.percentageStudent) {
        this.dataStudent = data.student.filter(item => item.student_percentage === Number(this.percentageStudent))
      } else {
        this.dataStudent = data.student
      }
      this.totalStudent = data.total_student_join
      return this.dataStudent
    },
    refreshTable() {
      this.$refs.table.refresh()
    },
    loadFilterPositions() {
      return this.$http.get('/lms/class/list', {}, {
        params: {
          is_division_external: 1,
          sort: 'name',
          direction: 'asc',
        },
      })
        .then(async response => {
          const { data } = response.data
          this.filterPositionItems = Object.keys(data).map(key => data[key])
        })
    },
    selectPosition(data) {
      this.filterPositionId = data.class_id
      this.filterClassId = data.class_name
      return data
    },
    kFormatter,
    getIsoDate(date) {
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = (date.getDate()).toString().padStart(2, '0')

      return `${date.getFullYear()}-${month}-${day}`
    },
  },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
@import '~@core/scss/vue/libs/vue-flatpicker.scss';
</style>
