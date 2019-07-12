<template>
  <div>
    <b-container>
      <p>Worder component</p>
    </b-container>
    <FileInput />
    <Words />
  </div>
</template>

<script>
import FileInput from './file-input';
import Words from './words';

export default {
  components: {
    FileInput,
    Words
  }
};
</script>

<style lang="scss" scoped>
</style>
