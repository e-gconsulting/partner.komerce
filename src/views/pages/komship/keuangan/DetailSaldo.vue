<template>
  <b-card>
    <h2 class="font-bold mb-2">
      Rincian Saldo
    </h2>
    <b-row class="mb-1">
      <b-col
        cols="12"
        md="6"
        class="mb-1"
      >
        <div
          style="border: 1px solid #e2e2e2; border-radius: 8px"
          class="text-xl px-1 py-2 sm:w-80"
        >
          Saldo:
          <span
            class="text-primary font-bold"
          >{{ totalSaldo >= 0 ? '' : '-' }} Rp
            {{ formatNumber(totalSaldo) }}</span>
        </div>
      </b-col>
      <b-col
        cols="12"
        md="6"
      >
        <b-row class="justify-content-end mr-2">
          <div class="mr-1 mb-1">
            <b-input-group class="input-group-merge">
              <b-input-group-prepend is-text>
                <feather-icon icon="SearchIcon" />
              </b-input-group-prepend>
              <b-form-input
                v-model="searchResi"
                placeholder="Copas resi kesini"
                @input="handleSearchResi"
              />
            </b-input-group>
          </div>
          <div>
            <date-range-picker
              ref="picker"
              v-model="dateRange"
              :locale-data="locale"
              :ranges="ranges"
              :opens="'left'"
              class="w-100"
              @start-selection="setCustomDate"
              @finish-selection="setCustomDate"
              @select="removeCustomDate"
            >
              <template
                v-slot:input="picker"
                style="min-width: 350px"
              >
                <div
                  class="d-flex justify-content-between align-items-center w-100 pt-50"
                >
                  <div
                    class="mr-1"
                  >
                    <span
                      v-if="formatDate(picker.startDate) === formatDate(last7)"
                      style="color: #828282!important"
                    >7 Hari Terakhir</span>
                    <span
                      v-else-if="formatDate(picker.startDate) === formatDate(last30)"
                      style="color: #828282!important"
                    >30 Hari Terakhir</span>
                    <span
                      v-else-if="formatDate(picker.startDate) === formatDate(firstDateOfMonth) && formatDate(picker.endDate) === formatDate(today)"
                      style="color: #828282!important"
                    >Bulan Ini</span>
                    <span
                      v-else-if="formatDate(picker.startDate) === formatDate(today) && formatDate(picker.endDate) === formatDate(today)"
                      style="color: #828282!important"
                    >Custom Tanggal</span>
                    <span
                      v-else
                      style="color: #828282!important"
                    >Custom Tanggal</span>
                  </div>
                  <div>
                    <feather-icon icon="ChevronDownIcon" />
                  </div>
                </div>
              </template>
            </date-range-picker>
          </div>
        </b-row>
      </b-col>
    </b-row>
    <b-overlay
      variant="light"
      :show="loadTable"
      spinner-variant="primary"
      blur="0"
      opacity=".5"
      rounded="sm"
    >
      <b-table
        responsive
        show-empty
        empty-text="Tidak ada data untuk ditampilkan."
        :items="items"
        :fields="fields"
      >
        <template #cell(date_transaction)="data">
          <span>{{ moment(data.item.date_transaction) }}</span><br>
          <span class="text-muted">{{
            momentTime(data.item.date_transaction)
          }}</span>
        </template>
        <template #cell(transaction_type)="data">
          <span v-if="data.item.transaction_type === 'topup' && data.item.claim_retur === null">
            Top Up Saldo
          </span>
          <span v-if="data.item.transaction_type === 'shopping'">
            Belanja (<span class="text-muted">Keperluan Talent</span>)
          </span>
          <span v-if="data.item.transaction_type === 'withdrawal'">
            Penarikan Saldo
          </span>
          <span
            v-if="data.item.transaction_type === 'kompoints'"
            class="text-black"
          >
            Rewards Kompoints
          </span>
          <span v-if="data.item.transaction_type === 'orderku_done'">
            Orderan COD (
            <span
              v-if="data.item.order_status !== 'Hilang' && data.item.order_status !== 'Rusak'"
              class="text-success"
            >Diterima</span>
            <span
              v-if="data.item.order_status === 'Hilang'"
              class="text-muted"
            >Ganti Rugi Paket Hilang</span>
            <span
              v-if="data.item.order_status === 'Rusak'"
              class="text-muted"
            >Ganti Rugi Paket Rusak</span>
            )
            <b-row>
              <img
                :src="data.item.shipment_image_path"
                width="70"
              >
              <img
                :id="`${data.index}-infoSaldo`"
                src="@/assets/images/icons/info-circle.svg"
              >
            </b-row>
            <b-popover
              triggers="hover"
              :target="`${data.index}-infoSaldo`"
              placement="bottomleft"
            >
              <b-row class="px-2 align-items-center">
                <span class="text-black">
                  <strong>
                    Nomor Resi
                  </strong>
                  :
                </span>
                <span class="text-black mr-1">{{ data.item.cnote }}</span>
                <b-button
                  class="btn-icon"
                  size="sm"
                  variant="flat-dark"
                  @click="copyResi(data.item.cnote)"
                >
                  <img
                    id="infoSaldo"
                    src="@/assets/images/icons/icons-copy.svg"
                  >
                </b-button>
              </b-row>
            </b-popover>
          </span>
          <span v-if="data.item.transaction_type === 'orderku_cancel'">
            Orderan Non COD (<span class="text-muted">Cancel</span>)
            <b-row>
              <img
                :src="data.item.shipment_image_path"
                width="70"
              >
              <img
                :id="`${data.index}-infoSaldo`"
                src="@/assets/images/icons/info-circle.svg"
              >
            </b-row>
            <b-popover
              triggers="hover"
              :target="`${data.index}-infoSaldo`"
              placement="bottomleft"
            >
              <b-row class="px-2 align-items-center">
                <span class="text-black">
                  <strong>
                    Nomor Resi
                  </strong>
                  :
                </span>
                <span class="text-black mr-1">{{ data.item.cnote }}</span>
                <b-button
                  class="btn-icon"
                  size="sm"
                  variant="flat-dark"
                  @click="copyResi(data.item.cnote)"
                >
                  <img
                    id="infoSaldo"
                    src="@/assets/images/icons/icons-copy.svg"
                  >
                </b-button>
              </b-row>
            </b-popover>
          </span>
          <span v-if="data.item.transaction_type === 'orderku_ongkir'">
            Orderan Non COD (<span class="text-muted">Ongkir</span>)
            <b-row>
              <img
                :src="data.item.shipment_image_path"
                width="70"
              >
              <img
                :id="`${data.index}-infoSaldo`"
                src="@/assets/images/icons/info-circle.svg"
              >
            </b-row>
            <b-popover
              triggers="hover"
              :target="`${data.index}-infoSaldo`"
              placement="bottomleft"
            >
              <b-row class="px-2 align-items-center">
                <span class="text-black">
                  <strong>
                    Nomor Resi
                  </strong>
                  :
                </span>
                <span class="text-black mr-1">{{ data.item.cnote }}</span>
                <b-button
                  class="btn-icon"
                  size="sm"
                  variant="flat-dark"
                  @click="copyResi(data.item.cnote)"
                >
                  <img
                    id="infoSaldo"
                    src="@/assets/images/icons/icons-copy.svg"
                  >
                </b-button>
              </b-row>
            </b-popover>
          </span>
          <span
            v-if="
              data.item.transaction_type === 'orderku_retur' &&
                data.item.payment_method === 'COD'
            "
          >
            Orderan COD (<span class="text-danger">Retur</span>)
            <b-row>
              <img
                :src="data.item.shipment_image_path"
                width="70"
              >
              <img
                :id="`${data.index}-infoSaldo`"
                src="@/assets/images/icons/info-circle.svg"
              >
            </b-row>
            <b-popover
              triggers="hover"
              :target="`${data.index}-infoSaldo`"
              placement="bottomleft"
            >
              <b-row class="px-2 align-items-center">
                <span class="text-black">
                  <strong>
                    Nomor Resi
                  </strong>
                  :
                </span>
                <span class="text-black mr-1">{{ data.item.cnote }}</span>
                <b-button
                  class="btn-icon"
                  size="sm"
                  variant="flat-dark"
                  @click="copyResi(data.item.cnote)"
                >
                  <img
                    id="infoSaldo"
                    src="@/assets/images/icons/icons-copy.svg"
                  >
                </b-button>
              </b-row>
            </b-popover>
          </span>
          <span
            v-if="
              data.item.transaction_type === 'orderku_retur' &&
                data.item.payment_method === 'BANK TRANSFER'
            "
          >
            Orderan Non COD (<span class="text-danger">Retur</span>)<b-row>
              <img
                :src="data.item.shipment_image_path"
                width="70"
              >
              <img
                :id="`${data.index}-infoSaldo`"
                src="@/assets/images/icons/info-circle.svg"
              >
            </b-row>
            <b-popover
              triggers="hover"
              :target="`${data.index}-infoSaldo`"
              placement="bottomleft"
            >
              <b-row class="px-2 align-items-center">
                <span class="text-black">
                  <strong>
                    Nomor Resi
                  </strong>
                  :
                </span>
                <span class="text-black mr-1">{{ data.item.cnote }}</span>
                <b-button
                  class="btn-icon"
                  size="sm"
                  variant="flat-dark"
                  @click="copyResi(data.item.cnote)"
                >
                  <img
                    id="infoSaldo"
                    src="@/assets/images/icons/icons-copy.svg"
                  >
                </b-button>
              </b-row>
            </b-popover>
          </span>
          <span
            v-if="
              data.item.claim_retur !== null
            "
          >
            Orderan COD (<span class="text-muted">Claim Retur</span>)<b-row>
              <img
                :src="data.item.shipment_image_path"
                width="70"
              >
              <img
                :id="`${data.index}-infoSaldo`"
                src="@/assets/images/icons/info-circle.svg"
              >
            </b-row>
            <b-popover
              triggers="hover"
              :target="`${data.index}-infoSaldo`"
              placement="bottomleft"
            >
              <b-row class="px-2 align-items-center">
                <span class="text-black">
                  <strong>
                    Nomor Resi
                  </strong>
                  :
                </span>
                <span class="text-black mr-1">{{ data.item.claim_retur.no_resi }}</span>
                <b-button
                  class="btn-icon"
                  size="sm"
                  variant="flat-dark"
                  @click="copyResi(data.item.claim_retur.no_resi)"
                >
                  <img
                    id="infoSaldo"
                    src="@/assets/images/icons/icons-copy.svg"
                  >
                </b-button>
              </b-row>
            </b-popover>
          </span>
        </template>
        <template #cell(amount)="data">
          <span
            v-if="data.item.amount.charAt(0) === '+'"
            class="text-success"
          >
            +Rp {{ formatNumber(data.item.amount) }}
          </span>
          <span
            v-if="data.item.amount.charAt(0) === '-'"
            class="text-primary"
          >
            -Rp {{ formatNumber(data.item.amount) }}
          </span>
          <div
            v-if="data.item.amount_kompoint !== 0"
            class="d-flex align-items-center mt-50"
          >
            <span
              v-if="data.item.amount_kompoint.charAt(0) === '-'"
              class="text-primary mr-50"
            >
              -Rp {{ formatNumber(data.item.amount_kompoint) }}
            </span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.0002 23.6352C18.4261 23.6352 23.6352 18.4261 23.6352 12.0002C23.6352 5.5744 18.4261 0.365234 12.0002 0.365234C5.5744 0.365234 0.365234 5.5744 0.365234 12.0002C0.365234 18.4261 5.5744 23.6352 12.0002 23.6352Z"
                fill="#FBBC05"
              />
              <path
                d="M11.9999 22.1423C17.6014 22.1423 22.1423 17.6014 22.1423 11.9999C22.1423 6.39835 17.6014 1.85742 11.9999 1.85742C6.39836 1.85742 1.85742 6.39835 1.85742 11.9999C1.85742 17.6014 6.39836 22.1423 11.9999 22.1423Z"
                fill="#D69D0D"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.17188 9.65744C7.17188 9.16535 7.57062 8.7666 8.06272 8.7666C8.55482 8.7666 8.95356 9.16535 8.95356 9.65744V17.285C8.95356 17.7771 8.55482 18.1758 8.06272 18.1758C7.57062 18.1758 7.17188 17.7771 7.17188 17.285V9.65744Z"
                fill="#FBBC05"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16.3333 10.2925C16.3582 9.80264 16.7759 9.42544 17.2657 9.45039C17.7555 9.47533 18.1327 9.89297 18.1078 10.3828C18.0371 11.7446 17.4645 13.0236 16.5767 13.9526C15.6953 14.8741 14.5025 15.4599 13.1694 15.4618L8.06323 15.4686C7.57339 15.4686 7.17578 15.0713 7.17578 14.5811C7.17578 14.0909 7.57302 13.6937 8.06323 13.6937L13.1694 13.6869C13.9854 13.6858 14.7289 13.3135 15.2894 12.7276C15.8949 12.0946 16.2853 11.2219 16.3337 10.2925H16.3333Z"
                fill="#FBBC05"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.9499 9.72422C8.97484 10.214 8.59802 10.6317 8.10781 10.6566C7.61798 10.6816 7.20033 10.3048 7.17539 9.81455C7.15044 9.33492 7.03403 8.8844 6.84468 8.47847C6.64776 8.05705 6.36921 7.6791 6.02943 7.3635C5.66999 7.02901 5.64996 6.46661 5.98408 6.10756C6.31857 5.74812 6.88096 5.72809 7.24002 6.0622C7.74119 6.52746 8.15505 7.09175 8.45213 7.7271C8.73786 8.33901 8.91286 9.0129 8.9499 9.72422Z"
                fill="#FBBC05"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.3269 6.93555C17.8364 6.93555 18.2495 7.34865 18.2495 7.85814C18.2495 8.36762 17.8364 8.78073 17.3269 8.78073C16.8174 8.78073 16.4043 8.36762 16.4043 7.85814C16.4043 7.34865 16.8174 6.93555 17.3269 6.93555Z"
                fill="#FBBC05"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.1902 6.93555C11.6997 6.93555 12.1128 7.34865 12.1128 7.85814C12.1128 8.36762 11.6997 8.78073 11.1902 8.78073C10.6807 8.78073 10.2676 8.36762 10.2676 7.85814C10.2676 7.34865 10.6807 6.93555 11.1902 6.93555Z"
                fill="#FBBC05"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.9885 11.228C10.4964 11.228 10.0977 10.8292 10.0977 10.3371C10.0977 9.84503 10.4964 9.44629 10.9885 9.44629H17.2202C17.7123 9.44629 18.1111 9.84503 18.1111 10.3371C18.1111 10.8292 17.7123 11.228 17.2202 11.228H10.9885Z"
                fill="#FBBC05"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.3397 16.9296C17.5359 17.3794 17.3303 17.9029 16.8805 18.0987C16.4308 18.2948 15.9073 18.0892 15.7115 17.6394C15.4288 16.9905 14.9597 16.4394 14.3705 16.0532C13.8024 15.6809 13.1217 15.4643 12.3889 15.4643C11.8968 15.4643 11.498 15.0656 11.498 14.5735C11.498 14.0814 11.8968 13.6826 12.3889 13.6826C13.4789 13.6826 14.4945 14.0065 15.3445 14.5636C16.2183 15.1362 16.9168 15.9583 17.3394 16.9293L17.3397 16.9296Z"
                fill="#FBBC05"
              />
            </svg>
          </div>
        </template>
        <template #cell(saldo)="data">
          {{ data.item.saldo >= 0 ? '' : '-' }}Rp
          {{ formatNumber(data.item.saldo) }}
          <div
            v-if="data.item.kompoint_status === true"
            class="d-flex align-items-center mt-50"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.0002 23.6352C18.4261 23.6352 23.6352 18.4261 23.6352 12.0002C23.6352 5.5744 18.4261 0.365234 12.0002 0.365234C5.5744 0.365234 0.365234 5.5744 0.365234 12.0002C0.365234 18.4261 5.5744 23.6352 12.0002 23.6352Z"
                fill="#FBBC05"
              />
              <path
                d="M11.9999 22.1423C17.6014 22.1423 22.1423 17.6014 22.1423 11.9999C22.1423 6.39835 17.6014 1.85742 11.9999 1.85742C6.39836 1.85742 1.85742 6.39835 1.85742 11.9999C1.85742 17.6014 6.39836 22.1423 11.9999 22.1423Z"
                fill="#D69D0D"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.17188 9.65744C7.17188 9.16535 7.57062 8.7666 8.06272 8.7666C8.55482 8.7666 8.95356 9.16535 8.95356 9.65744V17.285C8.95356 17.7771 8.55482 18.1758 8.06272 18.1758C7.57062 18.1758 7.17188 17.7771 7.17188 17.285V9.65744Z"
                fill="#FBBC05"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16.3333 10.2925C16.3582 9.80264 16.7759 9.42544 17.2657 9.45039C17.7555 9.47533 18.1327 9.89297 18.1078 10.3828C18.0371 11.7446 17.4645 13.0236 16.5767 13.9526C15.6953 14.8741 14.5025 15.4599 13.1694 15.4618L8.06323 15.4686C7.57339 15.4686 7.17578 15.0713 7.17578 14.5811C7.17578 14.0909 7.57302 13.6937 8.06323 13.6937L13.1694 13.6869C13.9854 13.6858 14.7289 13.3135 15.2894 12.7276C15.8949 12.0946 16.2853 11.2219 16.3337 10.2925H16.3333Z"
                fill="#FBBC05"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.9499 9.72422C8.97484 10.214 8.59802 10.6317 8.10781 10.6566C7.61798 10.6816 7.20033 10.3048 7.17539 9.81455C7.15044 9.33492 7.03403 8.8844 6.84468 8.47847C6.64776 8.05705 6.36921 7.6791 6.02943 7.3635C5.66999 7.02901 5.64996 6.46661 5.98408 6.10756C6.31857 5.74812 6.88096 5.72809 7.24002 6.0622C7.74119 6.52746 8.15505 7.09175 8.45213 7.7271C8.73786 8.33901 8.91286 9.0129 8.9499 9.72422Z"
                fill="#FBBC05"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.3269 6.93555C17.8364 6.93555 18.2495 7.34865 18.2495 7.85814C18.2495 8.36762 17.8364 8.78073 17.3269 8.78073C16.8174 8.78073 16.4043 8.36762 16.4043 7.85814C16.4043 7.34865 16.8174 6.93555 17.3269 6.93555Z"
                fill="#FBBC05"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.1902 6.93555C11.6997 6.93555 12.1128 7.34865 12.1128 7.85814C12.1128 8.36762 11.6997 8.78073 11.1902 8.78073C10.6807 8.78073 10.2676 8.36762 10.2676 7.85814C10.2676 7.34865 10.6807 6.93555 11.1902 6.93555Z"
                fill="#FBBC05"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.9885 11.228C10.4964 11.228 10.0977 10.8292 10.0977 10.3371C10.0977 9.84503 10.4964 9.44629 10.9885 9.44629H17.2202C17.7123 9.44629 18.1111 9.84503 18.1111 10.3371C18.1111 10.8292 17.7123 11.228 17.2202 11.228H10.9885Z"
                fill="#FBBC05"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.3397 16.9296C17.5359 17.3794 17.3303 17.9029 16.8805 18.0987C16.4308 18.2948 15.9073 18.0892 15.7115 17.6394C15.4288 16.9905 14.9597 16.4394 14.3705 16.0532C13.8024 15.6809 13.1217 15.4643 12.3889 15.4643C11.8968 15.4643 11.498 15.0656 11.498 14.5735C11.498 14.0814 11.8968 13.6826 12.3889 13.6826C13.4789 13.6826 14.4945 14.0065 15.3445 14.5636C16.2183 15.1362 16.9168 15.9583 17.3394 16.9293L17.3397 16.9296Z"
                fill="#FBBC05"
              />
            </svg>
            <span
              class="text-[#CC9212] ml-50"
            >
              {{ formatNumber(data.item.kompoint) }}
            </span>
          </div>
        </template>
        <template #cell(action)="data">
          <b-button
            v-if="data.item.order_id !== 0"
            variant="none"
            class="button-detail d-flex text-info"
            :to="{
              name: 'detail-order',
              params: { order_id: data.item.order_id },
            }"
            target="_blank"
          >
            Lihat Detail
          </b-button>
          <span v-else>-</span> </template>>
      </b-table>
      <div class="d-flex justify-between align-middle">
        <div>
          <span class="mr-1">List per halaman</span>
          <b-button
            v-for="page in pageOptions"
            :key="page"
            :variant="page === perPage ? 'primary' : 'light'"
            size="sm"
            class="btnPage"
            @click="setPage(page)"
          >
            {{ page }}
          </b-button>
        </div>
        <b-pagination
          v-model="currentPage"
          size="md"
          class="float-right mr-2"
          :total-rows="totalItems"
          :per-page="perPage"
          first-number
          last-number
        />
      </div>
    </b-overlay>
  </b-card>
</template>
<script>
import {
  BCard,
  BRow,
  BCol,
  BFormSelect,
  BTable,
  BButton,
  BPagination,
  BOverlay,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import moment from 'moment'
import {
  today,
  last7,
  last30,
  firstDateOfMonth,
  lastDateOfMonth,
} from '@/store/helpers'
import { mapState } from 'vuex'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    // BFormSelect,
    BTable,
    BButton,
    BPagination,
    BOverlay,
    DateRangePicker,
  },
  data() {
    return {
      selectedFilter: '7 Hari Terakhir',
      optionsFilter: [
        '7 Hari Terakhir',
        '1 Bulan Terakhir',
        '3 Bulan Terakhir',
        'Custom',
      ],
      items: [],
      fields: [
        {
          key: 'date_transaction',
          label: 'Tanggal',
          thClass: 'align-middle',
          tdClass: 'align-top',
        },
        {
          key: 'transaction_type',
          label: 'Jenis Transaksi',
          thClass: 'align-middle',
          tdClass: 'align-top',
        },
        {
          key: 'amount',
          label: 'Jumlah',
          thClass: 'align-middle',
          tdClass: 'align-top',
        },
        {
          key: 'saldo',
          label: 'Saldo',
          thClass: 'align-middle',
          tdClass: 'align-top',
        },
        {
          key: 'action',
          label: '',
        },
      ],
      loadTable: false,
      startDate: null,
      endDate: null,
      pageOptions: [20, 50],
      currentPage: 1,
      perPage: 20,
      totalItems: 0,

      searchResi: '',

      // Date range picker
      locale: {
        format: 'dd/mm/yyyy',
        daysOfWeek: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
        monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
      },
      ranges: {
        '7 Hari Terakhir': [last7, today],
        '30 Hari Terakhir': [last30, today],
        'Bulan Ini': [firstDateOfMonth, today],
        'Custom Tanggal': [today, today],
      },
      today,
      last7,
      last30,
      firstDateOfMonth,
      lastDateOfMonth,

      dateRange: {
        startDate: last7,
        endDate: today,
      },

      titleCustomDate: null,
    }
  },
  computed: {
    ...mapState('saldoDetail', ['totalSaldo']),
  },
  watch: {
    currentPage: {
      handler(value) {
        this.fetchData().catch(error => {
          console.error(error)
        })
      },
    },
    dateRange: {
      handler() {
        this.fetchData()
      },
    },
  },
  mounted() {
    this.fetchData().catch(error => {
      console.error(error)
    })
  },
  beforeMount() {
    this.$store.dispatch('saldoDetail/init')
  },
  methods: {
    formatNumber: value => `${value}`.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
    moment(date) {
      const validDate = moment(date)
      if (validDate.isValid()) {
        return moment(date).format('DD-MM-YYYY')
      }
      return ''
    },
    momentTime(date) {
      const validDate = moment(date)
      if (validDate.isValid()) {
        return moment(date).format('HH:mm')
      }
      return ''
    },
    getDate() {
      const todays = new Date()
      this.endDate = `${todays.getFullYear()}-${todays.getMonth()
        + 1}-${todays.getDate()}`
      if (this.selectedFilter === '7 Hari Terakhir') {
        const last = new Date(todays.getTime() - 7 * 24 * 60 * 60 * 1000)
        this.startDate = `${last.getFullYear()}-${last.getMonth()
          + 1}-${last.getDate()}`
      } else if (this.selectedFilter === '1 Bulan Terakhir') {
        const last = new Date(todays.getTime() - 30 * 24 * 60 * 60 * 1000)
        this.startDate = `${last.getFullYear()}-${last.getMonth()
          + 1}-${last.getDate()}`
      } else if (this.selectedFilter === '3 Bulan Terakhir') {
        const last = new Date(todays.getTime() - 90 * 24 * 60 * 60 * 1000)
        this.startDate = `${last.getFullYear()}-${last.getMonth()
          + 1}-${last.getDate()}`
      }
    },
    async fetchData() {
      this.loadTable = true
      this.items = await this.$http_komship
        .get('v1/partner/order-transaction-balance', {
          params: {
            start_date: moment(this.dateRange.startDate).format('YYYY-MM-DD'),
            end_date: moment(this.dateRange.endDate).format('YYYY-MM-DD'),
            page: this.currentPage,
            limits: this.perPage,
            search: this.searchResi,
          },
        })
        .then(res => {
          const { data } = res.data
          this.totalItems = data.total
          this.loadTable = false
          return data.data
        })
        .catch(error => {
          // handle error
        })
    },
    setPage(totalPage) {
      this.perPage = totalPage
      this.fetchData()
    },
    handleSearchResi: _.debounce(async function () {
      this.loadTable = true
      this.items = await this.$http_komship
        .get('v1/partner/order-transaction-balance', {
          params: {
            search: this.searchResi,
          },
        })
        .then(res => {
          const { data } = res.data
          this.totalItems = data.total
          this.loadTable = false
          return data.data
        })
        .catch(error => {
          // handle error
        })
    }, 1000),
    copyResi(data) {
      /* Copy the text inside the text field */
      navigator.clipboard.writeText(data)

      /* Alert the copied text */
      this.$toast({
        component: ToastificationContent,
        props: {
          title: ` Resi ${data} berhasil dicopy`,
          icon: 'AlertCircleIcon',
          variant: 'warning',
        },
      }, 1000)
    },
    formatDate(d) {
      return moment(d).format('D MMM YYYY')
    },
    setCustomDate() {
      this.titleCustomDate = 'Custom Tanggal'
    },
    removeCustomDate() {
      this.titleCustomDate = null
    },
  },
}
</script>
<style>
.btnPage {
  padding: 4px 7px;
  margin-right: 5px;
}
</style>
