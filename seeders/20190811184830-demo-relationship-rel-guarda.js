"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "RelGuarda",
      [
        {
          us_usuario: 1,
          pr_producto: 1
        },
        {
          us_usuario: 1,
          pr_producto: 2
        },
        {
          us_usuario: 2,
          pr_producto: 2
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("RelGuarda", null, {});
  }
};
