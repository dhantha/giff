const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

var app = express();

const publicPath = path.join(__dirname, '../client/public');
app.use(express.static(publicPath)) // serve the static Content

app.use(bodyParser.json());

app.get('/', function(req,res) {
  res.sendFile(publicPath + '/index.html');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
