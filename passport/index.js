const passport = require("passport");
const local = require("./localStrategy");

const User = require("../models/user");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
          as: "Followers",
        }, //팔로잉git
        {
          model: User,
          attributes: ["id", "nickname"],
          as: "Followings",
        }, //팔로워
      ],
    })
      .then((user) => done(null, user)) // req.user
      .catch((err) => done(err));
  });

  local();
};
