var express = require('express');
var router = express.Router();

// MODELS
var models = require('../../../models');
// HTTP CODES
var Util = require('../util/httpcodes');
// Handler Error
var fnHandlerError = require('../util/handlersApi');

// Nombre del modelo
const NAME_MODEL = "PROVEEDOR";

/* GET Lista de proveedors */
router.get('/', function (req, res, next) {

    const OPERACION = "LIST";
    console.log(`\n${NAME_MODEL}:${OPERACION}`);

    // MODEL: proveedor
    let proveedorModel = models.Proveedor;

    proveedorModel.findAll().then(function (proveedors) {
        res.status(200).json(proveedors)
    }).catch(err => {
		let resError = fnHandlerError(err);
		console.log(resError);
		res.status(resError.statusCode).send(resError);
	});
});

/* GET Buscar un proveedor por su id */
router.get('/:pr_proveedor', function (req, res, next) {

    const OPERACION = "FIND";
    const CAMPO = "POR ID";
    console.log(`\n${OPERACION}:${NAME_MODEL} ${CAMPO}`);

    // ID
    var proveedorId = req.params.pr_proveedor;

    // MODEL: proveedor
    let proveedorModel = models.Proveedor;

    proveedorModel.findByPk(proveedorId).then(function (proveedor) {
        // Respuesta		
        let respuesta = {}

        if (proveedor !== undefined && proveedor !== null) {
            respuesta.statusCode = Util.HttpCodes.HTTP_200_OK;
            respuesta.msg = "proveedor encontrado";
            respuesta.data = proveedor;
        } else {
            respuesta.statusCode = Util.HttpCodes.HTTP_404_NOT_FOUND;
            respuesta.msg = `proveedor no encontrado, con el ID: ${proveedorId}`;
        }

        res.status(respuesta.statusCode).json(respuesta);

    }).catch(err => {
		let resError = fnHandlerError(err);
		console.log(resError);
		res.status(resError.statusCode).send(resError);
	});
});

/* POST: Creacion de un nuevo proveedor  */
router.post('/', function (req, res, next) {

    const OPERACION = "CREATE";
    console.log(`\n${NAME_MODEL}:${OPERACION}`);

    // MODEL: proveedor
    let proveedorModel = models.Proveedor;

    // Request Data
    let proveedorRegister = req.body;

    proveedorModel.create(proveedorRegister).then(proveedor => {
        let resCreated = {
            statusCode: Util.HttpCodes.HTTP_201_CREATED,
            msg: `proveedor creo exitosamente`,
            data: proveedor
        }
        res.status(resCreated.statusCode).json(resCreated);
    }).catch(err => {
		let resError = fnHandlerError(err);
		console.log(resError);
		res.status(resError.statusCode).send(resError);
	});

});

/* PUT Actualizar un proveedor  */
router.put('/:us_proveedor', function (req, res, next) {

    const OPERACION = "UPDATE";
    console.log(`\n${NAME_MODEL}:${OPERACION}`);

    // ID
    var proveedorId = req.params.us_proveedor;

    // Request Data
    let proveedorRegister = req.body;

    // MODEL: proveedor
    let proveedorModel = models.Proveedor;

    if (proveedorId !== undefined && proveedorId !== null) {
        proveedorModel.update(proveedorRegister, {
            where: {
                pr_proveedor: proveedorId
            }
        }).then(results => {
            // Filas actualizadas
            let quantityRowsUpdated = results[0];

            // Respuesta
            var statusCode = Util.HttpCodes.HTTP_200_OK;
            var msg = "proveedor actualizado exitosamente";

            if (quantityRowsUpdated === 0) {
                statusCode = Util.HttpCodes.HTTP_404_NOT_FOUND;
                msg = `proveedor no encontrado, con el ID: ${proveedorId}`;
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
            msg: `proveedorId no es valido, su valor actual es: ${proveedorId}`
        }
        res.status(resError.statusCode).send(resError);
    }

});

/* DELETE Eliminar un proveedor por su id */
router.delete('/:us_proveedor', function (req, res, next) {

    const OPERACION = "DELETE";
    const CAMPO = "POR ID";
    console.log(`\n${OPERACION}:${NAME_MODEL} ${CAMPO}`);

    // ID
    var proveedorId = req.params.us_proveedor;

    // MODEL: proveedor
    let proveedorModel = models.Proveedor;

    proveedorModel.destroy({
        where: {
            pr_proveedor: proveedorId
        }
    }).then(function (quantityRowsDestroyed) {
        // Respuesta
        var statusCode = Util.HttpCodes.HTTP_200_OK;
        var msg = "proveedor eliminado exitosamente";

        if (quantityRowsDestroyed === 0) {
            statusCode = Util.HttpCodes.HTTP_404_NOT_FOUND;
            msg = `proveedor no encontrado, con el ID: ${proveedorId}`;
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