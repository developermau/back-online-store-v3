var express = require('express');
var router = express.Router();

// MODELS
var models = require('../../../models');
// HTTP CODES
var Util = require('../util/httpcodes');
// Handler Error
var fnHandlerError = require('../util/handlers');

// Nombre del modelo
const NAME_MODEL = "RelGusta";

/* GET Lista de las relaciones Incluye */
router.get('/', function (req, res, next) {

    const OPERACION = "LIST";
    console.log(`\n${NAME_MODEL}:${OPERACION}`);

    // MODEL: relGusta
    let relGustaModel = models.RelGusta;

    relGustaModel.findAll().then(function (relGustaList) {
        res.status(200).json(relGustaList)
    }).catch(err => {
		let resError = fnHandlerError(err);
		console.log(resError);
		res.status(resError.statusCode).send(resError);
	});
});

/* POST: Creacion de un nuevo relGusta  */
router.post('/', function (req, res, next) {

    const OPERACION = "CREATE";
    console.log(`\n${NAME_MODEL}:${OPERACION}`);

    // MODEL: relGusta
    let relGustaModel = models.RelGusta;

    // Request Data
    let relGustaRegister = req.body;

    relGustaModel.create(relGustaRegister).then(relGusta => {
        let resCreated = {
            statusCode: Util.HttpCodes.HTTP_201_CREATED,
            msg: `La relacion se creo exitosamente`,
            data: relGusta
        }
        res.status(resCreated.statusCode).json(resCreated);
    }).catch(err => {
		let resError = fnHandlerError(err);
		console.log(resError);
		res.status(resError.statusCode).send(resError);
	});

});

module.exports = router;