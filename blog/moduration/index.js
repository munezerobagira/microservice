const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(express.json());
app.use(cors());

app.post('/events', async (req, res) => {
  const { data, type } = req.body;
  console.log(type);
  switch (type) {
    case 'CommentCreated':
      let status = data.content.includes('orange') ? 'rejected' : 'approved';
      await axios.post('http://localhost:4005/events', {
        type: 'CommentModurated',
        data: {
          content: data.content,
          postId: data.postId,
          id: data.id,
          status,
        },
      });
      break;
    default:
  }
  res.send({
    status: 'OK',
  });
});
app.listen(4003, () => {
  console.log('Server started running on port 4003');
});
