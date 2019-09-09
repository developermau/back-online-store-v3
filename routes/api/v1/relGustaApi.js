var express = require("express");
var router = express.Router();

// MODELS
var models = require("../../../models");
// HTTP CODES
var Util = require("../util/httpcodes");
// Handler Error
var fnHandlerError = require("../util/handlersApi");

// Nombre del modelo
const NAME_MODEL = "RelGusta";

// MODEL: relGusta
let relGustaModel = models.RelGusta;

// MODEL: producto
let productoModel = models.Producto;

// MODEL: Usuario
let usuarioModel = models.Usuario;

/* GET Lista de las relaciones Incluye */
router.get("/", function(req, res, next) {
  const OPERACION = "LIST";
  console.log(`\n${NAME_MODEL}:${OPERACION}`);

  relGustaModel
    .findAll({
      include: [
        { model: usuarioModel, as: "usuario" },
        { model: productoModel, as: "producto" }
      ]
    })
    .then(function(relGustaList) {
      res.status(200).json(relGustaList);
    })
    .catch(err => {
      let resError = fnHandlerError(err);
      console.log(resError);
      res.status(resError.statusCode).send(resError);
    });
});

/* GET Buscar una relacion por su id */
router.get("/usuarios/:us_usuario", function(req, res, next) {
  const OPERACION = "FIND";
  const CAMPO = "POR ID";
  console.log(`\n${OPERACION}:${NAME_MODEL} ${CAMPO}`);

  // ID
  var usuarioId = req.params.us_usuario;

  relGustaModel
    .findAll({
      where: {
        us_usuario: usuarioId
      },
      attributes: { exclude: ["us_usuario", "pr_producto"] },
      include: [{ model: productoModel, as: "producto" }]
    })
    .then(function(relGustaList) {
      res.status(200).json(relGustaList);
    })
    .catch(err => {
      let resError = fnHandlerError(err);
      console.log(resError);
      res.status(resError.statusCode).send(resError);
    });
});

/* POST: Creacion de un nuevo relGusta  */
router.post("/", function(req, res, next) {
  const OPERACION = "CREATE";
  console.log(`\n${NAME_MODEL}:${OPERACION}`);

  // Request Data
  let relGustaRegister = req.body;

  relGustaModel
    .create(relGustaRegister)
    .then(relGusta => {
      let resCreated = {
        statusCode: Util.HttpCodes.HTTP_201_CREATED,
        msg: `La relacion se creo exitosamente`,
        data: relGusta
      };
      res.status(resCreated.statusCode).json(resCreated);
    })
    .catch(err => {
      let resError = fnHandlerError(err);
      console.log(resError);
      res.status(resError.statusCode).send(resError);
    });
});

module.exports = router;
