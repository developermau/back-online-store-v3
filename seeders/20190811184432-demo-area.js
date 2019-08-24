"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Area",
      [
        {
          ar_titulo: "Administración",
          // Audit
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          ar_titulo: "Inventario",
          // Audit
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          ar_titulo: "Ventas",
          // Audit
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Area", null, {});
  }
};
