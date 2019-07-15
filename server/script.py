import nltk
import collections
import pandas as pd
import sys
import re

from nltk.corpus import gutenberg, brown, wordnet
from py_translator import Translator


translator = Translator()


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
    words = list(ctr_df['word'].get_values())

    for word in words:
        ctr_df.loc[ctr_df['word'] == word, 'frequency'] = fdist[word]

    # short list of words
    ctr_df_short = ctr_df[(ctr_df['frequency'] > 1) & (
        ctr_df['frequency'] < 10)].sort_values(by='frequency')

    # for i, row in ctr_df.iterrows():
    #     if row['frequency'] > 1 & row['frequency'] < 10:
    #         print(row['word'])

    return ctr_df_short


def translate(df):
    df['translation'] = ' '
    df['translation'] = df['word'].apply(
        lambda x: translator.translate(text=x, dest='ru', src='en').text)
    return df


def save_to_csv(df, filename="words.csv", encoding="utf-16"):
    df[['word', 'translation', 'frequency']].to_csv(
        filename, encoding=encoding, index=False, sep='\t')


if __name__ == "__main__":
    tokens = parse_text(sys.argv[1])
    df = frequency(tokens)
    sys.stdout.write(df.to_string(columns=['word'], index=False))
    # df = translate(df)
    # save_to_csv(df)
