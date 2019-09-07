"use strict";
module.exports = (sequelize, DataTypes) => {
  const RelPertenece = sequelize.define(
    "RelPertenece",
    {
      ro_rol: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      ar_area: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      tableName: "RelPertenece",
      timestamps: false
    }
  );
  RelPertenece.associate = function(models) {
    // associations can be defined here
    RelPertenece.belongsTo(models.Rol, {
      as: "rol",
      onDelete: "CASCADE",
      foreignKey: {
        name: "ro_rol",
        allowNull: false
      }
    });

    RelPertenece.belongsTo(models.Area, {
      as: "area",
      onDelete: "CASCADE",
      foreignKey: {
        name: "ar_area",
        allowNull: false
      }
    });
  };
  return RelPertenece;
};
