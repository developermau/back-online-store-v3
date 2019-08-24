"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Opinion", {
      op_opinion: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      op_texto: {
        type: Sequelize.STRING,
        allowNull: false
      },
      op_calificacion: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      us_usuario: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Usuario",
          key: "us_usuario"
        }
      },
      pr_producto: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Producto",
          key: "pr_producto"
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
    return queryInterface.dropTable("Opinion");
  }
};
