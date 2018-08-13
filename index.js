const fs = require('fs');
const path = require('path');
const https = require('https');
const express = require('express');

require('dotenv').config();

const { NODE_ENV, PORT, CERTS_PATH } = process.env;

const app = express();

app.use('/api', require('./routes/api'));

app.get('/', (req, res) => {
  res.send('primetime-api');
});

// Support HTTPS
let server = null;

if (NODE_ENV === 'production') {
  const options = {
    key: fs.readFileSync(path.resolve(CERTS_PATH, 'privkey.pem')),
    cert: fs.readFileSync(path.resolve(CERTS_PATH, 'cert.pem')),
  };
  server = https.createServer(options, app);
} else {
  server = app;
}

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
