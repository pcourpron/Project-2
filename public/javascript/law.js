$(document).ready(function () {
    $(document).on("click", "#btn", function () {
        event.preventDefault();
        console.log("submit")

        var upsertLaw = {
            category: $("#category").val().trim(),
            distance: $("#distance").val().trim(),
            RPE: $("#rpe").val().trim(),
            workout_length: $("#workOut_length").val().trim(),
            pace: $("#pace").val().trim(),
            date: $("#date").val().trim(),
        }

        $.ajax("/api/workout/", {
            method: 'POST',
            url: "/backend",
            data: upsertLaw
        }).then(function () {
            console.log("done")

        });

    });

});
