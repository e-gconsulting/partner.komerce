<template>
  <div>
    <b-card body>
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
        <h4 class="my-0">
          Search Gudang
        </h4>
      </div>
      <b-row>
        <b-col lg="3" />
        <b-col lg="3" />
        <b-col lg="3" />
        <b-col
          sm="12"
          lg="3"
          class="d-flex"
        >
          <b-input-group class="input-group-merge mr-1">
            <b-input-group-prepend is-text>
              <feather-icon icon="SearchIcon" />
            </b-input-group-prepend>
            <b-form-input
              id="field-search-for-tbl"
              v-model="search"
              placeholder="Search"
              @input="searching()"
            />
          </b-input-group>
        </b-col>
        <b-col
          lg="12"
          class="mt-2"
        >
          <div
            v-for="item in items"
            :key="item.id"
            class="border rounded-lg p-1 my-1"
          >
            <b-row class="">
              <b-col
                lg="1"
              ><img
                src="@/assets/images/logo/logo.png"
                alt="logo"
              ></b-col>
              <b-col class="font-bold align-self-center">
                <div class="mb-1">
                  {{ item.name }}
                </div>
                <div>{{ item.approved_date }}</div>
              </b-col>
            </b-row>
            <b-row class="mt-1">
              <b-col lg="2">
                <p>Sektor Bisnis</p>
                <p>Tipe Bisnis</p>
              </b-col>
              <b-col lg="5">
                <p>{{ item.business_sector }}</p>
                <p>{{ item.business_type }}</p>
              </b-col>
              <b-col lg="2">
                <p>Jumlah Produk</p>
                <p>Total Terjual</p>
              </b-col>
              <b-col lg="1">
                <p>{{ item.product_total }}</p>
                <p>{{ item.total_sold }}</p>
              </b-col>
              <b-col lg="2">
                <b-button
                  class="mb-1"
                  size="sm"
                  variant="primary"
                  @click="search(item)"
                >Lihat Stock
                </b-button>
                <b-button
                  size="sm"
                  variant="outline-primary"
                  @click="chat(item.number_phone)"
                >Chat Partner
                </b-button>
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>
</script>
<style lang="scss" scoped>
p {
  font-weight: 500;
  color: #000000
}
.rounded {
  &-lg {
    border-radius: 16px !important;
  }
}
</style>