const User = require('../models/user.model');
const Token = require('../models/token.model');
const sendEmail = require('../middlewares/sendEmail');
const crypto = require('crypto');
const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const saltRounds = 12;

router.get('/', async (req, res) => {
  res.render('user/resetPassword');
});

router.post('/', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).send("User with given email doesn't exist");

    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString('hex'),
      }).save();
    }

    const link =
      'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
      'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
      `http://${req.headers.host}/password-reset/${user._id}/${token.token}\n\n` +
      'If you did not request this, please ignore this email and your password will remain unchanged.\n';

    await sendEmail(user.email, 'Password reset', link);
    res.render('user/passSent');
  } catch (error) {
    res.send('An error occured, email could not be sent.');
  }
});

router.get('/:id/:token', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    res.render('user/resetPasswordLog', { user, token });
  } catch (error) {
    console.log(error);
  }
});

router.post('/:id/:token', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(400).send('invalid link or expired');

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send('Invalid link or expired');

    const password = req.body.password;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    await user.save();
    await token.delete();
    res.render('user/logInSignUp');
  } catch (error) {
    res.send('An error occured');
    console.log(error);
  }
});

module.exports = router;
