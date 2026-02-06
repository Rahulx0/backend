//mongoose
const e = require('express');
const mongoose = require('mongoose');

//schema

//const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    textComment: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,

  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
}},

  {
    timestamps: true
  },
);
const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;

