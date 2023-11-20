const express = require("express");
const router = express.Router();

const {
  updatePostLikeCount,
  updateCommentLikeCount,
  updateUserInfo,
  updatePostInfo,
  updateDiaryInfo,
  updateDiaryReactInfo,
} = require("../controllers/update");

router.patch("/postLikeCount", updatePostLikeCount);
router.patch("/commentLikeCount", updateCommentLikeCount);

//user
router.patch("/user/profile-info", updateUserInfo);

//post
router.patch("/post-info/:postId", updatePostInfo);

//diary
router.patch("/diary-info/:diaryId", updateDiaryInfo);
router.patch("/diary-react-info/:diaryId", updateDiaryReactInfo);

//story
//router.patch("/story-react-info/:storyId");

module.exports = router;
