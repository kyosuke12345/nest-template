import { ApiProperty, OmitType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Gender } from 'src/database/entities/testProfile.entity';
import { MAX_LENGTH } from 'src/database/entities/testUser.entity';

export class SampleRelation1to1UpdateDto {
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

  @ApiProperty({ title: 'gender', example: '0' })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;
}

export class SampleRelation1to1RegisterDto extends OmitType(
  SampleRelation1to1UpdateDto,
  ['id'],
) {}
