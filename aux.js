$(document).ready(function() {

  var baseUrl = "https://mdn.mozillademos.org/files/5397/rhino.jpg";
  //var baseUrl = "file:///Users/dgunar872/Documents/Dhantha/projects/Photos/IMG_20171017_192516.jpg"
  //"/Users/dgunar872/Documents/Dhantha/projects/Photos/IMG_20171017_192516.jpg";

  drawCanvas(baseUrl);

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
              // call the function to draw on canvas
              //console.log(response);
              drawCanvas(response);

              // write to imag tag source direcrtly 

              console.log("Call the draw canvas");
              //loadCanvas(response);
              //console.log(typeof(response));
              //var encodedImage = new Buffer(response, 'binary').toString('base64');
              //$("#drawImage").attr("src", "data:image/gif;base64,"+ response);

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


function drawCanvas(dataURL) {

    var canvas = document.getElementById('drawCanvas');
    var ctx = canvas.getContext('2d');

    var img = new Image(); // only showing png

    img.onload = function(){
        //ctx.font = "30px Arial";
        //ctx.fillText("Hello World",10,50);
        ctx.drawImage(this, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
    }
    console.log(dataURL);
    img.src =  dataURL;

    /*
    function responsiveCanvas() {
      let containerWidth = parseInt(window.getComputedStyle(el('main-container'), null).getPropertyValue('width')) - (parseInt(window.getComputedStyle(el('main-container'), null).getPropertyValue('padding-left').split('px')[0]) * 2);
      el('cvs').width = containerWidth;
      el('cvs').height = Math.min((containerWidth / img.width), (img.width / containerWidth)) * img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, el('cvs').width, el('cvs').height);
    }

    let img = new Image();
          img.src = BASE_URL + 'coins.jpg';
          img.onload = function () {
          // As per spec, set canvas x, y to image x, y
          responsiveCanvas();
    };
    */




    }
