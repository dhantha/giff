var express = require('express');
var path = require('path');
var formidable = require('formidable');
var fs = require('file-system');
var randomstring = require("randomstring");
var PythonShell = require('python-shell');
var rimraf = require("rimraf");

var app = express();

app.use(express.static('./')); // index.html

// API for uploading the Photos
app.post('/api/photo', function(req, res){
    var form = new formidable.IncomingForm();
    form.multiples = true;

    //console.log(req);
    // create the dir dynamically
    var pathToFolder = new Date().toISOString();
    var gifName = randomstring.generate();

    fs.mkdirSync(pathToFolder,0777);

    form.uploadDir = path.join(__dirname, '/' + pathToFolder);

    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function(field, file) {
        fs.rename(file.path, path.join(form.uploadDir, file.name));
    });

    // log any errors that occur
    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
    });
    var duration = 0.01
    // create the giff
    console.log(duration)

    var options = {
        mode: 'text',
        pythonPath: '/home/vagrant/anaconda3/bin/python', // need to change this path
        pythonOptions: ['-u'],
        scriptPath: './',
        args: [pathToFolder, gifName, duration]
    };

    // call the python shell
    PythonShell.run('Giff.py', options, function (err, results) {
        if (err) throw err;

        // need to work on this sending back logic, it only needs to populate the UI

        var giffImagePath = path.join('/' + pathToFolder + '/' + gifName + '.gif')
        //console.log(giffImagePath)

        //var resolvedPath = path.resolve(giffImagePath);
        //var img = fs.readFileSync(resolvedPath); // read the giff
        console.log("Finish creating the .gif");
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
    });

    // parse the incoming request containing the form data
    form.parse(req);
});

app.listen(8888, function () {
  console.log('Example app listening on port 8888!')
});
