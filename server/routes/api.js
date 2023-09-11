// server/routes/api.js
const express = require('express');
const router = express.Router();
const uploadRouter = require('./uploadRouter'); 
const translateRouter = require('./translateRouter');
const downloadRouter = require('./downloadRouter')



router.use('/upload', uploadRouter);
router.use('/translate', translateRouter);
router.use('/download', downloadRouter);

module.exports = router;

