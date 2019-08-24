"use strict";
module.exports = (sequelize, DataTypes) => {
  const Area = sequelize.define(
    "Area",
    {
      ar_area: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      ar_titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      ar_activa: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    },
    {
      tableName: "Area"
    }
  );
  Area.associate = function(models) {
    // associations can be defined here
    Area.hasMany(models.Recurso, {
      foreignKey: {
        name: "ar_area",
        allowNull: false
      },
      as: "recurso"
    });
  };
  return Area;
};
