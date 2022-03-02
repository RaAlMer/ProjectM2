const { Schema, model, SchemaTypes } = require('mongoose');

const commentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: [String],
    },
    description: { type: String, required: true },
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
  },
  {
    timestamps: true,
  }
);

module.exports = model('Comment', commentSchema);
