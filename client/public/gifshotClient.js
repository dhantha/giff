$(document).ready(function($){
  $('#btnSubmit').on('click', function(e){
    e.preventDefault();

    // select the mode
    if($('#mode').val() == 'Photos'){
      var input = $('#uploadPhotos')[0].files;
      var params = {
        files : $('#uploadPhotos')[0].files,
        width : $("#gifWidth").val(),
        height : $("#gifHeight").val(),
        interval : $("#interval").val(),
        gifText : $("#gifText").val(),
        fontSize : $("#fontSize").val(),
        fontFamily : $("#fontFamily").val(),
        fontColor : $("#fontColor").val(),
        textAlign : $("#textAlign").val(),
        textBaseline : $("#textBaseline").val()
      }
      getValidFileList(params,createPhotoGiff);
    }
    else if($('#mode').val() == 'Webcam'){
      var params = {
        gifWidth: 200,
        gifHeight: 200,
        interval: 0.1,
        numFrames: 10,
        frameDuration: 1,
        fontWeight: 'normal',
        fontSize: '16px',
        fontFamily: 'sans-serif',
        fontColor: '#ffffff',
        textAlign: 'center',
        textBaseline: 'bottom',
        sampleInterval: 10,
        numWorkers: 2
      }
      createWebcamGiff(params);
    }
  });

  // callback function to create gifs
  function createPhotoGiff(params){
    gifshot.createGIF({
      gifWidth: params.width || 400,
      gifHeight: params.height || 400,
      images: params.fileList,
      filter: 'aa',
      interval: params.interval || 0.5,
      numFrames: 2,
      frameDuration: 1,
      text: params.gifText,
      fontWeight: 'normal',
      fontSize: params.fontSize + 'px' || '16px',
      fontFamily: params.fontFamily || 'sans-serif',
      fontColor: params.fontColor || '#ffffff',
      textAlign: params.textAlign || 'center',
      textBaseline: 'bottom',
      sampleInterval: 10,
      numWorkers: 2
  }, function (obj) {
      if (!obj.error) {
          var image = obj.image
          $('#drawGiff').attr('src', image);
          $('#download').attr('download', image);
      }
    });
  };

  function createWebcamGiff(params){
    gifshot.createGIF(params,
      function(obj){
        if(!obj.error){
          var image = obj.image;
          $('#drawGiff').attr('src', image);
          $('#download').attr('download', image);
        }
      });
  };

  function getValidFileList(params, callback){
    var count = params.files.length;
    var files = params.files;
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
          params.fileList = fileList;
          callback(params);
        }
      }
    }
  };

});
