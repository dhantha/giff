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


  $('#uploadForm').on('submit', function(event){
    event.preventDefault();

    //var formData = $(this).serializeArray();
    //console.log(formData);

    $.ajax({
      url: 'http://ec2-54-85-31-48.compute-1.amazonaws.com:3000/upload',
      type: 'POST',
      error: function(xhr){
        status('Error: ' +  xhr.status)
      }
      succsess: function(response){
        console.log(response);
      }
    });
  });


  $('').on('submit', function(event) {
      event.preventDefault();
      $("#status").empty().text("File is uploading...");

      var files = $('[name="userPhoto"]');
      var filenames = $.trim(files.val())
      var data =  JSON.stringify(event.target);

      console.log($(this));

      var form = $(this)[0].files;
      var data = new FormData(form);


      /*
      $(this).ajax({
          type : 'post',
          url : 'http://ec2-54-85-31-48.compute-1.amazonaws.com:3000/upload',
          data: data,
          timeout: 60000,
          error: function(xhr) {
              console.log('Error: ' + xhr.status);
          },
          success: function(response) {
              $("#status").empty().text(" ");
              console.log("response success");
              //$("#download").attr('href',response);
               //$("#drawGiff").attr('src', response);
              // write to imag tag source direcrtly
              //console.log("Call the draw canvas");
          }
      });
      */
      //Very important line, it disable the page refresh.
      return false;
  });


});
