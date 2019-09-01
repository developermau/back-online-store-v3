"use strict";
module.exports = (sequelize, DataTypes) => {
  const RelIncluye = sequelize.define(
    "RelIncluye",
    {
      co_compra: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      pr_producto: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
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
    {}
  );
  RelIncluye.associate = function(models) {
    // associations can be defined here
    RelIncluye.belongsTo(models.Compra, {
      as: "compra",
      onDelete: "CASCADE",
      foreignKey: {
        name: "co_compra",
        allowNull: false
      }
    });

    RelIncluye.belongsTo(models.Producto, {
      as: "producto",
      onDelete: "CASCADE",
      foreignKey: {
        name: "pr_producto",
        allowNull: false
      }
    });
  };
  return RelIncluye;
};
