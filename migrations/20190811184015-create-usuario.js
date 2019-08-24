"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Usuario", {
      us_usuario: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      us_primer_nombre: {
        type: Sequelize.STRING
      },
      us_segundo_nombre: {
        type: Sequelize.STRING
      },
      us_paterno_apellido: {
        type: Sequelize.STRING
      },
      us_materno_apellido: {
        type: Sequelize.STRING
      },
      us_genero: {
        type: Sequelize.STRING
      },
      us_carnet: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      us_username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      us_password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      us_email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      us_direccion: {
        type: Sequelize.STRING
      },
      us_primer_telefono: {
        type: Sequelize.INTEGER
      },
      us_segundo_telefono: {
        type: Sequelize.INTEGER
      },
      us_avatar: {
        type: Sequelize.STRING
      },
      us_fecha_nacimiento: {
        type: Sequelize.STRING
      },
      ro_rol: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Rol",
          key: "ro_rol"
        }
      },
      us_active: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Usuario");
  }
};
