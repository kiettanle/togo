import { Module } from '@nestjs/common';

import { TodoTaskService } from './todo-task.service';
import { TodoTaskController } from './todo-task.controller';

@Module({
  controllers: [TodoTaskController],
  providers: [TodoTaskService],
})
export class TodoTaskModule {}
