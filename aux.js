$(document).ready(function() {

  $(".dial").knob({
        'change' : function (v) { console.log(v); }
    });

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
