$(document).ready(function() {

    const log = console.log;
function getCookie(cookie_name){
    var name = cookie_name + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
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

function checkCookies(){
    let email = getCookie('email');
    let auth_key = getCookie('auth_key');

    let userInfo = {
        email:email,
        auth_key:auth_key
    }

    $.ajax("/api/loading", {
        type: "POST",
        data: userInfo
    }).then(function (response) {
        console.log(response)
        if (response === false){
            console.log('hi')
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

function getWorkouts(){
    selectedWorkouts = [];
    stressArray = [];
    $.get("/api/workout/", function(data){
        workouts = data;
        console.log(data);
        var chartTimeframe = $("#chart-timeframe").val();
        let date;
        let today = new Date();
        console.log(today);
        switch (chartTimeframe){
            case ("one-month"):
                date = new Date().setMonth(today.getMonth()-1);
            break;
            case ("three-months"):
                date = new Date().setMonth(today.getMonth()-3);
            break;
            case("six-months"):
                date = new Date().setMonth(today.getMonth()-6);
            break;
            case ("one-year"):
                date = new Date().setMonth(today.getMonth()-12);
            break;
        }
        // console.log(date);
        if(workouts.length > 0){
            $(".watermark").text("");
            selectTimeFrame(date);

            for(let i = 0; i<selectedWorkouts.length; i++){
                stressArray.push(selectedWorkouts[i].stress_score);
                if (i < selectedWorkouts.length-1){
                    let date1 = new Date(selectedWorkouts[i].date);
                let date2 = new Date(selectedWorkouts[i+1].date);
                let difference = (date2-date1)/(1000*60*60*24);
                if(difference > 1){
                    for (let i = 1; i < difference; i++){
                        stressArray.push(0);
                    }
                }
                }
            }
    
            let lastWorkoutDate = new Date(selectedWorkouts[selectedWorkouts.length-1].date + " 00:00");
            let daysSinceLastWorkout = Math.floor((today - lastWorkoutDate)/(1000*60*60*24));
    
            if(daysSinceLastWorkout > 0){
                for(let i = 0; i < daysSinceLastWorkout; i++){
                    stressArray.push(0);
                }
            }
            console.log(daysSinceLastWorkout, stressArray);
        }
        else{
            $(".watermark").text("No Data Available");
            log("NO DATA")
        }

        // console.log(stressArray);
        // console.log(Math.max(...stressArray))
       createEMA();
       createFitness();
       renderChart(EMAarray, fitnessArray);
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
// Exponential moving average = [Close - previous EMA] * (2 / n+1) + previous EMA

function createEMA(){
    EMA = 0;
    EMAarray = [];
    let multiplier;
    for(let i=0; i < stressArray.length; i++){
        if(i===0){
            multiplier=1;
        }
        else{
            multiplier = (1/4);
        }
        EMA += (stressArray[i]-EMA)*multiplier;
        EMAarray.push(EMA);
        // console.log(EMA);
    }
}

function createFitness(){
    fitness = 6;
    fitnessArray = [];
    let multiplier = (2/43);
    for(let i=0; i<stressArray.length; i++){
        fitness += (stressArray[i]-fitness)*multiplier;
        fitnessArray.push(fitness);
    }
}

function renderChart(stress, fitness){

   var chart = new Chartist.Line(".ct-chart", {
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
        width: 800,
        height: 600, 
        showPoint: false, 
        showArea: true, 
        axisY: {
            low: 0 
        },
        axisX:{
            showGrid: false
        } 
    });//end chartist  

    chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 500 * data.index,
              dur: 1400,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        }
      });// on draw function
    // console.log("Chart rendered");
} // end renderChart

function selectTimeFrame(date){
    let today = new Date();
    let maxDate = new Date(date);
    // console.log(maxDate);
    let timeframe = Math.floor((today-maxDate)/(1000*60*60*24));
    // console.log(timeframe);
    for(let i = 0; i< workouts.length; i++){
        let workoutDate = new Date(workouts[i].date+" 00:00");
        // console.log(workoutDate);
        if (Math.floor((today - workoutDate)/(1000*60*60*24)) <= timeframe){
            selectedWorkouts.push(workouts[i]);
        }
    }

    let timeGap = (Math.floor((new Date(selectedWorkouts[0].date) - maxDate)/(1000*60*60*24)));

    if (timeGap !== 0){
        for(let i = 0; i < timeGap; i++){
            stressArray.push(0);
        }
    }
}


function makeRecommendation(){
    let todayStress = EMAarray[EMAarray.length-1];
    let stressComparison = EMAarray[EMAarray.length-7];
    let stressTrend = todayStress - stressComparison;
    console.log(stressTrend);

    let todayFitness = fitnessArray[fitnessArray.length-1]
    let fitnessComparison = fitnessArray[fitnessArray.length-15];
    let fitnessTrend = todayFitness - fitnessComparison;
    console.log(fitnessTrend);

    if (todayFitness === todayStress){
        log("Fitness and Stress are equal");
        if ((fitnessTrend > 0 && stressTrend > 0) || (fitnessTrend < 0 && stressTrend > 0)){
            log("You're good to go!");
        }
            else if ((fitnessTrend > 0 && stressTrend < 0) || (fitnessTrend < 0 && stressTrend < 0)){
                log("Take it easy and keep recovering");
                $("#recommendation").text("TAKE A REST FOO");
            }
    }
    
        else if((todayFitness + 10) < todayStress){
            log("stress is greater than fitness");
            log("You should take a break");
            $("#recommendation").text("TAKE A REST FOO");
        }

        else {
            log('fitness is greater than stress');
            log("Let's GO!");
            $("#recommendation").text("GET YO ASS MOVIN");
        }

    if(stressTrend > 0){
        $("#stress-indicator").attr("style", "color: green");
        console.log("stress is trending up");
    }
        else{
            $("#stress-indicator").attr("style", "color: red");
            console.log('stress is trending down');
        }

    if(fitnessTrend > 0){
        $("#fitness-indicator").attr("style", "color: green");
        console.log("fitness is going up");
    }
        else{
            $("#fitness-indicator").attr("style", "color: red");
            log("fitness going down");
        }
} // end recomendation function
}); // ends documentReady