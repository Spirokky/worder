<template>
  <div id="app">
    <Header />
    <Home />
  </div>
</template>

<script>
import Header from './components/Header/Header.vue';
import Home from './components/Home/Home.vue';

import './assets/style.scss';

export default {
  name: 'app',
  components: {
    Header,
    Home
  }
};
</script>

<style></style>
