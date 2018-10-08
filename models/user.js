module.exports = function(sequelize, DataTypes) {
<<<<<<< HEAD
    var User = sequelize.define("User", {
      // Giving the USer model a name of type STRING
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      strava_auth : DataTypes.STRING,
      auth_key: DataTypes.STRING
    });
  
    return User;
  };
  
=======
  var User = sequelize.define('User', {
    // Giving the USer model a name of type STRING
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    strava_auth: DataTypes.STRING,
  });

  return User;
};
>>>>>>> f1e627429e923469cdcb9cdc06f847084c51127b
