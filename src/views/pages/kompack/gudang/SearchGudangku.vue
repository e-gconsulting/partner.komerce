<template>
  <b-card class="text-left">
    <div class="bg-secondary text-light" />
    <b-card
      title="Cari Gudang"
      sub-title="Temukan mitra gudangmu"
    />
    <b-col class="pl-0 pr-0">
      <b-form>
        <b-row>
          <b-col cols="12">
            <b-form-group>
              <b-row class="d-flex justify-content-end align-items-center mt-2 mr-50 wrapper__filter__data__product">
                <b-col
                  md="3"
                  class="text-center"
                >
                  <b-input-group class="input-group-merge">
                    <b-input-group-prepend is-text>
                      <feather-icon icon="SearchIcon" />
                    </b-input-group-prepend>
                    <b-form-input
                      v-model="searchProduct"
                      placeholder="Search"
                      @input="getProduct"
                    />
                  </b-input-group>
                </b-col>
                <b-col md="auto">
                  <b-dropdown
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    right
                    no-caret
                    variant="primary"
                  >
                    <template
                      #button-content
                    >
                      <feather-icon icon="SlidersIcon" />
                    </template>
                    <b-dropdown-form
                      style="width: 417px;"
                    >
                      <b-form @submit.prevent>
                        <b-row>
                          <b-col
                            cols="12"
                            class="ml-50"
                          >
                            <b-form-group
                              label="Tanggal bergabung"
                            >
                              <div class="d-flex justify-content-center align-items-center">
                                <b-form-input
                                  v-model="tglfrom"
                                  class=""
                                />
                                <b-button
                                  class="btn-icon"
                                  variant="flat-dark"
                                  disabled
                                >
                                  <!-- <feather-icon
                                    icon="MinusIcon"
                                  /> -->
                                </b-button>
                              </div>
                            </b-form-group>
                          </b-col>
                          <b-col
                            cols="12"
                            class="ml-50 mt-50"
                          >
                            <b-form-group
                              label="Kota"
                            >
                              <div class="d-flex justify-content-center align-items-center">
                                <b-form-input
                                  v-model="soldFrom"
                                  class=""
                                />
                                <b-button
                                  class="btn-icon"
                                  variant="flat-dark"
                                  disabled
                                />
                              </div>
                            </b-form-group>
                          </b-col>
                          <b-col
                            cols="12"
                            class="ml-50 mt-50"
                          >
                            <b-form-group
                              label="Status"
                            >
                              <div class="d-flex justify-content-center align-items-center">
                                <b-form-input
                                  v-model="soldFrom"
                                  class=""
                                />
                                <b-button
                                  class="btn-icon"
                                  variant="flat-dark"
                                  disabled
                                /></div></b-form-group>
                          </b-col>
                          <!-- submit and reset -->
                          <b-col
                            cols="12"
                            class="ml-50 mt-1"
                          >
                            <b-button
                              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                              type="reset"
                              variant="outline-primary"
                              class="mr-1"
                              @click="resetFilter"
                            >
                              Reset
                            </b-button>
                            <b-button
                              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                              type="submit"
                              variant="primary"
                              @click="getProduct"
                            >
                              Terapkan
                            </b-button>
                          </b-col>
                        </b-row>
                      </b-form>
                    </b-dropdown-form>
                  </b-dropdown>
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </b-col>
  </b-card>
</template>
