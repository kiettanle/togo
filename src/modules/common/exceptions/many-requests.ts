import { HttpException, HttpStatus } from '@nestjs/common';

export class TooManyLoginAttemptsException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.TOO_MANY_REQUESTS,
        error: 'too_many_login_attempts',
        message: 'Login attempts limit exceeded.',
      },
      HttpStatus.TOO_MANY_REQUESTS,
    );
  }
}
