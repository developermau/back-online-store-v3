"use strict";
module.exports = (sequelize, DataTypes) => {
  const Categoria = sequelize.define(
    "Categoria",
    {
      ca_categoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      ca_nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      ca_imagen: {
        type: DataTypes.STRING,
        defaultValue: ""
      },
      ca_estado: {
        type: DataTypes.STRING,
        defaultValue: "A"
      }
    },
    {
      tableName: "Categoria"
    }
  );
  Categoria.associate = function(models) {
    // associations can be defined here
    Categoria.hasMany(models.Producto, {
      foreignKey: {
        name: "ca_categoria",
        allowNull: false
      },
      as: "producto"
    });
  };
  return Categoria;
};
