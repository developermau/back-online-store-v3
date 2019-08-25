var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var cors = require("cors");
// Passport configured
var passport = require("./passport/jwt-passport");

var app = express();

app.use(logger("combined"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

// Routes: Index
var indexRouter = require("./routes/index");
// Routes: Usage
app.use("/", indexRouter);

// Version API
const VERSION_API_REST = "v1";
fnBuildApiByVersion(app, VERSION_API_REST);
fnBuildAuthApiByVersion(app, VERSION_API_REST);

// Listen
const host = "localhost";
const port = 9090;
app.listen(port, host, function() {
  console.log(`Server is running on http://${host}:${port}`);
});

function fnBuildApiByVersion(app, version) {
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
