<<<<<<< HEAD

module.exports = function(sequelize, DataTypes) {

  var Workout = sequelize.define('Workout', {
    user_id: DataTypes.STRING,
=======
module.exports = function (sequelize, DataTypes) {
  var Workout = sequelize.define("Workout", {
>>>>>>> 53fd7893662feb742a36678d84e2b199443d4832
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
      defaultValue: false
    }
  });
  return Workout;
};
