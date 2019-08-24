'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Opinion', [{
      op_texto: 'Buen Producto',
      op_calificacion: 4,
      us_usuario: 1,
      pr_producto: 1,
      // Audit
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      op_texto: 'Buen Producto',
      op_calificacion: 4,
      us_usuario: 2,
      pr_producto: 1,
      // Audit
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Opinion', null, {});
  }
};
