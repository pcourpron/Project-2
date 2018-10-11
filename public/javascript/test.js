$(document).ready(function () {
    $(document).on("click", "#sync", function (event) {
        window.location = "https://www.strava.com/oauth/authorize?client_id=29032&response_type=code&redirect_uri=https://ascent-project.herokuapp.com/redirect_success"
    });

    $('#logout').click(function () {
        document.cookie = "auth_key=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.reload()

    })
})


