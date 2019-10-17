'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sensors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pump_id: {
        type: Sequelize.INTEGER
      },
      organization_id: {
        type: Sequelize.INTEGER
      },
      historical_id: {
        type: Sequelize.INTEGER
      },
      sensor_ID: {
        type: Sequelize.INTEGER
      },
      kind: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      cellular: {
        type: Sequelize.INTEGER
      },
      bluetooth: {
        type: Sequelize.INTEGER
      },
      training: {
        type: Sequelize.STRING
      },
      remark: {
        type: Sequelize.STRING
      },
      data_finished: {
        type: Sequelize.DATE
      },
      depth: {
        type: Sequelize.INTEGER
      },
      yield: {
        type: Sequelize.INTEGER
      },
      static: {
        type: Sequelize.INTEGER
      },
      quality: {
        type: Sequelize.STRING
      },
      level_dynamic: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('sensors');
  }
};