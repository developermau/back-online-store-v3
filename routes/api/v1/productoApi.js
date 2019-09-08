var express = require("express");
var router = express.Router();

// MODELS
var models = require("../../../models");
// HTTP CODES
var Util = require("../util/httpcodes");
// Handler Error
var fnHandlerError = require("../util/handlers");

// Nombre del modelo
const NAME_MODEL = "PRODUCTO";

// MODEL: producto
let productoModel = models.Producto;

// MODEL: fotografia
let fotografiaModel = models.Fotografia;

// MODEL: categoria
let categoriaModel = models.Categoria;

// MODEL: proveedor
let proveedorModel = models.Proveedor;

/* GET Lista de productos */
router.get("/", function(req, res, next) {
  const OPERACION = "LIST";
  console.log(`\n${NAME_MODEL}:${OPERACION}`);

  productoModel
    .findAll({
      include: [
        { model: fotografiaModel, as: "fotografias" },
        { model: categoriaModel, as: "categoria" },
        { model: proveedorModel, as: "proveedor" }
      ]
    })
    .then(function(productos) {
      res.status(200).json(productos);
    })
    .catch(err => {
      let resError = fnHandlerError(err);
      console.log(resError);
      res.status(resError.statusCode).send(resError);
    });
});

/* GET Buscar un producto por su id */
router.get("/:pr_producto", function(req, res, next) {
  const OPERACION = "FIND";
  const CAMPO = "POR ID";
  console.log(`\n${OPERACION}:${NAME_MODEL} ${CAMPO}`);

  // ID
  var productoId = req.params.pr_producto;

  productoModel
    .findByPk(productoId, {
      include: [
        { model: fotografiaModel, as: "fotografias" },
        { model: categoriaModel, as: "categoria" },
        { model: proveedorModel, as: "proveedor" }
      ]
    })
    .then(function(producto) {
      // Respuesta
      let respuesta = {};

      if (producto !== undefined && producto !== null) {
        respuesta.statusCode = Util.HttpCodes.HTTP_200_OK;
        respuesta.msg = "producto encontrado";
        respuesta.data = producto;
      } else {
        respuesta.statusCode = Util.HttpCodes.HTTP_404_NOT_FOUND;
        respuesta.msg = `producto no encontrado, con el ID: ${productoId}`;
      }

      res.status(respuesta.statusCode).json(respuesta);
    })
    .catch(err => {
      let resError = fnHandlerError(err);
      console.log(resError);
      res.status(resError.statusCode).send(resError);
    });
});

/* POST: Creacion de un nuevo producto  */
router.post("/", function(req, res, next) {
  const OPERACION = "CREATE";
  console.log(`\n${NAME_MODEL}:${OPERACION}`);

  // Request Data
  let productoRegister = req.body;
  console.log("productoRegister", productoRegister);

  productoModel
    .create(productoRegister)
    .then(producto => {
      let resCreated = {
        statusCode: Util.HttpCodes.HTTP_201_CREATED,
        msg: `producto creo exitosamente`,
        data: producto
      };
      res.status(resCreated.statusCode).json(resCreated);
    })
    .catch(err => {
      let resError = fnHandlerError(err);
      console.log(resError);
      res.status(resError.statusCode).send(resError);
    });
});

/* PUT Actualizar un producto  */
router.put("/:pr_producto", function(req, res, next) {
  const OPERACION = "UPDATE";
  console.log(`\n${NAME_MODEL}:${OPERACION}`);

  // ID
  var productoId = req.params.pr_producto;

  // Request Data
  let productoRegister = req.body;

  if (productoId !== undefined && productoId !== null) {
    productoModel
      .update(productoRegister, {
        where: {
          pr_producto: productoId
        },
        include: [
          { model: fotografiaModel, as: "fotografias" },
          { model: categoriaModel, as: "categoria" },
          { model: proveedorModel, as: "proveedor" }
        ]
      })
      .then(results => {
        // Filas actualizadas
        let quantityRowsUpdated = results[0];

        // Respuesta
        var statusCode = Util.HttpCodes.HTTP_200_OK;
        var msg = "producto actualizado exitosamente";

        if (quantityRowsUpdated === 0) {
          statusCode = Util.HttpCodes.HTTP_404_NOT_FOUND;
          msg = `producto no encontrado, con el ID: ${productoId}`;
        }

        let resUpdated = {
          statusCode,
          msg,
          data: {
            rowsUpdated: quantityRowsUpdated
          }
        };
        res.status(resUpdated.statusCode).json(resUpdated);
      })
      .catch(err => {
        let resError = fnHandlerError(err);
        console.log(resError);
        res.status(resError.statusCode).send(resError);
      });
  } else {
    let resError = {
      statusCode: Util.HttpCodes.HTTP_400_BAD_REQUEST,
      msg: `productoId no es valido, su valor actual es: ${productoId}`
    };
    res.status(resError.statusCode).send(resError);
  }
});

/* DELETE Eliminar un producto por su id */
router.delete("/:pr_producto", function(req, res, next) {
  const OPERACION = "DELETE";
  const CAMPO = "POR ID";
  console.log(`\n${OPERACION}:${NAME_MODEL} ${CAMPO}`);

  // ID
  var productoId = req.params.pr_producto;

  productoModel
    .destroy({
      where: {
        pr_producto: productoId
      }
    })
    .then(function(quantityRowsDestroyed) {
      // Respuesta
      var statusCode = Util.HttpCodes.HTTP_200_OK;
      var msg = "producto eliminado exitosamente";

      if (quantityRowsDestroyed === 0) {
        statusCode = Util.HttpCodes.HTTP_404_NOT_FOUND;
        msg = `producto no encontrado, con el ID: ${productoId}`;
      }

      let resDestroy = {
        statusCode,
        msg
      };
      res.status(resDestroy.statusCode).json(resDestroy);
    })
    .catch(err => {
      let resError = fnHandlerError(err);
      console.log(resError);
      res.status(resError.statusCode).send(resError);
    });
});

module.exports = router;
