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
                    <v-select
                      label="title"
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
                  >
                    <flat-pickr
                      class="form-control"
                      placeholder="Pilih tanggal"
                      :config="{ mode: 'range', altInput: true, altFormat: 'j/n/Y', dateFormat: 'Y-m-d',}"
                    />
                  </b-card>
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
          :empty-filtered-text="`Tidak ada hasil untuk kata kunci '${filter}'.`"

          :show-empty="!loading"
          :items="tableProvider"
          :fields="tableFields"
          :filter="filter"
          :filter-included-fields="filterOn"
          :busy.sync="loading"
        >

          <template #cell(student_user_id)="data">
            <span>{{ data.item.student_user_id }}</span>
          </template>

          <template #cell(student_name)="data">
            <b-row class="mt-1">
              <b-col cols="auto">
                <b-avatar
                  :src="data.item.student_image"
                />
              </b-col>
              <b-col cols="auto">
                <span>{{ data.value }}</span>
                <p>{{ data.item.student_email }}</p>
              </b-col>
            </b-row>
          </template>

          <template #cell(student_score)="data">
            <span>{{ data.value }}</span>
          </template>

          <template #cell(student_finish_at)="data">
            <span>{{ data.value }}</span>
          </template>

          <template #cell(action)="data">
            <b-button
              variant="flat-warning"
              class="btn-icon"
              tag="router-link"
              :to="{ name: $route.meta.routeEdit, params: { student_id: data.item.student_user_id } }"
              @click="test(data)"
            >
              <feather-icon
                icon="EditIcon"
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
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import flatPickr from 'vue-flatpickr-component'
import { kFormatter } from '@core/utils/filter'
import vSelect from 'vue-select'

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
    BCard,
    // BFormSelect,
    flatPickr,
    vSelect,
  },
  mixins: [dateFormat],
  data() {
    return {
      filterPositionId: 1,
      filterPositionItems: [],
      filterClassId: 'Customer Service',

      loading: false,

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
          key: 'student_score',
          label: 'Nilai',
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          key: 'student_finish_at',
          label: 'Tanggal Lulus',
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          key: 'action',
          label: 'Aksi',
          class: 'col-action',
        },
      ],

      dataStudent: null,
      filter: null,
      filterOn: [],
      totalStudent: 0,

      customDate: null,
      range: 6,
      rangeOptions: [
        { text: 'Real Time', value: 6 },
        { text: 'Hari ini', value: 0 },
        { text: 'Kemarin', value: 1 },
        { text: 'Minggu ini', value: 2 },
        { text: 'Bulan ini', value: 3 },
        { text: 'Tahun ini', value: 4 },
        { text: 'Kustom', value: 5 },
      ],
    }
  },
  computed: {
    tableFields() {
      const fields = [...this.fields]
      return fields
    },
    isCustom() {
      return this.range === 5
    },
    startDate() {
      if (this.isCustom) {
        return Array.isArray(this.customDate)
          ? this.customDate[0]
          : this.customDate.split(' to ')[0]
      }

      let date = new Date()
      const previousDays = 1

      if (this.range === 0) {
        date.setDate(date.getDate() - previousDays)
      } else if (this.range === 1) {
        date.setDate(date.getDate() - 1 - previousDays)
      } else if (this.range === 2) {
        const day = date.getDay()
        const diff = date.getDate() - day + (day === 0 ? -6 : 1)
        date = new Date(date.setDate(diff))
      } else if (this.range === 3) {
        date = new Date(date.getFullYear(), date.getMonth(), 1)
      } else if (this.range === 4) {
        date = new Date(date.getFullYear(), 0, 1)
      }

      return this.getIsoDate(date)
    },
    endDate() {
      if (this.isCustom) {
        if (Array.isArray(this.customDate)) {
          return this.customDate.length > 1 ? this.customDate[1] : this.customDate[0]
        }

        const dates = this.customDate.split(' to ')
        return dates.length > 1 ? dates[1] : dates[0]
      }

      let date = new Date()
      const nextDays = 1

      if (this.range === 0) {
        date.setDate(date.getDate() + nextDays)
      } else if (this.range === 1) {
        date.setDate(date.getDate() - 1 + nextDays)
      } else if (this.range === 2) {
        const day = date.getDay()
        const diff = date.getDate() - day + (day === 0 ? -6 : 1) + 6
        date = new Date(date.setDate(diff))
      } else if (this.range === 3) {
        date = new Date(date.getFullYear(), date.getMonth() + 1, 0)
      } else if (this.range === 4) {
        date = new Date(date.getFullYear() + 1, 0, 0)
      }

      return this.getIsoDate(date)
    },
    dates: {
      get() {
        if (!this.customDate) {
          return []
        }

        return this.customDate.split(' to ')
      },
      set(value) {
        this.date = value[0] === value[1] ? value[0] : value
      },
    },
  },
  watch: {
    filterPositionId() {
      this.refreshTable()
    },
    startDate: {
      immediate: true,
      handler() {
        if (!this.isCustom) {
          this.customDate = [this.startDate, this.endDate]
        }
      },
    },
  },
  mounted() {
    this.loadFilterPositions()
    this.$http.get('/lms/report/student').then(response => {
      const { data } = response.data
      console.log(data)
    })
  },
  methods: {
    test(data) {
      console.log(data)
    },
    tableProvider() {
      return this.$http.get('/lms/report/student', {
        params: {
          class_skill_join: this.filterClassId,
          search_finish: this.filter,
        },
      }).then(response => {
        const { data } = response.data
        data.finished.forEach(this.myArray)
        return this.dataStudent
      }).catch(() => {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: '',
            icon: 'AlertCircleIcon',
            text: 'Tidak ada data Student yang di tampilkan.',
            variant: 'danger',
          },
        })
        return []
      })
    },
    myArray(data) {
      this.dataStudent = data.student
      this.totalStudent = data.total_student_Finish
      return data.student
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
