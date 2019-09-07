"use strict";
module.exports = (sequelize, DataTypes) => {
  const RelGusta = sequelize.define(
    "RelGusta",
    {
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
      tableName: "RelGusta",
      timestamps: false
    }
  );
  RelGusta.associate = function(models) {};
  return RelGusta;
};
