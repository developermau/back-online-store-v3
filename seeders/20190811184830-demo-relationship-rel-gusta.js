"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "RelGusta",
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
        },
        {
          us_usuario: 2,
          pr_producto: 3
        },
        {
          us_usuario: 2,
          pr_producto: 4
        },
        {
          us_usuario: 1,
          pr_producto: 5
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("RelGusta", null, {});
  }
};
