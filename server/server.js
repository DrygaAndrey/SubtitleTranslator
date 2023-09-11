// server/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, parameterLimit: 100000, limit: '50mb' }));
app.use(bodyParser.raw({ type: 'application/octet-stream', limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));

app.use('/api', require('./routes/api')); // Подключение маршрутов

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});