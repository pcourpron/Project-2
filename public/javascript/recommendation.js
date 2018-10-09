var EMAarray = [1, 10, 6, 7, 8, 11, 6, 5];
var fitnessArray = [7, 10, 8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5];
const log = console.log;

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
            log("You're good to go!")
        }
        else if ((fitnessTrend > 0 && stressTrend < 0) || (fitnessTrend < 0 && stressTrend < 0)){
            log("Take it easy and keep recovering")
        }
    }
    
    else if(todayFitness < todayStress){
        log("stress is greater than fitness");
        log("You should take a break");
    }

    else {
        log('fitness is greater than stress');
        log("Let's GO!");
    }

    if(stressTrend > 0){
        console.log("stress is trending up");
    }
    else{
        console.log('stress is trending down');
    }

    if(fitnessTrend > 0){
        console.log("fitness is going up")
    }
    else{
        log("fitness going down");
    }
}

makeRecommendation();