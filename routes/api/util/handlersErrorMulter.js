// HTTP CODES
var Util = require("./httpcodes");

var fnHandlerErrorMulter = function(err, folderUploads, maxLimitFiles) {
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  console.log("\n\n fnHandlerErrorMulter err: ");
  console.log(err);

  let result = {
    nameError: "",
    statusCode: Util.HttpCodes.HTTP_500_INTERNAL_SERVER_ERROR,
    message: "",
    code: 0,
    field: 0,
    storageErrors: []
  };

  if (err.name !== null && err.name !== undefined) {
    result.nameError = err.name;
  }

  if (err.code !== null && err.code !== undefined) {
    result.code = err.code;

    if (result.code === "LIMIT_UNEXPECTED_FILE") {
      result.message =
        "Se estan subiendo mas archivos de los permitidos a la vez, que es " +
        maxLimitFiles +
        " archivo(s)";
    }
    if (result.code === "ENOENT") {
      result.message = "El folder " + folderUploads + " no existe";
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
