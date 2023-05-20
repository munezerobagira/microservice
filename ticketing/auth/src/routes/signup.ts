import express, { Request, Response } from 'express';
import { body, FieldValidationError, validationResult } from 'express-validator';
import { ConflictException } from '../exceptions/conflict-exception';
import { DatabaseConnectionException } from '../exceptions/database-connection-exception';
import { RequestValidationException } from '../exceptions/request-validaton-exception';
import { User } from '../models/user';
const router = express.Router();
router.post(
  '/api/users/signup',
  [body('email').isEmail().withMessage('Email must be valid'), body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 and 20 characters')],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationException(errors.array() as FieldValidationError[]);
    }
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) throw new ConflictException('User with email already exists');
    const user = User.build({ email, password });
    await user.save();
    res.send(user);
  }
);
export { router as signupRouter };
