import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { QueryParamsBaseDto } from './query-params-base.dto';

export class StandardQueryParamsDto extends PartialType(QueryParamsBaseDto) {}

export class QueryParamsDto extends PartialType(QueryParamsBaseDto) {
  @ApiProperty({
    required: false,
    isArray: true,
    items: {
      enum: [],
      type: 'string',
    },
  })
  @IsOptional()
  readonly status?: string;
  // TODO: declare more filter conditions here...
}
