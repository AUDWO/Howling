const express = require("express");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const { isLoggedIn } = require("../middlewares/");
const {
  afterUploadImage,
  uploadPost,
  uploadStory,
  uploadDiary,
  likePost,
  unLikePost,
  reactStory,
  unReactStory,
  reactDiary,
} = require("../controllers/post");
const router = express.Router();

try {
  fs.readdirSync("uploads");
} catch (error) {
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 100 * 1024 * 1024 },
});

const upload2 = multer();

router.post("/img", isLoggedIn, upload.single("img"), afterUploadImage);
router.post("/", isLoggedIn, upload2.none(), uploadPost);
router.post("/like/:postId", likePost);
router.post("/unlike/:postId", unLikePost);

router.post("/storyimg", isLoggedIn, upload.single("img"), afterUploadImage);
router.post("/story", isLoggedIn, upload2.none(), uploadStory);
router.post("/story-react/:storyId", reactStory);

router.post("/diaryimg", isLoggedIn, upload.single("img"), afterUploadImage);
router.post("/diary", isLoggedIn, upload2.none(), uploadDiary);
router.post("/diary-react/:diaryId", reactDiary);
//router.post("/storyContact",)

router.post("/profile-img", isLoggedIn, upload.single("img"), afterUploadImage);

module.exports = router;
