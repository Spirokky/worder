<template>
  <b-container class="words">
    <Card :wordlist="wordlist" />

    <!-- temp shit -->
    <!-- <div>
      <input v-model="skyengword" type="text" />
      <button @click="skyeng">push {{skyengword}}</button>
    </div>-->
    <!-- temp shit end -->
  </b-container>
</template>

<script>
import axios from 'axios';

import Card from './card';

export default {
  name: 'Wordlist',
  components: {
    Card
  },
  data() {
    return {
      skyresult: null,
      skyengword: null,
      detailText: null,
      detailLoading: false,
      active: false,
      detail: {},
      isVisible: false,
      wordlist: ['sky', 'abuse']
    };
  },
  props: ['words'],
  methods: {
    displayWordDetail: function(word) {
      this.detailText = this.detail[word];
    },
    handleWordClick: function(word) {
      this.displayWordDetail(word);
    },
    getSkyeng(word) {
      return axios
        .get(`/api/dictionary/get/${word}`)
        .then(res => res.data)
        .then(res => res)
        .catch(err => err);
    },
    skyeng() {
      this.wordlist.push(this.skyengword);
    }
    // async insertWord(word) {
    //   const card = await this.getMinicard(word);
    //   const list = await this.getWordList(word);
    //   const detail = { ...this.detail[word], card, list };
    //   this.detail[word] = detail;
    //   this.isVisible = true;
    //   this.$forceUpdate();
    //   return detail;
    // }
  },
  watch: {
    // words: async function(upd) {
    //   await Promise.all(
    //     upd.map(async val => {
    //       const detail = await this.insertWord(val);
    //     })
    //   );
    // }
  }
};
</script>

<style lang="scss">
$border-color: #b1b1b1;

.words-list {
  margin-bottom: 1rem;

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
