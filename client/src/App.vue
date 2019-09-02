<template>
  <div id="app">
    <header>
      <b-container>
        <b-nav class="navbar" align="center">
          <b-nav-item target="_blank" href="https://github.com/Spirokky/worder">
            <GithubCircle />
          </b-nav-item>
          <b-nav-item v-b-modal.modal-1 href="#">
            <InformationOutline />
          </b-nav-item>
        </b-nav>
      </b-container>
      <b-modal id="modal-1" size="lg" title="Worder" hide-footer>
        <p
          class="my-4"
        >Worder is the tool that helps you to watch the media without subtitles. It takes subtitles file and analyze text to extract most rarely using words from it and translate them.</p>

        <p>
          <a href="https://developers.lingvolive.com">Translated by Lingvo</a>
        </p>
      </b-modal>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
import GithubCircle from 'vue-material-design-icons/GithubCircle.vue';
import InformationOutline from 'vue-material-design-icons/InformationOutline.vue';

import './assets/scss/main.scss';

export default {
  name: 'app',
  components: {
    GithubCircle,
    InformationOutline
  }
};
</script>

<style lang="scss" scopped>
header {
  margin-bottom: 2rem;
  .navbar {
    padding: 0;

    .nav-item {
      .nav-link {
        font-size: 1.5rem;
        color: #000;
        transition: all 0.2s ease;
        opacity: 0.6;

        &:hover {
          opacity: 1;
        }
      }
    }
  }
}
</style>
