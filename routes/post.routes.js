const { Router } = require('express');
const router = new Router();
const Post = require('../models/post.model');
const { isLoggedIn } = require('../middlewares/guard');
const imgUploader = require('../cloudinary.config');
const User = require('../models/user.model');

// GET route to create post
router.get('/create', isLoggedIn, (req, res) => {
  const post = new Post();
  res.render('post/createPost', { post });
});

// POST route to create post
router.post(
  '/create',
  isLoggedIn,
  imgUploader.array('image', 3),
  async (req, res) => {
    let preImage = [];
    req.post = new Post();
    req.post.title = req.body.title;
    req.files.forEach(img => {
      preImage.push(img.path);
    });
    req.post.image = preImage;
    req.post.description = req.body.description;
    req.post.city = req.body.city;
    req.post.country = req.body.country;
    req.post.level = req.body.level;
    req.post.longitude = req.body.longitude;
    req.post.latitude = req.body.latitude;
    req.post.user = req.session.currentUser._id;
    try {
      const user = await User.findById(req.session.currentUser._id)
      user.posts.push(req.post.id);
      user.score += 10
      await user.save()
      await req.post.save();
      res.redirect('/posts/all');
    } catch (error) {
      res.redirect('/posts/createPost');
    }
  }
);

// GET route to show all posts
router.get('/all', async (req, res) => {
  const posts = await Post.find({});
  res.render('post/viewAllPost', { posts });
});

// GET route to edit the post
router.get('/edit/:id', isLoggedIn, async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('post/editPost', { post });
});

// PUT route to edit the post
router.put('/edit/:id', isLoggedIn,imgUploader.single('image'), async (req, res) => {
  req.post = await Post.findById(req.params.id);
  req.post.title = req.body.title;
  req.post.status = req.body.status;
  if(req.file){
  req.post.image = req.file.path;
  }
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

// GET route for upVote
router.get('/upvote/:id', isLoggedIn, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post.upVote.includes(req.session.currentUser._id)) {
    post.upVote.push(req.session.currentUser._id);
    if (post.downVote.includes(req.session.currentUser._id)) {
      post.downVote.splice(
        post.downVote.indexOf(req.session.currentUser._id),
        1
      );
    }
  }
  const user = await User.findById(post.user) 
  user.score +=5
  user.save();
  post.save();
  res.redirect(req.get('referer'));
});

// GET route for downVote
router.get('/downvote/:id', isLoggedIn, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post.downVote.includes(req.session.currentUser._id)) {
    post.downVote.push(req.session.currentUser._id);
    if (post.upVote.includes(req.session.currentUser._id)) {
      post.upVote.splice(post.upVote.indexOf(req.session.currentUser._id), 1);
    }
  }
  const user = await User.findById(post.user) 
  user.score -=5
  user.save();
  post.save();
  res.redirect(req.get('referer'));
});

// DELETE route to delete post
router.delete('/:id', isLoggedIn, async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  const user = await User.findById(req.session.currentUser._id)
  user.score -= 10
  await user.save()
  res.redirect('/posts/all');
});

// GET route to see the post detail
router.get('/postDetail/:id', isLoggedIn, async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate('user')
    .populate('comments');
  res.render('post/postDetail', { post });
});

module.exports = router;
