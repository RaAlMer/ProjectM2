const { Schema, model } = require('mongoose');
 
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      min: 6,
    },
    username: {
      type: String,
      unique: true,
      trim: true
    },
    score: {
        type: Number,
        min: 0,
    },
    img: {
        type: String,
        default: '../public/images/pngaaa.com-1721400.png',
    },
    country: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Prefer not to tell'],
    }
  },
  {
    timestamps: true
  }
);
 
module.exports = model('User', userSchema);