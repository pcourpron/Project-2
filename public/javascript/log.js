$(function(){

var date = document.getElementById('date');
var workOut_length = document.getElementById('workOut_length');
var btn = document.getElementById('btn');
var distance = document.getElementById('distance');
var pace = document.getElementById('pace');
var table = document.getElementById('table')



  
date.addEventListener('keyup', function (event) {
  isValidDate = date.checkValidity();
  
  if ( isValidDate ) {
    btn = false;
    alert("insert correct date")
  } else {  
    btn = true;
  }
});

workOut_length.addEventListener('keyup', function (event) {
    isValidWorkOutLength = workOut_length.checkValidity();

    if ( isValidWorkOutLength.value === "") {
        btn = false;
        alert("insert a bloody workout length")
      } else {
        btn = true;
      }
    });

distance.addEventListener('keyup', function (event) {
  isValidDistance = distance.checkValidity();
  
  if ( isValidDistance.value === "") {
    btn = false; 
  } else {
    btn = true;
  }
});

pace.addEventListener('keyup', function (event) {
    isValidPace = pace.checkValidity();
    
    if ( isValidPace.value === "") {
      btn = false;   
    } else {
      btn = true;
    }
  });

  jQuery.validator.setDefaults({
    required: true,
    success: "valid"
  });

    $("#rpe-form").validate({
      rules: {
        rpe: {
          required: true,
          range:[1,10]
        }
      }
    });  
     
  btn.addEventListener('click', function (event) {
  table.btn();
  console.log(table.btn)
});

}); 
