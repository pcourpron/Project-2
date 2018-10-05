$(document).ready(function() {

var workouts;
var RPEarray = [];
var stressArray = [];

function getWorkouts(){
    $.get("/api/workout/", function(data){
        workouts = data;
    }).then(function(){
        for(let i = 0; i<workouts.length; i++){
            RPEarray.push(workouts[i].RPE);
            stressArray.push(workouts[i].stress_score);
        }
        console.log(RPEarray, stressArray);
        renderChart(RPEarray, stressArray);
    })
}

getWorkouts();

var array = [1, 12, 12, 12, 1];


var chart = document.getElementById("my-chart");

function renderChart(RPE, stress){
    var labelArray = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    new Chartist.Line(".ct-chart", {
        labels: labelArray,
        series: [   
            RPE,
            stress
        ]
    },
    {
        width: 800,
        height: 600
    });//end chartist  
    console.log("Chart rendered");
} // end renderChart

}); // end document.ready