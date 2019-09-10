<template>
  <div>
    <FileInput @populate-words="populateWords" />
    <Wordlist :words="words" />
  </div>
</template>

<script>
import FileInput from './input';
import Wordlist from './wordlist';

export default {
  name: 'Parser',
  components: {
    FileInput,
    Wordlist
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
