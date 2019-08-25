var express = require('express');
var router = express.Router();

// MODELS
var models = require('../../../models');
// HTTP CODES
var Util = require('../util/httpcodes');
// Handler Error
var fnHandlerError = require('../util/handlers');

// Nombre del modelo
const NAME_MODEL = "ROL";

/* GET Lista de rols */
router.get('/', function (req, res, next) {

    const OPERACION = "LIST";
    console.log(`\n${NAME_MODEL}:${OPERACION}`);

    // MODEL: rol
    let rolModel = models.Rol;

    rolModel.findAll().then(function (rols) {
        res.status(200).json(rols)
    }).catch(err => {
		let resError = fnHandlerError(err);
		console.log(resError);
		res.status(resError.statusCode).send(resError);
	});
});

/* GET Buscar un rol por su id */
router.get('/:ro_rol', function (req, res, next) {

    const OPERACION = "FIND";
    const CAMPO = "POR ID";
    console.log(`\n${OPERACION}:${NAME_MODEL} ${CAMPO}`);

    // ID
    var rolId = req.params.ro_rol;

    // MODEL: rol
    let rolModel = models.Rol;

    rolModel.findByPk(rolId).then(function (rol) {
        // Respuesta		
        let respuesta = {}

        if (rol !== undefined && rol !== null) {
            respuesta.statusCode = Util.HttpCodes.HTTP_200_OK;
            respuesta.msg = "rol encontrado";
            respuesta.data = rol;
        } else {
            respuesta.statusCode = Util.HttpCodes.HTTP_404_NOT_FOUND;
            respuesta.msg = `rol no encontrado, con el ID: ${rolId}`;
        }

        res.status(respuesta.statusCode).json(respuesta);

    }).catch(err => {
		let resError = fnHandlerError(err);
		console.log(resError);
		res.status(resError.statusCode).send(resError);
	});
});

/* POST: Creacion de un nuevo rol  */
router.post('/', function (req, res, next) {

    const OPERACION = "CREATE";
    console.log(`\n${NAME_MODEL}:${OPERACION}`);

    // MODEL: rol
    let rolModel = models.Rol;

    // Request Data
    let rolRegister = req.body;

    rolModel.create(rolRegister).then(rol => {
        let resCreated = {
            statusCode: Util.HttpCodes.HTTP_201_CREATED,
            msg: `rol creo exitosamente`,
            data: rol
        }
        res.status(resCreated.statusCode).json(resCreated);
    }).catch(err => {
		let resError = fnHandlerError(err);
		console.log(resError);
		res.status(resError.statusCode).send(resError);
	});

});

/* PUT Actualizar un rol  */
router.put('/:us_rol', function (req, res, next) {

    const OPERACION = "UPDATE";
    console.log(`\n${NAME_MODEL}:${OPERACION}`);

    // ID
    var rolId = req.params.us_rol;

    // Request Data
    let rolRegister = req.body;

    // MODEL: rol
    let rolModel = models.Rol;

    if (rolId !== undefined && rolId !== null) {
        rolModel.update(rolRegister, {
            where: {
                ro_rol: rolId
            }
        }).then(results => {
            // Filas actualizadas
            let quantityRowsUpdated = results[0];

            // Respuesta
            var statusCode = Util.HttpCodes.HTTP_200_OK;
            var msg = "rol actualizado exitosamente";

            if (quantityRowsUpdated === 0) {
                statusCode = Util.HttpCodes.HTTP_404_NOT_FOUND;
                msg = `rol no encontrado, con el ID: ${rolId}`;
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
            msg: `rolId no es valido, su valor actual es: ${rolId}`
        }
        res.status(resError.statusCode).send(resError);
    }

});

/* DELETE Eliminar un rol por su id */
router.delete('/:us_rol', function (req, res, next) {

    const OPERACION = "DELETE";
    const CAMPO = "POR ID";
    console.log(`\n${OPERACION}:${NAME_MODEL} ${CAMPO}`);

    // ID
    var rolId = req.params.us_rol;

    // MODEL: rol
    let rolModel = models.Rol;

    rolModel.destroy({
        where: {
            ro_rol: rolId
        }
    }).then(function (quantityRowsDestroyed) {
        // Respuesta
        var statusCode = Util.HttpCodes.HTTP_200_OK;
        var msg = "rol eliminado exitosamente";

        if (quantityRowsDestroyed === 0) {
            statusCode = Util.HttpCodes.HTTP_404_NOT_FOUND;
            msg = `rol no encontrado, con el ID: ${rolId}`;
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