$(document).ready(function() {

var stress = [7, 8, 5, 4, 8, 6, 5, 4, 3, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 7, 7, 7, 9, 9, 9];
var fitnessScores = [7, 8, 5, 4, 8, 6, 5, 4, 3, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 7, 7, 7, 9, 9, 9, 7, 8, 5, 4, 8, 6, 5, 4, 3, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 7, 7, 7, 9, 9, 9, 7, 8, 5, 4, 8, 6, 5, 4, 3, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 7, 7, 7, 9, 9, 9, 7, 8, 5, 4, 8, 6, 5, 4, 3, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 7, 7, 7, 9, 9, 9, 7, 8, 5, 4, 8, 6, 5, 4, 3, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 7, 7, 7, 9, 9, 9, 7, 8, 5, 4, 8, 6, 5, 4, 3, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 7, 7, 7, 9, 9, 9];
// var scores = [9, 9, 9, 9, 8, 8, 8, 9, 7, 8, 9, 7, 9]

var stressArray = [];
var workouts;
var selectedWorkouts = [];

function getWorkouts(){
    $.get("/api/workout/", function(data){
        workouts = data;
        var chartTimeframe = $("#chart-timeframe").val();
        let date;
        let today = new Date();
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
                date = new Date().setYear(today.getYear()-1);
            break;
        }
        console.log(date);
        selectTimeFrame(date)

        for(let i = 0; i<selectedWorkouts.length; i++){
            stressArray.push(selectedWorkouts[i].stress_score);
            if (i < selectedWorkouts.length-1){
                let date1 = new Date(selectedWorkouts[i].date);
            let date2 = new Date(selectedWorkouts[i+1].date);
            let difference = (date2-date1)/(1000*60*60*24);
            if(difference > 1){
                for (let i = 0; i < difference; i++){
                    stressArray.push(0);
                }
            }
            }
        }
        console.log(stressArray);
        console.log(Math.max(...stressArray))
       createEMA();
       createFitness();
       renderChart(EMAarray, fitnessArray);
        // console.log(EMA, EMAarray, fitnessArray);
    })
}
getWorkouts();

$("#chart-timeframe").on("change", getWorkouts);

var EMA = 0;
var EMAarray = [];
var fitnessArray = [];
var fitness = 6;
// Exponential moving average = [Close - previous EMA] * (2 / n+1) + previous EMA

function createEMA(){
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
        console.log(EMA);
    }
}

function createFitness(){
    let multiplier = (2/43);
    for(let i=0; i<stressArray.length; i++){
        fitness += (stressArray[i]-fitness)*multiplier;
        fitnessArray.push(fitness);
    }
}

function renderChart(stress, fitness,){

    new Chartist.Line(".ct-chart", {
        series: [   
            stress, 
            fitness
        ]
    },
    {
        width: 800,
        height: 600, 
        axisY: {
            low: 0 
        }
    },
    );//end chartist  
    console.log("Chart rendered");
} // end renderChart

function selectTimeFrame(date){
    let today = new Date();
    let maxDate = new Date(date)
    console.log(maxDate);
    let timeframe = Math.floor((today-maxDate)/(1000*60*60*24));
    console.log(timeframe);
    for(let i = 0; i< workouts.length; i++){
        let workoutDate = new Date(workouts[i].date);
        console.log(workoutDate);
        if (Math.floor((today - workoutDate)/(1000*60*60*24)) <= timeframe){
            selectedWorkouts.push(workouts[i]);
        }
    }
    console.log(selectedWorkouts)

    let timeGap = (Math.floor((new Date(selectedWorkouts[0].date) - maxDate)/(1000*60*60*24)));
    console.log(timeGap);
    if (timeGap !== 0){
        for(let i = 0; i < timeGap; i++){
            stressArray.push(0);
        }
    }
}

// function toggleChart(date){
//     let today = new Date();
//     let maxDate = new Date(date)
//     console.log(today);
//     let difference = (today-maxDate)/(1000*60*60*24);
//     console.log(Math.floor(difference));
// }
}); // ends documentReady