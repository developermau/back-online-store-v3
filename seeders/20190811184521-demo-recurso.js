"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Recurso",
      [
        {
          re_titulo: "Usuarios",
          re_path: "/usuarios",
          re_icon: "mdi-user",
          ar_area: 1,
          // Audit
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          re_titulo: "Categorias",
          re_path: "/categorias",
          re_icon: "mdi-icon",
          ar_area: 2,
          // Audit
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          re_titulo: "Proveedores",
          re_path: "/proveedores",
          re_icon: "mdi-icon",
          ar_area: 2,
          // Audit
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          re_titulo: "Productos",
          re_path: "/productos",
          re_icon: "mdi-icon",
          ar_area: 2,
          // Audit
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          re_titulo: "Ordenes",
          re_path: "/ordenes",
          re_icon: "mdi-icon",
          ar_area: 3,
          // Audit
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          re_titulo: "Pagos",
          re_path: "/pagos",
          re_icon: "mdi-pay",
          ar_area: 3,
          // Audit
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          re_titulo: "Clientes",
          re_path: "/clientes",
          re_icon: "mdi-customer",
          ar_area: 3,
          // Audit
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Recurso", null, {});
  }
};
