"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Producto", {
      pr_producto: {
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
      pr_descripcion: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      pr_marca: {
        type: Sequelize.STRING,
        allowNull: false
      },
      pr_precio_bs: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      pr_precio_envio_bs: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      pr_stock: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      pr_year: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      pr_estado: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ca_categoria: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Categoria",
          key: "ca_categoria"
        }
      },
      pr_proveedor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Proveedor",
          key: "pr_proveedor"
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
    return queryInterface.dropTable("Producto");
  }
};
