const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const commentsByPostId = {};
app.get('/posts/:id/comments', (req, res) => {
  const postId = req.params.id;
  res.send(commentsByPostId[postId] || []);
});
app.post('/posts/:id/comments', async (req, res) => {
  const { content } = req.body;
  const postId = req.params.id;
  const id = randomBytes(4).toString('hex');
  commentsByPostId[postId] = commentsByPostId[postId] || [];
  commentsByPostId[postId].push({ id, content, status: 'pending' });
  await axios.post('http://event-bus-service:4005/events', {
    type: 'CommentCreated',
    data: {
      id,
      content,
      postId,
      status: 'pending',
    },
  });
  res.status(201).json({
    message: 'Comment created successfullly.',
    comment: { id, comments: commentsByPostId[postId] },
  });
});
app.post('/events', async (req, res) => {
  const { data, type } = req.body;
  console.log(type);
  switch (type) {
    case 'CommentModurated':
      let { id, postId, status, content } = data;
      const comment = commentsByPostId[postId].find((comment) => comment.id == id);
      comment.status = status;
      await axios.post('http://event-bus-servicet:4005/events', {
        type: 'CommentUpdated',
        data: {
          id,
          status,
          content,
          postId,
        },
      });
  }
  console.log('Received event', req.body.type);
  res.send({
    status: 'OK',
  });
});
app.listen(4001, () => {
  console.log(`Server started on the port 4001`);
});
