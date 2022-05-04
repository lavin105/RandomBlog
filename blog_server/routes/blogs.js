const express = require('express');
const router = express.Router();

const Blog = require('../models/blog');

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:title', async (req, res) => {
  const title = req.params.title;
  try {
    const blogs = await Blog.find({
      title: { $regex: new RegExp(title, 'i') },
    });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    date: new Date().toLocaleDateString(),
    content: req.body.content,
  });
  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const blogToDelete = await Blog.findById(id);
    const removed = await blogToDelete.remove();
    res.json(removed);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

module.exports = router;
