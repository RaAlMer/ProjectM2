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
  res.render('user/logInSignUp');
});

/* // GET route to display the signup form
router.get('/signup', (req, res, next) => res.render('user/signup')); */

// POST route to create account
router.post('/signup', async (req, res, next) => {
  const { username, email, password, repeatPassword } = req.body;
  if (password === repeatPassword) {
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      await user.save();
      res.redirect('/');
    } catch (error) {
      res.redirect('/signup');
    }
  } else {
    res.redirect('/signup');
  }
});

/* // GET route to log in page

router.get('/login', (req, res) => {
  res.render('user/login');
}); */

// Post route to log in page

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const isPwCorrect = await bcrypt.compare(req.body.password, user.password);
    if (isPwCorrect) {
      req.session.currentUser = user;
      res.redirect(`/profile/${user.id}`);
    } else {
      res.redirect('/login');
    }
  } catch (error) {
    res.redirect('/login');
  }
});

// Get route to Profile page

router.get('/profile/:id', isLoggedIn, async (req, res) => {
  const user = await User.findById(req.params.id);
  res.render('user/myprofile', { user });
});

// Get route to editProfile

router.get('/editProfile/:id', isLoggedIn, async (req, res) => {
  const user = await User.findById(req.params.id);
  res.render('user/editProfile', { user, errorMessage: '' });
});

// Put route to editProfile page

router.put(
  '/editProfile/:id',
  isLoggedIn,
  imgUploader.single('profileImage'),
  async (req, res) => {
    req.user = await User.findById(req.params.id);
    req.user.username = req.body.username;
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

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
