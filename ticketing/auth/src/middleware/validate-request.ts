import {NextFunction, Request, Response} from 'express';
import {FieldValidationError, validationResult} from 'express-validator';
import {RequestValidationException} from '../exceptions/request-validaton-exception';

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationException(
      errors.array() as FieldValidationError[],
    );
  }
  next();
};
export default validateRequest;
