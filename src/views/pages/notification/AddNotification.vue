<template>
  <b-card class="container">
    <div class="d-flex">
      <b-button
        variant="primary"
        size="sm"
        class="rounded-lg mr-2"
        to="/notification"
      >
        <b-icon-chevron-left />
      </b-button>
      <span class="text-[24px] font-bold my-auto">Notification Bar</span>
    </div>
    <hr class="border-t-[1px] border-[#E2E2E2]">
    <b-row class="my-3">
      <b-col md="6">
        <label
          for="title"
          class="text-[16px] font-bold"
        >Judul</label>
        <b-form-input
          id="title"
          v-model="title"
          placeholder="Masukan judul notifikasi kamu"
          class="mb-1"
        />
        <label
          for="desc"
          class="text-[16px] font-bold"
        >Deskripsi</label>
        <b-textarea
          id="desc"
          v-model="desc"
          placeholder="Masukan judul notifikasi kamu"
          class="mb-1"
        />
        <b-row>
          <b-col lg="6">
            <label
              for="link"
              class="text-[16px] font-bold"
            >Link URL</label>
            <b-form-input
              id="link"
              v-model="link"
              placeholder="Masukan link URL"
              class="mb-1"
            />
          </b-col>
          <b-col lg="6">
            <label
              for="color"
              class="text-[16px] font-bold"
            >Warna</label>
            <div
              class="p-1 border-[1px] border-[#E2E2E2] rounded-[49px]"
              style="max-width: 235px"
            >
              <button
                v-for="items in colorOptions"
                :id="items.id"
                :key="items.id"
                class="color-options rounded-full ml-1"
                :class="items.active ? 'active' : ''"
                @click="setColors(items)"
              />
            </div>
          </b-col>
        </b-row>
      </b-col>
      <b-col md="6">
        <div class="d-flex justify-content-end mb-1">
          <b-button
            variant="outline-primary"
            class="rounded-lg"
            @click="submit('save')"
          >
            Simpan
          </b-button>
          <b-button
            variant="primary"
            class="rounded-lg ml-1"
            @click="submit('submit')"
          >
            Publish
          </b-button>
        </div>
        <div class="bg-[#F8F8F8] d-flex py-2">
          <img
            v-if="colorOptions[0].active "
            src="@/assets/images/banner/preview-notif-success.svg"
            alt="preview-notif-success"
            class="mx-auto"
          >
          <img
            v-if="colorOptions[1].active "
            src="@/assets/images/banner/preview-notif-warning.svg"
            alt="preview-notif-warning"
            class="mx-auto"
          >
          <img
            v-if="colorOptions[2].active "
            src="@/assets/images/banner/preview-notif-danger.svg"
            alt="preview-notif-danger"
            class="mx-auto"
          >
          <img
            v-if="colorOptions[3].active "
            src="@/assets/images/banner/preview-notif-info.svg"
            alt="preview-notif-info"
            class="mx-auto"
          >
        </div>
      </b-col>
    </b-row>
  </b-card>
</template>
<style lang="scss" src="./notification.scss" />
<script>
export default {
  data() {
    return {
      colorOptions: [
        { id: 'colors-1', value: '#B6FBC9', active: false },
        { id: 'colors-2', value: '#FFDF82', active: false },
        { id: 'colors-3', value: '#F86363', active: false },
        { id: 'colors-4', value: '#BEE6FC', active: false },
      ],
      title: null,
      desc: null,
      link: null,
      color: null,
    }
  },
  methods: {
    setColors(items) {
      // eslint-disable-next-line no-plusplus
      for (let x = 0; x < this.colorOptions.length; x++) {
        if (this.colorOptions[x].id === items.id) {
          this.colorOptions[x].active = true
        } else {
          this.colorOptions[x].active = false
        }
      }
      this.color = items.value
    },
    async submit(action) {
      const post = () => {
        this.$http_komship.post('/v1/admin/notification-bar', {
          action,
          title: this.title,
          desc: this.desc,
          link: this.link,
          color: this.color,
        })
          .then(() => this.$router.push('/notification'))
          .catch(err => {
            console.error(err)
          })
      }
      if (action === 'submit') {
        this.$swal({
          title: '<span class="font-medium text-[16px]">Kamu yakin ingin mempublish notifikasi ini?</span>',
          // eslint-disable-next-line global-require
          imageUrl: require('@/assets/images/icons/warning.svg'),
          confirmButtonText: 'Publish',
          confirmButtonClass: 'btn btn-primary rounded-lg',
          showCancelButton: true,
          cancelButtonText: 'Batal',
          cancelButtonClass: 'btn btn-outline-primary bg-white text-primary rounded-lg',
        }).then(then => {
          if (then.isConfirmed) {
            post()
          }
        })
      } else {
        post()
      }
    },
  },
}
</script>
