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
      var UserData = {};
      UserData.duration = duration;
      UserData.msg = "This is a test"

      console.log(UserData);

      $(this).ajaxSubmit({
          type : 'post',
          data : JSON.stringify(UserData),
          //headers: {"Content-Type": "application/json"},
          url : 'http://54.85.31.48:3000/api/photo',
          error: function(xhr) {
              console.log('Error: ' + xhr.status);
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
