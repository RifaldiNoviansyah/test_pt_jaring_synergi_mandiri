'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('service_bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      phone_no: {
        type: Sequelize.STRING
      },
      vehicle_type: {
        type: Sequelize.STRING
      },
      license_plate: {
        type: Sequelize.STRING
      },
      vehicle_problem: {
        type: Sequelize.TEXT
      },
      service_schedule_id: {
        type: Sequelize.INTEGER
      },
      service_time: {
        type: Sequelize.STRING
      },
      service_status_id: {
        type: Sequelize.INTEGER
      },
      del_status: {
        type: Sequelize.BOOLEAN,
        default: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('service_bookings');
  }
};