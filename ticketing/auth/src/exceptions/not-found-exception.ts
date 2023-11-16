import { CustomException } from './custom-exception';

export class NotFoundException extends CustomException {
  statusCode = 404;
  constructor(message: string = 'Not found') {
    super(message);
  }
  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: 'Not found' }];
  }
}
