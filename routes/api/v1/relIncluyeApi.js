var express = require('express');
var router = express.Router();

// MODELS
var models = require('../../../models');
// HTTP CODES
var Util = require('../util/httpcodes');
// Handler Error
var fnHandlerError = require('../util/handlers');

// Nombre del modelo
const NAME_MODEL = "relIncluye";

/* GET Lista de las relaciones Incluye */
router.get('/', function (req, res, next) {

    const OPERACION = "LIST";
    console.log(`\n${NAME_MODEL}:${OPERACION}`);

    // MODEL: relIncluye
    let relIncluyeModel = models.RelIncluye;

    relIncluyeModel.findAll().then(function (relIncluyes) {
        res.status(200).json(relIncluyes)
    }).catch(err => {
		let resError = fnHandlerError(err);
		console.log(resError);
		res.status(resError.statusCode).send(resError);
	});
});

/* POST: Creacion de un nuevo relIncluye  */
router.post('/', function (req, res, next) {

    const OPERACION = "CREATE";
    console.log(`\n${NAME_MODEL}:${OPERACION}`);

    // MODEL: relIncluye
    let relIncluyeModel = models.RelIncluye;

    // Request Data
    let relIncluyeRegister = req.body;

    relIncluyeModel.create(relIncluyeRegister).then(relIncluye => {
        let resCreated = {
            statusCode: Util.HttpCodes.HTTP_201_CREATED,
            msg: `La relacion se creo exitosamente`,
            data: relIncluye
        }
        res.status(resCreated.statusCode).json(resCreated);
    }).catch(err => {
		let resError = fnHandlerError(err);
		console.log(resError);
		res.status(resError.statusCode).send(resError);
	});

});

module.exports = router;