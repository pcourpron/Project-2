$(document).ready(function() {
$(document).on("click", "#submit", function(event){
    event.preventDefault()

    var userInfo = {
        firstName: $('#first_name').val().trim(),
        lastName: $('#last_name').val().trim(),
        email: $('#email').val().trim(),
        dateOfBirth : $('#date_of_birth').val().trim()
    }


    $.ajax("/api/newUser/", {
        type: "POST",
        data: userInfo
    }).then(function () {
        
    }
    );


});
})

