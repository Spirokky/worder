<template>
  <b-container class="words">
    <b-row class="words-row">
      <b-col class="words-col words-list" cols="2" md="2">
        <ul>
          <li v-for="(word, index) in words" :key="index">
            <span v-on:click="handleWordClick(word)">{{word | lowercase}}</span>
          </li>
        </ul>
      </b-col>

      <b-col class="words-col word-detail" :class="detailText ? 'bordered' : null" cols="10" md="8">
        <div>{{detailText}}</div>
      </b-col>

      <b-col class="words-col d-none d-md-block" md="2">misc</b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'Words',
  data() {
    return {
      words: ['hello', 'world'],
      detailText: '',
      detail: {
        hello: 'detail description for hello',
        world: 'detail description for world'
      }
    };
  },
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
}
</style>
