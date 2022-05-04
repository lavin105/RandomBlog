const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: String, required: true },
  content: { type: String, required: true },
});

module.exports = mongoose.model('Blog', blogSchema, 'blogs');
