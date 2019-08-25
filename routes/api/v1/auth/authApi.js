var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");

// Models
var models = require("../../../../models");
// Model: Usuario
var Usuario = models.Usuario;
// Config
var CONFIG = require("../../../../config/jwtConfig");

// HTTP CODES
var Util = require("../../util/httpcodes");
// Handler Error
var fnHandlerError = require("../../util/handlers");
// Expiration Time
var expirationTime = "24h";

/* POST: Login  */
router.post("/login", login);

function login(req, res) {
  console.log("req.body", req.body);
  const { us_username, us_password } = req.body;

  Usuario.findOne(
    { where: { us_username } },
    {
      include: [
        { model: fotografiaModel, as: "fotografias" },
        { model: categoriaModel, as: "categoria" },
        { model: proveedorModel, as: "proveedor" }
      ]
    }
  )
    .then(user => {
      if (!user) {
        return res
          .status(Util.HttpCodes.HTTP_400_BAD_REQUEST)
          .send({ msg: "Incorrect username." });
      }

      if (!user.validPassword(us_password)) {
        return res
          .status(Util.HttpCodes.HTTP_400_BAD_REQUEST)
          .send({ msg: "Incorrect password." });
      }

      // JWT: Payload
      const { us_usuario, us_username, us_email, ro_rol } = user;

      const payload = {
        us_usuario,
        us_username,
        us_email,
        ro_rol
      };

      // JWT: Generate token
      jwt.sign(
        payload,
        CONFIG.SECRET_TOKEN,
        { expiresIn: expirationTime },
        function(err, token) {
          if (err) {
            console.log(err);
            res
              .status(Util.HttpCodes.HTTP_500_INTERNAL_SERVER_ERROR)
              .send({ user: null, auth: false, token: "", err });
          } else {
            res
              .status(Util.HttpCodes.HTTP_200_OK)
              .send({ user: payload, auth: true, token, err: null });
          }
        }
      );
    })
    .catch(err => {
      console.log(err);
      res
        .status(Util.HttpCodes.HTTP_500_INTERNAL_SERVER_ERROR)
        .send({ user: null, auth: false, token: "", err });
    });
}

module.exports = router;
