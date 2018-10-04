var db = require("../models");


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
<<<<<<< HEAD
=======
        
>>>>>>> 2e3a00b222d48409dff4eef8d6ab1bb0420bbc1d
    });
}