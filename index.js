const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
const path = require('path');

dotenv.config({ path: './config.env' });
const PORT = process.env.PORT || 8000;
require('./database/mongoose');
app.use(express.json());
app.use(cors());
app.use(require('./routes/auth'));

const STATIC = path.resolve(__dirname, './client/build');
const INDEX = path.resolve(STATIC, 'index.html');

app.use('/app', express.static(STATIC));

// All GET request handled by INDEX file
app.get('/app/*', function (req, res) {
  res.sendFile(INDEX);
});

app.listen(PORT);
