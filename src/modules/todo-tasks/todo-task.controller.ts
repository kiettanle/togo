import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseGuards,
  UseInterceptors,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { TodoTaskService } from './todo-task.service';
import { CreateTodoTaskDto } from './dto/create-todo-task.dto';
import { UpdateTodoTaskDto } from './dto/update-todo-task.dto';
import { RolesGuard } from '@modules/common/guards/role.guards';
import { AuthGuard } from '@nestjs/passport';
import { UseRoles } from '@modules/common/decorators/role.decorator';
import { PermissionAction } from '@modules/permissions/permission.action.enum';
import { PermissionResource } from '@modules/permissions/permission.resource.enum';
import { Payload } from '@modules/auth/decorators';
import { JWTPayload } from '@modules/auth/dto';
import { Connection, FindManyOptions } from 'typeorm';
import { UserService } from '@modules/users/user.service';
import { AssignTaskDto as PickTaskDto } from './dto/assign-task.dto';
import { MessageResult } from '@modules/common/dto/message-result.model';

@ApiTags('Tasks')
@Controller('tasks')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
export class TodoTaskController {
  constructor(
    private connection: Connection,
    private readonly todoTaskService: TodoTaskService,
    private readonly userService: UserService,
  ) {}

  @Post('/pick')
  @HttpCode(HttpStatus.OK)
  @UseRoles({
    resource: PermissionResource.Tasks,
    action: PermissionAction.Pick,
  })
  async pick(@Body() body: PickTaskDto, @Payload() payload: JWTPayload): Promise<MessageResult> {
    try {
      return this.connection.transaction(async (manager) => {
        const user = await this.userService.findById(payload.userId, manager);

        if (await user.canPickMoreTask()) {
          throw new Error(
            `You reached a maximum limit of ${user.numberOfTaskToday} tasks per user that can be added per day.`,
          );
        }

        const task = await this.todoTaskService.findOne(body.taskId, manager);

        if (!task) {
          throw new Error('Task is not found');
        }

        if (task && task.assigneeId === user.id) throw new Error('This task is assigned to you already');

        if (task && task.assigneeId !== null) throw new Error('Task is handled by the other user');

        task.assigneeId = user.id;

        await task.save();

        return { message: 'Pick task success' };
      });
    } catch (error) {
      throw error;
    }
  }

  @Post()
  create(@Body() createTodoTaskDto: CreateTodoTaskDto) {
    return this.todoTaskService.create(createTodoTaskDto);
  }

  @Get()
  @UseRoles({
    resource: PermissionResource.Tasks,
    action: PermissionAction.List,
  })
  async findAll() {
    return this.todoTaskService.findAll();
  }

  @Get('/my-tasks')
  @UseRoles({
    resource: PermissionResource.Tasks,
    action: PermissionAction.List,
  })
  async findMyTasks(@Payload() payload: JWTPayload) {
    return this.connection.transaction(async (manager) => {
      const user = await this.userService.findById(payload.userId, manager);

      const filter: FindManyOptions = {
        where: { assigneeId: user.id },
      };

      return this.todoTaskService.findAll(filter);
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.todoTaskService.findOne(id);
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
