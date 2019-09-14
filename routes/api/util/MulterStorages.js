//  middleware for handling multipart/form-data,
var multer = require("multer");
// Nodejs middleware for handling the file system
var fs = require("fs");

/**
 * Build a Multer Disk Storage Object
 *
 * @param {String} fullPath
 * @return Storage
 */
function fnBuildDiskStorage(fullPath) {
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
};

module.exports = fnBuildDiskStorage;