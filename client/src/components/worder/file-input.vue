<template>
  <b-container>
    <form enctype="multipart/form-data" novalidate class="file-drop-form">
      <div
        class="file-input-box-wrapper"
        :class="{ready: isReady || isUploading, uploaded: isUploaded}"
      >
        <div class="file-input-box">
          <FileIcon v-if="isInitial || isReady" class="file-upload-icon" />
          <FileCheckIcon v-if="isUploaded" class="file-upload-icon green" />
          <b-spinner v-if="isUploading" label="Loading..."></b-spinner>
        </div>
        <label id="file-input-label" for="file-input"></label>
        <input
          id="file-input"
          type="file"
          name="file"
          @change="fileChange($event.target.name, $event.target.files)"
        />
      </div>
      <div class="file-upload-info">
        <!-- READY -->
        <div v-if="isReady">
          <p class="filename">{{file.name}}</p>
          <b-button variant="success" class="upload-btn" @click="send">Upload</b-button>
        </div>

        <!-- FAILED -->
        <div v-if="isFailed">
          <p>
            Upload failed.
            <br />Please try again
          </p>
        </div>
      </div>
    </form>
  </b-container>
</template>

<script>
import FileIcon from 'vue-material-design-icons/FileUploadOutline.vue';
import FileCheckIcon from 'vue-material-design-icons/FileCheckOutline.vue';
import { upload } from './file-upload.service';
import { wait } from './utils';

import '../../assets/scss/main.scss';

const STATUS_INITIAL = 0;
const STATUS_UPLOADING = 1;
const STATUS_READY = 2;
const STATUS_UPLOADED = 3;
const STATUS_FAILED = 4;

export default {
  components: {
    FileIcon,
    FileCheckIcon
  },
  data() {
    return {
      file: null,
      formData: null,
      currentStatus: null,
      uploadError: null,
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
        .then(wait(1500))
        .then(res => {
          this.uploaded = res;
          this.currentStatus = STATUS_UPLOADED;
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
  margin-bottom: 5rem;
}

.file-input-box-wrapper {
  display: flex;
  width: 250px;
  height: $file-box-height;
  background-color: rgba(193, 193, 193, 0.4);
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 2rem;
  padding: 1rem;
  border-radius: 100%;
  position: relative;
  border: 2px dashed $color-sand;
  transition: all 0.3s ease;

  &.grow {
    cursor: pointer;
    padding: 0rem;
    border-style: solid;
  }

  &.ready {
    border: 2px solid $color-sand;
    background-color: $color-sand;
    background-color: $color-sand;
    border-color: transparent;
  }

  &.uploaded {
    border: none;
    padding: 0;
    border-radius: 0;
    background-color: $color-green;

    .file-input-box {
      background-color: $color-bg;
    }
  }

  &:hover {
    @extend .grow;
  }

  .file-input-box {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: inherit;
    transition: inherit;

    .file-upload-icon {
      width: $file-icon-size;
      height: $file-icon-size;

      .material-design-icon__svg {
        width: $file-icon-size;
        height: $file-icon-size;
        transition: all 0.3s ease;
        bottom: 0;
      }
      &:hover {
        cursor: pointer;
      }
      &.green {
        .material-design-icon__svg {
          fill: $color-green;
        }
      }
    }
  }

  #file-input-label {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    border-radius: inherit;
    margin: 0;

    &:hover {
      cursor: pointer;
    }
  }

  #file-input {
    display: none;
  }
}

.file-upload-info {
  text-align: center;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .filename {
    font-size: 1.2rem;
    font-weight: bold;
  }

  .upload-btn {
    display: block;
    margin: 0 auto;
  }
}
</style>
