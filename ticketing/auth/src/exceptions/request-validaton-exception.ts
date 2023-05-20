import { FieldValidationError, ValidationError } from 'express-validator';
import { CustomException } from './custom-exception';
export class RequestValidationException extends CustomException {
  statusCode = 400;
  constructor(private errors: FieldValidationError[]) {
    super('Validation error');
  }
  serializeErrors(): { message: string; field?: string | undefined }[] {
    return this.errors.map((error) => ({
      message: error.msg,
      field: error?.path || '',
    }));
  }
}
