var express = require("express");
var router = express.Router();
//  middleware for handling multipart/form-data,
var multer = require("multer");
var fs = require("fs"); // Nodejs middleware for handling the file system

// Handler Error
var fnHandlerErrorMulter = require("../../util/handlersErrorMulter");
var fnHandlerError = require("../../util/handlersApi");

router.post("/:nameSection", function(req, res, next) {
  var limitMaxCountFiles = 5;
  var nameSection = req.params.nameSection;
  var path = "./uploads/" + nameSection;

  console.log("nameSection", nameSection);

  var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      if (fs.existsSync(path)) {
        console.log("El directorio esta listo para subir archivos.");
      } else {
        fs.mkdirSync(path, { recursive: true }, err => {
          if (err) {
            let resError = fnHandlerError(err);
            res.status(resError.statusCode).send(resError);
          }
          console.log("El directorio fue creado y esta listo para subir archivos.");
        });
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
    if (err instanceof multer.MulterError) {
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

    // Everything went fine.
    res.status(200).end();
  });
});

module.exports = router;
