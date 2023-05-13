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
const processEvent = (type, data) => {
  switch (type) {
    case 'PostCreated':
      posts[data.id] = {
        id: data.id,
        title: data.title,
        comments: [],
      };
      break;
    case 'CommentCreated':
      posts[data.postId].comments = posts[data.postId].comments || [];
      posts[data.postId].comments.push({
        content: data.content,
        status: data.status,
        id: data.id,
      });
      break;
    case 'CommentUpdated':
      const comment = posts[data.postId].comments.find((comment) => comment.id == data.id);
      comment.status = data.status;
      comment.content = data.content;
      break;
    default:
  }
};
app.post('/events', (req, res) => {
  console.log('Received event', req.body.type);
  const { type, data } = req.body;
  processEvent(type, data);
  res.send({
    status: 'OK',
  });
});
app.listen(4002, async () => {
  console.log('Server started running on port 4002');
  const res = await axios.get('http://event-bus-service:4005/events');
  for (evnt of res.data) {
    processEvent(evnt.type, evnt.data);
  }
});
