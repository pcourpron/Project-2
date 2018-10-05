var stress = [7, 8, 5, 4, 8, 6, 5, 4, 3, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 7, 7, 7, 9, 9, 9];
var fitnessScores = [7, 8, 5, 4, 8, 6, 5, 4, 3, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 7, 7, 7, 9, 9, 9, 7, 8, 5, 4, 8, 6, 5, 4, 3, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 7, 7, 7, 9, 9, 9, 7, 8, 5, 4, 8, 6, 5, 4, 3, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 7, 7, 7, 9, 9, 9, 7, 8, 5, 4, 8, 6, 5, 4, 3, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 7, 7, 7, 9, 9, 9, 7, 8, 5, 4, 8, 6, 5, 4, 3, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 7, 7, 7, 9, 9, 9, 7, 8, 5, 4, 8, 6, 5, 4, 3, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 7, 7, 7, 9, 9, 9];
// var scores = [9, 9, 9, 9, 8, 8, 8, 9, 7, 8, 9, 7, 9]

console.log(fitnessScores.length);

var EMA = 0;
var SMA = 0;
var fitness = 0;
// Exponential moving average = [Close - previous EMA] * (2 / n+1) + previous EMA

function createEMA(){
    for(let i=0; i<stress.length; i++){
    EMA += (stress[i]-EMA)*(0.25)
}
}

function createSMA(){
    for(let i =0; i < stress.length; i++){
        SMA += stress[i];
    }
    var x = stress.length;
    SMA = SMA/x
}

function createFitness(){
    for(let i=0; i<fitnessScores.length; i++){
        fitness += (fitnessScores[i]-fitness)*(2/43)
    }
}

createFitness();
createSMA();
createEMA();
console.log(EMA, SMA, fitness)