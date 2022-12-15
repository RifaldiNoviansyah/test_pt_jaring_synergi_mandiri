const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class dealers extends Model {
    static associate(models) {
    }
  }
  dealers.init({
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    status_login: DataTypes.BOOLEAN,
    del_status: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: "dealers",
    underscored: true,
  });
  return dealers;
};
