const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());
const events = [];
app.post('/events', async (req, res) => {
  const event = req.body;
  events.push(event);
  axios.post('http://localhost:4000/events', event).catch((error) => {});
  axios.post('http://localhost:4001/events', event).catch((error) => {});
  axios.post('http://localhost:4002/events', event).catch((error) => {});
  axios.post('http://localhost:4003/events', event).catch((error) => {});
  res.send({
    sttus: 'OK',
  });
});
app.get('/events', async (req, res) => {
  res.send(events);
});
app.use((error, req, res, next) => {
  res.status(5000).json('error cccured');
});
app.listen(4005, () => {
  console.log('Server started on the port 4005');
});
