const { Router } = require('express');
const router = new Router();
const Post = require('../models/post.model');
const { isLoggedIn } = require('../middlewares/guard');

// Route to create Post

router.get("/createPost",isLoggedIn, (req,res)=>{
    const post = new Post()
    res.render("post/createPost",{post})
})

router.post("/createPost",isLoggedIn, async (req,res)=>{
    req.post = new Post()
    req.post.title = req.body.title
    req.post.image = req.body.image
    req.post.description = req.body.description
    req.post.city = req.body.city
    req.post.country = req.body.country
    req.post.level = req.body.level
    req.post.longitude = req.body.longitude
    req.post.latitude = req.body.latitude
    req.post.user = req.session.currentUser._id
    try{
        await req.post.save()
        res.redirect('/');

    }catch(error){
console.log(error)
        res.redirect("/posts/createPost")

    }
})

module.exports = router;