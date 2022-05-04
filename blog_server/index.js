const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/blogDB', { useNewURLParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => {
  console.log('Connected to Database');
  app.listen(8080, () => console.log('Blog Server Started on port 8080'));
});

app.get('/', (req, res) => {
  res.send('Blog Server: visit /blogs to see blogs');
});

const blogsRouter = require('./routes/blogs');
app.use('/blogs', blogsRouter);
