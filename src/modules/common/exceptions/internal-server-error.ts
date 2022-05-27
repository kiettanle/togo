import { InternalServerErrorException } from '@nestjs/common';

export class SaveDataException extends InternalServerErrorException {
  constructor() {
    super('Failed to save data for some reasons.', 'save_data_failed');
  }
}

export class QueryFailedException extends InternalServerErrorException {
  constructor() {
    super('Executed query was failed.', 'query_failed');
  }
}

export class CannotUnlinkSocialProviderException extends InternalServerErrorException {
  constructor(errorMsg: string = 'Unable to disconnect social account.') {
    super(errorMsg, 'cannot_unlink_provider');
  }
}

export class ConnectToThirdPartyException extends InternalServerErrorException {
  constructor(errorMsg: string = 'Cannot connect to third party.') {
    super(errorMsg, 'connect_to_third_party_failed');
  }
}

export class ConnectionException extends InternalServerErrorException {
  constructor(errorMsg: string = 'Cannot connect to database.') {
    super(errorMsg, 'connect_to_database_failed');
  }
}
