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
            function setCookie(cname, cvalue, exdays) {
                var d = new Date();
                d.setTime(d.getTime() + (exdays*24*60*60*1000));
                var expires = "expires="+ d.toUTCString();
                document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
            }
    
            setCookie('email',userInfo.email,60)
            setCookie('auth_key',userInfo.auth_key,60)
               window.location.href = '/homepage'
        }
        else{
            alert('Email is already taken! Please use another email.')
        }
    }
    );


});
})

