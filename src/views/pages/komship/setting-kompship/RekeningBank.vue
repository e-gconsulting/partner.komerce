<template>
  <b-overlay
    variant="light"
    :show="loading"
    spinner-variant="primary"
    blur="0"
    opacity=".5"
    rounded="sm"
  >
    <b-card>
      <!-- Verivication PIN -->
      <b-modal
        ref="modal-pin"
        no-close-on-backdrop
        no-close-on-esc
        hide-header-close
        hide-footer
        hide-header
        modal-class="modal-primary"
        centered
        title="Primary Modal"
      >

        <b-col class="d-flex justify-content-center mt-50">
          <h4>
            <strong>Verifikasi PIN</strong>
          </h4>
        </b-col>

        <b-col class="d-flex justify-content-center mt-3">
          <small>
            <strong>Mohon verifikasi identitas kamu dengan masukan PIN</strong>
          </small>
        </b-col>

        <b-col class="d-flex justify-content-center mt-2 mb-1">
          <CodeInput
            :loading="false"
            class="input"
            :type="visibilityPin"
            @change="onChange"
            @complete="onComplete"
          />
        </b-col>

        <b-col class="d-flex justify-content-center">
          <b-button
            variant="flat-primary"
            class="btn-icon"
            @click="toggleVisibilityPin"
          >
            Tampilkan
          </b-button>
        </b-col>

        <b-col class="text-center mt-1">
          <small class="text-danger">{{ errorPin }}</small>
        </b-col>

        <b-col class="d-flex justify-content-center mt-1">
          <b-button
            variant="primary"
            @click="confirmPin"
          >
            <b-spinner
              v-if="loadingSubmit"
              small
            />
            Konfirmasi
          </b-button>
        </b-col>
        <b-col class="d-flex justify-content-center mt-1">
          <b-button
            variant="outline-primary"
            @click="backPage"
          >
            Kembali
          </b-button>
        </b-col>
        <b-col class="d-flex justify-content-center align-items-center mt-1">
          <small>Belum punya PIN ?</small><b-button
            class="btn-icon"
            size="sm"
            variant="flat-primary"
            tag="router-link"
            :to="{ name: $route.meta.routePin }"
          >
            Buat PIN!
          </b-button>
        </b-col>

      </b-modal>

      <!-- Verification No. HP -->
      <b-modal
        id="modal-hp"
        no-close-on-backdrop
        hide-header-close
        ok-only
        hide-header
        modal-class="modal-primary"
        centered
      >

        <b-col class="d-flex justify-content-center mt-50">
          <h4>
            <strong>Verifikasi No HP</strong>
          </h4>
        </b-col>

        <b-col class="d-flex justify-content-center mt-3">
          <small class="text-center">
            <strong>Mohon verifikasi identitas kamu dengan memasukan Kode Verifikasi (OTP) yang dikirimkan via SMS ke No 085788888834</strong>
          </small>
        </b-col>

        <b-col class="d-flex justify-content-center mt-2 mb-1">
          <CodeInput
            :loading="false"
            class="input"
            :type="visibilityPin"
            @change="onChange"
            @complete="onComplete"
          />
        </b-col>

        <b-col class="d-flex justify-content-center">
          <b-button
            variant="flat-primary"
            class="btn-icon"
            @click="toggleVisibilityPin"
          >
            Tampilkan
          </b-button>
        </b-col>

        <b-col class="d-flex justify-content-center mt-1">
          <b-button
            variant="primary"
          >
            Konfirmasi
          </b-button>
        </b-col>
        <b-col class="d-flex justify-content-center mt-1">
          <b-button
            variant="outline-primary"
          >
            Kembali
          </b-button>
        </b-col>

      </b-modal>

      <b-col cols="12">
        <h4>
          <strong>Pengaturan Rekening Bank</strong>
        </h4>
      </b-col>

      <b-col
        v-for="(data, index) in formRekening"
        :key="index + 1"
        md="10"
        class="border ml-1 mt-2"
      >

        <b-row class="d-flex align-items-center mb-1">
          <b-col>
            <h5>
              <strong>Rekening {{ index+1 }}</strong>
            </h5>
          </b-col>
        </b-row>

        <validation-observer ref="formRules">
          <b-form>
            <b-row>
              <b-col cols="10">
                <b-form-group
                  label="Nama Bank"
                  label-cols-md="3"
                >
                  <div v-if="editMode === true && editIdRek === data.bank_account_id">
                    <validation-provider
                      #default="{errors}"
                      name="Nama Bank"
                      rules="required"
                    >
                      <v-select
                        v-model="bankName"
                        label="name"
                        :reduce="option => option.code"
                        :options="banks"
                        :filterable="true"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Ketik untuk mencari..."
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </div>
                  <div v-else>
                    <b-form-input
                      v-model="data.bank_name"
                      disabled
                    />
                  </div>
                </b-form-group>
              </b-col>

              <b-col cols="10">
                <b-form-group
                  label="No Rekening"
                  label-cols-md="3"
                >
                  <div v-if="editMode === true && editIdRek === data.bank_account_id">
                    <validation-provider
                      #default="{errors}"
                      name="No Rekening"
                      rules="required"
                    >
                      <b-form-input
                        v-model="accountNo"
                        :state="errors.length > 0 ? false:null"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </div>
                  <div v-else>
                    <b-form-input
                      v-model="data.account_no"
                      disabled
                    />
                  </div>
                </b-form-group>
              </b-col>

              <b-col cols="10">
                <b-form-group
                  label="Nama"
                  label-cols-md="3"
                >
                  <div v-if="editMode === true && editIdRek === data.bank_account_id">
                    <validation-provider
                      #default="{errors}"
                      name="Nama"
                      rules="required"
                    >
                      <b-form-input
                        v-model="accountName"
                        :state="errors.length > 0 ? false:null"
                        disabled
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </div>
                  <div v-else>
                    <b-form-input
                      v-model="data.account_name"
                      disabled
                    />
                  </div>
                </b-form-group>
              </b-col>

              <!-- Edit Rekening -->
              <transition name="fade">
                <b-col
                  v-if="editMode === true && editIdRek === data.bank_account_id"
                  md="12"
                  class="d-flex justify-content-end mt-1 pb-1"
                >
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    type="submit"
                    variant="outline-primary"
                    class="mr-1"
                    @click.prevent="confirmDelete(data)"
                  >
                    Hapus
                  </b-button>
                  <b-button
                    v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                    type="reset"
                    variant="primary"
                    class="mr-1"
                    @click.prevent="submitEditRekening"
                  >
                    <b-spinner
                      v-if="loadingSubmit"
                      variant="light"
                      small
                    />
                    Simpan
                  </b-button>
                </b-col>
              </transition>

            </b-row>
          </b-form>
        </validation-observer>
      </b-col>

      <!-- Add Rekening -->
      <b-col
        v-if="fieldActionAddRekening === true"
        md="10"
        class="border ml-1 mt-2"
      >

        <b-row class="d-flex align-items-center mb-1">
          <b-col>
            <h5>
              <strong>Tambah Rekening</strong>
            </h5>
          </b-col>
        </b-row>

        <validation-observer ref="formRulesAdd">
          <b-form>
            <b-row>

              <b-col cols="10">
                <b-form-group
                  label="Nama Bank"
                  label-cols-md="3"
                >
                  <validation-provider
                    #default="{errors}"
                    name="Nama Bank"
                    rules="required"
                  >
                    <v-select
                      v-model="fieldAddBankName"
                      label="name"
                      :reduce="option => option.code"
                      :options="banks"
                      :filterable="true"
                      :state="errors.length > 0 ? false : null"
                      placeholder="Ketik untuk mencari..."
                      @input="changeFieldAddBank"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                    <small
                      v-if="validateFieldAddBankName === true"
                      class="text-danger"
                    >*Pilih Bank dulu ya</small>
                  </validation-provider>
                </b-form-group>
              </b-col>

              <b-col cols="10">
                <b-form-group
                  label="No Rekening"
                  label-cols-md="3"
                >
                  <validation-provider
                    #default="{errors}"
                    name="No Rekening"
                    rules="required"
                  >
                    <div class="d-flex">
                      <b-form-input
                        v-model="fieldAddAccountNo"
                        placeholder="Masukkan Nomor Rekening"
                        :state="errors.length > 5 ? false:null"
                        maxlength="20"
                        @keypress="isNumber($event)"
                        @paste.prevent="AccountBankNo"
                        @input="changeFieldAddBank"
                      />
                      <b-button
                        :variant="fieldAddAccountName !== '' || ValidateAccountName ? 'secondary' : 'primary'"
                        :disabled="fieldAddAccountName !== '' || ValidateAccountName"
                        class="ml-1 cekRekening"
                        @click="getAccount"
                      >
                        <b-spinner
                          v-if="ValidateAccountName"
                          variant="light"
                          style="width: 23px; height: 23px"
                        />
                        <span v-else>Cek Rekening</span>
                      </b-button>
                    </div>
                    <!-- <small class="text-danger">{{ errors[0] }} </small> -->
                    <small
                      v-if="validateFieldAddAccountNo"
                      class="text-danger"
                    >No Rekening harus diisi </small>
                    <small class="text-danger">{{ validateLength }} </small>
                    <small
                      v-if="messageSameNoBank !== ''"
                      class="text-danger"
                    >{{ messageSameNoBank }}, </small>
                  </validation-provider>
                </b-form-group>
              </b-col>

              <b-col
                v-if="isValidateAccountName"
                cols="10"
              >
                <b-form-group
                  label-cols-md="3"
                >
                  <div class="d-flex">
                    <div
                      v-if="getValidateAccountName"
                      class="validate-green py-[5px] px-[15px] d-flex"
                    >
                      <b-img
                        rounded="circle"
                        class="bg-[#34A770] mr-1"
                        src="https://storage.googleapis.com/komerce/assets/komerce-icon/Putih/Checklist.svg"
                      />
                      <span class="align-self-center text-black">Nomor Rekening berhasil ditemukan</span>
                    </div>
                    <div
                      v-else
                      class="validate-red py-[5px] px-[15px] d-flex"
                    >
                      <b-img
                        rounded="circle"
                        class="bg-[#FFF2E2] mr-1"
                        src="https://storage.googleapis.com/komerce/assets/icons/danger-yellow.svg"
                      />
                      <span class="align-self-center text-black">Nomor Rekening salah/tidak ditemukan</span>
                    </div>
                  </div>
                </b-form-group>
              </b-col>

              <b-col cols="10">
                <b-form-group
                  label="Nama"
                  label-cols-md="3"
                >
                  <validation-provider
                    #default="{errors}"
                    name="Nama"
                    rules="required"
                  >
                    <div class="d-flex">
                      <b-form-input
                        v-model="fieldAddAccountName"
                        placeholder="Nama akan otomatis muncul"
                        class="mr-3 pr-2"
                        :state="errors.length > 0 ? false:null"
                        disabled
                      />
                      <div class="w-44" />
                    </div>
                    <!-- <small class="text-danger">{{ errors[0] }}</small> -->
                    <small
                      v-if="messageSameNameBank !== ''"
                      class="text-danger"
                    >{{ messageSameNameBank }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>

              <b-col
                md="12"
                class="d-flex justify-content-end mt-1 pb-1"
              >
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  type="submit"
                  variant="outline-primary"
                  class="mr-1"
                  @click="cancelAddRekening"
                >
                  Batal
                </b-button>
                <b-button
                  v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                  :variant="checkValidBank ? 'secondary' : 'primary'"
                  class="mr-1"
                  :disabled="checkValidBank"
                  @click="checkBank"
                >
                  <b-spinner
                    v-if="loadingSubmit"
                    variant="light"
                    small
                  />
                  Simpan
                </b-button>
              </b-col>

            </b-row>
          </b-form>
        </validation-observer>
      </b-col>

      <b-col
        v-if="formRekening.length < 6"
        md="10"
        class="ml-1 mt-1"
      >
        <div class="demo-inline-spacing">
          <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            block
            variant="outline-primary"
            @click="addRekening"
          >
            <feather-icon
              icon="PlusIcon"
              class="mr-50"
              style="display: inline-block"
            />
            <span class="align-middle">Tambahkan Rekening</span>
          </b-button>
        </div>
      </b-col>

    </b-card>
    <b-modal
      ref="modal-verification-submit"
      no-close-on-backdrop
      hide-header-close
      hide-footer
      hide-header
      modal-class="modal-primary"
      centered
    >
      <b-row class="justify-content-end">
        <b-button
          class="btn-icon"
          variant="flat-dark"
          size="sm"
          @click="closeVerification"
        >
          <b-img src="@/assets/images/icons/close-circle.svg" />
        </b-button>
      </b-row>

      <b-row class="justify-content-center my-2">
        <h3 class="text-black">
          <strong>Tambah Rekening</strong>
        </h3>
      </b-row>

      <b-row class="justify-content-center">
        <h4 class="text-black">
          <strong>Pilih Metode Verifikasi</strong>
        </h4>
      </b-row>

      <b-row class="d-flex justify-content-center mt-1 mb-2">
        <span class="text-center">
          Pilih salah satu metode dibawah ini untuk mendapatkan kode verifikasi
        </span>
      </b-row>

      <b-row
        class="mb-1"
        @click="sendOtpSMS"
      >
        <b-col
          cols="12"
        >
          <b-card
            :class="buttonSMSOtpIsClick ? 'cursor-not-allowed mb-0 wrapper__send__otp' : 'cursor-pointer mb-0 wrapper__send__otp'"
            :style="loadingOtpSms ? 'background: #FFECE9;' : ''"
          >
            <b-row class="align-items-center">
              <b-col
                class="d-flex align-items-center"
                cols="10"
              >
                <div class="mx-1">
                  <b-img src="@/assets/images/icons/sms-icon.svg" />
                </div>
                <div>
                  <span class="text-black">
                    <strong>
                      SMS ke
                    </strong>
                  </span>
                  <p class="mb-0">
                    {{ phoneUser }}
                  </p>
                </div>
              </b-col>
              <b-col cols="2">
                <b-spinner
                  v-if="loadingOtpSms"
                  variant="primary"
                />
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>

      <b-row
        @click="sendOtpWA"
      >
        <b-col
          cols="12"
        >
          <b-card
            :class="messageErrorPhoneUser || buttonWAOtpIsClick ? 'cursor-not-allowed wrapper__otp__wa' : 'cursor-pointer wrapper__send__otp'"
            :style="loadingOtpWa ? 'background: #FFECE9;' : ''"
          >
            <b-row class="align-items-center">
              <b-col
                class="d-flex align-items-center"
                cols="10"
              >
                <div class="mx-1">
                  <b-img src="@/assets/images/icons/wa-icon.svg" />
                </div>
                <div>
                  <span class="text-black">
                    <strong>
                      WhatsApp ke
                    </strong>
                  </span>
                  <p class="mb-0">
                    {{ phoneUser }}
                  </p>
                  <small :class="messageErrorPhoneUser ? 'text-primary' : 'text-success'">
                    <strong>
                      {{ messageErrorPhoneUser ? 'Nomor ini Tidak terhubung ke Whatsapp' : 'Nomor ini terhubung ke Whatsapp' }}
                    </strong>
                  </small>
                </div>
              </b-col>
              <b-col cols="2">
                <b-spinner
                  v-if="loadingOtpWa"
                  variant="primary"
                />
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>

    </b-modal>

    <!-- Modal Validate Profile -->
    <!-- Modal Success Pickup -->
    <b-modal
      ref="modal-validate-profile"
      hide-footer
      hide-header
      centered
    >
      <div class="modal-add-pickup-popup-success">
        <b-row class="justify-content-center pt-2 mb-2">
          <img src="@/assets/images/icons/warning.svg">
        </b-row>
        <b-row class="text-center mb-2 px-5">
          <h4 class="text-black">
            <strong>
              Untuk melanjutkan, silahkan lengkapi Profil
              Anda terlebih dahulu
            </strong>
          </h4>
        </b-row>
        <b-row class="justify-content-center pb-2">
          <b-button
            variant="primary"
            class="btn-icon"
            tag="router-link"
            :to="{ name: $route.meta.routeToProfile }"
          >
            Lengkapi Profile
          </b-button>
        </b-row>
      </div>
    </b-modal>

    <!-- Modal Verification OTP -->
    <b-modal
      ref="modal-verification-OTP"
      no-close-on-backdrop
      hide-header-close
      hide-footer
      hide-header
      modal-class="modal-primary"
      centered
    >
      <b-row class="justify-content-end">
        <b-button
          class="btn-icon"
          variant="flat-dark"
          size="sm"
          @click="closeCheckVerification"
        >
          <b-img src="@/assets/images/icons/close-circle.svg" />
        </b-button>
      </b-row>

      <b-row class="justify-content-center mt-2 mb-1">
        <h3 class="text-black">
          <strong>Verifikasi Kode OTP</strong>
        </h3>
      </b-row>

      <b-row class="justify-content-center mb-2">
        <b-img
          v-if="otpMode === 'sms'"
          src="@/assets/images/icons/sms-icon.svg"
        />
        <b-img
          v-if="otpMode === 'wa'"
          src="@/assets/images/icons/wa-icon.svg"
        />
      </b-row>

      <b-row class="justify-content-center">
        <h4 class="text-black">
          <strong>Masukan Kode Verifikasi</strong>
        </h4>
      </b-row>

      <b-row
        v-if="errorCheckOtp !== true"
        class="justify-content-center mt-1"
      >
        <span class="text-center">
          Kode verifikasi telah dikirim melalui {{ otpMode === 'sms' ? 'SMS' : 'WhatsApp' }} ke
        </span>
      </b-row>

      <b-row
        v-if="errorCheckOtp !== true"
        class="justify-content-center mb-2"
      >
        <span class="text-center">
          <strong>{{ phoneUser }}</strong>
        </span>
      </b-row>

      <b-row
        v-if="errorCheckOtp"
        class="justify-content-center mb-2 mx-1 mt-1"
      >
        <small class="text-center">
          Kode OTP yang kamu masukkan <strong class="text-primary">salah</strong> harap cek kode OTP di {{ otpMode === 'sms' ? 'SMS' : 'WhatsApp' }} kamu kemudian masukkan kembali
        </small>
      </b-row>

      <b-row class="justify-content-center mb-1">
        <PincodeInput
          v-model="otpConfirmation"
          placeholder="0"
          :length="6"
          :autofocus="true"
          @input="checkOtp"
        />
      </b-row>

      <b-row
        v-if="countOtp !== 0"
        class="justify-content-center align-items-center mb-50"
      >
        <small class="text-center">
          Mohon tunggu dalam <strong>{{ countOtp }} detik</strong> untuk kirim ulang
        </small>
      </b-row>

      <b-row
        v-if="countOtp === 0"
        class="justify-content-center align-items-center mb-50"
      >
        <small class="text-center">
          Tidak menerima kode?
        </small>
        <b-button
          class="text-primary btn-icon"
          variant="flat-primary"
          size="sm"
          :disabled="otpMode === 'sms' ? buttonSMSOtpIsClick : buttonWAOtpIsClick"
          @click="resendOtp(otpMode)"
        ><strong>Kirim ulang</strong></b-button>
      </b-row>

      <b-row
        v-if="otpSubmit > 1"
        class="justify-content-center align-items-center mb-2"
      >
        <b-button
          class="text-primary btn-icon"
          variant="flat-primary"
          size="sm"
          @click="changeMethodOtp"
        ><strong>Coba dengan metode lain</strong></b-button>
      </b-row>

    </b-modal>

    <!-- Popup Success Add rekening -->
    <b-modal
      ref="success-add-rekening"
      hide-footer
      hide-header
      centered
    >
      <b-row class="my-2 justify-content-center">
        <div>
          <b-img src="@/assets/images/icons/success.svg" />
        </div>
      </b-row>
      <b-row class="justify-content-center text-center">
        <h4 class="text-black">
          <strong>Rekening Berhasil Ditambahkan</strong>
        </h4>
      </b-row>
      <b-row class="justify-content-center text-center mb-2 mx-2">
        <span class="text-black">
          Selamat! Nomor rekening berhasil ditambahkan di akun kamu
        </span>
      </b-row>
      <b-row class="justify-content-center mb-2">
        <b-button
          class="text-white"
          variant="primary"
          @click="closePopupSuccess"
        >
          Oke
        </b-button>
      </b-row>
    </b-modal>

    <!-- Check Rekening -->
    <b-modal
      ref="popup-check-rekening"
      hide-footer
      hide-header
      no-close-on-backdrop
      no-close-on-esc
      centered
    >
      <b-row class="justify-content-end">
        <b-button
          class="btn-icon"
          variant="flat-dark"
          size="sm"
          @click="closeCheckRek"
        >
          <b-img src="@/assets/images/icons/close-circle.svg" />
        </b-button>
      </b-row>

      <b-row class="justify-content-center text-center mb-1">
        <h3 class="text-black">
          <strong>
            Rekeningmu udah terdaftar di akun lain
          </strong>
        </h3>
      </b-row>

      <b-row class="text-[#626262] justify-content-center mb-1">
        <b-col cols="11">
          <span>
            Akun Komerce-mu yang lain masih ada tanggungan
            <br>
            saldo minus yakni;
          </span>
        </b-col>
      </b-row>

      <b-row class="justify-content-center mb-1">
        <b-col cols="11">
          <table class="w-full">
            <tr>
              <th class="px-1 py-50 border__table__check__rek">
                <span class="text-black">Email</span>
              </th>
              <th class="px-1 py-50 border__table__check__rek">
                <span class="text-black">Kewajiban Top Up</span>
              </th>
            </tr>
            <tr
              v-for="(item, index) in banksDataMinus"
              :key="index+1"
            >
              <td class="px-1 py-50 border__table__check__rek">
                <span class="text-primary"><strong>{{ item.email }}</strong></span>
              </td>
              <td class="px-1 py-50 border__table__check__rek">
                <span class="text-primary"><strong>-Rp{{ formatNumber(item.saldo) }},-</strong></span>
              </td>
            </tr>
          </table>
        </b-col>
      </b-row>

      <b-row class="text-[#626262] justify-content-center mb-1">
        <b-col cols="11">
          <span>
            Lunasi dulu buat lanjut tambah rekening.
          </span>
        </b-col>
      </b-row>

      <b-row class="text-[#626262] justify-content-center mb-1">
        <b-col cols="11">
          <span>
            <strong>
              Sertakan juga alasanmu pake akun baru ini :
            </strong>
          </span>
        </b-col>
      </b-row>

      <b-row class="text-[#626262] justify-content-center mb-1">
        <b-col cols="11">
          <b-form-textarea
            v-model="reasonCreateRekening"
            rows="3"
          />
        </b-col>
      </b-row>

      <b-row class="justify-content-center mb-1">
        <b-button
          :class="reasonCreateRekening === '' ? 'cursor-not-allowed' : ''"
          :style="reasonCreateRekening === '' ? 'background: #C2C2C2; min-width: 120px; border-radius: 10px;' : 'background: #F95031!important; min-width: 120px; border-radius: 10px; border: 0!important;'"
          :disabled="reasonCreateRekening === ''"
          @click="submitAccount"
        >
          Submit
        </b-button>
      </b-row>

    </b-modal>
  </b-overlay>
</template>

<script>
import CodeInput from 'vue-verification-code-input'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { required } from '@validations'
import vSelect from 'vue-select'
import PincodeInput from 'vue-pincode-input'
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
  BOverlay,
  BSpinner,
} from 'bootstrap-vue'
import { mapState } from 'vuex'
// import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'
import { heightTransition } from '@core/mixins/ui/transition'
import useJwt from '@/auth/jwt/useJwt'
import moment from 'moment'
import { isNumber } from '@/libs/helpers'

export default {
  components: {
    BRow,
    BCard,
    BCol,
    // vSelect,
    BForm,
    BFormGroup,
    BFormInput,
    BButton,
    BModal,
    CodeInput,
    ValidationObserver,
    ValidationProvider,
    BOverlay,
    BSpinner,
    vSelect,
    PincodeInput,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  mixins: [heightTransition],
  data() {
    return {
      loadingSubmit: false,
      loading: false,
      dataPin: null,
      errorPin: '',
      addForm: true,
      banks: [],
      editIdRek: null,
      // Validation
      required,
      bankName: '',
      accountNo: '',
      accountName: '',
      editMode: false,
      formRekening: [{ row: '' }],
      fieldActionAddRekening: false,
      submitAction: false,
      // Create Rekening Bank
      fieldAddBankName: '',
      fieldAddAccountNo: '',
      fieldAddAccountName: '',
      phoneUser: '',
      phoneNumber: '',
      countOtp: 60,
      errorConfirmOtp: false,
      countSubmit: 0,
      validateResendOtp: '',
      countCanResendOtp: 0,
      visibilityPin: 'password',
      validateProfile: [],
      messageErrorPhoneUser: false,
      loadingOtpSms: false,
      loadingOtpWa: false,
      otpMode: '',
      otpConfirmation: '',
      loadingResendOtp: false,
      errorCheckOtp: false,
      buttonWAOtpIsClick: false,
      buttonSMSOtpIsClick: false,
      otpSubmit: 0,
      partnerId: null,
      checkValidBank: true,
      messageSameNameBank: '',
      messageSameNoBank: '',
      banksDataMinus: [],
      reasonCreateRekening: '',
      buttonSubmitIsDisabled: false,
      ValidateAccountName: false,
      accountNameDB: false,
      validateLength: '',
      isNumber,
      getValidateAccountName: false,
      isValidateAccountName: false,
      validateFieldAddBankName: false,
      validateFieldAddAccountNo: false,
      lenghtNoAccount: false,
    }
  },
  computed: {
    ...mapState('dashboard', ['profile']),
  },
  mounted() {
    this.showModal()
    this.getBank()
    this.loadBanks()
    this.getProfile()
    this.changeAttr()
  },
  methods: {
    getBank() {
      this.loading = true
      return this.$http_komship.get('v1/bank-account', {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(response => {
        const { data } = response.data
        this.formRekening = data
        this.loading = false
      }).catch(() => {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Gagal',
            icon: 'AlertCircleIcon',
            text: 'Gagal load data, silahkan refresh halaman!',
            variant: 'danger',
          },
        }, 2000)
        this.loading = false
      })
    },
    submitVerification() {
      this.$refs.formRulesAdd.validate().then(success => {
        if (success) {
          this.$refs['modal-verification-submit'].show()
        }
      })
    },
    sendOtpAgain() {
      if (this.countOtp < 2) {
        this.countOtp = 60
        const formData = new FormData()
        formData.append('_method', 'post')
        formData.append('phone_number', this.phoneNumber)
        formData.append('session', 'rekening')
        formData.append('activity', 'BANK ACCOUNT')
        this.$http_komship.post('/v2/partner/sms/otp', formData, {
          headers: { Authorization: `Bearer ${useJwt.getToken()}` },
        }).then(() => {}).catch(() => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Gagal',
              icon: 'AlertCircleIcon',
              text: 'Gagal kirim OTP, silahkan coba lagi',
              variant: 'danger',
            },
          }, 2000)
        })
        this.countDownTimerOtp()
      }
      if (this.countSubmit > 1) {
        this.validateResendOtp = 'Kirim ulang sudah melewati batas'
        this.countCanResendOtp = 60
        this.countDownTimerResend()
      }
    },
    submitRekening() {
      if (this.errorConfirmOtp === true) {
        this.errorConfirmOtp = false
      }
      const formData = new FormData()
      formData.append('otp', this.otpConfirmation)
      formData.append('session', 'rekening')
      this.$http_komship.post('/v2/partner/sms/otp/verification', formData).then(response => {
        if (response.data.code === 200) {
          this.errorCheckOtp = false
          this.$http_komship.post('/v2/bank-account/store',
            {
              bank_name: this.fieldAddBankName,
              account_name: this.fieldAddAccountName,
              account_no: this.fieldAddAccountNo,
              note: this.reasonCreateRekening,
            }, {
              headers: { Authorization: `Bearer ${useJwt.getToken()}` },
            }).then(responseStore => {
            if (responseStore.data.code === 400) {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Failed',
                  icon: 'AlertCircleIcon',
                  text: responseStore.data.message,
                  variant: 'danger',
                },
              }, 2000)
            }
            if (responseStore.data.code === 1001) {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Failed',
                  icon: 'AlertCircleIcon',
                  text: responseStore.data.message,
                  variant: 'danger',
                },
              }, 2000)
            }
            if (responseStore.data.code === 200) {
              this.loadingSubmit = false
              this.getBank()
              this.fieldActionAddRekening = false
              this.$refs['modal-verification-OTP'].hide()
              this.$refs['success-add-rekening'].show()
              this.visibilityPin = 'password'
              this.fieldAddBankName = ''
              this.fieldAddAccountNo = ''
              this.fieldAddAccountName = ''
              this.otpConfirmation = ''
              this.countOtp = 0
            }
          }).catch(() => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Gagal',
                icon: 'AlertCircleIcon',
                text: 'Gagal menambahkan rekening, silahkan coba lagi!',
                variant: 'danger',
              },
            }, 2000)
          })
        } else {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Failed',
              icon: 'AlertCircleIcon',
              text: response.data.message,
              variant: 'danger',
            },
          }, 2000)
          this.loadingSubmit = false
          this.errorConfirmOtp = true
          this.errorCheckOtp = true
        }
      }).catch(err => {
        if (err.response.data.message === 'Failed to verification OTP.') {
          this.errorCheckOtp = true
        } else {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Failure',
              icon: 'AlertCircleIcon',
              text: err,
              variant: 'danger',
            },
          }, 2000)
        }
      })
    },
    editRekening(data) {
      this.editIdRek = data.bank_account_id
      this.bankName = data.bank_name
      this.accountNo = data.account_no
      this.accountName = data.account_name
      this.editMode = true
      this.addForm = false
    },
    submitEditRekening() {
      this.loadingSubmit = true
      // eslint-disable-next-line dot-notation
      this.$refs['formRules'][0].validate().then(success => {
        if (success) {
          const formData = new FormData()
          formData.append('_method', 'put')
          formData.append('bank_name', this.bankName)
          formData.append('account_name', this.accountName)
          formData.append('account_no', this.accountNo)
          this.$http_komship.post(`/v1/bank-account/update/${this.editIdRek}`, formData, {
            headers: { Authorization: `Bearer ${useJwt.getToken()}` },
          }).then(() => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Berhasil',
                icon: 'CheckIcon',
                text: 'Berhasil update rekening',
                variant: 'success',
              },
            }, 2000)
            this.loadingSubmit = false
            this.editMode = false
            this.getBank()
          }).catch(() => {
            this.loadingSubmit = false
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Gagal',
                icon: 'AlertCircleIcon',
                text: 'Gagal edit rekening bank, silahkan coba lagi',
                variant: 'danger',
              },
            }, 2000)
          })
        } else {
          this.loadingSubmit = false
        }
      })
    },
    confirmDelete(data) {
      this.$swal({
        title: 'Anda yakin?',
        text: 'Ingin hapus satu rekening ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, Hapus!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.delete(data)
        }
      })
    },
    delete(data) {
      this.$http_komship.delete(`/v1/bank-account/delete/${data.bank_account_id}`, {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      })
        .then(() => {
          this.getBank()
        }).catch(() => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Gagal',
              icon: 'AlertCircleIcon',
              text: 'Gagal delete rekening bank, silahkan coba lagi',
              variant: 'danger',
            },
          }, 2000)
        })
    },
    onChange(v) {
      this.dataPin = v
    },
    onComplete(v) {
      this.dataPin = v
    },
    showModal() {
      this.$refs['modal-pin'].show()
      this.changeAttr()
    },
    hideModal() {
      this.$refs['modal-pin'].hide()
    },
    confirmPin() {
      this.loadingSubmit = true
      this.$http_komship.post('/v1/pin/auth', {
        pin: this.dataPin,
      }, {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(response => {
        const { data } = response.data
        if (data.is_match === true) {
          this.loadingSubmit = false
          this.hideModal()
          this.visibilityPin = 'password'
        } else {
          this.errorPin = 'PIN tidak valid'
          this.loadingSubmit = false
        }
      }).catch(() => {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Gagal',
            icon: 'AlertCircleIcon',
            text: 'Gagal konfirmasi PIN, silahkan coba lagi',
            variant: 'danger',
          },
        }, 2000)
      })
    },
    loadBanks() {
      this.loading = true
      this.$http
        .get('xendit/disbursementbankAvailable')
        .then(({ data }) => {
          this.banks = data.data
          this.loading = false
        })
        .catch(() => {
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Terjadi Kesalahan',
                text: 'Terjadi kesalahan saat pengambilan data bank',
                variant: 'danger',
                attachment: 'AlertTriangleIcon',
              },
            },
            { timeout: 2500 },
          )
          this.loading = false
        })
    },
    addRekening() {
      if (this.validateProfile.user_name === '' || this.validateProfile.fullname === '' || this.validateProfile.user_gender === ''
      || this.validateProfile.user_email === '' || this.validateProfile.user_phone === '' || this.validateProfile.user_address === ''
      || this.validateProfile.address_partner_business === '' || this.validateProfile.partner_business_name === ''
      || this.validateProfile.partner_category_name === '' || this.validateProfile.partner_business_type_id === ''
      || this.validateProfile.partner_business_logo === '') {
        this.$refs['modal-validate-profile'].show()
        this.changeAttr()
      } else {
        this.fieldActionAddRekening = true
        if (this.editMode === true) {
          this.editMode = false
        }
      }
    },
    cancelAddRekening() {
      this.fieldActionAddRekening = false
      this.validateLength = ''
      this.ValidateAccountName = false
      this.fieldAddAccountNo = ''
      this.fieldAddAccountName = ''
      this.fieldAddBankName = ''
      this.isValidateAccountName = false
      this.checkValidBank = true
      this.messageSameNoBank = ''
      this.validateFieldAddBankName = false
      this.validateFieldAddAccountNo = false
    },
    changeFieldAddBank() {
      this.fieldAddAccountName = ''
      this.checkValidBank = true
      this.isValidateAccountName = false
      this.messageSameNoBank = ''
    },
    removeFormRekening(index) {
      this.formRekening.splice(index, 1)
    },
    countDownTimerOtp() {
      if (this.countOtp > 0) {
        setTimeout(() => {
          this.countOtp -= 1
          this.countDownTimerOtp()
        }, 1000)
      }
      if (this.countOtp === 0) this.otpSubmit += 1
    },
    // Handle OTP
    handleOnComplete(value) {
      this.dataPin = value
    },
    handleOnChange(value) {
      this.dataPin = value
    },
    backPage() {
      window.history.go(-1)
    },
    changeEditMode() {
      this.editMode = false
    },
    async getProfile() {
      this.phoneUser = this.profile.user_phone
      this.phoneNumber = this.profile.user_phone
      this.validateProfile = this.profile
      await this.$http_komship.post(`/v1/check-wa?phone_no=${this.phoneUser}`)
        .then(res => {
          this.messageErrorPhoneUser = false
        })
        .catch(error => {
          this.messageErrorPhoneUser = true
          if (error.response.data.code !== 1001) {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Failure',
                icon: 'AlertCircleIcon',
                text: error,
                variant: 'danger',
              },
            })
          }
        })
    },
    handleClosePopupOtp() {
      this.$refs['modal-verification-submit'].hide()
    },
    handleCloseNotifError() {
      this.errorConfirmOtp = false
    },
    countDownTimerResend() {
      if (this.countCanResendOtp > 0) {
        setTimeout(() => {
          this.countCanResendOtp -= 1
          this.countDownTimerResend()
        }, 1000)
      }
      if (this.countCanResendOtp === 0) {
        this.validateResendOtp = ''
        this.countSubmit = 0
      }
    },
    toggleVisibilityPin() {
      if (this.visibilityPin === 'password') {
        this.visibilityPin = 'text'
      } else {
        this.visibilityPin = 'password'
      }
    },
    async changeAttr() {
      const element = document.getElementsByTagName('body')[0].className
      await (element === 'modal-open')
      document.querySelectorAll('div.modal-content')[0].removeAttribute('tabindex')
    },
    sendOtpSMS() {
      if (this.buttonSMSOtpIsClick === false) {
        this.buttonSMSOtpIsClick = true
        this.otpMode = 'sms'
        this.loadingOtpSms = true
        const formData = new FormData()
        formData.append('_method', 'post')
        formData.append('phone_number', this.phoneUser)
        formData.append('session', 'rekening')
        formData.append('activity', 'BANK ACCOUNT')
        this.$http_komship.post('/v2/partner/sms/otp', formData).then(response => {
          this.loadingOtpSms = false
          this.loadingResendOtp = false
          this.countOtp = response.data.data.expired_at
          if (this.countOtp === 1 || this.countOtp === -1) this.countOtp = 0
          this.otpSubmit = response.data.data.check_request_otp
          if (this.countOtp > 0) this.countDownTimerOtp()
          this.$refs['modal-verification-submit'].hide()
          this.$refs['modal-verification-OTP'].show()
          this.buttonSMSOtpIsClick = false
        }).catch(err => {
          this.loadingOtpSms = false
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Failure',
              icon: 'AlertCircleIcon',
              text: err,
              variant: 'danger',
            },
          }, 2000)
          this.buttonSMSOtpIsClick = false
        })
      }
    },
    sendOtpWA() {
      if (this.buttonWAOtpIsClick === false && !this.messageErrorPhoneUser) {
        this.buttonWAOtpIsClick = true
        this.otpMode = 'wa'
        this.loadingOtpWa = true
        const formData = new FormData()
        formData.append('no_hp', this.phoneUser)
        formData.append('activity', 'BANK ACCOUNT')
        this.$http_komship.post('/v1/user/send/otp/wa', formData).then(response => {
          this.countOtp = response.data.data.expired_at
          this.otpSubmit = response.data.data.check_request_otp
          if (this.countOtp === 1 || this.countOtp === -1) this.countOtp = 0
          if (this.countOtp > 0) this.countDownTimerOtp()
          this.loadingOtpWa = false
          this.loadingResendOtp = false
          this.$refs['modal-verification-submit'].hide()
          this.$refs['modal-verification-OTP'].show()
          this.buttonWAOtpIsClick = false
        }).catch(err => {
          this.loadingOtpWa = false
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Failure',
              icon: 'AlertCircleIcon',
              text: err,
              variant: 'danger',
            },
          }, 2000)
          this.buttonWAOtpIsClick = false
        })
      }
    },
    resendOtp(mode) {
      this.errorCheckOtp = false
      this.otpConfirmation = ''
      this.loadingResendOtp = true
      if (mode === 'sms') {
        this.sendOtpSMS()
      }
      if (mode === 'wa') {
        this.sendOtpWA()
      }
    },
    changeMethodOtp() {
      this.errorCheckOtp = false
      this.countOtp = 0
      this.otpMode = ''
      this.otpConfirmation = ''
      this.errorCheckOtp = false
      this.loadingOtpWa = false
      this.loadingOtpSms = false
      this.$refs['modal-verification-submit'].show()
      this.$refs['modal-verification-OTP'].hide()
    },
    checkOtp: _.debounce(function () {
      this.errorCheckOtp = false
      if (this.otpMode === 'sms') {
        if (this.otpConfirmation.length === 6) {
          this.submitRekening()
        }
      }
      if (this.otpMode === 'wa') {
        if (this.otpConfirmation.length === 6) {
          const formData = new FormData()
          formData.append('otp', this.otpConfirmation)
          this.$http_komship.post('/v1/user/send/otp/wa/check', formData).then(response => {
            this.$http_komship.post('/v2/bank-account/store',
              {
                bank_name: this.fieldAddBankName,
                account_name: this.fieldAddAccountName,
                account_no: this.fieldAddAccountNo,
              }, {
                headers: { Authorization: `Bearer ${useJwt.getToken()}` },
              }).then(responseStore => {
              if (responseStore.data.code === 400) {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'Failed',
                    icon: 'AlertCircleIcon',
                    text: responseStore.data.message,
                    variant: 'danger',
                  },
                }, 2000)
              }
              if (responseStore.data.code === 1001) {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'Failed',
                    icon: 'AlertCircleIcon',
                    text: responseStore.data.message,
                    variant: 'danger',
                  },
                }, 2000)
              }
              if (responseStore.data.code === 200) {
                this.loadingSubmit = false
                this.fieldActionAddRekening = false
                this.getBank()
                this.fieldActionAddRekening = false
                this.$refs['modal-verification-OTP'].hide()
                this.$refs['success-add-rekening'].show()
                this.visibilityPin = 'password'
                this.fieldAddBankName = ''
                this.fieldAddAccountNo = ''
                this.fieldAddAccountName = ''
                this.otpConfirmation = ''
                this.countOtp = 0
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
            })
          }).catch(err => {
            if (err.response.data.code === 1001) {
              this.errorCheckOtp = true
            } else {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Failure',
                  icon: 'AlertCircleIcon',
                  text: err,
                  variant: 'danger',
                },
              }, 2000)
            }
          })
        }
      }
    }, 1000),
    closePopupSuccess() {
      this.$refs['success-add-rekening'].hide()
      this.fieldActionAddRekening = false
      this.fieldAddBankName = ''
      this.fieldAddAccountNo = ''
      this.fieldAddAccountName = ''
      this.otpConfirmation = ''
      this.isValidateAccountName = false
      this.checkValidBank = true
    },
    closeVerification() {
      this.$refs['modal-verification-submit'].hide()
      this.checkValidBank = false
    },
    closeCheckVerification() {
      this.otpMode = ''
      this.otpConfirmation = ''
      this.errorCheckOtp = false
      this.loadingOtpWa = false
      this.loadingOtpSms = false
      this.$refs['modal-verification-OTP'].hide()
    },
    checkBank: _.debounce(function () {
      if (this.fieldAddBankName !== '' && this.fieldAddAccountNo !== '' && this.fieldAddAccountName !== '' && this.accountNameDB === true) {
        this.checkValidBank = false
        this.loadingSubmit = true
        if (this.loadingSubmit === true) {
          this.checkValidBank = true
        }
        const formData = new FormData()
        formData.append('bank_name', this.fieldAddBankName)
        formData.append('account_name', this.fieldAddAccountName)
        formData.append('account_no', this.fieldAddAccountNo)
        formData.append('user_id', this.$store.state?.auth?.userData.id)
        this.$http.post('/v1/bank/check', formData)
          .then(response => {
            this.loadingSubmit = false
            this.checkValidBank = true
            this.messageSameNoBank = ''
            this.messageSameNameBank = ''
            this.submitVerification()
          }).catch(err => {
            if (err.response.data.code === 1001) {
              if (err.response.data.message === 'Nomor Rekening Sudah digunakan') {
                this.messageSameNoBank = err.response.data.message
                this.messageSameNameBank = ''
                this.checkValidBank = true
              }
              if (err.response.data.message === 'Nama telah digunakan sebelumnya') {
                this.messageSameNameBank = err.response.data.message
                this.messageSameNoBank = ''
                this.checkValidBank = true
              }
            }
            if (err.response.data.code === 1002) {
              this.messageSameNoBank = ''
              this.messageSameNameBank = ''
              this.checkValidBank = true
              this.banksDataMinus = err.response.data.data
              this.$refs['popup-check-rekening'].show()
            } else {
              this.loadingSubmit = false
              this.checkValidBank = false
            }
            this.loadingSubmit = false
            this.checkValidBank = false
          })
      }
    }),
    closeCheckRek() {
      this.$refs['popup-check-rekening'].hide()
    },
    submitAccount() {
      this.$refs['modal-verification-submit'].show()
      this.$refs['popup-check-rekening'].hide()
    },
    formatNumber: value => (`${value}`).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
    getAccount() {
      if (this.fieldAddBankName !== '') {
        this.validateFieldAddBankName = false
        if (this.fieldAddAccountNo !== '') {
          this.validateFieldAddAccountNo = false
          if (this.fieldAddAccountNo.length >= 1 && this.fieldAddAccountNo.length < 5) {
            this.lenghtNoAccount = false
            this.validateLength = 'Minimal 5 angka ya, pastikan jenis bank sudah benar'
          } else {
            this.lenghtNoAccount = true
            this.validateLength = ''
            this.getAccountBank()
          }
        } else {
          this.validateFieldAddAccountNo = true
        }
      } else {
        this.validateFieldAddBankName = true
      }
    },
    getAccountBank() {
      this.ValidateAccountName = true
      this.$http.post('/v1/bank/check-bank-owner',
        {
          bank_name: this.fieldAddBankName,
          account_no: this.fieldAddAccountNo,
        }, {
          headers: { Authorization: `Bearer ${useJwt.getToken()}` },
        }).then(response => {
        this.isValidateAccountName = true
        if (response.data.data.account_name !== undefined) {
          this.ValidateAccountName = false
          this.accountNameDB = true
          this.fieldAddAccountName = response.data.data.account_name
          this.getValidateAccountName = true
          this.checkValidBank = false
        } else {
          this.ValidateAccountName = false
          this.checkValidBank = true
          this.getValidateAccountName = false
          this.fieldAddAccountName = ''
        }
      }).catch(err => {
        this.isValidateAccountName = true
        this.ValidateAccountName = false
        this.checkValidBank = true
        this.fieldAddAccountName = ''
        this.getValidateAccountName = false
      })
    },
    AccountBankNo(e) {
      this.fieldAddAccountNo = ''
      this.fieldAddAccountName = ''
      this.ValidateAccountName = false
      this.checkValidBank = true
      this.isValidateAccountName = false
      const dummyAccountBank = e.clipboardData.getData('text').replace(/\D/g, '')
      this.fieldAddAccountNo = dummyAccountBank
    },
  },
}
</script>
<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
.validate-green {
  border: 1px solid #DCF3EB;
  background-color: #DCF3EB;
  width: 78%;
  border-radius: 8px;
}
.validate-red {
  border: 1px solid #FFF2E2;
  background-color: #FFF2E2;
  width: 78%;
  border-radius: 8px;
}
.cekRekening {
  width: 13rem;
}
@media screen and (max-width: 1200px) {
  .cekRekening {
    width: 14rem;
  }
}
@media screen and (max-width: 780px) {
  .cekRekening {
    width: 18rem;
  }
}
[dir] .otp-input {
    width: 40px;
    height: 40px;
    padding: 5px;
    margin: 0 10px;
    font-size: 20px;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    text-align: center;
  }
  [dir] .otp-input::-webkit-inner-spin-button,
  [dir] .otp-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  [dir] input.vue-pincode-input {
    box-shadow: none!important;
    border-bottom: 2px solid #FF6A3A!important;
    border-radius: 0px!important;
    color: black;
}
    [dir] input.vue-pincode-input:placeholder-shown  {
      box-shadow: none!important;
      border-bottom: 2px solid #828282!important;
      border-radius: 0px!important;
  }
  [dir] input.vue-pincode-input:focus {
    box-shadow: none!important;
    border-bottom: 2px solid #FF6A3A!important;
    border-radius: 0px!important;
}
  [dir] .wrapper__send__otp:hover {
    background: #FFECE9;
  }
  [dir] .wrapper__otp__wa {
    background: #C2C2C2;
  }
  [dir] .border__table__check__rek {
    border: 1px solid #E2E2E2;
  }
  .has-spinner {
  position: relative;
  }
  .spinner-border {
    position: absolute;
    left: 1%;
    top: 40%;
  }
</style>
