

var db = require("../models");

var bcrypt = require('bcrypt')


module.exports = function (app) {


    app.post("/api/newUser", function (req, res) {

        var hashedPW 
        var user = req.body
        bcrypt.hash(req.body.password, 10, function (err, hash) {
            hashedPW = hash
        });

        user.password = hashedPW

        db.User.create(user).then(function (result) {
            res('done')
        });
    });
}

