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
  try {
    var limitMaxCountFiles = 5;
    var nameSection = req.params.nameSection;
    var path = "./public/uploads/" + nameSection;

    console.log("nameSection", nameSection);
    console.log("path", path);

    var storage = multer.diskStorage({
      destination: function(req, file, cb) {
        console.log("file", file);
        if (fs.existsSync(path)) {
          console.log("El directorio esta listo para subir archivos.");
        } else {
          console.log("El directorio no existe.");
          fs.mkdirSync(path, { recursive: true });
        }
        cb(null, path);
      },
      filename: function(req, file, cb) {
        console.log("file", file);
        cb(null, file.originalname);
      }
    });

    var multerWithStorage = multer({ storage: storage });

    var upload = multerWithStorage.array(nameSection, limitMaxCountFiles);

    upload(req, res, function(err) {
      console.log("upload.....");
      if (err instanceof MulterError) {
        console.log(err);
        // A Multer error occurred when uploading.
        let resError = fnHandlerErrorMulter(err, path, limitMaxCountFiles);
        res.status(resError.statusCode).send(resError);
      } else if (err) {
        console.log(err);
        // An unknown error occurred when uploading.
        let resError = fnHandlerErrorMulter(err, path, limitMaxCountFiles);
        res.status(resError.statusCode).send(resError);
      }

      console.log("Path", path)
      console.log("req.files", req.files);

      // Everything went fine.
      res.status(200).json({ msg: "Archivo se subio correctamente" });
    });
  } catch (error) {
    console.error('error', error);
  }
});
console.log("\n\n\n\n=====================================");
module.exports = router;
