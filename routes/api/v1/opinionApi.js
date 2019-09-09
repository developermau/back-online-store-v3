var express = require('express');
var router = express.Router();

// MODELS
var models = require('../../../models');
// HTTP CODES
var Util = require('../util/httpcodes');
// Handler Error
var fnHandlerError = require('../util/handlersApi');

// Nombre del modelo
const NAME_MODEL = "OPINION";

// MODEL: opinion
let opinionModel = models.Opinion;

/* GET Lista de opiniones */
router.get('/', function (req, res, next) {

    const OPERACION = "LIST";
    console.log(`\n${NAME_MODEL}:${OPERACION}`);

    opinionModel.findAll().then(function (opiniones) {
        res.status(200).json(opiniones)
    }).catch(err => {
		let resError = fnHandlerError(err);
		console.log(resError);
		res.status(resError.statusCode).send(resError);
	});
});

/* GET Buscar un opinion por su id */
router.get('/:op_opinion', function (req, res, next) {

    const OPERACION = "FIND";
    const CAMPO = "POR ID";
    console.log(`\n${OPERACION}:${NAME_MODEL} ${CAMPO}`);

    // ID
    var opinionId = req.params.op_opinion;

    opinionModel.findByPk(opinionId).then(function (opinion) {
        // Respuesta		
        let respuesta = {}

        if (opinion !== undefined && opinion !== null) {
            respuesta.statusCode = Util.HttpCodes.HTTP_200_OK;
            respuesta.msg = "opinion encontrado";
            respuesta.data = opinion;
        } else {
            respuesta.statusCode = Util.HttpCodes.HTTP_404_NOT_FOUND;
            respuesta.msg = `opinion no encontrado, con el ID: ${opinionId}`;
        }

        res.status(respuesta.statusCode).json(respuesta);

    }).catch(err => {
		let resError = fnHandlerError(err);
		console.log(resError);
		res.status(resError.statusCode).send(resError);
	});
});

/* POST: Creacion de un nuevo opinion  */
router.post('/', function (req, res, next) {

    const OPERACION = "CREATE";
    console.log(`\n${NAME_MODEL}:${OPERACION}`);

    // Request Data
    let opinionRegister = req.body;

    opinionModel.create(opinionRegister).then(opinion => {
        let resCreated = {
            statusCode: Util.HttpCodes.HTTP_201_CREATED,
            msg: `opinion creo exitosamente`,
            data: opinion
        }
        res.status(resCreated.statusCode).json(resCreated);
    }).catch(err => {
		let resError = fnHandlerError(err);
		console.log(resError);
		res.status(resError.statusCode).send(resError);
	});

});

/* PUT Actualizar un opinion  */
router.put('/:op_opinion', function (req, res, next) {

    const OPERACION = "UPDATE";
    console.log(`\n${NAME_MODEL}:${OPERACION}`);

    // ID
    var opinionId = req.params.op_opinion;

    // Request Data
    let opinionRegister = req.body;

    if (opinionId !== undefined && opinionId !== null) {
        opinionModel.update(opinionRegister, {
            where: {
                op_opinion: opinionId
            }
        }).then(results => {
            // Filas actualizadas
            let quantityRowsUpdated = results[0];

            // Respuesta
            var statusCode = Util.HttpCodes.HTTP_200_OK;
            var msg = "opinion actualizado exitosamente";

            if (quantityRowsUpdated === 0) {
                statusCode = Util.HttpCodes.HTTP_404_NOT_FOUND;
                msg = `opinion no encontrado, con el ID: ${opinionId}`;
            }

            let resUpdated = {
                statusCode,
                msg
            }
            res.status(resUpdated.statusCode).json(resUpdated);
        }).catch(err => {
            let resError = fnHandlerError(err);
            console.log(resError);
            res.status(resError.statusCode).send(resError);
        });
    } else {
        let resError = {
            statusCode: Util.HttpCodes.HTTP_400_BAD_REQUEST,
            msg: `opinionId no es valido, su valor actual es: ${opinionId}`
        }
        res.status(resError.statusCode).send(resError);
    }

});

/* DELETE Eliminar un opinion por su id */
router.delete('/:op_opinion', function (req, res, next) {

    const OPERACION = "DELETE";
    const CAMPO = "POR ID";
    console.log(`\n${OPERACION}:${NAME_MODEL} ${CAMPO}`);

    // ID
    var opinionId = req.params.op_opinion;

    opinionModel.destroy({
        where: {
            op_opinion: opinionId
        }
    }).then(function (quantityRowsDestroyed) {
        // Respuesta
        var statusCode = Util.HttpCodes.HTTP_200_OK;
        var msg = "opinion eliminado exitosamente";

        if (quantityRowsDestroyed === 0) {
            statusCode = Util.HttpCodes.HTTP_404_NOT_FOUND;
            msg = `opinion no encontrado, con el ID: ${opinionId}`;
        }

        let resDestroy = {
            statusCode,
            msg
        }
        res.status(resDestroy.statusCode).json(resDestroy);

    }).catch(err => {
        let resError = fnHandlerError(err);
        res.status(resError.statusCode).json(resError);
    });
});

function fnHandlerError(err) {
    console.log(err);
    let parent = err.parent;
    let errorList = err.errors;
    var firstError = null;
    var origin = 'GENERAL';
    var sqlState = 0;
    var msgError = 'Error general';

    if (parent !== undefined && parent !== null) {
        sqlState = parseInt(parent.sqlState);

        if (sqlState >= 23000 && sqlState <= 23999) {
            msgError = "Registro duplicado en la columna " + err.errors[0].path;
        } else {
            msgError = parent.sqlMessage;
        }
    }

    const result = {
        statusCode: Util.HttpCodes.HTTP_400_BAD_REQUEST,
        msg: msgError
    };
    console.log(result);

    return result;
}

module.exports = router;