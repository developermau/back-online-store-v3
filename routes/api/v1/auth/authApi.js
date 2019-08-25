var express = require('express');
var router = express.Router();

// MODELS
var models = require('../../../../models');
// HTTP CODES
var Util = require('../../util/httpcodes');
// Handler Error
var fnHandlerError = require('../../util/handlers');

// Nombre del modelo
const NAME_MODEL = "USUARIO";

console.log(NAME_MODEL)

/* POST Login Usuario  */
router.post('/login', function (req, res, next) {

	const OPERACION = "LOGIN";
	console.log(`\n${NAME_MODEL}:${OPERACION}`);

	// MODEL: Usuario
	let modelUsuario = models.Usuario;

	// Request Data
	let userLogin = req.body;

	// Condition
	let condition = {
		where: userLogin
	};

	modelUsuario.findOne(condition).then(function (usuario) {
		console.log("Encontrado...", usuario);
		if (usuario !== null && usuario !== undefined) {
			res.status(Util.HttpCodes.HTTP_200_OK).json(usuario)
		} else {
			const msgError = "Usuario no encontrado.";
			const err = {
				table: "Usuario",
				msg: "Error. " + msgError
			}
			res.status(Util.HttpCodes.HTTP_404_NOT_FOUND).send(err);
		}

	}).catch(err => {
		let resError = fnHandlerError(err);
		console.log(resError);
		res.status(resError.statusCode).send(resError);
	});
});

module.exports = router;