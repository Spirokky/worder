<template>
  <div id="app">
    <Header class="header" />
    <Home />
  </div>
</template>

<script>
import Header from './components/header/header.vue';
import Home from './components/home/home.vue';

import './assets/scss/main.scss';

export default {
  name: 'app',
  components: {
    Header,
    Home
  }
};
</script>
