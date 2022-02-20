const { Router } = require('express');
const router = new Router();
const Post = require('../models/post.model');
const { isLoggedIn } = require('../middlewares/guard');
const imgUploader = require('../cloudinary.config');

// Route to create Post

router.get('/create', isLoggedIn, (req, res) => {
  const post = new Post();
  res.render('post/createPost', { post });
});

// Route POST
router.post(
  '/create',
  isLoggedIn,
  imgUploader.single('image'),
  async (req, res) => {
    req.post = new Post();
    req.post.title = req.body.title;
    console.log(req);
    req.post.image = req.file.path;
    req.post.description = req.body.description;
    req.post.city = req.body.city;
    req.post.country = req.body.country;
    req.post.level = req.body.level;
    req.post.longitude = req.body.longitude;
    req.post.latitude = req.body.latitude;
    req.post.user = req.session.currentUser._id;
    try {
      await req.post.save();
      res.redirect('/');
    } catch (error) {
      console.log(error);
      res.redirect('/posts/createPost');
    }
  }
);

// GET route to show all posts
router.get('/all', async (req, res) => {
  const posts = await Post.find({});
  res.render('post/viewAllPost', { posts });
});

// Get route to edit the post

router.get('/edit/:id', isLoggedIn, async (req, res) => {
  const post = await Post.findById(req.params.id);

  res.render('post/editPost', { post });
});

// Put route to edit the post

router.put('/edit/:id', isLoggedIn, async (req, res) => {
  req.post = await Post.findById(req.params.id);
  req.post.title = req.body.title;
  req.post.image = req.body.image;
  req.post.description = req.body.description;
  req.post.city = req.body.city;
  req.post.country = req.body.country;
  req.post.level = req.body.level;
  req.post.longitude = req.body.longitude;
  req.post.latitude = req.body.latitude;
  req.post.user = req.session.currentUser._id;
  try {
    await req.post.save();
    res.redirect('/posts/all');
  } catch (error) {
    res.redirect('/posts/edit/:id');
  }
});

//Route for upVote

router.get('/upvote/:id', isLoggedIn, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post.downVote.includes(req.session.currentUser._id)) {
    post.downVote.splice(req.session.currentUser._id, 1);
  }
  if (!post.upVote.includes(req.session.currentUser._id)) {
    post.upVote.push(req.session.currentUser._id);
  }
  post.save();
  res.redirect('/posts/all');
});

//Route for downVote

router.get('/downvote/:id', isLoggedIn, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post.upVote.includes(req.session.currentUser._id)) {
    post.upVote.splice(req.session.currentUser._id, 1);
  }
  if (!post.downVote.includes(req.session.currentUser._id)) {
    post.downVote.push(req.session.currentUser._id);
  }
  post.save();
  res.redirect('/posts/all');
});

// DELETE route delete post
router.delete('/:id', isLoggedIn, async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.redirect('/posts/all');
});

//Get Route to see the post detail

router.get('/postDetail/:id', isLoggedIn, async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate('user')
    .populate('comments');
  res.render('post/postDetail', { post });
});

module.exports = router;
