const path = require('path');
const https = require('https');
const express = require('express');

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const CERTS_PATH = process.env.CERT_PATH;

const app = express();

app.use('/api', require('./routes/api'));

app.get('/', (req, res) => {
  res.send('primetime-api');
});

// Support HTTPS
let server = null;

if (NODE_ENV === 'production') {
  const options = {
    key: path.resolve(CERTS_PATH, 'privkey.pem'),
    cert: path.resolve(CERTS_PATH, 'cert.pem'),
  };
  server = https.createServer(options, app);
} else {
  server = app;
}

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
