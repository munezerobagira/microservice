import { CustomException } from './custom-exception';

export class ConflictException extends CustomException {
  statusCode = 409;
  constructor(message: string) {
    super('Conflict exception: ' + message);
  }
  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }];
  }
}
