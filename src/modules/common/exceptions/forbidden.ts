import { ForbiddenException } from '@nestjs/common';

export class ForbiddenResourceException extends ForbiddenException {
  constructor(message: string = 'forbidden resource', description: string = 'forbidden') {
    super(message, description);
  }
}
export class RedPlatesNotBelongToResponseException extends ForbiddenException {
  constructor(messages: string[] = [], description: string = 'red_plates_not_belong_to_response') {
    const messageTemp = `${messages.join(', ')} are not belong to this response`;

    super(messageTemp, description);
  }
}
