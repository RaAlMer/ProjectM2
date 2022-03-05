const { Router } = require('express');
const router = new Router();
const User = require('../models/user.model');
const { isLoggedIn } = require('../middlewares/guard');

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const saltRounds = 12;

const imgUploader = require('../cloudinary.config');

// GET Sign-up/Log-in route
router.get('/sign-log', (req, res) => {
  //checks if someone is logged in
  if (req.session.currentUser) {
    res.redirect('/');
  } else {
    res.render('user/logInSignUp', { message: '', errorMessage: '' });
  }
});

// POST route to create account
router.post('/signup', async (req, res, next) => {
  //checks if someone is logged in
  if (req.session.currentUser) {
    res.redirect('/');
  } else {
    const { username, email, password, repeatPassword } = req.body;
    //check if both password are equal
    if (password === repeatPassword) {
      try {
        //creating a hash password
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        //creates an user
        const user = await User.create({
          username,
          email,
          password: hashedPassword,
        });
        await user.save();
        res.redirect('/');
      } catch (error) {
        if (error.code === 11000) {
          res.render('user/logInSignUp', {
            errorMessage: 'The email already exists',
          });
        }
      }
    } else {
      res.redirect('/signup');
    }
  }
});

// POST route to log into your account
router.post('/login', async (req, res) => {
  //checks if someone is logged in
  if (req.session.currentUser) {
    res.redirect('/');
  } else {
    try {
      //search for the user credentials
      const user = await User.findOne({ email: req.body.email });
      const isPwCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );
      // if they are correct you log in
      if (isPwCorrect) {
        req.session.currentUser = user;
        res.redirect(`/profile/${user.id}`);
      } else {
        res.redirect('/sign-log');
      }
    } catch (error) {
      res.redirect('/sign-log');
    }
  }
});

// GET route to Profile page
router.get('/profile/:id', isLoggedIn, async (req, res) => {
  //go to the User profile
  const user = await User.findById(req.params.id);
  res.render('user/myprofile', { user });
});

// GET route to edit your profile
router.get('/editProfile/:id', isLoggedIn, async (req, res) => {
  const user = await User.findById(req.params.id);
  //check if the user in the session is the same as the User profile
  if (req.session.currentUser._id === user.id.toString()) {
    res.render('user/editProfile', { user, errorMessage: '' });
  } else {
    res.redirect(`/profile/${req.params.id}`);
  }
});

// PUT route to edit your profile
router.put(
  '/editProfile/:id',
  isLoggedIn,
  imgUploader.single('profileImage'),
  async (req, res) => {
    req.user = await User.findById(req.params.id);
    req.user.username = req.body.username;
    //checks if an image has been uploaded
    if (!req.file) {
      req.user.img = req.user.img;
    } else {
      req.user.img = req.file.path;
    }
    req.user.country = req.body.country;
    req.user.gender = req.body.gender;
    try {
      await req.user.save();
      res.redirect(`/profile/${req.user.id}`);
    } catch (error) {
      if (error.code === 11000) {
        res.render('user/editProfile', {
          user: req.user,
          errorMessage: 'The username already exists',
        });
      }
    }
  }
);

//GET route for logout
router.get('/logout', (req, res) => {
  //destroy the session
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
