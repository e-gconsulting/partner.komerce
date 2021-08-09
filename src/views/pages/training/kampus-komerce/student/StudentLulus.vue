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
            240 Student
          </h4>
        </b-col>
      </b-row>

      <div class="mb-1 pl-2 d-flex overflow-x-scroll overflow-y-hidden">
        <div
          v-for="(item, index) in filterPositionItems"
          :key="`filter-position-${item.id}`"
          class="mr-50"
        >
          <b-form-group>
            <b-button
              :variant="filterPositionId === item.id ? 'primary' : 'flat-dark'"
              class="text-nowrap"
              :class="{'mr-2': index === (filterPositionItems.length - 1)}"
              :pressed="filterPositionId === item.id"
              pill
              size="sm"
              @click="selectPosition(item.id)"
            >
              {{ item.position_name }}
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
          :fields="fields"
          :items="items"
        >

          <template #cell(id)="data">
            <span>{{ data.value.value }}</span>
          </template>

          <template #cell(data_diri)="data">
            <b-row class="mt-1">
              <b-col cols="auto">
                <b-avatar
                  class="mr-50"
                />
              </b-col>
              <b-col cols="auto">
                <span>{{ data.value.value }}</span>
                <p>Candra@gmail.aing</p>
              </b-col>
            </b-row>
          </template>

          <template #cell(percentage)="data">
            <span>{{ data.value.value }}</span>
          </template>

          <template #cell(tanggal_gabung_kelas)="data">
            <span>{{ data.value.value }}</span>
          </template>

          <template #cell(action)>
            <b-button
              variant="flat-warning"
              class="btn-icon"
              tag="router-link"
              :to="{ name: $route.meta.routeEdit }"
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
} from 'bootstrap-vue'
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'
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
  },
  data() {
    return {
      filterPositionId: 1,
      filterPositionItems: [],

      fields: [
        { key: 'id', label: 'ID' },
        { key: 'data_diri', label: 'Data Diri' },
        { key: 'percentage', label: 'Percentage' },
        { key: 'tanggal_gabung_kelas', label: 'Tanggal Gabung Kelas' },
        { key: 'action', label: 'Aksi' },
      ],

      items: [
        {
          id: { value: 1 }, data_diri: { value: 'Candra Fakboy Komerce' }, percentage: { value: '80%' }, tanggal_gabung_kelas: { value: '01 Januari 2021' },
        },
      ],
    }
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
    loadFilterPositions() {
      return this.$http.post('/position', {}, {
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
    selectPosition(id) {
      this.filterPositionId = id
      return id
    },
  },
}
</script>

<style>

</style>
