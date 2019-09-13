<template>
  <div>
    <FileInput />
    <Wordlist />
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
  }
};
</script>

<style lang="scss" scoped>
.worder-heading {
  text-align: center;
  margin-bottom: 3rem;
}
</style>
