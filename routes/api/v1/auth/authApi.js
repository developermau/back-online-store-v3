var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");

// Models
var models = require("../../../../models");
// Model: Usuario
var Usuario = models.Usuario;
// MODEL: Rol
let rolModel = models.Rol;
// Config
var CONFIG = require("../../../../config/jwtConfig");

// HTTP CODES
var Util = require("../../util/httpcodes");
// Handler Error
var fnHandlerError = require("../../util/handlersApi");
// Expiration Time
var expirationTime = "24h";

/* POST: Login  */
router.post("/login", login);

function login(req, res) {
  console.log("req.body", req.body);
  const { us_username, us_password } = req.body;

  console.log("\n\n rolModel", rolModel);

  try {
    Usuario.findOne({
      where: { us_username: us_username },
      include: [{ model: rolModel, as: "rol" }]
    })
      .then(user => {
        if (!user) {
          return res.status(Util.HttpCodes.HTTP_400_BAD_REQUEST).send({
            user: null,
            isAuth: false,
            token: "",
            msg: "Incorrect username."
          });
        }

        if (!user.validPassword(us_password)) {
          return res.status(Util.HttpCodes.HTTP_400_BAD_REQUEST).send({
            user: null,
            isAuth: false,
            token: "",
            msg: "Incorrect password."
          });
        }

        const {
          us_usuario,
          us_email,
          us_avatar,
          us_primer_nombre,
          us_segundo_nombre,
          us_paterno_apellido,
          us_materno_apellido,
          us_carnet,
          us_direccion,
          us_telefono_fijo,
          us_telefono_movil
        } = user;

        // JWT: Payload
        const payload = {
          us_usuario,
          us_username,
          us_email,
          us_avatar,
          us_primer_nombre,
          us_segundo_nombre,
          us_paterno_apellido,
          us_materno_apellido,
          us_carnet,
          us_direccion,
          us_telefono_fijo,
          us_telefono_movil
        };

        // JWT: Generate token
        jwt.sign(
          payload,
          CONFIG.SECRET_TOKEN,
          { expiresIn: expirationTime },
          function(err, token) {
            if (err) {
              res.status(Util.HttpCodes.HTTP_500_INTERNAL_SERVER_ERROR).send({
                user: null,
                isAuth: false,
                token: "",
                msg: err.message
              });
            } else {
              res.status(Util.HttpCodes.HTTP_200_OK).send({
                user: payload,
                isAuth: true,
                token,
                msg: "Bienvenido!"
              });
            }
          }
        );
      })
      .catch(err => {
        console.log(err);
        res
          .status(Util.HttpCodes.HTTP_500_INTERNAL_SERVER_ERROR)
          .send({ user: null, isAuth: false, token: "", msg: err.message });
      });
  } catch (error) {
    console.error(error);
  }
}

module.exports = router;
