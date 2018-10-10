const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session')
const PORT = process.env.PORT || 8080;

const app = express();

// Serve static content for the app from the "public" directory in the application directory.


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());
app.use(session({
  secret: "yolo", 
  resave: false,
  saveUninitialized: true,
  cookie: {secure: "auto"}
}))

// Set Handlebars.
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const db = require('./models');


app.use(express.static('public'));


// Import routes and give the server access to them.
require('./routes/workout-api-routes.js')(app);
require('./routes/user-api-routes.js')(app);
require('./routes/htmlRoutes.js')(app);


// Start our server so that it can begin listening to client requests.
db.sequelize.sync({}).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });
});
