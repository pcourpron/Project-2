module.exports = function(sequelize, DataTypes) {
    var Workout = sequelize.define("Workout", {
      category: DataTypes.STRING,
      distance: DataTypes.INTEGER, 
      workout_length: DataTypes.TIME,
    });
    return Todo;
  };