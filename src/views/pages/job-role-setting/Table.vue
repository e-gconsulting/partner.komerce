<template>
  <div class="pb-1">
    <b-overlay
      variant="light"
      :show="loading"
      spinner-variant="primary"
      blur="0"
      opacity=".5"
      rounded="sm"
    >
      <b-card-actions
        ref="formCard"
        :title="$route.meta.name.singular"
        no-actions
        no-body
      >
        <b-tabs v-model="tabIndex" fill>
          <b-tab
            v-for="tab in tabs"
            :key="tab.id"
            :title="`${tab.application_name} (${tab.platform_type})`"
            lazy
          >
            <b-table :items="items" :fields="fields" show-empty>
              <template #cell(id)="data">
                <b-button
                  tag="router-link"
                  :to="{
                    name: $route.meta.routeShow,
                    params: { id: data.item.id },
                  }"
                  class="btn-icon"
                  variant="outline-info"
                >
                  <feather-icon
                    icon="SettingsIcon"
                    size="18"
                    class="mr-1 p-0"
                  />
                  Manage
                </b-button>
              </template>
              <template #empty="scope">
                <p class="text-center">{{ scope.emptyFilteredText }}</p>
              </template>
            </b-table>
          </b-tab>
        </b-tabs>
      </b-card-actions>
    </b-overlay>
  </div>
</template>

<script>
import {
  BTabs, BTab, BTable, BButton, BOverlay,
} from 'bootstrap-vue'
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'

export default {
  components: {
    BCardActions,
    BTable,
    BTabs,
    BTab,
    BButton,
    BOverlay,
  },
  data() {
    const tabs = []
    return {
      tabIndex: 0,
      tabs,
      loading: false,
      fields: [
        {
          key: 'name',
          label: 'Root Menu',
        },
        {
          key: 'id',
          label: 'Manage',
        },
      ],
      items: [],
    }
  },
  async created() {
    this.loading = true

    return this.$http
      .get('komerceApplication')
      .then(response => {
        const { data } = response.data
        this.tabs = data
      })
      .finally(() => {
        this.loading = false
      })
  },
  watch: {
    tabIndex(newValue) {
      const komereApplicationId = newValue >= 0 ? this.tabs[newValue].id : null
      this.getAllMenu(komereApplicationId)
    },
  },
  methods: {
    getAllMenu(komereApplicationId) {
      this.loading = true
      this.items = []
      this.$http
        .get(
          `menu?parent_menu_id=0&komerce_application_id=${komereApplicationId}&is_root_menu=true`,
        )
        .then(({ data }) => {
          this.items = data.data
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
