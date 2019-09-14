console.log("\n\n\n\n=====================================");
var express = require("express");
var router = express.Router();
//  middleware for handling multipart/form-data,
var multer = require("multer");
var MulterError = multer.MulterError;
var fs = require("fs"); // Nodejs middleware for handling the file system

// Handler Error
var fnHandlerErrorMulter = require("../../util/handlersErrorMulter");
var fnHandlerError = require("../../util/handlersApi");

router.post("/:nameSection", function(req, res, next) {
  var nameSection = req.params.nameSection;

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
    var basePath = "./public/uploads";
    var fullPath = `${basePath}/${nameSection}`;

    // Build storage
    const DiskStorage = buildDiskStorage(fullPath);

    var limitMaxCountFiles = 5;
    var multerWithStorage = multer({ storage: DiskStorage });
    console.log("nameSection", nameSection);

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

/**
 * Build a Multer Disk Storage Object
 *
 * @param {String} fullPath
 * @return Storage
 */
function buildDiskStorage(fullPath) {
  console.log("fullPath", fullPath);

  var Storage = multer.diskStorage({
    destination: function(req, file, cb) {
      console.log("file", file);
      if (fs.existsSync(fullPath)) {
        console.log("El directorio esta listo para subir archivos.");
      } else {
        fs.mkdirSync(fullPath, { recursive: true });
      }
      cb(null, fullPath);
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });

  return Storage;
}

// Exports router
module.exports = router;
