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
    {}
  );
  RelGusta.associate = function(models) {
    // associations can be defined here
    RelGusta.belongsTo(models.Usuario, {
      as: "usuario",
      onDelete: "CASCADE",
      foreignKey: {
        name: "us_usuario",
        allowNull: false
      }
    });

    RelGusta.belongsTo(models.Producto, {
      as: "producto",
      onDelete: "CASCADE",
      foreignKey: {
        name: "pr_producto",
        allowNull: false
      }
    });
  };
  return RelGusta;
};
