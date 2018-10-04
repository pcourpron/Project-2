var db = require("../models");

var bcrypt = require('bcrypt')


module.exports = function (app) {


    app.post("/api/newUser", function (req, res) {
        var hashedPW
        var user = req.body
        console.log(user)
        bcrypt.hash(req.body.password, 10, function (err, hash) {
            user.password = hash
            console.log(hash)
            db.User.create(user).then(function (result) {

            });
        });
    });
}

