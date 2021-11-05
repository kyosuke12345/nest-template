import { Module, Global } from '@nestjs/common';
import { AccessLoggerService } from './access-logger.service';
import { ErrorLoggerService } from './error-logger.service';
import { SystemLoggerService } from './system-logger.service';

// import しなくても使用できるように
@Global()
@Module({
  providers: [SystemLoggerService, ErrorLoggerService, AccessLoggerService],
  exports: [SystemLoggerService, ErrorLoggerService, AccessLoggerService],
})
export class CustomLoggerModule {}
