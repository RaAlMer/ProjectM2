const { Router } = require('express');
const router = new Router();
const Post = require('../models/post.model');
const Comment = require('../models/comment.model');

const { isLoggedIn } = require('../middlewares/guard');

router.post('/:id', isLoggedIn, async (req, res) => {
  const post = await Post.findById(req.params.id);
  const comments = await Comment.create({
    title: req.body.title,
    description: req.body.description,
  });
  post.comments.push(comments.id);
  await post.save();
  res.redirect(`/posts/postDetail/${req.params.id}`);
});

module.exports = router;
