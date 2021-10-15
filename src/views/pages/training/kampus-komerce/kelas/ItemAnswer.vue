<template>
  <!-- Answer -->
  <b-col
    cols="12"
    class="mt-1"
  >
    <b-form-group
      label="Answer"
    >
      <b-row>
        <b-col md="9">
          <validation-provider
            #default="{ errors }"
            name="Answer"
          >
            <b-form-input
              v-model="answer2"
              :state="errors.length > 0 ? false:null"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-col>
        <b-col md="3">
          <b-row>
            <b-col
              md="4"
              class="d-flex justify-content-center align-items-center"
            >
              <b-form-checkbox
                v-model="selected"
                class="ml-2"
              />
            </b-col>
            <b-col md="2">
              <b-button
                variant="flat-success"
                class="btn-icon"
                @click="addRow"
              >
                <feather-icon
                  icon="PlusIcon"
                />
              </b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-form-group>
  </b-col>
</template>

<script>
import { required, min } from '@validations'
import {
  BRow,
  BCol,
  BFormGroup,
  BButton,
  BFormCheckbox,
  BFormInput,
} from 'bootstrap-vue'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BButton,
    BFormCheckbox,
    BFormInput,
  },
  props: {
    row: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      required,
      min,

      rows: [],
    }
  },
  methods: {
    remove() {
      this.$emit('remove')
    },
    simpan() {
      this.$emit('simpan')
    },
    addRow() {
      this.rows.push({ row: '' })
    },
    removeRow(index) {
      this.rows.splice(index, 1)
    },
  },

}
</script>

<style>

</style>
