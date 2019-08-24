'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Proveedor', [{
      pr_nombre: 'Samsung Oficial',
      pr_direccion: 'Calle Davila #76 Zona Este',
      pr_telefono: 2123456,
      pr_estado: 'A',
      // Audit
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      pr_nombre: 'Huawei Oficial',
      pr_direccion: 'Calle Sanchez Bustamante #123 Zona Sur',
      pr_telefono: 2695494,
      pr_estado: 'A',
      // Audit
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      pr_nombre: 'Apple Oficial',
      pr_direccion: 'Calle Mercado #93 Zona Central',
      pr_telefono: 72656232,
      pr_estado: 'A',
      // Audit
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      pr_nombre: 'Sony Oficial',
      pr_direccion: 'Mercado Huyustus #154 Zona Norte',
      pr_telefono: 67234233,
      pr_estado: 'A',
      // Audit
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Proveedor', null, {});
  }
};
