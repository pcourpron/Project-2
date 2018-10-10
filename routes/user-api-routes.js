var db = require("../models");
var http = require("http");
var request = require('request');

module.exports = function (app) {


    app.post("/api/newUser", function (req, res) {

        var user = req.body;
        var auth_key = Math.floor(Math.random()*1000000)+10000000;
        user.auth_key = auth_key;

        db.User.find({where: 
        {email: user.email}}).then(function(response){
            if (response === null ){
                db.User.find({order: ["user_id"]}).then(function(response){
                    if (response !== null){
                        user.user_id = response.dataValues.user_id + 1

                        res.cookie("email", user.user_id, {expires: new Date(Date.now() + 999999999)});
                        res.cookie("auth_key", auth_key, {expires: new Date(Date.now() + 999999999)});
                        
                        db.User.create(user).then(function (result) {
                            res.redirect('/homepage')
                        });
                    }
                    else{
                        user.user_id = 1234124513
                        res.cookie("email", user.user_id, {expires: new Date(Date.now() + 999999999)});
                        res.cookie("auth_key", auth_key, {expires: new Date(Date.now() + 999999999)});

                        db.User.create(user).then(function (result) {
                            res.redirect('/homepage')
                        });
                    }
                    
                }) 
            }
            else{
                res.redirect('/login')
            }
        })


        
    });

    app.post("/api/loading",function(req,res){
        var loginInfo = req.body
        console.log(loginInfo)
        db.User.find({
            where: {
                user_id : loginInfo.email,
                auth_key: loginInfo.auth_key
            }
        }).then(function(results){
     
            if (results.dataValues.user_id == loginInfo.email && results.dataValues.auth_key === loginInfo.auth_key){
     
                res.send(true)

            }
            else{

                res.send(false)
            }
        })
        .catch(function(){

            res.send(false)
        })

    })
    app.post("/api/login", function (req, res) {4
        var user = req.body
        db.User.find({
            where : {email: user.email}
        }).then(function (results) {

           if (results === null){
               res.send(false)
           }
           else if (user.password === results.dataValues.password ){
           res.send({email: results.dataValues.user_id, auth_key :results.dataValues.auth_key})
           }
           else{
               res.send(false)
           }

        });



    });

    app.post("/api/stravaAccessCode", function (req, res) {
        var code = req.body['1']
        var email = req.body['2']
        var user_id = req.body['3']

        request.post({
            headers: { 'content-type': 'application/x-      ww-form-urlencoded' },
            url: `https://www.strava.com/oauth/token?client_id=29032&client_secret=0f9f5324b2a4ee9c2c68fcacf7013755710a91ec&code=${code}`,
            body: ""
        }, function (error, response, body) {
            
            var auth_key = JSON.parse(body).access_token
            db.User.update({ strava_auth: auth_key }, {
                where: { email: email }
            }).then(function () {

                db.User.find({
                    attributes: ['strava_auth']
                },
                    {
                        where:
                            { email: email }
                    }).then(function (response) {
                      console.log(response)
                        var access_token = response.dataValues.strava_auth
                        request.get({
                            headers: { 'content-type': 'application/x-www-form-urlencoded' },
                            url: `https://www.strava.com/api/v3/athlete/activities?access_token=${access_token}`,
                            body: ""
                        }
                            , function (error, response, body) {
                           
            
                                JSON.parse(body).forEach(workout => {
                                    var i = 0 
                                    var date = workout.start_date_local.split('T')[0]
                                    var time = workout.start_date_local.split('T')[0]
                                    var workout_time = new Date(1000 * workout.elapsed_time).toISOString().substr(11, 8)
                                    
                                    var workoutObject = {};
                                    workoutObject.user_id = email;
                                    if (workout.id === 'Workout'){
                                        workoutObject.strava_id = 'Other';
                                    }
                                    else{
                                        workoutObject.strava_id = workout.id;
                                    }
                                   
                                    workoutObject.has_heartrate = workout.has_heartrate;
                                    workoutObject.category = workout.type;
                                    workoutObject.date = date;
                                    workoutObject.time = time;
                                    workoutObject.distance = workout.distance;
                                    workoutObject.time = workout_time;
                                    workoutObject.has_heartrate = workout.has_heartrate; 
                                    workoutObject.user_id = user_id
                                    
                                    if (workout.has_heartrate === true){
                                        request.get({
                                            headers: { 'content-type': 'application/x-www-form-urlencoded' },
                                            url: `https://www.strava.com/api/v3/activities/${workout.id}/streams?access_token=${access_token}&keys=heartrate&key_by_type=true`,
                                            body: ""
                                        },function(error,response,body){
                                            if (i===0){
                                                var stress_score = 0 
                                                var max = 195
                                                var heartrate = JSON.parse(body).heartrate.data
                                               
                                                heartrate.forEach(element => {
                                                    if (element > .50*max && element < .533*max){
                                                        stress_score += 20/3600
                                                    }
                                                    else if (element > .533*max && element < .566*max){
                                                        stress_score += 30/3600
                                                    } 
                                                    else if (element > .566*max && element <= .6*max){
                                                        stress_score += 40/3600
                                                    }
                                                    else if (element > .60*max && element <= .65*max){
                                                        stress_score += 50/3600
                                                    }
                                                    else if (element > .65*max && element <= .7*max){
                                                        stress_score += 60/3600
                                                    }
                                                    else if (element > .7*max && element <= .8*max){
                                                        stress_score += 70/3600
                                                    }
                                                    else if (element > .8*max && element <= .9*max){
                                                        stress_score += 80/3600
                                                    }
                                                    else if (element > .9*max && element <= .933*max){
                                                        stress_score += 100/3600
                                                    }
                                                    else if (element > .9*max && element <= .966*max){
                                                        stress_score += 120/3600
                                                    }
                                                    else if (element > .966*max && element <= max){
                                                        stress_score += 140/3600
                                                    }
                                                    
                                                    workoutObject.stress_score = stress_score
                                                    
                                                });
                                                

                                                db.Workout.create(workoutObject).then(function(result){
                                                    res.end(); 
                                                });
                                            }
                                            
                                        }
                                        )
                                    }


                                    

                                });

                            })

                    })


            })
        });


    })
}