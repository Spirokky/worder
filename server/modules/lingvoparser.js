const parseWordList = obj => {
  const result = [];
  result.prefix = obj.Prefix;

  const headings = obj.Headings;

  Object.entries(headings).forEach(val => {
    result.push({
      text: val[1].Heading,
      translation: val[1].Translation,
      soundName: val[1].SoundName
    });
  });

  return result;
};

const parseMinicard = obj => {
  const data = obj.Translation;
  return { heading: data.Heading, translation: data.Translation, soundName: data.SoundName };
};

module.exports = { parseWordList, parseMinicard };
