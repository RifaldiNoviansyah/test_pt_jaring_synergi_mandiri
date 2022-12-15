'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('log_history_hit_apis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dealer_id:{
        type: Sequelize.INTEGER
      },
      time_hit_api: {
        type: Sequelize.DATE
      },
      api_name: {
        type: Sequelize.STRING
      },
      city_name: {
        type: Sequelize.STRING
      },
      country_name: {
        type: Sequelize.STRING
      },
      ip_address: {
        type: Sequelize.STRING
      },
      status_code: {
        type: Sequelize.STRING
      },
      data: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('log_history_hit_apis');
  }
};