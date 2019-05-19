const {PythonShell} = require('python-shell');


module.exports = function (app) {

app.post("/dalembert", callD_alembert);


function callD_alembert(req, res) {
  res.send('hi')
  PythonShell.run("./python/hrv.py", null, function (err, data) {
    console.log('==========')
    console.log('results: %j', data);
    let results = JSON.parse(data[0].replace(/'/g,"\""));
    console.log(results.test)
    console.log('==========')
    if (err) res.send(err);
    res.send(results.test)
  });
}
}