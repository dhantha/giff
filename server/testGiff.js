var Jimp = require('jimp');
var Animated_GIF = require('animated_gif');
var getPixels = require('get-pixels')
var GifEncoder = require('gif-encoder');
var gif = new GifEncoder(6000, 4000);
var jimp = require("jimp");
var file = require('fs').createWriteStream('img.gif');


let image1 = '/Users/dgunar872/Documents/Dhantha/Projects/Node/giff/sample/DSC_0004.jpg'
let image2 = '/Users/dgunar872/Documents/Dhantha/Projects/Node/giff/sample/DSC_0005.jpg'

var img = [image1, image2];

// Jimp.read(image1)
//   .then(tpl => Jimp.write())

gif.pipe(file);
gif.setQuality(20);
gif.writeHeader();
gif.setRepeat(0);
gif.setDelay(400);
//gif.start();

// var addToGif = function(images, counter = 0) {
//   //console.log(images);
//   getPixels(images[counter], function(err, pixels) {
//     if(err){throw err}
//     console.log(pixels.data);
//     gif.addFrame(pixels.data);
//     if (counter === images.length - 1) {
//       gif.finish();
//     } else {
//       addToGif(images, ++counter);
//     }
//   })
// }

var addToGif = function(images, counter = 0) {
  //console.log(images);
  jimp.read(images[counter], function(err, image) {
    if(err){throw err}
    gif.read(6000 * 4000);
    console.log(image.bitmap.data);
    gif.addFrame(image.bitmap.data);
    if (counter === images.length - 1) {
      gif.read(6000 * 4000);
      gif.finish();
    } else {
      addToGif(images, ++counter);
    }
  })
}



addToGif(img);
