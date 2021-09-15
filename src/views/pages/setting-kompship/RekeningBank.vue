<template>
  <b-card>

    <b-modal
      ref="modal-primary"
      ok-only
      ok-title="Accept"
      modal-class="modal-primary"
      centered
      title="Primary Modal"
    >
      <b-card-text>
        Biscuit chocolate cake gummies. Lollipop I love macaroon bear claw caramels. I love marshmallow tiramisu I love
        fruitcake I love gummi bears. Carrot cake topping liquorice. Pudding caramels liquorice sweet I love. Donut powder
        cupcake ice cream tootsie roll jelly.
      </b-card-text>
    </b-modal>

    <!-- {{ tes() }} -->
    <b-col cols="12">
      <h4>
        <strong>Pengaturan Rekening Bank</strong>
      </h4>
    </b-col>

    <b-col
      md="10"
      class="border ml-1 mt-2"
    >

      <b-row class="d-flex align-items-center mb-1">
        <b-col>
          <h5>
            <strong>Rekening 1</strong>
          </h5>
        </b-col>
        <b-col class="d-flex justify-content-end">
          <b-button
            class="btn-icon"
            variant="flat-dark"
          >
            <feather-icon
              icon="EditIcon"
            />
          </b-button>
        </b-col>
      </b-row>

      <b-form @submit.prevent>
        <b-row>

          <b-col cols="10">
            <b-form-group
              label="Nama Bank"
              label-cols-md="3"
            >
              <v-select />
            </b-form-group>
          </b-col>

          <b-col cols="10">
            <b-form-group
              label="No Rekening"
              label-cols-md="3"
            >
              <b-form-input />
            </b-form-group>
          </b-col>

          <b-col cols="10">
            <b-form-group
              label="Nama"
              label-cols-md="3"
            >
              <b-form-input />
            </b-form-group>
          </b-col>

        </b-row>
      </b-form>
    </b-col>

    <b-col
      md="10"
      class="ml-1 mt-1"
    >
      <div class="demo-inline-spacing">
        <b-button
          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
          block
          variant="outline-primary"
        >
          <feather-icon
            icon="PlusIcon"
            class="mr-50"
          />
          <span class="align-middle">Tambahkan Rekening</span>
        </b-button>
      </div>
    </b-col>

  </b-card>
</template>

<script>
import {
  BRow,
  BCol,
  BCard,
  BForm,
  BFormGroup,
  BFormInput,
  BButton,
  BModal,
  VBModal,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BRow,
    BCard,
    BCol,
    vSelect,
    BForm,
    BFormGroup,
    BFormInput,
    BButton,
    BModal,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  mounted() {
    this.showModal()
  },
  methods: {
    showModal() {
      this.$refs['modal-primary'].show()
    },
    tes() {
      this.$swal({
        title: 'Verifikasi PIN',
        text: 'Mohon verifikasi identitas kamu dengan memasukan PIN',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Kembali',
        confirmButtonText: 'Konfirmasi',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-primary ml-1',
        },
        buttonsStyling: false,
      })
    },
  },

}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
</style>
