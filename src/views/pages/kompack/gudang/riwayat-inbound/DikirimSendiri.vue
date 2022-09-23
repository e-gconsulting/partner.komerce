<template>
  <b-card body>
    <b-form
      v-if="show"
      variant="primary"
      @submit="onSubmit"
      @reset="onReset"
    >
      <div class="d-flex align-items-center">
        <b-button
          variant="primary"
          size="sm"
          class="mr-1 rounded-lg p-0"
          @click="$router.go(-1)"
        >
          <feather-icon
            size="2x"
            icon="ChevronLeftIcon"
          />
        </b-button>
        <h4 class="text-black font-bold">
          Detail Inbound
        </h4>
      </div>
      <div class="d-flex mb-3 justify-content-end">
        <b-button
          to="/Edit-Data-Produk"
          variant="outline-primary"
          class="px-4 mr-2 py-1 font-bolder"
        >Edit</b-button>
      </div>
      <b-form-group
        id="input-group-1"
        label="Status Inbound"
        label-for="input-1"
        label-cols-md="3"
      >
        <b-row>
          <b-col>
            <h4>{{ data }}</h4>
          </b-col>
        </b-row>
      </b-form-group>
      <b-form-group
        id="input-group-1"
        label="Dikirim dari"
        label-for="input-1"
        label-cols-md="3"
      >
        <b-row>
          <b-col>
            <h4>{{ data }}</h4>
          </b-col>
        </b-row>
      </b-form-group>
      <b-form-group
        id="input-group-1"
        label="Dikirim ke"
        label-for="input-1"
        label-cols-md="3"
      >
        <b-row>
          <b-col>
            <h4>{{ data }}</h4>
          </b-col>
        </b-row>
      </b-form-group>
      <b-form-group
        id="input-group-1"
        label="Jasa Pengiriman"
        label-for="input-1"
        label-cols-md="3"
      >
        <b-row>
          <b-col>
            <h4>{{ data }}</h4>
          </b-col>
        </b-row>
      </b-form-group>
      <b-form-group
        id="input-group-1"
        label="Tanggal Pengiriman"
        label-for="input-1"
        label-cols-md="3"
      >
        <b-row>
          <b-col>
            <h4>{{ data }}</h4>
          </b-col>
        </b-row>
      </b-form-group>
      <b-form-group
        id="input-group-1"
        label="Estimasi sampai Gudang"
        label-for="input-1"
        label-cols-md="3"
      >
        <b-row>
          <b-col>
            <h4>{{ data }}</h4>
          </b-col>
        </b-row>
      </b-form-group>
    </b-form>
    <b-form
      class="mt-2"
      border-variant="primary"
    >
      <h4 class="text-black font-bold">
        Data Produk
      </h4>
      <b-table
        small
        :fields="fields"
        :items="items"
        responsive="sm"
      >
        <!-- A virtual column -->
        <template #cell(Nama_Produk)="data">
          {{ data.index }}
        </template>

        <!-- A custom formatted column -->
        <template #cell(name)="data">
          <b class="text-info">{{ data.value.last.toUpperCase() }}</b>, <b>{{ data.value.first }}</b>
        </template>

        <!-- A virtual composite column -->
        <template #cell(nameage)="data">
          {{ data.item.name.first }} is {{ data.item.age }} years old
        </template>

        <!-- Optional default data cell scoped slot -->
        <template #cell()="data">
          <i>{{ data.value }}</i>
        </template>
      </b-table>
    </b-form>
  </b-card>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
        name: '',
        food: null,
        checked: [],
      },
      foods: [
        { text: 'Select One', value: null },
        'Carrots',
        'Beans',
        'Tomatoes',
        'Corn',
      ],
      fields: [
        // A virtual column that doesn't exist in items
        { key: 'Name_Product', label: 'Nama Produk' },
        // A column that needs custom formatting
        'SKU Produk',
        // A regular column
        'Variasi',
        // A regular column
        'Jumlah',
      ],
      show: true,
    }
  },
  methods: {
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.food = null
      this.form.checked = []
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
  },
}
</script>
