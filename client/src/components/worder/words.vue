<template>
  <b-container class="words">
    <b-row class="words-row">
      <!-- TABS -->
      <b-col class="words-col words-list" cols="12" lg="10" offset-lg="1">
        <b-card no-body>
          <b-tabs
            pills
            card
            vertical
            active-nav-item-class="tab-nav-active"
            active-tab-class="tab-item-active"
            content-class="tab-content"
          >
            <b-tab v-for="(value, word, index) in detail" :key="index" :title="word">
              <b-card-title>
                {{word}}
                <span class="sound">
                  <VolumeHigh />
                </span>
              </b-card-title>
              <p>{{ detail[word].card.translation }}</p>
              <ul v-for="(val, item, index) in detail[word].list" :key="index">
                <li>
                  <i>{{val.text}}</i>
                  - {{val.translation}}
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
      detail: {}
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
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
$border-color: #b1b1b1;

.words-row {
  min-height: 50vh;
}

.words-list {
  ul {
    padding: 0;
    list-style: none;
    text-align: right;

    li {
      margin-bottom: 0.3rem;

      span {
        position: relative;

        &:after {
          content: '';
          width: 0%;
          height: 1px;
          background-color: $border-color;
          position: absolute;
          right: 0;
          bottom: -1px;
          transition: all 0.3s ease;
        }

        &:hover {
          cursor: pointer;
          &:after {
            width: 100%;
          }
        }

        &.active {
          &:after {
            width: 100%;
          }
        }
      }
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
