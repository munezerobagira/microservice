import { NextFunction, Request, Response } from 'express';
import { CustomException } from '../exceptions/custom-exception';
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomException) {
    console.log(err);

    return res.status(err.statusCode).json({ errors: err.serializeErrors() });
  }
  return res.status(500).send({
    message: [{ message: 'Something went wrong' }],
  });
};
