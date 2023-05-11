const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const commentsByPostId = {};
app.get('/posts/:id/comments', (req, res) => {
  const postId = req.params.id;
  res.send(commentsByPostId[postId] || []);
});
app.post('/posts/:id/comments', (req, res) => {
  const { content } = req.body;
  const postId = req.params.id;
  const id = randomBytes(4).toString('hex');
  commentsByPostId[postId] = commentsByPostId[postId] || [];
  commentsByPostId[postId].push({ id, content });
  res.status(201).json({
    message: 'Comment created successfullly.',
    comment: { id, comments: commentsByPostId[postId] },
  });
});
app.listen(4001, () => {
  console.log(`Server started on the port 4001`);
});
