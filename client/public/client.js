$(document).ready(function($){
  $('#download').hide();
  $('#progress').hide();

  var delay = 50;
  var width = $('#progressBar')[0].style.width;
  $('.dial').knob({
        'release' : function (v) {
          delay = v;
        }
    });

  $('#uploadForm').on('submit', function(e){
    e.preventDefault();
    $('#progress').show();

    frame();
    //get the input files
    var input = $('#uploadPhotos')[0].files
    // start display the progress bar
    getValidFileList(input, onDone);
  });

  function frame(){
    var progressBar = $('#progressBar')[0];
    for(var i = 0; i < 25; i++){
      width++;
      progressBar.style.width = width + '%'
      // if done loading set the width to 0
      if(width == 100){
         //$('#progress').hide();
         width = 0;
      }
    }
  }

  function onDone(fileList){
    // get the 1st image width and height
    // end display the progress bar
    frame();
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
      frame();
      var srcURL = URL.createObjectURL(blob);
      $('#progress').hide();
      $('#download').show();
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
        if(!--count){
          frame();
          callback(fileList);
        }
      }
    }
  };
});
