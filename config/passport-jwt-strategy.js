const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const env = require('./environment');

const Doctor = require('../models/doctor');

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = env.secretKey;

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    Doctor.findOne({ id: jwt_payload._id }, function (err, user) {
      //   console.log(user, jwt_payload._id);
      if (err) {
        console.log('error in finding user');
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  })
);

module.exports = passport;
