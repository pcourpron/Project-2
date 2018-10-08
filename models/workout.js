module.exports = function(sequelize, DataTypes) {
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
