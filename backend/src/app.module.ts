import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfModule } from './conf/conf.module';
import { DatabaseConfig } from './conf/database.config';
import { SampleModule } from './sample/sample.module';
import { CustomLoggerModule } from './custom-logger/custom-logger.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfModule],
      useExisting: DatabaseConfig,
    }),
    SampleModule,
    CustomLoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
