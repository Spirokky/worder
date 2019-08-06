import nltk
import collections
import pandas as pd
import sys
import re

from nltk.corpus import gutenberg, brown, wordnet


def parse_text(textFile):
    text = None

    with open(textFile, 'r') as f:
        text = f.read()

    clean_text = (re.sub('[^a-zA-Z]+', ' ', text.replace('\n', ' '))).lower()
    tokens = nltk.word_tokenize(clean_text)
    long_tokens = [x for x in tokens if len(x) > 2 if wordnet.synsets(x)]

    return long_tokens


def frequency(tokens):
    # how often word appears in the text
    ctr = collections.Counter(tokens)
    ctr_df = pd.DataFrame.from_dict(dict(ctr), orient='index')
    ctr_df.reset_index(inplace=True)
    ctr_df.columns = ['word', 'n']

    # ctr(frequency) from corpus
    news_text = gutenberg.words()
    ctr_df['frequency'] = 0
    fdist = nltk.FreqDist(w.lower() for w in news_text)
    words = list(ctr_df['word'].to_numpy())

    for word in words:
        ctr_df.loc[ctr_df['word'] == word, 'frequency'] = fdist[word]

    # short list of words
    ctr_df_short = ctr_df[(ctr_df['frequency'] > 1) & (
        ctr_df['frequency'] < 10)].sort_values(by='frequency')

    return ctr_df_short[0:15:]


if __name__ == "__main__":
    tokens = parse_text(sys.argv[1])
    df = frequency(tokens)
    sys.stdout.write(df.to_string(columns=['word'], index=False))
