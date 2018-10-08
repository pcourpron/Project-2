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
  var User = sequelize.define("User", {
    // Giving the USer model a name of type STRING
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    strava_auth : DataTypes.STRING
  });

  return User;
};
>>>>>>> ef975582e3394b2278f219af681634e858781339
