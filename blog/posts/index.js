const { randomBytes } = require('crypto');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const posts = {};
app.get('/posts', (req, res) => {
  res.send(posts);
});
app.post('/posts', (req, res) => {
  const { title } = req.body;
  const id = randomBytes(4).toString('hex');

  posts[id] = { title, id };
  res.status(201).json({
    message: 'Post created successfullly',
    post: posts[id],
  });
});
app.listen(4000, () => {
  console.log('Server started running on port 4000');
});
