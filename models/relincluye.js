"use strict";
module.exports = (sequelize, DataTypes) => {
  const RelIncluye = sequelize.define(
    "RelIncluye",
    {
      ri_cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      ri_es_envio: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "NO"
      }
    },
    {
      tableName: "RelIncluye",
      timestamps: false
    }
  );
  RelIncluye.associate = function(models) {};
  return RelIncluye;
};
