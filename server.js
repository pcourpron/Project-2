const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;

const app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());
var db = require("./models");


// Import routes and give the server access to them.
require("./routes/workout-api-routes.js")(app);
require("./routes/user-api-routes.js")(app);
require('./routes/htmlRoutes.js')(app);

// Start our server so that it can begin listening to client requests.
db.sequelize.sync({}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
