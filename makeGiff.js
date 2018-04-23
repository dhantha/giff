var GIFEncoder = require('gifencoder');
var jimp = require("jimp");
var fs = require("fs");
var async = require("async");

var encoder = new GIFEncoder(854, 480);
encoder.createReadStream().pipe(fs.createWriteStream('myanimated.gif'));

encoder.start();
encoder.setRepeat(-1);
encoder.setDelay(500); // delay in ms
encoder.setQuality(10);

var testFolder = "./sample";
var pathToImages = [];

// JS calls are async

fs.readdir(testFolder, function(err,files){
  files.forEach(function(file) {
    var path = testFolder + "/" + file;
    console.log(path);
    pathToImages.push(path);
    //console.log(pathToImages);
  });
});

console.log(pathToImages);

/*
pathToImages.forEach(function(imagePath){
  jimp.read(path, function(err, image){
    if (err) throw err;
    encoder.addFrame(image.bitmap.data);
  });
});
*
//console.log("here");
encoder.finish();
