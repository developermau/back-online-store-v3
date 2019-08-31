"use strict";

const models = require("../models");
const Usuario = models.Usuario;

module.exports = {
  up: (queryInterface, Sequelize) => {
    const usuarios = generateAllUsuarios();

    try {
      return Usuario.bulkCreate(usuarios, {});
    } catch (error) {
      console.error(error);
    }
  },

  down: (queryInterface, Sequelize) => {
    return Usuario.destroy({
      where: {},
      truncate: true /* this will ignore where and truncate the table instead */
    });
  }
};

function generateAllUsuarios() {
  return [
    {
      us_primer_nombre: "Juan",
      us_segundo_nombre: "Fernando",
      us_paterno_apellido: "Flores",
      us_materno_apellido: "Dominguez",
      us_genero: "Masculino",
      us_carnet: 85696542,
      us_username: "jflores",
      us_password: "jflores-1234",
      us_email: "jflores@mail.com",
      us_direccion: "Calle Roma #231 Zona Central",
      us_primer_telefono: 2456456,
      us_segundo_telefono: 75415642,
      us_avatar: "https://randomuser.me/api/portraits/thumb/men/65.jpg",
      us_fecha_nacimiento: new Date(1980, 5, 15),
      // references
      ro_rol: 1,
      us_active: true,
      // Audit
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      us_primer_nombre: "Maria",
      us_segundo_nombre: "Tatiana",
      us_paterno_apellido: "Castro",
      us_materno_apellido: "Nogales",
      us_genero: "Femenino",
      us_carnet: 65898454,
      us_username: "mcastro",
      us_password: "mcastro-1234",
      us_email: "mcastro@mail.com",
      us_direccion: "Av. Murillo #654 Zona Central",
      us_primer_telefono: 3567874,
      us_segundo_telefono: 69845642,
      us_avatar: "https://randomuser.me/api/portraits/thumb/women/60.jpg",
      us_fecha_nacimiento: new Date(1995, 12, 18),
      // references
      ro_rol: 2,
      us_active: true,
      // Audit
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];
}
