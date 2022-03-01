const { Router } = require('express');
const router = new Router();
const Post = require('../models/post.model');

router.get('/', async (req, res) => {
  const posts = await Post.find();
  const postCoordinates = '';
  const coordinates = posts.map((post) => {
    return [post.latitude, post.longitude];
  });
  res.render('map', { coordinates, postCoordinates });
});

router.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);

  const postCoordinates = [post.latitude, post.longitude];
  const posts = await Post.find();
  const coordinates = posts.map((post) => {
    return [post.latitude, post.longitude];
  });
  res.render('map', { coordinates, postCoordinates });
});

module.exports = router;
