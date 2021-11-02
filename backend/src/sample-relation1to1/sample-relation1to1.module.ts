import { Module } from '@nestjs/common';
import { SampleRelation1to1Service } from './sample-relation1to1.service';
import { SampleRelation1to1Controller } from './sample-relation1to1.controller';
import { TestUser } from 'src/database/entities/testUser.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestProfile } from 'src/database/entities/testProfile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TestUser, TestProfile])],
  providers: [SampleRelation1to1Service],
  controllers: [SampleRelation1to1Controller],
})
export class SampleRelation1to1Module {}
