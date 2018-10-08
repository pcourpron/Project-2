module.exports = function(sequelize, DataTypes) {
<<<<<<< HEAD
    var Workout = sequelize.define("Workout", {
      category: DataTypes.STRING,
      distance: DataTypes.INTEGER, 
      workout_length: DataTypes.TIME,
      RPE: DataTypes.INTEGER, 
      stress_score: DataTypes.INTEGER,
      strava_id: DataTypes.INTEGER,
      date:DataTypes.DATEONLY,
      time:DataTypes.TIME,
      has_heartrate:{
        type:DataTypes.BOOLEAN,
        defaultValue: false
      }
    });
    return Workout;
  };
=======
  var Workout = sequelize.define('Workout', {
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
      defaultValue: false,
    },
  });
  return Workout;
};
>>>>>>> f1e627429e923469cdcb9cdc06f847084c51127b
