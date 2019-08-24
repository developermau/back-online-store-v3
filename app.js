var express = require("express");

var app = express();

// Routes: Definition
var indexRouter = require('./routes/index');

// Routes: Usage
app.use("/", indexRouter);

// Listen
const host = "localhost";
const port = 9090;
app.listen(port, host, function() {
  console.log(`Server is running on http://${host}:${port}`);
});
