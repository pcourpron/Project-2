$(document).ready(function () {
    const log = console.log;
    function getCookie(cookie_name) {
        var name = cookie_name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function checkCookies() {
        let email = getCookie('email');
        let auth_key = getCookie('auth_key');

        let userInfo = {
            email: email,
            auth_key: auth_key
        }
        $.ajax("/api/loading", {
            type: "POST",
            data: userInfo
        }).then(function (response) {
            console.log(response)
            if (response === false) {

                window.location.href = '/'
            }
            else {

            }
        }
        );

    }

    checkCookies()




    var stress = [7, 8, 5, 4, 8, 6, 5, 4, 3, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 7, 7, 7, 9, 9, 9];
    var fitnessScores = [7, 8, 5, 4, 8, 6, 5, 4, 3, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 7, 7, 7, 9, 9, 9, 7, 8, 5, 4, 8, 6, 5, 4, 3, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 7, 7, 7, 9, 9, 9, 7, 8, 5, 4, 8, 6, 5, 4, 3, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 7, 7, 7, 9, 9, 9, 7, 8, 5, 4, 8, 6, 5, 4, 3, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 7, 7, 7, 9, 9, 9, 7, 8, 5, 4, 8, 6, 5, 4, 3, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 7, 7, 7, 9, 9, 9, 7, 8, 5, 4, 8, 6, 5, 4, 3, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 7, 7, 7, 9, 9, 9];
    // var scores = [9, 9, 9, 9, 8, 8, 8, 9, 7, 8, 9, 7, 9]

    var stressArray = [];
    var workouts;
    var selectedWorkouts = [];

    for (let i = 0; i < 365; i++) {
        stressArray.push(0);
    }


    function getWorkouts() {
        stressArray = [];
        for (let i = 0; i < 365; i++) {
            stressArray.push(0);
        }
        selectedWorkouts = [];
        // stressArray = [];
        $.get("/api/workout/", function (data) {
            workouts = data;
            var chartTimeframe = $("#chart-timeframe").val();
            let date;
            let today = new Date();

            switch (chartTimeframe) {
                case ("one-month"):
                    date = new Date().setMonth(today.getMonth() - 1);
                    console.log(new Date(date));
                    break;
                case ("three-months"):
                    date = new Date().setMonth(today.getMonth() - 3);
                    break;
                case ("six-months"):
                    date = new Date().setMonth(today.getMonth() - 6);
                    break;
                case ("one-year"):
                    date = new Date().setMonth(today.getMonth() - 12);
                    break;
            }
            // console.log(date);
            if (workouts.length > 0) {
                $(".watermark").text("");

                for (let i = 0; i < workouts.length; i++) {
                    stressArray.push(workouts[i].stress_score);
                    if (i < workouts.length - 1) {
                        let date1 = new Date(workouts[i].date);
                        let date2 = new Date(workouts[i + 1].date);
                        let difference = (date2 - date1) / (1000 * 60 * 60 * 24);
                        if (difference > 1) {
                            for (let i = 1; i < difference; i++) {
                                stressArray.push(0);
                            }
                        }
                    }
                }

                let lastWorkoutDate = new Date(workouts[workouts.length - 1].date + " 00:00");
                console.log(lastWorkoutDate);
                let daysSinceLastWorkout = Math.floor((today - lastWorkoutDate) / (1000 * 60 * 60 * 24));
                console.log(daysSinceLastWorkout);

                if (daysSinceLastWorkout > 0) {
                    for (let i = 0; i < daysSinceLastWorkout; i++) {
                        stressArray.push(0);
                    }
                    console.log(stressArray);
                }
                // console.log(daysSinceLastWorkout, stressArray);

                let days = Math.floor((today - date) / (1000 * 60 * 60 * 24)) + 1;
                console.log(days);
                createEMA(days);
                createFitness(days);
            }
            else {
                $(".watermark").text("No Data Available");
                log("NO DATA")
            }

            // console.log(stressArray);
            // console.log(Math.max(...stressArray))

            renderChart(chartEMA, chartFitness, chartTimeframe, date);
            makeRecommendation();
            // console.log(EMA, EMAarray, fitnessArray);
        })
    }
    getWorkouts();

    $("#chart-timeframe").on("change", getWorkouts);

    var EMA = 0;
    var EMAarray = [];
    var fitnessArray = [];
    var fitness = 0;
    var chartEMA;
    var chartFitness;
    // Exponential moving average = [Close - previous EMA] * (2 / n+1) + previous EMA

    function createEMA(days) {
        EMA = 0;
        EMAarray = [];
        let multiplier;
        let start = stressArray.length - 366;
        console.log(start);
        for (let i = start; i < stressArray.length - 1; i++) {
            if (i === 0) {
                multiplier = 1;
            }
            else {
                multiplier = (1 / 4);
            }
            EMA += (stressArray[i] - EMA) * multiplier;
            EMAarray.push(EMA);
        }
        let index = 366 - days;
        chartEMA = EMAarray.slice(index);
        console.log(chartEMA.length, chartEMA);
    }

    function createFitness(days) {
        fitness = 0;
        fitnessArray = [];
        let multiplier = (2 / 43);
        let start = stressArray.length - 366;
        for (let i = start; i < stressArray.length - 1; i++) {
            fitness += (stressArray[i] - fitness) * multiplier;
            fitnessArray.push(fitness);
        }
        let index = 366 - days;
        chartFitness = fitnessArray.slice(index);
    }

    function renderChart(stress, fitness, timeframe, date) {

        let labels = [];
        let labelIncrement;

        switch (timeframe) {
            case ("one-month"):
                labelIncrement = 3;
                for (let i = 0; i < 30; i++) {
                    let newLabel = new Date(date + (i * (1000 * 60 * 60 * 24)));
                    let month = newLabel.getMonth() + 1;
                    let day = newLabel.getDate();
                    labels.push(month + "/" + day);
                }
                console.log(labels);
                break;
            case ("three-months"):
                labelIncrement = 9;
                for (let i = 0; i < 90; i++) {
                    let newLabel = new Date(date + (i * (1000 * 60 * 60 * 24)));
                    let month = newLabel.getMonth() + 1;
                    let day = newLabel.getDate();
                    labels.push(month + "/" + day);
                }
                console.log(labels);
                break;
            case ("six-months"):
                for (let i = 0; i < 180; i++) {
                    let newLabel = new Date(date + (i * (1000 * 60 * 60 * 24)));
                    let month = newLabel.getMonth() + 1;
                    let day = newLabel.getDate();
                    labels.push(month + "/" + day);
                }
                break;
            case ("one-year"):
                for (let i = 0; i < 365; i++) {
                    let newLabel = new Date(date + (i * (1000 * 60 * 60 * 24)));
                    let month = newLabel.getMonth() + 1;
                    let day = newLabel.getDate();
                    labels.push(month + "/" + day);
                }
                break;
        }


        var chart = new Chartist.Line(".ct-chart", {
            labels: labels,
            series: [
                {
                    name: "stress",
                    data: stress
                },
                {
                    name: "fitness",
                    data: fitness
                }
            ]
        },
            {
                height: 400,
                showPoint: false,
                showArea: true,
                axisY: {
                    low: 0
                },
                axisX: {
                    showGrid: true,
                    labelInterpolationFnc: function (value, index) {

                        switch (timeframe) {
                            case ("one-month"):
                                return index % labelIncrement === 0 || index === labels.length - 1 ? value : null;

                            case ("three-months"):
                                return index % labelIncrement === 0 || index === labels.length - 1 ? value : null;

                            case ("six-months"):
                                let sixLabel = value.split("/");
                                if (sixLabel[1] === "1" || sixLabel[1] === "15") {
                                    return value
                                }
                                else {
                                    return value = null;
                                }
                            case ("one-year"):
                                let yearLabel = value.split("/");
                                if (yearLabel[1] === "1") {
                                    return value
                                }
                                else {
                                    return value = null;
                                }
                        }

                    }
                }
            });//end chartist  

        chart.on('draw', function (data) {
            if (data.type === 'line' || data.type === 'area') {
                data.element.animate({
                    d: {
                        begin: 800 * data.index,
                        dur: 2500,
                        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                        to: data.path.clone().stringify(),
                        easing: Chartist.Svg.Easing.easeOutQuint
                    }
                });
            }
        });// on draw function
        // console.log("Chart rendered");
    } // end renderChart

    function selectTimeFrame(date) {
        let today = new Date();
        let maxDate = new Date(date);
        // console.log(maxDate);
        let timeframe = Math.floor((today - maxDate) / (1000 * 60 * 60 * 24));
        // console.log(timeframe);
        for (let i = 0; i < workouts.length; i++) {
            let workoutDate = new Date(workouts[i].date + " 00:00");
            // console.log(workoutDate);
            if (Math.floor((today - workoutDate) / (1000 * 60 * 60 * 24)) <= timeframe) {
                selectedWorkouts.push(workouts[i]);
            }
        }

        // let timeGap = (Math.floor((new Date(selectedWorkouts[0].date) - maxDate)/(1000*60*60*24)));

        // if (timeGap !== 0){
        //     for(let i = 0; i < timeGap; i++){
        //         stressArray.push(0);
        //     }
        // }
    }


    function makeRecommendation() {
        let todayStress = EMAarray[EMAarray.length - 1];
        let stressComparison = EMAarray[EMAarray.length - 7];
        let stressTrend = todayStress - stressComparison;
        console.log(stressTrend);

        let todayFitness = fitnessArray[fitnessArray.length - 1]
        let fitnessComparison = fitnessArray[fitnessArray.length - 15];
        let fitnessTrend = todayFitness - fitnessComparison;
        console.log(fitnessTrend);

        if (todayFitness === todayStress) {
            log("Fitness and Stress are equal");
            if ((fitnessTrend > 0 && stressTrend > 0) || (fitnessTrend < 0 && stressTrend > 0)) {
                log("You're good to go!");
            }
            else if ((fitnessTrend > 0 && stressTrend < 0) || (fitnessTrend < 0 && stressTrend < 0)) {
                log("Take it easy and keep recovering");
                $("#recommendation").text("TAKE A REST FOO");
            }
        }

        else if ((todayFitness + 10) < todayStress) {
            log("stress is greater than fitness");
            log("You should take a break");
            $("#recommendation").text(`Your stress seems to be a bit elevated. If you're at the start of 
            your cycle, it's time to take it easy. If you're towards the end of your cycle, this is normal. `);
        }

        else {
            log('fitness is greater than stress');
            log("Let's GO!");
            $("#recommendation").text(`If you are in your rest week, this is normal. If not, it's time to up the intensity!`);
        }

        if (stressTrend > 0) {
            $("#stress-indicator").attr("style", "color: red");
            $('#fatigueArrow').addClass('fas fa-long-arrow-alt-up')
            console.log("stress is trending up");
        }
        else {
            $("#stress-indicator").attr("style", "color: green");
            $('#fatigueArrow').addClass('fas fa-long-arrow-alt-down')
            console.log('stress is trending down');
        }

        if (fitnessTrend > 0) {
            $("#fitness-indicator").attr("style", "color: green");
            $('#fitnessArrow').addClass('fas fa-long-arrow-alt-up');
            console.log("fitness is going up");
        }
        else {
            $("#fitness-indicator").attr("style", "color: red");
            $('#fitnessArrow').addClass('fas fa-long-arrow-alt-down');
            log("fitness going down");
        }
    } // end recomendation function
}); // ends documentReady