<template>
  <div class="data-order-header-wrapper">
    <b-card-title class="mb-4">Data Order</b-card-title>
    <div class="data-order-floating-button-wrapper top-right">
      <b-button
        v-if="currentView === 'send'"
        class="org-button header-button mid-part"
      >
        Ajukan Pickup
      </b-button>
      <b-dropdown
        id="dropdown-1"
        :text="dropdownText"
        class="white-button"
        variant="outline-warning"
      >
        <b-dropdown-item
          @click="() => handleDropdown('import')"
        >Import</b-dropdown-item>
        <b-dropdown-item
          @click="() => handleDropdown('export')"
        >Export</b-dropdown-item>
      </b-dropdown>
    </div>
    <b-nav class="data-order-nav-wrapper mb-3">
      <b-nav-item
        class="data-order-nav-item"
        :active="(currentView === 'all')"
      >
        <div
          class="transparent-button"
          @click="() => navButtonToggle('all')"
        >
          Semua
        </div>
        <div class="tag-item">05</div>
      </b-nav-item>
      <b-nav-item
        class="data-order-nav-item"
        :active="(currentView === 'send')"
      >
        <div
          class="transparent-button"
          @click="() => navButtonToggle('send')"
        >
          Perlu Dikirim
        </div>
      </b-nav-item>
      <b-nav-item
        class="data-order-nav-item"
        :active="(currentView === 'sent')"
      >
        <div
          class="transparent-button"
          @click="() => navButtonToggle('sent')"
        >
          Dikirim
        </div>
      </b-nav-item>
      <b-nav-item
        class="data-order-nav-item"
        :active="(currentView === 'received')"
      >
        <div
          class="transparent-button"
          @click="() => navButtonToggle('received')"
        >
          Diterima
        </div>
      </b-nav-item>
      <b-nav-item
        class="data-order-nav-item"
        :active="(currentView === 'retur')"
      >
        <div
          class="transparent-button"
          @click="() => navButtonToggle('retur')"
        >
          Retur
        </div>
      </b-nav-item>
    </b-nav>
    <div class="data-order-filter-wrapper">
      <div class="search-bar">
        <b-form-input
          v-model="searchFilterText"
          class="search-input"
          type="search"
          placeholder="Example"
          @input="updateSearchFilterText"
        />
        <div class="icon-magnify-glass"><b-icon-search /></div>
      </div>
      <data-order-filter
        @onFormSubmit="handleFilterFormSubmit"
      />
    </div>
  </div>
</template>

<script>
import {
  BCardTitle,
  BButton,
  BNav,
  BNavItem,
  BFormInput,
  BIconSearch,
  BDropdown,
  BDropdownItem,
} from 'bootstrap-vue'
import DataOrderFilter from './DataOrderFilter.vue'

export default {
  components: {
    BCardTitle,
    BButton,
    BNav,
    BNavItem,
    BFormInput,
    BIconSearch,
    BDropdown,
    BDropdownItem,
    DataOrderFilter,
  },
  data() {
    return {
      currentView: 'all',
      dropdownText: 'Export',
      searchFilterText: '',
      filterForm: {
        date: '',
        product: '',
        method: null,
      },
    }
  },
  methods: {
    navButtonToggle(val) {
      if (val) {
        this.currentView = val
        this.$emit('onUpdateView', val)
      }
    },
    updateSearchFilterText(val) {
      if (val) {
        this.searchFilterText = val
        this.$emit('onSearchFilter', val)
      }
    },
    handleDropdown(val) {
      if (val) this.dropdownText = val === 'export' ? 'Export' : 'Import'
    },
    handleFilterFormSubmit(valObj) {
      if (valObj) {
        this.filterForm = valObj
      }
    },
  },
}
</script>
