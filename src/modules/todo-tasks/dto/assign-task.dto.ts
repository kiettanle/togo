import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class AssignTaskDto {
  @ApiProperty({ example: '20B7B4A6-491C-4103-8176-5BDE29A527D9' })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({ example: '6780433E-F36B-1410-86BA-002BD86783D2' })
  @IsNotEmpty()
  @IsUUID()
  taskId: string;
}
