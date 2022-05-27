import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { User } from '@modules/users/entities/user.entity';
import { UserService } from '@modules/users/user.service';
import { TodoTaskController } from './todo-task.controller';
import { TodoTaskService } from './todo-task.service';

describe('TodoTaskController', () => {
  let controller: TodoTaskController;

  const mockTodoTaskService = {};

  const mockUserService = {};

  const mockUserRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoTaskController],
      providers: [
        TodoTaskService,
        UserService,
        // {
        //   provide: getRepositoryToken(User),
        //   useValue: mockUserRepository,
        // },
        {
          provide: Connection,
          useValue: {},
        },
      ],
    })
      .overrideProvider(TodoTaskService)
      .useValue(mockTodoTaskService)
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<TodoTaskController>(TodoTaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
