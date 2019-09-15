// HTTP CODES
var Util = require("../util/httpcodes");

var fnHandlerError = function(err) {
  let resultError = Object.assign({}, err);
  resultError.errorTypeName = "GENERAL";
  resultError.errorTypeDetail = err.message;
  resultError.statusCode = Util.HttpCodes.HTTP_500_INTERNAL_SERVER_ERROR;
  resultError.myValidationErrors = [];

  // Auxiliares
  let errorsList = [];
  let original = {};
  let parent = {};

  if (err !== null && err !== undefined) {
    errorsList = err.errors;

    original = err.original;
    parent = err.parent;

    if (original !== null && original !== undefined) {
      resultError.code = original.code;
      resultError.sqlState = original.sqlState;
      resultError.sqlMessage = original.sqlMessage;
      resultError.errno = original.errno;
    }

    if (parent !== undefined && parent !== null) {
      resultError.code = parent.code;
      resultError.parentDetail = parent.detail;
      resultError.sqlState = parent.sqlState;
      resultError.sqlMessage = parent.message;
      resultError.errno = parent.errno;
    }

    if (errorsList !== null && errorsList !== undefined) {
      if (Array.isArray(errorsList)) {
        errorsList.forEach(error => {
          resultError.myValidationErrors.push(error);
        });
      }
    }

    switch (resultError.name) {
      case "SequelizeDatabaseError":
        resultError.statusCode = Util.HttpCodes.HTTP_400_BAD_REQUEST;

        if (resultError.sqlState >= 23000 && resultError.sqlState <= 23999) {
          resultError.errorTypeName = "Integrity constraint violation";
          resultError.errorTypeDetail =
            "Registro duplicado en la columna " + err.errors[0].path;
        } else if (
          resultError.sqlState >= 22000 &&
          resultError.sqlState <= 22999
        ) {
          resultError.errorTypeName = "Data exception";
          resultError.errorTypeDetail = "Valores numericos fuera de rango";
        } else if (
          resultError.sqlState >= 1000 &&
          resultError.sqlState <= 1999
        ) {
          resultError.errorTypeName = "Warning";
          resultError.errorTypeDetail = "Valores numericos fuera de rango";
        } else {
          resultError.errorTypeDetail = "SQL." + resultError.sqlMessage;
        }

        break;
      case "SequelizeValidationError":
        resultError.errorTypeName = "Validacion Sequelize";
        resultError.statusCode = Util.HttpCodes.HTTP_428_PRECONDITION_REQUIRED;
        resultError.errorTypeDetail =
          "Los valores que introdujo no son validos.";
        break;
      case "SequelizeUniqueConstraintError":
        resultError.errorTypeName = "Validacion Sequelize UNIQUE";
        resultError.statusCode = Util.HttpCodes.HTTP_409_CONFLICT;

        if (
          resultError.sqlMessage === null ||
          resultError.sqlMessage === undefined
        ) {
          resultError.sqlMessage = "Error, con la BD";
        }
        resultError.errorTypeDetail = "SQL." + resultError.sqlMessage;
        break;
      case "SequelizeForeignKeyConstraintError":
        let nameTableWithConflict = "";
        if (resultError.index !== null && resultError.index !== undefined) {
          // Fotografia_ibfk_1
          nameTableWithConflict = resultError.index.replace("_ibfk_1", "");
        }

        resultError.errorTypeName = "Referencia con otras tablas";
        resultError.statusCode = Util.HttpCodes.HTTP_409_CONFLICT;
        resultError.errorTypeDetail = `No se puede eliminar o actualizar el registro, existe dependencia con otra(s) tabla(s) ${nameTableWithConflict}. Por favor debe revisarlas o eliminarlas primero`;
        break;
      default:
        console.error("Problema, no se identifico el error...");
        resultError.statusCode = Util.HttpCodes.HTTP_500_INTERNAL_SERVER_ERROR;
        break;
    }
  }

  return resultError;
};

module.exports = fnHandlerError;
