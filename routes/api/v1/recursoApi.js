var express = require("express");
var router = express.Router();

// MODELS
var models = require('../../../models');
// HTTP CODES
var Util = require('../util/httpcodes');
// Handler Error
var fnHandlerError = require('../util/handlers');

// Nombre del modelo
const NAME_MODEL = "RECURSO";

/* GET Lista de recursos */
router.get("/", function(req, res, next) {
  const OPERACION = "LIST";
  console.log(`\n${NAME_MODEL}:${OPERACION}`);

  // MODEL: recurso
  let recursoModel = models.Recurso;

  recursoModel
    .findAll()
    .then(function(recursos) {
      res.status(200).json(recursos);
    })
    .catch(err => {
      let resError = fnHandlerError(err);
      console.log(resError);
      res.status(resError.statusCode).send(resError);
    });
});

/* GET Buscar un recurso por su id */
router.get("/:re_recurso", function(req, res, next) {
  const OPERACION = "FIND";
  const CAMPO = "POR ID";
  console.log(`\n${OPERACION}:${NAME_MODEL} ${CAMPO}`);

  // ID
  var recursoId = req.params.re_recurso;

  // MODEL: recurso
  let recursoModel = models.Recurso;

  recursoModel
    .findByPk(recursoId)
    .then(function(recurso) {
      // Respuesta
      let respuesta = {};

      if (recurso !== undefined && recurso !== null) {
        respuesta.statusCode = Util.HttpCodes.HTTP_200_OK;
        respuesta.msg = "recurso encontrado";
        respuesta.data = recurso;
      } else {
        respuesta.statusCode = Util.HttpCodes.HTTP_404_NOT_FOUND;
        respuesta.msg = `recurso no encontrado, con el ID: ${recursoId}`;
      }

      res.status(respuesta.statusCode).json(respuesta);
    })
    .catch(err => {
      let resError = fnHandlerError(err);
      console.log(resError);
      res.status(resError.statusCode).send(resError);
    });
});

/* GET Buscar todos los recursos de una area */
router.get("/area/:ar_area", function(req, res, next) {
  const OPERACION = "FIND";
  const CAMPO = "POR ID";
  console.log(`\n${OPERACION}:${NAME_MODEL} ${CAMPO}`);

  // ID
  var areaId = req.params.ar_area;

  // MODEL: recurso
  let recursoModel = models.Recurso;

  recursoModel
    .findAll({
      where: {
        ar_area: areaId
      }
    })
    .then(function(recurso) {
      // Respuesta
      let respuesta = {};

      if (recurso !== undefined && recurso !== null) {
        respuesta.statusCode = Util.HttpCodes.HTTP_200_OK;
        respuesta.msg = "recurso encontrado";
        respuesta.data = recurso;
      } else {
        respuesta.statusCode = Util.HttpCodes.HTTP_404_NOT_FOUND;
        respuesta.msg = `recurso no encontrado, con el ID: ${recursoId}`;
      }

      res.status(respuesta.statusCode).json(respuesta);
    })
    .catch(err => {
      let resError = fnHandlerError(err);
      console.log(resError);
      res.status(resError.statusCode).send(resError);
    });
});

/* POST: Creacion de un nuevo recurso  */
router.post("/", function(req, res, next) {
  const OPERACION = "CREATE";
  console.log(`\n${NAME_MODEL}:${OPERACION}`);

  // MODEL: recurso
  let recursoModel = models.Recurso;

  // Request Data
  let recursoRegister = req.body;

  recursoModel
    .create(recursoRegister)
    .then(recurso => {
      let resCreated = {
        statusCode: Util.HttpCodes.HTTP_201_CREATED,
        msg: `recurso creo exitosamente`,
        data: recurso
      };
      res.status(resCreated.statusCode).json(resCreated);
    })
    .catch(err => {
      let resError = fnHandlerError(err);
      console.log(resError);
      res.status(resError.statusCode).send(resError);
    });
});

/* PUT Actualizar un recurso  */
router.put("/:us_recurso", function(req, res, next) {
  const OPERACION = "UPDATE";
  console.log(`\n${NAME_MODEL}:${OPERACION}`);

  // ID
  var recursoId = req.params.us_recurso;

  // Request Data
  let recursoRegister = req.body;

  // MODEL: recurso
  let recursoModel = models.Recurso;

  if (recursoId !== undefined && recursoId !== null) {
    recursoModel
      .update(recursoRegister, {
        where: {
          re_recurso: recursoId
        }
      })
      .then(results => {
        // Filas actualizadas
        let quantityRowsUpdated = results[0];

        // Respuesta
        var statusCode = Util.HttpCodes.HTTP_200_OK;
        var msg = "recurso actualizado exitosamente";

        if (quantityRowsUpdated === 0) {
          statusCode = Util.HttpCodes.HTTP_404_NOT_FOUND;
          msg = `recurso no encontrado, con el ID: ${recursoId}`;
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
      msg: `recursoId no es valido, su valor actual es: ${recursoId}`
    };
    res.status(resError.statusCode).send(resError);
  }
});

/* DELETE Eliminar un recurso por su id */
router.delete("/:us_recurso", function(req, res, next) {
  const OPERACION = "DELETE";
  const CAMPO = "POR ID";
  console.log(`\n${OPERACION}:${NAME_MODEL} ${CAMPO}`);

  // ID
  var recursoId = req.params.us_recurso;

  // MODEL: recurso
  let recursoModel = models.Recurso;

  recursoModel
    .destroy({
      where: {
        re_recurso: recursoId
      }
    })
    .then(function(quantityRowsDestroyed) {
      // Respuesta
      var statusCode = Util.HttpCodes.HTTP_200_OK;
      var msg = "recurso eliminado exitosamente";

      if (quantityRowsDestroyed === 0) {
        statusCode = Util.HttpCodes.HTTP_404_NOT_FOUND;
        msg = `recurso no encontrado, con el ID: ${recursoId}`;
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
