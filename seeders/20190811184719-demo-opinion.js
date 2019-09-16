'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Opinion', [{
      op_texto: 'Mal Producto',
      op_calificacion: 2,
      us_usuario: 1,
      pr_producto: 1,
      // Audit
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      op_texto: 'Pesimo Producto',
      op_calificacion: 1,
      us_usuario: 2,
      pr_producto: 1,
      // Audit
      createdAt: new Date(),
      updatedAt: new Date(),
    },  {
      op_texto: 'Buen Producto',
      op_calificacion: 4,
      us_usuario: 3,
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
