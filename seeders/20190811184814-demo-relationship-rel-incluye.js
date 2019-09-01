'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('RelIncluye', [
      {
        co_compra: 1,
        pr_producto: 1,
        ri_cantidad: 2,
        ri_es_envio: "SI"
      },
      {
        co_compra: 2,
        pr_producto: 2,
        ri_cantidad: 2,
        ri_es_envio: "NO"
      },
      {
        co_compra: 3,
        pr_producto: 2,
        ri_cantidad: 3,
        ri_es_envio: "SI"
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('RelIncluye', null, {});
  }
};
