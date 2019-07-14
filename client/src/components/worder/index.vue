<template>
  <div>
    <b-container>
      <h2 class="worder-heading">
        Upload text file.
        <br />Extract rare english words.
      </h2>
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
.worder-heading {
  text-align: center;
  margin-bottom: 3rem;
}
</style>
