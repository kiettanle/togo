import { UnauthorizedException, ForbiddenException } from '@nestjs/common';

export class TokenExpiredException extends UnauthorizedException {
  constructor() {
    super('The access token is expired', 'token_expired');
  }
}

export class InvalidTokenException extends UnauthorizedException {
  constructor() {
    super('The access token is invalid', 'invalid_token');
  }
}

export class InvalidRefreshTokenException extends UnauthorizedException {
  constructor() {
    super('The refresh token is invalid', 'invalid_refresh_token');
  }
}

export class AuthenticationFailedException extends UnauthorizedException {
  constructor() {
    super('Authentication got failed', 'authentication_failed');
  }
}

export class LoginFailedException extends UnauthorizedException {
  constructor() {
    super('password or username are incorrect', 'login_failed');
  }
}

export class PasswordRecoveryTokenExpiredException extends UnauthorizedException {
  constructor(message?: string) {
    super([message || 'theTokenIsExpiredOrInvalid'], 'theTokenIsExpiredOrInvalid');
  }
}
export class AuthorizedOwnerFailedException extends ForbiddenException {
  constructor(itemName) {
    super(`This user is not the owner of this ${itemName}`, 'unauthorized_exception');
  }
}

export class FilePermissionException extends ForbiddenException {
  constructor() {
    super(`You are not allowed to access this file`, 'forbidden_exception');
  }
}

export class MobileVerificationException extends UnauthorizedException {
  constructor() {
    super('The mobile verification code is invalid', 'mobile_verification_code_invalid');
  }
}
