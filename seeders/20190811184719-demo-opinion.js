"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const calidades = ["Pesimo", "Malo", "Bueno", "Excelente", "Perfecto"];
    const usuarios = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const productos = [1, 2, 3, 4, 5];

    const opinionesGeneradas = generarOpiniones(
      15,
      calidades,
      usuarios,
      productos
    );

    return queryInterface.bulkInsert("Opinion", opinionesGeneradas);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Opinion", null, {});
  }
};

function generarOpiniones(n, calidades, usuarios, productos) {
  const opiniones = [];

  for (let i = 0; i < n; i++) {
    const calificacion = Math.floor(Math.random() * 5) + 1;
    const usuarioId = Math.floor(Math.random() * usuarios.length) + 1;
    const productoId = Math.floor(Math.random() * productos.length) + 1;

    const opinion = {
      op_texto: `${calidades[calificacion]} Producto`,
      op_calificacion: calificacion,
      us_usuario: usuarioId,
      pr_producto: productoId,
      // Audit
      createdAt: new Date(),
      updatedAt: new Date()
    };
    opiniones.push(opinion);
  }

  return opiniones;
}
