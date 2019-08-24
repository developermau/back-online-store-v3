"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Rol",
      [
        {
          ro_titulo: "Administrador",
          // Audit
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          ro_titulo: "Jefe de Inventario",
          // Audit
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          ro_titulo: "Vendedor",
          // Audit
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          ro_titulo: "Cliente",
          // Audit
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Rol", null, {});
  }
};
