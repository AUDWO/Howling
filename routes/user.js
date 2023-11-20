const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares");
const {
  follow,
  checkFollower,
  checkFollowerr,
  unfollow,
} = require("../controllers/user");
const { findUserById } = require("../controllers/user");

router.get("/:id", isLoggedIn, findUserById);
router.get("/find-follower/:userId", checkFollower);
router.get("/find-followerr/:userId", checkFollowerr);
router.post("/:id/follow", isLoggedIn, follow);
router.post("/:id/unfollow", isLoggedIn, unfollow);

module.exports = router;
