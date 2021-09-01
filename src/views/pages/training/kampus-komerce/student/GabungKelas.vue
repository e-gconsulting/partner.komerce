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
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
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
              <b-form-group
                class="mb-0"
              >
                <b-input-group
                  class="input-group-merge"
                  size="sm"
                >
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

          <template #cell(student_score)="data">
            <span>{{ Math.round(data.item.student_score)+'%' }}</span>
          </template>

          <template #cell(student_join_at)="data">
            <span>{{ data.item.student_join_at }}</span>
          </template>

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
} from 'bootstrap-vue'
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import Ripple from 'vue-ripple-directive'

export default {
  directives: {
    'b-tooltip': VBTooltip,
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
          key: 'student_score',
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
            const date = String(new Date(value))
            this.dateFormat(date, 'dd mmmmm yyyy')
          },
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
    this.$http.get('/lms/report/student', {
      params: {
        class_skill_join: this.filterClassId,
      },
    }).then(response => {
      const { data } = response.data
      console.log(data)
    })
  },
  methods: {
    tes(data) {
      console.log(data)
    },
    tableProvider() {
      return this.$http.get('/lms/report/student', {
        params: {
          class_skill_join: this.filterClassId,
        },
      }).then(response => {
        const { data } = response.data
        data.joined.forEach(this.myArray)
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
      this.totalStudent = data.total_student_join
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
          console.log(this.filterPositionItems)
        })
    },
    selectPosition(data) {
      this.filterPositionId = data.class_id
      this.filterClassId = data.class_name
      return data
    },
  },
}
</script>

<style>

</style>
