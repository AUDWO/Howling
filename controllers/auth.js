const User = require("../models/user");
const passport = require("passport");
const bcrypt = require("bcrypt");

exports.join = async (req, res, next) => {
  const { email, nickname, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    const exUserNickname = await User.findOne({ where: { nickname } });
    if (exUser) {
      return;
      //아미 존재하는 이메일
    }
    if (exUserNickname) {
      return;
      //이미 존재하는 닉네임
    }

    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nickname,
      password: hash,
    });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.login = (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      // res.send(info.message);
      return res.send("not exist");
      //유저 정보가 옳바르지 않다.
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.log(loginError);
        return next(loginError);
      }
      return res.redirect("/");
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(() => {
    res.sendStatus(200);
  });
};
