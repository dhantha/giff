$(document).ready(function($){
  $('#uploadForm').on('submit', function(e){
    event.preventDefault(e);

    var input = $('#uploadPhotos')[0].files
    var reader = new FileReader();

    console.log(input);
    for(i = 0; i < input.length; i++){
      reader.readAsDataURL(input[i]);
      reader.onload = function(e){
        var image = new Image();
        image.src = e.target.result;
        image.onload = function(){
          giff.addFrame()
        }
      }
    }
  });
});
