const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const subtitleData = req.body.file;
    let srtContent = '';

    subtitleData.forEach((subtitle, index) => {
        const { start, end, translatedText } = subtitle.data;
        srtContent += `${index + 1}\n`;
        srtContent += `${formatTime(start)} --> ${formatTime(end)}\n`;
        srtContent += `${translatedText}\n\n`;
    });
    console.log('ok3');
    res.setHeader('Content-Disposition', 'attachment; filename=subtitles.srt');
    res.setHeader('Content-Type', 'text/plain');
    res.send(srtContent);
});

function formatTime(milliseconds) {
    const date = new Date(milliseconds);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    const millisecondsStr = date.getUTCMilliseconds().toString().padStart(3, '0');
    return `${hours}:${minutes}:${seconds},${millisecondsStr}`;
}

module.exports = router;