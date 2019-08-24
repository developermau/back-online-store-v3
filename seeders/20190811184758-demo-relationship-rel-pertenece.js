"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "RelPertenece",
      [
        {
          ro_rol: 1,
          ar_area: 1
        },
        {
          ro_rol: 1,
          ar_area: 2
        },
        {
          ro_rol: 1,
          ar_area: 3
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("RelPertenece", null, {});
  }
};
