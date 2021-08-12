<template>
  <b-col cols="12">
    <b-card
      no-body
    >
      <h3 class="ml-2 mb-2 mt-2">
        List Lesson
      </h3>
      <h3 class="ml-2 mb-2">
        {{ moduleTitle }}
      </h3>
      <b-col md="3">
        <b-form-group
          class="mb-0 ml-50"
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
      </b-col>
      <b-form-row>
        <b-col cols="auto">
          <b-avatar
            size="80px"
            rounded="sm"
            class="mt-2 ml-2"
          />
        </b-col>
        <b-col class="d-flex align-items-center pr-5">
          <div>
            <b-card-title class="mb-1 mt-2">
              <h5 class="text-dark">
                {{ moduleTitle }} - {{ moduleSubtitle }}
              </h5>
            </b-card-title>
            <b-badge
              variant="light-success"
            >
              {{ moduleStatus }}
            </b-badge>
            <p class="mt-1">
              {{ trainerName }}
            </p>
          </div>
        </b-col>
      </b-form-row>

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
          class="position-relative mt-1"
          empty-text="Tidak ada data untuk ditampilkan."
          :empty-filtered-text="`Tidak ada hasil untuk kata kunci '${filter}'.`"

          :show-empty="!loading"
          :per-page="perPage"
          :current-page="currentPage"
          :items="tableProvider"
          :fields="fieldsTable"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          :filter="filter"
          :filter-included-fields="filterOn"
          :tbody-tr-class="rowClass"
          :busy.sync="loading"
        >

          <template #cell(lesson_title)="data">
            <b-form-row>
              <b-col cols="auto">
                <b-avatar
                  size="md"
                  rounded="sm"
                  :src="data.item.lesson.lesson_thumbnail"
                />
              </b-col>
              <b-col class="d-flex align-items-center pr-5">
                <div>
                  <b-card-title class="mb-1 mt-50">
                    <h5>{{ data.item.lesson.lesson_title }}</h5>
                  </b-card-title>
                </div>
              </b-col>
            </b-form-row>
          </template>

          <template #cell(action)>
            <b-button
              variant="flat-warning"
              class="btn-icon"
            >
              <feather-icon
                icon="EditIcon"
              />
            </b-button>
            <b-button
              variant="flat-danger"
              class="btn-icon"
            >
              <feather-icon
                icon="Trash2Icon"
              />
            </b-button>
          </template>
        </b-table>
      </b-overlay>
    </b-card>
  </b-col>
</template>

<script>
import {
  BCol,
  BCard,
  BInputGroup,
  BInputGroupPrepend,
  // BForm,
  BFormGroup,
  BFormInput,
  BOverlay,
  BBadge,
  BTable,
  BButton,
  BFormRow,
  BCardTitle,
  BAvatar,
} from 'bootstrap-vue'

export default {
  components: {
    BCol,
    BCard,
    BInputGroup,
    BInputGroupPrepend,
    // BForm,
    BFormGroup,
    BFormInput,
    BOverlay,
    BBadge,
    BTable,
    BButton,
    BFormRow,
    BCardTitle,
    BAvatar,
  },

  data() {
    return {
      fields: [
        { key: 'lesson_title', label: 'Lesson' },
        { key: 'action', label: 'Aksi' },
      ],

      moduleTitle: '',
      moduleSubtitle: '',
      trainerName: '',
      moduleStatus: '',

      loading: false,
    }
  },
  computed: {
    fieldsTable() {
      const fields = [...this.fields]
      return fields
    },
  },
  mounted() {
    this.$http.get('/lms/lesson/list/10').then(response => {
      const { data } = response.data
      this.moduleTitle = data[0].module_title
      this.moduleSubtitle = data[0].module_subtitle
      this.trainerName = data[0].module_trainer_name
      this.moduleStatus = data[0].module_status
      console.log(data)
      return data
    })
    console.log(this.loadModule())
  },
  methods: {
    tableProvider() {
      return this.$http.get('/lms/lesson/list/10').then(response => {
        const { data } = response.data
        return data
      })
    },
    loadModule() {
      return this.$http.get('/lms/module/list/10').then(response => {
        const { data } = response.data
        return data
      })
    },
  },
}
</script>
<style>

</style>
