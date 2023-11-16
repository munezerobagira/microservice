import { CustomException } from './custom-exception';
export class NotAuthorizedException extends CustomException {
  statusCode: number = 401;
  constructor(message: string = 'Not authorized') {
    super(message);
  }
  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: 'Not authorized' }];
  }
}
