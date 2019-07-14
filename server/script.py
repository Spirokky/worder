import nltk
import collections
import pandas as pd
import re

from nltk.corpus import gutenberg, brown
from py_translator import Translator


translator = Translator()
#nltk.download() #if u need to download smth for nltk


def parse_subtitles(subtitles):
  text = None
  
  with open(subtitles, 'r') as f:
     text = f.read()

  clean_text = (re.sub('[^a-zA-Z]+', ' ', text.replace('\n', ' '))).lower()
  tokens = nltk.word_tokenize(clean_text)
  long_tokens = [x for x in tokens if len(x) > 2]

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

  # names    
  names = None
  with open('names.txt', 'r') as f:
    names = f.read().split('\n')
    names.extend(['Michael', 'Scott', 'Dwight', 'Schrute', 'Jim', 'Halpert', 'Pam', 'Beesly', 'Ryan', 'Howard', 
            'Andy', 'Bernard', 'Robert', 'California', 'Darryl', 'Philbin', 'Todd', 'Packer', 'Adolf', 'Hitler'])
    names = [x.lower() for x in names]

  # short list of words
  ctr_df_short = ctr_df[(ctr_df['frequency'] > 1) & (ctr_df['frequency'] < 10)
              & (~ctr_df['word'].isin(names))]\
      .sort_values(by='frequency')
  
  return ctr_df_short


def translate(df):
  df['translation'] = ' '
  df['translation'] = df['word'].apply(lambda x: translator.translate(text=x, dest='ru', src='en').text)
  return df


def save_to_csv(df, filename="words.csv", encoding="utf-16"):
  df[['word', 'translation', 'frequency']].to_csv(filename, encoding=encoding, index=False, sep='\t')


if __name__ == "__main__":
  tokens = parse_subtitles('got_s01e01.srt')
  df = frequency(tokens)
  df = translate(df)
  save_to_csv(df)
