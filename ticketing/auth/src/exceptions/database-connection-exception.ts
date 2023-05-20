import { CustomException } from './custom-exception';

export class DatabaseConnectionException extends CustomException {
  statusCode = 500;
  constructor() {
    super('Database connection error');
  }
  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: 'Error while connecting to the database' }];
  }
}
