$(document).ready(function($){
  var delay = 50;
  $(".dial").knob({
        'release' : function (v) {
          delay = v;
        }
    });

  $('#uploadForm').on('submit', function(e){
    e.preventDefault();
    var input = $('#uploadPhotos')[0].files
    console.log(input);
    getValidFileList(input, onDone);
  });

  function onDone(fileList){
    // get the 1st image width and height
    console.log(delay);
    var img = fileList[0]
    var imgHeight = img.height;
    var imgWidth = img.width;

    var gif = new GIF({
      workers: 2,
      quality: 10,
      width: imgWidth,
      height: imgHeight
    });
    console.log(fileList);
    for(var i = 0; i < fileList.length; i++){
      gif.addFrame(fileList[i], {delay: delay})
    }
    gif.on('finished', function(blob){
      var srcURL = URL.createObjectURL(blob);
      $('#drawGiff').attr('src', srcURL);
      $('#download').attr('href', srcURL);
    });
    gif.render();
  }

  function getValidFileList(files, callback){
    var count = files.length;
    var fileList = []

    for(var i = 0; i < count; i++){
      loadFile(files[i]);
    }

    function loadFile(file){
      var reader = new FileReader();
      reader.onload = function(event){
        loadImageFile(event);
      };
      reader.readAsDataURL(file);
    }

    function loadImageFile(imageFile){
      var image = new Image();
      image.src = imageFile.target.result;
      image.onload = function(){
        fileList.push(this);
        if(!--count) callback(fileList);
      }
    }
  };
});
