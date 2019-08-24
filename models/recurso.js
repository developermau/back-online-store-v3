"use strict";
module.exports = (sequelize, DataTypes) => {
  const Recurso = sequelize.define(
    "Recurso",
    {
      re_recurso: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      re_titulo: { type: DataTypes.STRING, allowNull: false },
      re_path: { type: DataTypes.STRING, allowNull: false },
      re_icon: { type: DataTypes.STRING, allowNull: false },
      ar_area: { type: DataTypes.INTEGER, allowNull: false },
      re_activo: { type: DataTypes.BOOLEAN, allowNull: false }
    },
    {
      tableName: "Recurso"
    }
  );
  Recurso.associate = function(models) {
    // associations can be defined here
    Recurso.belongsTo(models.Area, {
      foreignKey: {
        name: "ar_area",
        allowNull: false
      },
      as: "area"
    });
  };
  return Recurso;
};
