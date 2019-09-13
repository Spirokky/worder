<template>
  <b-row class="words-row">
    <b-col class="words-col words-list" cols="12" lg="10" offset-lg="1">
      <b-card no-body class="words-card" :class="{visible: allWords.success}">
        <b-tabs
          pills
          card
          vertical
          active-nav-item-class="word-item-active"
          active-tab-class="word-tab-active"
          content-class="words-tabs"
          nav-wrapper-class="words-nav"
        >
          <b-tab v-for="(word, index) in allWords.words" :key="index" :title="word">
            <div v-if="content[word]">
              <section class="meaning" v-for="(value, key, index) in content[word]" :key="index">
                <h4 class="meaning__heading">
                  <VolumeHigh @click="playSound(value.meanings[0].soundUrl)" />
                  {{value.meanings[0].text}}
                  <span
                    class="meaning__transcription"
                  >[{{value.meanings[0].transcription}}]</span>
                </h4>
                <ul
                  v-for="(meaning, key, index) in value.meanings"
                  class="meaning__list"
                  :key="index"
                >
                  <li>
                    <p>
                      <span class="meaning__index">{{key+1}})</span>
                      <span class="meaning__partofspeech">({{meaning.partOfSpeechCode}})</span>
                      <span class="meaning__prefix">{{meaning.prefix || ""}}&nbsp;</span>
                      <span class="meaning__text">{{meaning.text}}</span>

                      <span class="meaning__dash">&#8211;</span>
                      <span
                        class="meaning__translation"
                      >{{meaning.translation.text}} {{meaning.translation.note}}</span>
                    </p>
                    <p class="meaning__text">{{meaning.definition.text}}</p>
                    <ul class="meaning__list">
                      <li
                        v-for="(example, index) in meaning.examples"
                        :key="index"
                        class="meaning__example"
                        @click="playSound(example.soundUrl)"
                      >
                        <span class="meaning__index">{{index+1}})</span>
                        {{example.text}}
                      </li>
                    </ul>
                  </li>
                </ul>
              </section>
            </div>
            <div v-else>
              <b-spinner
                style="width: 3rem; height: 3rem; display: block; margin: 0 auto;"
                variant="primary"
                label="Spinning"
              ></b-spinner>
            </div>
          </b-tab>
        </b-tabs>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import axios from 'axios';
import VolumeHigh from 'vue-material-design-icons/VolumeHigh';
import { mapGetters } from 'vuex';

export default {
  name: 'Card',
  components: {
    VolumeHigh
  },
  data() {
    return {
      content: {}
    };
  },
  methods: {
    fetchWord: word => {
      return axios
        .get(`/api/dictionary/get/${word}`)
        .then(res => res.data)
        .catch(err => err);
    },
    playSound: src => {
      const audio = new Audio(`https:${src}`);
      audio.play();
    }
  },
  computed: mapGetters(['allWords']),
  watch: {
    async allWords(update) {
      update.words.map(async word => {
        if (!this.content[word]) {
          const data = await this.fetchWord(word);
          this.content[word] = data;
          this.$forceUpdate();
        }
      });
    }
  }
};
</script>

<style lang="scss">
.meaning__heading {
  font-size: 1.4rem;
  color: black;
  opacity: 0.8;
  margin: 0;
  margin-bottom: 0.5rem;
}

.meaning__transcription {
  color: blue;
  opacity: 0.8;
  font-size: 1rem;
}

.meaning__list {
  list-style: none;
  margin: 0;
  padding: 0;
  padding-left: 1rem;
  margin-bottom: 1rem;

  p {
    font-weight: 500;
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
}

.meaning__index {
  color: gray;
  margin-right: 2px;
}

.meaning__prefix {
}

.meaning__text {
}

.meaning__partofspeech {
  color: gray;
  margin: 0 4px;
}

.meaning__dash {
  margin: 0 4px;
}

.meaning__translation {
}

.meaning__example {
  font-size: 0.9rem;
  font-weight: 400;
}
</style>