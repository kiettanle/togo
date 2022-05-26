import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/users/user.module';
import { TodoTaskModule } from './modules/todo-tasks/todo-task.module';

@Module({
  imports: [UserModule, TodoTaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
