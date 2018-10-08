$(document).ready(function() {
$(document).on("click", "#submit", function(event){
    event.preventDefault()

    var random = Math.floor(Math.random()*1000000)

    var userInfo = {
        first_name: $('#first_name').val().trim(),
        last_name: $('#last_name').val().trim(),
        email: $('#email').val().trim(),
        password: $('#password').val(),
        auth_key: random
    }



    $.ajax("/api/newUser/", {
        type: "POST",
        data: userInfo
    }).then(function (response) {
        if (response === true){
       localStorage.setItem('email',userInfo.email)
       localStorage.setItem('auth_key',userInfo.auth_key)
        }
    }
    );


});
})

