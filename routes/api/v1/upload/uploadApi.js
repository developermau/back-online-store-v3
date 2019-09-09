var express = require("express");
var router = express.Router();
//  middleware for handling multipart/form-data,
var multer = require("multer");
var fs = require("fs"); // Nodejs middleware for handling the file system

// Handler Error
var fnHandlerError = require("../../util/handlersApi");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/photos");
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  }
});

var multerWithStorage = multer({ storage: storage });

var upload = multerWithStorage.array("photos", 12);

router.post("/photos/upload", function(req, res, next) {
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
      // A Multer error occurred when uploading.
      let resError = fnHandlerError(err);
      res.status(resError.statusCode).send(resError);
    } else if (err) {
      console.log(err);
      // An unknown error occurred when uploading.
      let resError = fnHandlerError(err);
      res.status(resError.statusCode).send(resError);
    }

    // Everything went fine.
    res.status(200).end();
  });
});

module.exports = router;
