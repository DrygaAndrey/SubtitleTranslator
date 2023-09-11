const express = require('express');
const router = express.Router();
const { parseSync } = require('subtitle');
const iconv = require('iconv-lite');
const jschardet = require('jschardet');

router.post('', (req, res) => {
    const subtitleFile = req.body;

    if (!subtitleFile) {
        return res.status(400).json({ error: 'No subtitle file provided' });
    }

    const result = jschardet.detect(subtitleFile);
    const detectedEncoding = result.encoding;

    const subtitleTextUtf8 = iconv.decode(subtitleFile, detectedEncoding);

    const subtitleText = subtitleTextUtf8.toString('utf-8');
    const parsedSubtitles = parseSync(subtitleText);

    return res.status(200).json(parsedSubtitles);
});

module.exports = router;