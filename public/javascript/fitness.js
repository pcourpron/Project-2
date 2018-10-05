var stress = [7, 8, 5, 4, 8, 6, 5, 4, 3, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 7, 7, 7, 9, 9, 9];
var fitnessScores = [7, 8, 5, 4, 8, 6, 5, 4, 3, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 7, 7, 7, 9, 9, 9, 7, 8, 5, 4, 8, 6, 5, 4, 3, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 7, 7, 7, 9, 9, 9, 7, 8, 5, 4, 8, 6, 5, 4, 3, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 7, 7, 7, 9, 9, 9, 7, 8, 5, 4, 8, 6, 5, 4, 3, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 7, 7, 7, 9, 9, 9, 7, 8, 5, 4, 8, 6, 5, 4, 3, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 7, 7, 7, 9, 9, 9, 7, 8, 5, 4, 8, 6, 5, 4, 3, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 7, 7, 7, 9, 9, 9];
// var scores = [9, 9, 9, 9, 8, 8, 8, 9, 7, 8, 9, 7, 9]

var stressArray = [];
var workouts;

function getWorkouts(){
    $.get("/api/workout/", function(data){
        workouts = data;

        for(let i = 0; i<workouts.length; i++){
            stressArray.push(workouts[i].stress_score);
        }
        console.log(stressArray);
        console.log(Math.max(...stressArray))
       createEMA();
       createFitness();
       renderChart(EMAarray, fitnessArray);
        console.log(EMA, EMAarray, fitnessArray);
    })
}
getWorkouts();

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

function renderChart(stress, fitness){
    var labelArray = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    new Chartist.Line(".ct-chart", {
        labels: labelArray,
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

// createFitness();
// createSMA();
// createEMA();
// console.log(EMA, SMA, fitness)