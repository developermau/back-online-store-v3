'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let fotografias = fotografiasGenerated();

    try {
      return queryInterface.bulkInsert("Fotografia", fotografias, {});      
    } catch (error) {
      console.error(error);
    }
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Fotografia", null, {});
  }
};

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function fotografiasGenerated() {
  // Categoria #1: Computadoras
  let fotografiasComputadoras = fotografiasGeneratedByCategoria(
    "computers",
    "computer",
    5
  );

  // Categoria #2: Celulares
  let fotografiasCelulares = fotografiasGeneratedByCategoria(
    "cellphones",
    "cellphone",
    10
  );

  // Categoria #3: Televisores
  let fotografiasTelevisores = fotografiasGeneratedByCategoria(
    "televisions",
    "tv",
    7
  );

  let fotografias = fotografiasComputadoras.concat(
    fotografiasCelulares,
    fotografiasTelevisores
  );

  return fotografias;
}

function fotografiasGeneratedByCategoria(folder_name, ca_nombre, count) {
  // https://raw.githubusercontent.com/alxmcr/assets-online-store/master/cellphones/cellphone-%20(10).jpg
  // https://raw.githubusercontent.com/alxmcr/assets-online-store/master/computers/computer-%20(1).jpg
  // https://raw.githubusercontent.com/alxmcr/assets-online-store/master/televisions/tv-%20(1).png

  let rootPath =
    "https://raw.githubusercontent.com/alxmcr/assets-online-store/master";

  let fotografias = [];

  for (let i = 1; i <= count; i++) {
    let fo_ubicacion = `${rootPath}/${folder_name}/${ca_nombre}-%20(${i}).jpg`;

    fotografias.push({
      fo_title: `Fotografia de ${ca_nombre}`,
      fo_ubicacion: fo_ubicacion,
      fo_flex: 6,
      pr_producto: i,
      // Audit
      createdAt: new Date(),
      updatedAt: new Date()
    });

    fo_ubicacion = `${rootPath}/${folder_name}/${ca_nombre}-%20(${i}).jpg`;

    fotografias.push({
      fo_title: `Fotografia de ${ca_nombre}`,
      fo_ubicacion: fo_ubicacion,
      fo_flex: 12,
      pr_producto: i,
      // Audit
      createdAt: new Date(),
      updatedAt: new Date()
    });

    fo_ubicacion = `${rootPath}/${folder_name}/${ca_nombre}-%20(${i}).jpg`;

    fotografias.push({
      fo_title: `Fotografia de ${ca_nombre}`,
      fo_ubicacion: fo_ubicacion,
      fo_flex: 6,
      pr_producto: i,
      // Audit
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  return fotografias;
}
