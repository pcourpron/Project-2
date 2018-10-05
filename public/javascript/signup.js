$(document).ready(function() {
$(document).on("click", "#submit", function(event){
    event.preventDefault()

    var userInfo = {
        first_name: $('#first_name').val().trim(),
        last_name: $('#last_name').val().trim(),
        email: $('#email').val().trim(),
        password: $('#password').val()
    }


    $.ajax("/api/newUser/", {
        type: "POST",
        data: userInfo
    }).then(function () {
       localStorage.setItem('email',userInfo.email)
       console.log('hi')
    }
    );


});
})

