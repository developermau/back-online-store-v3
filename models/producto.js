"use strict";
module.exports = (sequelize, DataTypes) => {
  const Producto = sequelize.define(
    "Producto",
    {
      pr_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      pr_nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
        unique: true
      },
      pr_descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
      },
      pr_marca: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
      },
      pr_precio_bs: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isDecimal: true,
          notNull: true
        }
      },
      pr_precio_envio_bs: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isDecimal: true,
          notNull: true
        }
      },
      pr_stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      pr_year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      pr_estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "A"
      },
      ca_categoria: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      pr_proveedor: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      tableName: "Producto"
    }
  );
  Producto.associate = function(models) {
    // associations can be defined here
    Producto.hasMany(models.Fotografia, {
      foreignKey: {
        name: "pr_producto",
        allowNull: false
      },
      as: "fotografias"
    });

    Producto.hasMany(models.Opinion, {
      foreignKey: {
        name: "pr_producto",
        allowNull: false
      },
      as: "opinions"
    });

    Producto.belongsTo(models.Proveedor, {
      foreignKey: {
        name: "pr_proveedor",
        allowNull: false
      },
      as: "proveedor"
    });

    Producto.belongsTo(models.Categoria, {
      foreignKey: {
        name: "ca_categoria",
        allowNull: false
      },
      as: "categoria"
    });
  };
  return Producto;
};
