const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class service_schedules extends Model {
    static associate(models) {
      this.hasMany(models.service_bookings, { foreignKey: "service_schedule_id", sourceKey: "id", as: "serviceBookings" });
    }
  }
  service_schedules.init({
    schedule_date: DataTypes.DATE,
    quota: DataTypes.INTEGER,
    del_status: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: "service_schedules",
    underscored: true,
  });
  return service_schedules;
};
