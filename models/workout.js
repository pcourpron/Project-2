<<<<<<< HEAD
module.exports = function(sequelize, DataTypes) {
  var Workout = sequelize.define('Workout', {
=======
module.exports = function (sequelize, DataTypes) {
  var Workout = sequelize.define("Workout", {
>>>>>>> Law
    category: DataTypes.STRING,
    distance: DataTypes.INTEGER,
    workout_length: DataTypes.TIME,
    RPE: DataTypes.INTEGER,
    stress_score: DataTypes.INTEGER,
    strava_id: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
    time: DataTypes.TIME,
    has_heartrate: {
      type: DataTypes.BOOLEAN,
<<<<<<< HEAD
      defaultValue: false,
    },
  });
  return Workout;
};
=======
      defaultValue: false
    }
  });
  return Workout;
};
>>>>>>> Law
