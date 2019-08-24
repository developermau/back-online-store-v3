"use strict";
module.exports = (sequelize, DataTypes) => {
  const Proveedor = sequelize.define(
    "Proveedor",
    {
      pr_proveedor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      pr_nombre: {
        type: DataTypes.STRING,
        defaultValue: "",
        unique: true
      },
      pr_direccion: {
        type: DataTypes.STRING,
        defaultValue: ""
      },
      pr_telefono: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      pr_estado: {
        type: DataTypes.STRING,
        defaultValue: "A"
      }
    },
    {
      tableName: "Proveedor"
    }
  );
  Proveedor.associate = function(models) {
    // associations can be defined here
    Proveedor.hasMany(models.Producto, {
      foreignKey: {
        name: "pr_proveedor",
        allowNull: false
      },
      as: "producto"
    });
  };
  return Proveedor;
};
