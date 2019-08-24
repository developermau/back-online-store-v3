"use strict";
module.exports = (sequelize, DataTypes) => {
  const Fotografia = sequelize.define(
    "Fotografia",
    {
      fo_fotografia: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      fo_title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      fo_ubicacion: {
        type: DataTypes.STRING,
        allowNull: false
      },
      fo_flex: {
        type: DataTypes.INTEGER,
        allowNull: false,
        default: 6
      },
      pr_producto: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      tableName: "Fotografia"
    }
  );
  Fotografia.associate = function(models) {
    // associations can be defined here
    Fotografia.belongsTo(models.Producto, {
      foreignKey: {
        name: 'fo_fotografia',
        allowNull: false
      }, as: 'producto'
    })
  };
  return Fotografia;
};
