const path = require('path');
const db = require('../models');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/landing.html'));
  });

  app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/signup.html'));
  });

  app.get('/homepage', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/index.html'));
  });

  app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/test.html'));
  });

  app.get('/redirect_success', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/redirect_success.html'));
  });

  app.get('/log', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/log.html'));
  });

  app.get('/view', (req, res) => {
    const crossfitArray = [];
    const hikeArray = [];
    const rideArray = [];
    const runArray = [];
    const swimArray = [];
    const walkArray = [];
    const otherArray = [];
    db.Workout.findAll().then((data) => {
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
            break;
          case 'hike':
            hikeArray.push(workout.dataValues);
            break;
          case 'ride':
            rideArray.push(workout.dataValues);
            break;
          case 'run':
            runArray.push(workout.dataValues);
            break;
          case 'swim':
            swimArray.push(workout.dataValues);
            break;
          case 'walk':
            walkArray.push(workout.dataValues);
            break;
          case 'other':
            otherArray.push(workout.dataValues);
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
      });
    });
  });

  app.get('/sync', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/sync.html'));
  });

  app.get('/settings', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/settings.html'));
  });

  app.get('/chart', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/chart.html'));
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/404.html'));
  });
};
