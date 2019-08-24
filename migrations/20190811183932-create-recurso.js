'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Recurso', {
      re_recurso: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      re_titulo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      re_path: {
        allowNull: false,
        type: Sequelize.STRING
      },
      re_icon: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ar_area: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Area",
          key: "ar_area"
        }
      },
      re_activo: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true
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
    return queryInterface.dropTable('Recurso');
  }
};