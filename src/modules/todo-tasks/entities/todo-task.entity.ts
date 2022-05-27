import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { CustomBaseEntity } from '@modules/common/entities/base.entity';
import { User } from '@modules/users/entities/user.entity';
import { TaskStatusEnum } from '../enums/task-status.enum';

@Entity('tasks')
export class TodoTask extends CustomBaseEntity {
  static entityName: string = 'TodoTask';

  @ApiProperty({ type: 'string', example: '[BUG][Urgent] User cannot log in' })
  @Column({ type: 'nvarchar', length: 100 })
  task: string;

  @ApiProperty({ type: 'string', example: 'User cannot log in the system with username and password' })
  @Column({ nullable: true, type: 'nvarchar', length: 500 })
  description: string;

  @Column({ name: 'assigned_to' })
  assignedToUserId: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'assigned_to', referencedColumnName: 'id' })
  assignedTo: User;

  @ApiProperty({
    type: TaskStatusEnum,
    enum: TaskStatusEnum,
    enumName: 'TaskStatusEnum',
    example: TaskStatusEnum.Created,
  })
  @Column({ default: TaskStatusEnum.Created })
  status: TaskStatusEnum;

  constructor(partial: Partial<TodoTask>) {
    super();
    this.entityName = TodoTask.entityName;
    Object.assign(this, partial);
  }
}
