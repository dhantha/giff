var GIFEncoder = require('gif-encoder');
var Jimp = require("jimp");
var fs = require("fs");
var path = require('path');

var encoder = new GIFEncoder(6000, 4000);
encoder.pipe(fs.createWriteStream('myanimated.gif'));
encoder.setRepeat(0);
encoder.setDelay(500); // delay in ms
encoder.setQuality(10);
encoder.writeHeader();

const getFiles =  function(filePath){
  var pathToImages = [];
  return new Promise(function(resolve, reject){
    fs.readdir(filePath, function(err, files){
      files.forEach(function(file){
        var filePath = path.join(testFolder, file);
        pathToImages.push(filePath);
      });
      console.log("resolving the Promise for getFiles");
      resolve(pathToImages);
    });
  });
};

var addToGif = function(images, counter = 0) {
  return new Promise(function(resolve, reject) {
    Jimp.read(images[counter], function(err, image) {
      if(err){throw err}
      encoder.read(6000 * 4000);
      console.log(image.bitmap.data);
      encoder.addFrame(image.bitmap.data);
      if (counter === images.length - 1) {
        encoder.read(6000 * 4000);
        encoder.finish();
      } else {
        addToGif(images, ++counter);
      }
    });
  });
};

const makeGiff = async function(filePath){
  var pathToImages = await getFiles(filePath);
  var giff = await addToGif(pathToImages);
  encoder.finish();
};


module.export = {makeGiff}
