var express = require("express");
var router = express.Router();
//  middleware for handling multipart/form-data,
var multer = require("multer");
var fs = require("fs"); // Nodejs middleware for handling the file system

// Handler Error
var fnHandlerErrorMulter = require("../../util/handlersErrorMulter");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/photos");
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  }
});

var multerWithStorage = multer({ storage: storage });

router.post("/photos", function(req, res, next) {
  var limitMaxCountFiles = 5;
  var upload = multerWithStorage.array("photos", limitMaxCountFiles);

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
