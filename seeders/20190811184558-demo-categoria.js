'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categoria', [{
      ca_nombre: 'Computadoras',
      ca_imagen: 'https://images.unsplash.com/photo-1495563125611-fa99f0cd529f?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&dl=julian-o-hayon-w4znns7NTA0-unsplash.jpg',
      ca_estado: 'A',
      // Audit
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      ca_nombre: 'Celulares',
      ca_imagen: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&dl=freestocks-org-11SgH7U6TmI-unsplash.jpg',
      ca_estado: 'A',
      // Audit
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      ca_nombre: 'Televisores',
      ca_imagen: 'https://pixabay.com/get/50e2d24b4d54b108f5d08460825668204022dfe05552764b7d2b72d3/tv-627876_1280.jpg',
      ca_estado: 'A',
      // Audit
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categoria', null, {});
  }
};
