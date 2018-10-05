const path = require('path');
const db = require('../models');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/landing.html'));
  });

  app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/signup.html'));
  });

  app.get('/log', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/log.html'));
  });

  app.get('/view', (req, res) => {
    const workoutArray = [];
    let workoutObject;
    db.Workout.findAll().then((data) => {
      data.forEach((workout) => {
        const workoutType = workout.dataValues.category;
        workoutObject = workout.dataValues;
        workoutObject[workoutType] = true;
        workoutArray.push(workoutObject);
      });
      res.render('view', { workout: workoutArray });
    });
  });

  app.get('/sync', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/sync.html'));
  });

  app.get('/settings', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/settings.html'));
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/404.html'));
  });
};
