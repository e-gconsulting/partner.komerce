<template>
  <b-card
    no-body
  >
    <b-row class="d-flex align-items-center mb-1 mt-2 px-2">
      <b-col>
        <h4 class="text-black">
          <strong>Akses Akun</strong>
        </h4>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <p class="text-black ml-2">
          Tambahkan orang untuk membantu mengelola usaha dan beri akses sesuai keinginan kamu
        </p>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
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
            hover
            responsive
            class="position-relative"
            empty-text="Tidak ada data untuk ditampilkan."
            :show-empty="!loading"
            :fields="fields"
            :items="listMember"
            :busy.sync="loading"
          >

            <template #cell(full_name)="data">
              <h5 class="text-black">
                <strong>{{ data.item.full_name }}</strong>
              </h5>
              <p>
                {{ data.item.email }}
              </p>
            </template>

            <template #cell(access_menu)="data">
              <b-row>
                <div
                  v-for="(item, index) in data.item.access_menu"
                  :key="index+1"
                  class="mr-50"
                >
                  {{ item.menu_name }},
                </div>
              </b-row>
            </template>

            <template #cell(action)="data">
              <!-- submit and reset -->
              <b-col
                md="12"
                class="d-flex justify-content-end mt-2"
              >
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  v-b-modal.modal-primary
                  type="submit"
                  variant="primary"
                  class="mr-1"
                  @click="showModalAccessEdit(data)"
                >
                  Edit
                </b-button>
                <b-button
                  v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                  type="reset"
                  variant="outline-primary"
                  class="mr-1"
                  @click="confirmDelete(data)"
                >
                  Hapus
                </b-button>
              </b-col>
            </template>

          </b-table>
        </b-overlay>
      </b-col>
    </b-row>

    <b-row class="mt-2 pb-2">
      <b-button
        variant="outline-primary"
        class="ml-3"
        :disabled="listMember.length >= 40"
        @click="showModal"
      >
        Tambah Orang
      </b-button>
    </b-row>

    <b-modal
      ref="modal-access-account"
      scrollable
      :title="editMode ? 'Edit Akses Akun' : 'Tambah Akses Akun'"
      ok-only
      ok-title="Simpan"
      cancel-variant="outline-primary"
    >
      <validation-observer ref="formRules">
        <b-form>
          <b-row>

            <b-col
              cols="10"
            >
              <b-form-group
                label="Nama"
              >
                <validation-provider
                  v-if="!editMode"
                  #default="{errors}"
                  name="Nama"
                  rules="required"
                >
                  <b-form-input
                    v-model="fullname"
                    :state="errors.length > 0 ? false:null"
                  />
                  <small class="text-primary">{{ errors[0] }}</small>
                </validation-provider>
                <b-form-input
                  v-else
                  v-model="fullname"
                  disabled
                />
              </b-form-group>
            </b-col>

            <b-col
              cols="10"
            >
              <b-form-group
                label="Email"
              >
                <validation-provider
                  v-if="!editMode"
                  #default="{errors}"
                  name="Email"
                  rules="required|email"
                >
                  <b-form-input
                    v-model="emailUser"
                    :state="errors.length > 0 ? false:null"
                  />
                  <small class="text-primary">{{ errors[0] }}</small>
                </validation-provider>
                <b-form-input
                  v-else
                  v-model="emailUser"
                  disabled
                />
              </b-form-group>
            </b-col>

            <b-col
              v-if="!editMode"
              cols="10"
            >
              <b-form-group
                label="Password"
              >
                <validation-provider
                  v-if="!editMode"
                  #default="{errors}"
                  name="Password"
                  rules="required"
                >
                  <b-form-input
                    v-model="password"
                    :state="errors.length > 0 ? false:null"
                  />
                  <small class="text-primary">{{ errors[0] }}</small>
                </validation-provider>
                <b-form-input
                  v-else
                  v-model="password"
                  disabled
                />
              </b-form-group>
            </b-col>

            <b-col
              cols="12"
            >
              <hr>
            </b-col>

            <b-col cols="12">
              <b-form-group>
                <b-form-checkbox
                  v-model="allAccess"
                  @change="setAllAccess"
                >
                  <h5>
                    <strong>Akses Website</strong>
                  </h5>
                </b-form-checkbox>

                <b-row
                  v-for="(item, index) in listAccess"
                  :key="index+1"
                  class="ml-2"
                >
                  <p class="mt-50 ml-1">
                    <strong>{{ item.label }}</strong>
                  </p>

                  <b-col
                    v-for="(children, indexChildren) in item.children"
                    :key="indexChildren+1"
                    cols="12"
                  >
                    <b-form-group>
                      <b-form-checkbox
                        v-if="children.isDisable"
                        :disabled="children.isDisable"
                      >
                        {{ children.label }}
                      </b-form-checkbox>
                      <b-form-checkbox
                        v-else
                        v-model="children.value"
                        @change="setAccess(item, children)"
                      >
                        {{ children.label }}
                      </b-form-checkbox>
                    </b-form-group>
                  </b-col>
                </b-row>

              </b-form-group>
            </b-col>

          </b-row>
        </b-form>
      </validation-observer>
      <template #modal-footer>
        <b-row class="align-items-center w-100">
          <b-col
            cols="12"
            class="d-flex justify-content-end"
          >
            <b-button
              v-if="!editMode"
              variant="primary"
              @click="submitAccount"
            >
              <b-spinner
                v-if="loadingSubmit"
                variant="light"
                small
              />
              Simpan
            </b-button>
            <b-button
              v-else
              variant="primary"
              @click="submitAccountUpdate"
            >
              <b-spinner
                v-if="loadingSubmit"
                variant="light"
                small
              />
              Update
            </b-button>
          </b-col>
        </b-row>
      </template>
    </b-modal>

  </b-card>
</template>

<script>
import {
  BCol,
  BRow,
  BCard,
  BTable,
  BButton,
  BModal,
  VBModal,
  BForm,
  BFormGroup,
  BFormInput,
  BFormCheckbox,
  BOverlay,
  BSpinner,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { required, email } from '@validations'

export default {
  components: {
    BCol,
    BRow,
    BCard,
    BTable,
    BButton,
    BModal,
    BForm,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BOverlay,
    BSpinner,
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      loading: false,
      loadingSubmit: false,

      listAccess: [
        {
          label: 'Dashboard',
          resLabel: 'DASHBOARD',
          children: [{
            value: false,
            label: 'Dashboard',
            access: [1, 2, 3, 4],
            isDisable: false,
          }],
        },
        {
          label: 'Produk',
          resLabel: 'PRODUCT',
          children: [
            {
              label: 'Tambah Produk',
              value: false,
              access: [2, 3, 4],
              isDisable: false,
            },
            {
              label: 'Data Produk',
              value: false,
              access: [1],
              isDisable: false,
            },
          ],
        },
        {
          label: 'Gudang',
          resLabel: 'GUDANG',
          children: [{
            value: false,
            label: 'Gudangku',
            access: [1, 2, 3, 4],
            isDisable: false,
          }],
        },
        {
          label: 'Orderan',
          resLabel: 'ORDER',
          children: [
            {
              label: 'Tambah Order',
              value: false,
              access: [2, 3, 4],
              isDisable: false,
            },
            {
              label: 'Data Order',
              value: false,
              access: [1],
              isDisable: false,
            },
          ],
        },
        {
          label: 'Pickup',
          resLabel: 'PICKUP',
          children: [
            {
              label: 'Ajukan Pickup',
              value: false,
              access: [5],
              isDisable: false,
            },
            {
              label: 'Riwayat Pickup',
              value: false,
              access: [6],
              isDisable: false,
            },
          ],
        },
        {
          label: 'Keuangan',
          resLabel: 'FINANCE',
          children: [
            {
              label: 'Penghasilan',
              value: false,
              access: [7],
              isDisable: false,
            },
            {
              label: 'Saldo',
              value: false,
              access: [8],
              isDisable: false,
            },
          ],
        },
        {
          label: 'Pengaturan',
          resLabel: 'SETTING',
          children: [
            {
              label: 'Edit Profile',
              value: false,
              isDisable: true,
              access: [9],
            },
            {
              label: 'Akses Akun',
              value: false,
              isDisable: true,
              access: [10],
            },
            {
              label: 'Rekening Bank',
              value: false,
              access: [12],
              isDisable: false,
            },
            {
              label: 'PIN',
              value: false,
              access: [13],
              isDisable: false,
            },
            {
              label: 'Ekspedisi',
              value: false,
              access: [14],
              isDisable: false,
            },
          ],
        },
        {
          label: 'Kendala',
          resLabel: 'KENDALA',
          children: [{
            value: false,
            label: 'Kendala',
            access: [1, 2, 3, 4],
            isDisable: false,
          }],
        },
      ],

      fields: [
        {
          key: 'full_name',
          label: 'Nama',
          thClass: 'bg-white border-top-0 font-bold',
          class: 'text-black',
        },
        {
          key: 'access_menu',
          label: 'Akses',
          thClass: 'bg-white border-top-0 font-bold',
          class: 'text-black',
        },
        {
          key: 'action',
          label: '',
          thClass: 'bg-white border-top-0 font-bold',
          class: 'text-black',
        },
      ],

      name: '',
      username: '',
      password: '',
      fullname: '',
      emailUser: '',
      partnerId: JSON.parse(localStorage.getItem('userData')),

      editMode: false,
      menuAksesEdit: [],
      idEdit: '',

      // Validation
      required,
      email,

      maxAccessAccount: false,
      listMember: [],
      menuStore: [],
      menuMemberList: [],
      listAccessEdit: [],
      idUpdateAccount: null,

      allAccess: false,
    }
  },
  mounted() {
    this.fetchAccessList()
    this.fetchMemberData()
  },
  methods: {
    fetchAccessList() {
      this.$http.get('/user/partner/get-menu-member')
        .then(response => {
          this.menuMemberList = response.data.data
        })
    },
    fetchMemberData() {
      this.$http.get(`/user/partner/get-komship-member/${this.partnerId.partner_detail.id}`).then(response => {
        const { data } = response.data
        this.listMember = data
      }).catch(() => {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Gagal',
            icon: 'AlertCircleIcon',
            text: 'Gagal me-load data, silahkan coba lagi',
            variant: 'danger',
          },
        }, 2000)
      })
    },
    showModal() {
      this.editMode = false
      this.listAccess.forEach(item => {
        item.children.forEach(childItem => {
          // eslint-disable-next-line no-param-reassign
          childItem.value = false
        })
      })
      this.menuStore = []
      this.$refs['modal-access-account'].show()
    },
    setAccess(data, dataChildren) {
      const findMenu = this.menuMemberList.find(item => item.name === data.resLabel)
      if (dataChildren.value === true) {
        if (findMenu !== undefined) {
          dataChildren.access.forEach(childItem => {
            this.menuStore.push({
              menu_position_id: findMenu.menu_position[0].id,
              menu_access_id: childItem,
            })
          })
        }
      } else {
        // eslint-disable-next-line no-plusplus
        for (let x = 0; x < dataChildren.access.length; x++) {
          const findMenuStoreIndex = this.menuStore.findIndex(indexItem => indexItem.menu_position_id === findMenu.menu_position[0].id && dataChildren.access[x] === indexItem.menu_access_id)
          this.menuStore.splice(findMenuStoreIndex, 1)
        }
      }
    },
    submitAccount() {
      this.loadingSubmit = true
      this.$refs.formRules.validate().then(success => {
        if (success) {
          this.$http.post('/user/partner/create-account', {
            email: this.emailUser,
            password: this.password,
            full_name: this.fullname,
            partner_id: this.partnerId.partner_detail.id,
            menu: this.menuStore,
          })
            .then(response => {
              const { data } = response
              if (data.code === 400) {
                this.loadingSubmit = false
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'Failed',
                    icon: 'AlertCircleIcon',
                    text: 'Username or Email has already taken!',
                    variant: 'danger',
                  },
                }, 2000)
              } else {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'Success',
                    icon: 'CheckIcon',
                    text: 'Success menambahkan akun',
                    variant: 'success',
                  },
                }, 2000)
                this.loadingSubmit = false
                this.$refs['modal-access-account'].hide()
                this.fetchMemberData()
              }
              this.loadingSubmit = false
            }).catch(err => {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Failure',
                  icon: 'AlertCircleIcon',
                  text: err,
                  variant: 'danger',
                },
              }, 2000)
              this.loadingSubmit = false
            })
        } else {
          this.loadingSubmit = false
        }
      })
    },
    showModalAccessEdit(data) {
      this.listAccess.forEach(item => {
        item.children.forEach(childItem => {
          // eslint-disable-next-line no-param-reassign
          childItem.value = false
        })
      })
      this.menuStore = []
      this.fullname = data.item.full_name
      this.password = data.item.password
      this.emailUser = data.item.email
      this.editMode = true
      this.$refs['modal-access-account'].show()
      this.idUpdateAccount = data.item.user_id
      const params = {
        user_id: data.item.user_id,
      }
      this.$http.get('user/partner/get-menu-komship-member', {
        params,
      }).then(response => {
        const filterAccess = response.data.data.privilege.filter(item => item.access !== 'No Data Access.')
        const findListAccess = this.listAccess.map(item => ({
          filter: filterAccess.find(filterItem => item.resLabel === filterItem.menu_name),
        }))
        findListAccess.forEach(item => {
          if (item.filter !== undefined) this.listAccessEdit.push(item.filter)
        })
        this.listAccessEdit.forEach(item => {
          item.access.forEach(filAccessItem => {
            this.listAccess.forEach(listItem => {
              listItem.children.forEach(childItem => {
                // eslint-disable-next-line no-param-reassign
                if (listItem.resLabel === item.menu_name && childItem.access.includes(filAccessItem.access_id)) childItem.value = true
              })
            })
            const checkMenuStore = this.menuStore.find(itemStore => itemStore.menu_position_id === filAccessItem.menu_position_id && itemStore.menu_access_id === filAccessItem.access_id)
            if (checkMenuStore === undefined) {
              this.menuStore.push({
                menu_position_id: filAccessItem.menu_position_id,
                menu_access_id: filAccessItem.access_id,
              })
            }
          })
          const itemListAccess = this.listAccess.find(listItem => item.menu_name === listItem.resLabel)
        })
        this.listAccessEdit.forEach(item => {
          const find = this.listAccess.find(accessItem => accessItem.resLabel === item.menu_name)
        })
      })
    },
    submitAccountUpdate() {
      this.loadingSubmit = true
      this.$refs.formRules.validate().then(success => {
        if (success) {
          this.$http.put('/user/partner/update-account', {
            user_id: this.idUpdateAccount,
            menu: this.menuStore,
          }).then(response => {
            const { data } = response
            if (data.code === 400) {
              this.loadingSubmit = false
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Failed',
                  icon: 'AlertCircleIcon',
                  text: 'Username or Email has already taken!',
                  variant: 'danger',
                },
              }, 2000)
            } else {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Success',
                  icon: 'CheckIcon',
                  text: 'Akun berhasil di update',
                  variant: 'success',
                },
              })
              this.loadingSubmit = false
              this.$refs['modal-access-account'].hide()
              this.fetchMemberData()
            }
          }).catch(err => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Failure',
                icon: 'AlertCircleIcon',
                text: err,
                variant: 'danger',
              },
            }, 2000)
            this.loadingSubmit = false
          })
        } else {
          this.loadingSubmit = false
        }
      })
    },
    confirmDelete(data) {
      this.$swal({
        text: 'Kamu yakin ingin hapus akun ?',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Batal',
        confirmButtonText: 'Hapus',
        customClass: {
          confirmButton: 'btn btn-outline-primary',
          cancelButton: 'btn btn-primary ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.delete(data)
        }
      })
    },
    delete(data) {
      this.$http.delete(`/user/partner/delete-komship-member/${data.item.user_id}`)
        .then(() => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Success',
              icon: 'CheckIcon',
              text: 'Success delete access',
              variant: 'success',
            },
          }, 2000)
          this.fetchMemberData()
        }).catch(() => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Gagal',
              icon: 'AlertCircleIcon',
              text: 'Gagal hapus akses, silahkan coba lagi!',
              variant: 'danger',
            },
          }, 2000)
        })
    },
    setAllAccess() {
      this.menuStore = []
      if (this.allAccess === true) {
        this.listAccess.forEach(item => {
          item.children.forEach(childItem => {
            // eslint-disable-next-line no-param-reassign
            childItem.value = true
            this.setAccess(item, childItem)
          })
        })
      } else {
        this.listAccess.forEach(item => {
          item.children.forEach(childItem => {
            // eslint-disable-next-line no-param-reassign
            childItem.value = false
          })
        })
        this.menuStore = []
      }
    },
  },

}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
* {
  font-family: Poppins;
}
</style>
