const CONFIG = require("../config/jwtConfig");
var models = require("../models");
var User = models.User;

const passport = require("passport"),
  JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

// Options
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = CONFIG.SECRET_TOKEN;

passport.use(
  new JwtStrategy(opts, async function(jwt_payload, done) {
    try {
      const user = await User.findByPk(jwt_payload.id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

// Exporting our configured passport
module.exports = passport;
