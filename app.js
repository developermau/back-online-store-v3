const host = "localhost";
const port = 9090;

var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var cors = require("cors");
var path = require("path");
const fs = require("fs");
var serveIndex = require("serve-index");
// Passport configured
var passport = require("./passport/jwt-passport");
// List endpoints
const listEndpoints = require("express-list-endpoints");
//  middleware for handling multipart/form-data,
var multer = require("multer");
var MulterError = multer.MulterError;

var app = express();

app.use(logger("combined"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
// Upload: fotografias
app.use(
  "/public/uploads/fotografias",
  express.static(path.join(__dirname, "public/uploads/fotografias"))
);

// Routes: Index
var indexRouter = require("./routes/index");
// Routes: Usage
app.use("/", indexRouter);

// Version API
const VERSION_API_REST = "v1";
fnBuildAuthApiByVersion(app, VERSION_API_REST);
fnBuildModelApiByVersion(app, VERSION_API_REST);
fnBuildRelacionApiByVersion(app, VERSION_API_REST);
fnBuildUploadApiByVersion(app, VERSION_API_REST);

// Handler Error
var fnHandlerErrorMulter = require("./routes/api/util/handlersErrorMulter");
var fnHandlerError = require("./routes/api/util/handlersApi");

app.use(function(err, req, res, next) {
  if (err instanceof MulterError) {
    // A Multer error occurred when uploading.
    let resError = fnHandlerErrorMulter(err);
    res.status(resError.statusCode).send(resError);
  } else if (err) {
    // An unknown error occurred when uploading.
    let resError = fnHandlerError(err);
    res.status(resError.statusCode).send(resError);
  }
});

console.log(listEndpoints(app));

// Listen
app.listen(port, host, function() {
  console.log(`Server is running on http://${host}:${port}`);
});

function fnBuildModelApiByVersion(app, version) {
  // Routes: API
  var areaRouter = require(`./routes/api/${version}/areaApi`);
  var categoriaRouter = require(`./routes/api/${version}/categoriaApi`);
  var compraRouter = require(`./routes/api/${version}/compraApi`);
  var fotografiaRouter = require(`./routes/api/${version}/fotografiaApi`);
  var opinionRouter = require(`./routes/api/${version}/opinionApi`);
  var productoRouter = require(`./routes/api/${version}/productoApi`);
  var proveedorRouter = require(`./routes/api/${version}/proveedorApi`);
  var recursoRouter = require(`./routes/api/${version}/recursoApi`);
  var rolRouter = require(`./routes/api/${version}/rolApi`);
  var usuarioRouter = require(`./routes/api/${version}/usuarioApi`);

  // Uso: Routes: API
  app.use(`/api/${version}/areas`, areaRouter);
  app.use(`/api/${version}/categorias`, categoriaRouter);
  app.use(`/api/${version}/compras`, compraRouter);
  app.use(`/api/${version}/fotografias`, fotografiaRouter);
  app.use(`/api/${version}/opiniones`, opinionRouter);
  app.use(`/api/${version}/productos`, productoRouter);
  app.use(`/api/${version}/proveedores`, proveedorRouter);
  app.use(`/api/${version}/recursos`, recursoRouter);
  app.use(`/api/${version}/roles`, rolRouter);
  app.use(`/api/${version}/usuarios`, usuarioRouter);
}

function fnBuildAuthApiByVersion(app, version) {
  // Routes: AUTH
  var authRouter = require(`./routes/api/${version}/auth/authApi`);
  // Routes: Auth
  app.use(`/api/${version}/auth`, authRouter);
}

function fnBuildRelacionApiByVersion(app, version) {
  // Routes: Relationships
  var relIncluyeRouter = require(`./routes/api/${version}/relIncluyeApi`);
  var relGustaRouter = require(`./routes/api/${version}/relGustaApi`);
  // Routes: Relacion Incluye
  app.use(`/api/${version}/incluyes`, relIncluyeRouter);
  // Routes: Relacion Gusta
  app.use(`/api/${version}/gustas`, relGustaRouter);
}

function fnBuildUploadApiByVersion(app, version) {
  var uploadRouter = require(`./routes/api/${version}/upload/uploadApi`);
  app.use(`/api/${version}/uploads`, uploadRouter);
}
