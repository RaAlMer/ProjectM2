const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const store = require('connect-mongo');
const dotenv = require('dotenv');
// environment variables
dotenv.config();

mongoose.connect(process.env.MONGODB_URL);

const app = express();

// template engine setup
app.set('view engine', 'ejs');
// ejs layout setup
app.use(expressLayouts);
// middleware to extract the body from the request
app.use(express.urlencoded({ extended: false }));
// middle ware for using more http verbs in the html
app.use(methodOverride('_method'));
// hooking up the public folder
app.use(express.static('public'));
// middleware for setting up the session
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 120000000,
    },
    store: store.create({
      mongoUrl: process.env.MONGODB_URL,
    }),
  })
);
// middle ware for making the user available to all templates
app.use((req, res, next) => {
  res.locals.currentUser = req.session.currentUser;
  next();
});

// root route
app.get('/', (req, res) => {
  res.render('home');
});

// User route
const userRouter = require('./routes/user.routes');
app.use('/', userRouter);

// Post route
const postRouter = require('./routes/post.routes');
app.use('/posts', postRouter);

// Comment route
const commentRouter = require('./routes/comment.routes');
app.use('/comment', commentRouter);

// Map route
const mapRouter = require('./routes/map.routes');
app.use('/map', mapRouter);

//Reset password route
const resetPassRouter = require('./routes/passwordReset.routes');
app.use('/password-reset', resetPassRouter);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

app.listen(process.env.PORT);
