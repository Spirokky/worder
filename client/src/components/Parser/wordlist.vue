<template>
  <b-container class="words">
    <Card />
  </b-container>
</template>

<script>
import Card from './card';

export default {
  name: 'Wordlist',
  components: {
    Card
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
