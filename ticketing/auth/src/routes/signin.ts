import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import { Password } from '../utils/password';
import validateRequest from '../middleware/validate-request';
import jwt from 'jsonwebtoken';
const router = express.Router();
router.post(
  '/api/users/signin',
  [body('email').isEmail().withMessage('Email must be valid'), body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 and 20 characters')],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
    });
    if (!user || !(await Password.compare(user?.password, password))) return res.status(400).json({ message: 'Invalid email or pasword' });
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_KEY!);
    req.session = {
      jwt: token,
    };
    res.send(user);
  }
);
export { router as signinRouter };
