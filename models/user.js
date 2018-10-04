module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      // Giving the USer model a name of type STRING
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING
    });
  
    return User;
  };
  