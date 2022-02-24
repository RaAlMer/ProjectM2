const { Schema, model, SchemaTypes } = require('mongoose');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      min: 6,
    },
    username: {
      type: String,
      unique: true,
      trim: true,
    },
    score: {
      type: Number,
      default: 0,
    },
    img: {
      type: String,
      default:
        'https://upload.wikimedia.org/wikipedia/commons/7/70/User_icon_BLACK-01.png',
    },
    country: {
      type: String,
      default: 'Narnia',
    },
    gender: {
      type: String,
      default: 'Not specified',
      enum: ['Male', 'Female', 'Prefer not to tell', 'Not specified'],
    },
    comments: {
      type: [SchemaTypes.ObjectId],
      ref: 'Comment',
      default: [],
    },
    posts: {
      type: [SchemaTypes.ObjectId],
      ref: 'Post',
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('User', userSchema);
