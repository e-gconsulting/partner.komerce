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
              <b-card-body style="padding:0 inherit;">
                <div
                  ref="dropuploadarea"
                  class="wrapper-upload mb-1"
                  @click="uploadFile()"
                >
                  <input
                    id="filebuktitransfer"
                    ref="filebuktitransfer"
                    type="file"
                    accept="image/*"
                    multiple
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
                  {{ fileUploadCount }} dari {{ filesSettled.length }} diupload
                </span>
                <div
                  class="mt-1"
                >
                  <b-card no-body>
                    <b-card-body
                      style="padding:0;"
                    >
                      <div
                        v-for="filebeingUpload in filesSettled"
                        :key="filebeingUpload.lastModified + 1"
                        style="display: grid;grid-row-gap: 1rem;"
                      >
                        <div
                          class="d-flex align-items-center"
                        >
                          <div class="icon-uploaded d-flex justify-content-center align-items-center">
                            <feather-icon
                              icon="FileIcon"
                              size="2x"
                            />
                          </div>
                          <div class="progressUpload">
                            <div
                              class="d-flex justify-content-between"
                            >
                              <span
                                class="text-bukti-transfer"
                              >
                                {{ filebeingUpload.name }}
                              </span>
                              <span
                                class="text-bukti-transfer"
                                style="color: #E31A1A;cursor: pointer;"
                              >
                                Batal
                              </span>
                            </div>
                            <b-progress
                              :value="valueProgressUpload"
                              :max="maxProgressUpload"
                              class="my-1"
                            />
                            <div
                              class="d-flex justify-content-between"
                            >
                              <span class="text-filesize-bukti-transfer">
                                {{ calculateSizeFile(filebeingUpload.size) }}
                              </span>
                              <span class="text-filesize-bukti-transfer">
                                {{ valueProgressUpload }}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </b-card-body>
                  </b-card>
                </div>
                <div style="display: flex;justify-content:center;">
                  <b-button
                    v-if="filesSettled.length > 0"
                    variant="primary"
                    class="btn-custom-upload"
                    @click="handleKonfirmasi()"
                  >
                    Konfirmasi
                  </b-button>
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
  BProgress,
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
    BProgress,
    BCardBody,
    BCardHeader,
  },
  filters: {
    //
  },
  data() {
    return {
      loadDataAwal: true,
      filesUploaded: [],
      filesSettled: [],
      fileUploadCount: 0,
      valueProgressUpload: 0,
      maxProgressUpload: 100,
      dragAndDropCapable: false,
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
    /*
      Determine if drag and drop functionality is capable in the browser
    */
    this.dragAndDropCapable = this.determineDragAndDropCapable()
    /*
      If drag and drop capable, then we continue to bind events to our elements.
    */
    if (this.dragAndDropCapable) {
      /*
        Listen to all of the drag events and bind an event listener to each
        for the dropuploadarea.
      */
      ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach(evt => {
        /*
          For each event add an event listener that prevents the default action
          (opening the file in the browser) and stop the propagation of the event (so
          no other elements open the file in the browser)
        */
        this.$refs.dropuploadarea.addEventListener(evt, e => {
          e.preventDefault()
          e.stopPropagation()
        }, false)
      })

      /*
        Add an event listener for drop to the form
      */
      this.$refs.dropuploadarea.addEventListener('drop', e => {
        /*
          Capture the files from the drop event and add them to our local files
          array.
        */
        for (let i = 0; i < e.dataTransfer.files.length; i + 1) {
          this.filesUploaded.push(e.dataTransfer.files[i])
        }
      })
    }

    // Set the initial number of items
  },
  created() {
    //
    // const eventNames = ['dragenter', 'dragover', 'dragleave', 'drop']
    // const dropArea = this.$refs['drop-upload-area']
    // eventNames.forEach(eventName => {
    //   console.log(eventName)
    //   dropArea.addEventListener(eventName, this.preventDefaults, false)
    //   if (eventName === 'drop') {
    //     dropArea.addEventListener('drop', this.handleDrop, false)
    //   }
    // })
  },
  methods: {
    /*
      Determines if the drag and drop functionality is in the
      window
    */
    determineDragAndDropCapable() {
      /*
        Create a test element to see if certain events
        are present that let us do drag and drop.
      */
      const div = document.createElement('div')

      /*
        Check to see if the `draggable` event is in the element
        or the `ondragstart` and `ondrop` events are in the element. If
        they are, then we have what we need for dragging and dropping files.

        We also check to see if the window has `FormData` and `FileReader` objects
        present so we can do our AJAX uploading
      */
      return (('draggable' in div)
              || ('ondragstart' in div && 'ondrop' in div))
              && 'FormData' in window
              && 'FileReader' in window
    },
    uploadFile() {
      this.$refs.filebuktitransfer.click()
    },
    previewFiles(event) {
      const data = event.target.files
      this.filesSettled = data
      this.handleFiles(data)
    },
    preventDefaults(e) {
      e.preventDefault()
      e.stopPropagation()
    },
    handleDrop(e) {
      const { files } = e.dataTransfer
      console.log('dt :', e, e.dataTransfer)
      console.log('files :', files)
      this.handleFiles(files)
    },
    handleFiles(files) {
      ([...files]).forEach(file => {
        console.log(file)
        const formData = new FormData()
        formData.append('file', file)
        this.$http.post(
          'https://www.mocky.io/v2/5cc8019d300000980a055e76',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: progressEvent => {
              const progressPercent = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100), 10)
              this.valueProgressUpload = progressPercent
              if (progressPercent === 100) {
                this.fileUploadCount += 1
              }
            },
          },
        )
          .then(({ data }) => {
            this.filesUploaded.push(data)
          })
          .catch(err => console.log(err))
      })
    },
    handleKonfirmasi() {
      // caling api
      // this.$http.post(url,params,{})
      // back to rincian routes
      this.$router.go(-1)
    },
    calculateSizeFile(size) {
      const sizesUnit = ['Bytes', 'KB', 'MB', 'GB', 'TB']
      if (size === 0) return '0 Byte'
      const i = parseInt(Math.floor(Math.log(size) / Math.log(1024)), 10)
      return `${Math.round(size / (1024 ** i), 2)} ${sizesUnit[i]}`
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

.text-bukti-transfer{
  font-weight: 600;
  font-size: 20px;
  line-height: 150%;
  letter-spacing: 0.5px;
  color: #444444;
}
.text-filesize-bukti-transfer{
  font-weight: 500;
  font-size: 18px;
  line-height: 150%;
  /* identical to box height, or 27px */
  display: flex;
  align-items: center;
  letter-spacing: 0.5px;
  /* Grayscale/Label */
  color: #828282;
}
.icon-uploaded{
  background: #F1F2F6;
  border: 1px solid #444444;
  box-sizing: border-box;
  width: 57px;
  height: 65px;
  margin-right: 10px;
  border-radius: 12px;
}
.progressUpload{
  display: grid;
  width: 100%;
}
</style>>
