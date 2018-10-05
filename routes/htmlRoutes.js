const path = require('path');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/landing.html'));
  });
  app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/signup.html'));
  });
  app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/test.html'));
  });

  app.get('/redirect_success', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/redirect_success.html'));
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

  app.get('/chart', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/chart.html'));
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/404.html'));
  });
};
