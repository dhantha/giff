$(document).ready(function() {

  var duration = 1; // set to default duration
  $(".dial").knob({
        'change' : function (v) {
          //console.log(v);
        },
        'release' : function (v) {
          duration = v;
        }
        //'upload' : function (v) {
        //  return(v);
        //}
    });

  // Ajax call to the server
  $('#uploadForm').submit(function(e) {
      e.preventDefault();
      $("#status").empty().text("File is uploading...");

      console.log(duration);
      var data = {};
      data.duration = duration;

      $(this).ajaxSubmit({
          data : JSON.stringify(data),
          contentType : 'application/json',
          error: function(xhr) {
              status('Error: ' + xhr.status);
          },
          success: function(response) {
              $("#status").empty().text(" ");
              console.log("response success");
              $("#download").attr('href',response);
               $("#drawGiff").attr('src', response);
              // write to imag tag source direcrtly
              console.log("Call the draw canvas");
          }
      });
      //Very important line, it disable the page refresh.
  return false;
  });


});
