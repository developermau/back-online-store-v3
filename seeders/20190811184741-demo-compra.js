"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Compra",
      [
        {
          co_codigo_orden: "C-001-2019",
          co_nro_deposito: "D-123-45679",
          co_total_bs: 5000,
          co_estado: "FINALIZADA",
          us_usuario: 1,
          // Audit
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          co_codigo_orden: "C-002-2019",
          co_nro_deposito: "D-324-54353",
          co_total_bs: 4000,
          co_estado: "EN ENVIO",
          us_usuario: 2,
          // Audit
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          co_codigo_orden: "C-003-2019",
          co_nro_deposito: "D-767-65546",
          co_total_bs: 5000,
          co_estado: "FINALIZADA",
          us_usuario: 2,
          // Audit
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Compra", null, {});
  }
};
