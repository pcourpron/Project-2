var Chartist = require("chartist");

var data = {
    labels: ["Mon", 'Tue', 'Wed', 'Thu', 'Fri'],

    series: [
        [5, 2, 4, 2, 0]
    ]
}

new Chartist.Line('.ct-chart,', data);