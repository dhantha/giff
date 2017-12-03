$(document).ready(function() {
    
    $('#uploadForm').submit(function(e) {
         
        e.preventDefault();
        $("#status").empty().text("File is uploading...");
         
        $(this).ajaxSubmit({
            error: function(xhr) {
                status('Error: ' + xhr.status);
            },
            success: function(response) {
                $("#status").empty();
                //console.log(response);
                var canvas = document.getElementById("drawCanvas");
                var img    = canvas.toDataURL("image/png");
                document.write('<img src="'+img+'"/>');
                console.log("wrote the image");
                /*
                var $myCanvas = $('#myCanvas');
                $myCanvas.drawRect({
                  fillStyle: 'steelblue',
                  strokeStyle: 'blue',
                  strokeWidth: 4,
                  x: 150, y: 100,
                  fromCenter: false,
                  width: 200,
                  height: 100
                });
                */

            }
        });
        //Very important line, it disable the page refresh.
    return false;
    });    
});

//var canvas = document.getElementById("mycanvas");
//var img    = canvas.toDataURL("image/png");
//document.write('<img src="'+img+'"/>');