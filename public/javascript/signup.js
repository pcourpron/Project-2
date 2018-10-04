$(document).ready(function() {
$(document).on("click", "#submit", function(event){
    event.preventDefault()

    var userInfo = {
        first_name: $('#first_name').val().trim(),
        last_name: $('#last_name').val().trim(),
        email: $('#email').val().trim(),
        date_of_birth : $('#date_of_birth').val().trim(),
        password: $('#password').val()
    }


    $.ajax("/api/newUser/", {
        type: "POST",
        data: userInfo
    }).then(function () {
        console.log('done')

    }
    );


});
})

