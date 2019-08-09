<template>
  <b-container>
    <b-row>
      <b-col cols="12" lg="10" offset-lg="1">
        <form class="file-drop-form" enctype="multipart/form-data" novalidate>
          <b-form-file
            class="file-input"
            v-model="file"
            placeholder="Choose any subtitles file..."
            drop-placeholder="Drop file here..."
            type="file"
            name="file"
            accept="text/*"
            @change="fileChange($event.target.name, $event.target.files)"
          ></b-form-file>
          <div class="file-upload-info" :class="{visible: isReady || isUploading || isFailed}">
            <!-- READY -->
            <div v-if="isReady || test" class="ready">
              <b-button variant="success" class="upload-btn" @click="send(formData)">Upload</b-button>
            </div>
            <!-- UPLOADING -->
            <div v-if="isUploading" class="uploading">
              <b-spinner style="width: 3rem; height: 3rem;" variant="primary" label="Spinning"></b-spinner>
            </div>
            <!-- FAILED -->
            <div v-if="isFailed" class="failed">
              <p>
                Upload failed.
                <br />Please try again
              </p>
            </div>
          </div>
        </form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// import FileIcon from 'vue-material-design-icons/FileUploadOutline.vue';
// import FileCheckIcon from 'vue-material-design-icons/FileCheckOutline.vue';
import { upload } from './file-upload.service';

import '../../assets/scss/main.scss';

const STATUS_INITIAL = 0;
const STATUS_UPLOADING = 1;
const STATUS_READY = 2;
const STATUS_UPLOADED = 3;
const STATUS_FAILED = 4;

export default {
  data() {
    return {
      file: null,
      formData: null,
      currentStatus: null,
      uploadError: null,
      test: false,
      uploaded: false
    };
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isReady() {
      return this.currentStatus === STATUS_READY;
    },
    isUploading() {
      return this.currentStatus === STATUS_UPLOADING;
    },
    isUploaded() {
      return this.currentStatus === STATUS_UPLOADED;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    }
  },
  methods: {
    reset() {
      this.currentStatus = STATUS_INITIAL;
      this.file = null;
      this.formData = null;
      this.uploadError = null;
    },
    send(formData) {
      this.currentStatus = STATUS_UPLOADING;
      upload(formData)
        .then(res => {
          this.uploaded = res.success;
          this.currentStatus = STATUS_UPLOADED;
          this.$emit('populate-words', res.words);
        })
        .catch(err => {
          this.uploadError = err.response;
          this.currentStatus = STATUS_FAILED;
        });
    },
    fileChange(fieldName, fileList) {
      const formData = new FormData();
      if (!fileList.length) return;
      Array.from(Array(fileList.length).keys()).map(x => {
        formData.append(fieldName, fileList[x], fileList[x].name);
      });
      this.formData = formData;
      this.file = formData.get('file');
      this.currentStatus = STATUS_READY;
    }
  },
  mounted() {
    this.reset();
  }
};
</script>

<style lang="scss">
@import '../../assets/scss/variables';

.file-drop-form {
  transition: all 0.5s ease;
  display: flex;
  flex-direction: column;

  .file-input {
    margin-bottom: 2rem;
  }

  .file-upload-info {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    transition: max-height 1s ease;
    max-height: 0;
    margin-bottom: 2rem;

    &.visible {
      max-height: 100px;
    }

    .filename {
      font-size: 1.2rem;
      font-weight: bold;
    }

    .upload-btn {
      display: block;
      margin: 0 auto;
    }
  }
}
</style>
