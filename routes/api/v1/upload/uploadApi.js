var express = require("express");
var router = express.Router();
//  middleware for handling multipart/form-data,
var multer = require("multer");
var fs = require("fs"); // Nodejs middleware for handling the file system

// Handler Error
var fnHandlerError = require("../../util/handlersApi");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    // console.log("destination.file", file);
    // console.log("req", req);
    console.log("destination", req.body);
    console.log("destination file", file);
    cb(null, "./uploads" + "/" + file.fieldname);
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

router.post("/upload/:section", function(req, res) {
  try {
    var section = req.params;
    var upload = multer({ storage: storage }).array(section, 1);
    //console.log(upload);

    //   console.log("router.post -> req.params", req.params);
    //   console.log("router.post -> req.body", req.body);

    upload(req, res, function(err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        console.log("Error uploading file.");
        let resError = fnHandlerError(err);
        console.log(resError);
        return res.status(resError.statusCode).send(resError);
      } else if (err) {
        // An unknown error occurred when uploading.
        let resError = fnHandlerError(err);
        console.log(resError);
        return res.status(resError.statusCode).send(resError);
      }

      // Everything went fine.
      // req.files is array of `photos` files
      // req.body will contain the text fields, if there were any
      //console.log(req.files);
      console.log("upload -> req.body", req.body);
      res.end("Files are uploaded");
    });
  } catch (error) {
    // An unknown error occurred when uploading.
    let resError = fnHandlerError(err);
    console.log(resError);
    return res.status(resError.statusCode).send(resError);
  }
});

module.exports = router;
