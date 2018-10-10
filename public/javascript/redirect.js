$(document).ready(function(){
    let urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code')
    var getCookie = function (cookie_name) {
        var name = cookie_name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }
    let email = getCookie('email')
    let info  =  { code: code, email: email}
  
    $.ajax("/api/stravaAccessCode", {
        type: "POST",
        data: info
    }).then(function () {
      console.log('hi')
        
    }
    );


})