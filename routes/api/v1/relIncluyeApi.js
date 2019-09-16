var express = require("express");
var router = express.Router();

// MODELS
var models = require("../../../models");
// HTTP CODES
var Util = require("../util/httpcodes");
// Handler Error
var fnHandlerError = require("../util/handlersApi");

// Nombre del modelo
const NAME_MODEL = "RelIncluye";

// MODEL: relIncluye
let relIncluyeModel = models.RelIncluye;

// MODEL: producto
let productoModel = models.Producto;

// MODEL: Compra
let compraModel = models.Compra;

// MODEL: usuario
let usuarioModel = models.Usuario;

/* GET Lista de las relaciones Incluye */
router.get("/", function(req, res, next) {
  const OPERACION = "LIST";
  console.log(`\n${NAME_MODEL}:${OPERACION}`);

  relIncluyeModel
    .findAll({
      // attributes: { exclude: ["us_usuario", "pr_producto"] },
      include: [
        {
          model: compraModel,
          as: "compra",
          include: [{ model: usuarioModel, as: "usuario" }]
        },
        { model: productoModel, as: "producto" }
      ]
    })
    .then(function(relIncluyes) {
      res.status(200).json(relIncluyes);
    })
    .catch(err => {
      let resError = fnHandlerError(err);
      console.log(resError);
      res.status(resError.statusCode).send(resError);
    });
});

/* POST: Creacion de un nuevo relIncluye  */
router.post("/", function(req, res, next) {
  const OPERACION = "CREATE";
  console.log(`\n${NAME_MODEL}:${OPERACION}`);

  // Request Data
  let relIncluyeRegister = req.body;

  relIncluyeModel
    .create(relIncluyeRegister)
    .then(relIncluye => {
      let resCreated = {
        statusCode: Util.HttpCodes.HTTP_201_CREATED,
        msg: `La relacion se creo exitosamente`,
        data: relIncluye
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
