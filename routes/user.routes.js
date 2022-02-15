const { Router } = require('express');
const router = new Router();
const User = require('../models/user.model');
const { isLoggedIn } = require('../middlewares/guard');

const bcrypt = require('bcrypt');
const saltRounds = 12;

// GET route to display the signup form
router.get('/signup', (req, res, next) => res.render('user/signup'));

// POST route to create account
router.post('/signup', async (req, res, next) => {
    const { username, email, password, repeatPassword } = req.body;
    if (password === repeatPassword){
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
        } catch (error){
            console.log(error)
            res.redirect('/signup');
        }
    } else {
        res.redirect('/signup');
    };
});

module.exports = router;
