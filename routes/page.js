const express = require("express");
const router = express.Router();
const {
  renderMain,
  renderPosts,
  renderPostsComments,
  renderStory,
  renderStoryComments,
  renderStoryReplyComments,
  renderMoreStory,
  renderPostReplyComments,
  renderOnlyPost,
  renderOnlyComment,
  renderDiaries,
  renderMoreDiary,
  renderDiaryComments,
  renderDiaryReplyComments,
  renderOnlyPostInfo,
  renderOnlyPostCommentLike,
  renderOnlyPostCommentLikeInfo,
  renderStoryReact,
  renderDiaryReact,
  checkUserEmail,
  checkUserNickname,
} = require("../controllers/page");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");

router.use((req, res, next) => {
  //res.locals미들에워 간에 공유되는 데이터
  res.locals.user = req.user;
  res.locals.followerCount = req.user?.Followers?.length || 0;
  res.locals.followingCount = req.user?.Followings?.length || 0;
  res.locals.followingIdList = req.user?.Followings?.map((f) => f.id) || [];
  res.locals.followerIdList = req.user?.Followers?.map((f) => f.id) || [];

  //res.sessiom:사용자의 고유한 데이터

  next();
});

//회원가입

router.get("/user-email-check/:email", checkUserEmail);
router.get("/user-nickname-check/:nickname", checkUserNickname);
//

router.get("/user-info", renderMain);
router.get("/render-posts", renderPosts);

//상대 프로필 조회
router.get("/user-info/:userId", renderMain);
//상대 프로필 게시물 조회
router.get("/render-posts/:userId", renderPosts);
router.get("/render-only-post-info/:postId", renderOnlyPostInfo);

router.get("/render-post-comment", renderPostsComments);

router.get("/render-post-replycomment/:commentId", renderPostReplyComments);
router.get("/render-only-comment-info/:commentId", renderOnlyComment);

//댓글 좋아요 클릭 후 댓글 좋아요수 업데이트
router.get(
  "/render-only-postcomment-likeinfo/:commentId",
  renderOnlyPostCommentLikeInfo
);

router.get("/render-story", renderStory);
router.get("/render-more-story/:storyId", renderMoreStory);
router.get("/render-story-comments/:storyId", renderStoryComments);
router.get("/render-story-replycomments/:commentId", renderStoryReplyComments);
router.get("/render-story-react/:storyId", renderStoryReact);

router.get("/render-diaries", renderDiaries);

//상대 프로필 일기 조회
router.get("/render-diaries/:userId", renderDiaries);

router.get("/render-diary-comments/:diaryId", renderDiaryComments);
router.get("/render-only-diaryinfo/:diaryId", renderMoreDiary);
router.get("/render-diary-replycomments/:commentId", renderDiaryReplyComments);
router.get("/render-diary-react/:diaryId", renderDiaryReact);

module.exports = router;
