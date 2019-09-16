"use strict";

const models = require("../models");
const Usuario = models.Usuario;

module.exports = {
  up: (queryInterface, Sequelize) => {
    const usuarios = generateAllUsuarios(15);

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

function generateAllUsuarios(n) {
  let usuarios = [];

  for (let i = 0; i < n; i++) {
    var genero = "women";
    if (i % 2 === 0) {
      genero = "men";
    }

    let usuario = {
      us_primer_nombre: `${randomString(5)}`,
      us_segundo_nombre: `${randomString(5)}`,
      us_paterno_apellido: `${randomString(6)}`,
      us_materno_apellido: `${randomString(6)}`,
      us_genero: `${genero}`,
      us_carnet: Math.floor(Math.random() * 10) + 1,
      us_username: `${randomString(7)}`,
      us_password: `${randomString(7)}-1234`,
      us_email: `${randomString(7)}@mail.com`,
      us_direccion: `${randomString(15)}`,
      us_telefono_fijo: Math.floor(Math.random() * 10) + 1,
      us_telefono_movil: Math.floor(Math.random() * 10) + 1,
      us_avatar: `https://randomuser.me/api/portraits/thumb/${genero}/${i +
        60}.jpg`,
      us_fecha_nacimiento: new Date(
        Math.floor(Math.random() * 2010) + 1995,
        Math.floor(Math.random() * 10) + 1,
        i
      ),
      // references
      ro_rol: 1,
      us_active: true,
      // Audit
      createdAt: new Date(),
      updatedAt: new Date()
    };

    usuarios.push(usuario);
  }

  return usuarios;
}

function randomString(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
