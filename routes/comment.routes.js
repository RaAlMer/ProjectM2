const { Router } = require('express');
const router = new Router();
const Post = require('../models/post.model');
const Comment = require('../models/comment.model');

const { isLoggedIn } = require('../middlewares/guard');
const imgUploader = require('../cloudinary.config');

router.post('/:id', isLoggedIn, imgUploader.array('comImage', 3), async (req, res) => {
  const post = await Post.findById(req.params.id);
  let preImage = [];
  req.files.forEach(img => {
    preImage.push(img.path);
  });
  const comments = await Comment.create({
    title: req.body.title,
    image: preImage,
    description: req.body.description,
  });
  post.comments.push(comments.id);
  await post.save();
  res.redirect(`/posts/postDetail/${req.params.id}`);
});

module.exports = router;
