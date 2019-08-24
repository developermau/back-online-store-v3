"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Fotografia", {
      fo_fotografia: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fo_title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fo_ubicacion: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fo_flex: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      pr_producto: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    return queryInterface.dropTable("Fotografia");
  }
};
