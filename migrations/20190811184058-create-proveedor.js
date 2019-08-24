'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Proveedor', {
      pr_proveedor: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pr_nombre: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      pr_direccion: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pr_telefono: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      pr_estado: {
        type: Sequelize.STRING,
        allowNull: false,
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
    return queryInterface.dropTable('Proveedor');
  }
};