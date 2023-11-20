const passport = require("passport");
const { Strategy: localStrategy } = require("passport-local");
const bcrypt = require("bcrypt");
const User = require("../models/user");

module.exports = () => {
  passport.use(
    new localStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: false,
      },
      async (email, password, done) => {
        try {
          const exUser = await User.findOne({ where: { email } });
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password);
            if (result) {
              done(null, exUser);
            } else {
              done(null, false, { message: "discord" });
            }
          } else {
            done(null, false, { message: "not exist." });
          }
        } catch (err) {
          console.error(err);
          done(err);
        }
      }
    )
  );
};
