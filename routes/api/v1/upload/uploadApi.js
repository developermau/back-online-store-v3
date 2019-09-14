var express = require("express");
var router = express.Router();
// Handler Error
var fnHandlerError = require("../../util/handlersApi");
// Multer: Uploader
var fnGetUploadWithDiskStorage = require("../../util/MulterUpload");

var basePath = "./public/uploads";
var fieldName = "fotografias";
var limitMaxCountFiles = 3;

var upload = fnGetUploadWithDiskStorage(basePath, fieldName);

router.post("/", upload.array(fieldName, limitMaxCountFiles), fnSaveDB);

function fnSaveDB(req, res, err) {
  const fullPath = `${basePath}/${fieldName}`;
  const files = req.files;
  console.log("fullPath", fullPath);
  console.log("files", files);
  res.status(200).send({ msg: "Se subio los archivos correctamente." });
}

// Exports router
module.exports = router;
