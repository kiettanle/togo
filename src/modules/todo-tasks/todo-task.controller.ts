import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TodoTaskService } from './todo-task.service';
import { CreateTodoTaskDto } from './dto/create-todo-task.dto';
import { UpdateTodoTaskDto } from './dto/update-todo-task.dto';

@ApiTags('Tasks')
@Controller('tasks')
export class TodoTaskController {
  constructor(private readonly todoTaskService: TodoTaskService) {}

  @Post()
  create(@Body() createTodoTaskDto: CreateTodoTaskDto) {
    return this.todoTaskService.create(createTodoTaskDto);
  }

  @Get()
  findAll() {
    return this.todoTaskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoTaskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoTaskDto: UpdateTodoTaskDto) {
    return this.todoTaskService.update(+id, updateTodoTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoTaskService.remove(+id);
  }
}
