var express = require('express');
var router = express.Router();

// MODELS
var models = require('../../../models');
// HTTP CODES
var Util = require('../util/httpcodes');
// Handler Error
var fnHandlerError = require('../util/handlersApi');

// Nombre del modelo
const NAME_MODEL = "COMPRA";

// MODEL: compra
let compraModel = models.Compra;

/* GET Lista de compras */
router.get('/', function (req, res, next) {

    const OPERACION = "LIST";
    console.log(`\n${NAME_MODEL}:${OPERACION}`);

    compraModel.findAll().then(function (compras) {
        res.status(200).json(compras)
    }).catch(err => {
		let resError = fnHandlerError(err);
		console.log(resError);
		res.status(resError.statusCode).send(resError);
	});
});

/* GET Buscar un compra por su id */
router.get('/:co_compra', function (req, res, next) {

    const OPERACION = "FIND";
    const CAMPO = "POR ID";
    console.log(`\n${OPERACION}:${NAME_MODEL} ${CAMPO}`);

    // ID
    var compraId = req.params.co_compra;

    compraModel.findByPk(compraId).then(function (compra) {
        // Respuesta		
        let respuesta = {}

        if (compra !== undefined && compra !== null) {
            respuesta.statusCode = Util.HttpCodes.HTTP_200_OK;
            respuesta.msg = "compra encontrado";
            respuesta.data = compra;
        } else {
            respuesta.statusCode = Util.HttpCodes.HTTP_404_NOT_FOUND;
            respuesta.msg = `compra no encontrado, con el ID: ${compraId}`;
        }

        res.status(respuesta.statusCode).json(respuesta);

    }).catch(err => {
		let resError = fnHandlerError(err);
		console.log(resError);
		res.status(resError.statusCode).send(resError);
	});
});

/* POST: Creacion de un nuevo compra  */
router.post('/', function (req, res, next) {

    const OPERACION = "CREATE";
    console.log(`\n${NAME_MODEL}:${OPERACION}`);

    // Request Data
    let compraRegister = req.body;

    compraModel.create(compraRegister).then(compra => {
        let resCreated = {
            statusCode: Util.HttpCodes.HTTP_201_CREATED,
            msg: `compra creo exitosamente`,
            data: compra
        }
        res.status(resCreated.statusCode).json(resCreated);
    }).catch(err => {
		let resError = fnHandlerError(err);
		console.log(resError);
		res.status(resError.statusCode).send(resError);
	});

});

/* PUT Actualizar un compra  */
router.put('/:co_compra', function (req, res, next) {

    const OPERACION = "UPDATE";
    console.log(`\n${NAME_MODEL}:${OPERACION}`);

    // ID
    var compraId = req.params.co_compra;

    // Request Data
    let compraRegister = req.body;

    if (compraId !== undefined && compraId !== null) {
        compraModel.update(compraRegister, {
            where: {
                co_compra: compraId
            }
        }).then(results => {
            // Filas actualizadas
            let quantityRowsUpdated = results[0];

            // Respuesta
            var statusCode = Util.HttpCodes.HTTP_200_OK;
            var msg = "compra actualizado exitosamente";

            if (quantityRowsUpdated === 0) {
                statusCode = Util.HttpCodes.HTTP_404_NOT_FOUND;
                msg = `compra no encontrado, con el ID: ${compraId}`;
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
            msg: `compraId no es valido, su valor actual es: ${compraId}`
        }
        res.status(resError.statusCode).send(resError);
    }

});

/* DELETE Eliminar un compra por su id */
router.delete('/:co_compra', function (req, res, next) {

    const OPERACION = "DELETE";
    const CAMPO = "POR ID";
    console.log(`\n${OPERACION}:${NAME_MODEL} ${CAMPO}`);

    // ID
    var compraId = req.params.co_compra;

    compraModel.destroy({
        where: {
            co_compra: compraId
        }
    }).then(function (quantityRowsDestroyed) {
        // Respuesta
        var statusCode = Util.HttpCodes.HTTP_200_OK;
        var msg = "compra eliminado exitosamente";

        if (quantityRowsDestroyed === 0) {
            statusCode = Util.HttpCodes.HTTP_404_NOT_FOUND;
            msg = `compra no encontrado, con el ID: ${compraId}`;
        }

        let resDestroy = {
            statusCode,
            msg
        }
        res.status(resDestroy.statusCode).json(resDestroy);

    }).catch(err => {
		let resError = fnHandlerError(err);
		console.log(resError);
		res.status(resError.statusCode).send(resError);
	});
});




module.exports = router;