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
  var Storage = multer.diskStorage({
    destination: function(req, file, cb) {
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
        console.log(
          `El directorio ${fullPath} esta listo para subir archivos.`
        );
      }
      cb(null, fullPath);
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });

  return Storage;
}

module.exports = fnBuildDiskStorage;
