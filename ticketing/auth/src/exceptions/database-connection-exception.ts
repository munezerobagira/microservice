import { CustomException } from './custom-exception';

export class DatabaseConnectionException extends CustomException {
  statusCode = 500;
  constructor(message: string = 'Error while connecting to the database') {
    super(message);
  }
  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: 'Error while connecting to the database' }];
  }
}
