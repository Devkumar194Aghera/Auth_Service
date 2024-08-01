"use strict";
const bcrypt = require("bcrypt");
const saltRounds = 10;

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate(async (user) => {
    // console.log(user);
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
  });
  return User;
};
