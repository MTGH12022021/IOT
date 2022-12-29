const passport = require("passport");
const User = require("../models/User");

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, {
    email: user.email,
    name: user.name,
    id: user._id,
  });
});

passport.deserializeUser(function (user, done) {
  return done(null, user);
});

module.exports = passport;