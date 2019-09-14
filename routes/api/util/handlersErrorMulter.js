// HTTP CODES
var Util = require("./httpcodes");

var fnHandlerErrorMulter = function(err, folderUploads, maxLimitFiles) {
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  console.log("\n\n fnHandlerErrorMulter err: ");
  console.log(err);

  let result = {
    nameError: "MulterError",
    statusCode: Util.HttpCodes.HTTP_500_INTERNAL_SERVER_ERROR,
    message: err.message,
    code: err.code,
    field: err.field,
    stack: err.stack,
    storageErrors: []
  };

  if (err.name !== null && err.name !== undefined) {
    result.nameError = err.name;
  }

  if (err.code !== null && err.code !== undefined) {
    switch (err.code) {
      case "LIMIT_FILE_COUNT":
        result.message =
          "Se estan subiendo mas archivos de los permitidos a la vez, que es " +
          maxLimitFiles +
          " archivo(s)";
        break;
      case "LIMIT_UNEXPECTED_FILE":
        result.message = `El campo ${err.field} no existe, por favor reviselo`;
        break;
      case "ENOENT":
        result.message = "El folder " + folderUploads + " no existe";
        break;
      default:
        result.message = "Error, al subir el archivo";
        break;
    }
  }

  if (err.field !== null && err.field !== undefined) {
    result.field = err.field;
  }

  console.log(result);
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

  return result;
};

module.exports = fnHandlerErrorMulter;
