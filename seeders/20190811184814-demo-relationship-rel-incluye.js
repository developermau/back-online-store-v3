'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('RelIncluye', [
      {
        co_compra: 1,
        pr_producto: 1,
        ri_cantidad: 2
      },
      {
        co_compra: 2,
        pr_producto: 2,
        ri_cantidad: 2
      },
      {
        co_compra: 3,
        pr_producto: 2,
        ri_cantidad: 3
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('RelIncluye', null, {});
  }
};
