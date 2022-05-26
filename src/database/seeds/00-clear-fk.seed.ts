import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { dropForeignKeys } from '@modules/common/utils/query';

export default class ClearForeignKeys implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await dropForeignKeys(connection);
  }
}
