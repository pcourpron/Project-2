module.exports = function(sequelize, DataTypes) {
    var Workout = sequelize.define("Workout", {
      category: DataTypes.STRING,
      distance: DataTypes.INTEGER, 
      workout_length: DataTypes.TIME,
      RPE: DataTypes.INTEGER, 
      stress_score: DataTypes.INTEGER
    });
    return Workout;
  };