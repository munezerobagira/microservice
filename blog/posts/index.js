const { randomBytes } = require('crypto');
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(express.json());
app.use(cors());
const posts = {};
app.get('/posts', (req, res) => {
  res.send(posts);
});
app.post('/posts', async (req, res) => {
  const { title } = req.body;
  const id = randomBytes(4).toString('hex');

  posts[id] = { title, id };
  await axios.post('http://event-bus-service:4005/events', {
    type: 'PostCreated',
    data: {
      id,
      title,
    },
  });
  res.status(201).json({
    message: 'Post created successfullly',
    post: posts[id],
  });
});
app.post('/events', (req, res) => {
  console.log('Received event', req.body.type);
  res.send({
    status: 'OK',
  });
});
app.listen(4000, () => {
  console.log('v0.0.4');
  console.log('Server started running on port 4000');
});
