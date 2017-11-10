var express = require('express');
//var multer = require('multer');
var path = require('path');
var formidable = require('formidable');
var fs = require('file-system');
var randomstring = require("randomstring");
var PythonShell = require('python-shell');

var app = express()

app.use(express.static('./'))

app.post('/api/photo', function(req, res){
    var form = new formidable.IncomingForm();
    form.multiples = true;
    
    // need to create the dir dynamically
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
    
    // create the giff
    //var spawn = require("child_process").spawn;
    //var process = spawn('python',["./Giff.py", pathToFolder, gifName]);
    // need a call back here to send the giff   

    var options = {
        mode: 'text',
        pythonPath: '/home/dhantha/anaconda/envs/py36/bin/python',
        pythonOptions: ['-u'],
        scriptPath: './',
        args: [pathToFolder, gifName]
    };
 
    PythonShell.run('Giff.py', options, function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution 
        //console.log('results: %j', results);
        var giffImagePath = path.join('./' + pathToFolder + '/' + gifName + '.gif')
        var resolvedPath = path.resolve(giffImagePath);
        //res.sendFile(resolvedPath);
        res.end(resolvedPath);
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

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});