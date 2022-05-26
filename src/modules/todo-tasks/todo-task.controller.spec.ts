import { Test, TestingModule } from '@nestjs/testing';
import { TodoTaskController } from './todo-task.controller';
import { TodoTaskService } from './todo-task.service';

describe('TodoTaskController', () => {
  let controller: TodoTaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoTaskController],
      providers: [TodoTaskService],
    }).compile();

    controller = module.get<TodoTaskController>(TodoTaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
