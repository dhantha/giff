$(document).ready(function() {


  function loadCanvas(dataURL) {
    var canvas = document.getElementById('drawCanvas');
    var context = canvas.getContext('2d');

    // load image from data url
    var imageObj = new Image();
    imageObj.onload = function() {
      context.drawImage(this, 0, 0);
    };

    imageObj.src = dataURL;
  }

  $('#uploadForm').submit(function(e) {
      e.preventDefault();
      $("#status").empty().text("File is uploading...");

      $(this).ajaxSubmit({
          error: function(xhr) {
              status('Error: ' + xhr.status);
          },
          success: function(response) {
              $("#status").empty().text(" ");
              console.log("response success");
              //loadCanvas(response);
              console.log(typeof(response));
              //var encodedImage = new Buffer(response, 'binary').toString('base64');
              $("#drawImage").attr("src", "data:image/gif;base64,"+ response);


              //var canvas = document.getElementById("drawCanvas");
              //var img    = canvas.toDataURL("image/png");
              //$('#test').prepend('<img src="data:image/gif;base64,' + response + '" />');
              //document.write('<img src="data:image/gif;base64",' + response +'/>');
              //console.log("wrote the image");
              //location.reload();

          }
      });
      //Very important line, it disable the page refresh.
  return false;
  });
});

//var canvas = document.getElementById("mycanvas");
//var img    = canvas.toDataURL("image/png");
//document.write('<img src="'+img+'"/>');
