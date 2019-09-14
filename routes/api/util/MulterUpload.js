//  middleware for handling multipart/form-data,
var multer = require("multer");
// Functions
var fnBuildDiskStorage = require("../util/MulterStorages");

function fnGetUploadWithDiskStorage(basePath, fieldName) {
  const fullPath = `${basePath}/${fieldName}`;
  // Multer Storage
  const DiskStorage = fnBuildDiskStorage(fullPath);
  return multer({ storage: DiskStorage });
}

module.exports = fnGetUploadWithDiskStorage;
