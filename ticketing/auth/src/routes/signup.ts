import express, { Request, Response } from 'express';
import { body, FieldValidationError, validationResult } from 'express-validator';
import { DatabaseConnectionException } from '../exceptions/database-connection-exception';
import { RequestValidationException } from '../exceptions/request-validaton-exception';
const router = express.Router();
router.post(
  '/api/users/signup',
  [body('email').isEmail().withMessage('Email must be valid'), body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 and 20 characters')],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationException(errors.array() as FieldValidationError[]);
    }
    const { email, password } = req.body;
    throw new DatabaseConnectionException();
    res.send({
      email,
      password,
    });
    //Logic to handle the new user
  }
);
export { router as signupRouter };
