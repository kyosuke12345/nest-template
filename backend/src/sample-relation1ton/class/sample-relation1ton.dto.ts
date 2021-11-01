import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { MAX_LENGTH } from 'src/database/entities/testUser.entity';
import { MAX_LENGTH as TWEET_MAX_LENGTH } from 'src/database/entities/testTweet.entity';

export class SampleRelation1toNRegisterDto {
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

  @ApiProperty({ title: 'comments', example: ['コメント1', 'コメント2'] })
  @IsOptional()
  @IsString({ each: true })
  @MaxLength(TWEET_MAX_LENGTH.COMMENT, { each: true })
  comments?: string[];
}

export class SampleRelation1toNUpdateDto {
  @ApiProperty({ title: 'tweetId', example: 1 })
  @IsNumber()
  tweetId: number;

  @ApiProperty({ title: 'comment', example: 'コメント 更新' })
  @IsString()
  @MaxLength(TWEET_MAX_LENGTH.COMMENT)
  comment: string;
}
