var db = require("../models");

module.exports = function(app){

    app.get("/api/workout/", function(req, res) {
        db.Workout.findAll().then(function(dbWorkout){
            res.json(dbWorkout);
        })
    });

    app.post("/api/workout/", function(req, res){
        var workout = req.body;
        console.log(workout);
        db.Workout.create(workout).then(function(result){
            res.end();
        });
    });

   
}