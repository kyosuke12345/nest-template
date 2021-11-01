import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestTweet } from 'src/database/entities/testTweet.entity';
import { TestUser } from 'src/database/entities/testUser.entity';
import { SampleRelation1tonController } from './sample-relation1ton.controller';
import { SampleRelation1tonService } from './sample-relation1ton.service';

@Module({
  imports: [TypeOrmModule.forFeature([TestUser, TestTweet])],
  controllers: [SampleRelation1tonController],
  providers: [SampleRelation1tonService],
})
export class SampleRelation1tonModule {}
