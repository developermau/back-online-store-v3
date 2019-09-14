console.log("\n\n\n\n=====================================");
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
var nameSection = "fotografias";

router.post("/", function(req, res, next) {
  if (
    nameSection === null ||
    nameSection === undefined ||
    nameSection.length === 0
  ) {
    const err = {
      name: "Express",
      message: "No se paso el parametro 'nameSection'"
    };
    let resError = fnHandlerError(err);
    res.status(resError.statusCode).send(resError);
  } else {
    console.log("nameSection", nameSection);
    var fullPath = `${basePath}/${nameSection}`;

    const DiskStorage = fnBuildDiskStorage(fullPath);

    var limitMaxCountFiles = 5;
    var multerWithStorage = multer({ storage: DiskStorage });

    var upload = multerWithStorage.array(nameSection, limitMaxCountFiles);

    upload(req, res, function(err) {
      console.log("upload.....");
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

      console.log("FullPath", fullPath);
      console.log("req.files", req.files);

      // Everything went fine.
      res.status(200).json({ msg: "Archivo se subio correctamente" });
    });
  }
});
console.log("\n\n\n\n=====================================");

// Exports router
module.exports = router;
