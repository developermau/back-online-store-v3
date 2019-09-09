var express = require('express');
var router = express.Router();

// MODELS
var models = require('../../../models');
// HTTP CODES
var Util = require('../util/httpcodes');
// Handler Error
var fnHandlerError = require('../util/handlersApi');

// Nombre del modelo
const NAME_MODEL = "USUARIO";

/* GET Lista de usuarios */
router.get('/', function (req, res, next) {

	const OPERACION = "LIST";
	console.log(`\n${NAME_MODEL}:${OPERACION}`);

	// MODEL: Usuario
	let usuarioModel = models.Usuario;

	usuarioModel.findAll().then(function (usuarios) {
		res.status(200).json(usuarios)
	}).catch(err => {
		let resError = fnHandlerError(err);
		console.log(resError);
		res.status(resError.statusCode).send(resError);
	});
});

/* GET Buscar un usuario por su id */
router.get('/:us_usuario', function (req, res, next) {

	const OPERACION = "FIND";
	const CAMPO = "POR ID";
	console.log(`\n${OPERACION}:${NAME_MODEL} ${CAMPO}`);

	// ID
	var usuarioId = req.params.us_usuario;

	// MODEL: Usuario
	let modelUsuario = models.Usuario;

	modelUsuario.findByPk(usuarioId).then(function (usuario) {
		// Respuesta		
		let respuesta = {}

		if (usuario !== undefined && usuario !== null) {
			respuesta.statusCode = Util.HttpCodes.HTTP_200_OK;
			respuesta.msg = "Usuario encontrado";
			respuesta.data = usuario;
		} else {
			respuesta.statusCode = Util.HttpCodes.HTTP_404_NOT_FOUND;
			respuesta.msg = `Usuario no encontrado, con el ID: ${usuarioId}`;
		}

		res.status(respuesta.statusCode).json(respuesta);

	}).catch(err => {
		let resError = fnHandlerError(err);
		console.log(resError);
		res.status(resError.statusCode).send(resError);
	});
});

/* POST: Creacion de un nuevo usuario  */
router.post('/', function (req, res, next) {

	const OPERACION = "CREATE";
	console.log(`\n${NAME_MODEL}:${OPERACION}`);

	// MODEL: Usuario
	let modelUsuario = models.Usuario;

	// Request Data
	let usuarioRegister = req.body;

	modelUsuario.create(usuarioRegister).then(usuario => {
		let resCreated = {
			statusCode: Util.HttpCodes.HTTP_201_CREATED,
			msg: `Usuario creo exitosamente`,
			data: usuario
		}
		res.status(resCreated.statusCode).json(resCreated);
	}).catch(err => {
		let resError = fnHandlerError(err);
		console.log(resError);
		res.status(resError.statusCode).send(resError);
	});

});

/* PUT Actualizar un usuario  */
router.put('/:us_usuario', function (req, res, next) {

	const OPERACION = "UPDATE";
	console.log(`\n${NAME_MODEL}:${OPERACION}`);

	// ID
	var usuarioId = req.params.us_usuario;

	// Request Data
	let usuarioUpdated = req.body;
	console.log('usuarioUpdated', usuarioUpdated);

	// MODEL: Usuario
	let modelUsuario = models.Usuario;

	if (usuarioId !== undefined && usuarioId !== null) {
		modelUsuario.update(usuarioUpdated, {
			where: {
				us_usuario: usuarioId
			}
		}).then(results => {
			// Filas actualizadas
			let quantityRowsUpdated = results[0];

			// Respuesta
			var statusCode = Util.HttpCodes.HTTP_200_OK;
			var msg = "Usuario actualizado exitosamente";

			if (quantityRowsUpdated === 0) {
				statusCode = Util.HttpCodes.HTTP_404_NOT_FOUND;
				msg = `Usuario no encontrado, con el ID: ${usuarioId}`;
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
			msg: `usuarioId no es valido, su valor actual es: ${usuarioId}`
		}
		res.status(resError.statusCode).send(resError);
	}

});

/* DELETE Eliminar un usuario por su id */
router.delete('/:us_usuario', function (req, res, next) {

	const OPERACION = "DELETE";
	const CAMPO = "POR ID";
	console.log(`\n${OPERACION}:${NAME_MODEL} ${CAMPO}`);

	// ID
	var usuarioId = req.params.us_usuario;

	// MODEL: Usuario
	let modelUsuario = models.Usuario;

	modelUsuario.destroy({
		where: {
			us_usuario: usuarioId
		}
	}).then(function (quantityRowsDestroyed) {
		// Respuesta
		var statusCode = Util.HttpCodes.HTTP_200_OK;
		var msg = "Usuario eliminado exitosamente";

		if (quantityRowsDestroyed === 0) {
			statusCode = Util.HttpCodes.HTTP_404_NOT_FOUND;
			msg = `Usuario no encontrado, con el ID: ${usuarioId}`;
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