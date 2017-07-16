const express = require('express');
const morgan = require('morgan');
const app = express();
require('dotenv').config();

app.use('/css', express.static('public/css'));
app.use('/js', express.static('public/js'));
app.use('/images', express.static('public/images'));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/inventory.html`);
});

app.get('/addItem', (req, res) => {
  res.sendFile(`${__dirname}/addItem.html`);
});

app.get('/lists', (req, res) => {
  res.sendFile(`${__dirname}/lists.html`);
});

app.get('/inventory', (req, res) => {
  res.redirect('/');
});

let server;

function runServer(port) {
  return new Promise((resolve, reject) => {
    server = app.listen(port || 3000, () => {
      console.log(`server listening on port: ${port}`);
      return resolve();
    })
    .on('error', (err) => {
      reject();
    });
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log(`Closing server`);
    server.close((err) => {
      if (err) return reject(err);

      resolve();
    });
  });
}

// if file is run directly by calling node server js
// we call runServer
if (require.main === module) {
  runServer(process.env.PORT).catch((err) => {
    console.error('error:', err);
  });
}

module.exports = { app, runServer, closeServer };
