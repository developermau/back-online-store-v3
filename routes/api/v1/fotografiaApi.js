var serverConfig = require("../../../config/serverConfig");
const host = serverConfig.HOST;
const port = serverConfig.PORT;

var express = require("express");
var router = express.Router();

// MODELS
var models = require("../../../models");
// HTTP CODES
var Util = require("../util/httpcodes");
// Multer: Uploader
const fnGetUploadWithDiskStorage = require("../util/MulterUpload");
// Handler Error
var fnHandlerError = require("../util/handlersApi");

// Nombre del modelo
const NAME_MODEL = "FOTOGRAFIA";

// MODEL: fotografia
let fotografiaModel = models.Fotografia;

// Multer: parameters
const basePath = "./public/uploads";
const fieldName = "fotografias";
const fullPath = `${basePath}/${fieldName}`;
const limitMaxCountFiles = 5;
// Upload
var upload = fnGetUploadWithDiskStorage(fullPath);

/* GET Lista de fotografias */
router.get("/", function(req, res, next) {
  const OPERACION = "LIST";
  console.log(`\n${NAME_MODEL}:${OPERACION}`);

  fotografiaModel
    .findAll()
    .then(function(fotografias) {
      res.status(200).json(fotografias);
    })
    .catch(err => {
      let resError = fnHandlerError(err);
      console.log(resError);
      res.status(resError.statusCode).send(resError);
    });
});

/* GET Buscar un fotografia por su id */
router.get("/:fo_fotografia", function(req, res, next) {
  const OPERACION = "FIND";
  const CAMPO = "POR ID";
  console.log(`\n${OPERACION}:${NAME_MODEL} ${CAMPO}`);

  // ID
  var fotografiaId = req.params.fo_fotografia;

  fotografiaModel
    .findByPk(fotografiaId)
    .then(function(fotografia) {
      // Respuesta
      let respuesta = {};

      if (fotografia !== undefined && fotografia !== null) {
        respuesta.statusCode = Util.HttpCodes.HTTP_200_OK;
        respuesta.msg = "fotografia encontrado";
        respuesta.data = fotografia;
      } else {
        respuesta.statusCode = Util.HttpCodes.HTTP_404_NOT_FOUND;
        respuesta.msg = `fotografia no encontrado, con el ID: ${fotografiaId}`;
      }

      res.status(respuesta.statusCode).json(respuesta);
    })
    .catch(err => {
      let resError = fnHandlerError(err);
      console.log(resError);
      res.status(resError.statusCode).send(resError);
    });
});

/* POST: Creacion de un nuevo fotografia  */
router.post("/", function(req, res, next) {
  const OPERACION = "CREATE";
  console.log(`\n${NAME_MODEL}:${OPERACION}`);

  // Request Data
  let fotografiaRegister = req.body;

  fotografiaModel
    .create(fotografiaRegister)
    .then(fotografia => {
      let resCreated = {
        statusCode: Util.HttpCodes.HTTP_201_CREATED,
        msg: `fotografia creo exitosamente`,
        data: fotografia
      };
      res.status(resCreated.statusCode).json(resCreated);
    })
    .catch(err => {
      let resError = fnHandlerError(err);
      console.log(resError);
      res.status(resError.statusCode).send(resError);
    });
});

/* POST: Subir una o varias fotografia(s) para un producto  */
router.post(
  "/:pr_producto/uploads",
  upload.array("fotografias", limitMaxCountFiles),
  async function(req, res, err) {
    const OPERACION = "CREATE";
    console.log(`\n${NAME_MODEL}:${OPERACION}`);

    // Producto
    let pr_producto = req.params.pr_producto;

    const files = req.files;
    const fotografias = [];

    for (let i = 0; i < files.length; i++) {
      const fotografiaRegister = fnBuildFotografia(pr_producto, files[i]);

      try {
        const response = await fotografiaModel.create(fotografiaRegister);
        const fotografia = response.dataValues;
        fotografias.push(fotografia);
      } catch (error) {
        let resError = fnHandlerError(err);
        console.log(resError);
      }
    }

    let resCreated = {
      statusCode: Util.HttpCodes.HTTP_201_CREATED,
      msg: `Fotografias se subieron exitosamente`,
      fotografias: fotografias
    };
    res.status(resCreated.statusCode).json(resCreated);
  }
);

/* PUT Actualizar un fotografia  */
router.put("/:fo_fotografia", function(req, res, next) {
  const OPERACION = "UPDATE";
  console.log(`\n${NAME_MODEL}:${OPERACION}`);

  // ID
  var fotografiaId = req.params.fo_fotografia;

  // Request Data
  let fotografiaRegister = req.body;

  if (fotografiaId !== undefined && fotografiaId !== null) {
    fotografiaModel
      .update(fotografiaRegister, {
        where: {
          fo_fotografia: fotografiaId
        }
      })
      .then(results => {
        // Filas actualizadas
        let quantityRowsUpdated = results[0];

        // Respuesta
        var statusCode = Util.HttpCodes.HTTP_200_OK;
        var msg = "fotografia actualizado exitosamente";

        if (quantityRowsUpdated === 0) {
          statusCode = Util.HttpCodes.HTTP_404_NOT_FOUND;
          msg = `fotografia no encontrado, con el ID: ${fotografiaId}`;
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
      msg: `fotografiaId no es valido, su valor actual es: ${fotografiaId}`
    };
    res.status(resError.statusCode).send(resError);
  }
});

/* DELETE Eliminar un fotografia por su id */
router.delete("/:fo_fotografia", function(req, res, next) {
  const OPERACION = "DELETE";
  const CAMPO = "POR ID";
  console.log(`\n${OPERACION}:${NAME_MODEL} ${CAMPO}`);

  // ID
  var fotografiaId = req.params.fo_fotografia;

  fotografiaModel
    .destroy({
      where: {
        fo_fotografia: fotografiaId
      }
    })
    .then(function(quantityRowsDestroyed) {
      // Respuesta
      var statusCode = Util.HttpCodes.HTTP_200_OK;
      var msg = "fotografia eliminado exitosamente";

      if (quantityRowsDestroyed === 0) {
        statusCode = Util.HttpCodes.HTTP_404_NOT_FOUND;
        msg = `fotografia no encontrado, con el ID: ${fotografiaId}`;
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

/**
 * Save a File on Database
 *
 * @param {File} FileToSave
 */
async function fnSaveDBFotografiaByProducto(pr_producto, FileToSave) {
  const fotografiaRegister = fnBuildFotografia(pr_producto, FileToSave);
  console.log(fotografiaRegister);

  const { response } = await fotografiaModel.create(fotografiaRegister);
  return response;
  /*
  console.log(
    `Fotografia guarda exitosamente ${fotografia.fo_title} en ${fotografia.fo_ubicacion}`
  );
  */

  /*
  fotografiaModel.create(fotografiaRegister).then(fotografia => {
    
  });
  */
}

function fnBuildFotografia(pr_producto, FileFotografia) {
  const file = FileFotografia;
  const fileName = file.originalname;
  const uploadPath = `${file.destination}/${fileName}`;
  const ubicacionParcial = uploadPath.replace("./", "");

  const fo_ubicacion = `http://${host}:${port}/${ubicacionParcial}`;

  return {
    fo_title: fileName,
    fo_ubicacion: fo_ubicacion,
    fo_flex: 6,
    pr_producto: pr_producto,
    // Audit
    createdAt: new Date(),
    updatedAt: new Date()
  };
}

module.exports = router;
