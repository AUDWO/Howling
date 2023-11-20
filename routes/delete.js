const express = require("express");
const {
  deletePost,
  deleteDiary,
  deletePostComment,
  deleteStoryComment,
  deleteDiaryComment,
  unReactStory,
  unReactDiary,
} = require("../controllers/delete");

const DiaryComment = require("../models/diaryComment");
const router = express.Router();
//post
router.delete("/post/:postId", deletePost);
router.delete("/post-comment/:commentId", deletePostComment);

//diary
router.delete("/diary/:diaryId", deleteDiary);
router.delete("/diary-comment/:commentId", deleteDiaryComment);
router.delete("/diary-react/:diaryId", unReactDiary);

//story
router.delete("/story-react/:storyId", unReactStory);

router.delete("/story-comment/:commentId", deleteStoryComment);
//router.delete("story/:storyId");

module.exports = router;
