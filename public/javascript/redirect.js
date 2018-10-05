$(document).ready(function(){
    let urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code')
    let email = localStorage.getItem('email')
    let info  =  { 1: code, 2: email}

    $.ajax("/api/stravaAccessCode", {
        type: "POST",
        data: info
    }).then(function () {
        console.log('hi')
        

    }
    );


})