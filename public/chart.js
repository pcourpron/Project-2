var Sequelize = require("sequelize");
var sequelize = require("../config/connection.js");

var array = [1, 12, 12, 12, 1];
var labelArray = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

var chart = document.getElementById("my-chart");

new Chartist.Line("#my-chart", {
    labels: labelArray,
    series: [   
        array,
        [2, 4, 7, 3, 6],
        [5, 9, 8, 7, 6]
    ]
});