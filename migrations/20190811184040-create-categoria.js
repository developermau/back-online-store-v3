"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Categoria", {
      ca_categoria: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ca_nombre: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      ca_imagen: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ca_estado: {
        type: Sequelize.STRING,
        allowNull: false
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
    return queryInterface.dropTable("Categoria");
  }
};
