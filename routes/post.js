const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
const { verify } = require("../auth");

router.post("/createPost", verify, postController.createPost);

router.get("/getPost/:postId", postController.getPost);
router.get("/getAllPost", postController.getAllPost);

router.patch("/updatePost/:postId", verify, postController.updatePost);
router.delete("/deletePost/:postId", verify, postController.deletePost);

router.patch("/addComment/:postId/comments", verify, postController.addComment);
router.get("/viewComment/:postId/comments", postController.viewComment);
router.patch("/updateComment/:postId/comments/:commentId", verify, postController.updateComment);
router.delete("/deleteComment/:postId/comments/:commentId", verify, postController.removeComment);

module.exports = router;