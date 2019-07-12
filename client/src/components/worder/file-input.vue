<template>
  <b-container>
    <div class="file-input-box-wrapper">
      <div class="file-input-box">
        <FileIcon class="file-upload-icon" title="this is an icon!" :size="48" />
      </div>
      <input id="file-input" type="file" />
    </div>
  </b-container>
</template>

<script>
import FileIcon from 'vue-material-design-icons/FileUploadOutline.vue';

export default {
  components: {
    FileIcon
  },

  data() {
    return {
      file: null
    };
  }
};
</script>

<style lang="scss">
$file-box-height: 250px;
$file-icon-size: 5rem;

.file-input-box-wrapper {
  display: flex;
  width: 250px;
  height: $file-box-height;
  background-color: rgba(193, 193, 193, 0.4);
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 5rem;
  padding: 1.5rem;
  border-radius: 100%;
  position: relative;

  .file-input-box {
    width: 100%;
    height: 100%;
    background-color: rgba(193, 193, 193, 0.8);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: inherit;

    .file-upload-icon {
      width: $file-icon-size;
      height: $file-icon-size;
      &:hover {
        cursor: pointer;
      }
      .material-design-icon__svg {
        width: $file-icon-size;
        height: $file-icon-size;
        bottom: 0;
      }
    }
  }

  #file-input {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    border-radius: inherit;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
