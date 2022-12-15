const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class service_statuses extends Model {
    static associate(models) {
      this.hasMany(models.service_bookings, { foreignKey: "service_schedule_id", sourceKey: "id", as: "serviceBookings" });
    }
  }
  service_statuses.init({
    name: DataTypes.STRING,
    del_status: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: "service_statuses",
    underscored: true,
  });
  return service_statuses;
};
