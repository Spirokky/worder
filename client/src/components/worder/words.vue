<template>
  <b-container class="words">
    <b-row class="words-row">
      <!-- TABS -->
      <b-col class="words-col words-list" cols="12" lg="10" offset-lg="1">
        <b-card no-body class="words-card" :class="{visible: isVisible}">
          <b-tabs
            pills
            card
            vertical
            active-nav-item-class="word-item-active"
            active-tab-class="word-tab-active"
            content-class="words-tabs"
            nav-wrapper-class="words-nav"
          >
            <b-tab v-for="(value, word, index) in detail" :key="index" :title="word">
              <b-card-title class="word-heading">
                {{word}}
                <div class="icon-sound">
                  <VolumeHigh />
                </div>
              </b-card-title>
              <p class="word-main-translation">{{ detail[word].card.translation }}</p>
              <ul class="wordlist">
                <li
                  v-for="(val, item, index) in detail[word].list"
                  :key="index"
                  class="wordlist-item"
                >
                  <span class="wordlist-accent">{{val.text}}</span>
                  <p class="wordlist-translation">{{val.translation}}</p>
                </li>
              </ul>
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios';
import VolumeHigh from 'vue-material-design-icons/VolumeHigh.vue';

export default {
  name: 'Words',
  components: {
    VolumeHigh
  },
  data() {
    return {
      detailText: null,
      detailLoading: false,
      active: false,
      detail: {},
      isVisible: false
    };
  },
  props: ['words'],
  filters: {
    lowercase: function(value) {
      if (!value) return '';
      value = value.toString();
      return value.toLowerCase();
    }
  },
  methods: {
    displayWordDetail: function(word) {
      this.detailText = this.detail[word];
    },
    handleWordClick: function(word) {
      this.displayWordDetail(word);
    },
    getMinicard(word) {
      return axios
        .get(`/api/lingvo/minicard/${word}`)
        .then(res => res.data)
        .then(res => {
          return {
            heading: res.body.heading,
            translation: res.body.translation,
            sound: res.body.soundName
          };
        })
        .catch(err => err);
    },
    getWordList(word) {
      return axios
        .get(`/api/lingvo/wordlist/${word}`)
        .then(res => res.data)
        .then(res => res.body)
        .catch(err => err);
    },
    createDetail(word) {
      if (!this.detail[word]) this.detail[word] = {};
    }
  },
  watch: {
    words: function(upd) {
      upd.forEach(async val => {
        this.createDetail(val);
        this.detail[val].card = await this.getMinicard(val);
        this.detail[val].list = await this.getWordList(val);
        this.isVisible = true;
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style lang="scss">
$border-color: #b1b1b1;

.words-list {
  max-height: 95vh;
  margin-bottom: 1rem;
  overflow: hidden;

  .words-card {
    border-radius: 0;
    display: none;
    max-height: inherit;

    &.visible {
      display: block;
    }

    .word-heading {
      font-size: 2rem;

      .icon-sound {
        color: rgba(0, 0, 0, 0.54);
        cursor: pointer;
        transition: all 0.2s ease;
        display: inline-block;

        span > svg {
          bottom: -7px;
        }

        &:hover,
        &:focus {
          color: #000;
        }
      }
    }

    .tabs {
      max-height: inherit;
    }

    .words-nav {
      max-height: inherit;
      overflow: hidden;

      ul {
        display: block;
        overflow-y: scroll;
      }
    }

    .words-tabs {
      max-height: inherit;
      overflow-y: scroll;
    }

    .word-main-translation {
      font-size: 1.1rem;
      padding-bottom: 1.5rem;
    }

    .wordlist {
      list-style: none;
      padding-left: 0;
      color: #282828;

      .wordlist-accent {
        font-weight: 600;
        color: rgba(0, 0, 0, 0.94);
      }

      .wordlist-translation {
        font-weight: 400;
        color: rgba(0, 0, 0, 0.54);
      }
    }

    .word-item-active {
    }

    .word-tab-active {
    }

    .words-tabs {
    }
  }
}

.word-detail {
  border-left: 1px solid transparent;
  transition: all 1s ease;

  &.bordered {
    border-left: 1px solid $border-color;
  }

  .detail-word-loading {
    display: block;
    margin: 3rem auto;
  }
}
</style>
