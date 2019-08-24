'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RelIncluye', {
      co_compra: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Compra',
          key: 'co_compra'
        }
      },
      pr_producto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Producto',
          key: 'pr_producto'
        }
      },
      ri_cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('RelIncluye');
  }
};