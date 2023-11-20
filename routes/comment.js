const express = require("express");
const router = express.Router();
const {
  postPostsComment,
  postStoryComment,
  postDiaryComment,
  postCommentLike,
  postCommenUntLike,
} = require("../controllers/postComment");

router.post("/post", postPostsComment);
router.post("/post/like/:commentId", postCommentLike);
router.post("/post/unlike/:commentId", postCommenUntLike);

//router.post("/diary");

router.post("/story", postStoryComment);
//router.post("/story/like",)

router.post("/diary", postDiaryComment);

module.exports = router;
