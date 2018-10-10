$(document).ready(function () {
    $(document).on("click", "#submit", function (event) {
        event.preventDefault()

        var userInfo = {
            email: $('#email').val().trim(),
            password: $('#password').val().trim()
        }
        console.log('hi')

        $.ajax("/api/login", {
            type: "POST",
            data: userInfo
        }).then(function (response) {
            if (response !== false) {
                function setCookie(cname, cvalue, exdays) {
                    var d = new Date();
                    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                    var expires = "expires=" + d.toUTCString();
                    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
                }

                setCookie('email', response.email)
                setCookie('auth_key', response.auth_key)
                window.location.href = '/homepage'


            }
            else {
                alert('Sorry! Wrong email or password combination! ')
            }
        });

    });
})