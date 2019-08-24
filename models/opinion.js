"use strict";
module.exports = (sequelize, DataTypes) => {
  const Opinion = sequelize.define(
    "Opinion",
    {
      op_opinion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      op_texto: {
        type: DataTypes.STRING,
        allowNull: false
      },
      op_calificacion: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      us_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      pr_producto: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      tableName: "Opinion"
    }
  );
  Opinion.associate = function(models) {
    // associations can be defined here
    Opinion.belongsTo(models.Producto, {
      foreignKey: {
        name: "op_opinion",
        allowNull: false
      },
      as: "producto"
    });

    Opinion.belongsTo(models.Usuario, {
      foreignKey: {
        name: "op_opinion",
        allowNull: false
      },
      as: "usuario"
    });
  };
  return Opinion;
};
