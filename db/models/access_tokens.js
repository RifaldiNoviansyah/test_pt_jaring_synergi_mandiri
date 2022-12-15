

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class access_tokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  access_tokens.init({
    dealer_id: DataTypes.STRING,
    access_token: DataTypes.STRING,
    access_token_expired_at: DataTypes.DATE,
    refresh_token: DataTypes.STRING,
    del_status: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: "access_tokens",
    underscored: true,
  });
  return access_tokens;
};
