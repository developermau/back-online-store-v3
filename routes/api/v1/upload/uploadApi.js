var express = require("express");
var router = express.Router();
//  middleware for handling multipart/form-data,
var multer = require("multer");
var fs = require("fs"); // Nodejs middleware for handling the file system

// Handler Error
var fnHandlerErrorMulter = require("../../util/handlersErrorMulter");

router.post("/:nameSection", function(req, res, next) {
  var limitMaxCountFiles = 5;
  var nameSection = req.params.nameSection;
  console.log("nameSection", nameSection);

  var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "./uploads/" + nameSection);
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
      let resError = fnHandlerErrorMulter(err);
      res.status(resError.statusCode).send(resError);
    } else if (err) {
      console.log(err);
      // An unknown error occurred when uploading.
      let resError = fnHandlerErrorMulter(err);
      res.status(resError.statusCode).send(resError);
    }

    // Everything went fine.
    res.status(200).end();
  });
});

module.exports = router;
