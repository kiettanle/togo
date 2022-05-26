import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1653551882812 implements MigrationInterface {
  name = 'Initial1653551882812';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tasks" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_8d12ff38fcc62aaba2cab748772" DEFAULT NEWSEQUENTIALID(), "created_by" int, "updated_by" int, "created_at" datetime2 NOT NULL CONSTRAINT "DF_cb3724030e9674f2c17b7573aa5" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_02edb0ba1ef4287a15bc4c271ee" DEFAULT getdate(), "deleted_at" datetime2, "task" nvarchar(255) NOT NULL, "description" nvarchar(255) NOT NULL, "createdBy" int NOT NULL, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_9fc727aef9e222ebd09dc8dac0" ON "tasks" ("created_by") `);
    await queryRunner.query(`CREATE INDEX "IDX_5d927ef9f86fac1f1671d093a0" ON "tasks" ("updated_by") `);
    await queryRunner.query(`CREATE INDEX "IDX_cb3724030e9674f2c17b7573aa" ON "tasks" ("created_at") `);
    await queryRunner.query(`CREATE INDEX "IDX_02edb0ba1ef4287a15bc4c271e" ON "tasks" ("updated_at") `);
    await queryRunner.query(`CREATE INDEX "IDX_68d6a27df9f5cc119cac1df190" ON "tasks" ("deleted_at") `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_68d6a27df9f5cc119cac1df190" ON "tasks"`);
    await queryRunner.query(`DROP INDEX "IDX_02edb0ba1ef4287a15bc4c271e" ON "tasks"`);
    await queryRunner.query(`DROP INDEX "IDX_cb3724030e9674f2c17b7573aa" ON "tasks"`);
    await queryRunner.query(`DROP INDEX "IDX_5d927ef9f86fac1f1671d093a0" ON "tasks"`);
    await queryRunner.query(`DROP INDEX "IDX_9fc727aef9e222ebd09dc8dac0" ON "tasks"`);
    await queryRunner.query(`DROP TABLE "tasks"`);
  }
}
