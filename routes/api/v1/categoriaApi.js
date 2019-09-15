var express = require("express");
var router = express.Router();

// MODELS
var models = require("../../../models");
// HTTP CODES
var Util = require("../util/httpcodes");
// Handler Error
var fnHandlerError = require("../util/handlersApi");

// Nombre del modelo
const NAME_MODEL = "CATEGORIA";

// MODEL: categoria
let categoriaModel = models.Categoria;

// MODEL: producto
let productoModel = models.Producto;

/* GET Lista de categorias */
router.get("/", function(req, res, next) {
  const OPERACION = "LIST";
  console.log(`\n${NAME_MODEL}:${OPERACION}`);

  categoriaModel
    .findAll({
      include: [{ model: productoModel, as: "productos" }]
    })
    .then(function(categorias) {
      res.status(200).json(categorias);
    })
    .catch(err => {
      let resError = fnHandlerError(err);
      console.log(resError);
      res.status(resError.statusCode).send(resError);
    });
});

/* GET Buscar un categoria por su id */
router.get("/:ca_categoria", function(req, res, next) {
  const OPERACION = "FIND";
  const CAMPO = "POR ID";
  console.log(`\n${OPERACION}:${NAME_MODEL} ${CAMPO}`);

  // ID
  var categoriaId = req.params.ca_categoria;

  categoriaModel
    .findByPk(categoriaId, {
      include: [{ model: productoModel, as: "productos" }]
    })
    .then(function(categoria) {
      // Respuesta
      let respuesta = {};

      if (categoria !== undefined && categoria !== null) {
        respuesta.statusCode = Util.HttpCodes.HTTP_200_OK;
        respuesta.msg = "Categoria encontrado";
        respuesta.data = categoria;
      } else {
        respuesta.statusCode = Util.HttpCodes.HTTP_404_NOT_FOUND;
        respuesta.msg = `Categoria no encontrado, con el ID: ${categoriaId}`;
      }

      res.status(respuesta.statusCode).json(respuesta);
    })
    .catch(err => {
      let resError = fnHandlerError(err);
      console.log(resError);
      res.status(resError.statusCode).send(resError);
    });
});

/* GET Buscar todos los productos por categoria */
router.get("/:ca_categoria/productos", function(req, res, next) {
  const OPERACION = "FIND";
  const CAMPO = "POR ID CATEGORIA";
  console.log(`\n${OPERACION}:${NAME_MODEL} ${CAMPO}`);

  // ID
  var categoriaId = req.params.ca_categoria;

  // MODEL: producto
  let productoModel = models.Producto;

  productoModel
    .findAll({
      where: {
        ca_categoria: categoriaId
      }
    })
    .then(function(productos) {
      // Respuesta
      let respuesta = {};

      if (productos !== undefined && productos !== null) {
        if (productos.length > 0) {
          respuesta.statusCode = Util.HttpCodes.HTTP_200_OK;
          respuesta.msg = "Busqueda de productos por categoria exitosa";
          respuesta.productos = productos;
        } else {
          respuesta.statusCode = Util.HttpCodes.HTTP_404_NOT_FOUND;
          respuesta.msg = `No hay productos en la categoria: ${categoriaId}`;
          respuesta.productos = productos;
        }
      } else {
        respuesta.statusCode = Util.HttpCodes.HTTP_404_NOT_FOUND;
        respuesta.msg = `Problemas en la busqueda de productos en la categoria: ${categoriaId}`;
        respuesta.productos = productos;
      }

      res.status(respuesta.statusCode).json(respuesta);
    })
    .catch(err => {
      let resError = fnHandlerError(err);
      console.log(resError);
      res.status(resError.statusCode).send(resError);
    });
});

/* POST: Creacion de un nuevo categoria  */
router.post("/", function(req, res, next) {
  const OPERACION = "CREATE";
  console.log(`\n${NAME_MODEL}:${OPERACION}`);

  // Request Data
  let categoriaRegister = req.body;

  categoriaModel
    .create(categoriaRegister)
    .then(categoria => {
      let resCreated = {
        statusCode: Util.HttpCodes.HTTP_201_CREATED,
        msg: `Categoria creo exitosamente`,
        data: categoria
      };
      res.status(resCreated.statusCode).json(resCreated);
    })
    .catch(err => {
      let resError = fnHandlerError(err);
      console.log(resError);
      res.status(resError.statusCode).send(resError);
    });
});

/* PUT Actualizar un categoria  */
router.put("/:us_categoria", function(req, res, next) {
  const OPERACION = "UPDATE";
  console.log(`\n${NAME_MODEL}:${OPERACION}`);

  // ID
  var categoriaId = req.params.us_categoria;

  // Request Data
  let categoriaRegister = req.body;

  if (categoriaId !== undefined && categoriaId !== null) {
    categoriaModel
      .update(categoriaRegister, {
        where: {
          ca_categoria: categoriaId
        }
      })
      .then(results => {
        // Filas actualizadas
        let quantityRowsUpdated = results[0];

        // Respuesta
        var statusCode = Util.HttpCodes.HTTP_200_OK;
        var msg = "Categoria actualizado exitosamente";

        if (quantityRowsUpdated === 0) {
          statusCode = Util.HttpCodes.HTTP_404_NOT_FOUND;
          msg = `Categoria no encontrado, con el ID: ${categoriaId}`;
        }

        let resUpdated = {
          statusCode,
          msg
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
      msg: `categoriaId no es valido, su valor actual es: ${categoriaId}`
    };
    res.status(resError.statusCode).send(resError);
  }
});

/* DELETE Eliminar un categoria por su id */
router.delete("/:us_categoria", function(req, res, next) {
  const OPERACION = "DELETE";
  const CAMPO = "POR ID";
  console.log(`\n${OPERACION}:${NAME_MODEL} ${CAMPO}`);

  // ID
  var categoriaId = req.params.us_categoria;

  categoriaModel
    .destroy({
      where: {
        ca_categoria: categoriaId
      }
    })
    .then(function(quantityRowsDestroyed) {
      // Respuesta
      var statusCode = Util.HttpCodes.HTTP_200_OK;
      var msg = "Categoria eliminado exitosamente";

      if (quantityRowsDestroyed === 0) {
        statusCode = Util.HttpCodes.HTTP_404_NOT_FOUND;
        msg = `Categoria no encontrado, con el ID: ${categoriaId}`;
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
