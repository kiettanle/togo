/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';

import { CreateTodoTaskDto } from './dto/create-todo-task.dto';
import { UpdateTodoTaskDto } from './dto/update-todo-task.dto';

@Injectable()
export class TodoTaskService {
  create(createTodoTaskDto: CreateTodoTaskDto) {
    return 'This action adds a new todoTask';
  }

  findAll() {
    return `This action returns all TodoTask`;
  }

  findOne(id: number) {
    return `This action returns a #${id} todoTask`;
  }

  update(id: number, updateTodoTaskDto: UpdateTodoTaskDto) {
    return `This action updates a #${id} todoTask`;
  }

  remove(id: number) {
    return `This action removes a #${id} todoTask`;
  }
}
