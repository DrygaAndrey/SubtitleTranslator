const express = require('express');
const router = express.Router();
const axios = require('axios');
const sbd = require('sbd');

async function translateWithRetry(sentence, sourceLanguage, targetLanguage, maxRetries = 300) {
  let retries = 0;

  while (retries < maxRetries) {
    try {
      const googleTranslateURL = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLanguage}&tl=${targetLanguage}&dt=t&q=${sentence}`;
      const response = await axios.get(googleTranslateURL);
      return response.data[0][0][0];
    } catch (error) {
      if (error.code === 'ECONNRESET') {
        console.error('Connection has broken, trying again...');
        retries++;
        continue;
      }

      console.error('Translate error', error);
      retries++;
    }
  }

  throw new Error('Unable to translate after a lot of tries');
}

router.post('', async (req, res) => {
  try {
    const sourceLanguage = req.body.originalLanguage;
    const targetLanguage = req.body.languageToBeTranslated;
    const file = req.body.file;

    const translatedFiles = await Promise.all(file.map(async (item) => {
      try {
        const sentences = sbd.sentences(item.data.text, { newline_boundaries: true });

        const translatedSentences = await Promise.all(sentences.map(async (sentence) => {
          const translatedSentence = await translateWithRetry(sentence, sourceLanguage, targetLanguage);
          return translatedSentence;
        }));

        item.data.translatedText = translatedSentences.join(' ');

        return item;
      } catch (error) {
        console.error('Translate error:', error);
        return null;
      }
    }));

    res.json({ translatedFiles });
  } catch (error) {
    console.error('Translate error:', error);
    res.status(500).json({ error: 'Translate error' });
  }
});

module.exports = router;