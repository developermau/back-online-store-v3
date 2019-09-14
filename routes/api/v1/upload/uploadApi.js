var express = require("express");
var router = express.Router();
//  middleware for handling multipart/form-data,
var multer = require("multer");

// Multer Storage
var fnBuildDiskStorage = require("../../util/MulterStorages");

// Handler Error
var fnHandlerErrorMulter = require("../../util/handlersErrorMulter");
var fnHandlerError = require("../../util/handlersApi");

var basePath = "./public/uploads";
var fieldName = "fotografias";
var upload = fnBuildMulterUpload(basePath, "fotografias");
var limitMaxCountFiles = 3;

router.post("/", upload.array(fieldName, limitMaxCountFiles), fnSaveDB);

function fnSaveDB(req, res, err) {
  const fullPath = `${basePath}/${fieldName}`;
  const files = req.files;
  console.log("fullPath", fullPath);
  console.log("files", files);
  res.status(200).send({ msg: "Se subio los archivos correctamente." });
}

function fnBuildMulterUpload(basePath, fieldName) {
  var fullPath = `${basePath}/${fieldName}`;
  const DiskStorage = fnBuildDiskStorage(fullPath);

  return multer({ storage: DiskStorage });
}

// Exports router
module.exports = router;
