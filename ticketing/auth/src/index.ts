import express from 'express';
const app = express();
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
app.use(express.json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);
app.get('/api/users/currentuser', (req, res) => {
  res.send('Hi there');
});
app.listen(3000, () => {
  console.log('Server started on the port 3000!');
});
