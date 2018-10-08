$(document).ready(function() {
    $(document).on("click", "#submit", function(event){
        event.preventDefault()
    
        var userInfo = {
            email: $('#email').val().trim(),
            password: $('#password').val()
        }
        console.log('hi')
    
        $.ajax("/api/login", {
            type: "POST",
            data: userInfo
        }).then(function (response) {
           localStorage.setItem('email',userInfo.email);
           localStorage.setItem('auth_key',response.auth_key)

       
        }
        );
    
    
    });
    })