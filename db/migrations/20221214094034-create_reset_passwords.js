'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reset_passwords', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dealer_id: {
        type: Sequelize.INTEGER
      },
      old_password: {
        type: Sequelize.STRING
      },
      token_forgot_password: {
        type: Sequelize.STRING(500)
      },
      token_forgot_password_expired_at: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('reset_passwords');
  }
};