const path = require('path');

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
    res.sendFile(path.join(__dirname, '../public/view.html'));
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
