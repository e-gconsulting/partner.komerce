<template>
  <b-card-actions
    ref="formCard"
    title="Detail Customer"
    no-actions
    no-body
  >
    <b-col
      class="mt-1"
      cols="12"
    >
      <h5 class="ml-4">
        <strong>Informasi Order</strong>
      </h5>
    </b-col>

    <b-row class="border ml-5 mr-5 mt-1 pb-2 pt-1">
      <b-col md="6">
        <b-list-group class="ml-1">
          <b-list-group-item class="border-0">
            Nomer Order
          </b-list-group-item>
          <b-list-group-item class="border-0">
            Tanggal Order
          </b-list-group-item>
          <b-list-group-item class="border-0">
            Metode Pembayaran
          </b-list-group-item>
          <b-list-group-item class="border-0">
            Status
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col
        md="6"
      >
        <b-list-group class="ml-1">
          <b-list-group-item class="border-0">
            <strong>123412341234</strong>
          </b-list-group-item>
          <b-list-group-item class="border-0">
            <strong>12 Agustus 2021</strong>
          </b-list-group-item>
          <b-list-group-item class="border-0">
            <strong>COD</strong>
          </b-list-group-item>
          <b-list-group-item class="border-0">
            <b-badge
              variant="light-primary"
            >
              Retur
            </b-badge>
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <b-row class="ml-3 mt-5">
        Telah ditambahkan oleh ‘Nama User’ pada 13 Agustus 2021 16:00 WIB
      </b-row>
    </b-row>

    <b-col
      cols="12"
      class="mt-3"
    >
      <h5 class="ml-4">
        <strong>Informasi Pengiriman</strong>
      </h5>
    </b-col>

    <b-row class="border ml-5 mr-5 mt-1 pb-2 pt-1">
      <b-col md="6">
        <b-list-group>
          <b-list-group-item class="border-0 mb-2">
            <b-col
              class="d-flex align-items-center"
            >
              <b-avatar
                class="mr-50"
              />
              <div>
                <h5><strong>maung</strong></h5>
                <span>(+66)666-666</span>
              </div>
            </b-col>
          </b-list-group-item>
          <b-list-group-item class="border-0 ml-1">
            Ekspedisi
          </b-list-group-item>
          <b-list-group-item class="border-0 ml-1">
            No Resi
          </b-list-group-item>
          <b-list-group-item class="border-0 ml-1">
            Detail Alamat
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col
        md="6"
      >
        <b-list-group class="ml-1 mt-2">
          <b-list-group-item class="border-0 mb-2">
            <h5 class="text-danger">
              <strong>Pengiriman Kompship</strong>
            </h5>
          </b-list-group-item>
          <b-list-group-item class="border-0">
            <h5><strong>JNE (Reguler</strong></h5>
          </b-list-group-item>
          <b-list-group-item class="border-0">
            <h5><strong>12312312344</strong></h5>
          </b-list-group-item>
          <b-list-group-item class="border-0">
            <h5><strong>Jl. Raya Tamansari, Kompleks Karangwuni, Desa, Dusun I, Tamansari, Karangmoncol, Kabupaten Purbalingga, Jawa Tengah 53355</strong></h5>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>

    <b-col
      cols="12"
      class="mt-3"
    >
      <h5 class="ml-4">
        <strong>Informasi Penjualan</strong>
      </h5>
    </b-col>

    <b-col cols="12">
      <b-card>
        <b-table
          :fields="fields"
          :items="items"
        >

          <template #cell(name_produk)="data">
            <b-row class="d-flex align-items-center">
              <b-avatar
                variant="light-primary"
                square
                class="mr-50"
              />
              <div>
                <small><strong>{{ data.value }}</strong></small>
                <h5 class="text-danger">
                  <strong>Nvidia Geforce</strong>
                </h5>
              </div>
            </b-row>
          </template>

        </b-table>

        <hr>

        <b-row class="d-flex justify-content-end">

          <b-col
            cols="12"
          >

            <b-row class="d-flex justify-content-end align-items-center mt-2">
              <b-col
                md="8"
              >
                <b-list-group>
                  <b-list-group-item class="border-0">
                    <span>Total Harga Produk</span>
                  </b-list-group-item>
                  <b-list-group-item class="border-0">
                    <span>Ongkos Kirim</span>
                  </b-list-group-item>
                  <b-list-group-item class="border-0">
                    <span>Potongan Harga</span>
                  </b-list-group-item>
                </b-list-group>
              </b-col>
              <b-col
                md="3"
                class="d-flex justify-content-end"
              >
                <b-list-group>
                  <b-list-group-item class="border-0">
                    <h5>
                      <strong>Rp. 50.000.000</strong>
                    </h5>
                  </b-list-group-item>
                  <b-list-group-item class="border-0">
                    <h5>
                      <strong>Rp. 50.000</strong>
                    </h5>
                  </b-list-group-item>
                  <b-list-group-item class="border-0">
                    <h5>
                      <strong>Rp. 0</strong>
                    </h5>
                  </b-list-group-item>
                </b-list-group>
              </b-col>
            </b-row>

            <b-row class="d-flex justify-content-end">
              <b-col cols="11">
                <hr>
              </b-col>
            </b-row>

            <b-row class="d-flex justify-content-end align-items-center">
              <b-col
                md="8"
              >
                <b-list-group>
                  <b-list-group-item class="border-0">
                    <h4>
                      <strong>
                        Penghasilan bersih yang kamu dapatkan (Transfer Bank)
                      </strong>
                    </h4>
                  </b-list-group-item>
                  <b-list-group-item class="border-0">
                    Biaya COD (2,8 sudah termasuk PPN)
                  </b-list-group-item>
                  <b-list-group-item class="border-0">
                    Cashback Ongkir (2,5%)
                  </b-list-group-item>
                  <b-list-group-item class="border-0">
                    <h5 class="text-danger">
                      <strong>
                        Penghasilan bersih yang kamu dapatkan
                      </strong>
                    </h5>
                  </b-list-group-item>
                </b-list-group>
              </b-col>
              <b-col
                md="3"
                class="d-flex justify-content-end"
              >
                <b-list-group>
                  <b-list-group-item class="border-0">
                    <h4 class="text-danger">
                      <strong>
                        Rp. 50.000.000
                      </strong>
                    </h4>
                  </b-list-group-item>
                  <b-list-group-item class="border-0">
                    <h5>
                      <strong>
                        Rp. 40.000.000
                      </strong>
                    </h5>
                  </b-list-group-item>
                  <b-list-group-item class="border-0">
                    <h5>
                      <strong>
                        Rp. 40.000.000
                      </strong>
                    </h5>
                  </b-list-group-item>
                  <b-list-group-item class="border-0">
                    <h5 class="text-danger">
                      <strong>
                        Rp. 50.000.000
                      </strong>
                    </h5>
                  </b-list-group-item>
                </b-list-group>
              </b-col>
            </b-row>

          </b-col>
        </b-row>
      </b-card>
    </b-col>

  </b-card-actions>
</template>

<script>
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'
import {
  BCol,
  BListGroup,
  BListGroupItem,
  BRow,
  BBadge,
  BAvatar,
  BTable,
  // BButton,
  BCard,
} from 'bootstrap-vue'

export default {
  components: {
    BCardActions,
    BCol,
    BListGroup,
    BListGroupItem,
    BRow,
    BBadge,
    BAvatar,
    BTable,
    // BButton,
    BCard,
  },
  data() {
    return {
      fields: [
        {
          key: 'no',
          label: 'No',
        },
        {
          key: 'name_produk', label: 'Nama Produk',
        },
        {
          key: 'harga_satuan', label: 'Harga Satuan',
        },
        {
          key: 'jumlah',
          label: 'Jumlah',
          tdClass: 'text-center',
          thClass: 'text-center',
        },
        {
          key: 'subtotal', label: 'Subtotal',
        },
      ],

      items: [
        {
          no: '1',
          name_produk: 'RTX 3090TI',
          harga_satuan: 'Rp. 50.000.000',
          jumlah: '1',
          subtotal: 'Rp. 50.000.000',
        },
        {
          no: '1',
          name_produk: 'RTX 3080TI',
          harga_satuan: 'Rp. 40.000.000',
          jumlah: '1',
          subtotal: 'Rp. 40.000.000',
        },
      ],
    }
  },
}
</script>

<style>

</style>
