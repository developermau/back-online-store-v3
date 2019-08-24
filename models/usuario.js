"use strict";

const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define(
    "Usuario",
    {
      us_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      us_primer_nombre: {
        type: DataTypes.STRING,
        defaultValue: ""
      },
      us_segundo_nombre: {
        type: DataTypes.STRING,
        defaultValue: ""
      },
      us_paterno_apellido: {
        type: DataTypes.STRING,
        defaultValue: ""
      },
      us_materno_apellido: {
        type: DataTypes.STRING,
        defaultValue: ""
      },
      us_genero: {
        type: DataTypes.STRING,
        defaultValue: ""
      },
      us_carnet: {
        type: DataTypes.BIGINT,
        defaultValue: 0,
        allowNull: false
      },
      us_username: {
        type: DataTypes.STRING,
        defaultValue: "",
        unique: true,
        validate: {
          notEmpty: {
            msg: "El nombre de usuario no debe ser una cadena vacia"
          }
        }
      },
      us_password: {
        type: DataTypes.STRING,
        defaultValue: "",
        validate: {
          notEmpty: {
            msg: "La contraseña no debe ser una cadena vacia"
          }
        }
      },
      us_email: {
        type: DataTypes.STRING,
        defaultValue: "",
        unique: true,
        validate: {
          isEmail: {
            msg: "La direccion de correo deberia ser valida"
          },
          notEmpty: {
            msg: "La direccion de correo no debe ser una cadena vacia"
          }
        }
      },
      us_direccion: {
        type: DataTypes.STRING,
        defaultValue: ""
      },
      us_primer_telefono: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      us_segundo_telefono: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      us_avatar: {
        type: DataTypes.STRING,
        defaultValue: ""
      },
      us_fecha_nacimiento: {
        type: DataTypes.STRING,
        defaultValue: ""
      },
      ro_rol: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 4
      },
      us_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    {
      tableName: "Usuario"
    }
  );
  Usuario.associate = function(models) {
    // associations can be defined here
    Usuario.hasMany(models.Opinion, {
      foreignKey: {
        name: "us_usuario",
        allowNull: false
      },
      as: "opinion"
    });

    Usuario.hasMany(models.Compra, {
      foreignKey: {
        name: "us_usuario",
        allowNull: false
      },
      as: "compra"
    });
  };

  Usuario.beforeSave((user, options) => {
    return bcrypt.hash(user.us_password, 10).then(function(hash) {
      user.us_password = hash;
    });
  });

  Usuario.beforeBulkCreate((users, options) => {
    for (const user of users) {
      if (user.isMember) {
        bcrypt.hash(user.us_password, 10).then(function(hash) {
          user.us_password = hash;
        });
      }
    }
  });

  Usuario.beforeBulkUpdate((users, options) => {
    for (const user of users) {
      if (user.isMember) {
        bcrypt.hash(user.us_password, 10).then(function(hash) {
          user.us_password = hash;
        });
      }
    }
  });

  return Usuario;
};
