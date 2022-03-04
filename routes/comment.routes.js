const { Router } = require('express');
const router = new Router();
const Post = require('../models/post.model');
const Comment = require('../models/comment.model');
const User = require('../models/user.model');

const { isLoggedIn } = require('../middlewares/guard');
const imgUploader = require('../cloudinary.config');
const userModel = require('../models/user.model');

// POST route to post a comment
router.post('/:id', isLoggedIn, imgUploader.array('comImage', 3), async (req, res) => {
  const post = await Post.findById(req.params.id);
  const user = await User.findById(req.session.currentUser._id)
  let preImage = [];
  req.files.forEach(img => {
    preImage.push(img.path);
  });
  const comments = await Comment.create({
    title: req.body.title,
    image: preImage,
    description: req.body.description,
    user: req.session.currentUser._id,
    username: user.username
  });
  post.comments.push(comments.id);
  user.score += 1;
  user.comments.push(comments.id);
  await post.save();
  await user.save();
  res.redirect(`/posts/postDetail/${req.params.id}`);
});



// DELETE route to delete comment
router.delete('/:id', isLoggedIn, async (req, res) => {
  await Comment.findByIdAndDelete(req.params.id);
  const user = await User.findById(req.session.currentUser._id);
  user.score -= 1;
  await user.save();
  res.redirect(req.get('referer'));

});




module.exports = router;
