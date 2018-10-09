var db = require("../models");
var getCookie = function (cookie_name, req) {
    var name = cookie_name + "=";
    var ca = req.headers.cookie.split(';');
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
  };
module.exports = function(app){

    app.get("/api/workout/", function(req, res) {
        var user_id = getCookie('user_id',req)
        db.Workout.findAll({where : {user_id: user_id}},{order: ["date"]}).then(function(dbWorkout){
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