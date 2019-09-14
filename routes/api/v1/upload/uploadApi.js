const express = require("express");
const router = express.Router();
// Handler Error
const fnHandlerError = require("../../util/handlersApi");
// Multer: Uploader
const fnGetUploadWithDiskStorage = require("../../util/MulterUpload");

const basePath = "./public/uploads";
const fieldName = "fotografias";
const fullPath = `${basePath}/${fieldName}`;
const limitMaxCountFiles = 5;

var upload = fnGetUploadWithDiskStorage(fullPath);

router.post("/", upload.array(fieldName, limitMaxCountFiles), function(
  req,
  res,
  err
) {
  const files = req.files;

  console.log("fullPath", fullPath);

  const pr_producto = 100;
  const pr_nombre = "Producto x";

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fo_ubicacion = `${file.destination}/${file.originalname}`;

    const fotografia = {
      fo_title: `Fotografia del producto ${pr_nombre}`,
      fo_ubicacion: fo_ubicacion,
      fo_flex: 6,
      pr_producto: pr_producto,
      // Audit
      createdAt: new Date(),
      updatedAt: new Date()
    };
    console.log("fotografia", fotografia);
  }

  res.status(200).send({ msg: "Se subio los archivos correctamente." });
});

// Exports router
module.exports = router;
