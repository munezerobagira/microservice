import { CustomException } from './custom-exception';

export class ConflictException extends CustomException {
  statusCode = 409;
  constructor(private msg: string) {
    super('Conflict exception: ' + msg);
  }
  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: this.msg }];
  }
}
