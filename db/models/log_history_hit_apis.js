const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class log_history_hit_apis extends Model {
    static associate(models) {
    }
  }
  log_history_hit_apis.init({
    dealer_id: DataTypes.INTEGER,
    time_hit_api: DataTypes.DATE,
    api_name: DataTypes.STRING,
    city_name: DataTypes.STRING,
    country_name: DataTypes.STRING,
    ip_address: DataTypes.STRING,
    status_code: DataTypes.STRING,
    data: DataTypes.STRING,
    del_status: DataTypes.BOOLEAN,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: "log_history_hit_apis",
    underscored: true,
  });
  return log_history_hit_apis;
};
