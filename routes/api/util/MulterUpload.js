//  middleware for handling multipart/form-data,
var multer = require("multer");
// Functions
var fnBuildDiskStorage = require("../util/MulterStorages");

function fnGetUploadWithDiskStorage(fullPath) {
  console.log("fullPath", fullPath);
  // Multer Storage
  const DiskStorage = fnBuildDiskStorage(fullPath);
  return multer({ storage: DiskStorage });
}

module.exports = fnGetUploadWithDiskStorage;
