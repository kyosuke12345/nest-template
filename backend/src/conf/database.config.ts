import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TestUser } from 'src/database/entities/testUser.entity';
import { TestProfile } from 'src/database/entities/testProfile.entity';
import { TestTweet } from 'src/database/entities/testTweet.entity';
import { TestUserHobby } from 'src/database/entities/testUserHobby.entity';
import { TestHobby } from 'src/database/entities/testHobby.entity';

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DATABASE_HOST'),
      port: this.configService.get<number>('DATABASE_PORT'),
      username: this.configService.get<string>('DATABASE_USER'),
      password: this.configService.get<string>('DATABASE_PASSWORD', ''),
      database: this.configService.get<string>('DATABASE_DB'),
      // ssl: {},
      entities: [TestUser, TestProfile, TestTweet, TestHobby, TestUserHobby],
      synchronize: false,
      logging: this.configService.get<string>('DATABASE_LOG') === 'true',
    };
  }
}
