$(document).ready(function() {
    var userInfo = {
        email: localStorage.getItem('email'),
        auth_key: localStorage.getItem('auth_key')
    }


    $.ajax("/api/loading", {
        type: "POST",
        data: userInfo
    }).then(function (response) {

  console.log('hi')

       window.location.href = '/homepage'
   
    }
    );

    
    })