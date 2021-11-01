import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfModule } from './conf/conf.module';
import { DatabaseConfig } from './conf/database.config';
import { SampleModule } from './sample/sample.module';
import { CustomLoggerModule } from './custom-logger/custom-logger.module';
import { SampleRelation1to1Module } from './sample-relation1to1/sample-relation1to1.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfModule],
      useExisting: DatabaseConfig,
    }),
    SampleModule,
    CustomLoggerModule,
    SampleRelation1to1Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
