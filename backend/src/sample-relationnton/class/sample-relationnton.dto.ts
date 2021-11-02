import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class SampleRelationNtoNUpdateDto {
  @ApiProperty({ title: 'id', example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ title: 'hobbies', example: [1, 2] })
  @IsNumber({}, { each: true })
  hobbyIds: number[];
}
