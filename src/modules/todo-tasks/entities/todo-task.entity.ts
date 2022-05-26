import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';

import { CustomBaseEntity } from '@modules/common/entities/base.entity';

@Entity('tasks')
export class TodoTask extends CustomBaseEntity {
  static entityName: string = 'TodoTask';

  @ApiProperty({ type: 'string', example: 'Fix urgent bug' })
  @Column({ type: 'nvarchar', length: 100 })
  task: string;

  @ApiProperty({ type: 'string', example: 'User cannot log in the system' })
  @Column({ nullable: true, type: 'nvarchar', length: 500 })
  description: string;

  @Column()
  createdBy: number;
}
