import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestHobby } from 'src/database/entities/testHobby.entity';
import { TestUser } from 'src/database/entities/testUser.entity';
import { TestUserHobby } from 'src/database/entities/testUserHobby.entity';
import { SampleRelationntonController } from './sample-relationnton.controller';
import { SampleRelationntonService } from './sample-relationnton.service';

@Module({
  imports: [TypeOrmModule.forFeature([TestUser, TestUserHobby, TestHobby])],
  controllers: [SampleRelationntonController],
  providers: [SampleRelationntonService],
})
export class SampleRelationntonModule {}
