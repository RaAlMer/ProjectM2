const { Router } = require('express');
const router = new Router();
const Post = require('../models/post.model');

router.get('/', async (req, res) => {
  const posts = await Post.find();
  const coordinates = posts.map((post) => {
    return [post.latitude, post.longitude];
  });
  res.render('map', { coordinates });
});
module.exports = router;
