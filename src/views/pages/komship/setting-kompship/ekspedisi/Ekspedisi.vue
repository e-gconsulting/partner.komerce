<!-- eslint-disable vue/no-v-html -->
<template>
  <b-card id="main">
    <b-card-header class="text-[22px] font-semibold text-black">
      Pengaturan Ekspedisi
    </b-card-header>
    <b-card-body>
      <b-card
        v-for="(items, index) in expedition"
        :key="index+1"
        no-body
        class="expedition mb-1 border border-[#E2E2E2]"
        style="border-radius:12px"
      >
        <b-card-header
          header-tag="header"
          class="p-1"
          :class="items.is_active ? 'active' : ''"
          role="button"
          @click="collapseExpedition(`accordion${items.id}`)"
        >
          <b-img
            :src="items.image_path"
            style="max-height: 50px"
          />
          <b-form-checkbox
            class="ml-auto"
            :checked="items.is_active"
            switch
            @change="setExpedition(items.id)"
          />
        </b-card-header>
        <b-collapse
          :id="`accordion${items.id}`"
          :accordion="`accordion${items.id}`"
          role="tabpanel"
          :visible="items.is_active ? false : true"
        >
          <b-card-body class="text-[16px]">
            <b-row>
              <b-col md="6">
                <p class="font-bold text-[18px] text-black">
                  Diskon Ongkir
                </p>
                <ul
                  v-if="items.desc"
                  class="text-black"
                >
                  <li
                    v-for="listDiscount in items.desc.discount"
                    :key="listDiscount"
                    v-html="listDiscount"
                  />
                </ul>
              </b-col>
              <b-col md="6">
                <p class="font-bold text-[18px] text-black">
                  Rekomendasi
                </p>
                <p
                  class="text-black"
                  v-html="items.desc.recomend"
                />
              </b-col>
            </b-row>
          </b-card-body>
        </b-collapse>
      </b-card>
    </b-card-body>
  </b-card>
</template>
<script src="./Ekspedisi" />
<style lang="scss" src="./Ekspedisi.scss" />
