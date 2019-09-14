var express = require("express");
var router = express.Router();
//  middleware for handling multipart/form-data,
var multer = require("multer");
var MulterError = multer.MulterError;

// Multer Storage
var fnBuildDiskStorage = require("../../util/MulterStorages");

// Handler Error
var fnHandlerErrorMulter = require("../../util/handlersErrorMulter");
var fnHandlerError = require("../../util/handlersApi");

var basePath = "./public/uploads";
var fieldName = "fotografias";
var upload = fnBuildMulterUpload(basePath, "fotografias");
var limitMaxCountFiles = 3;

/*
var cpUpload = upload.fields([
  { name: fieldName, maxCount: limitMaxCountFiles }
]);
*/
router.post("/", upload.fields([{ name: fieldName, maxCount: limitMaxCountFiles }]), fnSaveDB);

function fnCpUpload(req, res, next) {
  var middleware = null;
  var hasError = true;

  try {
    upload.fields([{ name: fieldName, maxCount: limitMaxCountFiles }]);
    next();
  } catch (error) {
    next(error);
  }
}

function fnSaveDB(req, res, err) {
  console.log("\n\n\n\n===========")
  console.log("err", err);
  console.log("req", req);
  console.log("res", res);

  /*
  if (err instanceof MulterError) {
    console.log(err);
    // A Multer error occurred when uploading.
    let resError = fnHandlerErrorMulter(err, fullPath, limitMaxCountFiles);
    res.status(resError.statusCode).send(resError);
  } else if (err) {
    console.log(err);
    // An unknown error occurred when uploading.
    let resError = fnHandlerErrorMulter(err, fullPath, limitMaxCountFiles);
    res.status(resError.statusCode).send(resError);
  }
  */

  var fullPath = `${basePath}/${fieldName}`;
  console.log("fullPath", fullPath);
  console.log('req.files', req.files);
  res.status(200).send("ok");
  console.log("\n\n\n\n===========")
  return;
}

function fnBuildMulterUpload(basePath, fieldName) {
  var fullPath = `${basePath}/${fieldName}`;
  const DiskStorage = fnBuildDiskStorage(fullPath);

  return multer({ storage: DiskStorage });
}

// Exports router
module.exports = router;
