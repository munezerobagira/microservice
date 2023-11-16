export abstract class CustomException extends Error {
  abstract statusCode: number;
  constructor(message: string) {
    console.log(message);
    super(message);
    // Object.setPrototypeOf(this, CustomException.prototype);
  }
  abstract serializeErrors(): { message: string; field?: string }[];
}
