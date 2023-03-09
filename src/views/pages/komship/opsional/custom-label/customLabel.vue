<template>
  <b-card>
    <div class="d-flex align-items-center mb-2">
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
      <h4 class="text-black font-bold pt-[7px]">
        Pickup & Label
      </h4>
    </div>
    <b-row class="mx-1">
      <b-col
        md="4"
        class="p-1 mb-2 mr-2"
        style="border:1px solid #E2E2E2;border-radius:16px"
      >
        <b-card class="mb-0">
          <b-card-title class="d-flex justify-between">
            <span class="font-bold text-primary">Biaya Ongkir</span>
            <b-form-checkbox
              v-model="customShippingCost"
              switch
              @change="setCustomShippingCost()"
            />
          </b-card-title>
          <b-card-text class="mb-2">
            Tampilkan <b>biaya ongkir</b> di label pengiriman kamu (khusus Transaksi Non-COD)
          </b-card-text>
          <template #footer>
            <b-row class="justify-content-center" />
          </template>
        </b-card>
      </b-col>

      <b-col
        md="4"
        class="p-1 mb-2"
        style="border:1px solid #E2E2E2;border-radius:16px"
      >
        <b-card class="mb-0">
          <b-card-title class="d-flex justify-between">
            <span class="font-bold text-primary">Identitas Pengirim</span>
            <b-form-checkbox
              v-model="customLabel"
              switch
              @change="setCustomLabel()"
            />
          </b-card-title>
          <b-card-text class="mb-2">
            Tampilkan nama atau identitas pengiriman di label
            <br>
            <br>
          </b-card-text>
          <template #footer>
            <b-row class="justify-content-center">
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                style="background: #F95031!important; border: 0; width: 130px; border-radius: 8px;"
                class="btn-icon"
                @click="setIdentitySender()"
              >
                Sesuaikan
              </b-button>
            </b-row>
          </template>
        </b-card>
      </b-col>
    </b-row>

    <!-- modal profile null -->
    <b-modal
      id="modal-blocker-profile"
      hide-footer
      hide-header
      modal-class="modal-dark"
      centered
      no-close-on-backdrop
      no-close-on-esc
    >
      <b-col
        md="12"
        class="d-flex justify-content-center pt-1"
      >
        <b-img
          width="100"
          src="https://storage.googleapis.com/komerce/core/icon-popup-warning.png"
        />
      </b-col>

      <b-col class="text-center px-5 pt-2 text-black">
        Kamu belum melengkapi profile, yuk lengkapi profilemu terlebih dahulu
      </b-col>
      <b-col class="text-center px-5 py-2">
        <b-btn
          class="mr-2 w-40"
          variant="outline-primary"
          @click="$bvModal.hide('modal-blocker-profile')"
        >
          Batal
        </b-btn>
        <b-btn
          variant="primary"
          @click="$router.push({ name: 'kompship-profile' })"
        >
          Lengkapi Profile
        </b-btn>
      </b-col>
    </b-modal>

    <!-- Modal Custom Label -->
    <b-modal
      id="modal-set-custom-label"
      hide-footer
      modal-class="modal-primary"
      scrollable
      footer-class="footer-class"
    >
      <b-row class="justify-content-center mb-1">
        <h4 class="text-black">
          <strong>
            Daftar Pengirim
          </strong>
        </h4>
      </b-row>
      <b-row class="justify-content-center mb-2">
        <span class="text-black text-center px-3">
          Tambahkan Nama atau Identitas Pengirim untuk dapat ditampilkan di label sesuai kebutuhan kamu.
        </span>
      </b-row>
      <b-overlay
        variant="light"
        :show="loadingWrapperCustom"
        spinner-variant="primary"
        blur="0"
        opacity=".5"
        rounded="sm"
      >

        <b-row
          class="mx-3 p-2 mb-2"
          style="
                border: 1px solid #E2E2E2;
                border-radius: 8px;
            "
        >
          <b-row class="mb-1 align-items-center">
            <b-col cols="auto">
              <span>
                <strong>
                  Identitas 1
                </strong>
              </span>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <b-form-group
                label="Name"
                label-for="name"
                label-cols-md="3"
              >
                <b-form-input
                  v-model="senderIdentity1Name"
                  placeholder="Nama"
                  disabled
                />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group
                label="No HP"
                label-for="no-hp"
                label-cols-md="3"
              >
                <b-form-input
                  v-model="senderIdentity1NoHp"
                  placeholder="No HP"
                  type="number"
                  disabled
                />
              </b-form-group>
            </b-col>
          </b-row>
        </b-row>

        <div
          v-for="(items, index) in itemsCustomLabel"
          :key="index+1"
        >
          <b-row
            class="mx-3 p-2 mb-2"
            style="
                border: 1px solid #E2E2E2;
                border-radius: 8px;
            "
          >
            <validation-observer
              ref="formEditRules"
              #default="{invalid}"
            >
              <b-form>
                <b-row class="mb-1 align-items-center">
                  <b-col cols="auto">
                    <span>
                      <strong>
                        Identitas {{ indexIdentity + index +1 }}
                      </strong>
                    </span>
                  </b-col>
                  <b-col
                    cols="auto"
                  >
                    <span>
                      {{ items.is_default === 1 ? 'Default' : '' }}
                    </span>
                  </b-col>
                  <b-col
                    class="auto d-flex justify-content-end"
                  >
                    <b-button
                      v-if="customLabelEditMode === true && idCustomLabelEdit === items.id"
                      class="btn-icon"
                      size="sm"
                      variant="flat-dark"
                      @click="editSenderNoActive"
                    >
                      <feather-icon
                        icon="EditIcon"
                      />
                    </b-button>
                    <b-button
                      v-else
                      class="btn-icon"
                      size="sm"
                      variant="flat-dark"
                      @click="editSenderActive(items)"
                    >
                      <feather-icon
                        icon="EditIcon"
                      />
                    </b-button>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="12">
                    <b-form-group
                      label="Name"
                      label-for="name"
                      label-cols-md="3"
                    >
                      <validation-provider
                        #default="{errors}"
                        name="Nama"
                        rules="required"
                      >
                        <b-form-input
                          v-if="customLabelEditMode && idCustomLabelEdit === items.id"
                          v-model="editNameSender"
                          placeholder="Nama"
                          :state="errors.length > 0 ? false:null"
                          :formatter="formatNameSender"
                          @keypress="validateInputNameSenderEdit"
                        />
                        <b-form-input
                          v-else
                          v-model="items.name_label"
                          placeholder="Nama"
                          disabled
                        />
                        <b-row class="justify-content-between">
                          <small class="text-primary ml-1">{{ errors[0] }}</small>
                          <small class="mr-1">
                            {{ editNameSender.length }}/30
                          </small>
                        </b-row>
                        <small
                          v-if="messageErrorLengthSenderNameEdit"
                          class="text-primary"
                        >
                          *hindari menggunakan simbol (/) (=) (:) (;)
                        </small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                  <b-col cols="12">
                    <b-form-group
                      label="No HP"
                      label-for="no-hp"
                      label-cols-md="3"
                    >
                      <validation-provider
                        #default="{errors}"
                        name="No HP"
                        rules="required"
                      >
                        <b-form-input
                          v-if="customLabelEditMode && idCustomLabelEdit === items.id"
                          v-model="editNoHPSender"
                          placeholder="No HP"
                          type="number"
                          :state="errors.length > 0 ? false:null"
                          @input="checkEditNumber"
                        />
                        <b-form-input
                          v-else
                          v-model="items.no_hp"
                          placeholder="No HP"
                          type="number"
                          disabled
                        />
                        <small class="text-primary">{{ errors[0] }}</small>
                        <small
                          v-if="errorNumberEdit && idCustomLabelEdit === items.id"
                          class="text-primary"
                        >{{ messageValidateNumber }}
                        </small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                  <b-col
                    v-if="customLabelEditMode && idCustomLabelEdit === items.id"
                    md="8"
                    offset-md="3"
                  >
                    <b-form-group>
                      <b-form-checkbox
                        v-model="editSenderIsDefault"
                      >
                        Jadikan Default
                      </b-form-checkbox>
                    </b-form-group>
                  </b-col>

                  <!-- delete and save -->
                  <transition name="fade">
                    <b-col
                      v-if="customLabelEditMode && idCustomLabelEdit === items.id"
                      class="d-flex justify-content-end"
                    >
                      <b-button
                        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                        variant="outline-primary"
                        class="mr-1 btin-icon"
                        @click="deleteSenderLabel(items)"
                      >
                        <b-spinner
                          v-if="loadingDeleteSender"
                          small
                        />
                        Hapus
                      </b-button>
                      <b-button
                        v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                        variant="primary"
                        class="btn-icon"
                        :disabled="invalid || errorNumberEdit"
                        @click.prevent="updateSenderLabel"
                      >
                        <b-spinner
                          v-if="loadingSubmitSender"
                          small
                        />
                        Simpan
                      </b-button>
                    </b-col>
                  </transition>
                </b-row>
              </b-form>
            </validation-observer>
          </b-row>
        </div>
      </b-overlay>

      <!-- Add sender -->
      <transition name="fade">
        <b-row
          v-if="fieldAddSender"
          class="mx-3 p-2 mb-2"
          style="
              border: 1px solid #E2E2E2;
              border-radius: 8px;
          "
        >
          <validation-observer
            ref="formRulesAdd"
          >
            <b-form>
              <b-row class="mb-1 align-items-center">
                <b-col cols="auto">
                  <span>
                    <strong>
                      Identitas {{ indexIdentity + itemsCustomLabel.length + 1 }}
                    </strong>
                  </span>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12">
                  <b-form-group
                    label="Name"
                    label-for="name"
                    label-cols-md="3"
                  >
                    <validation-provider
                      #default="{errors}"
                      name="Nama"
                      rules="required"
                    >
                      <b-form-input
                        id="name"
                        v-model="nameSender"
                        placeholder="Nama"
                        :state="errors.length > 0 ? false:null"
                        :formatter="formatNameSender"
                        @keypress="validateInputNameSender"
                      />
                      <b-row class="justify-content-between">
                        <small class="text-primary ml-1">{{ errors[0] }}</small>
                        <small class="mr-1">
                          {{ nameSender.length }}/30
                        </small>
                      </b-row>
                      <small
                        v-if="messageErrorLengthSenderName"
                        class="text-primary"
                      >
                        *hindari menggunakan simbol (/) (=) (:) (;)
                      </small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col cols="12">
                  <b-form-group
                    label="No HP"
                    label-for="no-hp"
                    label-cols-md="3"
                  >
                    <validation-provider
                      #default="{errors}"
                      name="No HP"
                      rules="required"
                    >
                      <b-form-input
                        id="no-hp"
                        v-model="noHPSender"
                        placeholder="No HP"
                        type="number"
                        :state="errors.length > 0 ? false:null"
                        @input="checkNumber"
                      />
                      <b-row>
                        <small class="text-primary ml-1 mt-50">{{ errors[0] }}</small>
                      </b-row>
                      <small
                        v-if="errorNumber"
                        class="text-primary"
                      >{{ messageValidateNumber }}
                      </small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col
                  md="8"
                  offset-md="3"
                >
                  <b-form-group>
                    <b-form-checkbox
                      v-model="senderIsDefault"
                    >
                      Jadikan Default
                    </b-form-checkbox>
                  </b-form-group>
                </b-col>

                <!-- delete and save -->
                <b-col class="d-flex justify-content-end">
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    variant="outline-primary"
                    class="mr-1 btin-icon"
                    @click="removeFieldAddSender"
                  >
                    Hapus
                  </b-button>
                  <b-button
                    v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                    variant="primary"
                    class="btn-icon"
                    :disabled="errorNumber"
                    @click.prevent="submitSender"
                  >
                    <b-spinner
                      v-if="loadingSubmitSender"
                      small
                    />
                    Simpan
                  </b-button>
                </b-col>
              </b-row>
            </b-form>
          </validation-observer>
        </b-row>
      </transition>
      <b-row
        v-if="itemsCustomLabel.length < 14"
        class="justify-content-center pb-2"
      >
        <b-button
          variant="primary"
          class="btn-icon"
          @click="addSender"
        >
          <feather-icon
            icon="PlusIcon"
            class="mr-50"
            style="display: inline-block;"
          />
          <span class="align-middle">Tambah Identitas</span>
        </b-button>
      </b-row>
    </b-modal>

    <!-- Modal set custom label -->
    <b-modal
      ref="modal-set-custom-label"
      hide-header
      hide-footer
      no-close-on-backdrop
      no-close-on-esc
      centered
    >
      <b-row class="justify-content-center mb-2 pt-2">
        <img src="https://storage.googleapis.com/komerce/core/icon-popup-warning.png">
      </b-row>
      <b-row class="justify-content-center text-center mb-2">
        <b-col
          cols="11"
          class="px-2"
        >
          <span class="text-black">
            Kamu yakin ingin me non-aktifkan pilihan Custom Label
            Nama Pengirim akan menjadi Nama Bisnis seperti di Profil Anda
          </span>
        </b-col>
      </b-row>
      <b-row class="justify-content-center pb-2">
        <b-button
          variant="outline-primary"
          class="mr-1 btn-icon"
          @click="alertCustomLabel"
        >
          Batal
        </b-button>
        <b-button
          variant="primary"
          class="btn-icon"
          @click="handleNotActiveCustomLabel"
        >
          Non-Aktifkan
        </b-button>
      </b-row>
    </b-modal>
  </b-card>
</template>

<script src="./custom-label.js" />
<style scoped>
.card-footer {
  padding-top: 1rem !important;
  padding-bottom: 0px !important;
}
</style>
