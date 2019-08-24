"use strict";
module.exports = (sequelize, DataTypes) => {
  const Rol = sequelize.define(
    "Rol",
    {
      ro_rol: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      ro_titulo: {
        type: DataTypes.STRING
      },
      ro_activo: {
        type: DataTypes.BOOLEAN
      }
    },
    {
      tableName: "Rol"
    }
  );
  Rol.associate = function(models) {
    // associations can be defined here
  };
  return Rol;
};
