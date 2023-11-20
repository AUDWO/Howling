const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const session = require("express-session");
const router = express.Router();
const path = require("path");
const dotenv = require("dotenv");
const passport = require("passport");
const app = express();
const passportConfig = require("./passport");
const redis = require("redis");
const RedisStore = require("connect-redis").default;

dotenv.config();

const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD,
  legacyMode: false,
});
redisClient.connect().catch(console.error);

const pageRouter = require("./routes/page");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const commentRouter = require("./routes/comment");
const updateRouter = require("./routes/update");
const deleteRouter = require("./routes/delete");
const helmet = require("helmet");
const hpp = require("hpp");
const { sequelize } = require("./models");
const logger = require("./logger");

passportConfig();
app.set("port", process.env.PORT || 8080);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

if (process.env.NODE_ENV === "production") {
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: false,
    })
  );
  app.use(hpp());
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
var cors = require("cors");
const { deepStrictEqual } = require("assert");
app.use(cors());
app.use("/img", express.static(path.join(__dirname, "uploads")));
app.use("/profileImg", express.static(path.join(__dirname, "profileImg")));
app.use(express.json());
app.use(express.urlencoded({ limit: "10mb", extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
const sessionOption = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },

  store: new RedisStore({ client: redisClient }),
};
if (process.env.NODE_ENV === "production") {
  sessionOption.proxy = true;
}
app.use(session(sessionOption));

app.use(passport.initialize());
app.use(passport.session());

//const cors = require("cors");
//app.use(cors());

/*
app.listen(8005, () => {
  console.log("Listening on 8005");
});*/

app.use(express.static(path.join(__dirname, "prototype-client/build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "prototype-client/build/index.html"));
});

app.use("/page", pageRouter);
app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use("/user", userRouter);
app.use("/comment", commentRouter);
app.use("/update", updateRouter);
app.use("/delete", deleteRouter);

//react에서 react-router-dom으로 다룰 수 있게
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/prototype-client/build/index.html"));
});
//에러 처리 담당

app.use((req, res, next) => {
  const error = new Error(`${(req, method)} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  logger.info("hello");
  logger.error(error.message);
  next(error);
});

app.use((err, req, res, next) => {
  res.loacls.message = err.message;
  res.locals.erorr = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
});

module.exports = app;
