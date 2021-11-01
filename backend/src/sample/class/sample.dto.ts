import { ApiProperty, OmitType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { MAX_LENGTH } from 'src/database/entities/testUser.entity';

export class SampleUpdateDto {
  @ApiProperty({ title: 'id', example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ title: 'email', example: 'test@gmaillll.com' })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(MAX_LENGTH.EMAIL)
  email: string;

  @ApiProperty({
    title: '姓',
    maxLength: MAX_LENGTH.FIRST_NAME,
    example: 'ネスト',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(MAX_LENGTH.FIRST_NAME)
  firstName: string;

  @ApiProperty({
    title: '名',
    maxLength: MAX_LENGTH.LAST_NAME,
    example: '太郎',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(MAX_LENGTH.FIRST_NAME)
  lastName: string;

  @ApiProperty({ title: 'password', minLength: 8, example: '12345678' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class SampleRegistDto extends OmitType(SampleUpdateDto, ['id']) {}
