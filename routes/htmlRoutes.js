const path = require('path');
const db = require('../models');

var getCookie = function(cookie_name, req) {
  var name = cookie_name + '=';
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
  return '';
};

function checkCookies(req) {
  var cEmail = getCookie('email', req);
  var cAuth_key = getCookie('auth_key', req);
  return [cEmail, cAuth_key];
}

function redirect(req, res, badRoute, goodRoute) {
  if (req.headers.cookie === undefined) {
    res.redirect('/');
  } else {
    var info = checkCookies(req);

    db.User.find({
      where: {
        user_id: info[0],
        auth_key: info[1],
      },
    })
      .then(function(results) {
        if (results._options.raw === true) {
          res.sendFile(path.join(__dirname, '../public/html/' + goodRoute));
        }
      })
      .catch(function(results) {
        res.sendFile(path.join(__dirname, '../public/html/' + badRoute));
      });
  }
}
function redirectLogin(req, res, badRoute, goodRoute) {
  if (req.headers.cookie === undefined) {
    res.sendFile(path.join(__dirname, '../public/html/' + badRoute));
  } else {
    var info = checkCookies(req);
    db.User.find({
      where: {
        email: info[0],
        auth_key: info[1],
      },
    })

      .then(function(results) {
        if (results._options.raw === true) {
          res.sendFile(path.join(__dirname, '../public/html/' + goodRoute));
        }
      })

      .catch(function() {
        res.sendFile(path.join(__dirname, '../public/html/' + badRoute));
      });
  }
}

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/landing.html'));
  });

  app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/signup.html'));
  });

  app.get('/homepage', (req, res) => {
    redirect(req, res, 'landing.html', 'index.html');
  });
  app.get('/login', (req, res) => {
    redirectLogin(req, res, 'login.html', 'index.html');
  });
  app.get('/sync', (req, res) => {
    redirect(req, res, 'landing.html', 'sync.html');
  });

  app.get('/redirect_success', (req, res) => {
    redirect(req, res, 'landing.html', 'index.html');
  });

  app.get('/log', (req, res) => {
    redirect(req, res, 'landing.html', 'log.html');
  });

  app.get('/view', (req, res) => {
    const crossfitArray = [];
    const hikeArray = [];
    const rideArray = [];
    const runArray = [];
    const swimArray = [];
    const walkArray = [];
    const otherArray = [];
    const allArray = [];
    const user_id = getCookie('email', req);

    db.Workout.findAll({
      where: {
        user_id: user_id,
      },
      order: [['date', 'DESC']],
    }).then((data) => {
      data.forEach((workout) => {
        Object.values(workout.dataValues).forEach((value) => {
          let newValue = value;
          if (value === null) {
            newValue = false;
          }
        });
        switch (workout.dataValues.category) {
          case 'crossfit':
            crossfitArray.push(workout.dataValues);
            allArray.push(workout.dataValues);
            break;
          case 'hike':
            hikeArray.push(workout.dataValues);
            allArray.push(workout.dataValues);
            break;
          case 'ride':
            rideArray.push(workout.dataValues);
            allArray.push(workout.dataValues);
            break;
          case 'run':
            runArray.push(workout.dataValues);
            allArray.push(workout.dataValues);
            break;
          case 'swim':
            swimArray.push(workout.dataValues);
            allArray.push(workout.dataValues);
            break;
          case 'walk':
            walkArray.push(workout.dataValues);
            allArray.push(workout.dataValues);
            break;
          case 'other':
            otherArray.push(workout.dataValues);
            allArray.push(workout.dataValues);
            break;
          default:
            break;
        }
      });
      res.render('view', {
        crossfit: crossfitArray,
        hike: hikeArray,
        ride: rideArray,
        run: runArray,
        swim: swimArray,
        walk: walkArray,
        other: otherArray,
        all: allArray,
      });
    });
  });

  app.get('/sync', (req, res) => {
    redirect(req, res, 'landing.html', 'sync.html');
  });

  app.get('/settings', (req, res) => {
    redirect(req, res, 'landing.html', 'settings.html');
  });

  app.get('/chart', (req, res) => {
    redirect(req, res, 'landing.html', 'chart.html');
  });
  app.get('/redirect_success', (req, res) => {
    redirect(req, res, 'landing.html', 'index.html');
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/landing.html'));
  });
};
