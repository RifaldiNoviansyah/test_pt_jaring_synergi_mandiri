const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class service_bookings extends Model {
    static associate(models) {
      this.belongsTo(models.service_schedules, { foreignKey: "service_schedule_id", targetKey: "id", as: "serviceSchedules" });
      this.belongsTo(models.service_statuses, { foreignKey: "service_status_id", targetKey: "id", as: "serviceStatuses" });
    }
  }
  service_bookings.init({
    name: DataTypes.STRING,
    phone_no: DataTypes.STRING,
    vehicle_type: DataTypes.STRING,
    license_plate: DataTypes.STRING,
    vehicle_problem: DataTypes.STRING,
    service_schedule_id: DataTypes.INTEGER,
    service_time: DataTypes.STRING,
    service_status_id: DataTypes.INTEGER,
    del_status: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: "service_bookings",
    underscored: true,
  });
  return service_bookings;
};
