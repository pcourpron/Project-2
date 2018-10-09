$(document).ready(function() {
    $(document).on("click", "#sync", function(event){
       window.location ="https://www.strava.com/oauth/authorize?client_id=29032&response_type=code&redirect_uri=https://ascent-project.herokuapp.com/redirect_success"
    });
    })
    