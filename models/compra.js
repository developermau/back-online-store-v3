"use strict";
module.exports = (sequelize, DataTypes) => {
  const Compra = sequelize.define(
    "Compra",
    {
      co_compra: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      co_codigo_orden: {
        type: DataTypes.STRING,
        allowNull: true
      },
      co_nro_deposito: {
        type: DataTypes.STRING,
        allowNull: false
      },
      co_total_bs: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      co_estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "En proceso"
      },
      us_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      tableName: "Compra"
    }
  );
  Compra.associate = function(models) {
    // associations can be defined here
    Compra.belongsTo(models.Usuario, {
      foreignKey: {
        name: "co_compra",
        allowNull: false
      },
      as: "usuario"
    });
  };
  return Compra;
};
