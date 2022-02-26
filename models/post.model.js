const { Schema, model, SchemaTypes } = require('mongoose');

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: [String],
      required: true,
    },
    description: { type: String, required: true },
    latitude: {
      type: Number,
      min: -90,
      max: 90,
    },
    longitude: {
      type: Number,
      min: -180,
      max: 180,
    },

    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      enum: ['Low', 'Moderate', 'High', 'Extreme'],
    },
    contact: {
      type: [SchemaTypes.ObjectId],
      ref: 'LocalAuthorities',
    },
    user: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
    },
    upVote: {
      type: [SchemaTypes.ObjectId],
      ref: 'User',
      default: [],
    },
    downVote: {
      type: [SchemaTypes.ObjectId],
      ref: 'User',
      default: [],
    },
    comments: {
      type: [SchemaTypes.ObjectId],
      ref: 'Comment',
      default: [],
    },
    status: {
      type: String,
      enum: ['Open', 'In process', 'Closed'],
      default: 'Open',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Post', postSchema);
