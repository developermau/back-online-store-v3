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
        unique: true
      },
      pr_descripcion: {
        type: DataTypes.STRING,
        allowNull: false
      },
      pr_marca: {
        type: DataTypes.STRING,
        allowNull: false
      },
      pr_precio_bs: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          isDecimal: true,
          notNull: true
        }
      },
      pr_precio_envio_bs: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          isDecimal: true,
          notNull: true
        }
      },
      pr_stock: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      pr_year: {
        type: DataTypes.INTEGER,
        allowNull: false
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
      as: "opiniones"
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

    // belongsToMany:
    // adiciona a la tabla RelIncluye una foreignKey 'pr_producto'
    Producto.belongsToMany(models.Compra, {
      through: models.RelIncluye,
      foreignKey: "pr_producto"
    });

    // belongsToMany:
    // adiciona a la tabla RelGusta una foreignKey 'pr_producto'
    Producto.belongsToMany(models.Usuario, {
      through: models.RelGusta,
      foreignKey: "pr_producto"
    });
  };
  return Producto;
};
