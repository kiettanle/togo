import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  constructor(message: string = 'theUserIsNotFound') {
    super([message], 'userNotFound');
  }
}

export class BusinessUnitNotFoundException extends NotFoundException {
  constructor() {
    super('The business unit is not found', 'business_unit_not_found');
  }
}

export class InvoiceNotFoundException extends NotFoundException {
  constructor() {
    super('Invoice is not found', 'invoice_not_found');
  }
}

export class DataNotFoundException extends NotFoundException {
  constructor(message: string = 'theRequestedDataIsNotFound') {
    super([message], 'dataNotFound');
  }
}

export class OrganizationTypeNotFoundException extends NotFoundException {
  constructor() {
    super('Organization type is not found', 'organization_type_not_found');
  }
}

export class CustomerNotFoundException extends NotFoundException {
  constructor(message: string = 'theCustomerIsNotFound') {
    super([message], 'customerNotFound');
  }
}

export class FileNotException extends NotFoundException {
  constructor() {
    super('', 'file_not_found');
  }
}
