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
              <!-- <pre>{{ JSON.stringify(value, null, 4) }}</pre> -->
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
      <!-- <b-col class="words-col words-list" cols="2" md="2">
        <ul>
          <li v-for="(word, index) in words" :key="index">
            <span v-on:click="handleWordClick(word)">{{word | lowercase}}</span>
          </li>
        </ul>
      </b-col>

      <b-col class="words-col word-detail" :class="{active: 'bordered'}" cols="10" md="8">
        <b-spinner v-if="detailLoading" label="Loading..." class="detail-word-loading"></b-spinner>
        <div></div>
      </b-col>-->
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

<style lang="scss" scoped>
$border-color: #b1b1b1;

.words-row {
  // min-height: 50vh;
}

.words-list {
  .words-card {
    border-radius: 0;
    display: none;

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
