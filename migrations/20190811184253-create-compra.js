"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Compra", {
      co_compra: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      co_codigo_orden: {
        type: Sequelize.STRING,
        allowNull: true
      },
      co_nro_deposito: {
        type: Sequelize.STRING,
        allowNull: false
      },
      co_total_bs: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      co_estado: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "En proceso"
      },
      us_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Usuario",
          key: "us_usuario"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Compra");
  }
};
