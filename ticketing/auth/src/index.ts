import express from 'express';
import mongoose from 'mongoose';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { NotFoundException } from './exceptions/not-found-exception';
import { errorHandler } from './middleware/error-handler';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.all('*', (req, res) => {
  throw new NotFoundException();
});
app.use(errorHandler);
const start = async () => {
  try {
    if (!process.env.JWT_KEY) throw new Error('You need to set JWT_KEY environment variable');
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    app.listen(3000, () => {
      console.log('Server started on the port 3000!');
    });
  } catch (error) {
    console.log('Error occurred while connecting to the database', error);
  }
};
start();
