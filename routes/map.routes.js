const { Router } = require('express');
const router = new Router();
const Map = require('../models/map.model');
const Post = require('../models/post.model');


router.get("/", async (req,res)=>{
    const posts = await Post.find()
    const coordinates = []
    posts.forEach(async (post)=>{
       const coo = await Map.create({
            xy: [post.latitude, post.longitude],
          })
          console.log(coo)
          coordinates.push(coo)
    })
    console.log(coordinates)
        res.render("map",{coordinates})

})







/* router.get('/', async (req, res) => {
    const coordinates = await Map.find()
    res.render('map', { coordinates })
  })
  
  router.post('/', async (req, res) => {
      console.log(Object.keys(req.body))
    const coordinates = JSON.parse(Object.keys(req.body)[0])
    console.log(coordinates)
    await Map.create({
      xy: [coordinates.lat, coordinates.lng],
    })
  }) */

  module.exports = router;