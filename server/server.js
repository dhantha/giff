const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const {makeGiff} = require('./makeGiff');

const port = process.env.PORT || 3000;

var app = express();

const publicPath = path.join(__dirname, '../client/public');
app.use(express.static(publicPath)) // serve the static Content

app.use(bodyParser.json());

app.get('/', function(req,res) {
  res.sendFile(publicPath + '/index.html');
});

app.post('api/photo', function(req,res) {

  // create a form object
  var form = new formidable.IncomingForm();
  form.multipart = true;

  // create a temp dir dynamically
  var folderName = new Date().toISOString();
  var giffName = randomstring.generate();
  var folderPath = path.join(__dirname, '/', folderName);

  // upload to the created directory
  form.uploadDir = folderPath;

  form.on('file', function(field, file) {
      fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  // create the giff
  makeGiff(folderPath);

  form.on('end', function() {
      console.log("on end");
  });

  form.on('error', function(err) {
      console.log('An error has occured: \n' + err);
  });

  form.parse(req);

});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
