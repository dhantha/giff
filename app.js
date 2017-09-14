var express = require('express');
//var multer = require('multer');
var path = require('path');
var formidable = require('formidable');
var fs = require('file-system');

var app = express()

app.use(express.static('./'))

app.post('/api/photo', function(req, res){
    var form = new formidable.IncomingForm();
    form.multiples = true;
    
    // need to create the dir dynamically
    var pathToFolder = new Date().toISOString()
    
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
    var spawn = require("child_process").spawn;
    var process = spawn('python',["./Giff.py", pathToFolder, pathToFolder]);
                                  
                                  
    form.on('end', function() {
        res.end('success');
    });

    // parse the incoming request containing the form data
    form.parse(req);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});