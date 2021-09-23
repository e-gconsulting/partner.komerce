<template>
  <section id="cod-rincian-penarikan-saldo">
    <div v-if="!loadDataAwal">
      <b-card no-body>
        <b-card-header>
          <h4
            class="card-title text-24-bold"
          >
            Persetujuan Penarikan
          </h4>
        </b-card-header>
        <b-card-body>
          <div class="mb-2 container-upload">
            <h3
              class="text-24-bold text-center"
              style="font-size: 32px;color:#222222;"
            >
              Upload Bukti Transfer
            </h3>
            <b-card no-body>
              <b-card-body>
                <div
                  class="wrapper-upload mb-1"
                  @click="uploadFile()"
                >
                  <input
                    id="filebuktitransfer"
                    ref="filebuktitransfer"
                    type="file"
                    name="filebuktitransfer"
                    style="display: none;"
                    @change="previewFiles"
                  >
                  <b-img
                    :src="require('@/assets/images/elements/folder-open.png')"
                    height="76"
                    width="76"
                    class="mb-1"
                    alt="Folder Image"
                  />
                  <span
                    class="text-16-normal mb-2"
                    style="color: #828282;"
                  >
                    PNG, JPG dan JPEG file yang diperbolehkan
                  </span>
                  <span
                    class="text-24-bold mb-4"
                    style="color: #222222;font-size: 20px;"
                  >
                    Drag dan drop atau telusuri untuk memilih file
                  </span>
                  <b-button
                    variant="primary"
                    class="btn-custom-upload"
                    @click="uploadFile()"
                  >
                    Browse
                  </b-button>
                </div>
                <span
                  class="text-24-normal"
                  style="color: #222222;"
                >
                  {{ fileUploadCount }} dari {{ fileUploadCountTotal }} diupload
                </span>
                <div
                  class="mt-1"
                >
                  <span
                    class="text-16-normal"
                  >
                    {{ fileName }}
                  </span>
                </div>
              </b-card-body>
            </b-card>
          </div>
        </b-card-body>
      </b-card>
    </div>

    <div
      v-else
      class="text-center"
    >
      <b-spinner
        variant="primary"
        label="Text Centered"
      />
    </div>
  </section>
</template>

<script>
import {
  // BRow,
  // BCol,
  BImg,
  BCard,
  BButton,
  BSpinner,
  BCardBody,
  BCardHeader,
} from 'bootstrap-vue'

export default {
  components: {
    // BRow,
    // BCol,
    BImg,
    BCard,
    BButton,
    BSpinner,
    BCardBody,
    BCardHeader,
  },
  filters: {
    //
  },
  data() {
    return {
      loadDataAwal: true,
      fileName: '',
      filesUploaded: null,
      fileUploadCount: 0,
      fileUploadCountTotal: 1,
    }
  },
  computed: {
    //
  },
  watch: {
    //
  },
  mounted() {
    this.loadDataAwal = false
    // Set the initial number of items
  },
  created() {
    //
  },
  methods: {
    uploadFile() {
      this.$refs.filebuktitransfer.click()
    },
    previewFiles(event) {
      const data = event.target.files[0]
      this.filesUploaded = data
      this.fileName = data.name
    },
  },
}
</script>

<style lang="scss" scoped>
.container-upload{
  display: grid;
  align-content: center;
  justify-content: center;
}
.wrapper-upload{
  width: 1088px;
  height: 364px;
  display: grid;
  justify-items: center;
  align-content: center;
  grid-row-gap: 0;
  background: #F1F2F6;
  border: 2px dashed #828282;
  box-sizing: border-box;
  border-radius: 16px;
}
.btn-custom-upload{
  width: 274px;
  height: 56px;
  border-radius: 12px;
}
</style>>
