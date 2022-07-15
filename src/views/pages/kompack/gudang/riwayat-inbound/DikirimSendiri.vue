<template>
  <b-card body>
    <b-form
      v-if="show"
      variant="primary"
      @submit="onSubmit"
      @reset="onReset"
    >
      <h4 class="text-black font-bold">
        Data Inbound
      </h4>
      <b-form-group
        id="input-group-1"
        label="Partner"
        label-for="input-1"
        label-cols-md="3"
      >
        <b-row>
          <b-col
            id="input-1"
            v-model="form.email"
            lg="2"
            type="email"
            required
          >
            <img
              src="@/assets/images/logo.png"
              alt=""
            >
          </b-col>
          <b-col lg="2">
            <h4>Herbal Life</h4>
            <h4>Malang</h4>
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
        label="Jenis Pengiriman"
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
    </b-form>
    <b-form
      class="mt-2"
      border-variant="primary"
    >
      <h4 class="text-black font-bold">
        Informasi Produk
      </h4>
      <b-table
        small
        :fields="fields"
        :items="items"
        responsive="sm"
      >
        <!-- A virtual column -->
        <template
          #cell(Nama_Produk)="data"
        >
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
