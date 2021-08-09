<template>
  <b-col cols="12">
    <b-card
      no-body
    >
      <h3 class="ml-2 mb-2 mt-2">
        List Modul
      </h3>
      <h3
        class="ml-2 mb-1 mt-2"
      >
        {{ classSkill }}
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
          class="position-relative mt-5"
          empty-text="Tidak ada data untuk ditampilkan."
          :empty-filtered-text="`Tidak ada hasil untuk kata kunci '${filter}'.`"

          :show-empty="!loading"
          :per-page="perPage"
          :current-page="currentPage"
          :items="tableProvider"
          :fields="tableFields"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          :filter="filter"
          :filter-included-fields="filterOn"
          :tbody-tr-class="rowClass"
          :busy.sync="loading"
        >

          <template #cell(module)="data">
            <h4>{{ data.item.module.module_title }}</h4>
            <p>{{ data.item.module.module_subtitle }}</p>
          </template>

          <template #cell(module_trainer)="data">
            <span>{{ data.item }}</span>
          </template>

          <template #cell(module_status)="data">
            <b-badge
              :variant="data.field.badge[data.item]"
            >
              {{ data.field.badge[data.item] }}
            </b-badge>
          </template>

          <template #cell(action)>
            <b-button
              variant="flat-info"
              class="btn-icon"
              tag="router-link"
              :to="{ name: $route.meta.routeLesson }"
            >
              <feather-icon
                icon="SettingsIcon"
              />
            </b-button>
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
  },

  data() {
    return {
      loading: false,
      classSkill: '',
      fields: [
        { key: 'module', label: 'Modul' },
        { key: 'module.modul_trainer', label: 'Trainer' },
        {
          key: 'module.module_status',
          label: 'Status',
          badge: [
            {
              publish: 'Publish',
              private: 'Private',
            },
            {
              publish: 'light-success',
              private: 'light-danger',
            },
          ],
        },
        { key: 'action', label: 'Aksi' },
      ],
      module_id: 1,
    }
  },
  computed: {
    tableFields() {
      const fields = [...this.fields]
      return fields
    },
  },
  mounted() {
    this.$http.get('/lms/module/list/3').then(response => {
      const { data } = response.data
      this.classSkill = data[0].class_skill
      console.log(data)
    })
  },
  methods: {
    tableProvider() {
      return this.$http.get('/lms/module/list/3').then(response => {
        const { data } = response.data
        return data
      })
    },
    loadClass() {
      return this.$http.get('/lms/module/list/3').then(response => {
        const { data } = response.data
        this.classSkill = response.data.data.class_skill
        console.log(data)
        return data
      })
    },
    // isDeleted(id) {
    //   return this.deletedIds.includes(id)
    // },
    // rowClass(item, type) {
    //   const colorClass = 'table-danger'
    //   if (!item || type !== 'row') { return }

    //   // eslint-disable-next-line consistent-return
    //   if (this.isDeleted(item.id)) { return colorClass }
    // },
  },
}
</script>
<style>

</style>
