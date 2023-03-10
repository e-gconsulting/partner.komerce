<template>
  <b-card>
    <div class="d-flex justify-content-between border-b-2 pb-2">
      <div class="d-flex align-items-center my-2">
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
        <h2 class="text-black font-[600]">
          Template Notifikasi - Pickup
        </h2>
      </div>
    </div>

    <div class="my-2 border-2 p-2 rounded-2xl">
      <b-row class="mt-2 border-b-2 pb-2">
        <b-col
          lg="6"
          class="border-r-2"
        >
          <h3 class="text-black font-[600]">
            Isi Notifikasi
          </h3>
        </b-col>
        <b-col lg="6">
          <h4 class="text-black font-[600] d-none d-lg-block">
            Preview Notifikasi
          </h4>
          <div id="template-notification">
            <div class="mx-1 mx-md-2 mx-lg-5 pt-2">
              <div class="d-flex">
                <b-img
                  class="align-self-start mt-2 custom-profile"
                  src="https://storage.googleapis.com/komerce/assets/icons/profile-placehold.svg"
                />
                <div class="custom-template tri-right left-top">
                  <div class="text-left px-2 py-1">
                    <div v-if="isTemplate">
                      <!-- {{ messageTemplateCod }} -->
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quos excepturi tempora magnam quam quo eveniet esse saepe,
                      quaerat illo reprehenderit dignissimos quisquam eos ullam
                      veniam praesentium accusantium unde iste assumenda, nisi
                      rerum molestiae officiis! Commodi velit ex odio quis quam?
                    </div>
                    <div v-else>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Perferendis tempore, molestiae incidunt libero reiciendis
                      tempora ea cumque eos dolor eum.
                      <!-- {{ messageTemplatePickup }} -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
  </b-card>
</template>

<style lang="scss">
    @import '@core/scss/vue/libs/vue-select.scss';
</style>

<style lang="scss" scoped>
.custom-button {
  background-color: transparent !important;
  border: 0px;
  cursor: pointer !important;
  box-shadow: none !important;
}
.custom-btn {
  border-radius: 8px;
  font-size: 16px !important;
}
#template-notification {
  min-height: 500px;
  background-image: url(https://storage.googleapis.com/komerce/assets/elements/backgroundwa.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: right;
}
.custom-template {
  border-radius: 12px;
  border-top-left-radius: 0px;
  align-self: center;
  margin-left: 2rem;
  background-color: white;
  position: relative;
  margin-top: 20px;
  display: inline-block;
  position: relative;
  width: 80%;
  min-height: 5rem;
}
.left-top::after {
  content: ' ';
  position: absolute;
  width: 0;
  height: 0;
  left: -20px !important;
  right: auto;
  top: 0px;
  bottom: auto;
  border: 22px solid;
  border-color: white transparent transparent transparent;
}
.icon-edit {
  width: 25px;
}

@media screen and (max-width: 1200px) {
  .custom-template {
    margin-left: 1rem;
    margin-top: 10px;
    width: 90%;
  }
  .left-top::after {
    left: -10px !important;
  }
  .icon-edit {
    width: 30px;
  }
}
@media screen and (max-width: 720px) {
  .card1-mobile {
    padding: 0px !important;
  }
  .logout-mobile {
    margin-left: 0px !important;
  }
}
@media screen and (max-width: 520px) {
  .custom-profile {
    width: 40px;
  }
  .icon-edit {
    width: 60px;
  }
}
</style>
