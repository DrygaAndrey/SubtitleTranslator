const express = require('express');
const router = express.Router();
const axios = require('axios');
const sbd = require('sbd');

// Функция для выполнения запроса на перевод с повторными попытками
async function translateWithRetry(sentence, sourceLanguage, targetLanguage, maxRetries = 300) {
  let retries = 0;

  while (retries < maxRetries) {
    try {
      const googleTranslateURL = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLanguage}&tl=${targetLanguage}&dt=t&q=${sentence}`;
      const response = await axios.get(googleTranslateURL);
      return response.data[0][0][0];
    } catch (error) {
      if (error.code === 'ECONNRESET') {
        // Обработка ошибки ECONNRESET (разрыв соединения)
        console.error('Соединение было разорвано, повторная попытка...');
        retries++;
        continue;
      }

      console.error('Ошибка при переводе:', error);
      retries++;
    }
  }

  throw new Error('Не удалось выполнить перевод после нескольких попыток');
}

router.post('', async (req, res) => {
  try {
    const sourceLanguage = req.body.originalLanguage;
    const targetLanguage = req.body.languageToBeTranslated;
    const file = req.body.file;

    const translatedFiles = await Promise.all(file.map(async (item) => {
      try {
        // Используем библиотеку sbd для разделения текста на предложения
        const sentences = sbd.sentences(item.data.text, { newline_boundaries: true });

        // Переводим каждое предложение с повторными попытками
        const translatedSentences = await Promise.all(sentences.map(async (sentence) => {
          const translatedSentence = await translateWithRetry(sentence, sourceLanguage, targetLanguage);
          return translatedSentence;
        }));

        // Объединяем переведенные предложения обратно в текст
        item.data.translatedText = translatedSentences.join(' ');

        return item;
      } catch (error) {
        console.error('Ошибка при переводе:', error);
        return null;
      }
    }));

    res.json({ translatedFiles });
  } catch (error) {
    console.error('Ошибка при переводе:', error);
    res.status(500).json({ error: 'Ошибка при переводе' });
  }
});

module.exports = router;