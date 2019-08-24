"use strict";
module.exports = (sequelize, DataTypes) => {
  const RelGuarda = sequelize.define(
    "RelGuarda",
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
  RelGuarda.associate = function(models) {
    // associations can be defined here
    RelGuarda.belongsTo(models.Usuario, {
      as: "usuario",
      onDelete: "CASCADE",
      foreignKey: {
        name: "us_usuario",
        allowNull: false
      }
    });

    RelGuarda.belongsTo(models.Producto, {
      as: "producto",
      onDelete: "CASCADE",
      foreignKey: {
        name: "pr_producto",
        allowNull: false
      }
    });
  };
  return RelGuarda;
};
