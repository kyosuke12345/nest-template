import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestUser } from 'src/database/entities/testUser.entity';
import { SampleController } from './sample.controller';
import { SampleService } from './sample.service';

@Module({
  imports: [TypeOrmModule.forFeature([TestUser])],
  controllers: [SampleController],
  providers: [SampleService],
})
export class SampleModule {}
