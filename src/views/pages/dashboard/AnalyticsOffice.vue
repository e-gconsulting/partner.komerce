<template>
  <b-card no-body>
    <b-card-body>
      <b-form-row class="mb-2">
        <b-col
          v-for="(item, index) in items"
          :key="`office-item-${index}`"
          cols="12"
          class="mb-50"
        >
          <div class="px-1 pt-1 pt-md-75 pb-75 rounded-lg border">
            <b-form-row>
              <b-col
                cols="12"
                md="auto"
                class="d-flex align-items-center"
              >
                <b-avatar
                  rounded="sm"
                  :variant="item.variant"
                >
                  <feather-icon
                    :icon="item.icon"
                    size="18"
                  />
                </b-avatar>
              </b-col>
              <b-col
                cols="12"
                md="auto"
                class="d-flex align-items-center"
              >
                <div>
                  <b-card-title class="mb-1 mt-50 mt-md-0">
                    <h6 class="text-secondary">
                      <small>{{ item.label }}</small>
                    </h6>
                  </b-card-title>
                  <b-card-sub-title class="h4">
                    <feather-icon
                      v-if="item.total === -1"
                      icon="MoreHorizontalIcon"
                    />
                    <span
                      v-else
                      class="text-dark"
                    >{{ numberFormat(item.total) }}</span>
                  </b-card-sub-title>
                </div>
              </b-col>
            </b-form-row>
          </div>
        </b-col>
      </b-form-row>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardBody, BCardTitle, BCardSubTitle, BFormRow, BCol, BAvatar,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BCardBody,
    BCardTitle,
    BCardSubTitle,
    BFormRow,
    BCol,
    BAvatar,
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    startDate: {
      type: String,
    },
    // eslint-disable-next-line vue/require-default-prop
    endDate: {
      type: String,
    },
  },
  data() {
    return {
      operationalOfficeTotal: -1,
      workingOfficeTotal: -1,
      coworkingOfficeTtotal: -1,
    }
  },
  computed: {
    total1() {
      const total = this.operationalOfficeTotal + this.workingOfficeTotal + this.coworkingOfficeTtotal
      return total < 0 ? -1 : total
    },
    items() {
      return [
        {
          label: 'Kantor Operasional',
          total: this.operationalOfficeTotal,
          icon: 'LayersIcon',
          variant: 'light-warning',
        },
        {
          label: 'Working Space',
          total: this.workingOfficeTotal,
          icon: 'CodepenIcon',
          variant: 'light-info',
        },
        {
          label: 'Co-Working Space',
          total: this.coworkingOfficeTtotal,
          icon: 'ColumnsIcon',
          variant: 'light-danger',
        },
      ]
    },
  },
  mounted() {
    this.loadSummary()
  },
  methods: {
    loadSummary() {
      return this.$http.get('/dashboard/officeSummary', {
        params: {
          sort: 'name',
          direction: 'asc',
        },
      })
        .then(async response => {
          const { data } = response.data

          this.operationalOfficeTotal = data.operationalOffices
          this.workingOfficeTotal = data.offices
          this.coworkingOfficeTtotal = data.coworkingSpaces
        })
    },
    numberFormat(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
  },
}
</script>
