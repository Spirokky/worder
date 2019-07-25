<template>
  <div>
    <FileInput @populate-words="populateWords" />
    <Words :words="words" />
  </div>
</template>

<script>
import FileInput from './file-input';
import Words from './words';

export default {
  components: {
    FileInput,
    Words
  },
  data() {
    return {
      words: null
    };
  },
  methods: {
    populateWords(words) {
      this.words = words;
    }
  }
};
</script>

<style lang="scss" scoped>
.worder-heading {
  text-align: center;
  margin-bottom: 3rem;
}
</style>
