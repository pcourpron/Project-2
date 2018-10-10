$(document).ready(function () {
    $(document).on("click", "#btn", function () {
        event.preventDefault();
        console.log("submit")
        var stress_score = 0
        switch (rpe) {
            case 1:
                stress_score += 20 / 60 * parseInt($('workout_length').val().trim())
                break;
            case 2:
                stress_score += 30 / 60 * parseInt($('workout_length').val().trim())
                break;
            case 3:
                stress_score += 40 / 60 * parseInt($('workout_length').val().trim())
                break;
            case 4:
                stress_score += 50 / 60 * parseInt($('workout_length').val().trim())
                break;
            case 5:
                stress_score += 60 / 60 * parseInt($('workout_length').val().trim())
                break;
            case 6:
                stress_score += 70 / 60 * parseInt($('workout_length').val().trim())
                break;
            case 7:
                stress_score += 80 / 60 * parseInt($('workout_length').val().trim())
                break;
            case 8:
                stress_score += 100 / 60 * parseInt($('workout_length').val().trim())
                break;
            case 9:
                stress_score += 120 / 60 * parseInt($('workout_length').val().trim())
                break;
            case 10:
                stress_score += 140 / 60 * parseInt($('workout_length').val().trim())
                break;

            default:
                break;
        }


        var upsertLaw = {
            category: $("#category").val().trim(),
            distance: $("#distance").val().trim(),
            RPE: $("#rpe").val().trim(),
            workout_length: $("#workOut_length").val().trim(),
            pace: $("#pace").val().trim(),
            date: $("#date").val().trim(),
            stress_score: stress_score,

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
