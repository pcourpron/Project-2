var db = require("../models");

module.exports = function(app){

    app.get("/api/workout/", function(req, res) {
        
        db.Workout.findAll({where : {user_id:'asdf'}},{order: ["date"]}).then(function(dbWorkout){
            res.json(dbWorkout);
        })
    });

    app.post("/api/workout/", function(req, res){
        var workout = req.body;
        db.Workout.create(workout).then(function(result){
            
            res.end();
        });
    });

   
}