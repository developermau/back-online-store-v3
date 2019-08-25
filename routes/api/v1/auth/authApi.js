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
var fnHandlerError = require("../../util/handlers");
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
        //console.log("\n\n********user", user);
        console.log("\n\n********user.rol.dataValues", user.rol.dataValues);
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
        const {
          us_usuario,
          us_username,
          us_email,
          us_avatar,
          us_genero,
          ro_rol
        } = user;

        const payload = {
          us_usuario,
          us_username,
          us_email
        };

        const userSimplified = {
          us_usuario,
          us_username,
          us_email,
          us_avatar,
          us_genero,
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
                .send({ user: userSimplified, auth: true, token, err: null });
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
  } catch (error) {
    console.error(error);
  }
}

module.exports = router;
