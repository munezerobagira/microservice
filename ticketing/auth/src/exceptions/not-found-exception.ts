import { CustomException } from './custom-exception';

export class NotFoundException extends CustomException {
  statusCode = 404;
  constructor() {
    super('Route not found');
  }
  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: 'Not found' }];
  }
}
