const express = require('express');
const path = require('path');
const formidable = require('formidable');
const fs = require('file-system');
const randomstring = require("randomstring");
const PythonShell = require('python-shell');
const bodyParser = require("body-parser");
const util = require('util');
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

var app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
//var urlencodedParser = bodyParser.urlencoded({extended: false});

// set the public directory
app.use(express.static('../client/public')); // index.html

// global var
var pythonPath = '~/anaconda2/bin/python';

app.get('/', function(req, res) {
  res.sendFile("../client/public/index.html");
});


// API for uploading the Photos
app.post('/api/photo', function(req, res){

    util.log(util.inspect(req.files));
    var form = new formidable.IncomingForm();
    form.multiples = true;

    //console.log(form);

    // create the dir dynamically
    var pathToFolder = new Date().toISOString();
    var gifName = randomstring.generate();

    fs.mkdirSync(pathToFolder,0777);

    // upload to the directory
    form.uploadDir = path.join(__dirname, '/' + pathToFolder);

    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function(field, file) {
        fs.rename(file.path, path.join(form.uploadDir, file.name));
    });


    var duration = 0.25 // need to set the duration dynamically
    // create the giff
    console.log(pathToFolder);
    console.log(gifName);
    console.log(duration);

    var options = {
        mode: 'text',
        pythonPath: pythonPath, // need to change this path
        pythonOptions: ['-u'],
        scriptPath: './',
        args: [pathToFolder, gifName, duration]
    };

    // call the python shell
    PythonShell.run('Giff.py', options, function (err, results) {
        if (err) throw err;

        // need to work on this sending back logic, it only needs to populate the UI
        var giffImagePath = path.join('/' + pathToFolder + '/' + gifName + '.gif')

        //var resolvedPath = path.resolve(giffImagePath);
        //var img = fs.readFileSync(resolvedPath); // read the giff
        //console.log("Finish creating the .gif");
        //console.log(resolvedPath);
        //res.writeHead(200, {'Content-Type': 'image/gif' });
        //res.end(img, 'binary');

        //res.writeHead(200);
        res.status(200).send(giffImagePath);

        //res.sendFile(resolvedPath);
        //res.sendFile(resolvedPath,{ 'Content-Type': 'image/gif' }, 200);
        //rimraf(pathToFolder, function(){
        //  console.log("deleted the directory");
        //});
    });


    form.on('end', function() {
        //res.end('success');
        //var giffImagePath = path.join('./' + pathToFolder + '/' + gifName + '.gif')
        //var resolvedPath = path.resolve(giffImagePath);
        //res.sendFile(resolvedPath);
        console.log("on end");
    });

    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
    });

    // parse the incoming request containing the form data
    form.parse(req);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
