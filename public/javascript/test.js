$(document).ready(function() {
    $(document).on("click", "#sync", function(event){
       window.location ="https://www.strava.com/oauth/authorize?client_id=29032&response_type=code&redirect_uri=http://localhost:8080/redirect_success"
    });
    })
    