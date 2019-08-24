'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RelPertenece', {
      ro_rol: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Rol',
          key: 'ro_rol'
        }
      },
      ar_area: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Area',
          key: 'ar_area'
        }
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('RelPertenece');
  }
};