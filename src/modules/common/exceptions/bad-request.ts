import { BadRequestException } from '@nestjs/common';

export class TokenInvalidOrExpiredBadRequestException extends BadRequestException {
  constructor(message: string = 'tokenIsInvalidOrExpired.', description: string = 'invalidToken') {
    super([message], description);
  }
}
